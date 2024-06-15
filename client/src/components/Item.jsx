import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';

const Item = (props) => {

    const item = props.item
    const imagePath = `/memes_images/${item}.jpg`;

    // console.log(imagePath); 

    return (
        <Card className="m-0 p-0 border-0 rounded-0 item shadow">
            <Image fluid className='item-image m-0 bg-card-image d-flex' src={imagePath} style={{ maxWidth: '300px' }} />
            <p className='item-name text-center m-0 p-1 item-name'>{(item)}</p>
        </Card>
    );
}

export {Item};