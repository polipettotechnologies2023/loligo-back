import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@nextui-org/react";

const LoginButtonExpert = () => {
  const jira_board = 'https://polipetto-lolligo.atlassian.net/jira/software/projects/LOL/boards/1?atlOrigin=eyJpIjoiZTU4MTA2YzkxZTAyNGY3M2I3MDdkMDA0MDIyNDI5M2EiLCJwIjoiaiJ9'
  return <Button radius="full" size="lg" variant="bordered" color="secondary" onClick={ () => { window.location.href = jira_board; }}>Login for experts</Button>;
};

export default LoginButtonExpert;