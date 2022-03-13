import React, { useState, useEffect, useContext } from "react";
import Paper from "@mui/material/Paper";
import {
  SearchState,
  IntegratedFiltering,
  FilteringState,
  PagingState,
  CustomPaging,
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

import { Link } from "react-router-dom";
import { MovieContext } from "../../context/MovieContext";

export default () => {
  const [columns] = useState([
    { name: "Poster", title: "Poster" },
    { name: "Title", title: "Name" },
    { name: "Type", title: "Type" },
    { name: "Year", title: "Year" },
    { name: "imdbID", title: "imdbID" },
  ]);
  const { setSearch, movies, setCurrentPage, totalResult } =
    useContext(MovieContext);
  const [rows, setRows] = useState([]);
  const [pageSizes] = useState([10, 15, 0]);
  const [currentPageVal, setCurrentPageVal] = useState(0);

  useEffect(() => {
    setCurrentPage(currentPageVal + 1);
    setSearch("pokemon", currentPageVal + 1);
    if (movies) {
      setRows(movies);
    }
  }, [currentPageVal]);

  useEffect(() => {
    if (movies) {
      setRows(movies);
    }
  }, [movies]);

  const LinkedCell = ({ row, value, style, ...restProps }) => (
    <Table.Cell {...restProps}>
      <nav>
        <Link to={"/about/" + row?.imdbID}>{value}</Link>
      </nav>
    </Table.Cell>
  );

  const ImagedCell = ({ value, style, ...restProps }) => (
    <Table.Cell {...restProps}>
      <img src={value}></img>
    </Table.Cell>
  );

  const Cell = (props) => {
    const { column } = props;
  
    if (column.name === "Title") {
      return <LinkedCell {...props} />;
    }
    if (column.name === "Poster") {
      return <ImagedCell {...props} />;
    }
    return <Table.Cell {...props} />;
  };

  const [defaultFilters] = useState([
    { columnName: "Title", value: "Pokémon" },
  ]);
  const [filteringStateColumnExtensions] = useState([
    { columnName: "Poster", filteringEnabled: false },
    { columnName: "imdbID", filteringEnabled: false },
  ]);

  return (
    <>
      {rows.length > 0 ? (
        <Paper>
          <Grid rows={rows} columns={columns}>
            <PagingState
              defaultCurrentPage={0}
              defaultPageSize={10}
              currentPage={currentPageVal}
              onCurrentPageChange={setCurrentPageVal}
            />

            <SearchState defaultValue="Pokémon" />
            <FilteringState
              defaultFilters={defaultFilters}
              columnExtensions={filteringStateColumnExtensions}
            />
            <IntegratedFiltering />
            <CustomPaging totalCount={totalResult} />
            <Table cellComponent={Cell} />
            <TableHeaderRow />
            <TableFilterRow />
            <PagingPanel pageSizes={pageSizes} />
            <Toolbar />
            <SearchPanel />
          </Grid>
        </Paper>
      ) : (
        <></>
      )}
    </>
  );
};
