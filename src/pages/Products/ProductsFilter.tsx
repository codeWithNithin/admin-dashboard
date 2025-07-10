import { useQuery } from "@tanstack/react-query";
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
import { getAllCategories, getAllRestoraunts } from "../../http/api";
import type { Category, Tenant } from "../../types";

type ProductFilterProps = {
  // onAddUserBtnClick: (openDrawer: boolean) => void;
  children?: React.ReactNode;
};

const ProductsFilter = ({ children }: ProductFilterProps) => {
  const { data: restoraunts } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => {
      return getAllRestoraunts(`perPage=100&curentPage=1`).then(
        (res) => res.data
      );
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return getAllCategories().then((res) => {
        console.log("res", res);
        return res.data;
      });
    },
  });

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
                  placeholder="select Category"
                  allowClear={true}
                >
                  {categories?.data?.map((element: Category) => {
                    return (
                      <Select.Option key={element._id} value={element._id}>
                        {element.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="tenantId">
                <Select
                  title="tenantId"
                  style={{ width: "100%" }}
                  placeholder="select tenant"
                  allowClear={true}
                >
                  {restoraunts?.data?.map((element: Tenant) => {
                    return (
                      <Select.Option key={element.id} value={element.id}>
                        {element.name}
                      </Select.Option>
                    );
                  })}
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
