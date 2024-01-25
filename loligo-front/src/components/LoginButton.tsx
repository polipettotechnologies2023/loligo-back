import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@nextui-org/react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button radius="full" variant="bordered" color="secondary" size="lg" onClick={() => loginWithRedirect()} style={{
    lineHeight:"5em"
  }}>Get Started</Button>;
};

export default LoginButton;