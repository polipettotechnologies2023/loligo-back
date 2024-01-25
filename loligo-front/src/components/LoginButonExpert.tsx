import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@nextui-org/react";

const LoginButtonExpert = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button radius="full" size="lg" variant="bordered" color="secondary" onClick={() => loginWithRedirect()}>Login for experts</Button>;
};

export default LoginButtonExpert;