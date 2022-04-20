import { Container, Background, Content, AnimationContainer } from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
  const formSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório!"),
    password: yup.string().min(8).required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const history = useHistory();

  const onSubmitFuncion = (data) => {
    api
      .post("/user/login", data)
      .then((response) => {
        const { token } = response.data;

        localStorage.setItem("@Doit:token", JSON.stringify(token));

        setIsAuthenticated(true);

        return history.push("/dashboard");
      })

      .catch((err) => toast.error("Senha/Email incorretos"));
  };

  if (isAuthenticated){
    return <Redirect to="/dashboard"/>
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFuncion)}>
            <h1>Login</h1>
            <Input
              error={errors.email?.message}
              register={register}
              name="email"
              icon={FiMail}
              label="Email"
              placeholder="Seu melhor email"
            ></Input>
            <Input
              error={errors.password?.message}
              register={register}
              name="password"
              icon={FiLock}
              label="Senha"
              placeholder="Uma senha bem segura"
            ></Input>
            <Button type="submit">Enviar</Button>
            <p>
              Não tem conta? Faça seu <Link to="/signup">Cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;