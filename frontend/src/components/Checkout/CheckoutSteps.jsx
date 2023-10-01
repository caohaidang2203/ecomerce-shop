import React from "react";
import styles from "../../styles/styles";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
        <div className={`${styles.noramlFlex}`}>
          <div className={`${styles.cart_button}`}>
            <span className={`${styles.cart_button_text}`}>1.Shipping</span>
          </div>
          <div
            className={`${
              active > 1
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-sky-500"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-sky-200"
            }`}
          />
        </div>

        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${
              active > 1
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-sky-200`
            }`}
          >
            <span
              className={`${
                active > 1
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !bg-sky-200`
              }`}
            >
              2.Payment
            </span>
          </div>
        </div>

        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${
              active > 2
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-sky-500"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-sky-200"
            }`}
          />
          <div
            className={`${
              active > 2
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-sky-200`
            }`}
          >
            <span
              className={`${
                active > 2
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !bg-sky-200`
              }`}
            >
              3.Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
