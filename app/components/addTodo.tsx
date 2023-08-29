'use client'

import { useState } from "react";
import { Todo } from '../lib/drizzle';
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

export const AddTodo = () => {
    const [inputs, setInputs] = useState<Todo | null>({});
    
    
    const {refresh} = useRouter();
    console.log(inputs);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);

        try {
            const response = await fetch('http://localhost:3000/api/todos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs)
            });


            if (!response.ok) {
                throw new Error('Failed to post data');
            }

            const result = await response.json();
            return NextResponse.json({message: 'data has been added'});
            
        } catch (error) {
            console.error('Error posting data:', error);
            return null;
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-1/2 h-3/4">
            <h1 className="text-2xl text-slate font-bold">Add Todos</h1>
            <input type='text' className="h-12 rounded-full outline-sky-600 border-2 border-sky-600 px-2 text-sky-600 mt-2"
                onChange={(e) => { setInputs({ ...inputs, title: e.target.value }) }}
            />
            <input type='text' className="h-12 rounded-full outline-sky-600 border-2 border-sky-600 px-2 text-sky-600 mt-2"
                onChange={(e) => { setInputs({ ...inputs, description: e.target.value }) }}
            />
            <input type='checkbox' className="flex justify-start h-12 rounded-full outline-sky-600 border-2 border-sky-600 px-2 text-sky-600 mt-2"
                value="todo"
                onChange={(e) => { setInputs({ ...inputs, status: (e.target.value) ? true : false }) }}
            />
            <button className="h-12 rounded-full outline-sky-600 border-2 border-sky-600 px-2 text-white bg-sky-600 hover:bg-white hover:text-sky-600 mt-2 w-fll"
                onClick={(e) => { handleSubmit(e) }}
            >
                Add Todo
            </button>
        </div>
    )
}