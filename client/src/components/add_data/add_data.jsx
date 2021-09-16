import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { makeStyles, withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';

import './add_data.css'
import axios from 'axios';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    borderRadius: 8,
    zIndex: 2,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    textAlign: 'center',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(2),
      minWidth: 130,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));


export default function AddData() {
  
  const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const Years = ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023',
  '2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035','2036','2037','2038','2039','2040'];

  const [open, setOpen] = useState(false);

  // data
  const [month, setMonth] = useState('January');
  const [year, setYear] = useState('2021');
  const [totalBoards, setTotalBoards] = useState();
  const [ratioDefaut, setRatioDefaut] = useState();
  const [evolutionTRG, setEvolutionTRG] = useState();
  const [objTRG, setObjTRG] = useState();


  const classes = useStyles();

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleData(){
    setOpen(false);
    const date = month + ' ' + year
    const data = {date: date, total_boards: totalBoards, ratio_defaut: ratioDefaut, evolution_TRG: evolutionTRG, obj_TRG: objTRG}
    await axios.post("http://localhost:8080/api/boards/setData", data, {headers: {
      'content-type': 'application/json'
  }})
    .then(res => { 
    });
  }

  const handleSelect = (event) => {
    switch (event.target.name) {
      case 'Month':
        setMonth(event.target.value);
        break;
      case 'Year':
        setYear(event.target.value);
        break;
      default:
        break;
    }
  }

  const handleChange = (event) => {
    switch (event.target.id) {

      case 'total_boards':
        setTotalBoards(event.target.value);
        break;
      case 'ratio_defaut':
        setRatioDefaut(event.target.value);
        break;
      case 'evolution_TRG':
        setEvolutionTRG(event.target.value);
        break;
      case 'obj_TRG':
        setObjTRG(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Data
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <div className='date'>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id='Month' >Month</InputLabel>
                <Select  value={month} name='Month' onChange={handleSelect} label="Month" input={<BootstrapInput />} >
                { Months.map( m => <MenuItem value={m}>{m}</MenuItem> )}
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id='Year'>Year</InputLabel>
                <Select  value={year} name='Year' onChange={handleSelect} label="Year" input={<BootstrapInput />} >
                { Years.map( y => <MenuItem value={y}>{y}</MenuItem> )}
                </Select>
            </FormControl>
        </div>
        <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="total_boards"
              label="Total Boards"
              type="text"
              value={totalBoards}
              onChange={handleChange}
              
            />
            <TextField
              margin="dense"
              id="ratio_defaut"
              label="Ratio Defaut"
              type="text"
              value={ratioDefaut}
              onChange={handleChange}
              
            />
            <TextField
              margin="dense"
              id="evolution_TRG"
              label="Evolution TRG"
              type="text"
              value={evolutionTRG}
              onChange={handleChange}
              
            />
            <TextField
              margin="dense"
              id="obj_TRG"
              label="Obj TRG"
              type="text"
              value={objTRG}
              onChange={handleChange}
              
            />
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleClose}>
            Cancel
          </Button>
          <Button size="large"  onClick={handleData} color="primary" >
            <strong>Add/Update</strong>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}