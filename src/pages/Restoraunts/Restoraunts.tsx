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
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createRestoraunt,
  getAllRestoraunts,
  updateRestoraunt,
} from "../../http/api";
import RestroFilter from "./RestroFilter";
import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "../../store";
import { Navigate } from "react-router-dom";
import RestorauntForm from "./forms/RestorauntForm";
import type { CreateRestorauntData, FieldData, Tenant } from "../../types";
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

  const [editRestorauntData, seteditRestorauntData] = useState<Tenant | null>(
    null
  );

  const { user } = useAuthStore();

  const [restorauntForm] = Form.useForm();
  const [filterForm] = Form.useForm();

  const queryClient = useQueryClient()

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  useEffect(() => {
    if (editRestorauntData) {
      console.log("editRestoraunt", editRestorauntData);
      setOpenDrawer(true);
      restorauntForm.setFieldsValue(editRestorauntData);
    }
  }, [editRestorauntData, restorauntForm]);

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

  const { mutate: createTenantMutate } = useMutation({
    mutationKey: ["createTenant"],
    mutationFn: async (data: CreateRestorauntData) => {
      return createRestoraunt(data).then((res) => res.data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
    },
  });

  const { mutate: updateRestorauntMutate } = useMutation({
    mutationKey: ["update-restoraunt"],
    mutationFn: async (data: CreateRestorauntData) => {
      return updateRestoraunt(data, String(editRestorauntData!.id)).then(
        (res) => res.data
      );
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
    },
  });

  // updateRestoraunt

  const onFormSubmit = async () => {
    await restorauntForm.validateFields();

    const isEdit = !!editRestorauntData;

    console.log("isEdit", isEdit);

    if (isEdit) {
      // updating
      await updateRestorauntMutate(restorauntForm.getFieldsValue());
    } else {
      // creating
      await createTenantMutate(restorauntForm.getFieldsValue());
    }

    // clear the fields
    restorauntForm.resetFields();

    // close the drawer
    setOpenDrawer(false);

    // clear the edit resto data
    seteditRestorauntData(null);
  };

  const debouncedQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value, currentPage: 1 }));
    }, 500);
  }, []);

  const onFilterChange = (fieldChanges: FieldData[]) => {
    // console.log("fieldChanges", fieldChanges);

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
            seteditRestorauntData(null);
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

                  seteditRestorauntData(null)
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
          columns={[
            ...columns,
            {
              title: "Actions",
              render: (_: string, record: Tenant) => {
                return (
                  <Space>
                    <Button
                      type="link"
                      onClick={() => {
                        seteditRestorauntData(record);
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
