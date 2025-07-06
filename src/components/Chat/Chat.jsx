import { useEffect, useState } from "react";
import { Messages } from "../Messages/Messages";
import { Controls } from "../Controls/Controls";
import { Loader } from "../Loader/Loader";
import styles from "./Chat.module.css"

export function Chat({assistant, chatId, chatMessages, onChatMessagesUpdate, isActive = false})
{
  const [messages,setMessages] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [isStreaming,setIsStreaming] = useState(false);

  useEffect(() => 
  {
    setMessages(chatMessages) 
  }, [chatId]);

  useEffect(() => 
    {
      onChatMessagesUpdate(chatId, messages)
    }, [messages]);

  function updateLastMessageContent(contnet)
  {
    setMessages((prevMessages) => prevMessages.map((message , index) => (index === (prevMessages.length - 1) ? {...message, content: `${message.content}${contnet}`} : message)))
  }

  function addMessage(message)
  {
    setMessages((prevMessages) => [...prevMessages, message])
    setIsLoading(true)
  }

  async function handleContentSend(content)
  {
    addMessage({role: "user", content: content})

    try
    {
      const result = await assistant.chatStream(content);
      let isFirstChunk = false;
       
      for await (const chunk of result)
      {
          if(!isFirstChunk)
          {
            isFirstChunk = true;
            addMessage({role: "assistant", content: ""})
            setIsLoading(false)
            setIsStreaming(true)
          }
          
          updateLastMessageContent(chunk)
      }

      setIsStreaming(false)
    }
    catch (error) 
    {
      addMessage({role: "system", content: error.message})
    }

    setIsLoading(false)
    setIsStreaming(false)
  }

  if(!isActive) return null;
    
    return(
        <>
            {isLoading && <Loader/>}

            <div className={styles.Chat}>
                <Messages messages={messages}/>
            </div>
                  
            <Controls isDisabled={isLoading || isStreaming} onSend={handleContentSend}/>
        </>
    );
}