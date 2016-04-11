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
     <div id="signup">
       <h1>Sign Up</h1>
       <h3>So, what exactly is it that you are signing up for?</h3>
        <p>Access to the fun and challenging caption-to-photo matching game! You will be able
        to select a New York Times section from which you would like to see images, and your knowledge of current affairs will
          then be tested as you match the photos with their corresponding captions, all while being timed! Once you match all of
          the captions correctly, you will see how your time compares to other Images of the Times users, and you will get access
          to information about each image.<br></br>
          So, time to sign up and sign in!</p>

        <form id="signup-form" onSubmit={this.handleSubmit}>
          <label><b>Email</b> </label><br></br>
          <input ref="email" type="email" placeholder="email" /><br></br><br></br>
          <label><b>Password</b></label><br></br>
          <input ref="pass" type="password" placeholder="password" /><br></br><br></br>
          <label><b>Username</b><br></br><span><i>(choose wisely, as this is how other users will see your high scores!)</i></span> </label><br></br>
          <input ref="username" type="text" placeholder="username" /><br></br><br></br>
          <button type="submit">Submit!</button>
        </form>
     </div>
   )
 }
})

module.exports = SignUp;
