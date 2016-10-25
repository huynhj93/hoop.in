import React from 'react';
import axios from 'axios';

class Player extends React.Component {
	constructor (props) {
		super(props),
		this.state = { player: this.props.name };
	}

	removePlayer() {
		var self = this;
		console.log('the addqueued player function was passed down properlu:', this.props.addQueuedPlayer);
		console.log('i was clicked!');
		axios({
			method: 'delete',
			url: '/api/deletePlayer',
			data: {
				name: this.props.name,
				token: this.props.gameToken,
			},
		})
		.then(function (resp) {
			console.log('i deleted the player, the resp is:', resp);
			console.log('i have the right function!', self.props.getTeam);
			console.log('i called add queued player!');
			self.props.getTeam();
		})
		.catch(function (err) {
			console.log('i failed in deleteing the player', err);
		});
	}

	render () {
		return (
		  <div>
		  	<li> 
		  		<div className="text-center container">
		  			<div className="row">
		  				<h3>{this.props.name}</h3> 
		  				<button onClick={this.removePlayer.bind(this)}>Remove</button>
		  			</div>
		  		</div>
		  	</li>
		  </div>
		);
	}
}

export default Player;
