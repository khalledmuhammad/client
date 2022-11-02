import { useContext } from "react";
import HomePage from "../components/Pages/HomePage";
import { AuthContext } from "../context/auth";

function Home() {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <div>
      <HomePage />

      <br />
    </div>
  );
}

export default Home;