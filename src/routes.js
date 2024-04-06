import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Friends from "./pages/Friends"
import NewPage from "./pages/NewPage"
import Dialogs from "./pages/Dialogs"
import DialogPage from "./pages/DialogPage"
import { ADMIN_ROUTE,  NEWS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE,FRIENDS_ROUTE,DIALOGS_ROUTE } from "./utils/consts"
import Main from "./pages/Main"

export const authRoutes = [
    { path: FRIENDS_ROUTE, Component: Friends },
    { path: ADMIN_ROUTE, Component: Admin },
    { path: DIALOGS_ROUTE, Component: Dialogs },
    {path:  DIALOGS_ROUTE + '/:id', Component: DialogPage},
  ];
export const publicRoutes = [
    {path: MAIN_ROUTE, Component: Main},
    {path: LOGIN_ROUTE, Component:Auth },
    {path: REGISTRATION_ROUTE, Component: Auth},
    {path:  NEWS_ROUTE + '/:id', Component: NewPage},
    
    
]