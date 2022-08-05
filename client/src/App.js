import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './Context';

/* Components */
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import Header from './Components/Header';
import UserSignOut from './Components/UserSignOut';

//Passes App context to Components
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
//Connects the components to the context(subscribing)
const HeaderWithContext =withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext =withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {
  

// App routes & render the components with context subscription
  return(
    <Provider>
      <Router>
        <div id ="root">
        <HeaderWithContext/>
          <Switch>
            <Route exact path="/" component={Courses} />
            <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext}/>
            <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext}/>
            <Route exact path ="/courses/:id" component={CourseDetailWithContext}/>
            <Route exact path="/signin" component={UserSignInWithContext}/>
            <Route exact path="/signup" component={UserSignUpWithContext}/>
            <Route exact path="/signout" component={UserSignOutWithContext}/>
          </Switch>
        </div>
      </Router>
    </Provider>


  );
}

export default App;


    