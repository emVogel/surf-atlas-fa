import "./App.scss";
import { NavLink, Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/atlas">Atlas</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
export default Root;
