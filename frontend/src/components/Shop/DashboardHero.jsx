import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiFillMoneyCollect,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button, Table } from "antd";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { shop } = useSelector((state) => state.shop);
  const { product } = useSelector((state) => state.product);
  const [deliveredOrder, setDeliveredOrder] = useState(orders && orders);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(shop._id));
    dispatch(getAllProductsShop(shop._id));

    const orderData =
      orders && orders.filter((item) => item.status === "Delivered");
    setDeliveredOrder(orderData);
  }, [dispatch]);

  const totalEarningWithoutTax = deliveredOrder
    ? deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0)
    : 0;

  const serviceCharge = totalEarningWithoutTax
    ? totalEarningWithoutTax * 0.1
    : 0;
  const availableBalance =
    (totalEarningWithoutTax - serviceCharge).toFixed(2) || 0;

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Items Qty",
      dataIndex: "itemsQty",
      key: "itemsQty",
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (_, record) => (
        <>
          <Link to={`/dashboard/order/${record.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        </>
      ),
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white border-2 border-sky-500 rounded px-2 py-5">
          <div className="flex items-center">
            <AiFillMoneyCollect size={30} className="mr-2" fill="#000" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#000]`}
            >
              Account Balance (with 10% service charge)
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ${availableBalance}
          </h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white border-2 border-sky-500 rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineUnorderedList size={30} className="mr-2" fill="#000" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#000]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {orders && orders.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white border-2 border-sky-500 rounded px-2 py-5">
          <div className="flex items-center">
            <FaProductHunt size={24} className="mr-2" fill="#000" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#000]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {product && product.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <Table columns={columns} dataSource={row} />
      </div>
    </div>
  );
};

export default DashboardHero;
