<template>
  <div>
    <div class="col-12">
      <div class="el-col-6">
        <h1 style="padding: 15px 0 15px 0;"><i>Tổng khách hàng</i></h1>
        <div class="el-col-12">
          <i class="el-icon-user-solid"></i>
        </div>
        <p class="content">2230</p>
        <hr class="up" />
        <span class="pop"><i class="el-icon-loading"></i>Updated now</span>
      </div>
      <div class="el-col-6">
        <h1 style="padding: 15px 0 15px 0;"><i>Lượng điện năng</i></h1>
        <div class="el-col-12">
          <i class="el-icon-data-line" style="font-size: 60px"></i>
        </div>
        <p style="margin: 20px 0 0 0px; font-size: 30px">2230 kWh</p>
        <hr style="margin-top: 32.5px" />
        <span class="pop"><i class="el-icon-loading"></i>Updated now</span>
      </div>
      <div class="el-col-6">
        <h1 style="padding: 15px 0 15px 0;"><i>Lượt truy cập</i></h1>
        <div class="el-col-12">
          <i class="el-icon-thumb"></i>
        </div>
        <p class="content">+2230</p>
        <hr class="up" />
        <span class="pop"><i class="el-icon-loading"></i>Updated now</span>
      </div>
    </div>
    <div class="col-12">
      <div class="chart">
        <!-- <area-chart
          :data="chartData"
          :options="options"
          :color="FFCC66"
          :legend="true"
          width="800px"
          height="500px"
          ytitle="Điện năng tiêu thụ (W)"
          xtitle="Thời gian (ngày)"
          title="BIỂU ĐỒ TỔNG ĐIỆN NĂNG TIÊU THỤ"
          titleFontColor="ffff"
          label="Điện năng tiêu thụ(W)"
        ></area-chart> -->
        <line-chart
          :colors="['#b00', '#666']"
          :data="chartD"
          :options="options"
          :legend="true"
          width="800px"
          height="500px"
          ytitle="Điện năng tiêu thụ (W)"
          xtitle="Thời gian (ngày)"
          title="BIỂU ĐỒ TỔNG ĐIỆN NĂNG TIÊU THỤ"
          titleFontColor="ffff"
          label="Điện năng tiêu thụ(W)"
        ></line-chart>
      </div>
      <el-row style="margin: 300px 0 0 -180px">
        <el-button
          @click="updateWeek"
          type="primary"
          style="
            padding-top: 15px;
            padding-right: 20px;
            opacity: 1;
            font-family: Time New Roman;
            font-weight: 900;
            color: black;
            font-size: 12px;
            margin-top: -20px;
          "
          >Dự đoán điện năng tuần</el-button
        >
        <el-button
          @click="updateMonth"
          type="primary"
          style="
            padding-top: 15px;
            padding-right: 20px;
            opacity: 1;
            font-family: Time New Roman;
            font-weight: 900;
            color: black;
            font-size: 12px;
          "
          >Dự đoán điện năng tháng</el-button
        >
      </el-row>
      <!-- <div class="chart1">
      <pie-chart
        :data="[
          ['Blueberry', 44],
          ['Strawberry', 23],
        ]"
        width="200px"
        height="500px"
      ></pie-chart>
    </div> -->
      <div>
        <img
          src="https://www.obloliving.com/wp-content/uploads/revslider/home-slider-21-1/11-2.gif"
          class="top-img"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        "2017-05-03": 0.13 / 0.0002,
        "2017-05-10": 0.176 / 0.0002,
        "2017-05-17": 0.176 / 0.0002,
        "2017-05-24": 0.176 / 0.0002,
        "2017-05-31": 0.182 / 0.0002,
        options: {
          title: {
            text: "Đồ thị tăng trưởng giá trị sản xuất các nhóm cây trồng",
          },
        },
      },
      chartD: [
        {
          name: "Điện năng tiêu thụ hàng tuần",
          data: {
            "2017-05-03": 0.13 / 0.0002,
            "2017-05-10": 0.178 / 0.0002,
            "2017-05-17": 0.180 / 0.0002,
            "2017-05-24": 0.185 / 0.0002,
            "2017-05-31": 0.195 / 0.0002,
          },
        },
        {
          name: "Điện năng dự đoán",
          data: {
            "2017-05-03": 0.13 / 0.0002,
            "2017-05-10": 0.190 / 0.0002,
            "2017-05-17": 0.195 / 0.0002,
            "2017-05-24": 0.210/ 0.0002,
            "2017-05-31": 0.34 / 0.0002,
          },
        },
      ],
    };
  },
  methods: {
    updateWeek() {
      this.$alert('Giá trị điện năng: 250 kWh', 'Dự đoán điện năng tuần 1 tháng 6', {
          confirmButtonText: 'Đồng ý',
          
          
        });
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      this.chartD = [
        {
          name: "Điện năng tiêu thụ hàng tuần",
          data: {
            "2017-05-03": 0.13 / 0.0002,
            "2017-05-10": 0.178 / 0.0002,
            "2017-05-17": 0.180 / 0.0002,
            "2017-05-24": 0.185 / 0.0002,
            "2017-05-31": 0.195 / 0.0002,
          },
        },
        {
          name: "Điện năng dự đoán",
          data: {
            "2017-05-03": 0.13 / 0.0002,
            "2017-05-10": 0.178 / 0.0002,
            "2017-05-17": 0.180 / 0.0002,
            "2017-05-24": 0.185 / 0.0002,
            "2017-05-31": 0.195 / 0.0002,
            "2017-06-07": 0.245 / 0.0002,
          },
        },
      ];
    },
    updateMonth() {
      this.$alert('Giá trị điện năng: 900 kWh', 'Dự đoán điện năng tháng 6', {
          confirmButtonText: 'Đồng ý',
          
          
        });
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      this.chartD = [
        {
          name: "Điện năng tiêu thụ tuần",
          data: {
           "2017-05-03": 0.13 / 0.0002,
            "2017-05-10": 0.178 / 0.0002,
            "2017-05-17": 0.180 / 0.0002,
            "2017-05-24": 0.185 / 0.0002,
            "2017-05-31": 0.195 / 0.0002,
          },
        },
        {
          name: "Điện năng dự đoán",
          data: {
            "2017-05-03": 0.13 / 0.0002,
            "2017-05-10": 0.178 / 0.0002,
            "2017-05-17": 0.180 / 0.0002,
            "2017-05-24": 0.185 / 0.0002,
            "2017-05-31": 0.195 / 0.0002,
            "2017-06-07": 0.245 / 0.0002,
            "2017-06-14": 0.265 / 0.0002,
            "2017-06-21": 0.295 / 0.0002,
            "2017-06-28": 0.375 / 0.0002,
          },
          /* color: 'rgb(255, 99, 132)', */
          labels: "Dự đoán tháng: 123W",
        },
      ];
    },
  },
};
</script>

<style scoped>
.chart {
  margin-left: 80px;
}
.up {
  margin-top: 40px;
}
.content {
  font-size: 35px;
  margin-top: 7px;
}
.daboard {
  width: 1500px;
  overflow: hidden;
  margin-top: -100px;
}
.top-img {
  margin-top: -450px;
  height: 450px;
  width: 400px;
  float: right;
  margin-right: 125px;
}
.pop {
  float: left;
  margin-top: 20px;
  margin-left: 30px;
  font-style: italic;
}
.el-col-6 {
  margin-top: 20px;
  margin-left: 85px;
  background-color: rgb(252, 181, 234);
  height: 200px;
  margin-bottom: 50px;
}
.chartjs-render-monitor {
  margin-top: 50px;
}
.el-icon-user-solid,
.el-icon-thumb {
  font-size: 60px;
}
</style>
