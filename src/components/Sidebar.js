import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import SidebarChat from "./SidebarChat";
// import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { LoginContext } from "./LoginContext";
import { useNavigate } from "react-router-dom";

function Sidebar({ userName }) {
  const [group, setGroup] = useState([]);
  const { setUserLogin, setUserName } = useContext(LoginContext);

  const Navigate = useNavigate();

  const getGroups = async () => {
    const getData = onSnapshot(collection(db, "groups"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setGroup(list);
    });
  };

  useEffect(() => {
    getGroups();
  }, []);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout");
        // toast.success("Logout successful");
        setUserLogin(false);
        setUserName("");
        Navigate("/");
      })
      .catch((error) => {
        // toast.error(error.message);
      });
  };

  return (
    <div className="sidebar">
      {/*--------------------------- Header------------------------- */}
      <div className="sidebarHeader">
        <div style={{ display: "flex" }}>
          <img src="./man.jpeg" onClick={handleLogout} alt="" />
          <h1 id="userName">{userName}</h1>
        </div>
        <div className="sidebarHeaderRight">
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">
              arrow_drop_down_circle
            </span>
          </button>
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">more_vert</span>
          </button>
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">chat</span>
          </button>
        </div>
      </div>
      {/* --------------------------sidebar Search--------------------- */}
      <div className="sidebarSearch">
        <div className="sidebarSearchContainer">
          <span className="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search contact" />
        </div>
      </div>
      {/* ---------------------------Sidebar chats--------------------- */}
      <div className="sidebarChats">
        <SidebarChat addNewChat userLogin={setUserLogin} />
        {group.map((group) => {
          return <SidebarChat key={group.id} name={group.name} id={group.id} />;
        })}
      </div>
    </div>
  );
}
export default Sidebar;

// import React, { useEffect, useState } from "react";
// import "./Sidebar.css";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase";
// import SidebarChat from "./SidebarChat";
// import firebase from "firebase/compat/app";

// function Sidebar({ userName }) {
//   const [group, setGroup] = useState([]);

//   const getGroups = async () => {
//     const getData = onSnapshot(collection(db, "groups"), (snapshot) => {
//       let list = [];
//       snapshot.docs.forEach((doc) => {
//         list.push({
//           id: doc.id,
//           ...doc.data(),
//         });
//       });
//       setGroup(list);
//     });
//   };

//   useEffect(() => {
//     getGroups();
//   }, []);

//   return (
//     <div className="sidebar">
//       {/*--------------------------- Header------------------------- */}
//       <div className="sidebarHeader">
//         <div style={{ display: "flex" }}>
//           <img
//             src="./man.jpeg"
//             onClick={(e) => firebase.auth().signOut()}
//             alt=""
//           />
//           <h1 id="userName">{userName}</h1>
//         </div>
//         <div className="sidebarHeaderRight">
//           <button style={{ border: "none" }}>
//             <span className="material-symbols-outlined">
//               arrow_drop_down_circle
//             </span>
//           </button>
//           <button style={{ border: "none" }}>
//             <span className="material-symbols-outlined">more_vert</span>
//           </button>
//           <button style={{ border: "none" }}>
//             <span className="material-symbols-outlined">chat</span>
//           </button>
//         </div>
//       </div>
//       {/* --------------------------sidebar Search--------------------- */}
//       <div className="sidebarSearch">
//         <div className="sidebarSearchContainer">
//           <span className="material-symbols-outlined">search</span>
//           <input type="text" placeholder="Search contact" />
//         </div>
//       </div>
//       {/* ---------------------------Sidebar chats--------------------- */}
//       <div className="sidebarChats">
//         <SidebarChat addNewChat />
//         {group.map((group) => {
//           return <SidebarChat key={group.id} name={group.name} id={group.id} />;
//         })}
//       </div>
//     </div>
//   );
// }
// export default Sidebar;
