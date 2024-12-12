import MainNavbar from "./MainNavbar";
import DropdownMenu from "./DropdownMenu";

function Header() {
  return (
    <>
      <header>
        <div className="nav_wrapper">
          <MainNavbar />
          <DropdownMenu />
        </div>
      </header>
    </>
  );
}

export default Header;
