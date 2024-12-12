import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className={`dropdown_menu ${isOpen ? "open" : ""}`}>
      <div className="top_nav">
        <button className="dropdown_toggle" onClick={toggleMenu}></button>
      </div>
      <ul className="dropdown_list">
        <NavLink
          className={({ isActive }) => "nav" + (isActive ? "_active" : "")}
          to="/about"
          onClick={toggleMenu}
        >
          <li>소개</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => "nav" + (isActive ? "_active" : "")}
          to="/cards"
          onClick={toggleMenu}
        >
          <li>카드 목록</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default DropdownMenu;
