var express    = require('express');
var bodyParser = require('body-parser');
var path       = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./app/public'));

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app); // Must be last due to catch all default route.

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
