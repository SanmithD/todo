import { useSearchParams } from "react-router-dom";
import { useTodos } from "../Store/Todos";

function AllTodos() {
  const { todos, toggleTaskCheck, handleDelete } = useTodos();
  const [searchParams] = useSearchParams();

  let filteredData = todos;
  let todosData = searchParams.get("todos");

  if (todosData === "active") {
    filteredData = filteredData.filter((task) => !task.completed);
  }
  if (todosData === "completed") {
    filteredData = filteredData.filter((task) => task.completed);
  }

  return (
    <div className="w-full mt-5 h-[70%] overflow-scroll overflow-x-hidden ">
      <ul className="flex flex-col gap-3 md:gap-[20px] lg:gap-[30px] ">
        {filteredData.map((data) => (
          <li
            key={data.id}
            className="border-b-3 border-b-green-400 py-4 rounded-2xl flex items-center justify-between bg-gray-500 px-4 "
          >
            <label
              htmlFor={`todo-${data.id}`}
              className="text-[16px] md:text-2xl lg:text-3xl "
            >
              {data.task}{" "}
            </label>
            <input
              type="checkbox"
              id={`todo-${data.id}`}
              checked={data.completed}
              className="h-6 w-6"
              onChange={() => toggleTaskCheck(data.id)}
            />

            {data.completed && (
              <button
                type="button"
                onClick={() => handleDelete(data.id)}
                className="bg-red-600 text-[16px] md:text-2xl lg:text-3xl cursor-pointer text-white px-2 "
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTodos;
