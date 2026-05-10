// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";
// import Chatbot from "./Chatbot";
// import { Outlet } from "react-router-dom";

// function Layout() {
//   return (
//     <div className="d-flex">

//       <Sidebar />

//       <div className="flex-grow-1 bg-light">
//         <Navbar />

//         <div className="container mt-3">
//           <Outlet />   {/* 🔥 THIS CHANGES PAGE */}
//         </div>

//       </div>

//       <Chatbot />
//     </div>
//   );
// }

// export default Layout;
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;