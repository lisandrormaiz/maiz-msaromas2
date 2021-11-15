import {Link} from "react-router-dom";
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link className="logo" to="/"><img className="navbar-logo" src="../assets/logo2.png" alt="logo"/></Link>
            <ul className="navbar-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/categoria/Perfumes Textiles">Perfumes textiles</Link></li>
                <li><Link to="/categoria/Difusores">Difusores</Link></li>
                <li><Link to="/categoria/Auto">Auto</Link></li>
                <li><Link to="/categoria/Otros">Otros</Link></li>
            </ul>
            <CartWidget className="navbar-cart"/>
        </nav>
    )
}

export default NavBar