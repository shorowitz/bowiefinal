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
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" type="email" placeholder="email" /></label>
        <label><input ref="pass" type="password" placeholder="password" /></label><br />
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }
})

module.exports = Login;
