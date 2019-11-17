import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


const DecisionRoute = ({component: Component, authed, handleLogout, snippets, ...rest}) => {
  console.log(rest)
  return (
<Route
      {...rest}
      render={(props) => authed === true
        ? <Component snippets={snippets} handleLogout={handleLogout} authed={authed} {...props} />
        : <Redirect to='/' />}
    />
  )
}

export default DecisionRoute
