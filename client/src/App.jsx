import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './css/main.css';
import axios from 'axios';
import SSF from 'ssf';

import Nav from './components/nav/nav';
import SideBar from './components/side_bar/side_bar';
import ChartSection from './components/chart_section/chart_section';
import FullTable from './components/full_table/full_table';
import Chart from './components/Chart/chart';
import ChartsPage from './components/charts_page/charts_page';
import Login from './components/login/login';
import ManagePage from './components/manage_page/employee';
import EmployeeList from './components/manage_page/employee';


const months = { 0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December' }
const days = { 1: '01', 2: '02', 3: '03', 4: '04', 5: '05', 6: '06', 7: '07', 8: '08', 9: '09'};

function excelDateToJSDate(excelDate) {

  // JavaScript dates can be constructed by passing milliseconds
  // since the Unix epoch (January 1, 1970) example: new Date(12312512312);

  // 1. Subtract number of days between Jan 1, 1900 and Jan 1, 1970, plus 1 (Google "excel leap year bug")             
  // 2. Convert to milliseconds.

  var date = new Date(Math.round((excelDate - (25567 + 2)) * 86400 * 1000)); //date converted to milliseconds 
  var day = '';
  if(date.getDate() < 10 ) {
    day = days[date.getDate()];
  } else{
    day = date.getDate();
  }
  var converted_date =  day + '/' + months[date.getMonth()] + '/' + date.getFullYear() ;
  return converted_date;
}


function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [data, setData] = useState([]);
  const [ligne, setLigne] = useState([]);
  const [selectedLigne, setSelectedLigne] = useState('');
  const [date, setDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');


  // fetch files Titles
  
  useEffect( () => {
    async function fetchTitles(){

      await axios.get("http://localhost:8080/api/excel/files")
      .then( res => {
        setFiles(res.data);
        (typeof res.data[res.data.length - 1] !== 'undefined' &&
        setSelectedFile(res.data[res.data.length - 1].title));
      });
    }
    
    fetchTitles();
  }, []);


  // Remove Duplicated 
  useEffect( () => {

    // Remove Duplicated Dates in the Table
    const dates = Array.from(new Set(data.map(a => a.Data )))
    .map(d => {
    return data.find(a => a.Data === d)
    })
    setDate(dates);


    // Remove Duplicated Lignes
    const lignes = Array.from(new Set(data.map(a => a.LIGNE )))
    .map(l => {
    return data.find(a => a.LIGNE === l)
    })
    setLigne(lignes);

    if(typeof dates[0] !== 'undefined'){
      setSelectedDate(dates[0].Data);
    }
    if(typeof lignes[0] !== 'undefined'){
      setSelectedLigne(lignes[0].LIGNE);
    }
    
  }, [data])

  

  // fetch data of the selected file
  useEffect( () => {
    
    async function fetchData(){
      await axios.get("http://localhost:8080/api/excel/"+ selectedFile)
      .then( res => {
        let d = res.data;
        // convert Array of Arrays to Array of Objects
        var arrayObject = d.map(function(item){ 
          return { LIGNE: item[0], Data: item[1], Time: item[2], Temperature: item[3],
            Humidity: item[4], OBJ_Min_Tre: item[5], OBJ_Max_Tre: item[6],
            OBJ_Min_Hum: item[7], OBJ_Max_Hum: item[8]}
          });

        var header = arrayObject.shift();
      
        arrayObject.map( (r) => r.Time = SSF.format('hh:mm',  r.Time));
        arrayObject.map( (r) => r.Data = excelDateToJSDate(r.Data) );
        setData(arrayObject);
      }) 
    }
      
    fetchData();
      
  }, [selectedFile])


  // when u Logged In
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user])

  
    return (
      <Router>
        <div className="App" >
          <Nav setData={setData} Data={data} setSelectedFile={setSelectedFile} user={user} setUser={setUser}></Nav>
          <div className="App-Body">
            <SideBar></SideBar>
            <div className='content'>
              <Switch>
               

                
                <Route exact path="/">
                  <ChartSection Data={data} setLigne={setLigne} Ligne={ligne} Date={date} Files={files}
                  setSelectedFile={setSelectedFile} SelectedFile={selectedFile}
                  setSelectedDate={setSelectedDate} selectedDate={selectedDate}
                  setSelectedLigne={setSelectedLigne} selectedLigne={selectedLigne}
                  ></ChartSection>
                </Route>
  
                <Route exact path="/Charts">
                  <div className='ChartPage'>
                    <Chart Time={selectedDate === '' ?  data.filter( (r) => r.LIGNE === selectedLigne ).map(r =>  r.Time  ) 
                      : data.filter( (r) => r.LIGNE === selectedLigne && r.Data === selectedDate).map(r =>  r.Time  )} 
                      title="Temperature" 
  
                      min={ typeof data[0] !== 'undefined' && data[0].OBJ_Min_Tre} 
                      max={typeof data[0] !== 'undefined' && data[0].OBJ_Max_Tre} 
  
                      object={selectedDate === '' ?  data.filter( (r) => r.LIGNE === selectedLigne ).map(r =>  r.Temperature  ) 
                      : data.filter( (r) => r.LIGNE === selectedLigne && r.Data === selectedDate).map(r =>  r.Temperature )}
                      >
                    </Chart>
  
                    <span></span>
  
                    <Chart Time={selectedDate === '' ?  data.filter( (r) => r.LIGNE === selectedLigne ).map(r =>  r.Time  ) 
                      : data.filter( (r) => r.LIGNE === selectedLigne && r.Data === selectedDate).map(r =>  r.Time  )} 
                      title="Humidity" 
  
                      min={typeof data[0] !== 'undefined' && data[0].OBJ_Min_Hum} 
                      max={typeof data[0] !== 'undefined' && data[0].OBJ_Max_Hum}
                      object={selectedDate === '' ?  data.filter( (r) => r.LIGNE === selectedLigne ).map(r =>  r.Humidity  ) 
                      : data.filter( (r) => r.LIGNE === selectedLigne && r.Data === selectedDate).map(r =>  r.Humidity )}
                      >
                    </Chart>
                  </div>
                </Route>
  
                <Route exact path="/Table">
                  <FullTable Data={data} Ligne={selectedLigne} Date={selectedDate}></FullTable>
                </Route>
  
                <Route exact path="/ChartsPage">
                  <ChartsPage Data={data}></ChartsPage>
                </Route>

                <Route exact path="/EmployeeList">
                  <EmployeeList/>
                </Route>
                
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  /*}

  return(
    <Router>
    <div className="App" >
      <Nav setData={setData} Data={data} setSelectedFile={setSelectedFile}></Nav>
      <div className="App-Body">
        <SideBar></SideBar>
        <div className="content">
            <Route exact path="/Login">
              <Login></Login>
            </Route>
        </div>
      </div>
    </div>
    </Router>

  )*/
  
}

export default App;
