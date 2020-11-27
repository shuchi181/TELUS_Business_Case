import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai';
import { connect } from 'react-redux';
import { clearUser } from '../../actions/user';
import { clearForm } from '../../actions/form';

const TopBar = ({ clearUser, clearForm }) => {
    const history = useHistory();
    const onLogoClick = () => {
        clearForm();
        clearUser();
        history.push("");
    }
    return (
        <Navbar bg="dark" sticky="top" className="p-4 justify-content-between">
            <Navbar.Brand className="text-white lead" type="button" onClick={() => onLogoClick()}><h4>TELUS Business Case</h4></Navbar.Brand>
            <a target="_blank" rel="noreferrer" href="https://github.com/mnakajima00/TELUS_Business_Case"><AiFillGithub size={40} className="text-white"/></a>
        </Navbar>
    );
}
export default connect(null, { clearUser, clearForm })(TopBar);