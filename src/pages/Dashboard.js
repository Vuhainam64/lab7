import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

const URL = "https://650bb0bedfd73d1fab0a2541.mockapi.io/fil/film";

const Dashboard = () => {
  const [Films, setFilms] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const getListFilm = async () => {
    const res = await axios.get(`${URL}`);
    if (res.status === 200) {
      setFilms(res.data);
    }
  };

  useEffect(() => {
    getListFilm();
  }, []);

  const handleDelete = (id) => {
    setDeletingItemId(id);
    setIsPopupOpen(true);
    console.log(isPopupOpen);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await axios.delete(`${URL}/${deletingItemId}`);
      if (res.status === 200) {
        getListFilm();
        toast.success("Deleted Successfully ~");
      } else {
        toast.error("Delete: Error!");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Error deleting the film");
    }
    setIsPopupOpen(false);
    setDeletingItemId(null);
  };

  const handleCancelDelete = () => {
    setIsPopupOpen(false);
    setDeletingItemId(null);
  };

  return (
    <div className="Film-table">
      <div className="btn-add">
        <Link to={"/add/"}>
          <button className="add-Film-btn">ADD NEW FILM</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Year</th>
            <th>Nation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Films &&
            Films.map((Film) => (
              <tr key={Film.id}>
                <td>{Film.id}</td>
                <td>
                  <img src={Film.imgage} alt={Film.id} />
                </td>
                <td>{Film.title}</td>
                <td>{Film.year}</td>
                <td>{Film.nation}</td>
                <td>
                  <Link to={`/update/${Film.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(Film.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this film?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
            <span className="close" onClick={handleCancelDelete}>
              &times;
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
