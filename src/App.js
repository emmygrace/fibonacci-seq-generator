import React, { Component } from 'react'
import {Controls} from './Control.js'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.scrollToTop = this.scrollToTop.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() { 
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("topButton").style.display = "block";
    } else {
        document.getElementById("topButton").style.display = "none";
    }
  }

  scrollToTop() {
    window.scrollTo({left:0, top:0, behavior:'smooth'});
  }

  render() {
    return (
      <React.Fragment>
        
        <header>
          <h1>Welcome to the Fibonacci Sequence Generator!</h1>
          <img src={logo} className="logo" alt="logo" />
          <p>Input a number below to calculate the Fibonacci sequence from 0 to N.</p>
        </header>
        <Controls />
        <button id="topButton" onClick={this.scrollToTop}>Top</button>
        <footer>
          <p>Notes: Timestamps may be inaccurate due to browser security settings. Local algorithm is limited to 1024 while node is limited to 8192 due to issues resolving precision.</p>
          <p>To start the Nodejs server, execute <code>docker up</code> or <code>node server.js</code> in the root directory.</p>
          <p>Made with <span role="img" aria-label="love">❤️</span> in Columbia, S.C.</p>
        </footer>
      </React.Fragment>
    )
  }
}

export default App
