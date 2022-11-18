import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioMain from "./pages/PortfolioMain";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route index element={<Home />} />
        <Route path={"/page"} element={<PortfolioMain />}>
          <Route path={":page"} element={<PortfolioMain />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
