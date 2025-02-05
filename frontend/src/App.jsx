import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useIsMobile } from "./state/hooks/useIsMobile";
import Header from "./components/Layout/Header";
import CardList from "./components/ShowCard/CardList";
import Footer from "./components/Layout/Footer";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "./scss/main.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isMobile = useIsMobile();

  const idb =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

  useEffect(() => initDB(), []);

  const initDB = () => {
    if (!idb) {
      console.log("Indexed DB 미지원 브라우저");
      return;
    }

    const request = idb.open("conan");

    request.onerror = (e) => {
      console.log("error", e);
    };

    request.onupgradeneeded = (e) => {
      const db = e.target.result;

      if (!db.objectStoreNames.contains("favorites")) {
        const objectStore = db.createObjectStore("favorites", {
          keyPath: "id",
        });
      }
    };

    request.onsuccess = (e) => {
      console.log("db open");
    };
  };

  return (
    <div className={`App ${isMobile ? "mobile" : "pc"}`}>
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/cards" element={<CardList />} />
        <Route path="*" element={<Navigate to="/cards" />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
