import { createContext, useState } from "react"; //This line imports the createContext function from React, which is used to create a Context object. Context provides a way to pass data through the component tree without having to pass props down manually at every level.
import run from "../config/gemini";


export const Context = createContext(); //This line creates a new context object named Context by calling createContext() and exports it. The Context object will be used to share values between components without explicitly passing props.



//This component will act as a provider for the Context created earlier. It accepts props as an argument, which represents any properties passed to this component.
const ContextProvider =(props) =>{

    const [input,setInput] =useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
  
    //typing effect
    const delayPara =(index,nextWord) =>{
        setTimeout(function(){
            setResultData(prev =>prev+nextWord);
        },75*index)

    }

    //new chat

    const newChat =() =>{
        setLoading(false)
        setShowResult(false)

    }


    const onSent = async (prompt) =>{

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            response= await run(prompt)
            setRecentPrompt(prompt)
            
        } else {
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response=await run(input)
        }
        
        let responseArray =response.split("**");
        let newResponse ="" ;
        for (let i=0; i<responseArray.length; i++)
            {
                if(i===0 || i%2 !==1){
                    newResponse += responseArray[i];
                }
                else{
                    newResponse+= "<b>" +responseArray[i] +"<b>";
                }
            }
            let newResponse2=newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i=0; i<newResponseArray.length;i++){
            const nextWord=newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setLoading(false)
        setInput("")
    }

    //This line initializes an empty object named contextValue. This object is intended to hold the values that you want to make available to any components that consume this context.
    const contextValue ={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }


    //This block of code returns a Context.Provider component. The Provider component is a special type of component that allows consuming components to subscribe to context changes.
    //The value prop of Context.Provider is set to contextValue. Any component that subscribes to this context will have access to the values defined in contextValue.
    //{props.children} represents the components that are wrapped by ContextProvider. This means that any child components of ContextProvider will have access to the context values.
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider