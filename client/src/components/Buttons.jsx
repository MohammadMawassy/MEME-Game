import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';


function StartButton(props) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Button onClick={() => {props.emptySelection();navigate(props.loggedIn ? "game/round1" : "/match" , { state: props.matchItemList})}} className='start-button guess-button py-3 shadow btn-light mt-3'>Start the game!</Button>
    );
}

function HomePageButton(props) {
    const navigate = useNavigate();
    return (
        <Button onClick={() => {props.emptySelection();navigate("/")}} className='p-2 btn btn-light shadow align-self-start'>Return to HomePage</Button>
    );
}

export { StartButton, HomePageButton }; 
