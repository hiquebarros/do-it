import { Container, Background, Content, AnimationContainer } from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link, Redirect } from "react-router-dom";
import {FiUser, FiMail, FiLock} from "react-icons/fi"
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api"
import { toast } from "react-toastify"

const SignUp = ({isAuthenticated}) => {

  const formSchema = yup.object().shape({
    name: yup.string().required('Campo obrigatório!'),
    email: yup.string().email('Email inválido').required('Campo obrigatório!'),
    password: yup.string().min(8).required('Campo obrigatório!'),
    confirmedPassword: yup.string().oneOf([yup.ref("password")], "As senhas devem ser iguais").required('Campo obrigatório!')
  })

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(formSchema)
  })

  const history = useHistory()

  const onSubmitFuncion = ({ name, email, password }) => {
    const user = { name, email, password }
    api
    .post("/user/register", user)
    .then((_) => toast.success("Sucesso ao criar a conta"))
    return history.push("/login")
    .catch((err) => toast.error("Erro ao criar a conta, tente outro Email"))
  }

  if (isAuthenticated){
    return <Redirect to="/dashboard"/>
  }

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFuncion)}>
            <h1>Cadastro</h1>
            <Input error={errors.name?.message} register={register} name="name" icon={FiUser} label="Nome" placeholder="Seu nome"></Input>
            <Input error={errors.email?.message} register={register} name="email" icon={FiMail} label="Email" placeholder="Seu melhor email"></Input>
            <Input error={errors.password?.message} register={register} name="password" icon={FiLock} label="Senha" placeholder="Uma senha bem segura"></Input>
            <Input error={errors.confirmedPassword?.message} register={register} name="confirmedPassword" icon={FiLock} label="Confirmação de senha" placeholder="Confirme sua senha"></Input>
            <Button type="submit">Enviar</Button>
            <p>
              Já tem conta? Faça seu <Link to="/login">Login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
