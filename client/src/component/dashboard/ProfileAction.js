import React from 'react'
import {Link} from 'react-router-dom';
export default function ProfileAction() {
    return (
    <div className="row">
      <div className="btn-group" role='group'>
          <Link to="/edit-profile" className="btn btn-md btn-light mask waves-effect waves-light rgba-white-slight">
            <i className="fa fa-user-circle text-info mr-1" /> Edit Profile
          </Link>
          <Link to="/add-experience" className="btn btn-md btn-light mask waves-effect waves-light rgba-white-slight">
            <i className="fa fa-black-tie text-info mr-1" />
            Add Experience
          </Link>
          <Link to="/add-education" className="btn btn-md btn-light mask waves-effect waves-light rgba-white-slight">
            <i className="fa fa-graduation-cap text-info mr-1" />
            Add Education
          </Link>
      </div>
    </div>
    )
}
