import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Alert } from 'react-bootstrap';
import './App.css';
import { Navigation } from './components/Navigaiton';
import { HomePage, MatchPage, HistoryPage, LoginPage} from './components/LayoutPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import API from './API.mjs';
import { useEffect, useState } from 'react';



function App() {

  const [loggedIn, setLoggedIn] = useState(false); // to be changed to false
  const [user, setUser] = useState("soso");
  const [message, setMessage] = useState(''); 



  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
      setUser(user);
    }catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setUser(null);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const userr = await API.getUserInfo();  // here you have the user info, if already logged in
        setUser(userr);
        setLoggedIn(true);
      } catch (err) {
        setUser(null);
        setLoggedIn(false);
      }
    };
    init();
  }, []); // This useEffect is called only the first time the component is mounted.

  return (
        <Container>
            <Navigation loggedIn= {loggedIn} user= {user} logout= {handleLogout} />

            <Routes>
                <Route path="/" element={<HomePage loggedIn = {loggedIn} />} />
                <Route path="/match" element={<MatchPage round = {0} loggedIn = {loggedIn}/>} />
                <Route path="/game/round1" element={(loggedIn && user) ? <MatchPage round = {1} loggedIn = {loggedIn}/> : <Navigate replace to='/'/>} />  // another solution is to use state
                <Route path="/game/round2" element={(loggedIn && user) ? <MatchPage round = {2} loggedIn = {loggedIn}/> : <Navigate replace to='/'/>} />
                <Route path="/game/round3" element={(loggedIn && user) ? <MatchPage round = {3} loggedIn = {loggedIn}/> : <Navigate replace to='/'/>} />
                <Route path='/login' element={!loggedIn ? <LoginPage login={loggedIn} loginaction={handleLogin} /> : <Navigate replace to='/' />} />
                <Route path="/history" element={(loggedIn && user) ? <HistoryPage user={user} /> : <Navigate replace to='/login' />} />
            </Routes>
              
        </Container>
  )
}

export default App
