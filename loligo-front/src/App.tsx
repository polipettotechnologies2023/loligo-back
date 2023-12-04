import Routing from './components/Routing'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './components/LoginButton';

function App() {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? <Routing></Routing> : <LoginButton></LoginButton>
  // TODO LoginButton will be intead a landing page
}

export default App
