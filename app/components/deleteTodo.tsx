import { NextResponse } from 'next/server';
import { AiFillDelete } from 'react-icons/ai'
import { useRouter } from 'next/navigation';

export const DeleteTodo = ({ id }: number) => {
    const router = useRouter();

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/todos?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Todo deleted successfully');
                // You can navigate or update UI accordingly
            } else {
                console.error('Failed to delete todo');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };
    
    return (
        <button type="submit" className="bg-black text-white p-2 rounded-full h-fit flex-shrink-0 flex-grow-0 mr-2"
        >
            <AiFillDelete onClick={(e) => handleDelete(e)} />
        </button>

    )
}