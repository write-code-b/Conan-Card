import { useIsMobile } from "../../state/hooks/useIsMobile";
import MainNavbar from "./MainNavbar";
import DrawerNavbar from "./DrawerNavbar";

function Header() {
  const isMobile = useIsMobile();

  return (
    <>
      <header>
        <div className={`nav_wrapper ${isMobile ? "mobile" : "pc"}`}>
          <MainNavbar isMobile={isMobile} />
          <DrawerNavbar isMobile={isMobile} />
        </div>
      </header>
    </>
  );
}

export default Header;
