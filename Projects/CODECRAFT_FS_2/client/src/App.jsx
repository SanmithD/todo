import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

const Signup = lazy(() => import('./pages/Signup') );
const Login = lazy(() => import('./pages/Login') );
const Home = lazy(() => import('./pages/Home') );

function App() {
  return (
    <div className="bg-[#020202]" >
      <Toaster position="top-left" />
      <Suspense fallback={<Loader/>} >
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/> </ProtectedRoute>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/> }/>
      </Routes>
      </Suspense>
    </div>
  )
}

export default App