import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";

const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.screenY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            {/* Logo */}
            <Link>
              <img
                src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark.svg"
                alt=""
              />
            </Link>
            {/* search box */}
          </div>
          <div className="w-[30%] relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 hover:border-[#3957db] border-[#f1f2f6] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;

                    const Product_name = d.replace(/\s+/g, "-");

                    return (
                      <Link to={`/product/${Product_name}`}>
                        <div className="w-full flex items-start=py-3">
                          <img
                            src={i.image_Url[0].url}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                        </div>
                        <h1>{i.name}</h1>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button}`}>
            <Link to="/seller">
              <h1 className="text-[#fff] flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#FFBB38]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* category */}
          <div>
            <div className="relative h-[53px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={20} className="absolute top-3 left-2 mt-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-[600] select-none rounded-t-md`}
              >
                All categories
              </button>
              <IoIosArrowDown
                size={18}
                className="absolute right-2 top-4 cursor-pointer mt-1 hover:text-blue-700"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>

          {/* mavitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          {/*  */}
          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart size={27} />
                <span className="absolute right-0 top-0 rounded-full bg-[#4540e4] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart size={27} />
                <span className="absolute right-0 top-0 rounded-full bg-[#4540e4] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <Link to="/login">
                  <CgProfile size={27} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
