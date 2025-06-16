import { Card, Col, Form, Input, Row } from "antd";

type RestroFilterProps = {
  children?: React.ReactNode;
};

const RestroFilter = ({ children }: RestroFilterProps) => {
  return (
    <div>
      <Card>
        <Row justify="space-between">
          {/* left */}
          <Col span={16}>
            <Row gutter={16}>
              {/* search filter */}
              <Col span={8}>
                <Form.Item name="q">
                  <Input.Search
                    placeholder="Search by restoraunt name"
                    allowClear={true}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          {/* right */}
          <Col span={8} style={{ display: "flex", justifyContent: "flex-end" }}>
            {children}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default RestroFilter;
