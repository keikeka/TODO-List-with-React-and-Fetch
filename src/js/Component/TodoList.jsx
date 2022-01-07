import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Items from "./Items.jsx";
import Todolistimage from "../../img/Todolistimage.jpg";

//Function to handle the error through an object domain
function ErrorItem(ctrl, message = null) {
	this.ctrl = ctrl;
	this.message = message;
}

//Component
const TodoList = props => {
	//Hooks
	const [inputItem, setinputItem] = useState("");
	const [list, setList] = useState([]);
	const [error, setError] = useState(new ErrorItem(false));

	//Methods
	//Function to check and add task
	const validateTask = () => {
		let newObject = {
			label: inputItem,
			done: false
		};
		let newList = list.concat([newObject]);
		setList(newList);
	};

	//Function to delete task
	const deleteTask = item => {
		let deleteItem = [...list];
		deleteItem.splice(item, 1);
		setList(deleteItem);
	};

	//Hook with Fetch to obtain API data
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/keikeka", {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		})
			.then(response => response.json())
			.then(list => {
				setList(list);
			})
			.catch(err => setError(new ErrorItem(true, String(err))));
	}, []);

	//Hook with Fetch to send the data to the API
	useEffect(() => {
		if (list.length > 0) {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/keikeka", {
				method: "PUT",
				body: JSON.stringify(list),
				headers: {
					"Content-Type": "application/json"
				}
			}).catch(error => console.error(error));
		}
	}, [list]);

	return (
		<>
			<div className="container ">
				<div className="shadow-lg p-3 mb-5 bg-body rounded">
					<img
						src={Todolistimage}
						className="rounded mx-auto d-block "
						alt="task list cover picture"
					/>
					<h1 className="text-center text-danger">
						My christmas to-do list
					</h1>
					<button
						onClick={deleteTask}
						className="btn btn-dark float-end mx-2 p-2"
						type="button"
						role="button">
						Delete Task
					</button>
					<button
						onClick={validateTask}
						className="btn btn-success float-end mx-2 p-2"
						type="button"
						role="button">
						Add Task
					</button>
					<input
						className="form-control"
						type="text"
						placeholder={props.placeholder}
						onChange={e => setinputItem(e.target.value)}
						value={inputItem}
					/>
					{error.ctrl ? (
						<h1>{error.message}</h1>
					) : (
						<ul>
							{list.map((value, i) => (
								<Items key={i} name={value.label} />
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	);
};

TodoList.propTypes = {
	placeholder: PropTypes.string
};

export default TodoList;
