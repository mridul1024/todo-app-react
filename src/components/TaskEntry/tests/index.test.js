import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import TaskEntry from "../index";

describe("<TaskEntry /> component tests ->", () => {
  let clickSpy;
  beforeAll(() => {
    clickSpy = jest.fn();
  });
  test("should render the component and match snapshot", () => {
    //Arrange
    let taskEntryComponent;
    //Act
    taskEntryComponent = render(<TaskEntry InsertTask={clickSpy} />);
    //Assert
    expect(taskEntryComponent.baseElement).toMatchSnapshot("baseElement");
  });

  test("should contain a placeholder text", () => {
    //Arrange
    render(<TaskEntry InsertTask={clickSpy} />);
    let placeholder;
    //Act
    placeholder = screen.getByTestId("task-entry-test-id");
    //Assert
    expect(placeholder.hasAttribute("placeholder")).toBe(true);
  });

  test('should contain "Write your new task here !" as placeholder text value', () => {
    //Arrange
    render(<TaskEntry InsertTask={clickSpy} />);
    let taskEntryPlaceholder;
    //Act
    taskEntryPlaceholder = screen.getByTestId("task-entry-test-id");
    //Arrange
    expect(taskEntryPlaceholder.getAttribute("placeholder")).toBe(
      "Write your new task here !"
    );
  });

  test("should contain a task creation button", () => {
    //Arrange
    render(<TaskEntry InsertTask={clickSpy} />);
    //Act
    const button = screen.getAllByTestId("add-task-button-test-id");
    //Assert
    expect(button.length).toBe(1);
  });

  test("should call the prop InsertTask on button click", () => {
    //Arrange
    render(<TaskEntry InsertTask={clickSpy} />);
    //Act
    const button = screen.getByTestId("add-task-button-test-id");
    fireEvent.click(button);
    //Assert
    expect(clickSpy).toBeCalled();
  });
});
