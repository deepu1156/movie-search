var React = require('react');
var ReactDOM = require('react-dom');
var TopMovieList = require('./top-movies.js');
var NavBar = require('./nav-bar.js');

var MovieSearch = React.createClass ({
  render: function() {
    return(
      <div>
        <NavBar />
        <MainBody />
      </div>      
    );
  }
});
var MainBody = React.createClass({
  render: function() {
    return(
      <div className="container-fluid">
        <div className="row">
          <h3>Most Popular Movies</h3>
        </div>
        <div className="row">
          <div className="col-md-1 col-lg-1 carousel-left-arrow">
            <a href="#">
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>  
            </a>
          </div>          
          <TopMovieList url="/movies" />   
          <div className="col-md-1 col-lg-1 carousel-right-arrow">
            <a href="#">
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>  
            </a>
          </div>
        </div>                  
      </div>
    );
  }
});

ReactDOM.render(
  <MovieSearch />,
  document.getElementById('content')
);