import { useEffect } from "react"
import "./Squad.css"
import { useSelector } from "react-redux"
import { useState } from "react"
import Starterpop from "../Playerpopup/Starterpop"

  const defPos=[{top:"56px",left:"202px"},{top:"173px",left:"192px"},
    {top:"336px",left:"192px"},{top:"453px",left:"202px"}]

const midPos=[{top:"94px",left:"386px"},{top:"254px",left:"386px"},
{top:"414px",left:"386px"}]

const frdPos=[{top:"116px",left:"556px"},{top:"254px",left:"578px"}
,{top:"393px",left:"556px"}]
const isNum=/[0-9]/;

function Formation()
{
    
    const getTeam=useSelector((state)=>state.nameTrans.data)
    const finalTeam=getTeam.filter((ele)=>ele.Starter=="Yes")

    let gk=finalTeam.filter((g)=>g.Position=="Goalkeeper")
    let mid=finalTeam.filter((m)=>m.Position=="Midfielder")
    let def=finalTeam.filter((d)=>d.Position=="Defender")
    let fw=finalTeam.filter((f)=>f.Position=="Forward")

    const [openPly,setOpenply]=useState(gk[0])
    const [loader,setloader]=useState(true)

    useEffect(()=>{
        setloader(true)
    },[openPly])

function handelLoad()
{
    setloader(false)
}
function handleClick(ele)
{
    setOpenply(ele)
}

function toMeter(height)
    {
        let p=height/100;
        let x=p.toFixed(2)
        return x;
    }
    return(
        <section className="formation flex-center" >
            {(finalTeam.length<11 && getTeam.length>0) && <Starterpop head={"Not enough starters"} 
            para={"Your team doesn’t have enough starters for one or more of the positions in the 4-3-3 formation."}></Starterpop>}
             {(finalTeam.length>=11 && (gk.length!=1 || mid.length!=3 || def.length!=4 || fw.length!=3) && getTeam.length>0 ) && <Starterpop head={"There are too many starters"} 
            para={"Your team has too many starters for one or more of the positions in the 4-3-3 formation."}></Starterpop>}
            {getTeam.length==0 && <Starterpop head={"No player data found"} para={"Please importer your roster first"}></Starterpop>}
            <div className="green-feild">
                {(finalTeam.length!=11 || gk.length!=1 
                    || mid.length!=3 || def.length!=4 || fw.length!=3 || !finalTeam) && <div className="feild-error"></div>}
                <img src="/soccer-field.jpg" alt="green-feild" />
                {(finalTeam.length==11 && gk.length==1 
                    && mid.length==3 && def.length==4 && fw.length==3) && <div>
                {gk.map((g,i)=><div className="player-Pos" key={i} style={{top:"254px",left:"50px"}}>
                    <button className={`player-Btn ${openPly.id==g.id?"active-plyBtn":"normal-ply"}`}
                     onClick={()=>handleClick(g)}>{g["Jersey Number"]}</button>
                    <p>{g["Player Name"]}</p>
                </div> )}

                {def.map((d,i)=><div className="player-Pos" key={i} style={{top:`${defPos[i].top}`,left:`${defPos[i].left}`}}>
                    <button className={`player-Btn ${openPly.id==d.id?"active-plyBtn":"normal-ply"}`}
                     onClick={()=>handleClick(d)}>{d["Jersey Number"]}</button>
                    <p>{d["Player Name"]}</p>
                </div>)}
                

            {mid.map((m,i)=><div className="player-Pos" key={i} style={{top:`${midPos[i].top}`,left:`${midPos[i].left}`}}>
                <button className={`player-Btn ${openPly.id==m.id?"active-plyBtn":"normal-ply"}`} 
                onClick={()=>handleClick(m)}>{m["Jersey Number"]}</button>
                <p>{m["Player Name"]}</p>
            </div>)}
              

                {fw.map((f,i)=><div className="player-Pos" key={i} style={{top:`${frdPos[i].top}`,left:`${frdPos[i].left}`}}>
                    <button className={`player-Btn ${openPly.id==f.id?"active-plyBtn":"normal-ply"}`} 
                    onClick={()=>handleClick(f)}>{f["Jersey Number"]}</button>
                    <p>{f["Player Name"]}</p>
                </div>)}
            </div>}
           
            </div>
            
            <div className="player-desc">
                <hr className="statsLine"/>
                {(finalTeam.length==11 && gk.length==1 
                    && mid.length==3 && def.length==4 && fw.length==3) && <div>
                <div className="jersey-num flex-center">
                    <h1>{openPly["Jersey Number"]}</h1>
                    <p >{openPly["Jersey Number"]}</p>
                    </div>
                    <div className="overlay"></div>
                     <img className="img-ply" src={openPly["Player Image"]} alt="player"
                      onError={(e)=>e.target.src="/holder.png"}
                      onLoad={handelLoad}  style={{ display: loader ? 'none' : 'block'}}/>
                      {loader && <img className="img-ply" src="/holder.png" alt="player"
                      onError={(e)=>e.target.src="/holder.png"} />}
                    <div className="name-ply">
                        <h1>{openPly["Player Name"]}</h1>
                        <h2>{openPly.Position}</h2>
                    </div>
                    <table className="info-ply" style={{margin:"24px 0"}}>
                        <thead>
                        <tr className="thead-ply">
                            <td>Height</td>
                            <td>Weight</td>
                            <td>Nationality</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="tbody-ply">
                            <td style={{paddingTop:"6px"}}>{toMeter(openPly.Height)} m</td>
                            <td style={{paddingTop:"6px"}}>{openPly?.Weight !="Unknown"?openPly?.Weight+" kg":openPly?.Weight}</td>
                            <td  style={{whiteSpace:"nowrap",display:"flex",alignItems:"center"}}>
                                <img className="flag-ply" src={openPly["Flag Image"]} alt="" /> 
                                {openPly.Nationality}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="stats-ply">
                        <div className="stats-num">
                            <h1>{openPly.Appearances}</h1>
                            <p>Appearances</p>
                        </div>
                        <div className="stats-num">
                            <h1>{openPly["Minutes Played"]}</h1>
                            <p>Minutes Played</p>
                        </div>
                        <div className="stats-num">
                            <h1>{isNum.test(openPly["Clean Sheets"])?openPly["Clean Sheets"]:openPly["Goals "]}</h1>
                            <p>{isNum.test(openPly["Clean Sheets"])?"Clean Sheets":"Goals"}</p>
                        </div>
                        <div className="stats-num">
                            <h1>{isNum.test(openPly.Saves)?openPly.Saves:openPly.Assists}</h1>
                            <p>{isNum.test(openPly.Saves)?"Saves":"Assists"}</p>
                        </div>
                    </div>
                    </div>}
            </div>
        </section>
    )
}
export default Formation
