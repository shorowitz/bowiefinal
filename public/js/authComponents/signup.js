const React = require('react');
const auth = require('../auth');

const SignUp = React.createClass({

 contextTypes : {
   router: React.PropTypes.object.isRequired
 },

 handleSubmit : function(event) {
   event.preventDefault()

   const email = this.refs.email.value
   const pass = this.refs.pass.value
   const username = this.refs.username.value

   $.post('/users', {email : email, password : pass, username : username})
   .done((data) => {
     console.log('user is created');

   })
   .fail((data) => {
     console.log('error in creating a user');
   })

   const { location } = this.props

   if (location.state && location.state.nextPathname) {
     this.context.router.replace(location.state.nextPathname)
   } else {
     this.context.router.replace('/')
   }

 },

 render : function() {
   return (
     <form onSubmit={this.handleSubmit}>
       <label><input ref="email" type="email" placeholder="email" /></label>
       <label><input ref="pass" type="password" placeholder="password" /></label>
       <label><input ref="username" type="text" placeholder="username" /></label><br />
       <button type="submit">Submit!</button>
     </form>
   )
 }
})

module.exports = SignUp;
