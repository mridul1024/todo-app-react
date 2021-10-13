import React, { Component } from "react";
import "./index.css";

/**
 * ? Task status has two values -> 1 (complete) or 0 (incomplete)
 * * Select image based on task status -> create a function to select src -> takes taskStatus as argument
 * * Strike out tasks with completed status -> create complete-task and incomplete-task css class
 *
 * ! props -> taskStatus , task
 */

export default class TaskList extends Component {
  selectImage = (statusArgument) => {
    return statusArgument === "0"
      ? "../task_incomplete_checkbox.png"
      : "../task_complete_checkbox.png";
  };
  selectCssClass = (statusArgument) => {
    return statusArgument === "1" ? "complete-task" : "incomplete-task";
  };
  changeImage = (statusArgument) => {
    this.src = this.selectImage(statusArgument);
  };

  render() {
    return (
      <>
        <div className="task-list-container">
          <img
            onClick={this.props.changeStatus}
            src={`${this.selectImage(this.props.taskStatus)}`}
            alt="task_checkbox"
            data-testid="task-list-checkbox"
          />
          <p
            data-testid="task-list-placeholder"
            className={`${this.selectCssClass(this.props.taskStatus)}`}
          >
            {this.props.task}
          </p>
        </div>
      </>
    );
  }
}
