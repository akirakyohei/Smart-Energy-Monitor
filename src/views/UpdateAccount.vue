.
<template>
  <div class="card-body">
    <el-col :span="12" style="background: white; height: 800px">
      <h1>Edit Profile</h1>
      <div class="user_name">
        <span class="demo-input-label">User Name</span>
        <el-input
          placeholder="Customer1"
          prefix-icon="el-icon-user"
          v-model="input2"
        >
        </el-input>
      </div>
      <div class="user_email">
        <span style="margin-right: 20px">E-mail</span>
        <el-input
          placeholder="cus1@gmail.com"
          prefix-icon="el-icon-eleme"
          v-model="input2"
          style="margin-right: -15px"
        >
        </el-input>
      </div>
      <div class="first_name">
        <span>Ho va ten</span>
        <el-input
          placeholder="Allan Thomas"
          prefix-icon="el-icon-edit"
          v-model="input2"
          style="margin-left: 40px"
        >
        </el-input>
      </div>
      <div class="last_name">
        <span>Dia chi</span>
        <el-input
          placeholder="so nha x, duong x, quan A, ..."
          prefix-icon="el-icon-edit"
          v-model="input2"
          style="margin-left: 60px"
        >
        </el-input>
        <div class="mobile_phone">
          <span>So dien thoai</span>
          <el-input
            placeholder="09xxxxx"
            prefix-icon="el-icon-mobile-phone"
            v-model="input2"
            style="margin-right: 15px"
          >
          </el-input>
        </div>

        <!-- giao dien update nguoi dung 
          <div class="adress">
          <span>First Name</span>
          <el-input
            placeholder="village, province, district (lang ban, tinh, khu vuc)"
            prefix-icon="el-icon-location-outline"
            v-model="input2"
          >
          </el-input>
        </div> 
        
        -->
        <!-- giao dien update admin khu vuc
          <div class="area">
          <span>First Name</span>
          <el-input
            placeholder="village, province, district (lang ban, tinh, khu vuc)"
            prefix-icon="el-icon-location-outline"
            v-model="input2"
          >
          </el-input>
        </div> 
        
        -->

        <br />
        <br />

        <el-button type="success" round style="margin-left: 210px"
          >Update<i class="el-icon-upload el-icon-right"></i
        ></el-button>
      </div>
    </el-col>
    <div class="profile">
      <el-col
        :span="6"
        style="background: white; margin-left: 20px; height: 600px"
      >
        <div class="image" style="text-align: center">
          <img
            src="https://www.w3schools.com/howto/img_link_tree_template3_bio.jpg"
            class="w3-round"
            alt="person image"
            width="200px"
            height="200px"
            style="
              border-radius: 50%;
              border: 5px solid #4ab6e0 !important;
              margin-top: 16px;
            "
          />
        </div>
        <h2 style="margin-left: 0px; margin-top: 20px">Allan Thomas</h2>
        <h5 style="margin-bottom: 20px; margin-top: 10px;"><i>Thomas123</i></h5>
        <p style="margin-left: 10px; font-size: 15px;">
          "Lamborghini Mercy Your chick she so thirsty I'm in that two seat
          Lambo"
        </p>
        <ul class="icons">
          <li style="width: 35px; height: 35px">
            <i class="fab fa-facebook-f"></i>
          </li>
          <li style="width: 35px; height: 35px">
            <i class="fab fa-twitter"></i>
          </li>
          <li style="width: 35px; height: 35px">
            <i class="fab fa-linkedin"></i>
          </li>
          <li style="width: 35px; height: 35px">
            <i class="fab fa-instagram"></i>
          </li>
        </ul>

        <el-button type="primary" round style="margin-top: 20px"
          >Upload<i class="el-icon-upload el-icon-right"></i
        ></el-button>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.el-input {
  width: 50%;
  margin-left: 30px;
}
.avatar {
  margin-right: 70px;
}
/* .profile {
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy_Eoydl72AHQ_0JA75NTVpkhqWdIO7Zj0D4lPGMCIC0ice4xPFnDvFWCjoPCjlsCTcMQ&usqp=CAU');
background-repeat: repeat;
} */
.user_name {
  margin-top: 100px;
}
.el-input__icon {
  margin-left: 30px;
}

.user_email,
.first_name,
.last_name,
.mobile_phone {
  margin-top: 20px;
}
.image {
  background-image: url("https://www.w3schools.com/howto/img_link_tree_template3_bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.icons {
  margin-top: 50px;
  background-color: aliceblue;
  margin-bottom: 10px;
}
</style>
