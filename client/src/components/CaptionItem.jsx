import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

const CaptionItem = (props) => {

    const item = props.item

    return (
        <Button variant="link" className="caption-button" >
            {item}
        </Button>
    );
    
}

export {CaptionItem};