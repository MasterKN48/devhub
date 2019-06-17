import React, { Component } from "react"; 
import {Link,withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {TextFieldGroup} from '../common/TextFieldGroup';
import {TextAreFieldGroup} from '../common/TextAreaFieldGroup'
//import {getCurrentProfile,deleteAccount} from '../../actions/profileAction';

class AddExperience extends Component {
    constructor(props){
        super(props);
        this.state={
            company: '',
            title:'',
            location:'',
            from:'',
            to:'',
            current:false,
            description:'',
            errors:{},
            disabled: false
        }
    }
  render() {
      const {errors}=this.state;
      
    return (
     <div className="add-experience">
       <div className="container">
           <div className="row">
               <div className="col-md-8 m-auto">
                   <Link to="/dashboard" className="btn btn-light">
                   Go Back
                   </Link>
                   <h1 className="display-4 text-center">Add Experience</h1>
                   <p className='lead text-center'>Add any job or position that you have have had in past or current</p>
                    <small className='d-block pb-3'>* = required fields</small>
               </div>
           </div>
       </div>
     </div>
    );
  }
}

AddExperience.propTypes={
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

}

const mapStateToProps=state=>({
    profile:state.profile,
    errors:state.errors
})
export default connect(mapStateToProps)(withRouter(AddExperience));