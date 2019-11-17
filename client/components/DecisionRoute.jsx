import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


const DecisionRoute = ({component: Component, authed, ...rest}) => {
  return (
<Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

export default DecisionRoute

{/* <Redirect to={{pathname: '/login', state: {from: props.location}}} */}