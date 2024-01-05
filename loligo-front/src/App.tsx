import Routing from './components/Routing'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './components/LoginButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from './components/useToken';
import { RootState } from './vite-env';
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./stores/store";

function App() {
  const { isAuthenticated, user } = useAuth0();
  useToken(user?.sub)

  return isAuthenticated? <Routing></Routing> : <LoginButton></LoginButton> 

}

export default App
