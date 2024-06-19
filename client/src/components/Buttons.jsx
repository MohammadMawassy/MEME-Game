import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';


function StartButton(props) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Button onClick={() => {navigate(props.loggedIn ? "game/round1" : "/match" , { state: props.matchItemList})}} className='start-button guess-button py-3 shadow btn-light mt-3'>Start the game!</Button>
    );
}

function HomePageButton(props) {
    const navigate = useNavigate();
    return (
        <>
            <Button onClick={() => navigate("/")} className='start-button guess-button py-3 shadow'>Return to HomePage</Button>
        </>
    );
}

export { StartButton, HomePageButton }; 
