import React from 'react';

const ProfileList = ({ profiles }) => {
  if (!profiles.length) {
    return <h3>No Profiles Yet</h3>;
  }

  return (
    <div>
      {profiles &&
        profiles.map((profile) => (
          <div className='row'>
            <div key={profile._id} className='col-6 '>
              {profile.name}
            </div>
            <div className='text-center col-6'>{profile.win}</div>
          </div>
        ))}
    </div>
  );
};

export default ProfileList;
