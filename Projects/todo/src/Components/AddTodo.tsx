import { useState, type FormEvent } from "react";
import { useTodos } from "../Store/Todos";

function AddTodo() {
  const [todo, setTodo] = useState("");
  const { handleAddTodo } = useTodos();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTodo(todo);
    setTodo("");
  };

  return (
    <div className="w-full h-fit mt-4 bg-green-600 ">
      <form onSubmit={handleSubmit} className="flex w-full gap-5 ">
        <input
          type="text"
          name="task"
          value={todo}
          className="outline-0 w-[100%] bg-gray-100 h-[40px] text-[16px] px-2 "
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="text-[16px] md:text-2xl lg:text-3xl font-bold cursor-pointer text-white px-3 bg-green-600 " >ADD</button>
      </form>
    </div>
  );
}

export default AddTodo;
