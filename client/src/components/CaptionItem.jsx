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

    const handleAddSelection = () => {
        const newSelection = { round: props.round, meme: props.selecteditem, caption: props.caption, score: 5 };
        props.addSelection(newSelection);
    };

    return (
        <>
            <Button onClick={() => {
                // props.setDisabled(true)
                if (captionTrueList.includes(caption)) {
                    setAlert(true);
                    setguessedTrue(true);
                    props.setSelectedItem(true)
                    props.updateclicks();
                    handleAddSelection();
                    props.addgameresult({date: new Date(), meme: props.selecteditem.name, score: 5, GameScore: 5});
                    
                }else{
                    setAlert(true);
                    setguessedTrue(false);
                    props.setSelectedItem(true)
                    props.updateclicks();
                    props.addgameresult({date: new Date(), meme: props.selecteditem.name, score: 0, GameScore: 0});
                }
                }} className="caption-button btn btn-light me-3 mb-3" >
                {caption.text}
            </Button>
            {(alert) && <MatchAlert clicks={props.clicks} selecteditem={props.selecteditem} updateCorrectSelectionAtIndex={props.updateCorrectSelectionAtIndex} updateCompletedAtIndex={props.updateCompletedAtIndex} setShowTimeAlert={props.setShowTimeAlert} setSelectedItem={props.setSelectedItem} restartGame={props.restartGame} setRestartGame={props.setRestartGame} guessedTrue={guessedTrue} caption1={captionTrueList[0]} caption2={captionTrueList[1]} round={props.round} newList={props.newList} setAlert={setAlert} loggedIn={props.loggedIn} />}
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