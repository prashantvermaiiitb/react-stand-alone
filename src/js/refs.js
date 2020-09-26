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
   * Showing how to use refs in the page to get the value of DOM node and use that.
   */
  changeColor: function () {
    this.setState({
      clicked: !this.state.clicked,
      text: this.refs.newTextBox.value,
    });
    this.refs.newTextBox.value = "";
  },
  render: function () {
    let text = this.state.text
      ? this.state.text
      : `Hello World !! from ChildComponent - ${this.props.id}`;
    return (
      <div>
        <div
          className={
            this.state.clicked ? "active-child-component" : "child-component"
          }
        >
          {text}
        </div>
        <input type="text" ref="newTextBox"></input>
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
 * having the component here with props="1"
 */
ReactDOM.render(<Component id="1" />, document.getElementById("example"));
