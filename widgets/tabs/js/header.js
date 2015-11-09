var Header = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.titles.map(function(title, index) {
          return (<li key={index}>
            <a href="#{title}" onClick={
              function() { this.props.onClick(index); }.bind(this)
            }>{title}</a>
          </li>);
        }.bind(this))}
      </ul>
    );
  }
});
