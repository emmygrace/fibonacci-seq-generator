import React, { Component } from 'react'
import './Control.css'

const SERVER_ENDPOINT = 'http://localhost:8080/'

// local datasource
// time: linear - O(N)
// space: constant
const fib = (n) => {
  if (n>1024) {
    return {error:'Please choose an integer <= 1024'}
  }
  let start = Date.now()
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
  return {sequence: arr, time: Date.now()-start}
}

const ErrorMessage = (props) => {
  return (
    <div>
      <span>Error: {props.message}</span>
    </div>
  )
}

const Sequence = (props) => {
  let formattedSequence 
  if (props.array)
    formattedSequence = Array.from(props.array).map((n,i) => <span key={i} className="seq-number">{n}</span>)
  return (
    <div>
        <span>Result calculated in {props.time} milliseconds: </span>
        <div className="fib-sequence">{formattedSequence}</div>
    </div>
  )
}

const Results = props => {
  let out = props.error ? <ErrorMessage message={props.error} /> : <Sequence array={props.sequence} time={props.time} />
  return (
    <div>{out}</div>
  )
}

export class Controls extends Component {
    constructor(props) {
      super(props)
      this.state = {
        value: '',
        error: null,
        sequence: null,
        time: null,
        isDatasourceRemote: true,
        isLoading: false,
      }

      this.handleDatasourceChange = this.handleDatasourceChange.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleInputChange(event) {
      event.preventDefault();
      this.setState({value: event.target.value})
    }

    handleDatasourceChange(event) {
      this.setState( state => ({isDatasourceRemote: !state.isDatasourceRemote}))
    }

    handleSubmit(event) {
      let input = this.state.value;

      if (this.state.isDatasourceRemote) {

        //TODO no response
        fetch(SERVER_ENDPOINT + input)
          .then(res => res.json())
          .then(data => { 
            if (data.error) {
              this.setState({ 
                error: data.error,
              })
            } else {
              this.setState({
                sequence: data.sequence, 
                time: data.time,
              })
            }
          })

      } else {
        let local = fib(input);
        this.setState({error: local.error, sequence: local.sequence, time: local.time})
      }
      event.preventDefault();
    }
  
    render() {
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
            <Results error={this.state.error} sequence={this.state.sequence} time={this.state.time} />
          </div>
        </React.Fragment>
      )
    }
  }