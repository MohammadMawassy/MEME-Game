import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import {MatchAlert} from './LayoutAlerts';

const CaptionItem = (props) => {

    const caption = props.caption
    const captionTrueList = props.captionTrueList
    const [alert, setAlert] = useState(false);
    const [guessedTrue, setguessedTrue] = useState(false);

    return (
        <>
            <Button  onClick={() => {
                // props.setDisabled(true)
                if (captionTrueList.includes(caption)) {
                    setAlert(true);
                    setguessedTrue(true);
                    props.setSelectedItem(true)
                }else{
                    setAlert(true);
                    setguessedTrue(false);
                    props.setSelectedItem(true)
                }
                }} variant="link" className="caption-button" >
                {caption.text}
            </Button>
            {(alert) && <MatchAlert setSelectedItem={props.setSelectedItem} restartGame={props.restartGame} setRestartGame={props.setRestartGame} guessedTrue={guessedTrue} caption1={captionTrueList[0]} caption2={captionTrueList[1]} round={props.round} newList={props.newList} setAlert={setAlert} loggedIn={props.loggedIn} />}
        </>
        
    );
    
}

const TrueCaption = (props) => {
    const caption = props.caption
    return (
        <Card className="m-0 p-0 border-0 rounded-0 item shadow">
            <p className='item-name text-center m-0 p-1 item-name'>{caption.text}</p>
        </Card>
    );
}

export {CaptionItem, TrueCaption};