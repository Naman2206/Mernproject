import React, { createContext, useReducer } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Contact from './components/contact';
import About from './components/About';


import Nav from './components/Navbar';
import { initialState, reducer } from '../src/reducer/UserReducer';

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <Nav />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/Contact">
          <Contact />
        </Route>
        <Route path="/Login">
          <Login />
       
        
        </Route>
        <Route path="/About">
          <About />
        </Route>
      </UserContext.Provider>
    </div>
  );
}

export default App;