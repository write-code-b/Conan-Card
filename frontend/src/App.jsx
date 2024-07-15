import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CardList from "./components/CardList";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/cards" element={<CardList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <footer></footer>
    </div>
  );
}

export default App;
