import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// layouts
import AppLayout from './layouts/AppLayout';
import ChatLayout from './layouts/ChatLayout';

// pages
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import ChatsPage from './pages/ChatsPage';
import ChatMessagesPage from './pages/ChatMessagesPage';
import NotFoundPage from './pages/NotFoundPage';
import getUsers from './actions/getUsers';
import getChats from './actions/getChats';
import loadMessagesAndChat from './actions/loaders/loadMessagesAndChat';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route element={<AppLayout />}>
        <Route path="users" element={<UsersPage />} loader={getUsers} />
        <Route element={<ChatLayout />} loader={getChats}>
          <Route path="chats" element={<ChatsPage />} />
          <Route
            path="chats/:chatId"
            element={<ChatMessagesPage />}
            loader={loadMessagesAndChat}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
