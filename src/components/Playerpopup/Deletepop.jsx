import { useEffect,useRef } from "react"
import "./Playereditor.css"
import {FaXmark} from "react-icons/fa6"
import { useDispatch } from "react-redux"
import { delPlayer } from "../Slice/Transfer"

function Deletepop({deleter,setDeleter,deleteId})
{
    const disDel=useDispatch()
        const closeDel=useRef()
    useEffect(()=>{
        function handleDel(e)
        {
            if(deleter && closeDel.current && !closeDel.current.contains(e.target))
            {
                setDeleter(false)
            }
        }
        document.addEventListener("mousedown",handleDel)
        return()=>document.removeEventListener("mousedown",handleDel)
    },[deleter])
    return(
        <>
         {deleter && <div className="popup-bg flex-center">
        <div className="delete-pop" ref={closeDel}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <p className="heading-class">Are you sure?</p>
                <button className="transp-btn close-action" onClick={()=>setDeleter(false)}><FaXmark/></button>
            </div>
            <p className="subHeading-class" 
            style={{margin:"28px 0",color:"var(--forText)"}}>This action cannot be undone.</p>
            <div style={{textAlign:"end"}}>
                            <button className="cancel-btn" onClick={()=>setDeleter(false)}>Cancel</button>
            <button className="confrimDel-btn" onClick={()=>{disDel(delPlayer(deleteId)),setDeleter(false)}}>Delete</button>
            </div>
        </div>
        </div>}
        </>
    )
}

export default Deletepop