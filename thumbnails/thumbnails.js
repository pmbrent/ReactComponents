var Thumbnails = React.createClass({
  render: function() {
    var firstIdx = this.state.firstIdx;
    var dispIdx = (this.state.curIdx !== null) ? this.state.curIdx : this.state.activeIdx;
    return (
      <div className="container">
        <img src={this.props.sources[dispIdx]} className="active"/>
        <div className="nav-list">
          <Thumblist sources={this.props.sources.slice(firstIdx, firstIdx + 5)}
            onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}
            onClick={this.onClick} firstIdx={this.state.firstIdx}/>
          <button className="nav" onClick={this.move.bind(this, -1)}>&lt;</button>
          <button className="nav" onClick={this.move.bind(this, 1)}>&gt;</button>
        </div>
      </div>
    );
  },
  getInitialState: function() {
    return {activeIdx: 0, firstIdx: 0, curIdx: 0};
  },
  move: function(dir) {
    if (this.props.sources.length < 5) return;

    var idx = this.state.firstIdx + dir;

    if (idx < 0) {
      idx = 0;
    } else if (idx > this.props.sources.length - 5) {
      idx = this.props.sources.length - 5;
    }

    this.setState({firstIdx: idx});
  },
  onMouseOver: function(idx) {
    this.setState({curIdx: idx});
  },
  onMouseLeave: function() {
    this.setState({curIdx: null});
  },
  onClick: function(idx) {
    this.setState({activeIdx: idx});
  }
});

var Thumblist = React.createClass({
  render: function() {
    return (
      <ul className="thumblist group">
        {this.props.sources.map(function(source, idx) {
          idx += this.props.firstIdx;
          return <Thumb key={idx} source={source}
            onMouseOver={this.props.onMouseOver.bind(null, idx)}
            onMouseLeave={this.props.onMouseLeave}
            onClick={this.props.onClick.bind(null, idx)}/>;
        }, this)}
      </ul>
    );
  }
});

var Thumb = React.createClass({
  render: function() {
    return (
      <li className="thumb" onMouseOver={this.props.onMouseOver}
        onMouseLeave={this.props.onMouseLeave}
        onClick={this.props.onClick}>
        <img src={this.props.source}/>
      </li>
    );
  }
});
