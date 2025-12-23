import { useEffect } from "react";
import { UseEmployeeStore } from "../store/UseEmployeeStore";
import Controllers from "./Controllers";
import Loader from "./Loader";

function Details() {
  const { getAllDetails, allDetails, isLoading } = UseEmployeeStore();

  useEffect(() => {
    getAllDetails();
  }, []);

  if (isLoading) return <Loader />;

  if (!Array.isArray(allDetails) || allDetails.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg font-medium">
          No Employee details inserted
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 mb-6">
      <div className="shadow-xl rounded-2xl bg-base-100 overflow-hidden">
        <div className="h-[90%] md:max-h-[490px] overflow-y-auto">
          <table className="table table-zebra w-full">
            <thead className="sticky top-0 bg-base-200 z-10">
              <tr className="text-base font-semibold text-gray-700 text-center">
                <th>#</th>
                <th>Name</th>
                <th>Birthday</th>
                <th>Department</th>
                <th>Location</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Joined</th>
                <th className="text-center">Controls</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {allDetails.map((data, index) => (
                <tr key={data._id} className="hover:bg-base-200 transition">
                  <th>{index + 1}</th>
                  <td className="font-medium">{data?.employeeName}</td>
                  <td>{new Date(data?.employeeBirthday).toLocaleDateString()}</td>
                  <td>{data?.employeeDepartment}</td>
                  <td>{data?.employeeLocation}</td>
                  <td className="whitespace-nowrap">{data?.employeePhone}</td>
                  <td className="whitespace-nowrap">{data?.employeeEmail}</td>
                  <td>{new Date(data?.createdAt).toLocaleDateString()}</td>
                  <td className="text-center">
                    <Controllers data={data} id={data?._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Details;
