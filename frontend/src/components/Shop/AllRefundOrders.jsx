import { Button, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";

const AllRefundOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { shop } = useSelector((state) => state.shop);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(shop._id));
  }, [dispatch]);

  const refundOrders =
    orders &&
    orders.filter(
      (item) =>
        item.status === "Processing refund" || item.status === "Refund Success"
    );

  const columns = [
    {
      title: "Order Id",
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
          <Link to={`/order/${record.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        </>
      ),
    },
  ];

  const row = [];

  refundOrders &&
    refundOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <Table columns={columns} dataSource={row} />
        </div>
      )}
    </>
  );
};

export default AllRefundOrders;
