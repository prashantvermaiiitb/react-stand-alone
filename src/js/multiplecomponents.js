/**
 * Child component created from the react class
 */
var ChildComponent = React.createClass({
  render: function () {
    let text = "Hello World !! from my ChildComponent.";
    return <div className="child-component">{text}</div>;
  },
});

/**
 * parent component created from react class.
 * Shows how to include the inline styles directly or create a variable and use that
 * Creating 2 child components inside the Parent and display them.
 */
var ParentComponent = React.createClass({
  render: function () {
    let childContainerStyle = { padding: 7 };
    let text = "Hello from the Parent Component.";
    return (
      <div>
        <h1 className="parent-component">
          <span style={{ fontSize: 18, padding: 10 }}>{text}</span>
          <div style={childContainerStyle}>
            <ChildComponent />
            <ChildComponent />
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
    <ParentComponent />
    <ParentComponent />
  </div>,
  document.getElementById("example")
);
