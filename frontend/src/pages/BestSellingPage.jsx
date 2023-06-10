import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/styles";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  //   const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    // const allProductsData = allProducts ? [...allProducts] : []
    const sortedData =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, []);
  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products found!
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingPage;
