import React, { Component } from "react"; 
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './Spinner.svg';
import {getProfiles} from '../../actions/profileAction';
import ProfileItems from './ProfileItems';
class Profiles extends Component {
    componentDidMount(){
        this.props.getProfiles();
    }
  render() {
      const {profiles,loading}=this.props.profile;
      let profileItems;
      if(profiles=== null || loading){
          profileItems= <div className="container text-center"><img src={Spinner} alt="Loading.." style={{height:'10em',width:'10em'}}/></div>
      }else{
          if(profiles.length >0){
              profileItems= profiles.map(profile => (
                  <ProfileItems key={profile._id} profile={profile} />
              ))
          } else{
            profileItems= <h4>No profiles found...</h4>
          }
      }
    return (
     <div className='profiles'>
       <div className="container">
           <div className="row">
               <div className="col-md-12">
                   <h1 className="display-5 text-center">Developer Profiles</h1>
                   <p className='lead text-center'>
                        Browse and connect with developers
                   </p>
                   {profileItems}
               </div>
           </div>
       </div>
     </div>
    );
  }
}

Profiles.propTypes={
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    profile:state.profile
});
export default connect(mapStateToProps,{getProfiles})(Profiles);