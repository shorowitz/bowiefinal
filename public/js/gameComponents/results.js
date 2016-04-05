const React = require('react')
const auth = require('../auth')
const $ = require('jquery')
require('jquery-ui')
const moment = require('moment')

const Results = React.createClass({

  getInitialState : function() {
    return {
      score : 0,
      section : '',
      bestScore: '',
    }
  },

  componentDidMount : function() {
    $.ajax({
      url: '/games/' + localStorage.game,
      type: 'GET',
      beforeSend: function( xhr ) {
         xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
       }
    }).done((data) => {
          var currentScore = data[0].score        //http://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
          var minutes = "0" + Math.floor(currentScore / 60)
          var seconds = "0" + (currentScore - minutes * 60)
          this.state.score = minutes.substr(-2) + ":" + seconds.substr(-2)
          this.state.section = data[0].keyword
          this.setState({score : this.state.score,
                         section : this.state.section})
          this.getBestScore(this.state.section)
    })
  },

  getBestScore : function (section) {
    $.ajax({
      url: '/games/score/' + section,
      type: 'GET',
      beforeSend: function( xhr ) {
         xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
       }
    }).done((data) => {
      var bestScore = data[0].score
      var minutes = "0" + Math.floor(bestScore / 60)
      var seconds = "0" + (bestScore - minutes * 60)
      this.state.bestScore = minutes.substr(-2) + ":" + seconds.substr(-2)
      this.setState({bestScore: this.state.bestScore})
    })
  },

  render : function () {
    return (
      <div>
        <h1> Your Time - {this.state.score}</h1>
        <h2>Time to beat for the {this.state.section} section is {this.state.bestScore}</h2>
      </div>
    )
  }
})

module.exports = Results
