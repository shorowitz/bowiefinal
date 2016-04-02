const pgp = require('pg-promise')({});
const dotenv = require('dotenv');
dotenv.load();
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

var cn = {
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

var db = pgp(cn);

function createSecure (email, password, username, callback) {
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      callback(email, hash, username);
    });
  });
}

function createUser(req, res, next) {
  createSecure(req.body.email, req.body.password, req.body.username, saveUser)

  function saveUser(email, hash, username) {
    db.none("INSERT INTO users (email, password_digest, username) VALUES ($1, $2, $3) RETURNING email, password_digest;",
      [email, hash, username])
      .then((data) => {
        console.log(data)
        res.rows = data;
        next()
      })
      .catch(() => {
        console.log(cn)
        console.log('error signing up')
      })
  }
}

function loginUser(req, res, next) {
  var email = req.body.email
  var password = req.body.password

  db.one("SELECT * FROM users WHERE email LIKE $1;", [email])
    .then((data) => {
      console.log(data)
      if (bcrypt.compareSync(password, data.password_digest)) {
        res.rows = data
        next()
      } else {
        res.rows = "password and email do not match"
        next()
      }
    })
    .catch(() => {
      console.error('error finding users')
    })
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
