<template>
  <div>
    <div class="nav">
      <!-- <el-input
        size="medium"
        placeholder="Nhấn để tìm kiếm ..."
        style="
          width: 400px;
          margin-top: 15px;
          margin-left: 200px;
          padding-left: 200px;
          padding-right: 200px;
        "
      /> -->
      <el-input
  size="medium"
  placeholder="Nhấn để tìm kiếm ..."
  v-model="input"
  style="width: 30%;
  margin: 12px 0 0 500px;
  "
  clearable>
</el-input>
      <p
        style="
          float: right;
          margin: auto;
          text-align: center;
          margin-top: 20px;
          margin-right: 200px;
        "
      >
        <!-- {{ email }} -->
        Admin (Long Biên)
      </p>
      <!-- <i class="el-icon-caret-bottom"></i> -->
       
       <a href="/" class="nav-link" style="margin-right: -250px;">Đăng xuất</a>
      <el-avatar
        class="avata"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtnAZ6u4hWrraX6krf5owMLzFMM0cNlx1asQJI7AtEZDEFmKZJT3eYrlKCN0j2kRpT4qI&usqp=CAU"
      ></el-avatar>
      <!-- {{admin.name}} -->
    </div>
    <div class="avthome">
      <el-col style="background;">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy_Eoydl72AHQ_0JA75NTVpkhqWdIO7Zj0D4lPGMCIC0ice4xPFnDvFWCjoPCjlsCTcMQ&usqp=CAU"
          alt="about image"
          class="imghome"
        />
        <p class="text-home">YOUR HOME</p>
        <hr style="margin-top: 40px" />
      </el-col>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      email: "",
      input: '',

    }
  },
  methods: {
    getEmail() {
      this.email = localStorage.getItem("email");
    },
  },
};
</script>
<style scoped>
.nav {
  width: 80%;
  float: right;
  margin-right: 0px;
  /* margin-right: -10px; */
}
.avthome {
  float: left;
  width: 20%;
  background-image: url("https://i.pinimg.com/736x/a5/2c/6e/a52c6ee2354f5c07cdcb6cdf5f573a3e.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.imghome {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  float: left;
  margin: 10px 0 5px 50px;
}
.text-home {
  text-align: center;
  margin-top: 30px;
  font-size: 14px;
  margin-right: 100px;
  font-weight: 900;
  color: white;
}
.nav-link {
  color: rgb(72, 73, 78);
  float: right;
  margin: 20px -200px;
}
/* .el-input__inner {
  width: 200px;
} */
</style>
