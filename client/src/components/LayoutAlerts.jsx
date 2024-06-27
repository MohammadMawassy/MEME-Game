import { Button, Col, Row, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CaptionItem, TrueCaption } from './CaptionItem';


function MatchAlert({ clicks, setSelectedItem, guessedTrue, setShowTimeAlert, caption1, caption2, restartGame, setRestartGame, loggedIn, round, newList, setAlert}) {

    let message = '';
    let variant = '';
    let score = NaN;
    const navigate = useNavigate();

    const goToNextRound = () => {
        if(round === 3) {
          navigate('/');
          setRestartGame(!restartGame);
          return;
        }
        navigate(`/game/round${round + 1}`, { state: newList })
        setAlert(false);
        setSelectedItem(false);
    };

    guessedTrue ? (message = "YOU WON", variant = "success", score = 5) : (message = "YOU LOST", score = 0, variant = "warning");
    
    return (
        <Alert key={variant} variant={variant} className="position-fixed top-50 start-50 translate-middle match-alert border-5 px-4 py-2" style={{ zIndex: '9999' }}>
            <div className='p-0'>
                <Row><Col><Alert.Heading className="d-flex justify-content-center p-2" style={{ fontSize: 'xx-large' }}>{message}</Alert.Heading></Col></Row>
                <hr className='mt-0' />
                <Row className='flex-column'>
                    <Col className="d-flex justify-content-center" >
                        With your Match Score for this round is
                    </Col>
                    <Col className="d-flex justify-content-center" style={{ fontSize: 'xxx-large' }}>{score}</Col>
                </Row>
                {/* <Row><Col>To see your total score go on your <Link to={'/history'} style={{ color: 'black' }}>history</Link> section.</Col></Row> */}

                {!guessedTrue ? <><hr /> <Row><Col className='d-flex align-items-center flex-column'><p>The secret item was</p> <TrueCaption caption={caption1} ></TrueCaption></Col></Row></> : []}
                {!guessedTrue ? <Row><Col className='d-flex align-items-center flex-column'> <TrueCaption caption={caption2} ></TrueCaption></Col></Row> : []}
                <hr />
                <div className="d-flex justify-content-center p-1">
                    {!loggedIn ? <Button onClick={() => {navigate("/"); setRestartGame(!restartGame);}} variant={variant}>Restart a New Game</Button> : <Button onClick={() => {setShowTimeAlert(false); goToNextRound();}} variant={variant}>Next </Button>}
                    {'  '}
                    {clicks===3 && <Button onClick={() => {navigate("/recap"); setRestartGame(!restartGame);}} variant={variant}>Game Summary</Button>}
                                         
                </div>
            </div>
        </Alert>
    );
}



function TimeAlert({ guessedTrue, restartGame, setRestartGame, caption1, caption2, round, loggedIn, newList, setShowTimeAlert}) {

    let message = '';
    let variant = '';
    let score = NaN;
    const navigate = useNavigate();

    const goToNextRound = () => {
        if(round === 3) {
          navigate('/');
          setRestartGame(!restartGame);
          return;
        }
        setShowTimeAlert(false);

        navigate(`/game/round${round + 1}`, { state: newList })
        // setAlert(false);
    };
       message = "Time Elapsed! YOU LOST", score = 0, variant = "warning";
       
    return (
        <Alert key={variant} variant={variant} className="position-fixed top-50 start-50 translate-middle match-alert border-5 px-4 py-2" style={{ zIndex: '9999' }}>
            <div className='p-0'>
                <Row><Col><Alert.Heading className="d-flex justify-content-center p-2" style={{ fontSize: 'xx-large' }}>{message}</Alert.Heading></Col></Row>
                <hr className='mt-0' />
                <Row className='flex-column'>
                    <Col className="d-flex justify-content-center" >
                        With your Match Score for this round is
                    </Col>
                    <Col className="d-flex justify-content-center" style={{ fontSize: 'xxx-large' }}>{score}</Col>
                </Row>
                {/* <Row><Col>To see your total score go on your <Link to={'/history'} style={{ color: 'black' }}>history</Link> section.</Col></Row> */}

                {!guessedTrue ? <><hr /> <Row><Col className='d-flex align-items-center flex-column'><p>The correct captions were:</p> <TrueCaption caption={caption1} ></TrueCaption></Col></Row></> : []}
                {!guessedTrue ? <Row><Col className='d-flex align-items-center flex-column'> <TrueCaption caption={caption2} ></TrueCaption></Col></Row> : []}

                <hr />
                <div className="d-flex justify-content-center p-1">
                    {!loggedIn ? <Button onClick={() => {navigate("/"); setRestartGame(!restartGame);}} variant={variant}>Restart a New Game</Button> : <Button onClick={() => { setShowTimeAlert(false); goToNextRound();}} variant={variant}>Next</Button>}
                    
                     
                </div>
            </div>
        </Alert>
    );
}



function GuessTrueAlert({ guessedTrue }) {
    let variant = '';
    let message = '';
    guessedTrue ? (variant = "success", message = "Right Caption, Congrats!!!  End of Round!") : (variant = "warning", message = "Wrong Caption. The two correct captions are:")

    return (
        <Alert variant={variant} className='shadow px-2 py-3 animation m-0 text-center' style={{ position: 'absolute', top: '10vh', width: '35rem' }}>
            <Alert.Heading className='m-0'>{message}</Alert.Heading>
            {/* {!guessedTrue && <Alert.Heading className='m-0'>{caption1}</Alert.Heading>}
            {!guessedTrue && <Alert.Heading className='m-0'>{caption2}</Alert.Heading>} */}
        </Alert>
    );
}

export { MatchAlert, GuessTrueAlert, TimeAlert };