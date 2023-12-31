import { useEffect, useState } from "react";
import serviceimg from "../../assets/images/checkout/checkout.png";
import { BsArrowReturnLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
const CartDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const url = `/cartDetails?email=${user?.email}`;
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    axiosSecure.get(url).then((res) => {
      setCarts(res.data);
    });
  }, [url, axiosSecure]);
  const handleStatusUpdate = (id) => {
    const updatedStatus = { status: "Approved" };
    axiosSecure.patch(`/cartDetails/${id}`, updatedStatus).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("Update Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const remening = carts.filter((data) => data._id !== id);
        const newStatus = carts.find((data) => data._id === id);
        newStatus.status = "Approved";
        const updatedStatus = [newStatus, ...remening];
        setCarts(updatedStatus);
      }
    });
  };
  const handleCartDelete = (id) => {
    axiosSecure.delete(`/cartDetails/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast.success("Delete Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const remening = carts.filter((data) => data._id !== id);
        setCarts(remening);
      }
    });
  };
  return (
    <div>
      <div className="relative">
        <div className="w-full h-80 ">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={serviceimg}
            alt="service img"
          />
        </div>
        <div className="absolute px-28 flex items-center  top-0 left-0 w-full h-full bg-gradient-to-r from-car-black to-[rgba(21, 21, 21, 0.00) 100%)] rounded-xl">
          <h2 className="text-5xl font-bold text-white">Cart Details</h2>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-car-primary rounded-tl-xl rounded-tr-xl">
          <h3 className="font-medium text-xl text-white py-4 px-12">
            Home - Product Details
          </h3>
        </div>
      </div>
      <div className="py-32">
        <div className="overflow-x-auto">
          <table className="table">
            <tbody>
              {carts.map((cart) => (
                <tr key={cart._id}>
                  <th>
                    <button
                      onClick={() => handleCartDelete(cart._id)}
                      className="btn btn-circle"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </th>
                  <td>
                    <div className="w-36  h-36">
                      <img
                        className="w-full h-full object-cover rounded-xl"
                        src={cart.img}
                        alt="cart image"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="text-car-gray space-y-2">
                      <h2 className="text-xl font-semibold text-car-black">
                        {cart.title}
                      </h2>
                      <h3>Color: Green</h3>
                      <h3>Size: S</h3>
                    </div>
                  </td>
                  <td>
                    <h3 className="text-xl font-semibold text-car-black">
                      ${cart.price}
                    </h3>
                  </td>
                  <td>
                    <h3 className="text-xl font-semibold text-car-black">
                      {cart.date}
                    </h3>
                  </td>
                  <th>
                    <div className="flex justify-end w-full">
                      {cart.status === "Pending" ? (
                        <button
                          onClick={() => handleStatusUpdate(cart._id)}
                          className="text-lg font-semibold py-4 px-7 border border-car-primary rounded-md bg-car-primary hover:bg-car-black text-white duration-300"
                        >
                          {cart.status}
                        </button>
                      ) : cart.status === "Approved" ? (
                        <button
                          onClick={() => handleStatusUpdate(cart._id)}
                          className="text-lg font-semibold py-4 px-7 border border-green-600  rounded-md bg-green-600 hover:bg-car-black text-white duration-300"
                        >
                          {cart.status}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-12">
          <Link
            className="flex items-center text-car-gray duration-300 hover:text-car-primary"
            to="/"
          >
            <BsArrowReturnLeft className="text-xl mr-4" />
            <span className="text-xl ">Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
