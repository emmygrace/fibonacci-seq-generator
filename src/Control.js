import React, { Component } from 'react'
import './Control.css'

const SERVER_ENDPOINT = 'http://localhost:9090/'
const fibErrorMessage = 'Please choose an integer N where 1025 < N < -1'

// "local" algorithm
const fib = (n) => {
  let arr = []
  for(let i = 0; i < n; i++ ){
      if(i === 0 || i === 1){
          arr.push(i)
      } else {
          let a = arr[i - 1]
          let b = arr[i - 2]
          arr.push(a + b)
      }
  }
  return {sequence: arr}
}

const FibErrorMessage = (props) => {
  return <span className="fib-error">{props.error}</span>
}

const FibSequence = (props) => {
  return <div className="fib-sequence">{Array.from(props.sequence).map((n,i) => <span key={i} className="seq-number">{n}</span>)}</div>
}

const initialControlState = {
  value: '',
  error: null,
  sequence: null,
  isDatasourceRemote: true,
  showResults: false,
}

export class Controls extends Component {
    constructor(props) {
      super(props)
      this.state = initialControlState
      this.handleDatasourceChange = this.handleDatasourceChange.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    // give us a way to reset state
    reset() {
      this.setState(initialControlState)
    }

    handleInputChange(event) {
      event.preventDefault();
      this.setState({value: event.target.value})
    }

    handleDatasourceChange(event) {
      // don't reset datasource or input value
      let newState = {
        isDatasourceRemote:!this.state.isDatasourceRemote,
        value: this.state.value,
      }
      this.reset()
      this.setState(state => newState)
    }

    handleSubmit(event) {
      
      let input = Number.parseInt(this.state.value)

      this.setState({error: null}) // lazy hack

      // frontend validation
      if(input < 1024 && input > 0 && Number.isInteger(input)) {

        if(this.state.isDatasourceRemote) {
          // REST service
          fetch(SERVER_ENDPOINT + input)
            .then(res => res.json())
            .then(data => this.setState({sequence: data.sequence}))
            .catch(error => this.setState({error: 'ERR_CONNECTION_REFUSED', sequence: null})) // network error, hack
        } else {
          // "local" service
          this.setState({sequence: fib(input).sequence})
        }
      } else { 
        this.setState({error: fibErrorMessage})
      }
      this.setState({showResults: true})
      event.preventDefault();
    }
  
    render() {
      let error = this.state.error ? <FibErrorMessage error={this.state.error} /> : null
      let sequence = this.state.sequence ? <FibSequence sequence={this.state.sequence} /> : null

      return (
        <React.Fragment>
          <div className="fib-ctl">
              <form>
                <div className="fib-input">
                  <div className="onoffswitch">
                      <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" onChange={this.handleDatasourceChange} defaultChecked={this.state.isDatasourceRemote} />
                      <label className="onoffswitch-label" htmlFor="myonoffswitch">
                          <span className="onoffswitch-inner"></span>
                          <span className="onoffswitch-switch"></span>
                      </label>
                    </div>
                    <input type="text" id="number" value={this.state.value} onChange={this.handleInputChange} />
                    <input type="submit" onClick={this.handleSubmit} value="Go!" />
                  </div>
              </form> 
              {error}
              {sequence}
          </div>
        </React.Fragment>
      )
    }
  }