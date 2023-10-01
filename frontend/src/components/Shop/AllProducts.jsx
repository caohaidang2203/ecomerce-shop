import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";
const AllProducts = () => {
  const { shop } = useSelector((state) => state.shop);
  const { product, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(shop._id));
  }, [dispatch]);
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
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
          <Link to={`/product/${record.id}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
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
  product &&
    product.forEach((item) => {
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

export default AllProducts;
