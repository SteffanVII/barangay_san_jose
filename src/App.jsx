import './App.scss';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from './components/pages/dashboard/dashboard';
import LoginPage from './components/pages/login/login';
import { useLayoutEffect } from 'react';
import { login } from './server/authenthication';

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

function App() {
  return (
    <div className="App">
      <RouterProvider router={pageRouter}/>
    </div>
  );
}

export default App;
