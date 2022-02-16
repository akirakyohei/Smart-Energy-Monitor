<template>
  <div class="sidebar">
    <div class="menu-items">
      <router-link
        to="/rolead"
        active-class="active"
        tag="button"
        exact
        class="side-btn"
      >
        <div class="link-container">Quản lý Vai trò</div>
      </router-link>
      <router-link
        to="/admincrud"
        active-class="active"
        tag="button"
        exact
        class="side-btn"
      >
        <div class="link-container">Quản lý Admin</div>
      </router-link>
      <router-link
        to="/areacrud"
        active-class="active"
        tag="button"
        exact
        class="side-btn"
      >
        <div class="link-container">Quản lý Khu vực</div>
      </router-link>
      <router-link
        to="/upaccountads"
        active-class="active"
        tag="button"
        exact
        class="side-btn"
      >
        <div class="link-container">Tài khoản</div>
      </router-link>
      <router-link
        to="/epricecrud"
        active-class="active"
        tag="button"
        exact
        class="side-btn"
      >
        <div class="link-container">Bảng giá điện</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.sidebar {
  height: 100%;
  width: 371px;
  /* background-color: rgb(223, 215, 215); */
  /* background-image: url("https://generatorist.com/wp-content/uploads/2019/05/house-at-lake-with-lightss-on.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover; */
  background-color: rgb(230, 167, 116);
  margin-left: 10px;
  border: 10px 10px 10px 10px;
  overflow:hidden;
}
/* .title {
  color: black;
  font-size: 24px;
  margin-top: 10px;
} */

.menu-items {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-left: 6px;
}

.menu-items > * {
  margin-top: 60px;
}

.side-btn {
  border: 2px 2px 2px 2px;
  padding: 16px 0px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: rgb(252, 247, 247);
  background-color: transparent;
  border-radius: 25px 25px 25px 25px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: rgb(44, 44, 46);
}

.side-btn:focus {
  outline: none;
}

.side-btn.active {
  position: relative;
  background-color: white;
  /* color: teal; */
  color: black;
  font-weight: 600;
  margin-left: 20px;
  border-radius: 30px 0 0 30px;
  width: 345px;
  border-right: none;
}

.side-btn.active::before {
  top: -30px;
}

.side-btn.active::after {
  bottom: -30px;
}

.side-btn.active::before,
.side-btn.active::after {
  position: absolute;
  content: "";
  right: 0;
  height: 30px;
  width: 30px;
  background-color: white;
}

.side-btn.active .link-container::before {
  top: -60px;
  margin-left: 20px;
}

.side-btn.active .link-container::after {
  bottom: -60px;
  z-index: 99;
}

.side-btn.active .link-container::before,
.side-btn.active .link-container::after {
  position: absolute;
  content: "";
  right: 0px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  /* background-image: url("https://generatorist.com/wp-content/uploads/2019/05/house-at-lake-with-lightss-on.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover; */
  background-color: rgb(230, 167, 116);
}

</style>
