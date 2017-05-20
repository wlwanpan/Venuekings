var express = require('express');

// Create our app
var app = express();
const PORT = process.env.PORT || 3000;

// Fix https request to http if needed
// weather website api only works on http
app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.use(express.static('public'));

app.listen(PORT, function () {
    console.log('Express server is up on port ' + PORT);
});
