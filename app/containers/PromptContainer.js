var React = require('React');
var transparentBg = require('../styles').transparentBg;

var PromptContainer = React.createClass({
  contextTypes: { // don't have to pass router down as props of a component; it's here as contextTypes[router]
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      username: ''
    }
  },

  onUpdateUser: function(e) { // update this.state.username when input changes
    this.setState({
      username: e.target.value
    });
  },

  onSubmitUser: function(e) {
    e.preventDefault();
    var username = this.state.username;
    this.setState({
      username: ''
    });

    if (this.props.routeParams.playerOne) { // :playerOne
      console.log('a: ', this.context);
      // go to /battle
      this.context.router.push({
        pathname: '/battle',
        query: {
          playerOne: this.props.routeParams.playerOne,
          playerTwo: this.state.username
        }
      })
    } else {
      console.log('b: ', this.context);
      // go to /playerTwo
      this.context.router.push('/playerTwo/' + this.state.username)
    }
  },

  render: function() {
    console.log(this);
    return (
      <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
        <h1>{this.props.route.header}</h1>
        <div className="col-sm-12">
          <form onSubmit={this.onSubmitUser}>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Github username"
                onChange={this.onUpdateUser}
                value={this.state.username}
                type="text" />
            </div>
            <div className="form-group col-sm-4 col-sm-offset-4">
              <button className="btn btn-block btn-success" type="submit">
              Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = PromptContainer;

/*
Good idea to separate container component from presentational components
PromptContainer: business logic
AnotherComponent: presentational logic (UI)