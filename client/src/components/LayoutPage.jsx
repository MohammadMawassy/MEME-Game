import { Menu } from "./Menu";
import { Spinner, Container, Row } from 'react-bootstrap';
import { Catalog, Captions } from "./Catalog";
import API from "../API.mjs";
import { HistoryTable } from "./HistroyTable";
import { useState, useEffect } from "react";
import { LoginForm } from './Auth';
import { Item } from './Item'; // to be removed
import { useNavigate, useLocation } from "react-router-dom";
import { HomePageButton } from "./Buttons";
import Timer from "./Timer";
import { TimeAlert } from "./LayoutAlerts";
// import {GuessTrueAlert, MatchAlert} from "./LayoutAlerts";


function HomePage(props) {
    return (
      <Container fluid id='home-page' className="d-flex align-items-center flex-column justify-content-center">
        <Menu emptySelection={props.emptySelection} loggedIn= {props.loggedIn} matchItemList={props.matchItemList} /*matchItemList={props.matchItemList}*//>
      </Container>
    );
}

function MatchPage({ round , delay , ...props }) {
  const [captionTrueList, setCaptionTrueList] = useState([]);
  const [captionFalseList, setCaptionFalseList] = useState([]);
  const [captionList, setcaptionList] = useState([]);
  const [ready, setReady] = useState(false);
  const [showTimeAlert, setShowTimeAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [gameResult, setGameResult] = useState([]); 
  const [hasFunctionRun, setHasFunctionRun] = useState(false);

  // if(gameResult.length === 3) {
  //   setRender(true);
  // }
  // const [correctselection, setCorrectSelection] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  let thelist = location.state;
  console.log(thelist); console.log("thelist in round "+round)

  // while (used.includes(randomIndex)) { i will use this later as loop on the list to avoid the random selection that is changing the selected item
  // and in turn causing many re-renders untill the state is the same.
  const selecteditem = thelist[0]
  // console.log("selectedItem "+selecteditem);
  const newList = thelist && thelist.length > 0 ? thelist.slice(1) : [];

  // const randomIndex = thelist && thelist.length > 0 ? Math.floor(Math.random() * thelist.length) : -1;
  // const selectedItem = randomIndex !== -1 ? thelist[randomIndex] : null;
  // console.log("selectedItem "+selectedItem);
  // const newList = thelist && thelist.length > 0 ? thelist.filter((_, index) => index !== randomIndex) : [];

  function updateclicks() {
    setClicks(prevClicks => prevClicks + 1);
  }
  console.log("clicks "+clicks);  

  const addgameresult = (newelement ) => {
    setGameResult(currentresult => [
      ...currentresult,
      newelement
    ]);
  };
  console.log(gameResult.map((game) => `Date: ${game.date.toLocaleString()}, Meme: ${game.meme}, Score: ${game.score}, Game Score: ${game.GameScore}`).join('\n'));
  
  const goToNextRound = () => {
    if(round === 3) {
      navigate('/history');
      return;
    }
    navigate(`/game/round${round + 1}`, { state: newList });
  };

  useEffect(() => {
    let mounted = true;
  
    const fetchCaptions = async () => {

      try {
        const captionTrueList = await API.getCaptionsForItem(selecteditem.id/*props.memeItem.id*/);
        console.log(captionTrueList);
  
        if (mounted) {
          setCaptionTrueList(captionTrueList);
  
          if (captionTrueList.length > 0) {
            const captionFalseList = await API.getRandomCaptionsExcluding(captionTrueList.map(caption => caption.id));
  
            if (mounted) {
              setCaptionFalseList(captionFalseList);
  
              if (captionFalseList.length > 0) {
                setcaptionList(captionTrueList.concat(captionFalseList));
                setReady(true);
              }
            }
          }
        }
      } catch (e) {
        console.log("Error getting the list of captions for the match", e);
      }
    };
  
    fetchCaptions();
    return () => {
      mounted = false;
    };
  }, [selecteditem.id/*props.memeItem.id*/]);

  // useEffect(() => {
  //   if (/*props.user && props.user.id &&*/ clicks === 3 && gameResult.length === 3) {
  //     const totalScore = gameResult.reduce((accumulator, currentValue) => accumulator + currentValue.score, 0);
  //     const updatedGameResults = gameResult.map(game => ({
  //       ...game,
  //       totalScore: totalScore // Update totalScore to the latest value
  //     }));
  //     setGameResult(updatedGameResults); // Use setGameResult to update the state
  //     console.log("gameResult[0] is the "+gameResult[0]);
  
  //     updatedGameResults.forEach(game => {
  //       API.newHistory(game)
  //         .then((result) => { })
  //         .catch((e) => { console.log("Error storing the history", e); });
  //     });
  //   }
  // }, []);

  const handleGameResultUpdate = () => {
    if (/*props.user && props.user.id &&*/ clicks === 3 && gameResult.length === 3) {
      const totalScore = gameResult.reduce((accumulator, currentValue) => accumulator + currentValue.GameScore, 0);
      const updatedGameResults = gameResult.map(game => ({
        ...game,
        GameScore: totalScore // Update totalScore to the latest value
      }));
      setGameResult(updatedGameResults); // Use setGameResult to update the state
      console.log("gameResult[0] is the " + gameResult[0]);
     // testgameresutls = [{date: new Date(), meme: "tato", score: 5, GameScore: 10 }, {date: new Date(), meme: "tato2", score: 5, GameScore: 20 }, {date: new Date(), meme: "tato3", score: 0, GameScore: 30}]
  
     updatedGameResults.forEach(game => {
        API.newHistory(game)
          .then((result) => { })
          .catch((e) => { console.log("Error storing the history", e); });
      });
    }
  };

  console.log("has function run: ", hasFunctionRun);

  if (clicks===3 && !hasFunctionRun) {
    handleGameResultUpdate();
    setHasFunctionRun(true); // Ensure the function won't be called again
  }

  const captionlistshuffeled = captionList.sort(() => Math.random() - 0.5); // shuffle the list of captions to be displayed at every render as additional difficulty

  return (
    <div className="d-flex justfy-content-center p-5 dark-transparent-box ">
      <div className="d-flex flex-column align-items-center me-3">
        <div className="d-flex align-items-center w-100 justify-content-between">
          <h1>Round {round}</h1>
          <Timer round={round} delay={delay} callback={() => setShowTimeAlert(true)} />
          {!selectedItem && showTimeAlert &&
          <TimeAlert 
            guessedTrue={false} 
            restartGame={props.restartGame} 
            setRestartGame={props.setRestartGame} 
            caption1={captionTrueList[0]} 
            caption2={captionTrueList[1]} 
            round={round} 
            loggedIn={props.loggedIn} 
            newList={newList} 
            setShowTimeAlert={setShowTimeAlert}
          />}
        </div>
        {ready? <Item key={selecteditem} item={selecteditem} /> : <Spinner animation="border" variant="dark" />}
      </div>
      <div className="d-flex flex-column justify-content-center">
        {ready? <Captions addgameresult={addgameresult} clicks={clicks} selecteditem={selecteditem} addSelection={props.addSelection} updateclicks={updateclicks} setShowTimeAlert={setShowTimeAlert} setSelectedItem={setSelectedItem} restartGame={props.restartGame} setRestartGame={props.setRestartGame} captionlist={captionlistshuffeled} captionTrueList={captionTrueList} loggedIn={props.loggedIn} round={round} newList={newList} /> : <Spinner animation="border" variant="dark" />}
        //{props.loggedIn && <button onClick={goToNextRound}>Next Round</button>}

        <HomePageButton emptySelection={props.emptySelection} />
      </div>
    </div>
  );
}

function LoginPage(props) {
  return (
    !props.login && (<Container fluid id='history-page' className="d-flex align-items-center flex-column justify-content-center">
      <div className='dark-transparent-box p-4'>
        <LoginForm login={props.loginaction} />
      </div>
    </Container>)
  );
}


function HistoryPage(props) {
    const [totalScore, setTotalScore] = useState(0);
    const [history, setHistory] = useState([]);

    useEffect(() => {
      API.getUserHistory()
        .then((result) => {
          setHistory(result);
          console.log("result", result);
          const totalSum = result.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.score;
          }, 0);
          setTotalScore(totalSum);
        })
        .catch((e) => { console.log("Error displaying user history", e); })
    }, []);
  
    return (
      history ? (<Container fluid id='history-page' className="d-flex align-items-center flex-column justify-content-center">
        <div className='history-menu dark-transparent-box p-4 mt-5'>
          <h1 className='p-4 pb-1 mb-0'>{props.user.name}'s History</h1>
          <HistoryTable user={props.user} history={history}></HistoryTable>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <h3 className='pt-4'>Your total score is</h3>
            <h1>{totalScore}</h1>
          </div>
        </div>
      </Container>) : <Spinner animation="border" variant="dark" />
    );
}

