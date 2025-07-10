import { Breadcrumb, Button, Form, Space } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import ProductsFilter from "./ProductsFilter";

const Products = () => {
//   const [form] = Form.useForm();
  const [filtersForm] = Form.useForm();
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

      <Form form={filtersForm} onFieldsChange={() => {}}>
        <ProductsFilter>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {}}>
            Add Product
          </Button>
        </ProductsFilter>
      </Form>
    </Space>
  );
};

export default Products;
