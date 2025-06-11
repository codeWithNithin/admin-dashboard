import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../http/api";
import type { User } from "../../types";
import { useAuthStore } from "../../store";
import UserFilters from "./UserFilters";
import { useState } from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (_text: string, record: User) => {
      return (
        <div>
          {record.firstName} {record.lastName}
        </div>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const Users = () => {
  const { user } = useAuthStore();
  const [openDrawer, setOpenDrawer] = useState(false);

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      console.log(getAllUsers().then((res) => res.data));
      return getAllUsers().then((res) => res.data);
    },
  });

  if (user === null) return <Navigate to="/" replace={true} />;

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Breadcrumb
          separator={<RightOutlined />}
          items={[
            {
              title: <Link to="/">Dashboard</Link>,
            },
            {
              title: "Users",
            },
          ]}
        />

        {isLoading && <div> Loading... </div>}
        {isError && <div> {error.message} </div>}

        <UserFilters
          onFilterChange={(filterName, filterValue) => {
            console.log(filterName, filterValue);
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenDrawer(true)}
          >
            Add User
          </Button>
        </UserFilters>

        <Drawer
          title="Create User"
          closable={{ "aria-label": "Close Button" }}
          open={openDrawer}
          destroyOnClose={true}
          width={720}
          onClose={() => {
            setOpenDrawer(false);
            console.log("closing...");
          }}
          extra={
            <Space>
              <Button> Cancel </Button>
              <Button type="primary"> Submit </Button>
            </Space>
          }
        ></Drawer>

        <Table columns={columns} dataSource={users} rowKey={"id"} />
      </Space>
    </div>
  );
};

export default Users;
