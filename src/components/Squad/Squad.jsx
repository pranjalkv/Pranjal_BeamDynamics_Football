import { useEffect, useState,useRef} from "react";
import "./Squad.css"
import { FaEllipsis,FaPen,FaTrashCan ,FaXmark} from "react-icons/fa6";
import Playereditor from "../Playerpopup/Playereditor";
import Deletepop from "../Playerpopup/Deletepop";
import { sentPlayer} from "../Slice/Transfer";
import { useDispatch } from "react-redux";

function Squad({playerData})
{
    const editRef=useRef()
    const sentDis=useDispatch()
    const[editing,setEditing]=useState(-1)
    const[openEdit,setOpenedit]=useState(false)
    const[deleter,setDeleter]=useState(false)
    const [deleteId,setDeleteId]=useState("")
    function toMeter(height)
    {
        let p=height/100;
        let x=p.toFixed(2)
        return x;
    }
    useEffect(()=>{
        function handleEditor(e)
        {
            if(editing!=-1 && editRef.current && !editRef.current.contains(e.target))
            {
                setEditing(-1)
            }
        }
        document.addEventListener("mousedown",handleEditor)
        return()=>document.addEventListener("mousedown",handleEditor)
    },[editing])
    // const playerData=useSelector((ele)=>ele.nameTrans.data)
    function performEdit(uid)
    {
        sentDis(sentPlayer(uid))
        setOpenedit(true);
        setEditing(-1);
    }
    function performDel(delID)
    {
        setDeleteId(delID)
        setDeleter(true),
        setEditing(-1)
    }
    return(
        <div className="squad-part">
            <table style={{width:"100%",paddingLeft:"20px",paddingTop:"17px",position:"relative"}}>
                <thead>
                <tr className="squad-th">
                 <td>Player Name</td>
                 <td>Jersey Number</td>
                 <td>Starter</td>
                 <td>Position</td>
                 <td>Height</td>
                 <td>Weight</td>
                 <td>Nationality</td>
                 <td>Appearances</td>
                 <td>Minutes Played</td>
                 <td></td>
               </tr>
               </thead>
               <tbody>
               {playerData?.map((info,i)=><tr className="squad-td" key={i}>
                <td className="nameflag"><img className="flag" src={info["Flag Image"]} alt="" />
                {info["Player Name"]}</td>
                <td>{info["Jersey Number"]}</td>
                <td>{info?.Starter}</td>
                <td>{info?.Position}</td>
                <td>{toMeter(info?.Height)} m</td>
                <td>{info?.Weight !="Unknown"?info?.Weight+" kg":info?.Weight}</td>
                <td>{info?.Nationality}</td>
                <td>{info?.Appearances}</td>
                <td>{info["Minutes Played"]}</td>
                <td onClick={()=>setEditing(i)}><FaEllipsis size="1.2em"  style={{marginTop:"10px"}}/></td>
                 {editing==i && <td className="actions-div"  ref={editRef}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                 <p className="heading-class">Actions</p>
                <button className="transp-btn close-action" onClick={()=>setEditing(-1)}><FaXmark size="1.2em"/></button>
                </div> 
                <button className="transp-btn editor" onClick={()=>performEdit(info)}><FaPen className="icon-styles"/> Edit Player</button>
                <button className="transp-btn deleter"  onClick={()=>{performDel(info.id)}}>
                    <FaTrashCan className="icon-styles"/> Delete Player</button>                
            </td>}
               </tr>)}
               </tbody>
            </table>
           <Playereditor openEdit={openEdit} setOpenedit={setOpenedit}></Playereditor>
           <Deletepop deleter={deleter} setDeleter={setDeleter} deleteId={deleteId}></Deletepop>
        </div>
    )
}
export default Squad