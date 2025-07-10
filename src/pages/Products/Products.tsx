import { Breadcrumb, Space } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";

const Products = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          {
            title: <Link to="/">Dashboard</Link>,
          },
          {
            title: "Products",
          },
        ]}
      />
    </Space>
  );
};

export default Products;
