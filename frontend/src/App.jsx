import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Layout/Header";
import CardList from "./components/ShowCard/CardList";
import Footer from "./components/Layout/Footer";
import About from "./pages/About";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header/>
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
