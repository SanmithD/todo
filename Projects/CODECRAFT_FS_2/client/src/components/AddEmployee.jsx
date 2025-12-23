import { UseAuthStore } from "../store/UseAuthStore";
import Create from "./Create";

function AddEmployee() {
    const { logout } = UseAuthStore();
  return (
    <div className="flex gap-2" >
      <div>
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add New
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="modal-action">
              <form method="dialog">
                <button className="btn border">Close</button>
              </form>
            </div>
            <div className="-mt-13">
              <Create />
            </div>
          </div>
        </dialog>
      </div>
      <div>
        <button
          className="btn bg-green-500 "
          onClick={() => document.getElementById("my_modal_4").showModal()}
        >
          Logout
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Are sure want to logout!</h3>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn bg-green-500" onClick={()=>logout()} >Logout</button>
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default AddEmployee;
