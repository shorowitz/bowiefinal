const React = require('react')
const auth = require('../auth')
const moment = require('moment')

const Profile = React.createClass({

  getInitialState: function() {
    return{
      scores: {},
      username:''
    }
  },

  componentDidMount: function() {
    var saved =[]
    $.ajax({
      url: '/games/start',
      type: 'GET',
      beforeSend: function( xhr ) {
         xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
       }
    }).done((data) => {
      saved = data
      this.state.username = saved[0].username
      saved.forEach((el) => {
          this.state.scores[el.score] = el;
        })

        this.setState({username : this.state.username,
                       articles : this.state.scores})
        console.log(this.state.scores)
      })
  },

  renderScores: function(key) {
    return (
    <OneScore key={key} index={key} details={this.state.scores[key]}/>
    )
  },

  render: function() {
    return (
      <div id="score-table">
        <h1>Hi, <i>{this.state.username}</i> !</h1>
          <table>
            <thead>
              <tr>
                <th colSpan="4">NYT Section</th>
                <th colSpan="4">Your Time</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.scores).map(this.renderScores)}
            </tbody>
        </table>
      </div>
    )
  }
})

const OneScore = React.createClass({

  makeTime : function(key) {
    var currentScore = key
    var minutes = "0" + Math.floor(currentScore / 60)
    var seconds = "0" + (currentScore - minutes * 60)
    key = minutes.substr(-2) + ":" + seconds.substr(-2)

      return key
  },

  render : function() {
    return(
          <tr>
            <td colSpan="4">{this.props.details.keyword.toUpperCase()}</td>
            <td colSpan="4">{this.makeTime(this.props.details.score)}</td>
          </tr>
    )
  }
})

module.exports = Profile
