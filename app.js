/** @jsx createElement */

class TodoApp extends Component {
    constructor(props) {
        super(props);
        let todos = JSON.parse(localStorage.getItem("todos")) || [];

        todos = todos.map((todo) => {
            if (!todo.id) {
                return {
                    ...todo,
                    id: `${Date.now()}-${Math.random()
                        .toString(36)
                        .substr(2, 9)}`,
                };
            }
            return todo;
        });

        localStorage.setItem("todos", JSON.stringify(todos));

        this.state = { todos, input: "", filter: "all", counter: todos.length };
    }

    addTodo() {
        const newTodo = this.state.input.trim();
        if (newTodo) {
            const id = `${Date.now().toString()}-${Math.random()
                .toString(36)
                .substr(2, 9)}`;
            const todos = [
                ...this.state.todos,
                {
                    id: id,
                    text: newTodo,
                    completed: false,
                },
            ];
            localStorage.setItem("todos", JSON.stringify(todos));
            this.setState({
                todos,
                input: "",
                counter: this.state.counter + 1,
            });
        }
    }

    toggleTodo(id) {
        console.log("id", id);
        const todos = this.state.todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        localStorage.setItem("todos", JSON.stringify(todos));
        this.setState({ todos });
    }

    removeTodo(id) {
        const todos = this.state.todos.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(todos));
        this.setState({ todos });
    }

    handleInputChange(e) {
        this.setState({ input: e.target.value });
    }

    setFilter(filter) {
        this.setState({ filter });
    }

    render() {
        const filteredTodos = this.state.todos.filter((todo) => {
            if (this.state.filter === "all") return true;
            if (this.state.filter === "todo") return !todo.completed;
            if (this.state.filter === "done") return todo.completed;
            return true;
        });

        console.log("state", this.state.filter == "todo");

        console.log("filteredTodos", filteredTodos);

        return (
            <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Ma TodoList
                </h1>
                <div className="flex mb-4">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex w-full"
                    >
                        <input
                            type="text"
                            value={this.state.input}
                            onInput={(e) => this.handleInputChange(e)}
                            className="flex-grow p-2 border border-gray-300 rounded-l"
                            placeholder="Ajouter une tâche..."
                        />
                        <button
                            onClick={() => this.addTodo()}
                            className="bg-blue-500 text-white px-4 py-2 rounded-r"
                        >
                            Ajouter
                        </button>
                    </form>
                </div>
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => this.setFilter("all")}
                        className={`mx-2 px-4 py-2 rounded ${
                            this.state.filter === "all"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                        }`}
                    >
                        Tous
                    </button>
                    <button
                        onClick={() => this.setFilter("todo")}
                        className={`mx-2 px-4 py-2 rounded ${
                            this.state.filter === "todo"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                        }`}
                    >
                        À faire
                    </button>
                    <button
                        onClick={() => this.setFilter("done")}
                        className={`mx-2 px-4 py-2 rounded ${
                            this.state.filter === "done"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                        }`}
                    >
                        Terminées
                    </button>
                </div>
                <ul>
                    {filteredTodos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`flex justify-between items-center p-2 mb-2 rounded ${
                                todo.completed
                                    ? "bg-green-100 line-through"
                                    : "bg-gray-100"
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => this.toggleTodo(todo.id)}
                                className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                            />
                            <span
                                onClick={() => this.toggleTodo(todo.id)}
                                className="cursor-pointer flex-grow"
                            >
                                {todo.text}
                            </span>
                            <button
                                onClick={() => this.removeTodo(todo.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Supprimer
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const app = new TodoApp();
const root = document.getElementById("app");
render(app, root);
