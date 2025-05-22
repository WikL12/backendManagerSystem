import { useEffect, useState ,useRef} from "react";
import { Button } from "antd";
const ws = new WebSocket('ws://localhost:3000/system/chatRoom');

export default function ChatRoom() {
    const chatRoomListRef = useRef<HTMLDivElement>(null);
    const chatRoomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener('keydown',(e)=>{
        if(e.key === 'Enter' && chatRoomRef.current!.innerText.trim() !== ''){
            console.log(chatRoomRef.current!.innerText);
            ws.send(JSON.stringify({text:chatRoomRef.current!.innerText.trim(),name:'111'}));
            chatRoomRef.current!.innerText = '';
        }
    })
    ws.onopen = ()=>{
        console.log('连接成功');
    }
    ws.onclose = ()=>{
        console.log('连接关闭');
    }
    
    ws.onmessage = (e)=>{
        console.log(e.data);
        chatRoomListRef.current!.innerText += e.data ;
    }
  },[null])

  const clearChatRoom =  ()=>{
    chatRoomListRef.current!.innerText = '';
    ws.send(JSON.stringify({text:'clear', name:'111'}));
  }
    return (
        <div>
            <h1>聊天室</h1>
            <div ref={chatRoomListRef} style={{width:'100%',height:'200px',border:'1px solid #000',overflow:'auto',color:'red'}}>

            </div>
            <div ref={chatRoomRef} style={{width:'100%',height:'200px',border:'1px solid #000',overflow:'auto',color:'green'}} contentEditable>

            </div>
            <Button type='primary' onClick={clearChatRoom}>清空</Button>
        </div>
    )
}