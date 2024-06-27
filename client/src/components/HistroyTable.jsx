import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';

//import dayjs from 'dayjs';


const HistoryTable = ({ history }) => {

    return (
        <div className='history-container d-flex flex-column justify-column-center pt-0 px-2'>
            {history.length ? (
                <>
                    <hr className='mb-2' />
                    <Table responsive="md">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className='text-center'>gameid</th>
                                <th className='text-center'>roundnumber</th>
                                <th className='text-center'>scoreForRound</th>
                                <th className='text-center'>ScoreForGame</th>
                                <th className='text-center'>MEME</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history.map((row, index) => (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td className='text-center'>{row[0]}</td>
                                        <td className='text-center'>{row[1]}</td>
                                        <td className='text-center'>{row[2]}</td>
                                        <td className='text-center'>{row[3]}</td>
                                        <td className='text-center'>
                                            <Image fluid className='item-image m-0 bg-card-image d-flex' src={`/memes_images/${row[4]}.jpg`} style={{ maxWidth: '300px', maxHeight: '75px', objectFit: 'cover' }} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </>) : <p className='text-center pt-4 mt-2'>No history,<br />play a match and then come back!</p>}
        </div>
    );
}


export { HistoryTable };