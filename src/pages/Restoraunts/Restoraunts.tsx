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
import {
  keepPreviousData,
  QueryClient,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { createRestoraunt, getAllRestoraunts } from "../../http/api";
import RestroFilter from "./RestroFilter";
import { useMemo, useState } from "react";
import { useAuthStore } from "../../store";
import { Navigate } from "react-router-dom";
import RestorauntForm from "./forms/RestorauntForm";
import type { CreateRestorauntData, FieldData } from "../../types";
import { PER_PAGE } from "../../constant";
import { debounce } from "lodash";

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
  const [queryParams, setQueryParams] = useState({
    currentPage: 1,
    perPage: PER_PAGE,
  });

  const { user } = useAuthStore();

  const [restorauntForm] = Form.useForm();
  const [filterForm] = Form.useForm();

  const queryClient = new QueryClient();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const {
    data: restoraunts,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["tenants", queryParams],
    queryFn: async () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => {
          console.log("item in entries", item);
          return !!item[1];
        })
      );
      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();
      return getAllRestoraunts(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const { mutate: createUserMutate } = useMutation({
    mutationKey: ["createTenant"],
    mutationFn: async (data: CreateRestorauntData) => {
      return createRestoraunt(data).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
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

  const debouncedQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value, currentPage: 1 }));
    }, 500);
  }, []);

  const onFilterChange = (fieldChanges: FieldData[]) => {
    console.log("fieldChanges", fieldChanges);

    // modify the fields into proper format
    const changedFilterFields = fieldChanges
      .map((item) => {
        return {
          [item.name[0]]: item.value,
        };
      })
      .reduce((acc, item) => ({ ...acc, ...item }), {});

    console.log("changedFilterFields", changedFilterFields);

    if (changedFilterFields.q) {
      // debounce logic
      debouncedQUpdate(changedFilterFields.q);
    } else {
      setQueryParams({
        ...queryParams,
        ...changedFilterFields,
        currentPage: 1,
      });
    }
  };

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
        <Table
          dataSource={restoraunts?.data}
          columns={columns}
          rowKey={"id"}
          pagination={{
            total: restoraunts?.count,
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
        ;
      </Space>
    </div>
  );
};

export default Restoraunts;
