/**
 * Child component created from the react class
 */
var ChildComponent = React.createClass({
  /**
   * Click event handler for the child component
   */
  showMyName: function () {
    alert(`I am ${this.props.id}`);
  },
  render: function () {
    let text = `Hello World !! from ChildComponent - ${this.props.id}`;
    return (
      <div className="child-component" onClick={this.showMyName}>
        {text}
      </div>
    );
  },
});

/**
 * parent component created from react class.
 * Shows how to include the inline styles directly or create a variable and use that
 * Creating 2 child components inside the Parent and display them.
 */
var ParentComponent = React.createClass({
  /**
   * Click event handler for the parent component.
   */
  showMyName: function () {
    alert(`I am ${this.props.id}`);
  },
  render: function () {
    let childContainerStyle = { padding: 7 };
    let text = `Hello from the Parent Component - ${this.props.id}`;
    return (
      <div>
        <h1 className="parent-component">
          <span style={{ fontSize: 18, padding: 10 }} onClick={this.showMyName}>
            {text}
          </span>
          <div style={childContainerStyle}>
            <ChildComponent id={`${this.props.id}.1`} />
            <ChildComponent id={`${this.props.id}.2`} />
            <ChildComponent id={`${this.props.id}.3`} />
          </div>
        </h1>
      </div>
    );
  },
});
/**
 * Showing multiple components created in the main parent.
 * Showing multiple components in the Dom using ReactDom.
 */
ReactDOM.render(
  <div>
    <ParentComponent id="1" />
    <ParentComponent id="2" />
  </div>,
  document.getElementById("example")
);
