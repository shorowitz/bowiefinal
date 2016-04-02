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
  db.tx(function (t) {
    nytdata = res.data
        var queries = nytdata.map(function (d) {
            return t.one(`INSERT INTO photos(section, subsection, headline, pub_date, article_url, image_url, caption)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, image_url, caption`, [d.section, d.subsection, d.headline, d.pub_date, d.article_url, d.image_url, d.caption]);
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

module.exports.createGame = createGame;
