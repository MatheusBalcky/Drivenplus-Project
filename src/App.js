import './styles/App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react'

import LoginPage from './Components/LoginPage/LoginPage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import tokenContext from './context/tokenContext';
import userDataContext from './context/userDataContext';
import SubscriptPage from './Components/SubscriptionsPage/SubscriptionsPage';
import HomePage from './Components/HomePage/HomePage';
import PlanPage from './Components/PlanPage/PlanPage';
import UserPage from './Components/UserPage/UserPage';

function App(){
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});


  return (

    <BrowserRouter>

    <tokenContext.Provider value={{ token, setToken }}>
    <userDataContext.Provider value={{ userData, setUserData }} >

      <Routes>

        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/subscriptions' element={<SubscriptPage />} />
        <Route path='/subscriptions/:IdPlano' element={<PlanPage />} />
        <Route path='/home' element={<HomePage />}/>
        <Route path='/users/:IdUser' element={<UserPage />} />
        
      </Routes>

    </userDataContext.Provider>
    </tokenContext.Provider>

    </BrowserRouter>

  );
}

export default App;