import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';

//import dayjs from 'dayjs';


const Recappage = ({ correctselection }) => {

    return (
        <div className='history-container d-flex flex-column justify-column-center pt-0 px-2'>
            {correctselection.length ? (
                <>
                    <hr className='mb-2' />
                    <Table responsive="md">
                        <thead>
                            <tr>
                                <th>#</th>
                                {/* <th className='text-center'>gameid</th> */}
                                <th className='text-center'>Round Number</th>
                                <th className='text-center'>Round Score</th>
                                <th className='text-center'>True Caption Selected</th>
                                <th className='text-center'>MEME</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                correctselection.map((selection, index) => (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td className='text-center'>{selection.round}</td>
                                        <td className='text-center'>{selection.score}</td>
                                        <td className='text-center'>{selection.caption.text}</td>
                                        {/* <td className='text-center'>{row[3]}</td> */}
                                        <td className='text-center'>
                                            <Image fluid className='item-image m-0 bg-card-image d-flex' src={`/memes_images/${selection.meme.name}.jpg`} style={{ maxWidth: '300px', maxHeight: '75px', objectFit: 'cover' }} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                      <tfoot>
                        <tr>
                          <td>The Total Score Obtained for this Game is {correctselection.reduce((accumulator, currentValue) => accumulator + currentValue.score, 0)}</td>
                        </tr>
                      </tfoot>
                    </Table>
                </>) : <p className='text-center pt-4 mt-2'>No summary!<br />play a complete match again!!!</p>}
        </div>
    );
}  

function NotFoundLayout() {
  return (
    <Container id="not-found-page" fluid className="vh-100 d-flex align-items-center flex-column justify-content-center">
      <h2>This is not the route you are looking for!</h2>
      <Link to="/">
        <Button variant="primary" className='guess-button'>Go Home!</Button>
      </Link>
    </Container>
  );
}

export { HomePage, MatchPage, HistoryPage, LoginPage, Recappage, NotFoundLayout}; 
