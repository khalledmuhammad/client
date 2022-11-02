import { useContext } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Typography,
  List,
  Avatar,
  Divider,
  Button,
} from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../context/theme";
import { ShareSocial } from "react-share-social";
import useCategory from "../../hooks/useCategory";
import useLatestPosts from "../../hooks/useLatestPosts";


const { Title } = Typography;

const { Meta } = Card;

export const SinglePost = ({ post }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  // hooks
  const { categories } = useCategory();
  const { latestPosts } = useLatestPosts();


  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta description={post.content.substring(0, 160)} />
      </Head>
      <Row>
        <Col xs={24} xl={16}>
          <Card
            cover={
              <img
                src={post?.featuredImage?.url || "/images/default.jpeg"}
                alt={post.title}
              />
            }
          >
            <Title>{post.title}</Title>
            <p>
              {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")} / 0 Comments
              / in{" "}
              {post?.categories.map((c) => (
                <span key={c._id}>
                  <Link href={`/category/${c.slug}`}>
                    <a>{c.name} </a>
                  </Link>
                </span>
              ))}
            </p>

            <div style={{ marginTop: "-20px", marginBottom: "15px" }}>
              <ShareSocial
                url={process.browser && window.location.href}
                socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
                style={{
                  height: "100px",
                  overflow: "hidden",
                  background: "none",
                }}
              />
            </div>

            <Editor
              defaultValue={post.content}
              dark={theme === "light" ? false : true}
              readOnly={true}
            />
          </Card>
        </Col>

        <Col xs={22} xl={6} offset={1}>
          <Divider>Categories</Divider>
          {categories.map((c) => (
            <Link href={`/category/${c.slug}`} key={c._id}>
              <a>
                <Button style={{ margin: 2 }}>{c.name}</Button>
              </a>
            </Link>
          ))}
           <Divider>Latest Posts</Divider>
          {latestPosts.map((p) => (
            <Link href={`/post/${p.slug}`} key={p._id}>
              <a>
                <h4>{p.title}</h4>
              </a>
            </Link>
          ))}
          
        </Col>
      </Row>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${process.env.API}/post/${params.slug}`);
  return {
    props: {
      post: data,
    },
  };
}

export default SinglePost;
