import { useEffect, useState } from "react";
import CategoryImg from "../assets/Category.svg";
import Card from "./card";
import Data from "../data/site.json";
import axios from 'axios';


export default function Category() {

  const [jsonData, setJsonData] = useState(null);
  useEffect(() => {
    fetchData();
  }, );

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/bookmarks');
      if (response.status !== 200) {
        throw new Error('Failed to fetch JSON data');
      }
      const data = response.data;
      setJsonData(data);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  }



  const initialCategories = [
    { name: "All", active: true },
    { name: "Recent", active: false },
  ];

  const getCategoriesFromLocalStorage = () => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  };

  const saveCategoriesToLocalStorage = (categories) => {
    localStorage.setItem('categories', JSON.stringify(categories));
  };

  const [categories, setCategories] = useState(getCategoriesFromLocalStorage());
  const [newCategoryName, setNewCategoryName] = useState('');

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
      setNewCategoryName('');
      document.getElementById('my_modal_2').close();
    }
  };


  const handleClickCount = (index) => {
    if (jsonData !== null) {

      const newData = jsonData.map(item => {
        if (item.index === index) {
          return { ...item, clickCount: item.clickCount + 1 };
        }
        return item;
      });

      setJsonData(newData);
    }
    else {
      console.log("JsonData is NULL")
    }
  };


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
            className={`text-nowrap text-[18px] text-white py-1 px-4 duration-200 rounded-xl border-2 border-[#6F6F6F] ${category.active
              ? "bg-[#FF5E1A] border-2 border-[#ff9161]"
              : "bg-[#424242]"
              }`}
            onClick={() => handleCategoryClick(index)}
          >
            {category.name}
          </button>
        ))}

        <button className="flex text-[18px] text-white px-2 bg-[#424242] duration-200 rounded-xl border-2 border-[#6F6F6F] hover:bg-[#FF5E1A] hover:border-2 hover:border-[#ff9161]" onClick={() => document.getElementById('my_modal_2').showModal()}>
          <svg xmlns="http://www.w3.org/2000/svg" className="mt-1" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2m2-10h4V7h2v4h4v2h-4v4h-2v-4H7z"></path></svg>

        </button>

        <dialog id="my_modal_2" className="modal p-4 rounded-md bg-[#323232] drop-shadow-2xl">

          <div className="modal-box w-[40vw] h-[60vh]">
            <p className="p-6 text-2xl text-white text-center">Create Category!</p>

            <div className="modal-action flex justify-center mt-8 ">
              <form className="flex flex-col gap-8 mx-10 mb-10" onSubmit={handleCreateCategory} >
                <div className="flex flex-col justify-center w-80 gap-4" >
                  <div>
                    <label htmlFor="category" className="text-white" >Name*</label>
                    <input
                      type="text"
                      placeholder="Type here..."
                      className="text-white justify-center input input-bordered w-full max-w-xs p-2 bg-[#424242] rounded-md border-[1px] border-[#9d9d9d9c]"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="text-[#ffffff9e]" >Add Bookmarks</label>
                    <select className="select select-bordered text-[#ffffff9e] justify-center input input-bordered w-full max-w-xs p-2 bg-[#424242] rounded-md border-[1px] border-[#9d9d9d9c]">
                      <option disabled selected>Select </option>
                      <option>Han Solo</option>
                      <option>Greedo</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="category" className="text-[#ffffff9e]" >Tags</label>
                    <input type="text" placeholder="Type here..." className="text-white justify-center input input-bordered w-full max-w-xs p-2 bg-[#424242] rounded-md border-[1px] border-[#9d9d9d9c]" />
                  </div>
                </div>
                <button type="submit" className="text-white p-2 px-4 rounded-lg text-center bg-[#fa6323] hover:shadow-lg hover:shadow-[#00000090] duration-300">Create Category</button>
              </form>
            </div>
          </div>

        </dialog >

      </div>

      <div className=" flex flex-wrap lg:gap-6 md:gap-4 sm:gap-2 justify-center overflow-hidden scrollbar-hide pb-10 px-12 mt-8 ">
        {Data.map((data, index) => (
          <Card
            key={index}
            link={data.site}
            count={data.clickCount}
            onClick={handleClickCount(index)}
          />
        ))}
      </div>
    </div >
  );
}
