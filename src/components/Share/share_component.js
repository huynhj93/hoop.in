import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

//GET token

class Share extends Component {
  constructor (props) {
    super(props),

    this.state = {};
  };

  componentDidMount() {
    this.setState({ token: localStorage.getItem('token') });
  }

  //GET token to form share link

  render () {
    return (
      <div className='text-center'>
        <section><h1>Share Game</h1></section>
        <div>{`https://teamhoopin.herokuapp.com/join?token=${this.state.token}`}</div>
        <div>
          <button><Link to={`room/${this.state.token}`} >create</Link></button>
          <button><Link to='/create' >back</Link></button>
        </div>
      </div>
    );
  }
}

export default Share;
