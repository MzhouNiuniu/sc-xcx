import * as echarts from '../../../utils/ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      // text: '测试',
      left: 'center'
    },
    color: ["#37A2DA"],
    legend: {
      data: ['A'],
      top: 50,
      left: 'center',
      z: 100,
      show:false
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      position: ['50%', '30%']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    yAxis: {
      // show: false
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
