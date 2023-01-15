import { useContext, useState, useEffect } from "react";
import { Layout, Row, Col, Input, Select, Modal, Button, Image } from "antd";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../context/theme";
import axios from "axios";
import { uploadImage } from "../../functions/upload";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { UploadOutlined } from "@ant-design/icons";
import Media from "../media";
import { MediaContext } from "../../context/media";

const { Option } = Select;
const { Content, Sider } = Layout;

function NewPostComponent({ page = "admin" }) {
  // load from local storage
  const savedTitle = () => {
    if (process.browser) {
      if (localStorage.getItem("post-title")) {
        return JSON.parse(localStorage.getItem("post-title"));
      }
    }
  };
  const savedmetaTitle = () => {
    if (process.browser) {
      if (localStorage.getItem("post-metaTitle")) {
        return JSON.parse(localStorage.getItem("post-metaTitle"));
      }
    }
  };
  const savedmetaDescc = () => {
    if (process.browser) {
      if (localStorage.getItem("post-metaDesc")) {
        return JSON.parse(localStorage.getItem("post-metaDesc"));
      }
    }
  };

  const saveSchema = () => {
    if (process.browser) {
      if (localStorage.getItem("post-Schema")) {
        return JSON.parse(localStorage.getItem("post-Schema"));
      }
    }
  };


  const savedContent = () => {
    if (process.browser) {
      if (localStorage.getItem("post-content")) {
        return JSON.parse(localStorage.getItem("post-content"));
      }
    }
  };
  // context
  const [theme, setTheme] = useContext(ThemeContext);
  const [media, setMedia] = useContext(MediaContext);
  // state
  const [title, setTitle] = useState(savedTitle());
  const [metaTitle, setmetaTitle] = useState(savedmetaTitle());
  const [metaDesc, setmetaDesc] = useState(savedmetaDescc());
  const [Schema, setSchema] = useState(saveSchema());

  const [content, setContent] = useState(savedContent());
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // media Modal
  // const [visibleMedia, setVisibleMedia] = useState(false);
  // hook
  const router = useRouter();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setLoadedCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/create-post", {
        title,
        content,
        categories,
        metaDesc,
        metaTitle,
        Schema,
        featuredImage: media?.selected?._id,
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        // console.log("POST PUBLISHED RES => ", data);
        toast.success("Post created successfully");
        localStorage.removeItem("post-title");
        localStorage.removeItem("post-metaTitle");
        localStorage.removeItem("post-metaDesc");
        localStorage.removeItem("post-content");
        localStorage.removeItem("post-Schema");
        setMedia({ ...media, selected: null });
        router.push(`/${page}/posts`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Post create failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={14} offset={1}>
        <h1>Create new post</h1>
        <Input
          size="large"
          value={title}
          placeholder="Give your post a title"
          onChange={(e) => {
            setTitle(e.target.value);
            localStorage.setItem("post-title", JSON.stringify(e.target.value));
          }}
        />
                <br />
                <br />


        <Input
          size="large"
          value={metaTitle}
          placeholder="Add meta Title"
          onChange={(e) => {
            setmetaTitle(e.target.value);
            localStorage.setItem("post-metaTitle", JSON.stringify(e.target.value));
          }}
        />
                <br />
                <br />


        <Input
          size="large"
          value={metaDesc}
          placeholder="Add meta Description"
          onChange={(e) => {
            setmetaDesc(e.target.value);
            localStorage.setItem("post-metaDesc", JSON.stringify(e.target.value));
          }}
        />
        <br />
        <br />
        <Input
          size="large"
          value={Schema}
          placeholder="Add Schema"
          onChange={(e) => {
            setSchema(e.target.value);
            localStorage.setItem("post-Schema", JSON.stringify(e.target.value));
          }}
        />
        <br />
        <br />
        <div className="editor-scroll">
          <Editor
            dark={theme === "light" ? false : true}
            defaultValue={content}
            onChange={(v) => {
              setContent(v());
              localStorage.setItem("post-content", JSON.stringify(v()));
            }}
            uploadImage={uploadImage}
          />
        </div>

        <br />
        <br />

        {/* <pre>{JSON.stringify(loadedCategories, null, 4)}</pre> */}
      </Col>

      <Col span={6} offset={1}>
        <Button
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          onClick={() => setVisible(true)}
        >
          Preview
        </Button>

        <Button
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          onClick={() => setMedia({ ...media, showMediaModal: true })}
        >
          <UploadOutlined /> Featured Image
        </Button>

        <h4>Categories</h4>

        <Select
          mode="multiple"
          allowClear={true}
          placeholder="Select categories"
          style={{ width: "100%" }}
          onChange={(v) => setCategories(v)}
        >
          {loadedCategories.map((item) => (
            <Option key={item.name}>{item.name}</Option>
          ))}
        </Select>

        {media?.selected && (
          <div style={{ marginTop: "15px" }}>
            <Image width="100%" src={media?.selected?.url} />
          </div>
        )}

        <Button
          loading={loading}
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          type="primary"
          onClick={handlePublish}
        >
          Publish
        </Button>
      </Col>
      {/* preview modal */}
      <Modal
        title="Preview"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={720}
        footer={null}
      >
        <h1>{title}</h1>
        <Editor
          dark={theme === "light" ? false : true}
          defaultValue={content}
          readOnly={true}
        />
      </Modal>
      {/* media modal */}
      <Modal
        visible={media.showMediaModal}
        title="Media"
        onOk={() => setMedia({ ...media, showMediaModal: false })}
        onCancel={() => setMedia({ ...media, showMediaModal: false })}
        width={720}
        footer={null}
      >
        <Media />
      </Modal>
    </Row>
  );
}

export default NewPostComponent;