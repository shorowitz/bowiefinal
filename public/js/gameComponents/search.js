const React = require('react')
const auth = require('../auth')

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
        // data.forEach((el) => {
        //   this.state.photos[el.id] = el;
        // })
        this.state.photos = data
        this.setState({ photos : this.state.photos})
          console.log(this.state.photos)
    })

  },

  renderSearchResults:function(key){
    return(
      <SearchResult key={key} index={key} repo={this.state.results[key]} />
    )
  },
  render:function(){
    return (
      <div>
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
