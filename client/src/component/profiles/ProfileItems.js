import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty from '../../valid/isEmpty';
class ProfileItems extends Component {
  render() {
      const {profile}=this.props;
    return (
     <div className="card card-body cloudy-knoxville-gradient mb-3">
       <div className="row">
           <div className="col-4 col-lg-2 col-xs-4 zoom">
               <img src={profile.user.avatar} alt="avatar" className="img-fluid z-depth-1 img-thumbnail rounded-circle"/>
           </div>
           <div className="col-lg-4 col-md-4 col-8">
                <h4>{profile.user.name}</h4>
                <p style={{fontSize:'14px'}}>
                     {profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
                </p>
                <p>
                    {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
                </p>
                <Link to={ `/profile/${profile.handle}`} className='btn btn-md waves-effect waves-light bt'>
                    View Profile
                </Link>
           </div>
           <div className="col-md-4 d-none d-md-block">
               <h5>Skill Set</h5>
               <ul className="list-group" style={{fontSize:'14px'}}>
                   {profile.skills.slice(0,4).map((skill,index)=>(
                       <li key={index} className="list-group-item">
                           <i className="fa fa-check pr-1" />
                           {skill}
                       </li>
                   ))}
               </ul>
           </div>
       </div>
     </div>
    );
  }
}
ProfileItems.propTypes={
    profile:PropTypes.object.isRequired
}
export default ProfileItems;