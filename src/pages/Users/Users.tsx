import { Breadcrumb, Table, type TableProps } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const columns: TableProps<DataType>["columns"] = [
  {
    title: "user name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const Users = () => {
  return (
    <div>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          {
            title: <Link to='/'>Dashboard</Link>
          },
          {
            title: "Users",
          },
        ]}
      />
      <Table<DataType> columns={columns} dataSource={data} />
    </div>
  );
};

export default Users;
