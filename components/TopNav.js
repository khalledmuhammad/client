import { useState, useContext } from "react";
import {  Menu } from "antd";
import {
  AppstoreOutlined,
  DatabaseOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";

const { SubMenu } = Menu;

const TopNav = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  // hooks
  const router = useRouter();

  const signOut = () => {
    // remove from local storage
    localStorage.removeItem("auth");
    // remove from context
    setAuth({
      user: null,
      token: "",
    });
    // redirect to login
    router.push("/signin");
  };

  const roleBasedLink = () => {
    if (auth.user?.role === "Admin") {
      return "/admin";
    } else if (auth.user?.role === "Author") {
      return "/author";
    } else {
      return "/subscriber";
    }
  };

  return (
    <Menu
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="appitunity" >
        <Link href="https://yourappitunity.co.uk/">
        <img width="140px" style={{padding:10 , cursor:"pointer"}}  src="/images/LOGO.svg" />
        </Link>
        </Menu.Item>
     
      <Menu.Item key="mail" icon={<AppstoreOutlined />}>
        <Link href="/">
          <a>CMS</a>
        </Link>
      </Menu.Item>

      <Menu.Item key="posts" icon={<DatabaseOutlined />}>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
      </Menu.Item>

      {auth?.user === null && (
        <>
          <Menu.Item
            style={{ marginLeft: "auto" }}
            key="signup"
            icon={<UserAddOutlined />}
          >
            <Link href="/signup">
              <a>Signup</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="signin" icon={<UserOutlined />}>
            <Link href="/signin">
              <a>Signin</a>
            </Link>
          </Menu.Item>
        </>
      )}

      {auth?.user !== null && (
        <>
          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title={auth?.user?.name || "Dashboard"}
            style={{ marginLeft: "auto" }}
          >
              <Menu.Item key="setting:2">
                <Link href={roleBasedLink()}>
                  <a>Dashboard</a>
                </Link>
              </Menu.Item>
          </SubMenu>

          <Menu.Item
            onClick={() => signOut()}
            key="signout"
            icon={<LogoutOutlined />}
          >
            <a>Sign out</a>
          </Menu.Item>
        </>
      )}

      <Menu.Item>
        <ToggleTheme />
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;