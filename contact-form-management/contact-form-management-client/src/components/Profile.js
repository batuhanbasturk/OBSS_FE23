import React from "react";

const Profile = ({ userData }) => {
  return (
    <>
      <h1>Profile</h1>
      <p>Username: {userData.username}</p>
      <p>Role: {userData.role}</p>
    </>
  );
};

export default Profile;
