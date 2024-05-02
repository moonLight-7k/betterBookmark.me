
export default function drawer() {


    return (
        <div className="drawer drawer-end ">

            <input id="my-drawer-4" type="checkbox" className="drawer-toggle " />
            <div className="drawer-content">
                <label htmlFor="my-drawer-4" className="drawer-button hover:cursor-pointer">
                    <svg width="50" height="50" viewBox="0 0 181 181" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27 72H153" stroke="#EEEEEE" strokeWidth="6" strokeLinecap="round" />
                        <path d="M27 109H124" stroke="#EEEEEE" strokeWidth="6" strokeLinecap="round" />
                    </svg>

                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-[#4a4a4ad2]  backdrop-blur-md text-base-content">
                    {/* Sidebar content here */}
                    <li className="mt-6">
                        <button
                            className=" text-[#ffffffbe] bg-[#4a4a4a] py-2 px-6 rounded-lg text-center hover:bg-[#fa6323] hover:shadow-lg hover:shadow-[#00000090] duration-300 border-2 border-[#ffffff16]  hover:border-2 hover:border-[#ff986c] hover:text-white hover:scale-95 justify-center"
                            onClick={() => document.getElementById("fileImport").showModal()}
                        >
                            <span className="flex gap-2">
                                <svg
                                    className="mt-1"
                                    xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m12 20l6-6m-6 6l-6-6m6 6V9.5M12 4v2.5"></path>
                                </svg>
                                Import Bookmarks
                            </span>
                        </button>

                    </li>
                    <li className="mt-4">
                        <button className="text-[#ffffffbe]  py-2 px-6 rounded-lg text-center hover:bg-[#fa6323] hover:shadow-lg hover:shadow-[#00000090] duration-300 border-2 border-[#ffffff16] hover:border-2 hover:border-[#ff986c] hover:text-white  hover:scale-95 justify-center bg-[#FF5E1A]"
                            onClick={() => document.getElementById("addBookmark").showModal()}>
                            <span className="flex gap-2">

                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" className="mt-1" height="1em" viewBox="0 0 512 512">
                                    <path fill="none" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth={48} d="M256 112v288m144-144H112"></path>

                                </svg>Add Bookmark
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
