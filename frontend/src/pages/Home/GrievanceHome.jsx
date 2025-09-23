// import React, { useEffect, useState } from "react"
// import Navbar from "../../components/Navbar"
// import GrievanceCard from "../../components/GrievanceCard"
// import { ToastContainer, toast } from "react-toastify"
// import { IoMdAdd } from "react-icons/io"
// import Modal from "react-modal"
// import AddEditGrievance from "../../components/AddEditGrievance"
// import ViewGrievance from "./ViewGrievance"
// import EmptyCard from "../../components/EmptyCard"
// import { DayPicker } from "react-day-picker"
// import moment from "moment"
// import FilterInfoTitle from "../../components/FilterInfoTitle"
// import { getEmptyCardMessage } from "../../utils/helper"
// import { Form } from "react-bootstrap"
// import grievanceService from "../../services/grievanceService"

// const GrievanceHome = () => {
//   const [allGrievances, setAllGrievances] = useState([])

//   const [searchQuery, setSearchQuery] = useState("")
//   const [filterType, setFilterType] = useState("")
//   const [statusFilter, setStatusFilter] = useState("")

//   const [dateRange, setDateRange] = useState({ from: null, to: null })

//   const [openAddEditModal, setOpenAddEditModal] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   })

//   const [openViewModal, setOpenViewModal] = useState({
//     isShown: false,
//     data: null,
//   })

//   // Get all grievances
//   const getAllGrievances = async () => {
//     try {
//       const response = await grievanceService.getAllGrievances()

//       if (response && response.grievances) {
//         setAllGrievances(response.grievances)
//       }
//     } catch (error) {
//       console.log("Something went wrong. Please try again.")
//     }
//   }

//   // Handle Edit Grievance
//   const handleEdit = async (data) => {
//     setOpenAddEditModal({ isShown: true, type: "edit", data: data })
//   }

//   const handleViewGrievance = (data) => {
//     setOpenViewModal({ isShown: true, data })
//   }

//   // delete grievance
//   const deleteGrievance = async (data) => {
//     const grievanceId = data._id

//     try {
//       const response = await grievanceService.deleteGrievance(grievanceId)

//       if (response && !response.error) {
//         toast.success("Grievance deleted successfully!")

//         setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))

//         getAllGrievances()
//       }
//     } catch (error) {
//       console.log("Something went wrong. Please try again.")
//     }
//   }

//   // search grievance
//   const onSearchGrievance = async (query) => {
//     try {
//       const response = await grievanceService.searchGrievances(query)

//       if (response && response.grievances) {
//         setFilterType("search")
//         setAllGrievances(response.grievances)
//       }
//     } catch (error) {
//       console.log("Something went wrong. Please try again.")
//     }
//   }

//   // Clear search
//   const handleClearSearch = () => {
//     setFilterType("")
//     getAllGrievances()
//   }

//   // Handle filter grievance by date range
//   const filterGrievancesByDate = async (day) => {
//     try {
//       const startDate = day.from ? moment(day.from).valueOf() : null
//       const endDate = day.to ? moment(day.to).valueOf() : null

//       if (startDate && endDate) {
//         // Using the search endpoint with date parameters
//         const response = await grievanceService.searchGrievances(`date:${startDate}-${endDate}`)

//         if (response && response.grievances) {
//           setFilterType("date")
//           setAllGrievances(response.grievances)
//         }
//       }
//     } catch (error) {
//       console.log("Something went wrong. Please try again.")
//     }
//   }

//   // Handle filter grievance by status
//   const filterGrievancesByStatus = async (status) => {
//     try {
//       if (status) {
//         const response = await grievanceService.filterByStatus(status)

//         if (response && response.grievances) {
//           setFilterType("status")
//           setAllGrievances(response.grievances)
//         }
//       } else {
//         setFilterType("")
//         getAllGrievances()
//       }
//     } catch (error) {
//       console.log("Something went wrong. Please try again.")
//     }
//   }

//   // Handle date range click
//   const handleDayClick = (day) => {
//     setDateRange(day)
//     filterGrievancesByDate(day)
//   }

//   const resetFilter = () => {
//     setDateRange({ from: null, to: null })
//     setStatusFilter("")
//     setFilterType("")
//     getAllGrievances()
//   }

