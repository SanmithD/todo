import { Edit2, Trash2 } from "lucide-react";
import { UseEmployeeStore } from "../store/UseEmployeeStore";
import Edit from "./Edit";

function Controllers({ data, id }) {
  const { deleteDetail } = UseEmployeeStore();
  return (
    <div>
      <button
        className="btn bg-blue-500"
        onClick={() => document.getElementById(`edit_${id}`).showModal()}
      >
        <Edit2 />
      </button>

      <dialog id={`edit_${id}`} className="modal">
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
          <div className="-mt-13">
            <Edit id={id} data={data} />
          </div>
        </div>
      </dialog>

      <button
        className="btn bg-red-500"
        onClick={() => document.getElementById(`delete_${id}`).showModal()}
      >
        <Trash2 />
      </button>

      <dialog id={`delete_${id}`} className="modal">
        <div className="modal-box">
          <p className="text-[20px]">Are you sure you want to delete?</p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn bg-red-500"
                onClick={() => deleteDetail(id)}
              >
                Confirm
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Controllers;
