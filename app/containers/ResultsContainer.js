var React = require('react');
var Results = require('../components/Results');
var githubHelpers = require('../utils/githubHelpers');

var ResultsContainer = React.createClass({
  getInitialState: function() {
    return {
      isLoading: true,
      scores: []
    }
  },

  componentDidMount: function() {
    console.log(this.props.location.state.playersInfo);
    githubHelpers.battle(this.props.location.state.playersInfo)
      .then(function(scores) { // scores is a promise resolved as an array from githubHelpers.battle
        this.setState({
          scores: scores,
          isLoading: false // makes Results re-render
        })
      }.bind(this));
  },

  render: function() {
    return (
      <Results 
        isLoading={this.state.isLoading}
        playersInfo={this.props.location.state.playersInfo}
        scores={this.state.scores}/>
    )
  }
});

module.exports = ResultsContainer;