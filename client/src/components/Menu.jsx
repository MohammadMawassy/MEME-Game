import Row from 'react-bootstrap/Row';
import { StartButton } from './Buttons';

const Menu = (props) => {

    return (
        <div className="menu shadow">
            
            <StartButton loggedIn = {props.loggedIn}></StartButton>
            
        </div>
    );
}

export { Menu };