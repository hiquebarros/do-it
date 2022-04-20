import { Redirect } from "react-router-dom";
import { Container, InputContainer, TaskContainer } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FiEdit2 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import api from "../../services/api";
import { toast } from "react-toastify";

const Dashboard = ({ isAuthenticated }) => {
  const [tasks, setTasks] = useState([]);
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Doit:token")) || ""
  );
  const { register, handleSubmit } = useForm();

  const loadTasks = () => {
    api
      .get("task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          completed: false,
        },
      })

      .then((response) => {
        const apiTasks = response.data.data.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));
        setTasks(apiTasks);
      });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }


  const onSubmit = ({ task }) => {
    if (!task) {
      return toast.error("Complete o campo para enviar uma tarefa");
    }

    api
      .post(
        "/task",
        {
          description: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => loadTasks());
  };

  const handleCompleted = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);

    api
      .put(
        `/task/${id}`,
        { completed: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => setTasks(newTasks));
  };


  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <section>
          <Input
            icon={FiEdit2}
            placeholder="Nova tarefa"
            register={register}
            name="task"
          />
          <Button type="submit">Concluir</Button>
        </section>
      </InputContainer>
      <TaskContainer>
        {tasks.map((task) => (
          <Card
            key={task._id}
            title={task.description}
            date={task.createdAt}
            onClick={() => handleCompleted(task._id)}
          >
            Concluir
          </Card>
        ))}
      </TaskContainer>
    </Container>
  );
};

export default Dashboard;
