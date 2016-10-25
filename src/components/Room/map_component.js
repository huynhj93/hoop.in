import React from 'react';

const  lat = localStorage.getItem('lat');
const  lng = localStorage.getItem('lng');
const map = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBlnC4Cp2iBrYCbpQ4jLEYIhD4_MGQXxd4&q=${lat},${lng}&zoom=12`;

class Gmap extends React.Component {
  constructor (props) {
    super(props),
    this.state = { lat: 0, lng: 0, map: '' };
  }

  componentWillMount() {
    this.setState({ lat: localStorage.getItem('lat'), lng: localStorage.getItem('lng'), map: `https://www.google.com/maps/embed/v1/place?key=AIzaSyBlnC4Cp2iBrYCbpQ4jLEYIhD4_MGQXxd4&q=${lat},${lng}&zoom=12` });
  }

render() {
	return (
<div>
	<iframe id="map" className="center-block" src={map}></iframe>
		<button className="center-block">end game</button>
		<button className="center-block">leave game</button>
 </div>
    );
  }
  }
export default Gmap;
