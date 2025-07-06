import { useEffect, useState, useRef } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import styles from "./Controls.module.css"


export function Controls({isDisabled = false, onSend})
{
    const [content, setContent] = useState("");

    const textAreaRef = useRef(null);

    useEffect(() => 
        {
            if(!isDisabled)
            {
                textAreaRef.current.focus();
            }
        }, [isDisabled])

    function handleContnetChange(event)
    {
        setContent(event.target.value);
    }

    function handleContnetSend()
    {
        if(content.length > 0)
        {
            onSend(content);
            setContent("");
        }
    }

    function handleEnterPress(event)
    {
        if(event.key === 'Enter' && !event.shiftKey)
        {
            event.preventDefault()
            handleContnetSend()
        }
    }   

    return(
    <div className={styles.Controls}>
        <div className={styles.TextAreaContainer}>
            <TextAreaAutoSize 
                ref={textAreaRef}
                className={styles.TextArea} 
                disabled={isDisabled}
                placeholder="Message AI Chatbot" 
                minRows = {2}
                maxRows = {5}
                value={content}
                onChange={handleContnetChange}
                onKeyDown={handleEnterPress}/>
        </div>
        <button className={styles.Button} disabled={isDisabled} onClick={handleContnetSend}><SendIcon/></button>
    </div>);
}

function SendIcon()
{
    return (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z"/></svg>);
}