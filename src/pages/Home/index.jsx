import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import { Container } from "./styles";
import { Content } from "./styles";


const Home = ({isAuthenticated}) => {
  const history = useHistory()
  const handleNavigation = (path) => {
    return history.push(path)
  }

  if (isAuthenticated){
    return <Redirect to="/dashboard"/>
  }
  
  return (
    <Container>
      <Content>
        <h1>
          do<span>.</span>it
        </h1>
        <span>Organize-se de forma fácil e efetiva</span>
        <div>
          <Button onClick={() => handleNavigation("/signup")} whiteSchema>Cadastre-se</Button>
          <Button onClick={() => handleNavigation("/login")}>Login</Button>
        </div>
      </Content>
    </Container>
  );
};

export default Home;
