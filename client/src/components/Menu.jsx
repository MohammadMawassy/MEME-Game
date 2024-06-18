import Row from 'react-bootstrap/Row';
import { StartButton } from './Buttons';

const Menu = (props) => {

    return (
        <div className="menu shadow">
            
            <StartButton loggedIn = {props.loggedIn} matchItemList={props.matchItemList}></StartButton>
            
        </div>
    );
}

export { Menu };