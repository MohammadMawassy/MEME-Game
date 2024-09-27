import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Alert,Spinner } from 'react-bootstrap';
import './App.css';
import { Navigation } from './components/Navigaiton';
import { HomePage, MatchPage, HistoryPage, LoginPage, Recappage, NotFoundLayout} from './components/LayoutPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import API from './API.mjs';
import { useEffect, useState } from 'react';



function App() {

  const [matchItemList, setMatchItemList] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false); 
  const [user, setUser] = useState("soso");
  const [message, setMessage] = useState('');
  const [restartGame, setRestartGame] = useState(false);
  const [correctselection, setCorrectSelection] = useState([]);

  const handleLogin = async (credentials) => {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
      setUser(user);
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setUser(null);
  };

  const addSelection = (newelement ) => {
    setCorrectSelection(currentSelection => [
      ...currentSelection,
      newelement
    ]);
  };

  function emptySelection() {
    setCorrectSelection([]);
  }

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


  useEffect(() => {
    const getItems = async () => {
      const items = await API.getItems(loggedIn);
      setMatchItemList(items);
    }
    getItems();
 }, [loggedIn, restartGame]);

  return (
        <Container>
            <Navigation loggedIn= {loggedIn} user= {user} logout= {handleLogout} />

            <Routes>
                <Route path="/" element={<HomePage emptySelection={emptySelection} loggedIn = {loggedIn} matchItemList={matchItemList} />} />
                <Route path="/match" element={<MatchPage round = {0} delay={30} loggedIn = {loggedIn} restartGame={restartGame} setRestartGame={setRestartGame}/> } />
                <Route path="/game/round1" element={(loggedIn && user) ? <MatchPage emptySelection={emptySelection} addSelection={addSelection} round = {1} delay={30} loggedIn = {loggedIn} restartGame={restartGame} setRestartGame={setRestartGame} /> : <Navigate replace to='/'/>} />  // another solution is to use state
                <Route path="/game/round2" element={(loggedIn && user) ? <MatchPage emptySelection={emptySelection} addSelection={addSelection} round = {2} delay={30} loggedIn = {loggedIn} restartGame={restartGame} setRestartGame={setRestartGame} /> : <Navigate replace to='/'/>} />
                <Route path="/game/round3" element={(loggedIn && user) ? <MatchPage emptySelection={emptySelection} addSelection={addSelection} round = {3} delay={30} loggedIn = {loggedIn} restartGame={restartGame} setRestartGame={setRestartGame} /> : <Navigate replace to='/'/>} />
                <Route path='/login' element={!loggedIn ? <LoginPage login={loggedIn} loginaction={handleLogin} /> : <Navigate replace to='/' />} />
                <Route path="/history" element={(loggedIn && user) ? <HistoryPage user={user} /> : <Navigate replace to='/login' />} />
                <Route path="/recap" element={(loggedIn) ? <Recappage correctselection={correctselection} /> : <Navigate replace to='/'/>} />
                <Route path="*" element={<NotFoundLayout />} />
            </Routes>
              
        </Container>
  )
}

export default App;
