const React = require('react')
const auth = require('../auth');

const Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState : function() {
    return {
      error: false
    }
  },

  handleSubmit : function(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace('/')
      }
    })
  },

  render : function () {
    return (
      <div id="signin">
        <h1>Sign In</h1>
        <h3>Nice to see you again.</h3>
        <form id onSubmit={this.handleSubmit}>
          <label><b>Email</b></label><br></br>
          <input ref="email" type="email" placeholder="email" /><br></br><br></br>
          <label><b>Password</b></label><br></br>
          <input ref="pass" type="password" placeholder="password" /><br></br><br></br>
          <button type="submit">Sign In</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
      </div>
    )
  }
})

module.exports = Login;
