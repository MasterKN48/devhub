import React, { Component } from "react"; 
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {logoutUser} from '../../actions/authAction';
import Dev from '../../img/Dev.png';
import {clearCurrentProfile} from '../../actions/profileAction';
class Navbar extends Component {
  onLogoutClick(e){
      e.preventDefault();
      this.props.clearCurrentProfile();
      this.props.logoutUser();
    
  }
  render() {
      const {isAuthenticated,user}=this.props.auth;
      const authLinks=(
          <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/post">Post</Link>
                </li>
                <li className="nav-item">
                    <a href="#home" className="nav-link" onClick={this.onLogoutClick.bind(this)}>
                        <img className="rounded-circle" src={user.avatar} alt={user.name} style={{width:'25px',marginRight:'5px'}} title="You must have gavatar to show user image" />
                        {' '}Logout
                    </a>
                </li>
            </ul>
      );
      const guestLinks=(
        <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link className="nav-link" to="/register">Sign Up</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
              </li>
          </ul>
    );
    return (
        <nav className="navbar navbar-fixed navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
            <Link className="navbar-brand" to="/"><img className=' brand-logo ' style={{heigth:'64px',width:'64px'}} src={Dev} alt="logo"/>Hub</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/profiles"> Developers
                    </Link>
                </li>
                </ul>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
            </div>
        </nav>
    );
  }
}
Navbar.propTypes={
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
    auth:state.auth,
})


export default connect(mapStateToProps,{logoutUser,clearCurrentProfile})(Navbar);