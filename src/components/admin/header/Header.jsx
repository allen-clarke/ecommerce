const Header = () => {
  return (
    <header className="flex justify-between items-center fixed left-52 right-0 bg-stone-100 py-3 border-b border-b-gray-300 z-50">
      <div>
        <p className="text-2xl text-black font-bold font-sans pl-3">
          Product List
        </p>
      </div>
      <div className="flex items-center pr-2">
        <div className="relative">
          <button className="flex items-center text-[22px] text-gray-800 font-medium font-sans mr-2">
            <i className="bx bx-bell"></i>
          </button>
          <span className="absolute top-0.5 left-3 bg-red-600 w-2 h-2 rounded-full"></span>
        </div>
        <div className="avatar">
          <div className="w-7 rounded-full">
            <img src="src/assets/admins/alleng.jpg" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
