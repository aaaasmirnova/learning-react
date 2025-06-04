import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

const values = ["Nature", "Birds", "Cats", "Shoes"];

export const ImageSearch = () => {
  const [value, setValue] = useState("");
  const [searchValue, setSearhValue] = useState("coffee");
  const [imagesList, setImagesList] = useState([]);
  const [page, setPage] = useState(1);
  const API_URL = "https://api.unsplash.com/search/photos";
  const API_KEY = "_jFxxFj8hYR3BbbZMXpFE2Eqgk5y8PuQGG9-oN3AjFU";
  const IMAGES_PER_PAGE = 10;

  useEffect(() => {
    getImages();
  }, [searchValue, page]);

  const getImages = async () => {
    try {
      const response = await axios.get(
        `${API_URL}?query=${searchValue}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${API_KEY}`
      );
      setImagesList(response.data.results);
    } catch (err) {
      console.error("Произошла ошибка!", err);
    }
  };

  const changeSearchValue = (event) => {
    setValue(event.target.value);
    if (event.target.value.trim() === "") return;
    setSearhValue(event.target.value);
    setPage(1);
  };

  const showPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const showNextPage = () => {
    setPage(page + 1);
  };

  const getImagesByButton = (elem) => {
    setSearhValue(elem);
    getImages();
    setPage(1);
  };

  console.log(searchValue);

  return (
    <div className="image-search-form-wrapper">
      <div className="image-search-wrapper">
        <h1 className="image-search-title">Image Search</h1>
        <input type="text" value={value} onChange={changeSearchValue} />
        <div className="search-image-button-wrapper">
          {values.map((elem, index) => (
            <button
              className="search-image-button"
              onClick={() => getImagesByButton(elem)}
              key={index}
            >
              {elem}
            </button>
          ))}
        </div>
      </div>
      <div className="images-wrapper-inside">
        <div className="images-wrapper">
          {imagesList.map((image) => (
            <img
              className="image"
              src={image.urls.small}
              key={image.id}
              width="150"
              height="150"
            />
          ))}
        </div>
      </div>

      <div className="page-switches-button-wrapper">
        {page > 1 && (
          <button className="page-switches-button" onClick={showPreviousPage}>
            Previous
          </button>
        )}

        <button className="page-switches-button" onClick={showNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};
