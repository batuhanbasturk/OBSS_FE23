import { Outlet, Link } from "react-router-dom";
import "../components/Nav-comp.css";
function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div class="logo">Start Here</div>
        <ul className="nav-links">
          <div className="menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Resume</Link>
            </li>
            <li>
              <Link to="/Projects">Projects</Link>
            </li>
            <li>
              <Link to="/ContactUs">Contact Us</Link>
            </li>
          </div>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
export default Navbar;
