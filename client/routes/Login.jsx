import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from '../components/Navbar.jsx'
import axios from 'axios'

const Login = (props) => {
  const [email, setEmail ] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post('/api/login', {
      email, password
    }).then(res => {
      console.log(res)
      // props.handleAuth()
      // props.history.push('/')
    })
      .catch(err => setErr('Wrong Username or Password'))

  }

  return (
  <>
    <Navbar />
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
    <h1>Login</h1>
    {err.length > 0 ? <p>{err}</p> : ""}
    <form onSubmit={handleSubmit} style={styles.form}>
      <label for="email" style={styles.label}>Email:</label>
      <input name="email" onChange={(e) => setEmail(e.target.value)} style={styles.input} type="email" required></input>
      <label for="password" style={styles.label}>Password:</label>
      <input name="password" onChange={(e) => setPassword(e.target.value)} style={styles.input} type="password" required></input>
      <input style={styles.button} type="submit"></input>
    </form>
    </div>
  </>
  )
}


const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    minWidth: '400px'
  },
  button: {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inlineBlock',
    fontSize: '14px',
    marginTop: '10px',
    borderRadius: '20px'
  },
  label: {
    marginTop: '10px'
  },
  input: {
    width: '100%',
    padding: '12px 10px',
    margin: '8px 0',
    boxSizing: 'border-box',
    borderRadius: '30px',
    textAlign: 'center'
  }
}

export default Login;