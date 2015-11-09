var Search = React.createClass({
  render: function() {
    return (
      <input onChange={this.props.onChange} type="text" placeholder="search..." className="search"/>
    );
  }
});
