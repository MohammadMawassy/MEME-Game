import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LogoutButton, LoginButton } from './Auth';
import { Navbar, Row, Button } from 'react-bootstrap';




function Navigation (props) {
  const navigate = useNavigate();

  return (
    <Navbar expand="sm" variant="dark" fixed="top" className="navbar d-flex justify-content-between px-4">
      {/* <div class="navbar-row"> */}
        <Link to="/">
          <Navbar.Brand>
            <span id="logo">Meme Match</span>
          </Navbar.Brand>
        </Link>
        <div className='d-flex'>
          {props.loggedIn ?
            <Navbar.Text style={{ color: 'white' }}>
              Signed in as: <strong>{props.user.name}</strong> 
            </Navbar.Text> : []}
          {props.loggedIn ? <><Button className='nav-button mx-3' onClick={() => navigate('/history')} variant="btn btn-light">History</Button><LogoutButton logout={props.logout} /></> : <LoginButton />}
        </div>
      {/* </div> */}
    </Navbar>
  )
}

// const Navigation = (props) => {
//   const navigate = useNavigate();
//   return (
//     <Navbar bg="primary" expand="sm" variant="dark" fixed="top" className="navbar shadow">
//       <Link to="/" style={{ color: 'black' }}>
//         <Navbar.Brand style={{ color: "black" }}>
//           <i className="bi bi-compass-fill icon-size ps-3" /> Guess WHO
//         </Navbar.Brand>
//       </Link>
//       {props.loggedIn ?
//         <Navbar.Collapse className="justify-content-end me-4">
//           <Navbar.Text style={{ color: 'black' }}>
//             Signed in as: <strong>{props.user.name}</strong> 
//           </Navbar.Text>
//         </Navbar.Collapse> : []}
//     </Navbar>
//   );
// }

export {Navigation};
