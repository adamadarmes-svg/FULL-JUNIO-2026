import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { createTask } from '../services/api';
import { useUser } from '../context/UserContext';

function NewTask() {
  const { id } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async ({ titulo, descripcion }) => {
    await createTask({ titulo, descripcion, userId: id });
    navigate('/');
  };

  return (
    <TaskForm
      titulo="Nueva tarea"
      textoBoton="Agregar tarea"
      onSubmit={handleSubmit}
    />
  );
}

export default NewTask;
