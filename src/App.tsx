import Home from '@/pages/Home';
import PortfolioMain from '@/pages/PortfolioMain';
import { ModalStateProvider, ZDepthProvider } from '@/store/context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ZDepthProvider>
        <ModalStateProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path={'/page'} element={<PortfolioMain />}>
              <Route path={':page'} element={<PortfolioMain />} />
            </Route>
          </Routes>
        </ModalStateProvider>
      </ZDepthProvider>
    </BrowserRouter>
  );
}

export default App;
