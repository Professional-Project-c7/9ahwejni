import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { DeleteIcon } from "@chakra-ui/icons";

export default function DevelopmentTable() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/api/user");
        const filteredData = response.data.filter(e => e.UserType === "coffee");
        setUserData(filteredData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/${userId}`);
      setUserData(prevData => prevData.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert('Failed to delete user');
    }
  };

  const columns = useMemo(() => [
    {
      Header: "Coffee Name",
      accessor: (row) => row.FirstName, 
    },
    {
      Header: "Shop Owner",
      accessor:  (row) => row.LastName,
    },
    {
      Header: "DATE",
      accessor: (row) => row.createdAt,
    },
    {
      Header: "ACTION",
      accessor: "id",
      Cell: ({ value }) => (
        <Button onClick={() => deleteUser(value)} colorScheme="red">
          <DeleteIcon />
        </Button>
      )
    },
  ], []);

  const data = useMemo(() => userData, [userData]);

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = tableInstance;

  const textColor = useColorModeValue("gray.700", "white");

  return (
  <></>
  );
}