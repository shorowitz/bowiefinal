const React = require('react')
const auth = require('../auth')

const Search = React.createClass({
  getInitialState: function(){
    return {
      results:{}
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
    })
  },
  saveSearchResults:function(el, ind){
    this.state.results[ind]=el.full_name
    this.setState({results:this.state.results})
    console.log(this.state.results)
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
        <div>{Object.keys(this.state.results).map(this.renderSearchResults)}</div>
      </div>
    )
  },
})

module.exports = Search;
