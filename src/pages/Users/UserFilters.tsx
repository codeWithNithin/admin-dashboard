import { Card, Col, Input, Row, Select } from "antd";

type UserFilterProps = {
  onFilterChange: (filterName: string, filterValue: string) => void;
  // onAddUserBtnClick: (openDrawer: boolean) => void;
  children?: React.ReactNode;
};

const UserFilters = ({ onFilterChange, children }: UserFilterProps) => {
  return (
    <Card>
      <Row justify="space-between">
        {/* left */}
        <Col span={16}>
          <Row gutter={16}>
            <Col span={8}>
              <Input.Search
                allowClear={true}
                placeholder="search users"
                onChange={(e) => {
                  onFilterChange("userSearchQuery", e.target.value);
                }}
              />
            </Col>
            <Col span={8}>
              <Select
                title="Role"
                style={{ width: "100%" }}
                placeholder="Role"
                allowClear={true}
                onChange={(selectedItem) => {
                  onFilterChange("roleDropdown", selectedItem);
                }}
              >
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="manager">Manager</Select.Option>
                <Select.Option value="customer">Customer</Select.Option>
              </Select>
            </Col>
            <Col span={8}>
              <Select
                title="Role"
                style={{ width: "100%" }}
                placeholder="status"
                onChange={(selectedItem) => {
                  onFilterChange("statusDropdown", selectedItem);
                }}
              >
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="valid">Valid</Select.Option>
              </Select>
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