//   useEffect(() => {
//     getAllGrievances()

//     return () => {}
//   }, [])

//   return (
//     <>
//       <Navbar
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         onSearchNote={onSearchGrievance}
//         handleClearSearch={handleClearSearch}
//       />

//       <div className="container mx-auto py-10">
//         <FilterInfoTitle
//           filterType={filterType}
//           filterDate={dateRange}
//           onClear={() => {
//             resetFilter()
//           }}
//         />

//         <div className="flex gap-7">
//           <div className="flex-1">
//             {allGrievances.length > 0 ? (
//               <div className="grid grid-cols-2 gap-4">
//                 {allGrievances.map((item) => {
//                   return (
//                     <GrievanceCard
//                       key={item._id}
//                       imageUrl={item.imageUrl}
//                       title={item.title}
//                       description={item.description}
//                       date={item.grievanceDate}
//                       location={item.location}
//                       status={item.status}
//                       onEdit={() => handleEdit(item)}
//                       onClick={() => handleViewGrievance(item)}
//                     />
//                   )
//                 })}
//               </div>
//             ) : (
//               <EmptyCard
//                 imgSrc={
//                   "https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&w=600"
//                 }
//                 message={getEmptyCardMessage(filterType)}
//                 setOpenAddEditModal={() =>
//                   setOpenAddEditModal({
//                     isShown: true,
//                     type: "add",
//                     data: null,
//                   })
//                 }
//               />
//             )}
//           </div>

//           <div className="w-[320px]">
//             <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg mb-4">
//               <div className="p-3">
//                 <h5 className="text-lg font-medium mb-2">Filter by Status</h5>
//                 <Form.Select 
//                   value={statusFilter} 
//                   onChange={(e) => {
//                     setStatusFilter(e.target.value)
//                     filterGrievancesByStatus(e.target.value)
//                   }}
//                   className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded-sm"
//                 >
//                   <option value="">All Statuses</option>
//                   <option value="pending">Pending</option>
//                   <option value="in_progress">In Progress</option>
//                   <option value="resolved">Resolved</option>
//                 </Form.Select>
//               </div>
//             </div>
            
//             <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg">
//               <div className="p-3">
//                 <DayPicker
//                   captionLayout="dropdown"
//                   mode="range"
//                   selected={dateRange}
//                   onSelect={handleDayClick}
//                   pagedNavigation
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add & Edit Grievance Modal */}
//       <Modal
//         isOpen={openAddEditModal.isShown}
//         onRequestClose={() => {}}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0,0,0,0.2)",
//             zIndex: 999,
//           },
//         }}
//         appElement={document.getElementById("root")}
//         className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
//       >
//         <AddEditGrievance
//           grievanceInfo={openAddEditModal.data}
//           type={openAddEditModal.type}
//           onClose={() => {
//             setOpenAddEditModal({ isShown: false, type: "add", data: null })
//           }}
//           getAllGrievances={getAllGrievances}
//         />
//       </Modal>

//       {/* View grievance modal */}
//       <Modal
//         isOpen={openViewModal.isShown}
//         onRequestClose={() => {}}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0,0,0,0.2)",
//             zIndex: 999,
//           },
//         }}
//         appElement={document.getElementById("root")}
//         className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
//       >
//         <ViewGrievance
//           grievanceInfo={openViewModal.data || null}
//           onClose={() => {
//             setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
//           }}
//           onEditClick={() => {
//             setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
//             handleEdit(openViewModal.data || null)
//           }}
//           onDeleteClick={() => {
//             deleteGrievance(openViewModal.data || null)
//           }}
//         />
//       </Modal>

//       <button
//         className="w-16 h-16 flex items-center justify-center rounded-full bg-[#05b6d3] hover:bg-cyan-400 fixed right-10 bottom-10"
//         onClick={() => {
//           setOpenAddEditModal({ isShown: true, type: "add", data: null })
//         }}
//       >
//         <IoMdAdd className="text-[32px] text-white" />
//       </button>

//       <ToastContainer />
//     </>
//   )
// }

// export default GrievanceHome



