import Routing from './components/Routing'
import { useAuth0 } from "@auth0/auth0-react";
// import { useToken } from './components/useToken';
import LandingPage from './pages/LandingPage'

function App() {
  const { isAuthenticated } = useAuth0();
  // const { isAuthenticated, user } = useAuth0();
  // useToken(user?.sub)

// TODO: uncomment the lines above when we we get the tokens back

  return isAuthenticated? <Routing></Routing> : <LandingPage></LandingPage> 

}

export default App
