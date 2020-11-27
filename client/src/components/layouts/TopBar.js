import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { AiFillGithub } from 'react-icons/ai';



const TopBar = () => {
    return (
        <Navbar bg="dark" sticky="top" className="p-4 justify-content-between">
            <Navbar.Brand><Link className="text-white font-weight-bold" to="/">TELUS Business Case</Link></Navbar.Brand>
            <a target="_blank" rel="noreferrer" href="https://github.com/mnakajima00/TELUS_Business_Case"><AiFillGithub size={40} className="text-white"/></a>
        </Navbar>
    );
}
export default TopBar;