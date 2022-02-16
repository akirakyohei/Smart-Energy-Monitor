.
<template>
<div id="signin">
  <div id="cover">
    <div id="form-ui" style="margin-top: 50px">
      <el-form
        
        ref="dynamicValidateForm"
        method="post"
        action=""
        style="height: 540px; width: 311.5px"
      >
        <div id="close-form"></div>
        <div id="form-body">
          <div id="welcome-lines" style="margin-top: -25px">
            <div id="w-line-1">Welcome</div>
            <div id="w-line-2">Your Home</div>
          </div>
          <div id="input-area">
            <!--  -->
            <el-form-item
              prop="email"
              label=""
              
            >
              <el-input
              :model="dynamicValidateForm.email"
                class="f-inp"
                type="email"
                v-model="signin.email"
                placeholder="Email Address"
                
              >
              
              </el-input>
              <!-- <input type="text" placeholder="Email Address" /> -->
            
            </el-form-item>
            <el-form-item
              label=""
              prop="password"
              
            >
              <el-input
              :model="dynamicValidateForm.password"
                class="f-inp"
                type="password"
                v-model="signin.password"
                placeholder="Password"
              ></el-input>
            </el-form-item>
            <!-- <input type="password" placeholder="Password" /> -->
          </div>
          <div id="submit-button-cvr" style="margin-top: 40px">
            <!-- <router-link to="/homepage" style="text-decoration: none"> -->
              <el-button type="submit" id="submit-button" @click="signIn">LOG IN</el-button>
            <!-- </router-link> -->
          </div>
          <div id="submit-button-cvr">
            <router-link to="" style="text-decoration: none">
              <el-button type="submit" id="submit-button" disabled>REGISTER</el-button>
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
</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dynamicValidateForm: {
        password: "",
        email: "",
      },
       signin: {
        email: "",
        password: "",
      },
      errored: false,
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
    async signIn() {
      console.log(this.signin);
      await axios
        .post("https://mockup-api.herokuapp.com/auth/signin", this.signin)
        .then((response) => {
          let newToken = response.data.auth_token;
          window.token = newToken;
          let email = response.data.email;
          // let email = response.da
          localStorage.setItem("token", newToken);
          localStorage.setItem("email", email);
          // localStorage.setItem("email", JSON.stringify(user));
          window.axios.defaults.params = { auth_token: newToken };
          // Event.$emit("signin", user);
          this.errored = false;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
      if (!this.errored) this.$router.push({ path: "/dashboard" });
      if (this.errored) this.$router.push({ path: "/dashboardcus" });
      if (this.errored == 422) this.$router.push({ path: "/dashboardads" });
      /* if (this.errored !=0) this.$router.push({ path: "/dashboardads" }); */
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
#signin {
  width: 100%;
  height: 100%;
  background-color: rgb(124, 74, 204);
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
  margin-top: 25px;
}

.f-inp {
  padding: 10px 10px;
  border: none;
  line-height: 1;
  border-radius: 50px 20px 30px 100px;
}

.f-inp:first-child {
  margin-bottom: 2px;
  border: none;
}

.f-inp input {
  width: 100%;
  font-size: 15px;
  height: 15px;
  padding: 0;
  margin: 0;
  border: none;
  
}
.el-input__inner {
  border: 1px solid #a50101;
  border-radius: 50px 20px 30px 100px;
  background: red;
}
.f-inp input::placeholder {
  color: #b9b9b9;
  border: none;
}

#submit-button-cvr {
  margin-top: 10px;
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
