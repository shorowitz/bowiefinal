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
    this.searchKeyword(word)
    this.refs.searchForm.reset()
    // $('#search').draggable()
  },
  searchKeyword:function(word){
    $.ajax({
      url:'/games/search',
      type: 'POST',
      data: {
        section: word,
      }
    }).done((data)=>{
      console.log(data)
        this.state.photos = data
        this.setState({ photos : this.state.photos})
        ph.showPhotos(this.state.photos)
    })

  },

  // renderSearchResults:function(key){
  //   return(
  //     <SearchResult key={key} index={key} repo={this.state.results[key]} />
  //   )
  // },
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
