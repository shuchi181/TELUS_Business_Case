import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar } from 'react-bootstrap';



const TopBar = () => {
    return (
        <Navbar bg="dark" sticky="top" className="p-4">
            <Navbar.Brand><Link className="text-white font-weight-bold" to="/">TELUS Business Case</Link></Navbar.Brand>
        </Navbar>
    );
}
export default TopBar;