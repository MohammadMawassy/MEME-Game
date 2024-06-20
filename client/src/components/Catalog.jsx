import Container from 'react-bootstrap/Container';
import { Item } from './Item';
import { CaptionItem } from './CaptionItem';
import { useState } from 'react';

const Catalog = ({ itemList}) => {

    return (
        <div className="match-container no-borders">
            <Container fluid className="d-flex flex-row flex-wrap align-items-center justify-content-center catalog">
                {
                    itemList.map((item, index) => (
                        <Item key={index} item={item}></Item>
                    ))
                }
            </Container>
        </div >
    );
}

function Captions({setSelectedItem, captionlist, captionTrueList, loggedIn, round, newList, restartGame, setRestartGame}){
    // const [disabled, setDisabled] = useState(false);
    return(
        <div className="match-container d-flex flex-wrap">
            {
                captionlist.map((caption, index) => (
                    <CaptionItem  setSelectedItem={setSelectedItem} restartGame={restartGame} setRestartGame={setRestartGame} key={index} caption={caption} captionTrueList={captionTrueList} loggedIn={loggedIn} round = {round} newList= {newList}></CaptionItem>
                ))
            }
        </div >
    );
}



export { Catalog , Captions };