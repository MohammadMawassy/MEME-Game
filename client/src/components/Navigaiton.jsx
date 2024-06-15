import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LogoutButton, LoginButton } from './Auth';
import { Navbar, Form, Button } from 'react-bootstrap';




function Navigation (props) {
  const navigate = useNavigate();

  return (
    <Navbar bg="primary" expand="sm" variant="dark" fixed="top" className="navbar shadow">
      <Link to="/" style={{ color: 'black' }}>
        <Navbar.Brand style={{ color: "black" }}>
          <i className="bi bi-compass-fill icon-size ps-3" /> Meme Match
        </Navbar.Brand>
      </Link>
      <Form className="mx-2">
        {props.loggedIn ? <><Button className='nav-button' onClick={() => navigate('/history')} variant="btn btn-otuline-dark">History</Button><LogoutButton logout={props.logout} /></> : <LoginButton />}
      </Form>
      {props.loggedIn ?
        <Navbar.Collapse className="justify-content-end me-4">
          <Navbar.Text style={{ color: 'black' }}>
            Signed in as: <strong>{props.user.name}</strong> 
          </Navbar.Text>
        </Navbar.Collapse> : []}
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
