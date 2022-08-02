import React from 'react';
import './App.css';

/* Components */
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import Header from './Components/Header';
import UserSignOut from './Components/UserSignOut';

function App() {
  
    fetch('http://localhost:5000/api/courses')
      .then(res =>res.json())
      .then(data =>{console.log(data)})
      return (
 
          <div  className="App">
            New course
            <ul></ul>
          </div>
        
  );
}

export default App;

/*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
    