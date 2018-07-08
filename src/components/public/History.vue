<template>
    <div>
        <div class="highcharts-container"></div>
    </div>
  
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';

import {TransationsNum } from '../api/bus.js'

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  props: ['styles'],
  name: 'highcharts',
  data() {
    return {
      chart: null,
      options: {
            chart: {
                type: 'column',
                animation: Highcharts.svg,
                marginBottom: 10,
                events: {
                    load: function () {
                        let num = (new Date()).getTime();
                        var series = this.series[0];
                        let _this = this;
                        TransationsNum.$on('Transations', (text) => {
                            num += 1000;
                            text == 0 ? text = 1:text
                            series.addPoint([ num, text], true, true);
                        })
                    }
                }
            },
            title: {
                    text: ''   
                }, 
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                lineWidth: 1,
                title: {
                     text: ''
                },
                allowDecimals:false,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 0);
                }
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                        hover: {
                            enabled: true
                        }
                        }
                    }
                }
            },
            legend: {
                enabled: false
            },
            exporting :{
                enabled: false
            },
            series: [{
                name: this.$t('index.history.tips'),
                color: '#19638e',
                pointPadding:0,
                borderWidth:0,
                animation: false,
                data: (function () {
                    var data = [],time = (new Date()).getTime(),i;
                    for (i = -15; i <= 0; i += 1) {
                        data.push({
                        x: time + i * 1000,
                        y: 1
                        });
                    }
                    return data;
                }())    
            }] 

        },
    }
  },

 mounted(){
      this.initChart(); 
    },
  methods: {
    initChart() {
      this.$el.style.width = (this.styles.width || 400) + 'px';
      this.$el.style.height = (this.styles.height || 200) + 'px';
      this.chart = new Highcharts.Chart(this.$el, this.options);
    }
  }
}
</script>

<style lang="less">
    .title{
        font-size: 14px;
        color: #7690a4;
        font-weight: bold;
    }
    .highcharts-container {
        width: 100%;
        height: 200px;
        float: right;
        margin-top: 10px;
    }
    .highcharts-credits{
        display: none;
    }
    .highcharts-legend-item{
        display: none;
    }
    .highcharts-axis-labels{
        display: none;
    }
</style>
