var axios = require('axios');
// var id = 'EricMFischer';
// var sec = '';
// var param = '?client_id=' + id + '&client_secret=' + sec;

function getUserInfo (username) {
  console.log('getUserInfo');
  // axios.get returns a promise
  return axios.get('https://api.github.com/users/' + username);
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos'); //  + param + '&per_page=100'
}

function getTotalStars (repos) {
  return repos.data.reduce(function (prev, current) {
    return prev + current.stargazers_count
  }, 0)
}

function getPlayersData (player) {
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function (totalStars) {
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    })
}

function calculateScores (players) {
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}

var helpers = {
  getPlayersInfo: function(players) {
    // axios.all takes an arr of promises, and once they are all resolved, .then is run
    return axios.all(players.map(function(username) {
      return getUserInfo(username);
    })).then(function(info) {
      return info.map(function(user) {
        return user.data;
      });
    }).catch(function(err) {
      console.warn('Error in getPlayersInfo: ', err);
    });
  },

  battle: function (players) {
    var playerOneData = getPlayersData(players[0]);
    var playerTwoData = getPlayersData(players[1]);
    return axios.all([playerOneData, playerTwoData]) // once these resolve, .then is run
      .then(calculateScores)
      .catch(function (err) {console.warn('Error in getPlayersInfo: ', err)})
  }
}

module.exports = helpers;