import React, { Component } from "react"; 
import {Link} from 'react-router-dom';
import spinner from './spinner.svg';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ProfileAction from './ProfileAction';
import Experience from './Experience';
import Education from './Education';
import {getCurrentProfile,deleteAccount} from '../../actions/profileAction';
class Dashboard extends Component {
    
    componentDidMount() {
        this.props.getCurrentProfile();
    }
    onDeleteClick(e){
      this.props.deleteAccount();
    }
  render() {
    const {user}=this.props.auth;
    const {profile,loading}=this.props.profile;
    let dashboard;
    if(profile === null || loading){
      dashboard=<div><img src={spinner} alt="spinner" style={{width:'200px',margin:'auto',display:'block'}}/></div>
    }
    else{
      // if login user have profile data
      if(Object.keys(profile).length >0){
          dashboard=(
            <div>
            <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`} >{user.name}</Link></p>
              <ProfileAction /><br/>
              <Experience exp={profile.experience} />
              <Education exp={profile.education} />
              <div style={{marginBottom:'60px'}}></div>
              <button onClick={this.onDeleteClick.bind(this)} className="btn btn-md del waves-effect">Delete Account</button>
            </div>
          );
      }else{
        // USER is Logged in but no profile
        dashboard=(
          <div>
          <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`} >{user.name}</Link></p>
            <h4>You have not setup profile, create one</h4>
            <Link to='/create-profile' className="btn btn-lg peach-gradient">Create Profile</Link>
          </div>
        )
      }
    }
    return (
     <div className='dashboard'>
       <div className="container mask waves-effect waves-light rgba-white-slight">
         <div className="row">
           <div className="col-md-12">
             <h3>Dashboard</h3>
             {dashboard}
           </div>
         </div>
       </div>
     </div>
    );
  }
}
Dashboard.propTypes={
  getCurrentProfile:PropTypes.func.isRequired,
  deleteAccount:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
  profile:state.profile,
  auth:state.auth
})
export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);