import React, { useState, useEffect } from "react";
import Banner from "../assets/banner.jpg";
import axios from "axios";
import { CartPopup } from "../components/CartPopup";

const MenuList = ({ menu, cart, setCart, setToggleCartPopup }) => (
  <div className="flex mb-4">
    <img src={menu.image} className="object-cover w-20 h-20 rounded-lg" />
    <div className="ml-2 flex-auto">
      {menu.name}
      <p className="text-red-500 text-sm">฿{menu.price}</p>
    </div>
    <div className="ml-2 ">
      <button
        onClick={() => {
          setCart(updateCart({ sign: 1, cart, id: menu.id, name: menu.name, price: menu.price }));
          setToggleCartPopup(true);
        }}
        className="button bg-red-200 active:bg-red-400 px-4 py-2 rounded-lg ml-2"
      >
        เพิ่ม
      </button>
    </div>
  </div>
);

const MenuSection = ({
  category,
  menus,
  cart,
  setCart,
  setToggleCartPopup,
}) => (
  <div>
    <h4 className="mt-4 mb-2 font-bold">{category}</h4>
    {menus
      .filter((menu) => menu.category === category)
      .map((menu) => (
        <MenuList
          menu={menu}
          cart={cart}
          setCart={setCart}
          setToggleCartPopup={setToggleCartPopup}
        />
      ))}
  </div>
);

const updateCart = ({ sign, cart, id, name, price }) => {
  // if (cart.some((item) => item.id === id)) {
  //   return cart.reduce((arr, c) => {
  //     if (c.id === id) {
  //       arr.push({
  //         id,
  //         quantity: sign + c.quantity,
  //         name,
  //         price,
  //         totalPrice: (sign + c.quantity) * price
  //       });
  //     } else {
  //       arr.push(c);
  //     }
  //     return arr;
  //   }, []);
  // } else {
  //   return [
  //     ...cart,
  //     {
  //       id,
  //       quantity: 1,
  //       name,
  //       price,
  //       totalPrice: price
  //     },
  //   ];
  // }

  const index = cart.findIndex((r) => r.id === id);
  if (index !== -1) {
    const newCart = [...cart];
    newCart[index].quantity += sign;
    return newCart.filter((r) => r.quantity > 0);
  } else {
    return [
      ...cart,
      {
        id,
        quantity: 1,
        name,
        price,
        totalPrice: price,
      },
    ];
  }

};

export const Home = () => {
  const getMenuUrl = process.env.REACT_APP_API_URL + "/get-menus";
  const foodCategories = ["แนะนำ", "ต้ม", "ผัด", "แกง", "ทอด"];
  const [foodMenus, setFoodMenus] = useState([]);
  const [toggleCartPopup, setToggleCartPopup] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const result = await axios.post(getMenuUrl);
      setFoodMenus(result.data);
    };

    fetchMenus();
  }, []);

  return (
    <div>
      <div className="px-4">
        <h1 className="text-3xl text-center mt-4">ร้านอาหารครัวคุณบิน</h1>
        <p className="mt-2">
          ร้านอาหารครัวคุณบินปรุงด้วยใจ เหมือนทำให้คนในครอบครัวทาน
          เราเปิดให้บริการตั้งแต่ปีพ.ศ. 2535 กว่า 30 ปีที่เรานำเสนอความ
          อร่อยแบบไทยแท้ เราคัดสรรวัตถุดิบชั้นดี ปลอดภัย ออร์แกนิค จาก
          เกษตรกรในพื้นที่สุโขทัย ปรุงด้วยสูตรลับต้นตำรับชาววังที่สืบทอด
          กันมารุ่นสู่รุ่น จัดแต่งมาบนจาน พร้อมเสิร์ฟความอร่อยให้กับคุณ
        </p>
        <img src={Banner} className="w-full mt-4 rounded-lg" />
        {foodCategories.map((category) => (
          <MenuSection
            category={category}
            menus={foodMenus}
            cart={cart}
            setCart={setCart}
            setToggleCartPopup={setToggleCartPopup}
          />
        ))}
      </div>
      {toggleCartPopup && (
        <CartPopup
          cart={cart}
          setCart={setCart}
          updateCart={updateCart}
          toggleCartPopup={toggleCartPopup}
          setToggleCartPopup={setToggleCartPopup}
        />
      )}
    </div>
  );
};
