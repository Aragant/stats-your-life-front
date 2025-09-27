import { useEffect } from "react";
import TaskList from "../components/task/taskList";
import { useTask } from "../hooks/useTask";
import TaskHeader from "../components/task/taskHeader";

export default function Task() {
    const { tasks, getTasks, validateTask } = useTask();

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="min-h-screen min-w-screen p-8 bg-gradient-to-br from-[#240046] to-[#5a189a] mb-16">
            <div className="max-w-4xl mx-auto">
                <TaskHeader tasks={tasks} />
                <TaskList tasks={tasks} validateTask={validateTask} />
            </div>
        </div>
    );
}
