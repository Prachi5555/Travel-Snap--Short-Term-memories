import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Profile from "./Profile"
import axiosInstance from "../utils/axiosInstance"
import { signOutSuccess } from "../redux/slice/userSlice"
import { useDispatch, useSelector } from "react-redux"
import SearchBar from "./SearchBar"
import { FaRoad } from "react-icons/fa"
import { MdAdminPanelSettings } from "react-icons/md"

const Navbar = ({
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)

  const onLogout = async () => {
    try {
      const response = await axiosInstance.post("/user/signout")

      if (response.data) {
        dispatch(signOutSuccess())

        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    handleClearSearch()
    setSearchQuery("")
  }

  const location = useLocation()
  const isComplaintsPage = location.pathname === "/complaints"

  return (
    <div className="bg-white flex items-center justify-between px-10 py-2 drop-shadow sticky top-0 z-10">
      <div className="flex items-center space-x-6">
        <Link to={"/"}>
          <h1 className="font-bold text-2xl sm:text-2xl flex flex-wrap">
            <span className="text-blue-400">Travel</span>
            <span className="text-blue-800">Snaps</span>
          </h1>
        </Link>
        
        <nav className="hidden md:flex space-x-4">
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-md ${!isComplaintsPage ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            Snaps
          </Link>
          <Link 
            to="/travel" 
            className={`px-3 py-2 rounded-md flex items-center ${location.pathname === '/travel' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <FaRoad className="mr-1" /> Travel Stories
          </Link>
          {currentUser?.isAdmin && (
            <Link 
              to="/admin" 
              className={`px-3 py-2 rounded-md flex items-center ${location.pathname === '/admin' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <MdAdminPanelSettings className="mr-1" /> Admin
            </Link>
          )}
        </nav>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value)
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <Profile onLogout={onLogout} />
    </div>
  )
}

export default Navbar
