import React, { Component } from "react"; 
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import spinner from '../dashboard/spinner.gif';
import {getProfiles} from '../../actions/profileAction';

class Profiles extends Component {
    componentDidMount(){
        this.props.getProfiles();
    }
  render() {
      const {profiles,loading}=this.props.profile;
      let profileItems;
      if(profiles=== null || loading){
          profileItems= <spinner />;
      }else{
          if(profiles.length >0){
              profileItems=<h1>PROFILES HERE</h1>
          } else{
            profileItems= <h4>No profiles found...</h4>
          }
      }
    return (
     <div className='profiles'>
       <div className="container">
           <div className="row">
               <div className="col-md-12">
                   <h1 className="display-4 text-center">Developer Profiles</h1>
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