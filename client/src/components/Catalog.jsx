import Container from 'react-bootstrap/Container';
import { Item } from './Item';
import { CaptionItem } from './CaptionItem';

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

function Captions({captionlist}){
    return(
        <div className="match-container no-borders">
            <Container fluid className="d-flex flex-row flex-wrap align-items-center justify-content-center catalog">
                {
                    captionlist.map((item, index) => (
                        <CaptionItem key={index} item={item}></CaptionItem>
                    ))
                }
            </Container>
        </div >
    );
}



export { Catalog , Captions };