const React = require('react')
const auth = require('../auth')
const $ = require('jquery')
require('jquery-ui')
const ph = require('../photos.js')

const Search = React.createClass({

  getInitialState: function(){
    return {
      photos:[]
    }
  },

  handleSearch:function(event){
    event.preventDefault();
    var word = this.refs.word.value
    // this.searchKeyword(word)
    this.startGame(word)
    this.refs.searchForm.reset()
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
        this.state.photos = data
        this.setState({ photos : this.state.photos})
        ph.showPhotos(this.state.photos)
    })
  },

  render:function(){
    return (
      <div id="search">
        <form ref="searchForm" onSubmit={this.handleSearch}>
          <label htmlFor="word">search by keyword or phrase</label>
          <input type="text" id="word" ref="word" placeholder="keyword"></input>
          <button id="SearchButton" type="submit">Search</button>
        </form>
      </div>
    )
  },
})

module.exports = Search;
