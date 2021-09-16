import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function Chart(state) {

    const options = {
        chart: {
            type: 'spline',
            zoomType: 'x',
            backgroundColor: null,
        },
        title: {
            text: state.title
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: state.Time
        },
        yAxis: {
            title: {
                text: false
            }
        },
        series: [{
            name: state.title,

            data: state.object,
            zones: [
                {
                    value:state.min,
                    color: 'red'
                },
                {
                    value:state.max,
                },
                {
                    color: 'red'
                }
            ]
        }],
        
      }

    return (
        <div className="chart">
            <HighchartsReact highcharts={Highcharts} options={options}/>
        </div>
    )
}

export default Chart
