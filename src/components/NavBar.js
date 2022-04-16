import React, { useState } from "react";
import More from "../assets/more.png";

export const NavBar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="h-12 w-full shadow flex">
        <div onClick={() => setToggle(!toggle)}>
          <img src={More} className="h-8 ml-2 mt-2" />
        </div>
        <div className="flex-auto text-xl font-bold ml-2 mt-3">ครัวคุณบิน</div>
      </div>
      {toggle && (
        <div className="w-48 h-3/4 bg-green-100 absolute">
          <div>หน้าหลัก</div>
        </div>
      )}
    </>
  );
};
