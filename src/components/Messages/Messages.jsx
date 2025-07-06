import { useEffect, useRef, useMemo } from "react";
import Markdown from "react-markdown";
import styles from "./Messages.module.css"

const WELCOME_MESSAGE_GROUP = [
    {
        role: "assistant",
        content: "Hi, I'm Memini, a wrapper for Google Gemini AI. How can I assist you today?",
    },];

export function Messages({messages})
{
    const messagesEndRef = useRef(null);
    const messagesGroups = useMemo(() => messages.reduce((groups, message) => 
        {
            if (message.role === "user") 
            {
                groups.push([])
            }
            
            groups[groups.length - 1].push(message);
            return groups;

        }, []), [messages]);    
    

    useEffect(() => 
        {
            const lastMessage = messages[messages.length - 1]

            if(lastMessage?.role === "user")
            {
                messagesEndRef.current?.scrollIntoView({behavior: "smooth"})    
            }
        } , [messages])

    return (<div className={styles.Chat}>
        {[WELCOME_MESSAGE_GROUP, ...messagesGroups].map((messages, groupIndex) =>
        
        <div key={groupIndex} className={styles.Group}>
            {messages.map(({role,content}, index) => 
            
            <div key={index} data-role={role} className={styles.Message}>
                <div className={styles.Markdown}>
                    <Markdown>{content}</Markdown>
               </div>
            </div>)}    
        </div>)}

        


            <div ref={messagesEndRef}/>
        </div>
        );
}