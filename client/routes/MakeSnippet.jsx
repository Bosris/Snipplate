import React, {useState} from 'react';
import Navbar from '../components/Navbar.jsx'
import Highlight from 'react-highlight'
import Editor from 'react-simple-code-editor';
import Prism from "prismjs";
// import "./prism.css"
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';


// const handleSnippet = () => {
//   let name = "lol";
//   history.push('/snippet')
//   console.log(`${name}`)
// }


const MakeSnippet = (props) => {
  const [code, setCode] = useState("")

  return (
  <>
    <Navbar handleLogout={props.handleLogout} authed={props.authed} />
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
    <h1>Create Snippet</h1>
      <form style={styles.form}>
        <label for="tech">Type of snippet (Tech used): </label>
        <input name="tech" type="text"/>
        <label>Code Here:</label>
        <Editor
        value={code}
        onValueChange={code => setCode( code )}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
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
}


export default MakeSnippet;