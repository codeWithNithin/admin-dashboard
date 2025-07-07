import {
  Breadcrumb,
  Button,
  Drawer,
  Form,
  Space,
  Spin,
  Table,
  theme,
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createUser, getAllUsers, updateUser } from "../../http/api";
import type { CreateUserData, FieldData, User } from "../../types";
import { useAuthStore } from "../../store";
import UserFilters from "./UserFilters";
import React, { useEffect, useState } from "react";
import UserForm from "./forms/UserForm";
import { PER_PAGE } from "../../constant";
import { debounce } from "lodash";

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
    title: "Tenant",
    dataIndex: "tenant",
    key: "tenant",
    render: (_text: string, record: User) => {
      return <div>{record.tenant?.name}</div>;
    },
  },
];

const Users = () => {
  const [form] = Form.useForm();
  const [filtersForm] = Form.useForm();

  const { user } = useAuthStore();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [editUserData, setEditUserData] = useState<User | null>(null);

  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState({
    currentPage: 1,
    perPage: PER_PAGE,
  });

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  useEffect(() => {
    if (editUserData) {
      setOpenDrawer(true);
      form.setFieldsValue({
        ...editUserData,
        tenantId: editUserData?.tenant?.id,
      });
    }
  }, [editUserData, form]);

  const {
    data: users,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => {
          return !!item[1];
        })
      );

      const queryStrimg = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();
      return getAllUsers(queryStrimg).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const { mutate: userMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: CreateUserData) =>
      createUser(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { mutate: updateUserMutate } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (data: CreateUserData) =>
      updateUser(data, String(editUserData!.id)).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });


  const onFormSubmit = async () => {
    // validate all the fields
    await form.validateFields();

    const isEdit = !!editUserData;

    if (isEdit) {
      // updating
      await updateUserMutate(form.getFieldsValue());
    } else {
      // creating
      await userMutate(form.getFieldsValue());
    }

    form.resetFields();

    setOpenDrawer(false);
    setEditUserData(null);
  };

  const debouncedQUpdate = React.useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value, currentPage: 1 }));
    }, 500);
  }, []);

  const onFilterChange = (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields
      .map((item) => {
        return {
          [item.name[0]]: item.value,
        };
      })
      .reduce((acc, item) => ({ ...acc, ...item }), {});

    if ("q" in changedFilterFields) {
      debouncedQUpdate(changedFilterFields.q);
    } else {
      setQueryParams({
        ...queryParams,
        ...changedFilterFields,
        currentPage: 1,
      });
    }
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

        {isFetching && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        )}
        {isError && <div> {error.message} </div>}

        <Form form={filtersForm} onFieldsChange={onFilterChange}>
          <UserFilters>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpenDrawer(true)}
            >
              Add User
            </Button>
          </UserFilters>
        </Form>

        <Drawer
          title={editUserData ? "Edit User" : "Create User"}
          closable={{ "aria-label": "Close Button" }}
          open={openDrawer}
          destroyOnClose={true}
          styles={{ body: { backgroundColor: colorBgLayout } }}
          width={720}
          onClose={() => {
            setOpenDrawer(false);
            form.resetFields();
            setEditUserData(null);
          }}
          extra={
            <Space>
              <Button
                onClick={() => {
                  form.resetFields();
                  setOpenDrawer(false);
                  setEditUserData(null);
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
            <UserForm isEdit={!!editUserData} />
          </Form>
        </Drawer>

        <Table
          columns={[
            ...columns,
            {
              title: "Actions",
              dataIndex: "actions",
              render: (_: string, record: User) => {
                return (
                  <Space>
                    <Button
                      type="link"
                      onClick={() => {
                        setEditUserData(record);
                      }}
                    >
                      {" "}
                      Edit{" "}
                    </Button>
                  </Space>
                );
              },
            },
          ]}
          dataSource={users?.data}
          rowKey={"id"}
          pagination={{
            total: users?.total,
            current: queryParams.currentPage,
            pageSize: queryParams.perPage,
            onChange: (page: number) => {
              setQueryParams({ ...queryParams, currentPage: page });
            },
            showTotal: (total: number, range: number[]) => {
              return `Showing ${range[0]}-${range[1]} of ${total} items`;
            },
          }}
        />
      </Space>
    </div>
  );
};

export default Users;
