import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getAllUsers } from "../../http/api";
import type { CreateUserData, User } from "../../types";
import { useAuthStore } from "../../store";
import UserFilters from "./UserFilters";
import { useState } from "react";
import UserForm from "./forms/UserForm";

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
  const [form] = Form.useForm();
  const { user } = useAuthStore();
  const [openDrawer, setOpenDrawer] = useState(false);
  const queryClient = useQueryClient();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

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

  const { mutate: userMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: CreateUserData) =>
      createUser(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onFormSubmit = async () => {
    // validate all the fields
    await form.validateFields();
    userMutate(form.getFieldsValue());
    setOpenDrawer(false);
  };

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
          styles={{ body: { backgroundColor: colorBgLayout } }}
          width={720}
          onClose={() => {
            setOpenDrawer(false);
            form.resetFields();

            console.log("closing...");
          }}
          extra={
            <Space>
              <Button
                onClick={() => {
                  form.resetFields();
                  setOpenDrawer(false);
                }}
              >
                {" "}
                Cancel{" "}
              </Button>
              <Button type="primary" onClick={onFormSubmit}>
                {" "}
                Submit{" "}
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" form={form}>
            <UserForm />
          </Form>
        </Drawer>

        <Table columns={columns} dataSource={users} rowKey={"id"} />
      </Space>
    </div>
  );
};

export default Users;
