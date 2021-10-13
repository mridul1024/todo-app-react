import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import TaskList from "../index";

describe("<TaskList /> component tests ->", () => {
  let clickSpy;
  beforeAll(() => {
    clickSpy = jest.fn();
  });
  test("should render a TaskList component and match snapshot", () => {
    let taskListComponent;
    taskListComponent = render(
      <TaskList task="My first task" taskStatus="0" />
    );
    expect(taskListComponent.baseElement).toMatchSnapshot("baseElement");
  });

  test("should contain a incomplete-task css class in the <p> tag when status is 0", () => {
    //Arrange
    let taskPlaceholder;
    render(<TaskList task="Random task" taskStatus="0" />);
    //Act
    taskPlaceholder = screen.getByTestId("task-list-placeholder");
    //Assert
    expect(taskPlaceholder.getAttribute("class")).toBe("incomplete-task");
  });

  test("should not contain a complete-task css class in the <p> tag when status is 0", () => {
    let taskPlaceholder;
    render(<TaskList task="Random task" taskStatus="0" />);
    taskPlaceholder = screen.getByTestId("task-list-placeholder");
    expect(taskPlaceholder.getAttribute("class")).not.toBe("complete-task");
  });

  test("should contain a complete-task css class in the <p> tag when the status is 1", () => {
    let taskPlaceholder;
    render(<TaskList task="Random task" taskStatus="1"></TaskList>);
    taskPlaceholder = screen.getByTestId("task-list-placeholder");
    expect(taskPlaceholder.getAttribute("class")).toBe("complete-task");
  });

  test("should not contain a incomplete-task css class in the <p> tag when status is 1", () => {
    let taskPlaceholder;
    render(<TaskList task="Random task" taskStatus="1" />);
    taskPlaceholder = screen.getByTestId("task-list-placeholder");
    expect(taskPlaceholder.getAttribute("class")).not.toBe("incomplete-task");
  });

  test("should call prop function tickTask on click", () => {
    let imageComponent;
    render(
      <TaskList task="Random task" taskStatus="1" changeStatus={clickSpy} />
    );
    imageComponent = screen.getByTestId("task-list-checkbox");
    fireEvent.click(imageComponent);
    expect(clickSpy).toBeCalled();
  });

  test("should have an unfilled checkbox as img src when status is 0", () => {
    let img;
    render(
      <TaskList task="Random task" taskStatus="0" changeStatus={clickSpy} />
    );
    img = screen.getByTestId("task-list-checkbox");
    expect(img.getAttribute("src")).toBe("../task_incomplete_checkbox.png");
  });

  test("should have a filled checkbox as img src when status is 1", () => {
    let img;
    render(
      <TaskList task="Random task" taskStatus="1" changeStatus={clickSpy} />
    );
    img = screen.getByTestId("task-list-checkbox");
    expect(img.getAttribute("src")).toBe("../task_complete_checkbox.png");
  });
});
