import Row from 'react-bootstrap/Row';
import { StartButton } from './Buttons';

const Menu = (props) => {

    return (
        <div className='dark-transparent-box p-5'>
            <h1>Welcome to Match!</h1>
            <h3>The game where you match the caption to the image</h3>
            <StartButton loggedIn = {props.loggedIn} matchItemList={props.matchItemList}></StartButton>
        </div>
    );
}

export { Menu };