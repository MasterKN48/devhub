import React, { Component } from 'react';
import isEmpty from '../../valid/isEmpty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bt mask rgba-gradient text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto zoom">
                <img
                  className="img-fluid img-thumbnail z-depth-1 rounded"
                  src={profile.user.avatar}
                  style={{height:'120px',width:'120px'}}
                  alt="avatar"
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="display-5 text-center">{profile.user.name}</h3>
              <p className="lead text-center" style={{fontSize:'15px'}}>
                {profile.status}{' '}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p style={{fontSize:'15px'}}>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank" rel='noopener noreferrer'
                  >
                    <i className="fa fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank" rel='noopener noreferrer'
                  >
                    <i className="fa fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank" rel="noopener noreferrer"
                  >
                    <i className="fa fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    target="_blank" rel="noopener noreferrer"
                  >
                    <i className="fa fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.youtube}
                    target="_blank" rel='noopener noreferrer'
                  >
                    <i className="fa fa-youtube fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
