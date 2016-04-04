const React = require('react')
const auth = require('../auth')
const $ = require('jquery')
require('jquery-ui')
const ph = require('../photos.js')
const moment = require('moment')

const Timer = React.createClass({

getInitialState: function() {
    return {secondsElapsed : 0}
  },

  tick: function() {
    this.state.secondsElapsed++
    this.setState({secondsElapsed : this.state.secondsElapsed})
},

  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000)
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function() {
    return (
          <h1>Seconds Elapsed: {this.state.secondsElapsed}</h1>
    )
  }
})

module.exports = Timer
