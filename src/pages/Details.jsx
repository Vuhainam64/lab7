import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URL = "https://650bb0bedfd73d1fab0a2541.mockapi.io/fil/film";

function Details() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});

  const getFilmDetail = async () => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      if (res.status === 200) {
        setDetail(res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFilmDetail();
  }, []);

  return (
    <div className="container">
      <div className="card" key={detail.id}>
        <div className="card-image">
          <img src={detail.image} alt={detail.id} />
        </div>
        <h3 className="card-title">{detail.name}</h3>
        <p className="card-info">Price: {detail.price} VND</p>
        <p className="card-info">Rating: {detail.rating} star</p>
        <p className="card-info">Category: {detail.category}</p>
        <p className="card-info">Description: {detail.description}</p>
        <p className="card-info">
          BestSeller: {detail.bestseller ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}

export default Details;
