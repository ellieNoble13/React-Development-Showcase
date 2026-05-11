import { useState } from "react";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");

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
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Enter task title..."
                />
                <button onClick={addTask} className="success-btn">Add Task</button>
            </div>

            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id} className="task-item">
                        <span style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? '#9ca3af' : '#1d1d1f'
                        }}>
                            {task.title}
                        </span>
                        <button onClick={() => toggleTaskCompletion(task.id)}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManager;