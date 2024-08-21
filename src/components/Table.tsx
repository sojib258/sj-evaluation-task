"use client";
import { useUser } from "@/context/UserContext";
import type { TableProps } from "antd";
import { Button, message, Table } from "antd";
import { useState } from "react";

interface DataType {
  key: string;
  id: number;
  name: string;
  phone: number;
  email: string;
  city: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Email",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "City",
    key: "city",
    dataIndex: "city",
  },
];

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    if (user?.loggedin) {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();

        const customizedData = data.map((user: any) => ({
          key: user.id,
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          city: user.address.city,
        }));
        setData(customizedData);
      } catch (error) {
        message.error("Error when fetching data!");
      } finally {
        setLoading(false);
      }
    } else {
      message.error("You have to login first for fetching data");
    }
  };

  return (
    <>
      <Table
        pagination={{ pageSize: 5 }}
        loading={loading}
        columns={columns}
        dataSource={data}
      />
      <Button
        disabled={loading}
        type="primary"
        style={{ fontWeight: "bold" }}
        onClick={handleFetchData}
      >
        Fetch Data
      </Button>
    </>
  );
};

export default App;
