import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


const DecisionRoute = ({component: Component, authed, handleLogout, ...rest}) => {
  console.log(rest)
  return (
<Route
      {...rest}
      render={(props) => authed === true
        ? <Component handleLogout={handleLogout} authed={authed} {...props} />
        : <Redirect to='/' />}
    />
  )
}

export default DecisionRoute
