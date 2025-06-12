import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getAllRestoraunts } from "../../../http/api";
import { useQuery } from "@tanstack/react-query";
import type { Tenant } from "../../../types";

const UserForm = () => {
  const { data: restoraunts } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => {
      return getAllRestoraunts().then((res) => res.data);
    },
  });

  return (
    <div>
      <Row>
        <Col span={24}>
          <Space direction="vertical" size="large">
            <Card title="Basic Info">
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "First name is required!!!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Last name is required!!!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Email is required!!!",
                      },
                      {
                        type: "email",
                        message: "Please enter a valid email",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="Security Info">
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Password is required!!!",
                      },
                    ]}
                  >
                    <Input size="large" type="password" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="Roles">
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="Role"
                    name="role"
                    rules={[
                      {
                        required: true,
                        message: "Role is required!!!",
                      },
                    ]}
                  >
                    {/* <Input size="large" /> */}
                    <Select size="large" allowClear={true}>
                      <Select.Option value="admin">Admin</Select.Option>
                      <Select.Option value="customer">Customer</Select.Option>
                      <Select.Option value="manager">Manager</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Restoraunt"
                    name="tenantid"
                    rules={[
                      {
                        required: true,
                        message: "Restoraunt is required!!!",
                      },
                    ]}
                  >
                    <Select size="large" allowClear={true}>
                      {restoraunts?.map((restoraunt: Tenant) => (
                        <Select.Option
                          key={restoraunt.id}
                          value={restoraunt.id}
                        >
                          {restoraunt.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default UserForm;
