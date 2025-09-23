import React, { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Profile from "./Profile"
import axiosInstance from "../utils/axiosInstance"
import { signOutSuccess } from "../redux/slice/userSlice"
import { useDispatch, useSelector } from "react-redux"
import SearchBar from "./SearchBar"
import { FaRoad } from "react-icons/fa"
import { MdAdminPanelSettings } from "react-icons/md"
import { IoMdMenu, IoMdClose } from "react-icons/io"

const Navbar = ({
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const onLogout = async () => {
    try {
      const response = await axiosInstance.post("/user/signout")

      if (response.data) {
        dispatch(signOutSuccess())
        setMobileMenuOpen(false)
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
    <div className="bg-white flex flex-wrap items-center justify-between px-4 sm:px-6 md:px-10 py-2 drop-shadow sticky top-0 z-10">
      <div className="flex items-center">
        <Link to={"/"}>
          <h1 className="font-bold text-xl sm:text-2xl flex flex-wrap">
            <span className="text-blue-400">Travel</span>
            <span className="text-blue-800">Snaps</span>
          </h1>
        </Link>
      </div>
      
      {/* Mobile menu button */}
      <div className="flex md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          {mobileMenuOpen ? (
            <IoMdClose className="h-6 w-6" />
          ) : (
            <IoMdMenu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-4 ml-6">
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

      {/* Desktop Search and Profile */}
      <div className="hidden md:flex items-center space-x-4">
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full mt-2 pt-2 pb-4 border-t border-gray-200">
          <div className="flex flex-col space-y-2 px-2">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md ${!isComplaintsPage ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Snaps
            </Link>
            <Link 
              to="/travel" 
              className={`px-3 py-2 rounded-md flex items-center ${location.pathname === '/travel' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaRoad className="mr-1" /> Travel Stories
            </Link>
            {currentUser?.isAdmin && (
              <Link 
                to="/admin" 
                className={`px-3 py-2 rounded-md flex items-center ${location.pathname === '/admin' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <MdAdminPanelSettings className="mr-1" /> Admin
              </Link>
            )}
            <div className="pt-2">
              <SearchBar
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                }}
                handleSearch={() => {
                  handleSearch();
                  setMobileMenuOpen(false);
                }}
                onClearSearch={onClearSearch}
              />
            </div>
            <div className="pt-2">
              <Profile onLogout={onLogout} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
