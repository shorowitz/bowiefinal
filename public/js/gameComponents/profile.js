const React = require('react')
const auth = require('../auth')
const moment = require('moment')

const Profile = React.createClass({

  componentDidMount: function() {
    $.ajax({
      url: '/games/start',
      type: 'GET',
      beforeSend: function( xhr ) {
         xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
       }
    }).done((data) => {
      console.log(data)
    })
  },

  render: function() {
    return (
      <h1>Here</h1>
    )
  }
})

module.exports = Profile
