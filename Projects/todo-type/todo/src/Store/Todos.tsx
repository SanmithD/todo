import { createContext, useContext, useState, type ReactNode } from 'react';

export type TodosProviderPros = {
    children : ReactNode;
}

export type MyTodo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodoValuePros = {
    todos: MyTodo[];
    handleAddTodo : (task:string) => void;
    toggleTaskCheck: (id:string) =>void;
    handleDelete: (id:string) => void;
}

export const todoTask = createContext<TodoValuePros | null >(null);

export const TodosProvider = ({children}: TodosProviderPros) =>{

    const [todos, setTodos] = useState<MyTodo[]> (()=>{
        try {
            const newTodos = localStorage.getItem("todos") || "[]" ;
            return JSON.parse(newTodos) as MyTodo[] ;
        } catch (error) {
            return []
        }
    });

    const handleAddTodo = (task:string) =>{
        setTodos((prev)=>{
            const newTodos:MyTodo[] = [
                {
                    id: Math.random().toString(),
                    task:task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            localStorage.setItem('todos',JSON.stringify(newTodos));
            return newTodos;
        });
    }

    const toggleTaskCheck = (id:string) =>{
        setTodos((prev)=>{
            const newTodos = prev.map((todo)=>{
                if(todo.id === id){
                    return {...todo, completed: !todo.completed}
                }
                return todo;
            });
            localStorage.setItem('todos',JSON.stringify(newTodos));
            return newTodos
        })
    }

    const handleDelete = (id:string) =>{
        setTodos((prev)=>{
            const newTodos = prev.filter((filterTodo)=>filterTodo.id !== id);
            localStorage.setItem('todos',JSON.stringify(newTodos));
            return newTodos;
        });
    }

    return <todoTask.Provider value={{todos, handleAddTodo, toggleTaskCheck, handleDelete}} >
        {children}
    </todoTask.Provider>
}

export const useTodos = () =>{
    const todoConsumer = useContext(todoTask);
    if(!todoConsumer){
        throw new Error ("useTodos used outside of Provider")
    }
    return todoConsumer;
}
