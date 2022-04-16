import Banner from "../assets/banner.jpg";

const foodMenus = [
  {
    image:
      "https://img.wongnai.com/p/1920x0/2018/12/17/bf69cc77dfb94a5ab6df20ffb0622cd2.jpg",
    name: "แกงส้มชะอมกุ้ง",
    price: 150,
  },
  {
    image:
      "https://tourdefood.net/wp-content/uploads/2020/11/%E0%B8%84%E0%B8%B0%E0%B8%99%E0%B9%89%E0%B8%B2-%E0%B9%80%E0%B8%AB%E0%B9%87%E0%B8%94%E0%B8%AB%E0%B8%AD%E0%B8%A1-%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A1%E0%B8%B1%E0%B8%99%E0%B8%AB%E0%B8%AD%E0%B8%A2-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E.jpg",
    name: "ผัดคะน้าเห็ดหอม",
    price: 130,
  },
  {
    image: "https://i.ytimg.com/vi/9YPqFc5BYWA/maxresdefault.jpg",
    name: "หมูสามชั้นคั่วพริกเกลือ",
    price: 200,
  },
];

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

export const Home = () => (
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
