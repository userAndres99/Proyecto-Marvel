import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Personajes from './pages/Personajes/Personajes'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { ROUTES } from './const/routes'; 
import { DetallePersonaje } from './pages/DetallePersonaje/DetallePersonaje';
import Favoritos from './pages/Favoritos/Favoritos';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-30 md:pt-10">
          <Routes>
            <Route path={ROUTES.Home} element={<Home />} /> 
            <Route path={ROUTES.Personajes} element={<Personajes />} />
            <Route path={ROUTES.Detalle} element={<DetallePersonaje />} />
            <Route path={ROUTES.Favoritos} element={<Favoritos />} />
            <Route path={ROUTES.NotFound} element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
