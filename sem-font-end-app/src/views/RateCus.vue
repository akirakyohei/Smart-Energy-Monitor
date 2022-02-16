.
<template>
  <div>
    <div class="left">
      <header class="site-header" id="header">
        <h1 class="site-header__title" data-lead-id="site-header-title">
          THANK YOU!
        </h1>
        <i class="el-icon-s-promotion"></i>
      </header>
      <h4 style="margin-top: 20px;"><i>Đánh giá của các bạn góp phần giúp chúng tôi hoàn thiện chất lượng của
        dự án</i></h4>
      <h1 style="">~~+~~+~~+~~+~~</h1>
      <div class="block">
        <span class="demonstration" style="font-size: 20px; font-weight: 900; margin-bottom: 5px;">Đánh giá tổng quan</span>
        <el-rate v-model="value2" :colors="colors"> </el-rate>
      </div>
      <div class="rating">
          <span class="demonstration" style="font-size: 14px; font-weight: 900; margin-top: 50px;">1. Mức độ tin cậy</span>
        <el-rate
          v-model="value"
          :texts="['Bình thường', 'Khá Tốt', 'Tốt', 'Rất tốt', 'Xuất sắc']"
          show-text
        >
        </el-rate>
       <br>
        <span class="demonstration" style="font-size: 14px; font-weight: 900; margin-top: 50px;">2. Tính năng</span>
        <el-rate
          v-model="value0"
          :texts="['Bình thường', 'Khá Tốt', 'Tốt', 'Rất tốt', 'Xuất sắc']"
          show-text
        >
        </el-rate>
        
        <el-rate
          v-model="value3"
          :icon-classes="iconClasses"
          void-icon-class="icon-rate-face-off"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
        >
        <br>
        </el-rate>
        <span class="demonstration" style="font-size: 14px; font-weight: 900; margin-top: 50px;">3. Giao diện</span>
        <el-rate
          v-model="value1"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value} points"
        >
        </el-rate>
        <el-button @click="open" class="submit" type="warning" icon="el-icon-star-off" round>Gửi đi</el-button>
      </div>
    </div>
    <div class="right">
      <img class="img-rate" src="https://thumbs.gfycat.com/EnlightenedImportantBeetle-size_restricted.gif" />
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
        value0: null,
      value: null,
      value1: 5.0,
      value2: null,
      value3: null,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' },
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"], // same as { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
    };
  },
  methods: {
      open() {
        const h = this.$createElement;
        this.$msgbox({
          title: 'Cảm ơn bạn',
          message: h('p', null, [
            h('span', null, 'Đánh giá của bạn sẽ được gửi vào hòm thư'),
            h('i', { style: 'color: teal' }, 'YourHome'),

          ]),
          showCancelButton: true,
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Bỏ qua',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = 'Đang gửi...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Đánh giá thành công'
          });
        });
      },
    }
};
</script>

<style scoped>
.right {
    width: 46%;
    height: 100vh;
    float: right;
    margin-top: -25px;
    background: black;
}
.left {
    margin: 20px 0px 10px 50px;
    float: left;
    width: 50%;
}
.block {
  margin-top: 20px;
}
.img-rate {
    height: 500px;
    float: left;
    margin: 150px 20px 0px 100px;
}
.site-header__title {
    text-align: center;
    font-size: 60px;
}
.el-icon-s-promotion {
    font-size: 100px;
}
.submit {
    font-size: 15px;
    margin-top: 50px;
}
.rating {
    margin-top: 15px;
}
</style>
