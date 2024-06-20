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

  // const [matchItemList, setMatchItemList] = useState([]);


  // useEffect(() => {
  //   console.log("second useeffect running");
  //   const getItems = async () => {
  //     const items = await API.getItems(loggedIn);
  //     console.log(loggedIn, 'Setting items:', items);
  //     setMatchItemList(items);
  //     // setReady(true);
  //   }
  //   getItems();
  // }, [props.loggedIn, restartGame]);

    return (
      <Container fluid id='home-page' className="d-flex align-items-center flex-column justify-content-center">
        <Menu loggedIn= {props.loggedIn} matchItemList={props.matchItemList} /*matchItemList={props.matchItemList}*//>
      </Container>
    );
}

function MatchPage({ round , delay , ...props }) {
  // const matchItemList = ["diet", "m3alem", "nostress", "pshhhh", "shafik"];
  //const captionlist = ["sad", "desperate", "wtfff", "styel", "dkdkdd", "dkdkdk"];
  //const [matchItemList, setMatchItemList] = useState([]);
  const [captionTrueList, setCaptionTrueList] = useState([]);
  const [captionFalseList, setCaptionFalseList] = useState([]);
  const [captionList, setcaptionList] = useState([]);
  const [ready, setReady] = useState(false);
  const [showTimeAlert, setShowTimeAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);

  //const [alert, setAlert] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  let thelist = location.state;
  console.log(thelist); console.log("thelist in round "+round)

  // while (used.includes(randomIndex)) { i will use this later as loop on the list to avoid the random selection that is changing the selected item
  // and in turn causing many re-renders untill the state is the same.
  const selecteditem = thelist[0]
  console.log("selectedItem "+selecteditem);
  const newList = thelist && thelist.length > 0 ? thelist.slice(1) : [];

  
  // const randomIndex = thelist && thelist.length > 0 ? Math.floor(Math.random() * thelist.length) : -1;
  // const selectedItem = randomIndex !== -1 ? thelist[randomIndex] : null;
  // console.log("selectedItem "+selectedItem);
  // const newList = thelist && thelist.length > 0 ? thelist.filter((_, index) => index !== randomIndex) : [];

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

  console.log("captionTrueList "+captionTrueList);

  const captionlistshuffeled = captionList.sort(() => Math.random() - 0.5); // shuffle the list of captions to be displayed at every render as additional difficulty
  console.log( "selectedItem",selectedItem)
  console.log("showTimeAlert",showTimeAlert)

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
        {/* {ready? <Item key={thelist[randomIndex]} item={thelist[randomIndex]} /> : <Spinner animation="border" variant="dark" />} */}
        {ready? <Item key={selecteditem} item={selecteditem} /*key={props.memeItem} item={props.memeItem}*/ /> : <Spinner animation="border" variant="dark" />}
      </div>
      <div className="d-flex flex-column justify-content-center">
        {ready? <Captions setSelectedItem={setSelectedItem} restartGame={props.restartGame} setRestartGame={props.setRestartGame} captionlist={captionlistshuffeled} captionTrueList={captionTrueList} loggedIn={props.loggedIn} round={round} newList={newList} /> : <Spinner animation="border" variant="dark" />}
        {/* {guessedTrue && <GuessTrueAlert guessedTrue={guessedTrue} caption1={captionTrueList[0]} caption2={captionTrueList[1]} />} */}
        {/* {guessedTrue !== undefined && <MatchAlert guessedTrue={guessedTrue} caption1={captionTrueList[0]} caption2={captionTrueList[1]} setRestartGame={props.setRestartGame} />} */}
        {props.loggedIn && <button onClick={goToNextRound}>Next Round</button>}

        <HomePageButton />
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
    // const [history, setHistory] = useState([]);
    const [totalScore, setTotalScore] = useState(0);

    const history = [
      [1, 1, 5, 10, 'shafik'],
      [1, 2, 0, 15, 'nostress'],
      [2, 1, 3, 5, 'pshhhh']
    ];

    useEffect(() => {
      const totalsum = history.reduce((accumulator, currentValue) => {
        // Access the score at the correct index (index 2 in this case)
        const score = currentValue[2];
        if (typeof score === 'number') {
          return accumulator + score;
        } else {
          return accumulator; // Ignore non-numerical score values
        }
      }, 0);
  
      setTotalScore(totalsum);
    }, [history]);
  
    // useEffect(() => {
    //   API.getUserHistory()
    //     .then((result) => {
    //       setHistory(result);
    //       const totalSum = result.reduce((accumulator, currentValue) => {
    //         return accumulator + currentValue.score;
    //       }, 0);
    //       setTotalScore(totalSum);
    //     })
    //     .catch((e) => { console.log("Error displaying user history", e); })
    // }, []);
  
    return (
      history ? (<Container fluid id='history-page' className="d-flex align-items-center flex-column justify-content-center">
        <div className='history-menu shadow p-4'>
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
  

export { HomePage, MatchPage, HistoryPage, LoginPage}; 
