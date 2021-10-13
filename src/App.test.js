import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// test("renders <App /> component", () => {
//   render(<App />);
//   const headerElement = screen.getByText(/Todo Application/i);
//   expect(headerElement).toBeInTheDocument();
// });

describe("<App /> component tests ->", () => {
  test("should render a <App /> component and match snapshot", () => {
    let appComponent;
    appComponent = render(<App />);
    expect(appComponent.baseElement).toMatchSnapshot("baseElement");
  });

  //! incomplete test - complete this ASAP
  test("should contain a <TaskEntry /> component", () => {
    let { getByPlaceholderText } = render(<App />);
    expect(
      getByPlaceholderText("Write your new task here !")
    ).toBeInTheDocument();
  });

  test("should contain an unordered list with data-testid=task-list-ul", () => {
    let ul;
    render(<App />);
    ul = screen.getByTestId("task-list-ul");
    expect(ul).toBeInTheDocument();
  });

  test("should contain a list item li with data-testid=task-list-li when a task is entered", () => {
    let li;
    let taskEntryInput;
    let taskEntryButton;
    render(<App />);
    taskEntryInput = screen.getByTestId("task-entry-test-id");
    taskEntryButton = screen.getByTestId("add-task-button-test-id");
    fireEvent.change(taskEntryInput, { target: { value: "Random task" } });
    fireEvent.click(taskEntryButton);
    // let li;
    // render(<App />);
    li = screen.getByTestId("task-list-li");
    expect(li).toBeInTheDocument();
  });

  test("should contain a TaskList component when a task is entered", () => {
    let taskEntryInput;
    let taskEntryButton;
    // let { getByText } = Arender(<App />);
    render(<App />);
    taskEntryInput = screen.getByTestId("task-entry-test-id");
    taskEntryButton = screen.getByTestId("add-task-button-test-id");
    fireEvent.change(taskEntryInput, {
      target: { value: "Random task inside a list" },
    });
    fireEvent.click(taskEntryButton);
    let taskListComponent = screen.getByText("Random task inside a list");
    // let { getByText } = render(<App />);
    expect(taskListComponent).not.toBe(null);
  });

  test("should render 2 list elements when 2 tasks are entered", () => {
    //Arrange
    let taskEntryInput;
    let taskEntryButton;
    let taskUl;
    render(<App />);
    taskEntryInput = screen.getByTestId("task-entry-test-id");
    taskEntryButton = screen.getByTestId("add-task-button-test-id");
    //Act
    fireEvent.change(taskEntryInput, { target: { value: "task one" } });
    fireEvent.click(taskEntryButton);
    fireEvent.change(taskEntryInput, { target: { value: "task two" } });
    fireEvent.click(taskEntryButton);
    taskUl = screen.getByTestId("task-list-ul");
    //Assert
    expect(taskUl.children.length).toBe(2);
  });

  test("should not display a new task when the input field is empty and add task button is clicked", () => {
    let ul;
    let taskEntryInput;
    let taskEntryButton;
    render(<App />);
    taskEntryInput = screen.getByTestId("task-entry-test-id");
    taskEntryButton = screen.getByTestId("add-task-button-test-id");
    fireEvent.change(taskEntryInput, { target: { value: "" } });
    fireEvent.click(taskEntryButton);
    ul = screen.getByText("Your tasks will show up here");
    expect(ul).not.toBe(undefined);
  });

  test('should change task-list-checkbox src to "../task_complete_checkbox.png" after clicking on task', () => {
    //Arrange
    let taskEntryField, taskEntryButton, taskListItem, taskListCheckBox;
    render(<App />);
    //Act
    taskEntryField = screen.getByTestId("task-entry-test-id");
    taskEntryButton = screen.getByTestId("add-task-button-test-id");
    fireEvent.change(taskEntryField, { target: { value: "new task" } });
    fireEvent.click(taskEntryButton);
    taskListItem = screen.getByTestId("task-list-checkbox");
    fireEvent.click(taskListItem);
    taskListCheckBox = screen.getByTestId("task-list-checkbox");
    //Assert
    expect(taskListCheckBox.getAttribute("src")).toBe(
      "../task_complete_checkbox.png"
    );
  });

  test('should change task-list-placeholder css class to "complete-task" after clicking on task', () => {
    //Arrange
    let taskEntryField, taskEntryButton, taskListItem, taskListText;
    render(<App />);
    //Act
    taskEntryField = screen.getByTestId("task-entry-test-id");
    taskEntryButton = screen.getByTestId("add-task-button-test-id");
    fireEvent.change(taskEntryField, { target: { value: "new task" } });
    fireEvent.click(taskEntryButton);
    taskListItem = screen.getByTestId("task-list-checkbox");
    fireEvent.click(taskListItem);
    taskListText = screen.getByTestId("task-list-placeholder");
    //Assert
    expect(taskListText.getAttribute("class")).toBe("complete-task");
  });

  test('should change task-list-checkbox src to "../task_incomplete_checkbox.png"after clicking on task 2 times', () => {
    //Arrange
    let taskEntryField, taskEntryButton, taskListItem, taskListCheckBox;
    render(<App />);
    //Act
    taskEntryField = screen.getByTestId("task-entry-test-id");
    taskEntryButton = screen.getByTestId("add-task-button-test-id");
    fireEvent.change(taskEntryField, { target: { value: "new task" } });
    fireEvent.click(taskEntryButton);
    taskListItem = screen.getByTestId("task-list-checkbox");
    fireEvent.click(taskListItem);
    fireEvent.click(taskListItem);
    taskListCheckBox = screen.getByTestId("task-list-checkbox");
    //Assert
    expect(taskListCheckBox.getAttribute("src")).toBe(
      "../task_incomplete_checkbox.png"
    );
  });

  test('should change task-list-placeholder css class to "incomplete-task" after clicking task 2 times', () => {
    //Arrange
    let taskEntryField, taskEntryButton, taskListItem, taskListText;
    render(<App />);
    //Act
    taskEntryField = screen.getByTestId("task-entry-test-id");
    taskEntryButton = screen.getByTestId("add-task-button-test-id");
    fireEvent.change(taskEntryField, { target: { value: "new task" } });
    fireEvent.click(taskEntryButton);
    taskListItem = screen.getByTestId("task-list-checkbox");
    fireEvent.click(taskListItem);
    fireEvent.click(taskListItem);
    taskListText = screen.getByTestId("task-list-placeholder");
    //Assert
    expect(taskListText.getAttribute("class")).toBe("incomplete-task");
  });
});
