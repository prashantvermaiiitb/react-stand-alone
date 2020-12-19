/**
 * Simple component created from react class.
 */
var Component = React.createClass({
  render: function () {
    return (
      <div>
        {React.createElement(
          "h1",
          {
            style: { backgroundColor: "#cacaca" },
            "data-update": "udpate",
            'data-update-1':{k:'hello-1'},//this will become [Object object]
          },
          <span>
            {Math.floor(Math.random() * 100)} is generated from the JS.
          </span>
        )}
        <h1>Hello World !! from my new Component.</h1>
      </div>
    );
  },
});

ReactDOM.render(<Component />, document.getElementById("example"));
