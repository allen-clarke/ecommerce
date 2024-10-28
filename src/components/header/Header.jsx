import { useState } from "react";
import Menu from "./Menu";

const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState("false");
  const [searchBarDisplay, setSearchBarDisplay] = useState("false");

  const leftNavigationBtns = ["Men", "Women", "Kids", "Brands"];

  return (
    <header className="relative">
      <div className="fixed z-50 left-0 right-0 top-0 p-2 bg-black border-b-2">
        <div className="flex flex-row justify-between items-center py-0.5">
          <div
            className={
              searchBarDisplay === "false"
                ? "flex flex-row basis-1/3 content-start shrink"
                : "flex flex-row content-start md:basis-1/3 shrink"
            }
          >
            <button
              className="text-white md:hidden menu-btn"
              onClick={() => {
                menuDisplay === "false"
                  ? setMenuDisplay("true")
                  : setMenuDisplay("false");
              }}
            >
              <i
                className={
                  menuDisplay === "false" ? "bx bx-menu bx-md" : "bx bx-x bx-md"
                }
              ></i>
            </button>
            <div className="hidden flex-row content-start shrink md:flex">
              {leftNavigationBtns.map((button, index) => {
                return (
                  <button
                    className="font-black text-white rounded-2xl px-2 py-1 m-0.5 border border-gray-500 backdrop-blur-3xl"
                    key={index}
                  >
                    {button}
                  </button>
                );
              })}
            </div>
          </div>
          <div
            className={
              searchBarDisplay === "false"
                ? "basis-1/3 shrink"
                : "hidden basis-1/3 shrink md:block"
            }
          >
            <h1 className="text-3xl text-center text-white font-medium anton-sc">
              Fashionista
            </h1>
          </div>
          <div
            className={
              searchBarDisplay === "false"
                ? "flex justify-end items-center basis-1/3 shrink relative"
                : "flex justify-end items-center basis-1/2 md:basis-1/3 flex-grow shrink relative"
            }
          >
            <div
              className={
                searchBarDisplay === "false"
                  ? "hidden md:flex"
                  : "flex flex-1 items-center mr-2 md:flex md:flex-grow-0"
              }
            >
              <input
                placeholder="Search"
                id="search-bar"
                type="text"
                className="flex-1 px-3 py-2 bg-white rounded -mr-3 outline-none font-sans font-semibold text-black selection:bg-slate-400 shrink"
              />
              <button
                className="flex items-center text-black bg-white rounded py-0.5 px-2 search-button"
                onClick={() => {
                  setSearchBarDisplay("false");
                }}
              >
                <i className="bx bx-md bx-search-alt-2"></i>
              </button>
            </div>
            <label
              htmlFor="search-bar"
              className={
                searchBarDisplay === "false"
                  ? "flex md:hidden items-center text-white search-icon p-0.5 cursor-pointer"
                  : "hidden"
              }
              onClick={() => {
                setSearchBarDisplay("true");
              }}
            >
              <i className="bx bx-md bx-search-alt-2"></i>
            </label>

            <button className="flex items-center text-white p-0.5">
              <i className={"bx bx-md bx-cart"}></i>
            </button>

            <span className="absolute -top-2 right-1.5 text-orange-700 font-sans font-black cursor-pointer">
              00
            </span>
          </div>
        </div>
      </div>
      <Menu menuDisplay={menuDisplay} />
    </header>
  );
};
export default Header;
