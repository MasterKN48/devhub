import React, { Component } from "react"; 
import {Link} from 'react-router-dom';
import spinner from './spinner.gif';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileAction';
class Dashboard extends Component {
    
    componentDidMount() {
        this.props.getCurrentProfile();
    }
    
  render() {
    const {user}=this.props.auth;
    const {profile,loading}=this.props.profile;
    let dashboard;
    if(profile === null || loading){
      dashboard=<div><img src={spinner} style={{width:'200px',margin:'auto',display:'block'}}/></div>
    }
    else{
      dashboard=<h4>Hello..</h4>
    }
    return (
     <div className='dashboard'>
       <div className="container">
         <div className="row">
           <div className="col-md-12">
             <h1>Dashboard{dashboard}</h1>
           </div>
         </div>
       </div>
     </div>
    );
  }
}
Dashboard.propTypes={
  getCurrentProfile:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
  profile:state.profile,
  auth:state.auth
})
export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);