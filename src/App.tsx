import "./App.scss";
import Atlas from "./Pages/Atlas/Atlas";
import { Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import SpotList from "./Pages/SpotList/SpotList";
import SpotDetailView from "./Pages/SpotDetailView/SpotDetailView";
import { loadAllSpots } from "./shared/map-data-loader";

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
