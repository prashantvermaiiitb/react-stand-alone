/**
 * Simple component created from react class.
 */
var Component = React.createClass({
  render: function () {
    return <h1>Hello World !! from my new Component.</h1>;
  },
});

ReactDOM.render(<Component />, document.getElementById("example"));
