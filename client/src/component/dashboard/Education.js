import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profileAction';
class Education extends Component {
    onDeleteClick(id){
        this.props.deleteEducation(id);
    }
    render() {
      const expc=this.props.exp.map(exp =>(
            <tr key={exp._id}>
                <td>{exp.school}</td>
                <td>{exp.degree}</td>
                <td>{exp.fieldofstudy}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>{exp.from}</Moment>
                    - {exp.to ? (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>): 'Now'}
                </td>
                <td> <button onClick={this.onDeleteClick.bind(this,exp._id)} className='btn del btn-sm waves-effect'> Delete</button> </td>
            </tr>
      ))
    return (
     <div>
       <h4 className="mb-4">Education Credentials</h4>
        <div className="table-responsive cloudy-knoxville-gradient">
            <table className="table table-hover">
            <thead className='navb white-text' style={{fontSize:'15px'}}>
                <tr>
                <th>School/Institute</th>
                <th>Degree</th>
                <th>Field of Study</th>
                <th>Years</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody style={{fontSize:'15px'}}>
                    {expc}
            </tbody>
          </table>
        </div>
     </div>
    );
  }
}
Education.propTypes={
    deleteEducation: PropTypes.func.isRequired
}
export default connect(null,{deleteEducation})(Education);