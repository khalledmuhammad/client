import Head from "next/head";
import { useContext } from "react";
import HomePage from "../components/Pages/HomePage";
import PostCategory from "../components/Pages/PostCategory";
import { AuthContext } from "../context/auth";

function Home() {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  return (

    <>
    <Head>
<meta name="google-site-verification" content="6ghSbC4gufhr4ootbxF4l_W14KBTxMIPse3vdoSvRZQ" />
    </Head>
    <div>
      <HomePage />
      <PostCategory />

      <br />
    </div>

    </>
  );
}

export default Home;