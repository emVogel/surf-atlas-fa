import "./App.scss";
import { NavLink, Outlet } from "react-router-dom";

function Root() {
  return (
    <main>
      <header>
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
      </header>
      <Outlet />
      <footer>footer</footer>
    </main>
  );
}
export default Root;
