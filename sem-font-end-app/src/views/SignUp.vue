.
<template>
  <div id="cover">
    <div id="form-ui" style="margin-top: 50px">
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        method="post"
        action=""
        style="height: 600px; width: 311.5px"
      >
        <div id="close-form"></div>
        <div id="form-body">
          <div id="welcome-lines" style="margin-top: -55px">
            <div id="w-line-1">Welcome</div>
            <div id="w-line-2">Your Home</div>
          </div>
          <div id="input-area">
            <!-- <div class="f-inp">
              <input type="text" placeholder="Email Address" />
            </div>
            <div class="f-inp">
              <input type="password" placeholder="Password" />
            </div>
            <div class="f-inp" style="margin-top: 15px">
              <input type="password" placeholder="Confirm Password" />
            </div> -->
            <el-form-item
              prop="email"
              label=""
              :rules="[
                {
                  required: true,
                  message: 'Please input email address',
                  trigger: 'blur',
                },
                {
                  type: 'email',
                  message: 'Please input correct email address',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <el-input
                class="f-inp"
                v-model="dynamicValidateForm.email"
                placeholder="Email Address"
              ></el-input>
              <!-- <input type="text" placeholder="Email Address" /> -->
            </el-form-item>
            <el-form-item
              label=""
              prop="password"
              :rules="{
                required: true,
                message: 'Password can not be null',
                trigger: 'blur',
              }"
            >
              <el-input
                class="f-inp"
                v-model="dynamicValidateForm.password"
                placeholder="Password"
              ></el-input>
            </el-form-item>
            <el-form-item
              label=""
              prop="confirm_password"
              :rules="{
                required: true,
                message: 'Confirm Password can not be null',
                trigger: 'blur',
              }"
            >
              <el-input
                class="f-inp"
                v-model="dynamicValidateForm.password"
                placeholder="Confirm Password"
              ></el-input>
            </el-form-item>
          </div>
          <div id="submit-button-cvr">
            <el-button type="submit" id="submit-button">REGISTER</el-button>
          </div>
          <div id="submit-button-cvr">
            <router-link to="/signin" style="text-decoration: none">
              <el-button type="submit" id="submit-button">LOG IN</el-button>
            </router-link>
          </div>
          <div id="bar" style="margin-bottom: 10px"></div>
        </div>
      </el-form>
      <div id="img-box">
        <img
          src="http://k003.kiwi6.com/hotlink/g6uwrzfdof/l_ui.png"
          alt="UI Image"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        password: "",
        email: "",
        confirm_password:""
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /*       resetForm(formName) {
        this.$refs[formName].resetFields();
      }, */
  },
};
</script>

<style scoped>

* {
  outline: none;
}

body {
  margin: 8px;
  background-color: rgb(124, 74, 204);
}

body,
input,
button {
  font-family: "Muli", sans-serif;
}

#cover {
  width: 722px;
  height: 522px;
  padding: 45px;
  margin: 0 auto;
}

#form-ui,
form,
#close-form {
  position: relative;
}

form {
  background-color: #fff;
  box-shadow: 0px 15px 60px #b6354e;
  border-radius: 20px;
}

#close-form {
  position: absolute;
  top: 23px;
  right: 25px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

#close-form:before,
#close-form:after {
  content: "";
  position: absolute;
  top: -2px;
  left: 10px;
  width: 5px;
  height: 28px;
  background-color: rgba(0, 0, 0, 0.06);
  border-radius: 10px;
}

#close-form:before {
  transform: rotateZ(-45deg);
}

#close-form:after {
  transform: rotateZ(45deg);
}

#form-body {
  position: absolute;
  top: 50%;
  right: 25px;
  left: 25px;
  width: 230px;
  margin: -156px auto 0 auto;
}

#welcome-lines {
  text-align: center;
  line-height: 1;
}

#w-line-1 {
  color: #7f7f7f;
  font-size: 40px;
  font-weight: 900;
}

#w-line-2 {
  color: #9c9c9c;
  font-size: 28px;
  margin-top: 17px;
  font-weight: bold;
}

#input-area {
  margin-top: 40px;
}

.f-inp {
  padding: 11px 25px;
  border: 1px solid #e3e3e3;
  line-height: 1;
  border-radius: 20px;
}

.f-inp:first-child {
  margin-bottom: 15px;
}

.f-inp input {
  width: 100%;
  font-size: 13.4px;
  padding: 0;
  margin: 0;
  border: 0;
}

.f-inp input::placeholder {
  color: #b9b9b9;
}

#submit-button-cvr {
  margin-top: 20px;
}

#submit-button {
  display: block;
  width: 100%;
  color: #fff;
  font-size: 14px;
  margin: 0;
  padding: 14px 13px 12px 13px;
  border: 0;
  background-color: #f5506e;
  border-radius: 25px;
  line-height: 1;
  cursor: pointer;
}

#forgot-pass {
  text-align: center;
  margin-top: 10px;
}

#forgot-pass a {
  color: #868686;
  font-size: 12px;
  text-decoration: none;
}

#bar {
  position: absolute;
  left: 50%;
  bottom: -50px;
  width: 28px;
  height: 8px;
  margin-left: -33px;
  background-color: #dfdfdf;
  border-radius: 10px;
}

#bar:before,
#bar:after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #ececec;
  border-radius: 50%;
}

#bar:before {
  right: -20px;
}

#bar:after {
  right: -38px;
}

#img-box {
  position: absolute;
  top: 50%;
  left: 312px;
  width: 394px;
  height: 475px;
  margin-top: -237.5px;
  padding-right: 16px;
  background-color: #fff;
  border-radius: 0 20px 20px 0;
  overflow: hidden;
}

#img-box img {
  display: block;
}
</style>
