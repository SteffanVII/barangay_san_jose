import './App.scss';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from './components/pages/dashboard/dashboard';
import LoginPage from './components/pages/login/login';
import { useLayoutEffect } from 'react';
import { authenticate, login } from './server/authenthication';
import Timeout from './components/pages/dashboard/windows/tabs/subcomponents/timeoutChecker';
import { useState } from 'react';
import { createContext } from 'react';

const pageRouter = createBrowserRouter([
  {
    path : "/login",
    element : <LoginPage/>,
  },
  {
    path : "/",
    element : <DashboardPage/>
  }
])

export const appContextImport = createContext(null);

function App() {

  const [timeout, setTimeout] = useState(false);

  function tabFocusCallback() {
    authenticate(( res ) => {
      if ( res.status !== "ok" ) {
        setTimeout(true);
      }
    });
  }

  useLayoutEffect(() => {

    let id = window.addEventListener( "focus", tabFocusCallback );

    return () => {
      window.removeEventListener(id);
    }
  }, []);

  return (
    <appContextImport.Provider value={{
      timeout : {
        set : ( val ) => {
          setTimeout(val);
        },
        get : () => {
          return timeout;
        }
      }
    }} >
      <div className="App">
        <RouterProvider router={pageRouter}/>
      </div>
    </appContextImport.Provider>
  );
}

export default App;
