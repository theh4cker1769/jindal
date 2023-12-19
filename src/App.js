import { Route, Routes } from 'react-router-dom';
import './App.css';
import './custom.css';
import Login from './pages/Authentication/Login';
import Header from './layout/header/Header';
import ElasticityPricingTrack from './pages/IntegratedStrategy/ElasticityPricingTrack/ElasticityPricingTrack';
import ClientConfigurations from './pages/IntegratedStrategy/ClientConfigurations/ClientConfigurations';
import Test from './Test'
import Sidebar from './layout/sidebar/Sidebar';
import { useState } from 'react';


function App() {

  const [sidebarActive, setSidebarActive] = useState(false);
  const toggleSidebarProp = () => {
    setSidebarActive(!sidebarActive)
  }

  return (
    <>
      <Header toggleSidebarProp={toggleSidebarProp}/>
      <div className="main">
        <Sidebar sidebarActive={sidebarActive}/>
        <div className="main-sub">
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/elasticity-pricing-track' element={<ElasticityPricingTrack />}></Route>
            <Route path='/client-configurations' element={<ClientConfigurations/>}></Route>
            <Route path='/test' element={<Test />}></Route>
            
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
