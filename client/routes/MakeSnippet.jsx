import React, {useState} from 'react';
import Navbar from '../components/Navbar.jsx'
import Highlight from 'react-highlight'
import Editor from 'react-simple-code-editor';
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import axios from 'axios'
import history from '../history.jsx'



const MakeSnippet = (props) => {
  const [codeValue, setCodeValue] = useState("")
  const [tech, setTech] = useState("")
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    const snipplates = [{codeValue, description}]

    // const code = {codeValue, description}
    const snippets = [{tech, snipplates}]
    e.preventDefault();
    axios.post('/api/snippet', {
      snippets
    }).then(res => {
      if(res.status === 200){
        history.push('/')
      }
    })
  }

  return (
  <>
    <Navbar handleLogout={props.handleLogout} authed={props.authed} />
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
    <h1>Create a Snipplate</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label for="tech">Language of snippet: </label>
        <input value={tech} onChange={(e) => setTech(e.target.value)} name="tech" type="text"/>
        <label>Code Here:</label>
        <CodeMirror
            value={codeValue}
            options={{
              mode: 'javascript',
              lineNumbers: true,
              theme: "material"
            }}
            onBeforeChange={(editor, data, value) => {
              setCodeValue({value});
            }}
            onChange={(editor, data, value) => {
              setCodeValue(value)
            }}
          />
          <label for="description">Brief Description</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} name="description" type="text"/>
          <input style={styles.button} type="submit"></input>
      </form>
    </div>
  </>
  )
};
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
}


export default MakeSnippet;