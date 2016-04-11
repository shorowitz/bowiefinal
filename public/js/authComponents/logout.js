const React = require('react')
const auth = require('../auth')

const Logout = React.createClass({
  componentDidMount : function() {
    auth.logout()
  },

  render : function() {
    return (
      <div id="logout">
        <h1>You are now logged out</h1>
        <img src='../../peace.jpeg'/>
      </div>
      )
  }
})

module.exports = Logout;
