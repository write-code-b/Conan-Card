import { NavLink } from "react-router-dom";

function MainNavbar(props) {
  return (
    <>
      <nav className={`main_nav ${props.isMobile ? "mobile" : "pc"}`}>
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
