import { useState } from "react";
import Logo from "../assets/logo.svg";
import axios from "axios";
import Drawer from "./drawer"

export default function Navbar() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        console.log("File uploaded successfully");
      } else {
        console.error("Error uploading file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <header className="flex gap-5 justify-between items-center px-16 py-3 w-full border-b border-solid backdrop-blur-[20px] bg-[#323232d1]  border-neutral-500 max-md:flex-wrap max-md:px-5 max-md:max-w-full z-[99999]  fixed ">
      <div className="px-3 py-3 ">
        <img src={Logo} alt="Logo" />
      </div>

      <div >

    
        <Drawer />
      </div>


      {/* Background modal */}
      <dialog
        id="fileImport"
        className="modal p-4 rounded-md bg-[#3232320f] backdrop-blur-sm"
      >
        {/* Main Dialog Content */}
        <div className="modal-box bg-[#323232]  border-[1px] border-[#ffffff2a] drop-shadow-xl">
          <h3 className="p-4 text-2xl text-white text-center">
            Import your bookmarks now!
          </h3>
          <h2 className="-mt-2 text-md text-[#ecebeb5f] text-center hover:underline hover:text-[#fcfcfc] hover:cursor-pointer duration-200">
            Where do I find it?
          </h2>

          <div className="modal-action flex justify-center">
            <form method="post" onSubmit={handleSubmit}>
              <input
                type="file"
                accept=".html"
                name="import"
                className="input text-white py-2 border-2 border-[#606060] mt-6 mx-8 mb-6 bg-[#575757] rounded-md"
                onChange={handleFileChange}
              />
              <div className="flex gap-2 justify-end py-4 mt-4">
                <button
                  className="text-white p-2 px-4 rounded-lg text-center bg-[#45454568] border-[1px] border-[#fff0] hover:border-[1px] hover:border-[#ffffff7c]  duration-300"
                  onClick={() => {
                    document.getElementById("fileImport").close();
                  }}
                >
                  Esc
                </button>
                <button
                  type="submit"
                  className="text-white btn bg-[#fa6323] p-2 px-4 rounded-lg text-center hover:bg-[#fa6323] hover:shadow-lg hover:shadow-[#00000090] duration-300"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>



      <dialog
        id="addBookmark"
        className="modal p-4 rounded-md bg-[#3232320f] backdrop-blur-sm"
      >
        {/* Main Dialog Content */}
        <div className="modal-box bg-[#323232]  border-[1px] border-[#ffffff2a] drop-shadow-xl">
          <h3 className="p-4 text-2xl text-white text-center">
            Add your bookmarks link
          </h3>
          <h2 className="-mt-2 text-md text-[#ecebeb5f] text-center hover:underline hover:text-[#fcfcfc] hover:cursor-pointer duration-200">
            More ways to add bookmarks
          </h2>

          <div className="modal-action flex justify-center">
            <form
              className="flex flex-col gap-8 mx-10 mb-10"
            >
              <div className="flex flex-col justify-center w-80 gap-4">
                <div>
                  <label htmlFor="category" className="text-white">
                    Link*
                  </label>
                  <input
                    type="url"
                    placeholder="Add link..."
                    className="text-white justify-center input input-bordered w-full max-w-xs p-2 bg-[#424242] rounded-md border-[1px] focus:border-[#9d9d9d9c]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="text-[#ffffff9e]">
                    Add Category
                  </label>
                  <select className="select select-bordered text-[#ffffff9e] justify-center input w-full max-w-xs p-2 bg-[#424242] rounded-md border-[1px] focus:border-[#9d9d9d9c] ">
                    <option disabled selected>
                      Select
                    </option>
                    <option>Han Solo</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className="text-[#ffffff9e]" >
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="Give some tags..."
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
    </header>
  );
}
