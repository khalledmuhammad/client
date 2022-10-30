import TopNav from "../components/TopNav";
import { ThemeProvider } from "../context/theme";
import { AuthProvider } from "../context/auth";
import { PostProvider } from "../context/post";

import "../public/css/styles.css";
import  {Toaster} from "react-hot-toast";



function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PostProvider>
      <Toaster />
      <TopNav />
      <Component {...pageProps} />
      </PostProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
