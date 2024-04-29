import { useState } from "react";
import Logo from "../assets/logo.svg";
import axios from "axios"



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
      formData.append('file', file);

      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        console.log('File uploaded successfully');
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };



  return (
    <header className="flex gap-5 justify-between items-center px-16 py-3 w-full border-b border-solid backdrop-blur-[20px] bg-[#323232d1]  border-neutral-500 max-md:flex-wrap max-md:px-5 max-md:max-w-full z-0  fixed -mt-[112px]">
      <div className="px-3 py-3 ">
        <img src={Logo} alt="Logo" />
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="text-white bg-[#6a6a6a99] p-2 px-4 rounded-lg text-center hover:bg-[#fa6323] hover:shadow-lg hover:shadow-[#00000090] duration-300" onClick={() => document.getElementById('my_modal_1').showModal()}>Import Bookmark</button>

      <dialog id="my_modal_1" className="modal p-4 rounded-md bg-[#323232] drop-shadow-2xl">

        <div className="modal-box">
          <h3 className="p-6 text-2xl text-white">Import your bookmarks now!</h3>

          <div className="modal-action">
            <form method="post" onSubmit={handleSubmit}>
              <input type="file" name="import" className="input text-white p-6 border-2 border-[#606060] mt-6 mx-8 mb-4 bg-[#575757] rounded-md" onChange={handleFileChange} />
              <div className="flex gap-2 justify-end py-4">

                <button className="text-white bg-[#6a6a6a99] p-2 px-4 rounded-lg text-center duration-300" onClick={() => {
                  document.getElementById('my_modal_1').close();
                }}>Close</button>
                <button type="submit" className="text-white bg-[#fa6323] p-2 px-4 rounded-lg text-center hover:bg-[#fa6323] hover:shadow-lg hover:shadow-[#00000090] duration-300">Upload</button>

              </div>
            </form>
          </div>
        </div>

      </dialog >
    </header >
  );
}
