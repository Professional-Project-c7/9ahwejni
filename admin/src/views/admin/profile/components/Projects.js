import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Box } from "@chakra-ui/react";
import { useTable } from 'react-table';
import axios from 'axios';
import Card from 'components/card/Card.js';

export default function Projects() {
  const [Rapport, setRapport] = useState([]);

  const fetchRapports = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/Rapport`);
      setRapport(response.data.reverse());
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchRapports();
  }, []);

  const data = React.useMemo(() => Rapport, [Rapport]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'user',
        accessor: (row) => row.userId,// accessor is the "key" in the data
      },
      {
        Header: 'Description',
        accessor: (row) => row.Description,
      },
      {
        Header: 'Date',
        accessor:(row) => row.updatedAt,
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Box overflowX="auto">
        <Table {...getTableProps()}>
          <TableCaption>Projects</TableCaption>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
