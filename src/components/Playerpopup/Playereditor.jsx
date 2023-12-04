import "./Playereditor.css"
import {FaXmark} from "react-icons/fa6";
import { useRef,useEffect, useState } from "react";
import { useSelector,useDispatch} from "react-redux";
import { playerUpdate } from "../Slice/Transfer";
import nation from "../Country";

const allPos=["Defender","Goalkeeper","Forward","Midfielder"]

function Playereditor({openEdit,setOpenedit})
{
    
    const editablePlayer=useSelector((state)=>state.nameTrans.showData)
    const [editable,setEditable]=useState({})
    const [editBtn,setEditbtn]=useState(false)
    const closeEdit=useRef()
    const disUpdate=useDispatch()
    useEffect(()=>{
        function handleEdit(e)
        {
            if(openEdit && closeEdit.current && !closeEdit.current.contains(e.target))
            {
                setOpenedit(false)
            }
        }
        setEditable({
        ["Player Name"]:editablePlayer["Player Name"],
        ["Jersey Number"]:editablePlayer["Jersey Number"],
        Weight:editablePlayer.Weight,
        Height:editablePlayer.Height,
        Nationality:editablePlayer.Nationality,
        Position:editablePlayer.Position,
        Starter:editablePlayer.Starter,
        id:editablePlayer.id
       })
       setEditbtn(false)
        document.addEventListener("mousedown",handleEdit)
        return()=>document.removeEventListener("mousedown",handleEdit)
    },[openEdit])

    useEffect(()=>{
    const change = Object.keys(editable).some(
      key => editable[key] !== editablePlayer[key]
    );
    const isEmpty = Object.values(editable).every(value => value !== '');
    setEditbtn(change && isEmpty);
    },[editablePlayer , editable])
    function handleChange(e)
    {
        setEditable({...editable,[e.target.name]:e.target.value})        
    }
    function handleYesno(e)
    {
        setEditable({...editable,Starter:e.target.value =="Yes"?"No":"Yes"})
        setEditbtn(true)
    }
    function handleEditor(e)
    {
        e.preventDefault();
        disUpdate(playerUpdate(editable));
        setOpenedit(false)
    }

    return(
        <>
         {openEdit && <div className="popup-bg flex-center">
        <div id="playereditor" ref={closeEdit}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                 <p className="heading-class">Edit Player</p>
                <button className="transp-btn close-action" onClick={()=>setOpenedit(false)}><FaXmark size="1.2em"/></button>
           </div> 
           <form className="edit-form">
            <div>
                <p className="subHeading-class">Player Name</p>
            <input className="player-name nobg-input" name="Player Name" value={editable["Player Name"] || ""} onChange={handleChange} type="text" />
            </div>
            <div style={{marginLeft:"16px"}}>
            <p className="subHeading-class">Jersey Number</p>
            <input className="player-num nobg-input" name="Jersey Number" value={editable["Jersey Number"] || ""}  onChange={handleChange} type="text" />
            </div>
           </form>
           <form className="edit-physique">
            <div>
                <p className="subHeading-class">Height</p>
            <input className="physique nobg-input" name="Height" value={editable.Height|| ""}  onChange={handleChange}  type="text" />
            </div>
            <div style={{marginLeft:"16px"}}>
            <p className="subHeading-class">Weight</p>
            <input className="physique nobg-input" name="Weight" value={editable.Weight || ""}  onChange={handleChange} type="text" />
            </div>
           </form>
            <div className="select-div">
                <p className="subHeading-class">Nationality</p>
                <p className="chevon">&lt;</p>
            <select className="nobg-input" value={editable.Nationality || ""}  onChange={handleChange}  name="Nationality">
                {/* <option value="" style={{color:"var(--orange)",pointerEvents:"none"}}
                 selected disabled>{editable.Nationality}</option>  */}
                {nation.map((ele)=><option key={ele}>{ele}</option>)}
            </select>
            </div>
            <div className="select-div">
                <p className="subHeading-class">Position</p>
                <p className="chevon">&lt;</p>
            <select className="nobg-input" value={editable.Position || ""} onChange={handleChange} name="Position">
                {allPos.map((x)=><option key={x} >{x}</option>)}
            </select>
           </div>
           <div>
            <p className="subHeading-class" style={{margin:"16px 0"}}>Starter</p>
            <label className="lbl-radio" style={{marginRight:"16px",fontSize:"14px",color:"var(--forText)"}}>
                <input type="radio" name="Starter"
                checked={editable.Starter=="Yes"?false:true} value={editable.Starter || ""} onChange={handleYesno}/> 
                <span> No</span></label>
            <label className="lbl-radio" style={{color:"var(--forText)",fontSize:"14px"}}>
                <input type="radio" name="Starter"
                 checked={editable.Starter=="Yes"?true:false} value={editable.Starter || ""} onChange={handleYesno} / >
                 <span> Yes</span></label>
           </div>
           <button className={`${editBtn ?"import-btn":"import-dis"} import-pos`}
           onClick={handleEditor}>Edit Player</button>
        </div>
        </div>}
        </>
    )
}

export default Playereditor