const React = require('react')
const auth = require('../auth')

const Logout = React.createClass({
  componentDidMount : function() {
    auth.logout()
  },

  render : function() {
    return <p>You are now logged out</p>
  }
})

module.exports = Logout;
