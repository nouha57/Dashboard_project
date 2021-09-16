import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function SingleChart(state) {

    Highcharts.addEvent(Highcharts.Point, 'click', function () {
        if (this.series.options.className.indexOf('popup-on-click') !== -1) {
            const chart = this.series.chart;
            const date = Highcharts.dateFormat('%A, %b %e, %Y', this.x);
            const text = `<b>${date}</b><br/>${this.y} ${this.series.name}`;
    
            const anchorX = this.plotX + this.series.xAxis.pos;
            const anchorY = this.plotY + this.series.yAxis.pos;
            const align = anchorX < chart.chartWidth - 200 ? 'left' : 'right';
            const x = align === 'left' ? anchorX + 10 : anchorX - 10;
            const y = anchorY - 30;
            if (!chart.sticky) {
                chart.sticky = chart.renderer
                    .label(text, x, y, 'callout',  anchorX, anchorY)
                    .attr({
                        align,
                        fill: 'rgba(0, 0, 0, 0.75)',
                        padding: 10,
                        zIndex: 7 // Above series, below tooltip
                    })
                    .css({
                        color: 'white'
                    })
                    .on('click', function () {
                        chart.sticky = chart.sticky.destroy();
                    })
                    .add();
            } else {
                chart.sticky
                    .attr({ align, text })
                    .animate({ anchorX, anchorY, x, y }, { duration: 250 });
            }
        }
    });
    
    
    const options = {
    
        chart: {
            scrollablePlotArea: {
                minWidth: 400
            },
            backgroundColor: null,

        },
        title: {
            text: state.Title
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: state.Time,
        },
    
        yAxis: [{ // left y axis
            title: {
                text: null
            },
            labels: {
                align: 'left',
                x: 3,
                y: 16,
                format: '{value:.,0f}'
            },
            showFirstLabel: false
        }, { // right y axis
            linkedTo: 0,
            gridLineWidth: 0,
            opposite: true,
            title: {
                text: null
            },
            labels: {
                align: 'right',
                x: -3,
                y: 16,
                format: '{value:.,0f}'

            },
            showFirstLabel: false
        }],
    
        legend: {
            align: 'left',
            verticalAlign: 'top',
            borderWidth: 0
        },
    
        tooltip: {
            shared: true,
            crosshairs: true
        },
    
        plotOptions: {
            series: {
                name: state.Title,
                cursor: 'pointer',
                className: 'popup-on-click',
                marker: {
                    lineWidth: 1
                }
            }
        },
        series: [{
            data: state.object,
            zones: [
                {
                    value:state.min,
                    color: '#F7665E'
                },
            ]
        }],
    }

    return (
        <div className="chart">
            <HighchartsReact highcharts={Highcharts} options={options}/>
        </div>
    )
}

export default SingleChart
