.
<template>
  <div class="container-update-acc">
    <h1 style="margin-left: 100px">Chỉnh sửa tài khoản</h1>
    <el-row>
      <el-col :span="12" class="edit-acc">
        <div class="user_name">
          <span class="demo-input-label">Tên người dùng</span>
          <el-input
            class="input-acc"
            placeholder="admin_Long Biên"
            prefix-icon="el-icon-user"
            v-model="input2"
            style="margin-right: 35px"
          >
          </el-input>
        </div>
        <div class="user_email">
          <span style="margin-right: 20px">E-mail</span>
          <el-input
            class="input-acc"
            placeholder="vdh@gmail.com"
            prefix-icon="el-icon-eleme"
            v-model="input2"
            style="margin-right: -15px"
          >
          </el-input>
        </div>
        <div class="first_name">
          <span>Họ và tên</span>
          <el-input
            class="input-acc"
            placeholder="VŨ ĐÌNH HUY"
            prefix-icon="el-icon-edit"
            v-model="input2"
            style="margin-left: 40px"
          >
          </el-input>
        </div>
        <div class="last_name">
          <span>Địa chỉ</span>
          <el-input
            class="input-acc"
            placeholder="Phường Phúc Lợi, Quận Long Biên, Thành phố Hà Nội"
            prefix-icon="el-icon-edit"
            v-model="input2"
            style="margin-left: 60px"
          >
          </el-input>
          <div class="mobile_phone">
            <span>Số điện thoại</span>
            <el-input
              class="input-acc"
              placeholder="0389990802"
              prefix-icon="el-icon-mobile-phone"
              v-model="input2"
              style="margin-right: 15px"
            >
            </el-input>
          </div>

          <!-- giao dien update nguoi dung 
          <div class="adress">
          <span>First Name</span>
          <el-input class="input-acc"
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
          <el-input class="input-acc"
            placeholder="village, province, district (lang ban, tinh, khu vuc)"
            prefix-icon="el-icon-location-outline"
            v-model="input2"
          >
          </el-input>
        </div> 
        
        -->

          <br />
          <br />

          <el-button type="success" round style="margin-left: 200px"
            >Cập nhật<i class="el-icon-upload el-icon-right"></i
          ></el-button>
        </div>
      </el-col>
      <el-col
        :span="12"
        style="
          background: white;
          height: 600px;
          width: 40%;
          float: right;
          margin-top: 50px;
        "
      >
        <div class="image" style="text-align: center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtnAZ6u4hWrraX6krf5owMLzFMM0cNlx1asQJI7AtEZDEFmKZJT3eYrlKCN0j2kRpT4qI&usqp=CAU"
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
        <h2 style="margin-left: 0px; margin-top: 20px">Vũ Đình Huy</h2>
        <h5 style="margin-bottom: 20px; margin-top: 10px">
          <i>HuyVu123</i>
        </h5>
        <p style="margin-left: 10px; font-size: 15px">
          “ Nếu bạn không chịu bắt tay vào làm thì chẳng có điều gì là khả thi cả” <br> – Jack Ma – 
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
        <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button type="primary" round style="margin-top: 20px"
          >Tải lên<i class="el-icon-upload el-icon-right"></i
        ></el-button>
  <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
</el-upload>
        <!-- <el-button type="primary" round style="margin-top: 20px"
          >Tải lên<i class="el-icon-upload el-icon-right"></i
        ></el-button> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: ''
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style scoped>
.input-acc {
  width: 50%;
  margin-left: 30px;
}
.avatar {
  margin-right: 7px;
}
/* .profile {
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy_Eoydl72AHQ_0JA75NTVpkhqWdIO7Zj0D4lPGMCIC0ice4xPFnDvFWCjoPCjlsCTcMQ&usqp=CAU');
background-repeat: repeat;
} */
.user_name {
  margin-top: 100px;
}
.el-input__icon {
  height: 100%;
  width: 115px;
  text-align: center;
  transition: all 0.3s;
  line-height: 40px;
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
.container-update-acc {
  width: 100vh;
  margin: 50px 0 0 150px;
  text-align: center;
}
.edit-acc {
  /* background: rgb(226, 151, 151); */
  height: 500px;
  width: 60%;
  float: left;
  border-radius: 20px 20px 20px 20px;
  /* border: 20px solid black; */
}
.cnt {
  margin-right: -20px;
}
</style>
