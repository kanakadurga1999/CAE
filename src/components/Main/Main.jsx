import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import  {Context } from '../../context/Context'

const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,input,setInput} = useContext(Context);
  return (
    <div className='main'>
        
        <div className="nav">
            <div className="nav-logo">
            <img src={assets.gemini_icon} alt='' />
            <p>Knowledge Base</p>
            </div>
        
            <div className="bottom-item recent-entry">
            <img src={assets.user_icon} alt='' />
            {/* <img src={assets.setting_icon} alt='' /> */}
            </div>
        </div>

        <div className="main-container">
            {!showResult? 
            <>
            <div className="greet"></div>
            </>
            :<div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt='' />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt='' />
                    {loading?<div className='loader'>
                        <hr />
                        <hr />
                        
                    </div>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                    
                </div>
                </div>}
        
        <div className="main-bottom">
            <div className="search-box">
                <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' placeholder='Enter your prompt' />
                <div>
                    {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                    {/* <img src={assets.gallery_icon} alt="" />  */}
                </div>
            </div>
            <p className="bottom-info"></p>
        </div>
        </div>
    </div>
  )
}

export default Main