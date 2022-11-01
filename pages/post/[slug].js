import { useContext } from "react";
import axios from "axios";
import { Row, Col, Card, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../context/theme";

const { Title } = Typography;

const { Meta } = Card;

export const SinglePost = ({ post }) => {
  const [theme, setTheme] = useContext(ThemeContext);

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

            <Editor
              defaultValue={post.content}
              dark={theme === "light" ? false : true}
              readOnly={true}
            />
          </Card>
        </Col>

        <Col xs={22} xl={6} offset={1}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem aut
          cumque molestias minima blanditiis ipsa ipsum illum, eius quibusdam
          voluptatum. Deleniti iure corporis temporibus ipsum architecto
          quibusdam maxime atque illum obcaecati aut, quasi eveniet sapiente.
          Explicabo minus voluptates fugiat quas esse minima sit soluta, eaque
          sapiente a, beatae expedita qui necessitatibus animi, debitis
          molestiae placeat excepturi officia? Dolore sed non esse, facilis
          dolorum voluptatum aliquid natus laudantium amet numquam consequuntur
          neque quod repudiandae facere recusandae vitae deleniti minima
          dolores. Enim voluptates ratione consequatur, voluptatibus hic
          cupiditate odit exercitationem dolore provident animi iste laboriosam
          corporis accusantium accusamus expedita ut doloribus! Rem.
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
