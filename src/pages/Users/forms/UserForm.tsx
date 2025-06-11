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
                  <Form.Item label="First Name" name="firstName">
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" name="email">
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="Security Info">
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item label="Password" name="password">
                    <Input size="large" type="password" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="Roles">
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item label="Role" name="role">
                    {/* <Input size="large" /> */}
                    <Select size="large" allowClear={true}>
                      <Select.Option value="admin">Admin</Select.Option>
                      <Select.Option value="customer">Customer</Select.Option>
                      <Select.Option value="manager">Manager</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Restoraunt" name="tenantid">
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
