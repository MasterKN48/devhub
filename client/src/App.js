import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import './App.css';
import Footer from './component/layout/Footer';
import Landing from './component/layout/Landing';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import { Provider } from "react-redux";
import store from './store';
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
