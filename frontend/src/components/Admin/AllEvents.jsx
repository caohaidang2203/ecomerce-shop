import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye } from "react-icons/ai";
import { getAllEvents } from "../../redux/actions/event";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";

const AllEvents = () => {
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

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
          <Link to={`/product/${record.id}?isEvent=true`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
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
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Events</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <Table columns={columns} dataSource={row} />
        </div>
      </div>
    </div>
  );
};
export default AllEvents;
