import { memo, useEffect, useRef } from "react";
import { Spot } from "../../shared/model/spot.interface";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { useState, useMemo, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

type ColumnType =
  | "name"
  | "province"
  | "type"
  | "direction"
  | "swell"
  | "wind"
  | "tide";

type Order = "asc" | "desc";
interface Column {
  id: ColumnType;
  label: string;
  minWidth: number;
  align?: "right" | "left";
  isSortable?: boolean;
  concat?: (value: string[]) => string;
}

const columns: Column[] = [
  {
    id: "name",
    label: "Name",
    minWidth: 100,
    align: "left",
    isSortable: true,
  },
  {
    id: "province",
    label: "Province",
    minWidth: 100,
    align: "left",
    isSortable: true,
  },
  {
    id: "type",
    label: "Type",
    minWidth: 100,
    align: "left",
    isSortable: true,
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
  { id: "tide", label: "Tide", minWidth: 100, align: "left" },
];

interface SpotTableProps {
  spots: Spot[];
  onSelectedSpot: (spotId: string) => void;
  selectedRow: string;
}

interface SpotTableHeaderProps {
  orderBy: ColumnType;
  order: Order;
  onRequestSort: (property: ColumnType) => void;
}

/**
 * The component for the spot table header
 * @param props SpotTableHeaderProps
 * @returns
 */
const SpotTableHeader = (props: SpotTableHeaderProps) => {
  const handleRequestSort = (property: ColumnType) => {
    props.onRequestSort(property);
  };

  const order = props.order;
  const orderBy = props.orderBy;
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
            sortDirection={orderBy === column.id ? order : false}
          >
            {column?.isSortable ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={(_event: MouseEvent) => handleRequestSort(column.id)}
              >
                {column.label}
                {orderBy === column.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

/**
 * the table to display all spots with some of its properties
 * @param props - spots
 */
const SpotTable = (props: SpotTableProps) => {
  const isRowClicked = useRef(false);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<ColumnType>("name");
  const { selectedRow } = props;
  const spots = useMemo(() => {
    return props.spots.sort((a: Spot, b: Spot) => {
      if (b[orderBy] < a[orderBy]) {
        return order === "desc" ? -1 : 1;
      }
      if (b[orderBy] > a[orderBy]) {
        return order === "desc" ? 1 : -1;
      }
      return 0;
    });
  }, [props.spots, order, orderBy]);

  useEffect(() => {
    if (isRowClicked.current) {
      isRowClicked.current = false;
      return;
    }

    if (!selectedRow) {
      return;
    }

    const element = document.getElementById(selectedRow);
    if (element) {
      element.scrollIntoView({ block: "center" });
    }
  }, [selectedRow]);

  const handleRequestSort = (property: ColumnType) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRowClick = (rowId: string) => {
    props.onSelectedSpot(rowId);
    isRowClicked.current = true;
  };

  return (
    <Paper variant="outlined" sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <SpotTableHeader
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {spots.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  id={row.id}
                  selected={props.selectedRow === row.id}
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleRowClick(row.id)}
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
