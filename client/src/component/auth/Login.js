import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup.js';
import {loginUser} from '../../actions/authAction';
import Dev from '../../img/Dev.png';
class Login extends Component {
    constructor(){
        super();
        this.state={
            email: '',
            password:'',
            errors:{}
        }
     this.onChange=this.onChange.bind(this);   
     this.onSubmit=this.onSubmit.bind(this);   
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const userData={
            email:this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(userData);
    }
  render() {
      const {errors}=this.state;
      
    return (
       <div className="login">
        <div className="container" style={{paddingBottom:'20vh',paddingTop:'5vh'}}>
        <div className="row">
            <div className="col-md-8 m-auto text-center">
            <span className="display-4 peach-gradient" style={{color:'#1c2331'}}><img style={{height:'120px',width:'120px'}} alt="DevHub_logo" src={Dev} />Hub</span>
            <p className="lead text-center">Sign in to your DevHub account</p>
            <form onSubmit={this.onSubmit} className="text-left" >
                <TextFieldGroup
                 placeholder="Email Address"
                 name="email"
                 type="email"
                 value={this.state.email}
                 onChange={this.onChange}
                 errors={errors.email}
                 />
                
                <TextFieldGroup
                 placeholder="Password"
                 name="password"
                 type="password"
                 value={this.state.password}
                 onChange={this.onChange}
                 errors={errors.password}
                 />
                <input type="submit" value='Login' className="btn peach-gradient btn-rounded btn-block mt-4" />
            </form>
            </div>
        </div>
        </div>
    </div>
    );
  }
}
Login.propTypes={
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}
const mapStateToProps=(state)=>({
    auth:state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{loginUser})(Login);