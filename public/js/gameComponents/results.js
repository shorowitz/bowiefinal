const React = require('react')
const auth = require('../auth')
const $ = require('jquery')
require('jquery-ui')
const ph = require('../photos.js')
const moment = require('moment')

const Results = React.createClass({

  getInitialState : function() {
    return {
      score : 0,
      userData : [],
      allData : []
    }
  },

  componentDidMount : function() {
    $.ajax({
      url: '/games/start',
      type: 'GET',
      beforeSend: function( xhr ) {
         xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
       }
    }).done((data) => {
      for (var i = 0; i < data.length; i ++) {
        if (data[i].id == localStorage.game) {
          var currentScore = data[i].score        //http://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
          var minutes = "0" + Math.floor(currentScore / 60)
          var seconds = "0" + (currentScore - minutes * 60)
          this.state.score = minutes.substr(-2) + ":" + seconds.substr(-2)
          this.setState({score : this.state.score})
        }
      }
      this.state.userData = data
      this.setState({userData : this.state.userData})
    })
  },

  render : function () {
    return (
      <h1>{this.state.score}</h1>
    )
  }
})

module.exports = Results
