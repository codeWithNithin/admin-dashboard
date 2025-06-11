import { Card, Col, Input, Row, Select } from "antd";

type RestroFilterProps = {
  children?: React.ReactNode;
  onfilterChange: (filterName: string, filterValue: string) => void;
};

const RestroFilter = ({ children, onfilterChange }: RestroFilterProps) => {
  return (
    <div>
      <Card>
        <Row justify="space-between">
          {/* left */}
          <Col span={16}>
            <Row gutter={16}>
              {/* search filter */}
              <Col span={8}>
                <Input.Search
                  placeholder="Search by restoraunt name"
                  onChange={(e) =>
                    onfilterChange("restroSearchQuery", e.target.value)
                  }
                />
              </Col>
              {/* name dropdown */}
              <Col span={8}>
                <Select
                  placeholder="Restoraunt name"
                  style={{ width: "100%" }}
                  onChange={(selectedItem) => {
                    onfilterChange("nameDropdown", selectedItem);
                  }}
                >
                  <Select.Option value="sample">Sample</Select.Option>
                  <Select.Option value="sample">Sample</Select.Option>
                  <Select.Option value="sample">Sample</Select.Option>
                </Select>
              </Col>
              {/* address dropdown */}
              <Col span={8}>
                <Select
                  placeholder="Restoraunt Address"
                  style={{ width: "100%" }}
                  onChange={(selectedItem) => {
                    onfilterChange("addressDropdown", selectedItem);
                  }}
                >
                  <Select.Option value="sample">Sample</Select.Option>
                  <Select.Option value="sample">Sample</Select.Option>
                  <Select.Option value="sample">Sample</Select.Option>
                </Select>
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
