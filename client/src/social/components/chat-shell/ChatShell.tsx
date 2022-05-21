import { Routes, Route } from 'react-router-dom';
import ChatDetail from "./chat-detail/ChatDetail";
import ChatList from './chat-list/ChatList';


export default function ChatShell(){

    return (
    <div>
        <Routes>
            <Route path="detail" element={<ChatDetail />}></Route>
            <Route path="list" element={<ChatList />}></Route>
        </Routes> 
    </div>
    )
}