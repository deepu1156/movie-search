var React = require('react');

module.exports = React.createClass({
  loadTopMovies: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTopMovies();    
  },
  render: function() {
    var baseUrl = "http://image.tmdb.org/t/p/w500";
    var apiKey = "?api_key=11111111";
    var movies = this.state.data.map(function (movie) {
      var imgSource = baseUrl + movie.poster_path + apiKey;
      return (
        <MovieElement key={movie._id} imgSource={imgSource} name={movie.title} />
      );
    });    
    return (
      <ul>
        {movies}
      </ul>      
    );
  }
});
var MovieElement = React.createClass({
  render: function() {
    return (
      <div className="col-md-2 col-lg-2">
            <a href="#" className="thumbnail">
              <img id={this.props.key} src={this.props.imgSource} alt={this.props.name} />
            </a>
        </div> 
    );
  }
});