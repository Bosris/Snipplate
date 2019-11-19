import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar.jsx'
import Highlight from 'react-highlight'
import Editor from 'react-simple-code-editor';
import {Controlled as CodeMirror} from 'react-codemirror2'

// import './codemirror.css';

import 'codemirror/theme/material.css';

import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import axios from 'axios'
import history from '../history.jsx'
import {
  useParams
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {TrashSpan} from './styles.js'


const SnippetView = (props) => {
  const { id } = useParams();

  const handleDelete = (e, ele, index) => {
    let deleteSnippet = props.snippets[id].snipplates.splice([index], 1);

    let {snipplates, tech} = props.snippets[id]

    // console.log(description)
    axios.delete(`/api/snippet/${id}`, {data: {
      snipplates, tech
      },
    }).then(res => {
      if(res.status === 200 && res.data.success === "Deleted Whole Snipplate"){
        props.getUserData()
        props.history.push('/')
      }
      if(res.status === 200 && res.data.success === "Deleted one snippet"){
        props.getUserData()
      }
    })
  }

  return (
  <>
    <Navbar handleLogout={props.handleLogout} authed={props.authed} />
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
    <h1>{props.currentSnippet.tech}</h1>
    <div style={styles.techContainer}>

    {props.currentSnippet.snipplates.map( (ele, index) =>

    <div style={{boxShadow: '0 -2px 10px rgba(0, 0, 0, 1)', marginBottom: '20px'}}>
    <h4 style={{textAlign: 'center'}}>
      <span style={{paddingRight: '20px'}}>
        {ele.description}
      </span>
      <TrashSpan onClick={(e) => handleDelete(e, ele, index)}>
        <FontAwesomeIcon icon={faTrash}/>
      </TrashSpan>
    </h4>

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
      </div>
    )}
      </div>
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
  techContainer: {
    display: 'flex',
    width: '40%',
    flexDirection: 'column'
  },
  trashBtn: {
    paddingLeft: '20px',
    "&:hover":{
      backgroundColor: 'red'
    }
  }
}


export default SnippetView;