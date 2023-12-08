// Create web server

// Require Express
const express = require('express');

// Require path
const path = require('path');

// Require body-parser
const bodyParser = require('body-parser');

// Require mongoose
const mongoose = require('mongoose');

// Require express-handlebars
const hbs = require('express-handlebars');

// Require morgan
const logger = require('morgan');

// Require cheerio
const cheerio = require('cheerio');

// Require request
const request = require('request');

// Require models
const db = require('./models');

// Set port
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Use morgan for logging requests
app.use(logger('dev'));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Use express.static to serve the public folder as a static directory
app.use(express.static(path.join(__dirname, 'public')));

// Set handlebars as the default templating engine
app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/techcrunch', {
  useMongoClient: true
});

// Routes

// GET route for scraping TechCrunch website
app.get('/scrape', (req, res) => {
  // Grab the body of the html with request
  request('https://techcrunch.com/', (error, response, html) => {
    // Load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(html);
    // Grab every article tag, and do the following:
    $('article').each((i, element) => {
      // Save an empty result object
      const result = {};
      // Add the title, summary, href, and image of every article, and save them as properties of the result object
      result.title = $(element)
        .children('.post-block__header')
        .children('.post-block__title')
        .children('a')
        .text();
      result.summary = $(element)
        .children('.post-block__content')
        .children('.post-block__content--excerpt')
        .text();
      result.link = $(element)
        .children('.post-block__header')
        .children('.post-block__title')