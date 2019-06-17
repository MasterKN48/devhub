import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profileAction';
class Experience extends Component {
    onDeleteClick(id){
        this.props.deleteExperience(id);
    }
    render() {
      const expc=this.props.exp.map(exp =>(
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>{exp.from}</Moment>
                    - {exp.to ? (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>): 'Now'}
                </td>
                <td> <button onClick={this.onDeleteClick.bind(this,exp._id)} className='btn btn-danger'> Delete</button> </td>
            </tr>
      ))
    return (
     <div>
       <h4 className="mb-4">Experience Credentials</h4>
       <table className="table table-hover ">
        <thead style={{fontSize:'15px'}}>
            <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody style={{fontSize:'15px'}}>
                {expc}
        </tbody>
       </table>
     </div>
    );
  }
}
Experience.propTypes={
    deleteExperience: PropTypes.func.isRequired
}
export default connect(null,{deleteExperience})(Experience);