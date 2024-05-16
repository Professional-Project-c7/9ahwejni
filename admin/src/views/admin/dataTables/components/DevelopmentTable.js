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
        const response = await axios.get("http://192.168.11.96:3000/api/user");
        const filteredData = response.data.filter(e => e.UserType === "client");
        setUserData(filteredData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://192.168.11.96:3000/api/user/${userId}`);
      setUserData(prevData => prevData.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert('Failed to delete user');
    }
  };

  const columns = useMemo(() => [
    {
      Header: "NAME",
      accessor: (row) => row.FirstName, 
    },
    {
      Header: "LAST NAME",
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
    <Card direction="column" w="100%" px="0px"  overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          Clients
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())} key={index}>
                  <Text fontSize="sm" fontWeight="600" >
                    {column.render("Header")}
                  </Text>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => (
                  <Td {...cell.getCellProps()} key={index} fontSize="sm" color="black">
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}