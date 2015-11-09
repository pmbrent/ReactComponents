var Weather = React.createClass({
  render: function() {
    var message;
    if (this.state.data === null) {
      message = "Loading...";
    } else {
      message = this.state.data.weather[0].description + ", " + this.state.data.main.temp;
    }

    return (
      <div>{message}</div>
    );
  },
  getInitialState: function() {
    return {data: null};
  },
  componentDidMount: function () {
    navigator.geolocation.getCurrentPosition(function(data) {
      this.lat = data.coords.latitude;
      this.lon = data.coords.longitude;
      this.getWeather();
    }.bind(this));
    this.appId = "2de143494c0b295cca9337e1e96b00e0";
    this.url = "http://api.openweathermap.org/data/2.5/weather";
  },
  getWeather: function() {
    var request = new XMLHttpRequest();
    var url = this.url + "?lat=" + this.lat + "&lon=" + this.lon + "&appid=" + this.appId;
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        this.setState({
          data: JSON.parse(request.responseText)
        });
      }
    }.bind(this);

    request.send();
  }
});
