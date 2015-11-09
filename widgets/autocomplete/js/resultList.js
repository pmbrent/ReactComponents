var ResultList = React.createClass({
  render: function() {
    return (
      <ul>
        {
          this.props.names.map(function(name, index) {
            return <li key={index}>{name}</li>;
          })
        }
      </ul>
    );
  }
});
