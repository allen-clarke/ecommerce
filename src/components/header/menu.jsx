const Menu = ({ menuDisplay }) => {
  const menuBtns = ["Men", "Women", "Kids", "Brands"];

  return (
    <div
      className={
        menuDisplay === "false"
          ? "absolute right-0 left-0 bg-gray-500 py-1 h-screen z-10 -translate-x-full transition-transform md:hidden"
          : "absolute right-0 left-0 bg-gray-500 py-1 h-screen z-10 transition-transform md:hidden"
      }
    >
      <ol>
        {menuBtns.map((button, index) => {
          return (
            <li
              className="p-4 text-white text-2xl font-sans font-bold border-b"
              key={index}
            >
              <button>{button}</button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
export default Menu;
