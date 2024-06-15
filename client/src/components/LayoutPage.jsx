import { Menu } from "./Menu";
import { Spinner, Container } from 'react-bootstrap';
import { Catalog, Captions } from "./Catalog";
import API from "../API.mjs";
import { HistoryTable } from "./HistroyTable";
import { useState, useEffect } from "react";
import { LoginForm } from './Auth';
import { Item } from './Item'; // to be removed
import { useNavigate, useLocation } from "react-router-dom";


function HomePage(props) {

    return (
      <Container fluid id='home-page' className="d-flex align-items-center flex-column justify-content-center">
        <Menu loggedIn= {props.loggedIn} />
      </Container>
    );
}

// function MatchPage({round}) {
//     let matchItemList = ["diet", "m3alem" ,"nostress","pshhhh","shafik"]
//     let captionlist = ["sad","desperate","wtfff","styel","dkdkdd","dkdkdk"]

//     const location = useLocation();

//     let thelist = location.state || matchItemList;

//     // const [round, setRound] = useState(1);
//     const [used, setUsed] = useState([])
//     let randomIndex = Math.floor(Math.random() * thelist.length);
//     // while (used.includes(randomIndex)) {
//     //   randomIndex = Math.floor(Math.random() * matchItemList.length);
//     // }
//     // const [round, setRound] = useState(1);

//     const navigate = useNavigate();
//     // Create a new list excluding the item at randomIndex
//     let newList = thelist.filter((_, index) => index !== randomIndex);

//     let goToNextRound = () => {
//       // setUsed([...used, randomIndex]);

//       // setRound(round + 1); 
//       // navigate to /game/round2
//       navigate(`/game/round${round + 1}`,{state : newList})
//     }

//     return (
//       <Container fluid id='match-page' className="vh-100 d-flex align-items-center flex-column justify-content-center no-borders">
//         {/* <Catalog itemList={matchItemList} /> : <Spinner animation="border" variant="dark" /> */}
//         <h1>Round = {round}</h1>
//         <Item key={randomIndex} item={matchItemList[randomIndex]}></Item>
//         <Captions captionlist={captionlist}/>
//         {/* button to go to next round */}
//         <button onClick={goToNextRound}>Next Round</button>
//       </Container>
//     );
// } 

function MatchPage({ round , ...props }) {
  const matchItemList = ["diet", "m3alem", "nostress", "pshhhh", "shafik"];
  const captionlist = ["sad", "desperate", "wtfff", "styel", "dkdkdd", "dkdkdk"];

  const location = useLocation();
  const navigate = useNavigate();

  let thelist = location.state || matchItemList;

  let randomIndex = Math.floor(Math.random() * thelist.length);

  const newList = thelist.filter((_, index) => index !== randomIndex);

  const goToNextRound = () => {
    if(round === 3) {
      navigate('/history');
      return;
    }
    navigate(`/game/round${round + 1}`, { state: newList });
  };

  // if (randomIndex === null) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Container fluid id='match-page' className="vh-100 d-flex align-items-center flex-column justify-content-center no-borders">
      <h1>Round = {round}</h1>
      <Item key={thelist[randomIndex]} item={thelist[randomIndex]} /> 
      <Captions captionlist={captionlist} />
      {props.loggedIn && <button onClick={goToNextRound}>Next Round</button>}
    </Container>
  );
}



function LoginPage(props) {
  return (
    !props.login && (<Container fluid id='history-page' className="d-flex align-items-center flex-column justify-content-center">
      <div className='history-menu shadow p-4'>
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
