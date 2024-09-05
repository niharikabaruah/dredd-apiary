// dredd-hooks.js
var hooks = require('hooks');
var before = hooks.before;

hooks.beforeEach(function (transaction) {
  const statusCode = transaction.expected.statusCode;
    transaction.skip = false;
});


//POST
before('Requests > Create a new user > 400 > application/json; charset=utf-8', function (transaction) {
  // parse request body from API description
  var requestBody = JSON.parse(transaction.request.body);


  // modify request body here
  requestBody["name"] = 1;

  // stringify the new body to request
  transaction.request.body = JSON.stringify(requestBody);
});

//PUT
before('Requests with id > Update user by ID > 404 > application/json; charset=utf-8', function (transaction) {
  // parse request body from API description
  var requestBody = JSON.parse(transaction.request.body);

  console.log(requestBody);

  // modify request body here
  requestBody["name"] = "";

  // stringify the new body to request
  transaction.request.body = JSON.stringify(requestBody);
});

////DELETE
//hooks.before('Requests with id > Delete user by ID > 404 > application/json; charset=utf-8', function (transaction, done) {
//  // Extract the current URI
//  const currentUri = transaction.request.uri;
//
//  // Replace the existing id in the path with a new one (e.g., change to id "4")
//  transaction.request.uri = currentUri.replace(/\/users\/\d+/, '/users/-1');
//
//});
