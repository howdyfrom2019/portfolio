import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioMain from "./pages/PortfolioMain";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route index path={"/"} element={<PortfolioMain />} />
        <Route index path={"/*"} element={<PortfolioMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
