import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import { RxAvatar } from "react-icons/rx";
const ShopCreate = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("zipCode", zipCode);
    newForm.append("address", address);
    newForm.append("phoneNumber", phoneNumber);

    axios
      .post(`${server}/shop/create-shop`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setZipCode();
        setAddress("");
        setPhoneNumber();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    // <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    //   <div className="sm:mx-auto sm:w-full sm:max-w-md ">
    //     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    //       Register as a shop
    //     </h2>
    //   </div>
    //   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
    //     <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
    //       <form action="" className="space-y-6" onSubmit={handleSubmit}>
    //         <div>
    //           <label
    //             htmlFor="name"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Shop name
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               type="name"
    //               name="name"
    //               required
    //               value={name}
    //               onChange={(e) => setName(e.target.value)}
    //               className="apprearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <label
    //             htmlFor="email"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Shop Email
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               type="email"
    //               name="email"
    //               autoComplete="email"
    //               required
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               className="apprearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="phonenumber"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Phone number
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               type="number"
    //               name="phonenumber"
    //               required
    //               value={phoneNumber}
    //               onChange={(e) => setPhoneNumber(e.target.value)}
    //               className="apprearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="address"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Address
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               type="address"
    //               name="address"
    //               required
    //               value={address}
    //               onChange={(e) => setAddress(e.target.value)}
    //               className="apprearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="zipcode"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Zip Code
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               type="number"
    //               name="zipcode"
    //               required
    //               value={zipCode}
    //               onChange={(e) => setZipCode(e.target.value)}
    //               className="apprearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <label
    //             htmlFor="password"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Password
    //           </label>
    //           <div className="mt-1 relative">
    //             <input
    //               type={visible ? "text" : "password"}
    //               name="password"
    //               autoComplete="current-password"
    //               required
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               className="apprearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //             />
    //             {visible ? (
    //               <AiOutlineEye
    //                 className="absolute right-2 top-2 cursor-pointer"
    //                 size={25}
    //                 onClick={() => setVisible(false)}
    //               />
    //             ) : (
    //               <AiOutlineEyeInvisible
    //                 className="absolute right-2 top-2 cursor-pointer"
    //                 size={25}
    //                 onClick={() => setVisible(true)}
    //               />
    //             )}
    //           </div>
    //         </div>
    //         <div>
    //           <label
    //             htmlFor="avatar"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Avatar
    //           </label>
    //           <div className="mt-2 flex items-center">
    //             <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
    //               {avatar ? (
    //                 <img
    //                   src={URL.createObjectURL(avatar)}
    //                   alt="avatar"
    //                   className="h-full w-full object-cover rounded-full"
    //                 ></img>
    //               ) : (
    //                 <RxAvatar className="h-8 w-8" />
    //               )}
    //             </span>
    //             <label
    //               htmlFor="file-input"
    //               className="ml-5 flex items-center px-4 justify-center py-2 border border-gray-300 rounded-sm shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-blue-500 hover:text-white"
    //             >
    //               <span>Upload file</span>
    //               <input
    //                 type="file"
    //                 name="avatar"
    //                 id="file-input"
    //                 accept=".jpg,.jpeg,.png"
    //                 onClick={handleFileInputChange}
    //                 className="sr-only"
    //               />
    //             </label>
    //           </div>
    //         </div>
    //         <div>
    //           <button
    //             type="submit"
    //             className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
    //           >
    //             Submit
    //           </button>
    //         </div>
    //         <div className={`${styles.noramlFlex} w-full`}>
    //           <h4>Already have an account?</h4>
    //           <Link to="/shop-login" className="text-blue-600 pl-2">
    //             Sign in
    //           </Link>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div class="h-screen flex justify-center ">
      <div
        class="hidden lg:flex w-full lg:w-1/2 bg-[url('https://images.pexels.com/photos/18530730/pexels-photo-18530730/free-photo-of-co-gai-toc-d-trong-b-vay-c-di-n-mau-den-co-chum-nho.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')]
         justify-around items-center "
      >
        <div class="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 class="text-white font-bold text-4xl font-sans">17D Shop App</h1>
          <p class="text-white mt-1">Welcome to my app!!!</p>
          <div class="flex justify-center lg:justify-start mt-6">
            <Link
              to="/"
              class="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
            >
              Go to app
            </Link>
          </div>
        </div>
      </div>
      <div class="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div class="w-full px-8 md:px-32 lg:px-24">
          <form
            class="bg-white rounded-md shadow-2xl p-5"
            onSubmit={handleSubmit}
          >
            <h1 class="text-gray-800 font-bold text-2xl mb-1 text-center">
              Register as a shop
            </h1>
            <p class="text-sm font-normal text-gray-600 mb-8 text-center">
              Please register your shop account!
            </p>
            <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl outline-none ring-blue-500 border-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                id="name"
                class=" pl-2 w-full outline-none border-none "
                type="name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
              />
            </div>
            <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl outline-none ring-blue-500 border-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="email"
                class=" pl-2 w-full outline-none border-none "
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email Address"
              />
            </div>
            <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl outline-none ring-blue-500 border-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <input
                id="phonenumber"
                class=" pl-2 w-full outline-none border-none "
                type="number"
                name="phonenumber"
                autoComplete="email"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder="Shop phonenumber"
              />
            </div>
            <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl outline-none ring-blue-500 border-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
              </svg>
              <input
                id="address"
                class=" pl-2 w-full outline-none border-none "
                type="address"
                name="address"
                autoComplete="email"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Address"
              />
            </div>
            <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl outline-none ring-blue-500 border-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M7 15h0M2 9.5h20" />
              </svg>
              <input
                id="zipcode"
                class=" pl-2 w-full outline-none border-none "
                type="zipcode"
                name="zipcode"
                autoComplete="email"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                placeholder="zipcode"
              />
            </div>
            <div class="flex items-center border-2 mb-4 py-2 px-3 relative rounded-2xl outline-none ring-blue-500 border-blue-300 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                class="pl-2 w-full outline-none border-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-2 cursor-pointer"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-2 cursor-pointer"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
            <div className="mt-2 flex items-center">
              <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    className="h-full w-full object-cover rounded-full"
                  ></img>
                ) : (
                  <RxAvatar className="h-8 w-8" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="ml-5 flex items-center px-4 justify-center py-2 border border-gray-300 rounded-sm shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-indigo-600 hover:text-white"
              >
                <span>Upload file</span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onClick={handleFileInputChange}
                  className="sr-only"
                />
              </label>
            </div>
            <div>
              <button
                type="submit"
                class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                Register
              </button>
            </div>
            <div class="flex items-center w-full">
              <h4>You have had an account?</h4>
              <Link to="/shop-login" class="text-blue-600 pl-2">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
