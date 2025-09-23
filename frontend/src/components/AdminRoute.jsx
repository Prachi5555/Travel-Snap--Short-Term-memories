import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const AdminRoute = () => {
  const { currentUser } = useSelector((state) => state.user)

  // Check if user is logged in and is an admin
  return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to={"/"} />
}

export default AdminRoute