import Navbar from "./components/navbar.jsx"
import Pinned from "./components/pinned.jsx"
import Categories from "./components/category.jsx"

function App() {

  return (
    <div>
      <Navbar />
      <div className="mt-28">
        <Pinned />
        <Categories />
      </div>
    </div>
  )
}

export default App
