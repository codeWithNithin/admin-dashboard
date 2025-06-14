import { Card, Col, Form, Input, Row, Select } from "antd";

type UserFilterProps = {
  // onAddUserBtnClick: (openDrawer: boolean) => void;
  children?: React.ReactNode;
};

const UserFilters = ({ children }: UserFilterProps) => {
  return (
    <Card>
      <Row justify="space-between">
        {/* left */}
        <Col span={16}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="q">
                <Input.Search allowClear={true} placeholder="search users" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='role'>
                <Select
                  title="Role"
                  style={{ width: "100%" }}
                  placeholder="Role"
                  allowClear={true}
                >
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="manager">Manager</Select.Option>
                  <Select.Option value="customer">Customer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              {/* <Form.Item>
                <Select
                  title="Role"
                  style={{ width: "100%" }}
                  placeholder="status"
                >
                  <Select.Option value="ban">Ban</Select.Option>
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="valid">Valid</Select.Option>
                </Select>
              </Form.Item> */}
            </Col>
          </Row>
        </Col>
        {/* right */}
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {/* <div>right side</div> */}
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default UserFilters;
