// Create Web server 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const comments = require('./routes/comments');
const app = express();
const port = process.env.PORT || 8081;
// Middleware
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());
// Routes
app.use('/comments', comments);
// Start the server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
