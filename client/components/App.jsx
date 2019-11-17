import React from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
import axios from 'axios'
import DecisionRoute from './DecisionRoute.jsx'
import Signup from '../routes/Signup.jsx'
import Dashboard from '../routes/Dashboard.jsx'
import Login from '../routes/Login.jsx'
import MakeSnippet from '../routes/MakeSnippet.jsx'
import history from '../history.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      username: null,
      snippets: {}
    }
    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }


  componentDidMount(){
    this.getUser();
  }

  getUser(){
    axios.get('/api/')
    .then(res => {
      console.log('testing res.data', res.data.user)
      if(res.data.user){
        this.setState({
          authed: true
        })
      }
    })

  }


  handleAuth(){
    this.setState({
      authed: !this.state.authed
    })
  }

  handleLogout(){
      fetch('/api/logout',
      {
        method: 'post'
      }).then(res => {
        return this.setState({authed: false})
      }).then(res => {
        history.push("/login")
        console.log(history)
      })

  }



  render(){
    return(
        <Switch>
        {this.state.authed === false ? <Redirect exact from='/' to='/login' /> : <Redirect exact from='/login' to='/' />}
          <Route
          exact path='/signup'
          render={(props) => (<Signup {...props } handleAuth={this.handleAuth} authed={this.state.authed} /> )}
          />
          <Route
          exact path='/login'
          render={(props) => (<Login {...props } handleAuth={this.handleAuth} authed={this.state.authed} /> )}
          />
          <DecisionRoute path='/' exact={true}
          authed={this.state.authed} handleLogout={this.handleLogout} component={Dashboard}/>

          <DecisionRoute path='/snippet' exact={true}
          authed={this.state.authed} component={MakeSnippet}/>
        </Switch>
    )
  }
}

export default App;
