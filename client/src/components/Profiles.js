import React from 'react';

const ProfileList = ({ profiles }) => {
  if (!profiles.length) {
    return <h3>No Profiles Yet</h3>;
  }

  return (
    <div>
      <div className='flex-row justify-space-between my-4'>
        {profiles &&
          profiles.map((profile) => (
            <div key={profile._id} className='col-12 col-xl-6'>
              <div>
                <h4 className='text-center'>
                  {profile.name} <br />
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileList;
