import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function StartButton(props) {
    const navigate = useNavigate();
    return (
        <Button onClick={() => navigate(props.loggedIn ? "game/round1" : "/match")} className='start-button guess-button py-3 shadow'>Start the game!</Button>
    );
}

export { StartButton }; 
