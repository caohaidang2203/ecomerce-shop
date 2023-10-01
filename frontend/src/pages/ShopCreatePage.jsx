import React, { useEffect } from "react";
import ShopCreate from "../components/Shop/ShopCreate.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { isShop, shop } = useSelector((state) => state.shop);

  useEffect(() => {
    if (isShop === true) {
      navigate(`/shop/${shop._id}`);
    }
  }, []);
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
