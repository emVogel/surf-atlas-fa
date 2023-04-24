import "./App.scss";
import Atlas from "./Pages/Atlas/Atlas";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import SpotList from "./Pages/SpotList/SpotList";
import SpotDetailView from "./Pages/SpotDetailView/SpotDetailView";
import Home from "./Pages/Home/Home";

function App() {
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="atlas" element={<Atlas />}>
          <Route path="/atlas" element={<SpotList />}></Route>
          <Route path=":id" element={<SpotDetailView />}></Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
