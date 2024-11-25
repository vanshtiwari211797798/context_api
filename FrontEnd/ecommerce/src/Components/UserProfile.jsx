import React, { useEffect, useContext } from 'react'
import Context from '../Context/Context'


const UserProfile = () => {

  const { profile } = useContext(Context);



  return (
    <>
      <br /><br /><br />
      {
        profile ?

          <div className="profile-container">
            <h2>Welcome : {profile.username}</h2>
            <div className="profile-details">
              <div className="detail-item">
                <span className="label">Username:</span>
                <span className="value">{profile.username}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{profile.email}</span>
              </div>
              <div className="detail-item">
                <span className="label">Phone:</span>
                <span className="value">{profile.phone}</span>
              </div>
              <div className="detail-item">
                <span className="label">State:</span>
                <span className="value">{profile.state}</span>
              </div>
              <div className="detail-item">
                <span className="label">District:</span>
                <span className="value">{profile.district}</span>
              </div>
              <div className="detail-item">
                <span className="label">Village:</span>
                <span className="value">{profile.village}</span>
              </div>
              <div className="detail-item">
                <span className="label">Pincode:</span>
                <span className="value">{profile.pincode}</span>
              </div>
            </div>
          </div>

          :

          <h2 style={{ color: "red", textAlign: "center" }}>NO PROFILE FOUND</h2>

      }

      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </>
  )
}

export default UserProfile