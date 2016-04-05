var pgp = require('pg-promise')({});
var dotenv = require('dotenv');
dotenv.load();

if(process.env.ENVIRONMENT === 'production') {
  var cn = process.env.DATABASE_URL
} else {
  var cn =
  {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  };
}

var db = pgp(cn);

function createGame (req, res, next) {
  db.any(`INSERT INTO games(user_id, keyword)
  VALUES($1, $2)
  RETURNING id, keyword`, [req.user.id, req.body.section])
  .then(function(data) {
    res.data = data;
    next()
  })
  .catch(function(error) {
    console.log(error)
  })
}

function insertPhotos (req, res, next) {
  db.tx(function (t) {
    nytdata = res.data
        var queries = nytdata.map(function (d) {
            return t.one(`INSERT INTO photos(section, subsection, headline, pub_date, article_url, image_url, caption, game_id)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, image_url, caption, game_id`, [d.section, d.subsection, d.headline, d.pub_date, d.article_url, d.image_url, d.caption, req.body.game]);
        });
        return t.batch(queries);
    })
    .then(function (data) {
      res.data = data
      next()
    })
    .catch(function (error) {
      console.log(error)
    });
}

function insertScore (req, res, next) {
  db.none(`UPDATE games
    SET SCORE = $1
    WHERE id = $2;`, [parseInt(req.body.score), parseInt(req.body.game)])
  .then(function(data) {
    next();
  })
  .catch(function(error) {
    console.log(error)
  })
}

function getUserData (req, res, next) {
  db.any(`SELECT * FROM games
    WHERE user_id = $1
    AND score IS NOT NULL;`, [req.user.id])
  .then(function(data) {
    res.data = data;
    next();
  })
  .catch(function(error) {
    console.log(error)
  })
}

module.exports.createGame = createGame;
module.exports.insertPhotos = insertPhotos;
module.exports.insertScore = insertScore;
module.exports.getUserData = getUserData;
