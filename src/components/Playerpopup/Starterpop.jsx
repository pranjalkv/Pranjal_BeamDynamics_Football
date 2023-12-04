import "./Playereditor.css"
import { FaTriangleExclamation } from "react-icons/fa6";
function Starterpop({head,para})
{
    return(
        <div className="starter-pop">
                <p className="heading-class flex-center"><FaTriangleExclamation 
                style={{color:"var(--orange)",marginRight:"8px"}}/> {head}</p>
                <p className="subHeading-class" style={{marginTop:"8px",color:"var(--forText)"}}>{para}</p>
        </div>
    )
}

export default Starterpop