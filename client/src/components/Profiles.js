import React from 'react';

const Profiles = ({ profiles }) => {
  if (!profiles.length) {
    return <h3>No Profiles Yet</h3>;
  }
  var profilesNonConstant = [...profiles];
  profilesNonConstant.sort((a, b) => b.win - a.win);
  return (
    <div>
      {profilesNonConstant &&
        profilesNonConstant.map((profile) => (
          <div key={profile._id} className='row'>
            <div className='col-6 '>{profile.name}</div>
            <div className='text-center col-6'>{profile.win}</div>
          </div>
        ))}
    </div>
  );
};

export default Profiles;
