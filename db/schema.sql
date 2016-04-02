DROP TABLE if exists users CASCADE;
DROP TABLE if exists games CASCADE;
DROP TABLE if exists photos CASCADE;
DROP TABLE if exists keywords CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY UNIQUE,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  password_digest TEXT
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY UNIQUE,
  score INTEGER,
  keyword TEXT,
  user_id INTEGER REFERENCES users
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY UNIQUE,
  image_url TEXT,
  caption TEXT,
  headline TEXT,
  article_url TEXT,
  pub_date TEXT,
  section TEXT,
  subsection TEXT,
  game_id INTEGER REFERENCES games
);

CREATE TABLE keywords (
  id SERIAL PRIMARY KEY UNIQUE,
  value TEXT,
  photo_id INTEGER REFERENCES photos
);
