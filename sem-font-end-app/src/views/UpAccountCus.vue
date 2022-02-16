.
<template>
  <div class="container-update-acc">
    <h1 style="margin-left: 150px;">Chỉnh sửa tài khoản</h1>

    <el-row>
      <el-col :span="12" class="edit-acc">
        <div class="user_name">
          <span class="demo-input-label">Tên người dùng</span>
          <el-input
            class="input-acc"
            placeholder="Khánh Linh"
            prefix-icon="el-icon-user"
            v-model="input0"
            style="margin-right: 35px"
          >
          </el-input>
        </div>
        <div class="user_email">
          <span style="margin-right: 20px">E-mail</span>
          <el-input
            class="input-acc"
            placeholder="tkl@gmail.com"
            prefix-icon="el-icon-eleme"
            v-model="input1"
            style="margin-right: -15px"
          >
          </el-input>
        </div>
        <div class="first_name">
          <span>Họ và tên</span>
          <el-input
            class="input-acc"
            placeholder="TRẦN KHÁNH LINH"
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
            placeholder="Số 18 Ngõ 45 Đường Vũ Đức Thận"
            prefix-icon="el-icon-edit"
            v-model="input3"
            style="margin-left: 60px"
          >
          </el-input>
          <div class="mobile_phone">
            <span>Số điện thoại</span>
            <el-input
              class="input-acc"
              placeholder="0988188901"
              prefix-icon="el-icon-mobile-phone"
              v-model="input4"
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
            @click="open()">Cập nhật<i class="el-icon-upload el-icon-right"></i
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
            src="https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png"
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
        <h2 style="margin-left: 0px; margin-top: 20px">Trần Khánh Linh</h2>
        <h5 style="margin-bottom: 20px; margin-top: 10px">
          <i>LinhKhanh</i>
        </h5>
        <p style="margin-left: 10px; font-size: 15px">
           "Trong một thế giới đang thay đổi rất nhanh chóng, lộ trình duy nhất đưa bạn đến thất bại là không dám mạo hiểm” <br>– Mark Zuckerberg –
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
          >Tải lên<i class="el-icon-upload el-icon-right"></i
        ></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input0: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
    }
  },
  methods: {
    open() {
        this.$message({
          message: 'Cập nhật thành công.',
          type: 'success'
        });
      },
  }
};
</script>

<style scoped>
.input-acc {
  width: 50%;
  margin-left: 30px;
}
/* .input-acc {
  display:inline-block;
  position: relative;
        z-index: 2;
  width: 50%;
  margin-left: 30px;
}
.mobile-phone{
  float: right;
        margin-right: 6px;
        margin-top: -20px;
        position: relative;
        z-index: 2;
} */
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
  margin-left: 50px;
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
