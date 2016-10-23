//Libs
import React, { Component } from 'react';
import axios from 'axios';
import {Link, browserHistory} from 'react-router';
import Autocomplete from 'react-google-autocomplete';

//Components
// import GameLocation from './game_location_component.js';
// import SubmitButton from './submit_component.js';
// import BackButton from './back_component.js';

class Create extends Component {
	constructor (props) {
		super(props);

		this.state = { name: '', location: '', time: '' , token: ''};
	}

	handleSubmit = (event) => {
	    event.preventDefault();
	    var name = this.state.name.trim();
	    var location = this.state.location.trim();
	    var time = this.state.time.trim();
	    if (!name || !location || !time) {
	    	console.log('Missing input!');
	    	return;
	    }
	    // POST: send post request to the server
	    const self = this;
	    axios.post('/api/newGame', {
				name: this.state.name,
				location: this.state.location,
				time: this.state.time
			})
		  .then(function (response) {
		  	localStorage.setItem("token", response.data.game.token);
		  	browserHistory.push('/share')
			console.log(response);
    	})
    	.catch(function (error) {
    		console.log(error);
    	})
	    this.setState({name: '', location: '', time: '', token: 'empty'});
	};

    render () {
    	console.log(this.state)
		return (
			<div className='text-center'>
				<section><h1>Create Game</h1></section>
				<form>
					<div>
						<input type='text' name='name' placeholder='name' value={this.state.name} onChange={nameEvent => this.setState({ name: nameEvent.target.value })} />
					</div>
					<div>
						<Autocomplete types={['address']} type='text' name='location' placeholder='location' value={this.state.location} onChange={locationEvent =>this.setState({ location: locationEvent.target.value })} />
					</div>
					<div>
						<input type='time' name='time' value={this.state.time} onChange={timeEvent => this.setState({ time: timeEvent.target.value })} />
					</div>
    	    <div>
    	    	<button onClick={this.handleSubmit}>submit</button>
						<button><Link to='/' >back</Link></button>
					</div>
				</form>
			</div>
		);
	}
};

export default Create;
