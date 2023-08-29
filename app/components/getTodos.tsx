'use client'
import { useRouter } from "next/navigation";
import { Todo } from "../lib/drizzle";
import { DeleteTodo } from "./deleteTodo";

const getData = async () => {
    const { refresh } = useRouter();
    const response = await fetch('http://localhost:3000/api/todos/', { next: { revalidate: 0 } });
    
    if(!response.ok) {
        throw new Error('Failed to fetch data')
    }
    
    return response.json();

}

export const GetTodos = async () => {
    const data: Todo[] = await getData();

    return (
        <div className="flex flex-col items-center w-1/2 h-3/4 overflow-scroll">
            {
                data.map((d: Todo, ind: number) => {
                    return (
                        <div className="flex justify-between items-center h-24 bg-blue-400 text-white rounded-lg  w-2/3 my-1 gap-5" key={ind}>
                            <div className=" bg-black text-white px-2 rounded-full h-fit flex-shrink-0 flex-grow-0 ml-3">
                                {d.id}
                            </div>
                            <div>{d.title}</div>
                            <div>{d.description}</div>
                            <DeleteTodo id={d.id}/>
                        </div>

                    )
                })
            }
        </div>

    )
}