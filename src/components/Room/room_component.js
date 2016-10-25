import React, { Component } from 'react';
import Gmap from './map_component.js';
import Queue from './queue_component.js';
import axios from 'axios';

class Room extends React.Component {
  constructor (props) {
    super(props),
    this.state = { players: { team1: [], team2: [], queue: [] } };
  }

  componentWillMount() {
    var self = this;
    this.setState({ token: localStorage.getItem('token') });
    this.getTeam();
  }

  getTeamForDeleteButton() {
    var self = this;
    axios.get(`/api/getPlayers?token=${this.state.token}`)
    .then (function (response) {
      self.setState({ players: { team1: response.data.team1, team2: response.data.team2, queue: response.data.queue } });
      self.addQueuedPlayer();
    })
    .catch(function (error) {
      console.log('the error is in room romponent get team for delete button');
    });
  }

  getTeam() {
    var self = this;
    const teamGetCall = () => (axios.get(`/api/getPlayers?token=${this.state.token}`)
    .then(function (response) {
      console.log(response.data.team1.length);
        if (response.data.team1.length !== 0 || response.data.team2.length !== 0) {
          console.log('inside if promise');
          self.setState({ players: { team1: response.data.team1, team2: response.data.team2, queue: response.data.queue } });
        }
    })
    .catch(function (error) {
      console.log(error);
    })
    );
    teamGetCall();
    setInterval(teamGetCall, 5000);
  }

  addQueuedPlayer() {
    var self = this;
    var team1HasRoom = self.state.players.team1.length < 5;
    var team2HasRoom = self.state.players.team2.length < 5;
    var queueHasPlayer = self.state.players.queue.length >= 1;
    console.log('team1hasroom:', team1HasRoom);
    console.log('team2hasroom:', team2HasRoom);
    console.log('queuehasplayer:', queueHasPlayer);
    if (queueHasPlayer && (team1HasRoom || team2HasRoom)) {
      console.log(' i entered the if!');
      var player = self.state.players.queue.shift();
      console.log('the new player name should be player11', player.name);
      var token = self.state.token;
      console.log('the token from the front end is:', token);
      axios({
          method: 'POST',
          url: '/api/newPlayer',
          data: {
              token: token,
              name: player.name,
          },
      })
      .then(function (resp) {
          console.log('the response from a /api/newplayer in room_components is:', resp);
      })
      .catch(function (error) {
          console.log('the error is in addquued player in room_component', error);
      });
    }
  }

  // pass teams object into queue

  render () {
    return (
      <div className="room">
        <Gmap />
        <Queue players={this.state.players} gameToken={this.state.token} getTeam={this.getTeamForDeleteButton.bind(this)} addQueuedPlayer={this.addQueuedPlayer.bind(this)} />
      </div>
    );
  }
}

export default Room;
