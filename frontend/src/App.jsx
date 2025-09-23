import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import GrievanceHome from "./pages/Home/GrievanceHome"
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import PrivateRoute from "./components/PrivateRoute"
import AdminRoute from "./components/AdminRoute"
import Complaints from "./pages/Complaints/Complaints"
import AdminPage from "./pages/Admin/AdminPage"
import PublicGrievances from "./pages/Public/PublicGrievances"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" exact element={<GrievanceHome />} />
            <Route path="/travel" exact element={<Home />} />
            <Route path="/complaints" exact element={<Complaints />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" exact element={<AdminPage />} />
          </Route>

          <Route path="/login" exact element={<Login />} />
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/public" exact element={<PublicGrievances />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
