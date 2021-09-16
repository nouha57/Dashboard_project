import React from 'react'
import Chart from '../Chart/chart';

import { makeStyles, withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import DataTable from '../Table/table'


import './chart_section.css';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';

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
      margin: theme.spacing(0),
      minWidth: 120,
      maxWidth: 500,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function ChartSection(state) {

    const Data = state.Data;
    const classes = useStyles();
    const Ligne = state.Ligne;
    const Date = state.Date;

    function handleChange(event){
        state.setSelectedLigne(event.target.value);
    }

    function handleChangeDate(event){
        state.setSelectedDate(event.target.value);
    }

    function handleChangeFile(event){
        state.setSelectedFile(event.target.value);
    }

    return (
        <div className='content-section'>
            <div className="chart-section">
                <div className="chart-section-header">

                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel >Title</InputLabel>
                        <Select  value={ state.SelectedFile } onChange={handleChangeFile} label="Title" input={<BootstrapInput />}>
                        { typeof state.Files[0] !== 'undefined' && state.Files.map( f => <MenuItem value={f.title}>{f.title}</MenuItem> )}
                        </Select>
                    </FormControl>

                    <div className='buttons'>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id='date' >Date</InputLabel>
                            <Select  labelId='date' value={ state.selectedDate } onChange={handleChangeDate} input={<BootstrapInput />}>
                            <MenuItem value=''><em>Select All</em></MenuItem>
                            { typeof Date[0] !== 'undefined' && Date.map( d => d.Data !== 'NaN/undefined/NaN' && <MenuItem value={d.Data}>{d.Data}</MenuItem> )}
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Ligne</InputLabel>
                            <Select  value={state.selectedLigne} onChange={handleChange} label="Ligne" input={<BootstrapInput />} >
                            { typeof Ligne[0] !== 'undefined' && Ligne.map( l => l.Data !== 'NaN/undefined/NaN' && <MenuItem value={l.LIGNE}>{l.LIGNE}</MenuItem> )}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="charts">
                    <Chart Time={state.selectedDate === '' ?  Data.filter( (r) => r.LIGNE === state.selectedLigne ).map(r =>  r.Time  ) 
                    : Data.filter( (r) => r.LIGNE === state.selectedLigne && r.Data === state.selectedDate).map(r =>  r.Time  )} 

                    title="Temperature" 
                    min={ typeof Data[0] !== 'undefined' && Data[0].OBJ_Min_Tre} 
                    max={typeof Data[0] !== 'undefined' && Data[0].OBJ_Max_Tre} 

                    object={state.selectedDate === '' ?  Data.filter( (r) => r.LIGNE === state.selectedLigne ).map(r =>  r.Temperature  ) 
                    : Data.filter( (r) => r.LIGNE === state.selectedLigne && r.Data === state.selectedDate).map(r =>  r.Temperature )}
                    >
                    </Chart>

                    <span></span>

                    <Chart Time={state.selectedDate === '' ?  Data.filter( (r) => r.LIGNE === state.selectedLigne ).map(r =>  r.Time  ) 
                    : Data.filter( (r) => r.LIGNE === state.selectedLigne && r.Data === state.selectedDate).map(r =>  r.Time  )} 
                     title="Humidity" 
                     
                     min={typeof Data[0] !== 'undefined' && Data[0].OBJ_Min_Hum} 
                     max={typeof Data[0] !== 'undefined' && Data[0].OBJ_Max_Hum} 

                     object={state.selectedDate === '' ?  Data.filter( (r) => r.LIGNE === state.selectedLigne ).map(r =>  r.Humidity  ) 
                     : Data.filter( (r) => r.LIGNE === state.selectedLigne && r.Data === state.selectedDate).map(r =>  r.Humidity )}
                     >
                     </Chart>
                </div>
            </div>
            <div className='table-section'>
                <p>Table of Non-compliant Values (Temperature)</p>
                <DataTable Data={Data.filter( (r) => r.Temperature > 32 || r.Temperature < 19 )} 
                Ligne={state.selectedLigne} Date={state.selectedDate}></DataTable>
            </div>

            <div className='table-section'>
                <p>Table of Non-compliant Values (Humidity)</p>
                <DataTable Data={Data.filter( (r) => r.Humidity > 70 || r.Humidity < 30 )} 
                Ligne={state.selectedLigne} Date={state.selectedDate}></DataTable>
            </div>
        </div>
    )
}

export default ChartSection;

/*
<p>Table Temperature and Humidity</p>
<DataTable Data={Data} Ligne={state.selectedLigne} Date={state.selectedDate}></DataTable>
*/