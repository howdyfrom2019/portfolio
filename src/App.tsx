import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioMain from "./pages/PortfolioMain";
import Home from "./pages/Home";
import {ModalStateProvider, ZDepthProvider} from "./store/Context";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ZDepthProvider>
        <ModalStateProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path={"/page"} element={<PortfolioMain />}>
              <Route path={":page"} element={<PortfolioMain />} />
            </Route>
          </Routes>
        </ModalStateProvider>
      </ZDepthProvider>
    </BrowserRouter>
  );
}

export default App;
