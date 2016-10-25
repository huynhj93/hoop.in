//Libs
import React from 'react';
import { Link } from 'react-router';

import CSS from '../../CSS/create.css';

const JoinButton = function () {
	return <button><Link to='/join'>join</Link></button>;
};

export default JoinButton;
