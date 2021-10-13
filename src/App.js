// import { React, Component } from "react";
import TaskEntry from "./components/TaskEntry";
import TaskList from "./components/TaskList";
import "./App.css";

import { React, useState } from "react";

export default function App() {
  const [task, settask] = useState([]);

  const addTask = () => {
    let newTask = document.getElementById("task-entry").value;
    if (newTask !== "") {
      settask([
        ...task,
        {
          taskTitle: document.getElementById("task-entry").value,
          currentStatus: "0",
        },
      ]);
    }
  };

  return (
    <div className="App">
      <TaskEntry
        InsertTask={() => {
          addTask();
        }}
      ></TaskEntry>
      <p className="task-list-header">
        Tasks <img src="../down_arrow_icon.png" alt="down-arrow" />
      </p>

      <ul data-testid="task-list-ul">
        {task.length === 0 ? (
          <p className="no-task-text">Your tasks will show up here</p>
        ) : (
          task.map((element, index) => (
            <li key={index.toString()} data-testid="task-list-li">
              <TaskList
                task={element.taskTitle}
                taskStatus={element.currentStatus}
                changeStatus={() => {
                  const newTasks = task.slice();
                  newTasks[index].currentStatus === "0"
                    ? (newTasks[index].currentStatus = "1")
                    : (newTasks[index].currentStatus = "0");
                  settask(newTasks);
                }}
              ></TaskList>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
