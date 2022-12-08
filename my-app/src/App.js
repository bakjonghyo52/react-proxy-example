import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoTable from "./components/TodoTable";
import DisplayBoard from "./components/DisplayBoard";
import CreateTodo from "./components/CreateTodo";
import { getAllTodos, createTodo } from "./services/TodoService";
import Footer from "./components/Footer";

function App() {
	const [todoShelf, setTodoShelf] = useState({});
	const [todos, setTodos] = useState([]);
	const [numberOfTodos, setNumberTodos] = useState(0);

	const handleSubmit = () => {
		createTodo(todoShelf).then(() => {
			setNumberTodos(numberOfTodos + 1);
			// setTodos([todoShelf, ...todos]);
		});
	};

	const getAllTodo = () => {
		getAllTodos().then((data) => {
			setTodos(data);
			setNumberTodos(data.length);
		});
	};

	const handleOnChangeForm = (e) => {
		let inputData = todoShelf;
		if (e.target.name === "todo") {
			todoShelf.todo = e.target.value;
		} else if (e.target.name === "category") {
			todoShelf.category = e.target.value;
		} else if (e.target.name === "isComplete") {
			todoShelf.isComplete = e.target.value;
		}
		setTodoShelf(inputData);
	};

	return (
		<div className="main-wrapper">
			<div className="main">
				<Header />
				<CreateTodo
					TodoShelf={todoShelf}
					onChangeForm={handleOnChangeForm}
					handleSubmit={handleSubmit}
				/>
				<DisplayBoard numberOfTodos={numberOfTodos} getAllTodo={getAllTodo} />
				<TodoTable todos={todos} />
				<Footer />
			</div>
		</div>
	);
}

export default App;
