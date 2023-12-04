import "./Front.css"
import { FaPen,FaXmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Squad from "../Squad/Squad";
import { useState ,useEffect ,useRef } from "react";
import Importer from "../Importer/Importer";
import { useSelector } from "react-redux";
import Formation from "../Squad/Formation";

function Front({isTeam})
{
    const checkPlayer=useSelector((state)=>state.nameTrans.data)

    const[teamName,setTeamname]=useState("My Team")
    const[noInp,setnoInp]=useState(false)

    const [importer,setImporter]=useState(false)
    const [query,setQuery]=useState("")
    const[submitted,setSubmitted]=useState([])
    const[searchBtn,setSearchBtn]=useState(false)
    const enterRef=useRef(null);
    const escRef=useRef(null);

    const filterPlayer=checkPlayer.filter((ele)=>ele["Player Name"].toLowerCase().includes(query.toLowerCase())||
    ele.Position.toLowerCase().includes(query.toLowerCase()) )

    useEffect(()=>{
        setSubmitted(checkPlayer)
    },[checkPlayer])

    useEffect(()=>{
        function handleKeys(e)
        {
            if(e.key=="Enter")
            enterRef.current.click();

            if(e.key=="Escape")
            escRef.current.click();
        }
        document.body.addEventListener('keydown', handleKeys);
    return () => {
      document.body.removeEventListener('keydown', handleKeys);
    };
    },[])

    function submitSearch()
    {
        setSubmitted(filterPlayer);
        setSearchBtn(false);
    }
    function cancelSearch()
    {
        setSubmitted(checkPlayer);
        setQuery("");
        setSearchBtn(true);
    }
    function handleQuery(e)
    {
        setQuery(e.target.value)
        setSearchBtn(true)
    }
    return(
        <>
        <div className="front-design">
        <div className="head-part">
            <span>{!isTeam?"Roster Details":"Formation Overview"}</span>
            {!noInp && <h1 className="heading-class">{teamName}
            <button className={`transp-btn edit-team ${teamName!="My Team"?"hover-edit":""}`}
             onClick={()=>setnoInp(true)}><FaPen/></button></h1>}
            {noInp && <form>
                <input type="text" className="heading-class  edit-inp" value={teamName} 
                onChange={(e)=>setTeamname(e.target.value)} autoFocus/>
                <button className="transp-btn edit-team" 
                onClick={(e)=>{e.preventDefault(),setnoInp(false)}}><FaPen/></button>
            </form>}
        </div>
        {!isTeam && <div style={{position:"relative"}}>
            <div className="search-icon"><FaSearch /></div>
            <input type="text" placeholder="Find Player" className="search-box" value={query} 
            onChange={handleQuery}/>
            {(query.length>=0 && searchBtn) && <button className="input-actions enter-Search"
             onClick={submitSearch} ref={enterRef}>Search</button>}
            {(!searchBtn && query.length>0) && <button className="input-actions cancel-search"
            onClick={cancelSearch} ref={escRef}><FaXmark/></button> }
            <button className={checkPlayer.length==0?"import-btn":"re-imoprt-btn"} 
            onClick={()=>setImporter(true)}>{checkPlayer.length==0?"Import Team":"Re-Import Team"}</button>
        </div>}
        </div>
        {!isTeam && <Squad playerData={submitted}></Squad>}
        {isTeam && <Formation></Formation>}
         {(checkPlayer.length==0 && !isTeam) && <div className="flex-center squad-import">
                <p>You do not have any players on the roster</p>
                <button onClick={()=>setImporter(true)}>Import Team</button>
            </div>}
             {!isTeam && <Importer closer={importer} setCloser={setImporter}></Importer>}
        </>
    )
}

export default Front 