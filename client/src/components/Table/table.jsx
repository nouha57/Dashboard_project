import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';


function createData(ligne, date, time, temperature, humidity, min_temp, max_temp, min_hum, max_hum) {
  return { ligne, date, time, temperature, humidity, min_temp, max_temp, min_hum, max_hum };
}



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'ligne', numeric: false, disablePadding: false, label: 'LIGNE' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'time', numeric: false, disablePadding: false, label: 'Time' },
  { id: 'temperature', numeric: true, disablePadding: false, label: 'Temperature' },
  { id: 'humidity', numeric: true, disablePadding: false, label: 'Humidity' },
  { id: 'min_temp', numeric: true, disablePadding: false, label: 'OBJ Min Tem' },
  { id: 'max_temp', numeric: true, disablePadding: false, label: 'OBJ Max Tem' },
  { id: 'min_hum', numeric: true, disablePadding: false, label: 'OBJ Min Hum' },
  { id: 'max_hum', numeric: true, disablePadding: false, label: 'OBJ Max Hum' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  stickyHeader:{
    backgroundColor: theme.palette.common.black,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 750,
    backgroundColor: theme.palette.grey[200],
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  container: {
    maxHeight: 350,
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('time');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const Data = props.Data;

  const rows = [];

  const FilterData = props.Date === '' ?  Data.filter( (r) => r.LIGNE === props.Ligne )
  : Data.filter( (r) => r.LIGNE === props.Ligne && r.Data === props.Date);
  FilterData.map( r => 
    rows.push(createData(r.LIGNE, r.Data, r.Time, r.Temperature, r.Humidity, r.OBJ_Min_Tre, r.OBJ_Max_Tre,
      r.OBJ_Min_Hum, r.OBJ_Max_Hum)));
  


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.ligne);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <TableContainer  className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              className={classes.stickyHeader}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.ligne);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.time)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                  
                      <TableCell component="th" id={labelId} scope="row">
                        {row.ligne}
                      </TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>{row.temperature}</TableCell>
                      <TableCell>{row.humidity}</TableCell>
                      <TableCell>{row.min_temp}</TableCell>
                      <TableCell>{row.max_temp}</TableCell>
                      <TableCell>{row.min_hum}</TableCell>
                      <TableCell>{row.max_hum}</TableCell>
                    </TableRow>
                  );
                })}
              
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100, 500, 1000]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
    </div>
  );
}
