import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CheckUser } from '../apicalls/auth';
import ErrorPage from './ErrorPage';

function AuthHOC({ children }) {
  const [logged, setLogged] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const l = CheckUser();
    setLogged(l);
    if (l) {
      console.log("ZALOGOWANY");
    } else {
      console.log("NIEZALOGOWANY");
      history.push("/SignIn");
    }
  })

  return (
    <div>
      { logged ? {children} : <ErrorPage /> }
    </div>
  )
}

export default AuthHOC
