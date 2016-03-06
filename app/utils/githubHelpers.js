var axios = require('axios');

// var id = 'EricMFischer';
// var sec = '39db88eefccc448ebf34f6276ab16a886774eccb';
// var param = '?client_id=' + id + '&client_secret=' + sec;

function getUserInfo (username) {
  console.log('getUserInfo');
  // axios.get returns a promise
  return axios.get('https://api.github.com/users/' + username);
}


var helpers = {
  getPlayersInfo: function(players) {
    console.log('getPlayersInfo');
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
  }
}

module.exports = helpers;