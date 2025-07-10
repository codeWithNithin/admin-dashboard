import {
  Breadcrumb,
  Button,
  Form,
  Image,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import ProductsFilter from "./ProductsFilter";
import type { FieldData, Product } from "../../types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../http/api";
import { useMemo, useState } from "react";
import { PER_PAGE } from "../../constant";
import { format } from "date-fns";
import { debounce } from "lodash";
import { useAuthStore } from "../../store";

const columns = [
  {
    title: "Product name",
    dataIndex: "name",
    key: "name",
    render: (_: string, record: Product) => {
      return (
        <Space>
          <Image width={60} src={record?.url} preview={false}></Image>
          <Typography.Text> {record?.name} </Typography.Text>
        </Space>
      );
    },
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Status",
    dataIndex: "isPublish",
    key: "isPublish",
    render: (_: string, record: Product) => {
      return record?.isPublish ? (
        <Tag color="green"> Published </Tag>
      ) : (
        <Tag color="red"> Unpublished </Tag>
      );
    },
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => {
      return (
        <Typography.Text>
          {format(new Date(text), "dd-MM-yyyy hh:mm:ss")}
        </Typography.Text>
      );
    },
  },
];

const Products = () => {
  //   const [form] = Form.useForm();
  const [filtersForm] = Form.useForm();

  const { user } = useAuthStore();

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: PER_PAGE,
    tenantId: user?.role === "manager" ? user?.tenant?.id : undefined,
  });

  const [editUserData, setEditUserData] = useState<Product | null>(null);

  const { data: products } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => {
          return !!item[1];
        })
      );

      const queryStrimg = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();
      return getAllProducts(queryStrimg).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const debouncedQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value, page: 1 }));
    }, 500);
  }, []);

  const onFilterchange = (changedFields: FieldData[]) => {
    console.log("changedFields", changedFields);

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
        page: 1,
      });
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          {
            title: <Link to="/">Dashboard</Link>,
          },
          {
            title: "Products",
          },
        ]}
      />

      <Form form={filtersForm} onFieldsChange={onFilterchange}>
        <ProductsFilter>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {}}>
            Add Product
          </Button>
        </ProductsFilter>
      </Form>

      <Table
        columns={[
          ...columns,
          {
            title: "Actions",
            dataIndex: "actions",
            render: (_: string, record: Product) => {
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
        dataSource={products?.data}
        rowKey={"_id"}
        pagination={{
          total: products?.total,
          current: queryParams.page,
          pageSize: queryParams.limit,
          onChange: (page: number) => {
            setQueryParams({ ...queryParams, page: page });
          },
          showTotal: (total: number, range: number[]) => {
            return `Showing ${range[0]}-${range[1]} of ${total} items`;
          },
        }}
      />
    </Space>
  );
};

export default Products;
