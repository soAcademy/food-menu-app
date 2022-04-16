import React, { useState, useEffect } from 'react';
import Banner from "../assets/banner.jpg";
import axios from 'axios';

const MenuList = ({ menu }) => (
  <div className="flex mb-4">
    <img src={menu.image} className="object-cover w-20 h-20 rounded-lg" />
    <div className="ml-2 flex-auto">
      {menu.name}
      <p className="text-red-500 text-sm">฿{menu.price}</p>
    </div>
    <div className="ml-2 ">
      <button className="button bg-red-200 active:bg-red-400 px-4 py-2 rounded-lg ml-2">
        เพิ่ม
      </button>
    </div>
  </div>
);

export const Home = () => {
  const getMenuUrl = process.env.REACT_APP_API_URL + "/get-menus";
  const [foodMenus, setFoodMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const result = await axios.post(getMenuUrl);
      console.log(result.data);
      setFoodMenus(result.data);
    }

    fetchMenus();
  }, []);
  
  return (
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
      <h4 className="mt-4 mb-2 font-bold">รายการแนะนำ</h4>
      {foodMenus.map((menu) => (
        <MenuList menu={menu} />
      ))}
    </div>
  );
};