import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import GrievanceCard from "../../components/GrievanceCard"
import { ToastContainer, toast } from "react-toastify"
import { IoMdAdd } from "react-icons/io"
import Modal from "react-modal"
import AddEditGrievance from "../../components/AddEditGrievance"
import ViewGrievance from "./ViewGrievance"
import EmptyCard from "../../components/EmptyCard"
import { DayPicker } from "react-day-picker"
import moment from "moment"
import FilterInfoTitle from "../../components/FilterInfoTitle"
import { getEmptyCardMessage } from "../../utils/helper"
import grievanceService from "../../services/grievanceService"

const GrievanceHome = () => {
  const [allGrievances, setAllGrievances] = useState([])

  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("")

  const [dateRange, setDateRange] = useState({ from: null, to: null })

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  })

  // Get all grievances
  const getAllGrievances = async () => {
    try {
      const response = await grievanceService.getAllGrievances()

      if (response && response.grievances) {
        setAllGrievances(response.grievances)
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // Handle Edit Grievance
  const handleEdit = async (data) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: data })
  }

  const handleViewGrievance = (data) => {
    setOpenViewModal({ isShown: true, data })
  }

  // delete grievance
  const deleteGrievance = async (data) => {
    const grievanceId = data._id

    try {
      const response = await grievanceService.deleteGrievance(grievanceId)

      if (response && !response.error) {
        toast.success("Grievance deleted successfully!")

        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))

        getAllGrievances()
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // search grievance
  const onSearchGrievance = async (query) => {
    try {
      const response = await grievanceService.searchGrievances(query)

      if (response && response.grievances) {
        setFilterType("search")
        setAllGrievances(response.grievances)
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // Clear search
  const handleClearSearch = () => {
    setFilterType("")
    getAllGrievances()
  }

  // Handle filter grievance by date range
  const filterGrievancesByDate = async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null
      const endDate = day.to ? moment(day.to).valueOf() : null

      if (startDate && endDate) {
        // Using the search endpoint with date parameters
        const response = await grievanceService.searchGrievances(
          `date:${startDate}-${endDate}`
        )

        if (response && response.grievances) {
          setFilterType("date")
          setAllGrievances(response.grievances)
        }
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // Handle date range click
  const handleDayClick = (day) => {
    setDateRange(day)
    filterGrievancesByDate(day)
  }

  const resetFilter = () => {
    setDateRange({ from: null, to: null })
    setFilterType("")
    getAllGrievances()
  }

  useEffect(() => {
    getAllGrievances()

    return () => {}
  }, [])

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchGrievance}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto py-10">
        <FilterInfoTitle
          filterType={filterType}
          filterDate={dateRange}
          onClear={() => {
            resetFilter()
          }}
        />

        <div className="flex gap-7">
          <div className="flex-1">
            {allGrievances.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allGrievances.map((item) => {
                  return (
                    <GrievanceCard
                      key={item._id}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      description={item.description}
                      date={item.grievanceDate}
                      location={item.location}
                      onEdit={() => handleEdit(item)}
                      onClick={() => handleViewGrievance(item)}
                    />
                  )
                })}
              </div>
            ) : (
              <EmptyCard
                imgSrc={
                  "https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                message={getEmptyCardMessage(filterType)}
                setOpenAddEditModal={() =>
                  setOpenAddEditModal({
                    isShown: true,
                    type: "add",
                    data: null,
                  })
                }
              />
            )}
          </div>

          <div className="w-[320px]">
            <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg">
              <div className="p-3">
                <DayPicker
                  captionLayout="dropdown"
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDayClick}
                  pagedNavigation
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add & Edit Grievance Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
      >
        <AddEditGrievance
          grievanceInfo={openAddEditModal.data}
          type={openAddEditModal.type}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }}
          getAllGrievances={getAllGrievances}
        />
      </Modal>

      {/* View grievance modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
      >
        <ViewGrievance
          grievanceInfo={openViewModal.data || null}
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
          }}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
            handleEdit(openViewModal.data || null)
          }}
          onDeleteClick={() => {
            deleteGrievance(openViewModal.data || null)
          }}
        />
      </Modal>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-[#05b6d3] hover:bg-cyan-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }}
      >
        <IoMdAdd className="text-[32px] text-white" />
      </button>

      <ToastContainer />
    </>
  )
}

export default GrievanceHome
