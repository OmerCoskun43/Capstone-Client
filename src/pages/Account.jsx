import { useState } from "react";
import { useSelector } from "react-redux";
import EditModal from "../components/EditModal";
import useAuthCalls from "../services/useAuthCalls";
const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const { deleteProfile } = useAuthCalls();

  const handleEdit = () => {
    setShowModal(!showModal);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      deleteProfile(id);
    } else {
      console.log("Hesabı silmediniz");
    }
  };
  return (
    <div className="p-5 bg-white w-[94%] md:w-[60%] rounded-lg mx-auto mt-5 shadow-2xl">
      <h1 className="text-xl md:text-3xl text-center text-red-600 font-bold">
        Account
      </h1>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="md:w-[50%] mx-auto mt-2 flex gap-4 flex-col ">
          <div className="flex justify-start gap-5 items-center  ">
            <span className="text-blue-600 font-bold border-b-2 border-red-500 w-[30%] md:w-[50%] ">
              {" "}
              Full Name:
            </span>
            <span className="font-bold shadow-xl px-2 rounded-lg w-[50%]">
              {" "}
              {user?.firstName[0].toUpperCase() +
                user?.firstName.slice(1) +
                " " +
                user?.lastName[0].toUpperCase() +
                user?.lastName.slice(1)}{" "}
            </span>
          </div>
          <div className="flex justify-start gap-5  items-center  ">
            <span className="text-blue-600 font-bold w-[30%] md:w-[50%]  border-b-2 border-red-500">
              {" "}
              Username:
            </span>
            <span className="font-bold shadow-xl px-2 rounded-lg  w-[50%]">
              {user?.username[0].toUpperCase() + user?.username.slice(1)}
            </span>
          </div>
          <div className="flex justify-start gap-5 items-center  ">
            <span className="text-blue-600 font-bold w-[30%] md:w-[50%]    border-b-2 border-red-500">
              {" "}
              User ID:
            </span>
            <span className="font-bold shadow-xl px-2 rounded-lg w-[50%] ">
              {user?._id}
            </span>
          </div>
          <div className="flex justify-start gap-5 items-center  ">
            <span className="text-blue-600 font-bold w-[30%] md:w-[50%]  border-b-2 border-red-500">
              {" "}
              Password:
            </span>
            <span className="font-bold shadow-xl px-2 rounded-lg w-[50%] ">
              {user?.password.slice(0, 8) + "******"}
            </span>
          </div>
          <div className="flex justify-start gap-5 items-center  ">
            <span className="text-blue-600 font-bold w-[30%] md:w-[50%] ]  border-b-2 border-red-500">
              {" "}
              İs Admin :
            </span>
            <span className="font-bold shadow-xl px-2 rounded-lg w-[50%] ">
              {user?.isAdmin ? "Yes" : "No"}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between  gap-3 items-center">
            <button
              onClick={() => handleEdit(user)}
              className="bg-green-500 p-2 rounded-lg w-[50%] text-white font-bold hover:bg-green-700"
            >
              Edit Account
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              className="bg-red-500 p-2 rounded-lg  w-[50%]  text-white font-bold hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-vector/abstract-illustration-error-404-page-found_114360-798.jpg?w=2000"
            alt="vector"
          />
        </div>
      </div>

      {showModal && (
        <EditModal
          showModal={showModal}
          setShowModal={setShowModal}
          user={user}
        />
      )}
    </div>
  );
};

export default Account;
