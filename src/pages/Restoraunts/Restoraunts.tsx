import { Breadcrumb, Button, Drawer, Form, Space, Spin, Table, theme } from "antd";
import { LoadingOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { createRestoraunt, getAllRestoraunts } from "../../http/api";
import RestroFilter from "./RestroFilter";
import { useState } from "react";
import { useAuthStore } from "../../store";
import { Navigate } from "react-router-dom";
import RestorauntForm from "./forms/RestorauntForm";
import type { CreateRestorauntData } from "../../types";

const columns = [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "name",
    dataIndex: "name",
    title: "Name",
  },
  {
    key: "address",
    dataIndex: "address",
    title: "Address",
  },
  {
    key: "createdAt",
    dataIndex: "createdAt",
    title: "Created at",
  },
];

const Restoraunts = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { user } = useAuthStore();

  const [restorauntForm] = Form.useForm();
  const [filterForm] = Form.useForm();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const {
    data: restoraunts,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => {
      return getAllRestoraunts().then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const { mutate: createUserMutate } = useMutation({
    mutationKey: ["createTenant"],
    mutationFn: async (data: CreateRestorauntData) => {
      return createRestoraunt(data).then((res) => res.data);
    },
  });

  const onFormSubmit = async () => {
    await restorauntForm.validateFields();

    // call the data to api
    createUserMutate(restorauntForm.getFieldsValue());

    // clear the fields
    restorauntForm.resetFields();

    // close the drawer
    setOpenDrawer(false);
  };

  const onFilterChange = () => {};

  if (user?.role !== "admin") return <Navigate to="/" replace={true} />;

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Breadcrumbs */}
        <Breadcrumb separator={<RightOutlined />}>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item> Restoraunts </Breadcrumb.Item>
        </Breadcrumb>
        {isFetching && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        )}
        {isError && <div> {error.message} </div>}
        {/* filters */}
        <Form form={filterForm} onFieldsChange={onFilterChange}>
          <RestroFilter>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              Add Restoraunt
            </Button>
          </RestroFilter>
        </Form>
        {/* Drawer */}
        <Drawer
          width={720}
          title="Create Restroraunt"
          onClose={() => {
            restorauntForm.resetFields();
            setOpenDrawer(false);
          }}
          open={openDrawer}
          extra={
            <Space>
              <Button
                onClick={() => {
                  // clear the fields
                  restorauntForm.resetFields();

                  // close the drawer
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
          styles={{ body: { backgroundColor: colorBgLayout } }}
        >
          <Form layout="vertical" form={restorauntForm}>
            <RestorauntForm />
          </Form>
        </Drawer>
        {/* table */}
        <Table dataSource={restoraunts} columns={columns} rowKey={"id"} />;
      </Space>
    </div>
  );
};

export default Restoraunts;
