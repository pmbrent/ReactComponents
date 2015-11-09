var AutoComplete = React.createClass({
  render: function() {
    var names = this.props.names.filter(function(name) {
      return name.toLowerCase().match(this.state.searchVal);
    }.bind(this));

    return (
      <div>
        <Search onChange={this.updateSearch}/>
        <ResultList names={names} />
      </div>
    );
  },
  getInitialState: function() {
    return {
      searchVal: ""
    };
  },
  updateSearch: function(e) {
    this.setState({
      searchVal: e.target.value.toLowerCase()
    });
  }
});
