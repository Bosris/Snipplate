import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import { withRouter } from "react-router"
import { useHistory } from "react-router-dom"
import axios from 'axios'


const Navbar = (props) => {

  return (
  <nav style={{backgroundColor: '#302F2f', height: '70px', display: 'flex'}}>
    <ul style={{margin: '0px', padding: '4px', alignSelf: 'center', display: 'flex', width: '100%', justifyContent: 'space-evenly', listStyleType: 'none' }}>
<li><NavLink to='/' style={{ color: 'white', textDecoration: 'none', }}>Home</NavLink></li>
      <li><NavLink to='/' style={{ color: 'white', textDecoration: 'none', }}>Snipplate</NavLink></li>
      <li>
        {!props.authed ?
        <NavLink exact to='/login' style={{ color: 'white', textDecoration: 'none' }}>Login</NavLink>
        :
        <a style={styles.Logout} onClick={props.handleLogout}>Logout</a> }
      </li>
    </ul>

  </nav>
  )
}

const styles = {
  Logout: {
      cursor: 'pointer'
  }
}

export default Navbar;