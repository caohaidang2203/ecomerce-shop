import React from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
const WishList = ({ setOpenWishList }) => {
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
              onClick={() => setOpenWishList(false)}
            />
          </div>

          {/* item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={20} />
            <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
          </div>

          {/* cart Single Items */}
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <RxCross1 className="cursor-pointer" />
        </div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVDqkgsb17wfrkHypeI-9IRjxby0FrlZZD0A&usqp=CAU"
          alt=""
          className="w-[70px] h-[70px] ml-2 "
        />
        <div className="pl-[5px] min-w-[60%]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] text-[#d02222] pt-[3px] font-Roboto">
            ${data.price}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            title="Add to cart"
            className="cursor-pointer ml-2"
          />
        </div>
      </div>
    </div>
  );
};
export default WishList;
