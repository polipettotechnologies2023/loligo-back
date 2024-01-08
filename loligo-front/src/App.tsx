import Routing from './components/Routing'
import { useAuth0 } from "@auth0/auth0-react";
import { useToken } from './components/useToken';
import LandingPage from './pages/LandingPage'

function App() {
  const { isAuthenticated, user } = useAuth0();
  useToken(user?.sub)

  return isAuthenticated? <Routing></Routing> : <LandingPage></LandingPage> 

}

export default App
