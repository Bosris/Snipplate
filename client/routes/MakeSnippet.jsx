import React, {useState, useEffect} from 'react';
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
  const [snippetNames, setSnippetNames] = useState([]);
  const [typeOfSnippet, setTypeOfSnippet] = useState("update");
  const [whichToUpdate, setWhichToUpdate] = useState("");

  useEffect(() => {
    if(props.snippets.length) {
      props.snippets.forEach(ele => {
        console.log(ele.tech)
        setSnippetNames(prevState => [...prevState, ele.tech])
      })

      setWhichToUpdate(props.snippets[0].tech)
    } else {
      setTypeOfSnippet("new")
    }

  }, [])

  const handleTypeOfSnippet = (e) => {
    setTypeOfSnippet(e.target.value)
  }
  const handleWhichToUpdate = (e) => {
    setWhichToUpdate(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(typeOfSnippet === "new"){
      let snipplates = [{codeValue, description}]
      let snippets = [{tech, snipplates}]
      axios.post('/api/snippet', {
        snippets
      }).then(res => {
        if(res.status === 200){
         props.getUserData()
        }
      }).then(() =>  history.push('/'))
    }

    if(typeOfSnippet === "update"){
      let snipplates = [{codeValue, description}]
      let snippets = [{tech, snipplates}]
      console.log(snippets)
      axios.put('/api/snippet', {
        snippets, whichToUpdate
      }).then(res => {
        if(res.status === 200){
          props.getUserData()
          history.push('/')
        }
      })


    }

  }

  return (
  <>
    <Navbar handleLogout={props.handleLogout} authed={props.authed} />
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
    <h1>Create a Snipplate</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
{ props.snippets.length > 0 ?
        <>
        <label>Update a Snipplate or Add New?</label>
        <select style={styles.select} onChange={handleTypeOfSnippet}>
          <option value="update" name="update" selected>Update</option>
          <option value="new" name="new">New</option>
        </select> </>  : ""

  }
{ typeOfSnippet === "new" ?
      <div>
       <label style={{marginTop: '10px'}}for="tech">Language of snippet: </label>
       <input style={styles.input} placeholder="Language"value={tech} onChange={(e) => setTech(e.target.value)} name="tech" type="text"/>
      </div>
    :
      <div>
        <label>Select Which you want to update: </label>
        <select style={styles.select2} onChange={handleWhichToUpdate}>
          {snippetNames.map(ele =>
            <option value={ele}>{ele}</option>
          )}
        </select>
      </div>
}

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
          <label style={{paddingTop: '10px', paddingBottom: '10px'}}for="description">Brief Description:</label>
          <input style={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} name="description" type="text"/>
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
  input: {
    backgroundColor: '#302F2f',
    border: '0',
    textAlign: 'center',
    borderRadius: '10px',
    height: '25px',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 1)',
    color: 'white'
  },
  select: {
    border: '0',
    background: 'rgb(48, 47, 47)',
    color: 'white',
    borderRadius: '20px',
    padding: '5px 0px 5px 0px',
    textAlign: 'center',
    textIndent: '50%',
    margin: '5px 0px 6px 0px',
    boxShadow: 'rgb(0, 0, 0) 0px -2px 10px',
  },
  select2: {
    border: '0',
    background: 'rgb(48, 47, 47)',
    color: 'white',
    borderRadius: '20px',
    padding: '5px 0px 5px 0px',
    textAlign: 'center',
    margin: '5px 0px 6px 0px',
    boxShadow: 'rgb(0, 0, 0) 0px -2px 10px',
  }
}


export default MakeSnippet;