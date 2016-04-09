const React = require('react')
const auth = require('../auth')
const $ = require('jquery')
require('jquery-ui')
const ph = require('../photos.js')
const moment = require('moment')
const Link = require('react-router').Link
const Results = require('./results')

const $search = $('#search')
const $captions = $('#captions')
const $photos = $('#photos')

const Search = React.createClass({

  getInitialState: function(){
    return {
      photos:[],
      section: '',
      secondsElapsed : 0
    }
  },

  componentWillUnmount : function() {
    $search.show()
    clearInterval(this.interval)
    $captions.empty()
    $photos.empty()
  },

  handleSearch:function(event){
    event.preventDefault();
    var word = this.refs.word.value
    this.startGame(word)
    this.refs.searchForm.reset()
    this.state.section = word.toUpperCase()
    this.setState({section : this.state.section})
    $('#search').hide()
  },

  startGame: function(word){
    $.ajax({
      url:'/games/start',
      type: 'POST',
      beforeSend: function( xhr ) {
         xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
       },
      data: {
        section: word,
      }
    }).done((game)=>{
      this.searchKeyword(game)
    })
  },

  searchKeyword: function(game){
    $.ajax({
      url:'/games/search',
      type: 'POST',
      beforeSend: function( xhr ) {
         xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
       },
      data: {
        section: game[0].keyword,
        game: game[0].id
      }
    }).done((data)=>{
        localStorage.game = data[0].game_id
        this.state.photos = data
        this.setState({photos : this.state.photos})
        ph.showPhotos(this.state.photos)
        this.startTimer()
    })
  },

  tick: function() {
    this.state.secondsElapsed++
    this.setState({secondsElapsed : this.state.secondsElapsed})
  },

  startTimer: function() {
    window.timerStop = this.stop
    this.interval = setInterval(this.tick, 1000)
  },

  stop: function() {
    clearInterval(this.interval)
    this.submitScore(this.state.secondsElapsed)
  },

  submitScore: function (seconds) {
    $.ajax({
      url: 'games/start',
      type: 'PUT',
      beforeSend: function( xhr ) {
         xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
       },
      data: {
        score: seconds,
        game: localStorage.game
      }
    }).done((data)=>{
      this.state.section = <p>Click below for results and more information related to the photos from your game <Link to="results"> Results </Link></p>
      this.state.secondsElapsed = ''
      this.setState({section : this.state.section,
                     secondsElapsed : this.state.secondsElapsed})
    })
    $captions.empty()
    $photos.empty()
  },



  render:function(){
    return (
    <div className="container">
      <div id="search">
        <p className="instructions">Select a New York Times section title from the drop-down menu to initiate the image-caption matching game.<br></br>
        Press start when you are ready - the timer will begin ticking as soon as all of the images are loaded!<br></br>
        The timer will stop once you make your final match.</p><br></br>
        <form ref="searchForm" onSubmit={this.handleSearch}>

          <select id="word" ref="word">
            <option defaultValue="">Select Below</option>
            <option value="home">Home</option>
            <option value="world">World</option>
            <option value="national">National</option>
            <option value="politics">Politics</option>
            <option value="nyregion">NY Region</option>
            <option value="business">Business</option>
            <option value="opinion">Opinion</option>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="sports">Sports</option>
            <option value="arts">Arts</option>
            <option value="fashion">Fashion</option>
            <option value="dining">Dining</option>
            <option value="travel">Travel</option>
            <option value="magazine">Magazine</option>
            <option value="realestate">Real Estate</option>
          </select><br></br>
          <button id="SearchButton" type="submit"> START! </button>
        </form>
      </div>
      <div className="section">
        <h1>{this.state.section}</h1>
      </div>
      <div className="timer">
        <h3>Timer (seconds): {this.state.secondsElapsed}</h3>
      </div>
    </div>
    )
  },
})

module.exports = Search;
