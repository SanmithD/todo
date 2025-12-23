import { useState } from "react";
import toast from "react-hot-toast";
import { UseEmployeeStore } from "../store/UseEmployeeStore";

function Create() {
  const { createEmployee, isLoading } = UseEmployeeStore();
  const [details, setDetails] = useState({
    employeeName: "",
    employeeEmail: "",
    employeePhone: "",
    employeeDepartment: "",
    employeeLocation: "",
    employeeBirthday: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createEmployee(details);
    if(success === false){
      toast.error("Employee email already exists")
    }
    setDetails({
      employeeName: "",
      employeeEmail: "",
      employeePhone: "",
      employeeDepartment: "",
      employeeLocation: "",
      employeeBirthday: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen my-0 ">
      <div className="shadow-lg p-6 w-full max-w-lg border rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Employee</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="employeeName"
            placeholder="Full Name"
            value={details.employeeName}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />

          <input
            type="email"
            name="employeeEmail"
            placeholder="Email"
            value={details.employeeEmail}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />

          <input
            type="tel"
            name="employeePhone"
            placeholder="Phone Number"
            value={details.employeePhone}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            name="employeeDepartment"
            placeholder="Department"
            value={details.employeeDepartment}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            name="employeeLocation"
            placeholder="Location"
            value={details.employeeLocation}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          <label className="block text-sm font-medium">Birthday</label>
          <input
            type="date"
            name="employeeBirthday"
            value={details.employeeBirthday}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? "Creating..." : "Create Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
