import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/formAddEdit.css";

const URL = "https://650bb0bedfd73d1fab0a2541.mockapi.io/fil/film"; // Thay URL bằng URL của MockAPI của bạn

const initialState = {
  imgage: "",
  title: "",
  year: "",
  nation: "",
  link: "",
};

const error_init = {
  imgage_err: "",
  title_err: "",
  year_err: "",
  nation_err: "",
  link_err: "",
};

const FormAddEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState(initialState);
  const { imgage, title, year, nation, link } = state;
  const [errors, setErrors] = useState(error_init);

  const getOneFilm = async (id) => {
    const res = await axios.get(`${URL}/${id}`);
    if (res.status === 200) {
      setState(res.data);
    }
  };

  useEffect(() => {
    if (id) getOneFilm(id);
  }, [id]);

  const updateFilm = async (filmID, data) => {
    const res = await axios.put(`${URL}/${filmID}`, data);
    if (res.status === 200) {
      toast.success(`Updated successfully ~`);
      navigate("/dashboard");
    }
  };

  const addNewFilm = async (data) => {
    const res = await axios.post(`${URL}`, data);
    if (res.status === 200 || res.status === 201) {
      toast.success("New Film has been added successfully ~");
      navigate("/dashboard");
    }
  };

  const validateForm = () => {
    let isValid = true;
    let errors = { ...error_init };

    if (imgage.trim() === "") {
      errors.imgage_err = "Image is required";
      isValid = false;
    }

    if (title.trim() === "") {
      errors.title_err = "Title is required";
      isValid = false;
    }

    if (!year) {
      errors.year_err = "Year is required";
      isValid = false;
    }

    if (nation.trim() === "") {
      errors.nation_err = "Nation is required";
      isValid = false;
    }

    if (link.trim() === "") {
      errors.link_err = "Link is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      if (id) updateFilm(id, state);
      else addNewFilm(state);
    } else {
      toast.error("Some info is invalid ~ Please check again");
    }
  };

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setState((state) => ({ ...state, [name]: value }));
  };

  return (
    <div className="container">
      <div className="form">
        <h2>{id ? "Update Form" : "Add New Film"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="imgage">Image: </label>
            <input
              type="text"
              name="imgage"
              value={state.imgage}
              onChange={handleInputChange}
            />
            {errors.imgage_err && (
              <span className="error">{errors.imgage_err}</span>
            )}
          </div>
          <div>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              value={state.title}
              onChange={handleInputChange}
            />
            {errors.title_err && (
              <span className="error">{errors.title_err}</span>
            )}
          </div>
          <div>
            <label htmlFor="year">Year: </label>
            <input
              type="text"
              name="year"
              value={state.year}
              onChange={handleInputChange}
            />
            {errors.year_err && (
              <span className="error">{errors.year_err}</span>
            )}
          </div>
          <div>
            <label htmlFor="nation">Nation: </label>
            <input
              type="text"
              name="nation"
              value={state.nation}
              onChange={handleInputChange}
            />
            {errors.nation_err && (
              <span className="error">{errors.nation_err}</span>
            )}
          </div>
          <div>
            <label htmlFor="link">Link: </label>
            <input
              type="text"
              name="link"
              value={state.link}
              onChange={handleInputChange}
            />
            {errors.link_err && (
              <span className="error">{errors.link_err}</span>
            )}
          </div>
          {id && (
            <div>
              <label htmlFor="id">ID: </label>
              <input type="text" name="id" value={state.id} readOnly />
            </div>
          )}
          <button type="submit" className="form-button">
            {id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormAddEdit;
