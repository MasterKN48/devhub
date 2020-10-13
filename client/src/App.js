import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import PrivateRoute from './component/common/PrivateRoute';
import jwt_decode from 'jwt-decode';
import setAuthToken from './util/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authAction';
import {clearCurrentProfile} from './actions/profileAction';
import Footer from './component/layout/Footer';
import Landing from './component/layout/Landing';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import { Provider } from "react-redux";
import store from './store';
import CreateProfile from './component/create-profile/CreateProfile';
import Dashboard from './component/dashboard/Dashboard';
import EditProfile from './component/dashboard/EditProfile';
import AddExperience from './component/add-credentials/AddExperience';
import AddEducation from './component/add-credentials/AddEducation';
import Profile from './component/profile/Profile';
import Profiles from './component/profiles/Profiles';

import Post from './component/post/Post';
import SPost from './component/single-post/SPost';
import NotFound from './component/not-found/NotFound';
import './App.css';

// check for token
if(localStorage.jwtToken){
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded =jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
 // check for expired token
 const currentTime=Date.now()/1000;
 if(decoded.exp < currentTime){
   // Logout user
   store.dispatch(logoutUser);
   // clear current profile
   store.dispatch(clearCurrentProfile);
   // redirect to login
   window.location.href='/login';
 }

}

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="main-container bb">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container cloudy-knoxville-gradient">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:handle" component={Profile} />
          <Route exact path="/profile/user/:id" component={Profile} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/add-education" component={AddEducation} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/post" component={Post} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/post/:id" component={SPost} />
          </Switch>
          <Route exact path="/not-found" component={NotFound} />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
