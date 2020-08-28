/**
 * component created from the react class
 * This will demonstrate the usage of the
 */
var Component = React.createClass({
  /**
   * Getting initial state for the component
   */
  getInitialState: function () {
    return { clicked: false };
  },
  /**
   * Changing the color of the component after it's being clicked
   */
  changeColor: function () {
    this.setState({ clicked: !this.state.clicked });
  },
  render: function () {
    let text = `Hello World !! from ChildComponent - ${this.props.id}`;
    return (
      <div>
        <div
          className={
            this.state.clicked ? "active-child-component" : "child-component"
          }
        >
          {text}
        </div>
        <button
          className={this.state.clicked ? "active-button" : "inactive-button"}
          onClick={this.changeColor}
        >
          Change Color
        </button>
      </div>
    );
  },
});

/**
 * Showing multiple components created in the main parent.
 * Showing multiple components in the Dom using ReactDom.
 */
ReactDOM.render(<Component id="1" />, document.getElementById("example"));
