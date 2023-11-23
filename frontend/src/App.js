import {Routes,Route} from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Account from './pages/Account';
import Home from './pages/Home';
import Loggin from './pages/Loggin';
import Signup from './pages/Signup';

function App() {
  const isUserSignIn = !! localStorage.getItem('token')
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>,
        <Route path='/loggin' element={<Loggin/>}/>,
        <Route path='/signup' element={<Signup/>}/>,
        {isUserSignIn &&  <Route path='/account' element={<Account/>}/>}
      </Routes>
    
    </div>
  );
}

export default App;
