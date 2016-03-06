var React = require('React');
var Prompt = require('../components/Prompt')

var PromptContainer = React.createClass({
  contextTypes: { // don't have to pass router down as props of a component; it's here as contextTypes[router]
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      username: ''
    }
  },

  handleUpdateUser: function(e) { // update this.state.username when input changes
    this.setState({
      username: e.target.value
    });
  },

  handleSubmitUser: function(e) {
    e.preventDefault();
    var username = this.state.username;
    this.setState({
      username: ''
    });

    if (this.props.routeParams.playerOne) { // :playerOne
      this.context.router.push({
        pathname: '/battle',
        query: {
          playerOne: this.props.routeParams.playerOne,
          playerTwo: this.state.username
        }
      })
    } else {
      this.context.router.push('/playerTwo/' + this.state.username)
    }
  },

  render: function() {
    return (
      <Prompt
        onSubmitUser = {this.handleSubmitUser} // fn needed
        onUpdateUser = {this.handleUpdateUser}
        header = {this.props.route.header} // str needed
        username = {this.state.username}/>
    )
  }
});

module.exports = PromptContainer;

/*
Good idea to separate container from presentational components
PromptContainer: business logic
Prompt: presentational logic (UI)
*/