import { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const response = await fetch("https://blogs.yourappitunity.co.uk/api/Allposts");
  const posts = await response.json();


  const fields = posts.map((post) => ({
    loc: `https://blogs.yourappitunity.co.uk/api/Allposts/${post.slug}`,
    lastmod: new Date().toISOString(),
  }));
  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
