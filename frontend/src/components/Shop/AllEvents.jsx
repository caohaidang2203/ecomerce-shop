import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event";
import { Button, Table } from "antd";
// import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";
const AllEvents = () => {
  const { shop } = useSelector((state) => state.shop);
  const { event, isLoading } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(shop._id));
  }, [dispatch]);
  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    window.location.reload();
  };
  const columns = [
    {
      title: "Product Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Sold out",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "",
      dataIndex: "preview",
      key: "preview",
      render: (_, record) => (
        <>
          {/* <Link to={`/product/${record.id}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link> */}
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <>
          <Button onClick={() => handleDelete(record.id)}>
            <AiOutlineDelete size={20} />
          </Button>
        </>
      ),
    },
  ];
  const row = [];
  event &&
    event.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        stock: item.stock,
        sold: item?.sold_out,
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

export default AllEvents;
