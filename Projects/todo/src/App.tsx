import { Route, Routes } from "react-router-dom"
import AddTodo from "./Components/AddTodo"
import AllTodos from "./Components/AllTodos"
import Navbar from "./Components/Navbar"

function App() {
  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center flex-col " >
      <div className="w-[50%] flex justify-center items-center text-center  " >
        <h1 className="text-[16px] md:text-2xl lg:text-5xl font-bold text-white tracking-[15px] border-0 border-b-3 border-b-green-500 rounded-2xl w-full py-3 md:py-5 lg:py-6 " >TODO</h1>
      </div>
      <Navbar/>
      <div className="w-[50%] " >
        <Routes>
          <Route path="/addTodo" element={<AddTodo/>}/>
          <Route path="/allTodo" element={<AllTodos/>}/>
        </Routes>
        <AllTodos/>
      </div>
    </div>
  )
}

export default App