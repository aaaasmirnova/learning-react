import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Pagination2 } from "../Pagination2/Pagination2";
const amount = [5, 10, 20];
export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentAmount, setCurrentAmount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const getPosts = async () => {
    try {
      const response = await axios(
        `https://jsonplaceholder.typicode.com/posts?_limit=${currentAmount}&_page=${currentPage}`
      );
      setPosts(response.data);
    } catch (err) {
      console.error("Произошла ошибка!", err);
    }
  };

  useEffect(() => {
    getPosts();
  }, [currentPage, currentAmount]);

  const changeAmountPosts = (elem) => {
    setCurrentAmount(elem);
  };

  //   const changeActivePage = (elem) => {
  //     setCurrentPage(elem);
  //   };

  //   let pages = [];
  //   for (let i = 1; i <= 100 / currentAmount; i++) {
  //     pages.push(i);
  //   }

  return (
    <div>
      <h1>Список полученных постов:</h1>
      <p>Показать по:</p>
      {amount.map((elem) => (
        <button onClick={() => changeAmountPosts(elem)}>{elem}</button>
      ))}
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.id}</p>
            <p className="post-title">{post.title}</p>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <div>
        {/* {pages.map((page) => (
          <button onClick={() => changeActivePage(page)}>{page}</button>
        ))} */}
        <Pagination2
          currentPage={currentPage}
          total={100 / currentAmount}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
