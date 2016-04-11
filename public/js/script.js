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
const Results = require('./gameComponents/results.js');
const Profile = require('./gameComponents/profile.js');
const auth = require('./auth');
const moment = require('moment');
const _ = require('underscore');
const $ = require('jquery');
// const tipsy = require('./tipsy.js')

const App = React.createClass({

  getInitialState : function() {
    return {
      loggedIn: auth.loggedIn(),
      photos: {},
      today: ''
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
    var now = moment().format("MMMM Do YYYY")
    this.state.today = now
    this.setState({today : this.state.today})
  },

  componentDidMount : function () {
    var saved =[]
    $.ajax({
      url: '/home',
      type: 'GET'
    }).done((nytdata) => {

      var data = _.shuffle(nytdata)
      saved = data
      saved.forEach((el) => {
          this.state.photos[el.image] = el;
        })
        this.setState({photos : this.state.photos})
    })
  },

  renderImages : function(key) {
   return (
    <OneImage key={key} index={key} details={this.state.photos[key]} />
    )
  },


  render : function() {
    return (
      <div className="container">
          <nav>
            <ul id="nav">
              <li>
                <div>
                <Link to="/">Home</Link>
                </div>
                {this.state.loggedIn ? (
                  <div>
                    <Link to="/profile"> Your Stats</Link>
                    <Link to="/logout"> Log Out </Link>
                  </div>
                ) : (
                  <div>
                    <Link to="/login"> Sign In </Link>
                    <Link to="/signup"> Sign Up </Link>
                  </div>
                )}
              </li>
            </ul>
          </nav>

        {this.props.children ||
          <div id="home">

              <h1>Images of the Times</h1>

            <div id="welcome">
              <div id="welcome-2">
                {this.state.loggedIn ? (
                  <button id="start"><Link to="/search">Start a Game</Link></button>
                  ) : (

                    <p>Sign up for a free account and sign in to play the fun <i>New York Times</i> caption-to-photo matching game!</p>
                )}
            </div>
              <div className="grid">
                <h3>Today, <i>{this.state.today}</i>, in images...</h3>
                {Object.keys(this.state.photos).map(this.renderImages)}
              </div>
            </div>
          </div>}
    </div>
    )
  }
})

const OneImage = React.createClass({

  render: function() {
    return(
      <div className="grid-item" title={this.props.details.headline}>
        <img src={this.props.details.image} />
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
      <Route path="results" component={Results} onEnter={requireAuth} />
      <Route path="profile" component={Profile} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('container'))
