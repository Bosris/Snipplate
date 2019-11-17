import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import DecisionRoute from './DecisionRoute.jsx'
import Signup from '../routes/Signup.jsx'
import Dashboard from '../routes/Dashboard.jsx'
import Login from '../routes/Login.jsx'



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authed: false
    }
    this.handleAuth = this.handleAuth.bind(this)
  }



  handleAuth(){
    this.setState({
      authed: !this.state.authed
    })
  }


  render(){
    return(
      <Router>
        <Switch>
        {this.state.authed === false ? <Redirect exact from='/' to='/login' /> : ""}
          <Route
          exact path='/signup'
          render={(props) => (<Signup {...props } handleAuth={this.handleAuth} authed={this.state.authed} /> )}
          />
          <Route
          exact path='/login'
          render={(props) => (<Login {...props } handleAuth={this.handleAuth} authed={this.state.authed} /> )}
          />
          <DecisionRoute path='/' exact={true}
          authed={this.state.authed} component={Dashboard}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
