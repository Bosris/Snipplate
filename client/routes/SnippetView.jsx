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
import {
  useParams
} from "react-router-dom";


const SnippetView = (props) => {
  const { id } = useParams();
  console.log(id)
  return (
  <>
    <Navbar handleLogout={props.handleLogout} authed={props.authed} />
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
    <h1>{props.currentSnippet.tech}</h1>
    {props.currentSnippet.snipplates.map(ele =>
    <>
      <h4>{ele.description}</h4>
       <CodeMirror
       value={ele.codeValue}
       options={{
         mode: 'javascript',
         theme: 'material',
         lineNumbers: true
       }}
       onChange={(editor, data, value) => {
       }}
        />
      </>
    )}

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


export default SnippetView;