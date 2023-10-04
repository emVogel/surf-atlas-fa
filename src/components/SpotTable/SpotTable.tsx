import { memo } from "react";
import { Feature, Spot } from "../../shared/model/spot.interface";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "name" | "province" | "type" | "direction" | "swell" | "wind";
  label: string;
  minWidth: number;
  align?: "right" | "left";
  concat?: (value: string[]) => string;
}

const columns: Column[] = [
  {
    id: "name",
    label: "Name",
    minWidth: 100,
    align: "left",
  },
  {
    id: "province",
    label: "Province",
    minWidth: 100,
    align: "left",
  },
  {
    id: "type",
    label: "Type",
    minWidth: 100,
    align: "left",
  },
  {
    id: "direction",
    label: "Direction",
    minWidth: 100,
    align: "left",
  },
  {
    id: "swell",
    label: "Swell",
    minWidth: 100,
    align: "left",
    concat: (value: string[]) => value.join(","),
  },
  {
    id: "wind",
    label: "Wind",
    minWidth: 100,
    align: "left",
    concat: (value: string[]) => value.join(","),
  },
];

interface SpotTableProps {
  spots: Spot[];
}

const SpotTable = (props: SpotTableProps) => {
  const spots = props.spots;

  return (
    <Paper variant="outlined" sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {spots.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: "pointer" }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.concat && Array.isArray(value)
                          ? column.concat(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default memo(SpotTable);
