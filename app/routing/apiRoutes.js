var path = require('path');
var friends = require('../data/friends.js');

module.exports = app => {
  app.get('/api/friends', (req, res) => res.json(friends));

  app.post('/api/friends', (req, res) => {
    var newFriend = {name: req.body.name,
                     photo: req.body.photo,
                     scores: req.body.scores.map(score => parseInt(score))};

    /* Calculate difference between user and stored friends. Determine the smallest difference. If a tie, first match wins. */
    var iMatch = 
      friends.map(friend =>
        friend.scores.map((score, index) => 
          Math.abs(score - newFriend.scores[index]))
        .reduce((sum, curr) => sum + curr, 0))
      .reduce((iMin, nCurr, iCurr, arr) => nCurr < arr[iMin] ? iCurr : iMin, 0);

    friends.push(newFriend);
    res.json(friends[iMatch]);
  });
};