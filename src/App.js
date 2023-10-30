import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import FormAddEdit from "./components/FormAddEdit";
import Top from "./pages/Top";
import News from "./pages/News";
import Signin from "./pages/Signin";
import Details from "./pages/Details";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./config/firebase.config";
import { SET_USER } from "./context/actions/userActions";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setDoc(doc(db, "user", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            //dispatch the action to store
            dispatch(SET_USER(userCred?.providerData[0]));
            navigate("/", { replace: true });
          }
        );
      } else {
        navigate("/signin", { replace: true });
      }
    });

    //clean up the listener evvvent
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/top" element={<Top />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/signin" element={<Signin />}></Route>

        <Route path="/details/:id" element={<Details />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/add" element={<FormAddEdit />}></Route>
        <Route path="/update/:id" element={<FormAddEdit />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
