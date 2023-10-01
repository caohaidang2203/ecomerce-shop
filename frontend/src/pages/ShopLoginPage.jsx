import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopLogin from "../components/Shop/ShopLogin";

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isShop, isLoading } = useSelector((state) => state.shop);
  useEffect(() => {
    if (isShop === true) {
      navigate(`/dashboard`);
    }
  }, [isLoading, isShop]);

  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
