<template>
  <div class="weather-title">
    <!-- <img id="img1" src="../../../assets/weather.svg"> -->
    <div class="content">
      <div class="content-city">
        <!-- <img
          src="../../../assets/avator.jpg"
          width="20px"
          height="20px"> -->
        <a-icon
          type="environment"
          style="color:white" />
        <span class="content-area">南京</span>
        <span class="area-down"> ></span>
        <!-- <span class="area-down">
          <a-icon
            type="down"
            style="color:white;width:5px;height:5px;" /></span> -->
      </div>
      <div class="content-date">
        <span
          class="time"
          id="time"></span>
        <span
          class="week"
          id="weekID"></span>
      </div>
      <div style="position:relative">
        <span class="temper1">22</span>
        <span style="font-size:11px;"> 晴</span>
        <div style="float:right;left:40px;top:10px;position:absolute">
          <span>℃</span><br>
        </div>
      </div>
      <div>
        <span class="temper2">14~24℃ 多云 西南风3-4级</span>
      </div>
    </div>
  </div>
</template>
<script>
var moment = require('moment')
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.change()
  },
  methods: {
    change () {
      var temp = moment(new Date()).day()
      console.log(temp)
      var week = document.getElementById('weekID')
      if (temp === 1) {
        week.innerHTML = ' 周一'
      } else if (temp === 2) {
        week.innerHTML = ' 周二'
      } else if (temp === 3) {
        week.innerHTML = ' 周三'
      } else if (temp === 4) {
        week.innerHTML = ' 周四'
      } else if (temp === 5) {
        week.innerHTML = ' 周五'
      } else if (temp === 6) {
        week.innerHTML = ' 周六'
      } else if (temp === 0) {
        week.innerHTML = ' 周日'
      }
      var time = new Date()
      var month = time.getMonth() + 1 // 获取月份
      var day = time.getDate() // 获取日期
      var box = document.getElementById('time')
      box.innerHTML = month < 10 ? ('0' + month + '月' + day + '日') : (month + '月') + day + '日 '
    }
  }
}
</script>
<style lang='less' scoped>
.weather-title {
  background: url('../../../assets/weather.svg');
  background-repeat:no-repeat;
  height: 155px;
  // height: 130%;
  // width: 240px;
  background-size: cover;
  // margin: 0px auto;
  // position: absolute;
}
.content {
  margin-left: 20px;
  padding-top: 15px;
  span {
    color: white;
  }
}
.area-down {
  -webkit-transform: rotate(90deg);
  margin-left: 8px;
  margin-top: 1px;
  position: absolute;
  // filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
}
.content-area {
  font-size: 16px;
  margin-left: 8px;
}
.jiantou {
  margin-left: 8px;
  width: 10px;
}
.content-date {
  margin-top: 8px;
  .time {
    font-size: 13px;
  }
  .week {
    font-size: 13px;
  }
}
.temper1 {
  font-size: 35px;
  font-weight: 600;
}
.sheshidu {
  margin-left: 30px;
  margin-top: 100px;
}
.temper2 {
  font-size: 12px;
}
#img1 {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
