import React, { Component } from "react"; 
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../profiles/Spinner.gif';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileAbout from './ProfileAbout';
import {getProfileByHandle} from '../../actions/profileAction.js';
class Profile extends Component {
    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.profile.profile===null && this.props.profile.loading){
            this.props.history.push('/not-found');
        }
    }
    
  render() {
      const {profile,loading}=this.props.profile;
      let profileContent;
      if(profile===null || loading){
          profileContent= <img src={Spinner} alt='loading'  style={{height:'128px',width:'128px'}}/>;
      }else{
          profileContent=(
            <div>
              <div className="row">
                  <div className="col-md-6">
                      <Link to="/profiles" className="btn btn-light mb-3 float-left" >
                        Back to Profiles
                      </Link>
                  </div>
                  <div className="col-md-6"></div>
              </div>
            <ProfileHeader profile={profile}/>
            <ProfileAbout profile={profile} />
            <ProfileCreds education={profile.education} experience={profile.experience}/>
            {profile.githubusername ? (<ProfileGithub username={profile.githubusername}/>) : <h6>No Github UserName in Profile Specify</h6> }
          </div>
          );
      }
    return (
     <div className='profile'> 
       <div className="container">
           <div className="row">
               <div className="col-md-12 text-center">{profileContent}</div>
           </div>
       </div>
     </div>
    );
  }
}
Profile.propTypes={
    profile:PropTypes.object.isRequired,
    getProfileByHandle:PropTypes.func.isRequired
}
const mapStateToProps=state=>({
    profile:state.profile
});
export default connect(mapStateToProps,{getProfileByHandle})(Profile);