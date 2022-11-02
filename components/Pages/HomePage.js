import React from 'react'
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
  

    <div
      style={{
        textAlign: "center",
      }}
      className="homeContainer"
    >
      <div className="logo-background">
        <div className='content'>
      <h1>APPITUNITY BLOGS</h1>
      <p style={{ fontSize: "18px" }}>
        Content Management System
      </p>
      <Link href="/posts">
        <a>
          <Button type="primary" size="large" icon={<SendOutlined />}>
            BLOGS
          </Button>
        </a>
      </Link>
      </div>
      </div>
    </div>
  </>
  )
}

export default HomePage
