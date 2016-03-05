var React = require('react');
var ConfirmBattle = require('../ConfirmBattle');

// will not render it's on UI (container--business logic)
var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isLoading: true, // signals currently loading
      playerInfo: []
    }
  }

  render: function() {
    return (
      <ConfirmBattle/>
    )
  }
});

module.exports = ConfirmBattleContainer;