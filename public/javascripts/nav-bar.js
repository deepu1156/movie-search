var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" 
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
             <a className="navbar-brand" href="#">Brand</a>
          </div>          
          <div className="collapse navbar-collapse ms-large-font" id="bs-example-navbar-collapse-1">
            <SourceList url="/sources" />
            <SearchForm />
            <NavRight />
          </div>
        </div>
      </nav>
    );
  }
});
var SourceList = React.createClass({
  loadSourcesFromServer: function() {
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
    this.loadSourcesFromServer();    
  },
  render: function() {
    var sourceNodes = this.state.data.map(function (source) {
      return (
        <SourceElement key={source.id} sourceName={source.name} />
      );
    });    
    return (
      <ul className="nav navbar-nav">
        {sourceNodes}
      </ul>
    );
  }
});
var SourceElement = React.createClass({
  render: function() {
    return (
      <li><a href="#">{this.props.sourceName}</a></li>
    );
  }
});
var SearchForm = React.createClass({
  render: function() {
    return (
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search"></input>
        </div>
        <button type="submit" className="btn btn-default" style={{marginLeft:'5px'}}>Submit</button>
      </form>
    );
  }
});
var NavRight = React.createClass({
  render: function() {
    return (
      <ul className="nav navbar-nav navbar-right ms-xlarge-font">
        <li><a href="#"><span className="glyphicon glyphicon-question-sign"></span></a></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" 
             aria-haspopup="true" aria-expanded="false">
           <span className="glyphicon glyphicon-user"></span> 
           <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    );
  }
});