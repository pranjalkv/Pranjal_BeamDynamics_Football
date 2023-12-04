import "./Navbar.css"
import { FaUsersLine , FaBars  } from "react-icons/fa6";
import { useNavigate,useLocation } from "react-router-dom";

function Navbar()
{
    const location = useLocation();
    const navi=useNavigate()
    return(
        <nav>
            <ul>
                <li to="/" className="top-circle" onClick={()=>{navi("/")}}>
                        <img src="/aballc.png" alt="" />
                    </li>
                    <li to="/" className={`nav-icon ${location.pathname === '/'? "nav-orange":"muted-nav"} icon-gap`} 
                    onClick={()=>navi("/")}>
                        {location.pathname === '/'&& <span>•</span>}
                        <FaBars size="1.2em"/>
                    </li>
                    <li to="/teamsheet"className={`nav-icon ${location.pathname === '/teamsheet' ? "nav-orange":"muted-nav"} icon-gap`}
                    onClick={()=>{navi("/teamsheet")}}>
                        {location.pathname === '/teamsheet' && <span>•</span>}
                       <FaUsersLine size="1.2em"/>
                </li>
            </ul>
                    
        </nav>
    )
}

export default Navbar