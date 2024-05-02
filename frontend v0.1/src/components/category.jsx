import { useEffect, useState } from "react";
import CategoryImg from "../assets/Category.svg";
import Card from "./card";
import Data from "../data/site.json";
import axios from "axios";

export default function Category() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    console.log("fetchData called");
    fetchData();
  }, []);

  useEffect(() => {
    console.log("jsonData changed:", jsonData); // Log when jsonData changes
  }, [jsonData]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/data");
      if (response.status !== 200) {
        throw new Error(
          "Failed to fetch JSON data. Status: " + response.status,
        );
      }
      console.log("Stemp 1");
      const data = response.data;
      console.log("Received JSON data:", data); // Log the received data
      setJsonData(data);
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  };

  const initialCategories = [
    { name: "All", active: true },
    { name: "Recent", active: false },
  ];

  const getCategoriesFromLocalStorage = () => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  };

  const saveCategoriesToLocalStorage = (categories) => {
    localStorage.setItem("categories", JSON.stringify(categories));
  };

  const [categories, setCategories] = useState(getCategoriesFromLocalStorage());
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleCategoryClick = (index) => {
    const updatedCategories = categories.map((category, i) => ({
      ...category,
      active: i === index,
    }));
    setCategories(updatedCategories);
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      const newCategories = [
        ...categories,
        { name: newCategoryName.trim(), active: false },
      ];
      setCategories(newCategories);
      saveCategoriesToLocalStorage(newCategories);
      setNewCategoryName("");
      document.getElementById("addCategory").close();
    }
  };

  // const handleClickCount = (index) => {
  //   if (jsonData !== null) {
  //     const newData = Data.map((item) => {
  //       if (item.index === index) {
  //         return { ...item, clickCount: item.clickCount + 1 };
  //       }
  //       return item;
  //     });

  //     setJsonData(newData);
  //   } else {
  //     console.log("JsonData is NULL");
  //   }
  // };

  return (
    <div>
      <div className=" flex gap-2 ml-12 mt-5 z-1">
        <img src={CategoryImg} alt="," />
        <p className="text-[24px]  text-[#ffffff83] z-1 ">Category</p>
      </div>

      <div
        className="flex gap-2 overflow-scroll scroll-smooth ml-12 mt-8"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.map((category, index) => (
          <button
            key={index}
            className={` text-nowrap text-[18px]  py-1 px-4 duration-200 rounded-xl border-2 ${category.active
              ? "bg-[#FF5E1A] border-2 border-[#ff986c] text-white"
              : "bg-[#424242] text-[#ffffff98] border-[#6f6f6faf] duration-300 hover:scale-[97%] "
              }`}
            onClick={() => handleCategoryClick(index)}
          >
            {category.name}
          </button>
        ))}

        <button
          className="tooltip hover:tooltip-open flex text-[18px] text-[#ffffffa2] hover:text-white px-2 bg-[#424242] duration-200 rounded-xl border-2 border-[#6F6F6F] hover:bg-[#FF5E1A] hover:border-2 hover:border-[#ff9161]"
          data-tip="Add Category"
          onClick={() => document.getElementById("addCategory").showModal()}
        >
          <span className="flex mt-1 gap-1">

            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" className="mt-[2px]" height="1.2em" viewBox="0 0 512 512">
              <path fill="none" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth={44} d="M256 112v288m144-144H112"></path>

            </svg>
          </span>

        </button>

        <dialog
          id="addCategory"
          className="modal p-4 rounded-md bg-[#3232320f] backdrop-blur-sm duration-100"
        >
          <div className="modal-box bg-[#323232]  border-[1px] border-[#ffffff2a] drop-shadow-xl duration-300">
            <p className="p-6 text-2xl text-white text-center">
              Create Category!
            </p>

            <div className="modal-action flex justify-center mt-8 ">
              <form
                className="flex flex-col gap-8 mx-10 mb-10"
                onSubmit={handleCreateCategory}
              >
                <div className="flex flex-col justify-center w-80 gap-4">
                  <div>
                    <label htmlFor="category" className="text-white">
                      Name*
                    </label>
                    <input
                      type="text"
                      placeholder="Type here..."
                      className="text-white justify-center input input-bordered w-full max-w-xs p-2 bg-[#424242] rounded-md border-[1px] focus:border-[#9d9d9d9c]"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="text-[#ffffff9e]">
                      Add Bookmarks
                    </label>
                    <select className="select select-bordered text-[#ffffff9e] justify-center input w-full max-w-xs p-2 bg-[#424242] rounded-md border-[1px] focus:border-[#9d9d9d9c] ">
                      <option disabled selected>
                        Select{" "}
                      </option>
                      <option>Han Solo</option>
                      <option>Greedo</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="category" className="text-[#ffffff9e]">
                      Tags
                    </label>
                    <input
                      type="text"
                      placeholder="Type here..."
                      className="text-white justify-center input input-bordered w-full max-w-xs p-2 bg-[#424242] rounded-md border-[1px] focus:border-[#9d9d9d9c]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    type="submit"
                    className="text-white p-2 px-4 rounded-lg text-center bg-[#fa6323] hover:shadow-lg hover:shadow-[#00000090] duration-300 border-2 border-[#fff0] hover:border-2 hover:border-[#ff986c] "
                  >
                    Create Category
                  </button>

                  <button
                    type="button"
                    className="text-white p-2 px-4 rounded-lg text-center bg-[#45454568] border-2 border-[#fff0] hover:border-[2px] hover:border-[#ffffff3f]  duration-300"
                    onClick={() => {
                      document.getElementById("addCategory").close();
                    }}
                  >
                    Esc
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <div className="flex flex-wrap lg:gap-6 md:gap-4 sm:gap-2 justify-center overflow-hidden scrollbar-hide pb-10 px-12 pt-10 ">
        {Data.map((data, index) => (
          <Card key={index} link={data.site} count={data.clickCount} />
        ))}
      </div>
    </div>
  );
}
