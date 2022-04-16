export const CartPopup = ({
  cart,
  setCart,
  updateCart,
  toggleCartPopup,
  setToggleCartPopup,
}) => (
  <>
    <div className="bg-black opacity-50 fixed top-0 left-0 w-full h-full"></div>
    <div className="bottom-0 fixed bg-white w-full px-2 py-4">
      <div className="flex">
        <div className="flex-auto">สั่งอาหาร</div>
        <div onClick={() => setToggleCartPopup(!toggleCartPopup)}> ปิด</div>
      </div>
      <div className="flex mt-4">
        <div className="flex-auto">หมายเลขโต๊ะ</div>
        <div>
          <input
            type="number"
            className="border border-gray-300 p-1 text-right w-12"
          />
        </div>
      </div>
      {cart.map((item) => (
        <div className="flex mt-2">
          <div className="flex-auto">{item.name}</div>
          <div>
            <button
              onClick={() =>
                setCart(
                  updateCart({
                    sign: -1,
                    cart,
                    id: item.id,
                    name: item.name,
                    price: item.price,
                  })
                )
              }
              className="button bg-red-200 active:bg-red-400 px-2"
            >
              -
            </button>
            <span className="px-2">{item.quantity}</span>
            <button
              onClick={() =>
                setCart(
                  updateCart({
                    sign: 1,
                    cart,
                    id: item.id,
                    name: item.name,
                    price: item.price,
                  })
                )
              }
              className="button bg-red-200 active:bg-red-400 px-2"
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div>
        <button className="button bg-red-200 w-full rounded-lg py-2 mt-8">
          สั่งอาหาร
        </button>
      </div>
    </div>
  </>
);
