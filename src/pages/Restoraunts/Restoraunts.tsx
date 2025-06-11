import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getAllRestoraunts } from "../../http/api";
import RestroFilter from "./RestroFilter";
import { useState } from "react";
import { useAuthStore } from "../../store";
import { Navigate } from "react-router-dom";

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

  const {
    data: restoraunts,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => {
      return getAllRestoraunts().then((res) => res.data);
    },
  });

  if (user?.role !== "admin") return <Navigate to="/" replace={true} />;

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Breadcrumbs */}
        <Breadcrumb separator={<RightOutlined />}>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item> Restoraunts </Breadcrumb.Item>
        </Breadcrumb>
        {isLoading && <div> Loading... </div>}
        {isError && <div> {error.message} </div>}
        {/* filters */}
        <RestroFilter
          onfilterChange={(filterName, filterValue) => {
            console.log(filterName, filterValue);
          }}
        >
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
        {/* Drawer */}
        <Drawer
          width={720}
          title="Create Restroraunt"
          onClose={() => {
            setOpenDrawer(false);
            console.log("closing...");
          }}
          open={openDrawer}
          extra={
            <Space>
              <Button> Cancel </Button>
              <Button type="primary"> Submit </Button>
            </Space>
          }
        ></Drawer>
        {/* table */}
        <Table dataSource={restoraunts} columns={columns} rowKey={"id"} />;
      </Space>
    </div>
  );
};

export default Restoraunts;
