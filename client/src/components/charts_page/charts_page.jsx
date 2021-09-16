import React, { useEffect, useState } from 'react';
import SingleChart from '../Chart/single-chart';
import AddData from '../add_data/add_data';
import axios from 'axios';

import './charts_page.css';


function ChartsPage(state) {
    const [chartData, setChartData] = useState();

    const toDate = (d) => {
        var monthNames = {"January": 1,"February": 2,"March": 3,"April": 4,"May": 5,"June": 6,"July": 7,"August": 8,"September": 9,"October": 10,"November": 11,"December": 12};
        var date = d.split(" ");

        return ( date[1] + ' ' + monthNames[date[0]] );
    }

    useEffect(() => {
        async function fetchData(){

            await axios.get("http://localhost:8080/api/boards/getData")
            .then( res => {
                let data = res.data;
                data.sort((a, b) => (toDate(a.date) > toDate(b.date) && 1 ) || -1 );
                setChartData(data);
            });
        }

        fetchData();
    }, [] );

    return (
        <div className='charts-page'>
            <div className='small-charts'>
                <div className="small-charts-header">
                    <AddData></AddData>
                </div>
                <div className="charts">
                    <SingleChart Time={typeof chartData !== 'undefined' && chartData.map( d => d.date)} Title="Total Boards"
                    object={typeof chartData !== 'undefined' && chartData.map( d => d.total_boards )}
                    min={0}
                    >
                    </SingleChart>

                    <span></span>

                    <SingleChart Time={typeof chartData !== 'undefined' && chartData.map( d => d.date)} Title="Ratio Defaut"
                    object={typeof chartData !== 'undefined' && chartData.map( d => d.ratio_defaut )}
                    min={0}
                    >
                    </SingleChart>
                </div>
            </div>
            <div className='single-chart'>
                <div className="singlechart">
                    <SingleChart object={typeof chartData !== 'undefined' && chartData.map( d => d.evolution_TRG )}
                    Time={typeof chartData !== 'undefined' && chartData.map( d => d.date)}
                    Title="Evolution TRG"
                    min={70}
                    >    
                    </SingleChart>
                </div>
            </div>
        </div>
    )
}

export default ChartsPage
