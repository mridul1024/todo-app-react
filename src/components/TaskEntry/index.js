import { React } from "react";
import "./index.css";

export default function TaskEntry({ InsertTask }) {
  return (
    <>
      <div className="task-entry-container">
        <input
          type="text"
          id="task-entry"
          data-testid="task-entry-test-id"
          placeholder="Write your new task here !"
        />
        <img
          onClick={InsertTask}
          data-testid="add-task-button-test-id"
          src="../add_task_button.png"
          alt="add_task_button"
        />
      </div>
    </>
  );
}
