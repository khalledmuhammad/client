import React from 'react'
import useCategory from "../../hooks/useCategory";
import { Row, Col, Divider, Button } from "antd";
import Link from "next/link";
import Head from 'next/head';




const PostCategory = () => {
    const { categories } = useCategory();

  return (
    <>
    
    <Head>
        <title>Modern Content Management System - CMS</title>
        <meta
          name="description"
          content="Read latest blog posts on web development"
        />
      </Head>
      <Row>
        <Col
          span={24}
          style={{ textAlign: "center", marginTop: 80, marginBottom: 80 }}
        >
          <Divider>CATEGORIES</Divider>
          <div style={{ textAlign: "center" }}>
            {categories.map((c) => (
              <Link href={`/category/${c.slug}`} key={c._id}>
                <a>
                  <Button style={{ margin: 2 }}>{c.name}</Button>
                </a>
              </Link>
            ))}
          </div>
        </Col>
      </Row>
    </>
  )
}



export default PostCategory