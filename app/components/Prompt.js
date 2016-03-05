var React = require('react');
var PropTypes = React.PropTypes;
var transparentBg = require('../styles').transparentBg;

// Functional stateless components: if you have components that only renders and has propTypes
function Prompt(props) {
  return ( // replace 'this.props' with 'props'
    <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
      <h1>{props.header}</h1>
      <div className="col-sm-12">
        <form onSubmit={props.onSubmitUser}>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Github username"
              onChange={props.onUpdateUser}
              value={props.username}
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

Prompt.propTypes = {
  // if header is not str, code will err
  header: PropTypes.string.isRequired,
  onSubmitUser: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

module.exports = Prompt;

/*
Good idea to separate container from presentational components
PromptContainer: business logic
Prompt: presentational logic (UI)
*/