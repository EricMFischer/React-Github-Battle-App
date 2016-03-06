var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers');

// will not render it's on UI (container--business logic)
var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    console.log('getInitialState');
    return {
      isLoading: true, // signals currently loading
      playersInfo: []
    }
  },

  componentDidMount: function() { // will run after render
    console.log('componentDidMount');
    // 1) grab usernames, 2) fetch info w/ Github API
    var query = this.props.location.query;
    // returns a promise
    githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
      .then(function(players) {
        this.setState({ // this binding changed because we're inside another function
          isLoading: false,
          playersInfo: [players[0], players[1]]
        })
      }.bind(this));
  },

  handleInitiateBattle: function() {
    this.context.router.push({
      pathname: '/results',
      state: { // allows us to push playersInfo to ResultsContainer
        playersInfo: this.state.playersInfo
      }
    });
  },

  render: function() {
    console.log('render');
    return (
      <ConfirmBattle
        isLoading = {this.state.isLoading}
        playersInfo = {this.state.playersInfo}
        onInitiateBattle = {this.handleInitiateBattle}/>
    )
  }
});

module.exports = ConfirmBattleContainer;