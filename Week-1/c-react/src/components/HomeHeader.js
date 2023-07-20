import { Outlet, Link } from "react-router-dom";

export default function HomeHeader() {
  return (
    <>
      <div>
        <div>
          <div>
            <div>Design&middot; Development &middot; Marketing</div>
          </div>
          <div>I can help your business to</div>
          <h1>
            <span>Get online and grow fast</span>
          </h1>
          <div>
            <Link to="/Resume">Resume</Link>
            <Link to="/Projects">Projects</Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
