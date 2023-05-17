CREATE DATABASE urlshortner;

CREATE TABLE urltable(
    urlId SERIAL PRIMARY KEY,
    origUrl  VARCHAR(500),
    shortUrl VARCHAR(100)
);