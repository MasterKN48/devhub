import React, { Component } from "react"; 
import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import StarfieldAnimation from 'react-starfield-animation';
class Landing extends Component {
  componentDidMount(){
      if(this.props.auth.isAuthenticated){
          this.props.history.push('/dashboard');
      }
  };

  render() {
    return (
     <div className="landing">
        <StarfieldAnimation
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />
        <div className="dark-overlay landing-inner text-light">
        <div className="container">
            <div className="row">
            <div className="col-md-12 text-center">

                <h1 className="display-3 mb-4">Developer Connector
                </h1>
                <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                <hr />
                <Link to="/register" className="btn waves-effect mask waves-light rgba-white-gradient peach-gradient btn-info mr-2" style={{color:'black',fontWeight:'bold'}}>Sign Up</Link>
                <Link to="/login" className="btn btn-lg btn-dark">Login</Link>
            </div>
            </div>
        </div>
        </div>
    </div>
    );
  }
}
Landing.propTypes={
  auth:PropTypes.object.isRequired
};
const mapStateToProps=(state)=>({
  auth:state.auth
});
export default connect(mapStateToProps)(Landing);