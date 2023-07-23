import React from "react";
import { SignOut } from "./SignOut";
const Dashboard = ({ userData }) => {
  return (
    <div className="container-fluid vh-100 vw-100 d-flex justify-content-center align-items-center">
      <div
        className="row justify-content-center w-50 h-50"
        style={{ backgroundColor: "#F4F6F6" }}
      >
        <h4 className="text-center">Welcome</h4>
        <table className="table mt-3">
          <thead className="thead-dark">
            <tr className="table-primary">
              <th scope="col">Id</th>
              <th scope="col">Email</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Avatar</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-info">
              <td>{userData.id}</td>
              <td>{userData.email}</td>
              <td>{userData.firstName}</td>
              <td>{userData.lastName}</td>
              <td>
                <img
                  src={userData.image}
                  width="50"
                  height="50"
                  alt={userData.firstname}
                />
              </td>
            </tr>
            {userData.length === 0 && (
              <tr>
                <td className="text-center" colSpan="4">
                  <b>This user has no data</b>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-center">
          <SignOut />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
