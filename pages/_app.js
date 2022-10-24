import TopNav from "../components/TopNav";
import { ThemeProvider } from "../context/theme";
import "../public/css/styles.css";


function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <TopNav />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
