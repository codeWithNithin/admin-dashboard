import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import React from "react";

type ProductFilterProps = {
  // onAddUserBtnClick: (openDrawer: boolean) => void;
  children?: React.ReactNode;
};

const ProductsFilter = ({ children }: ProductFilterProps) => {
  return (
    <Card>
      <Row justify="space-between">
        <Col span={21}>
          <Row justify="space-between" align="middle" gutter={16}>
            <Col span={6}>
              <Form.Item name="q">
                <Input.Search allowClear={true} placeholder="search" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="categoryId">
                <Select
                  title="categoryId"
                  style={{ width: "100%" }}
                  placeholder="Category"
                  allowClear={true}
                >
                  <Select.Option value="Pizza">Pizza</Select.Option>
                  <Select.Option value="Beverages">Beverages</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="tenantId">
                <Select
                  title="tenantId"
                  style={{ width: "100%" }}
                  placeholder="tenant"
                  allowClear={true}
                >
                  <Select.Option value="Pizza">Pizza hut</Select.Option>
                  <Select.Option value="Beverages">Burger King</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Space>
                <Form.Item name="isPublish">
                  <Switch defaultChecked={false} onChange={() => {}} />
                </Form.Item>
                <Typography.Text style={{ marginBottom: 22, display: "block" }}>
                  Show only published
                </Typography.Text>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={3}>{children}</Col>
      </Row>
    </Card>
  );
};

export default ProductsFilter;
