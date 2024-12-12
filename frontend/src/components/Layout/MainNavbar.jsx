import { NavLink } from "react-router-dom";

function MainNavbar() {
  return (
    <>
      <nav class="main_nav">
        <NavLink
          className={({ isActive }) => "nav" + (isActive ? "_active" : "")}
          to="/about"
        >
          소개
        </NavLink>
        <NavLink
          className={({ isActive }) => "nav" + (isActive ? "_active" : "")}
          to="/cards"
        >
          카드 목록
        </NavLink>
      </nav>
    </>
  );
}

export default MainNavbar;
