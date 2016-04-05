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
      articles: {}
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
      this.getArticles()
    })
  },

  getArticles : function() {
    var saved = [];
    $.ajax({
      url: '/games/search/' + localStorage.game,
      type: 'GET',
      beforeSend: function( xhr ) {
         xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
       }
    }).done((data) => {
      saved = data
      saved.forEach((el) => {
          this.state.articles[el.id] = el;
        })
        this.setState({articles : this.state.articles})
        console.log(this.state.articles)
    })
  },

  renderArticle : function (key) {
    return (
    <OneArticle key={key} index={key} details={this.state.articles[key]} />

    )
  },

  render : function () {
    return (
      <div>
        <h1> Your Time - {this.state.score}</h1>
        <h2>Time to beat for the {this.state.section} section is {this.state.bestScore}</h2>
        <div> {Object.keys(this.state.articles).map(this.renderArticle)}</div>
      </div>
    )
  }
})

const OneArticle = React.createClass({

  render: function() {
     moment(this.props.details.pub_date, moment.ISO_8601)
    return(
      <div>
        <h3><a href={this.props.details.article_url}>{this.props.details.headline}</a></h3>
        <h5>{this.props.details.abstract}</h5>
        <div><img src={this.props.details.image_url} /></div>
        <a>{this.props.details.caption}</a>
      </div>
    )
  }
})

module.exports = Results
