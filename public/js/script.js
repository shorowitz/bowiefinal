const React = require('react');
const render = require('react-dom').render;
const browserHistory = require('react-router').browserHistory;
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;

const SignUp = require('./authComponents/signup.js');
const Login = require('./authComponents/login.js');
const Logout = require('./authComponents/logout.js');

const Search = require('./gameComponents/search.js');

const auth = require('./auth');
const moment = require('moment');


const App = React.createClass({
  getInitialState : function() {
    return {
      loggedIn: auth.loggedIn(),
    }
  },

  updateAuth : function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount : function() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render : function() {
    return (
      <div className="container">
        <header>
          <nav>
            <ul id="nav">
              <li>
                {this.state.loggedIn ? (
                  <div>
                    <a className="button"><Link to="/logout"> Log out </Link></a>
                    <a><Link to="/search">Start a Game</Link></a>
                  </div>
                ) : (
                  <div>
                    <a><Link to="/login"> Sign In </Link></a>
                    <a><Link to="/signup"> Sign Up </Link></a>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </header>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    )
  }
})

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="signup" component={SignUp} />
      <Route path="search" component={Search} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('container'))
