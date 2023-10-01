import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Layout/Loader";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/styles";
import ProductCard from "../components/Route/ProductCard/ProductCard";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { product, isLoading } = useSelector((state) => state.product);
  useEffect(() => {
    //  const d = allProducts && allProducts.sort((a,b) => b.sold_out - a.sold_out); we will add it after complete order route
    const d = product;
    setData(d);
  }, [product]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products found!
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
