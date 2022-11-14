import { useContext } from "react";
import HomePage from "../components/Pages/HomePage";
import PostCategory from "../components/Pages/PostCategory";
import { AuthContext } from "../context/auth";

function Home() {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <div>
      <HomePage />
      <PostCategory />

      <br />
    </div>
  );
}

export default Home;