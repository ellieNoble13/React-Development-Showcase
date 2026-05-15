import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");


    const { activateClownMode } = useTheme();

    const addTask = () => {
        if (taskTitle === "") return;
        const newTask = {
            id: Date.now(),
            title: taskTitle,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setTaskTitle("");
    };


    const handleInputChange = (e) => {
        const val = e.target.value;
        setTaskTitle(val);

        if (val === "Down2Clown") {
            activateClownMode();
            setTaskTitle("");
        }
    };

    const toggleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <div className="lab-card">
            <h2>Task Manager</h2>

            <div className="button-grid" style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={taskTitle}
                    onChange={handleInputChange} // Use the new listener
                    placeholder="Enter task title..."
                />
                <button onClick={addTask} className="success-btn">Add Task</button>
            </div>

            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id} className="task-item" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}>
                        <span style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? 'var(--text-muted)' : 'var(--text-main)'
                        }}>
                            {task.title}
                        </span>
                        <button onClick={() => toggleTaskCompletion(task.id)} className="btn-small">
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManager;