import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import CardList from "./components/ShowCard/CardList";
import Footer from "./components/Layout/Footer";
import About from "./pages/About";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/cards" element={<CardList />} />
        <Route path="*" element={<Navigate to="/cards" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
