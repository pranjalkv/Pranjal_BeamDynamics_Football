import "./Importer.css"
import { FaXmark } from "react-icons/fa6";
import Papa from "papaparse";
import { useState ,useRef,useEffect } from "react";
import {squadData} from "../Slice/Transfer";
import { useDispatch } from "react-redux";

function Importer({closer,setCloser})
{
    const refFile=useRef(null)
    const closeRef=useRef(null)
    const [csvFile,setCsvfile]=useState(null)
    const[fileName,setFilename]=useState("No file selected")
    const [errMsg,setErrmsg]=useState(false)

    const dispatch=useDispatch()

    const allFeilds=["Player Name","Player Image","Jersey Number","Position",
    "Height","Weight","Nationality","Flag Image","Starter","Appearances","Minutes Played",
    "Goals ","Assists","Clean Sheets","Saves"]
    function uploadFile(e)
    {
    const file = e.target.files?.[0];
   if(file)
    { Papa.parse(file, {
      complete: (result) => {
        const emptyFeild = result.data.some((ele) =>
            Object.values(ele).some((feild) => feild === '')
          );
          const givenFields=result.meta.fields || []
          const currentFeilds = allFeilds.filter(
            (fel) => !givenFields.includes(fel)
          );
          if(emptyFeild || currentFeilds.length>0)
          {
            setErrmsg(true)
          }
          else
          {
            setErrmsg(false)
          }
        setCsvfile(result.data);
      },
      header: true, 
    });}
    setFilename(file.name)
    console.log(e)
    }

    useEffect(()=>{
        function closeImport(e)
        {
            if(closer && closeRef.current && !closeRef.current.contains(e.target))
            {
                setCloser(false)
                setCsvfile(null)
               setFilename("No file selected")
            setErrmsg(false)
            }
        }
        document.addEventListener("mousedown",closeImport)
        return()=>document.removeEventListener("mousedown",closeImport)
    },[closer])
        let g=0,d=0,m=0,f=0;
        if(csvFile && !errMsg)
        {
        for(let i=0;i<csvFile.length;i++)
        {
            if(csvFile[i]?.Position.toLowerCase()==="goalkeeper")
            {
                g++;
            }
            if(csvFile[i]?.Position.toLowerCase()==="defender")
            {
                d++;
            }
            if(csvFile[i]?.Position.toLowerCase()==="midfielder")
            {
                m++;
            }
            if(csvFile[i]?.Position.toLowerCase()==="forward")
            {
                f++;
            }
        }
    }

    function handleImport()
    {
        dispatch(squadData(csvFile.map((x,i)=>({...x,id:i}))))
        setCloser(false)
         setCsvfile(null)
    setFilename("No file selected")
    }
    function crossClose()
    {
        setCloser(false)
        setCsvfile(null)
    setFilename("No file selected")
    setErrmsg(false)
    }    
    return(
        <>
        {closer && <div className="popup-bg flex-center">
            <div className="pop-import" ref={closeRef}>
                <div className="import-head">
                <h1 className="heading-class">Importer</h1>
                <button className="transp-btn cross-btn" onClick={crossClose}><FaXmark /></button>
               </div>
               <div className="file-div">
                <p>Roster File</p>   
                <div style={{position:"relative",marginTop:"8px",marginBottom:"16px"}}>
                    <input className={`input-design ${errMsg?"red-border":"plain-border"}`}
                     type="text" value={fileName} readOnly/>
                    <button className={`select-btn ${errMsg?"red-border":"plain-border"}`} onClick={()=>refFile.current?.click()}>Select File</button>
                </div>
                <input type="file" accept=".csv" onChange={uploadFile} ref={refFile} hidden/>
                {errMsg && <p style={{color:"var(--red)",marginBottom:"8px"}}>Error</p> }
                {errMsg && <p style={{color:"var(--muted)"}}>Your sheet is missing data. Please 
                ensure all cells are filled out.</p>}
                {!errMsg && <p style={{color:"var(--forText)"}}>File must be in .csv format</p>}
               </div>
               {(csvFile && !errMsg) && <div >
                <p className="file-summ">File Summary</p>
               <table>
                <thead>
                <tr className="import-th">
                    <td>Total Players</td>
                    <td>Goalkeepers</td>
                    <td>Defenders</td>
                    <td>Midfielders</td>
                    <td>Forwards</td>
                </tr>
                </thead>
                <tbody>
                <tr className="import-td">
                    <td>{csvFile.length}</td>
                    <td>{g}</td>
                    <td>{d}</td>
                    <td>{m}</td>
                    <td>{f}</td>
                </tr>
                </tbody>
               </table>
                </div>}
               <button className={`${(csvFile && !errMsg)?"import-btn":"import-dis"} import-pos`}
               onClick={handleImport}>Import</button>
            </div>
        </div>}
        </>
    )
}
export default Importer