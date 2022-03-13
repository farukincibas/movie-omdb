import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  SearchState,
  IntegratedFiltering,
  FilteringState,
  PagingState,
  IntegratedPaging,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
} from "@devexpress/dx-react-grid-material-ui";

import { generateRows } from "../../demo-data/generator.js";

export default () => {
  const [columns] = useState([
    { name: "name", title: "Name" },
    { name: "gender", title: "Gender" },
    { name: "city", title: "City" },
    { name: "car", title: "Car" },
  ]);
  const [rows] = useState(generateRows({ length: 60 }));
  const [pageSizes] = useState([10, 15, 0]);

  const HighlightedCell = ({ value, style, ...restProps }) => (
    <Table.Cell {...restProps}>
      <a href="/test">{value}</a>
    </Table.Cell>
  );

  const Cell = (props) => {
    const { column } = props;
    if (column.name === "name") {
      return <HighlightedCell {...props} />;
    }
    return <Table.Cell {...props} />;
  };

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <PagingState defaultCurrentPage={0} defaultPageSize={10} />
        <IntegratedPaging />
        <SearchState defaultValue="Paris" />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <Table cellComponent={Cell} />
        <TableHeaderRow />
        <TableFilterRow />
        <PagingPanel pageSizes={pageSizes} />
        <Toolbar />
        <SearchPanel />
      </Grid>
    </Paper>
  );
};
