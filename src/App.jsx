import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Personajes from './pages/Personajes/Personajes'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { ROUTES } from './const/routes'; 
import { DetallePersonaje } from './pages/DetallePersonaje/DetallePersonaje';

function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <Header />
        <Routes>
          <Route path={ROUTES.Home} element={<Home />} /> 
          <Route path={ROUTES.Personajes} element={<Personajes />} />
          <Route path={ROUTES.Detalle} element={<DetallePersonaje/>}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
