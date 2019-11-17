import React from 'react';
import Navbar from '../components/Navbar.jsx'
import history from '../history.jsx'

const Dashboard = (props) => {
 const handleSnippet = () => {
  history.push('/snippet')
 }

  return (
  <>
    <Navbar handleLogout={props.handleLogout} authed={props.authed} />
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <h1>Dashboard</h1>
      <div style={{display: 'flex', }}>
      <h4>React</h4>
      <h4>React</h4>
      <h4>React</h4>
      <h4>React</h4>
      <h4>React</h4>
      </div>
    </div>
    <div style={{display: 'flex', justifyContent:'center'}}>
    <button onClick={handleSnippet} style={styles.button}>Add Snippet</button>
    </div>
  </>
  )
};

const styles = {
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
}

export default Dashboard