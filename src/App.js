import { useContext, useState } from 'react';
import './App.css';
import Nav from './components/nav/Nav';
import Forgot from './pages/forgot/Forgot';
import Home from './pages/home/Home';
import Signin from './pages/signin/signin';
import Signup from './pages/signup/Signup';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate
} from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Inventory from './pages/dash/Inventory';
import NewProduct from './components/newProduct/NewProduct';
import Report from './pages/report/Report';
import Trans from './pages/trans/Trans';
import Suppliers from './pages/supplier/Suppliers';
import { SingleSupplier } from './pages/singleSupplier/SingleSupplier';
import Profile from './pages/profile/Profile';
import Reset from './pages/reset/Reset';
import Users from './pages/users/Users';
import { AuthContext } from './context/AuthContext';

function App() {
  const [currentTab, setCurrentTab] = useState('a');
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const ProtectedPages = ({children})=>{
    if(!user){
      return <Navigate to='/login' />
    }
    else{
      return children
    }
  }

  // console.log(user)
  return (
    <>
    <div className="App">
      {
        user &&
        <div className='left' >
          <Nav currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
      }
      <div className='right' >
        {
          user &&
          <Header />
        }
          <Routes>
            <Route path='/' >
            <Route path='login' element ={<Signin />} />
            <Route path='forgot' element={<Forgot />} />
              <Route index element ={
                <ProtectedPages>
                  <Home />
                </ProtectedPages>
              } />
              <Route path='profile' >
                <Route index element={
                  <ProtectedPages>
                    <Profile/> 
                  </ProtectedPages>
                } />
                <Route path='reset' element = 
                { 
                  <ProtectedPages>
                    <Reset />
                  </ProtectedPages>
                } />
              </Route>
                <Route path='inventory' element ={
                  <ProtectedPages>
                    <Inventory />
                  </ProtectedPages>
                }  />
                <Route path='report' element ={
                  <ProtectedPages>
                    <Report />
                  </ProtectedPages>
                }  />
                <Route path='trans' element ={
                  <ProtectedPages>
                    <Trans />
                  </ProtectedPages>
                }  />
                <Route path='suppliers' element ={
                  <ProtectedPages>
                    <Suppliers />
                  </ProtectedPages>
                }  />
                <Route path='orders' element ={
                  <ProtectedPages>
                    <SingleSupplier />
                  </ProtectedPages>
                }  />
                <Route path='users' element ={
                  <ProtectedPages>
                    <Users />
                  </ProtectedPages>
                }  />
            </Route>
          </Routes>
      </div>
    </div>
    {
      user &&
      <Footer />
    }
    </>
  );
}

export default App;
