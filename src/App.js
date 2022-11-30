import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AppBar from "./components/AppBar";
import Error404 from "./pages/404";
import Convertor from "./pages/Convertor";

const App = () => (
  <div className="App">
    <header>
      <AppBar />
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Convertor />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </main>
  </div>
);

export default App;
