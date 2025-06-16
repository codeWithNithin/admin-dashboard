import { Card, Col, Form, Input, Row } from "antd";

const RestorauntForm = () => {
  return (
    <Card title="Basic Info">
      <Row>
        <Col span={24}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Restoraunt name is Required !!!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Restoraunt name is Required !!!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default RestorauntForm;
