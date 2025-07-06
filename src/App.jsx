import {v4 as uuidv4} from "uuid";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Model } from "./components/Model/Model";
import { Theme } from "./components/Theme/Theme";
import { Chat } from "./components/Chat/Chat";
import { useEffect, useMemo, useState } from "react";
import styles from "./App.module.css";

function App() 
{
  const [assistant,setAssistant] = useState();
  const [chats,setChats] = useState([]);
  const [activeChatId,setactiveChatId] = useState();
  const activeChatMessages = useMemo(() => chats.find(({id}) => id === activeChatId)?.messages ?? [], [chats, activeChatId]);
  
  useEffect(() => 
  {
    handleNewChatCreate();
  }, [])

  function handleAssistantModelChange(newAssistant)
  {
    setAssistant(newAssistant);
  } 

  function handleChatMessagesUpdate(id, messages = [])
  {
    const title = messages[0]?.content.split(" ").slice(0, 7).join(" ");

    setChats((prevChats) => 
      prevChats.map((chat) => 
        (chat.id === id ? {...chat, title: chat.title ?? title, messages} : chat)
      )
    );
  }

  function handleNewChatCreate()
  {
    const id = uuidv4();

    setactiveChatId(id);
    setChats((prevChats) => [...prevChats, {id, messages: []}]);
  }

  function handleActiveChatIdChange(id)
  {
    setactiveChatId(id);
    setChats((prevChats) => prevChats.filter(({messages}) => messages.length > 0))
  }

  return (
  <div className={styles.App}>
    <header className={styles.Header}>
      <img className={styles.Logo} src="/chat-bot.png"/>
      <h2 className={styles.Title}>
        <span className={styles.Blue}>M</span>
        <span className={styles.Red}>e</span>
        <span className={styles.Yellow}>m</span>
        <span className={styles.Blue}>i</span>
        <span className={styles.Green}>n</span>
        <span className={styles.Red}>i</span>
        </h2>  
    </header>
    
    <div className={styles.Content}>
      <Sidebar 
        chats={chats} 
        activeChatId={activeChatId} 
        activeChatMessages={activeChatMessages}
        onActiveChatIdChange={handleActiveChatIdChange}
        onNewChatCreate={handleNewChatCreate}/>

      <main className={styles.Main}>
        {chats.map((chat) => 
        <Chat 
          key= {chat.id}
          assistant={assistant} 
          isActive={chat.id === activeChatId}
          chatId = {chat.id} 
          chatMessages={chat.messages}
          onChatMessagesUpdate={handleChatMessagesUpdate}/>)
        }

        <div className={styles.Configuration}>
          <Model onModelChange={handleAssistantModelChange}/>
          <Theme/>
        </div>

      </main>
    </div>
  </div>
  )
}

export default App
