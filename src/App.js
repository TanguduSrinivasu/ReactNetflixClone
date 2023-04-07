import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import { Provider, useDispatch } from 'react-redux';
import store from './utils/store';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  
  return (
    <div>
      <Provider store={store}>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>}></Route>
      </Routes>
      </Provider>
    </div>
  );
}

export default App;
