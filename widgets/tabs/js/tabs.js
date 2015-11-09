var Tabs = React.createClass({
  render: function() {
    var key = Object.keys(this.props.data)[this.state.activeIdx];
    var content = this.props.data[key];

    return(
      <div>
        <Header titles={Object.keys(this.props.data)} onClick={this.setActiveIdx} />
        <article>{content}</article>
      </div>
    );
  },
  getInitialState: function() {
    return {
      activeIdx: 0
    };
  },
  setActiveIdx: function(index) {
    this.setState({activeIdx: index});
  }
});
