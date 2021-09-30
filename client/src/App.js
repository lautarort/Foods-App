import './App.css';
import React from 'react'
import {Route} from 'react-router-dom'

import Landing from './Components/Landing/Landing'
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';

function App() {
  return (
    <div className="App">
    
      <Route exact path='/' component={Landing}/> 
      <Route exact path='/home' component={Home}/>
      <Route path= '/home' component={Nav}/> 

    </div>
  );
}
// exact es para que cuando seleccione la ruta me borre la anterior

export default App;
