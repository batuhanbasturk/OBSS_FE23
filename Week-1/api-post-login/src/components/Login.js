import React from "react";

const Login = (props) => {
  const { handleSubmit, handleChange, data, error } = props;

  return (
    <div className="container-fluid vh-100 vw-100 d-flex justify-content-center align-items-center">
      <div
        className="row justify-content-center w-50 h-50 bg-gray-300 rounded-4"
        style={{ backgroundColor: "#F4F6F6" }}
      >
        <div className="text-center m-auto">
          <h1 className="pb-3">Login Account</h1>
          {error && <p className="text-danger ">{error}</p>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
                style={{ paddingRight: 3 }}
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              <label className="form-label d-inline-block">
                <input
                  autoComplete="off"
                  className="form-control"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  value={data.username}
                />
              </label>
            </div>
            <div className="mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-key-fill"
                viewBox="0 0 16 16"
                style={{ paddingRight: 3 }}
              >
                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>

              <label className="form-label d-inline-block">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={data.password}
                />
              </label>
            </div>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
