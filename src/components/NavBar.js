import React, { useState } from "react";
import More from "../assets/more.png";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const routes = [
    { name: "หน้าหลัก", url: "/" },
    { name: "รายการสั่งอาหาร", url: "/order" },
    { name: "สถิติ", url: "/analytics" }
  ];

  return (
    <>
      <div className="h-12 w-full shadow flex">
        <div onClick={() => setToggle(!toggle)}>
          <img src={More} className="h-8 ml-2 mt-2" />
        </div>
        <div className="flex-auto text-xl font-bold ml-2 mt-3">ครัวคุณบิน</div>
      </div>
      {toggle && (
        <div className="w-full bg-white shadow">
          {routes.map((route) => (
            <Link to={route.url}>
              <div className="py-2 pl-2 active:bg-blue-100">{route.name}</div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
