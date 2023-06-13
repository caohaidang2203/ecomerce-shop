import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiMinus } from "react-icons/hi";
import { Link } from "react-router-dom";
const Cart = ({ setOpenCart }) => {
  const cartData = [
    {
      name: "Dior T-Shirt",
      description: "T-shirt",
      price: 111,
    },
    {
      name: "Dior T-Shirt",
      description: "T-shirt",
      price: 111,
    },
    {
      name: "Dior T-Shirt",
      description: "T-shirt",
      price: 111,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>

          {/* item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={20} />
            <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
          </div>

          {/* cart Single Items */}
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>

        <div className="px-5 mb-3">
          <Link to="/checkout">
            <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]">
              <h1 className="text-[#fff] text-[18px] font-[600]">
                Checkout Now (USD${1000})
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#7d1616] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className={`bg-[#a7abb14f] border border-[#9f9d9d] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiMinus size={18} color="#000" />
          </div>
        </div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVDqkgsb17wfrkHypeI-9IRjxby0FrlZZD0A&usqp=CAU"
          alt=""
          className="w-[70px] h-[70px] ml-2 "
        />
        <div className="pl-[5px] min-w-[60%]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[#00000082] text-[15px]">
            ${data.price} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] text-[#d02222] pt-[3px] font-Roboto">
            ${totalPrice}
          </h4>
        </div>
        <RxCross1 className="cursor-pointer" />
      </div>
    </div>
  );
};
export default Cart;
