var Clock = React.createClass ({
  render: function() {
    // debugger
    return (
      <div>
        {this.state.date.toString()}
      </div>
    );
  },
  getInitialState: function() {
    return {
      date: new Date()
    };
  },
  componentDidMount: function() {
    this.interval = setInterval(function() {
      this.setState({
        date: new Date()
      });
    }.bind(this), 500);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  }
});
