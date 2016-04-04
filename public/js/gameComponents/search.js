const React = require('react')
const auth = require('../auth')
const $ = require('jquery')
require('jquery-ui')
const ph = require('../photos.js')
const Link = require('react-router').Link
const Timer = require('./timer')

const $search = $('#search')

const Search = React.createClass({

  getInitialState: function(){
    return {
      photos:[],
      section: ''
    }
  },

  handleSearch:function(event){
    event.preventDefault();
    var word = this.refs.word.value
    this.startGame(word)
    this.refs.searchForm.reset()
    this.state.section = word
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
      console.log(data)
        localStorage.game = data[0].game_id
        this.state.photos = data
        this.setState({ photos : this.state.photos})
        ph.showPhotos(this.state.photos)

    })
  },

  componentWillUnmount : function() {
    $search.show()
  },

  render:function(){
    return (
    <div>
      <div id="search">
        <form ref="searchForm" onSubmit={this.handleSearch}>
          <label htmlFor="word">select a NYT section</label>
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
          </select>
          <button id="SearchButton" type="submit">Get Game</button>
        </form>
      </div>
      <h1>{this.state.section}</h1>
      <Link to="timer"><button>Start</button></Link>
    </div>
    )
  },
})

module.exports = Search;
