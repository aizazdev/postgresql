
import { AddTodo } from "./addTodo"
import { GetTodos } from "./getTodos"

export const TodoList = async () => {

    return (
        <div className="flex bg-slate-100 justify-center items-center w-full h-screen">
            <GetTodos />
            <AddTodo />
        </div>
    )
}