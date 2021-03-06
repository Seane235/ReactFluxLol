$ = jQuery = require('jquery');

var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./components/homePage');
var Header = require('./components/partials/header');
var About = require('./components/about/aboutPage');
var SwatchRow = require('./components/swatches/swatchRow');

var App = React.createClass({
	render: function(){
		var Child;
		switch(this.props.route) {
			case 'about' : Child = About; break;
			case 'swatches' : Child = SwatchRow; break;
			default : Child = Home;
		}

		return (
			<div>
				<Header />
				<Child />
			</div>
		);
	}
});

function render(){
	var route = window.location.hash.substring(1);
	// console.log(route);
	ReactDOM.render(<App route={route} />, document.getElementById('app'));
}

window.addEventListener('hashchange', render);
render();
