<template>
  <div class="center">
    <div class="nav">
      <el-input
        size="medium"
        placeholder="Nhấn để tìm kiếm ..."
        style="
          width: 400px;
          margin-top: 15px;
          margin-left: 200px;
          padding-left: 200px;
          padding-right: 200px;
        "
      />
      <p
        style="
          float: right;
          margin: auto;
          text-align: center;
          margin-top: 20px;
          margin-right: 20px;
        "
      >
        Admin
      </p>
      <i class="el-icon-caret-bottom"></i>
      <el-avatar
        class="avata"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <!-- {{admin.name}} -->
    </div>
    <div class="left">
      <el-col style="background: white">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy_Eoydl72AHQ_0JA75NTVpkhqWdIO7Zj0D4lPGMCIC0ice4xPFnDvFWCjoPCjlsCTcMQ&usqp=CAU"
          alt="about image"
          class="imghome"
        />
        <p class="text-home">YOUR HOME</p>
        <hr style="margin-top: 50px" />
      </el-col>
      <el-col>
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item index="1" class="main_title">
            <i class="el-icon-s-help"></i>
            <!-- <span>Biểu đồ điện năng</span> -->
            <router-link
        to="/payment"
        active-class="active"
        tag="button"
        exact
        class="side-btn"
      >
        <div class="link-container">Messages</div>
      </router-link>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span class="main_title">Quản lý</span>
            </template>
            <!--             <el-menu-item-group title="Quản lý thiết bị"> -->
            <!-- <el-menu-item index="1-1">Update Account</el-menu-item> -->
            <el-menu-item index="1-1">Quản lý thiết bị</el-menu-item>
            <el-menu-item index="1-2">Quản lý Khách hàng</el-menu-item>
            <el-menu-item index="1-3">Hóa đơn</el-menu-item>
            <!-- </el-menu-item-group> -->
            <!-- <el-menu-item-group title="Manage Users"> -->
            <!--  <el-submenu index="1-3">
                <template slot="title">Users</template>
                <el-menu-item index="1-3"
                  ><span
                    class="demonstration"
                    @click="dialogTableVisible = true"
                    >User</span
                  >
                  <el-dialog>
                    <template slot="scope">
                      <el-table :data="tableData" style="width: 100%">
                        <el-table-column
                          fixed
                          prop="date"
                          label="Date"
                          width="150"
                        >
                        </el-table-column>
                        <el-table-column prop="name" label="Name" width="120">
                        </el-table-column>
                        <el-table-column prop="state" label="State" width="120">
                        </el-table-column>
                        <el-table-column prop="city" label="City" width="120">
                        </el-table-column>
                        <el-table-column
                          prop="address"
                          label="Address"
                          width="300"
                        >
                        </el-table-column>
                        <el-table-column prop="zip" label="Zip" width="120">
                        </el-table-column>
                        <el-table-column
                          fixed="right"
                          label="Operations"
                          width="120"
                        >
                          <template slot="scope">
                            <el-button type="text" size="small"
                              >Detail</el-button
                            >
                            <el-button type="text" size="small">Edit</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-dialog>
                </el-menu-item>
              </el-submenu> -->
            <!-- </el-menu-item-group> -->
            <!-- <el-submenu index="1-3">
              <template slot="title">Hóa đơn</template> -->
            <!--  <el-menu-item index="1-4-1">
                <span @click="dialogTableElecVisible = true"
                  >Electricity price</span
                >
                <el-dialog :visible.sync="dialogTableElecVisible">
                  <h1>Bậc giá bán lẻ điện sinh hoạt</h1>
                  <template>
                    <el-table :data="tableElec" style="width: 100%">
                      <el-table-column prop="bac" label="Bậc" width="50">
                      </el-table-column>
                      <el-table-column
                        prop="tieu_thu"
                        label="Tiêu Thụ (kWh)"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column prop="gia" label="Giá (Đồng/kWh)">
                      </el-table-column>
                      <el-table-column prop="gia_cu" label="Giá Cũ (Đồng/kWh)">
                      </el-table-column>
                    </el-table>
                  </template>
                </el-dialog>
              </el-menu-item>
              <el-menu-item index="1-4-2">
                <a
                  href="https://sunemit.com/gia-ban-le-dien-sinh-hoat-cua-evn-moi-nhat/"
                  target="_blank"
                  >Explore more</a
                >
              </el-menu-item> -->
            <!-- </el-submenu> -->
          </el-submenu>

          <el-menu-item index="2">
            <span class="main_title" @click="dialogTableVisible = true"
              ><i class="el-icon-edit-outline"></i>Tài khoản</span
            >
            <!-- <i class="el-icon-menu"></i> -->
            <!--           <i class="el-icon-menu"></i>
          <span>Navigator Two</span> -->
            <!-- <el-popover placement="right" width="100vh" trigger="click" offset="200 200 40 400"> -->
            <!--          <i class="el-icon-menu"></i>
            <span>Navigator Two</span> -->
            <el-dialog
              title="Shipping address"
              class="outD"
              :visible.sync="dialogTableVisible"
            >
              <el-table
                :data="gridData"
                stripe
                class="tableData"
                style="height: 100vh; width: 100vh"
              >
                <el-table-column
                  width="50"
                  property="id"
                  label="ID"
                ></el-table-column>
                <el-table-column
                  width="100"
                  property="first_name"
                  label="First Name"
                ></el-table-column>
                <el-table-column
                  width="100"
                  property="last_name"
                  label="Last Name"
                ></el-table-column>
                <el-table-column
                  width="200"
                  property="full_name"
                  label="Full Name"
                ></el-table-column>
                <el-table-column
                  width="250"
                  property="address"
                  label="Address"
                ></el-table-column>
                <el-table-column
                  width="250"
                  property="province"
                  label="Province"
                ></el-table-column>
                <el-table-column
                  width="300"
                  property="email"
                  label="Email"
                ></el-table-column>
                <el-table-column
                  width="100"
                  property="mobile"
                  label="Mobile"
                ></el-table-column>
                <el-table-column
                  width="200"
                  property="district"
                  label="District"
                ></el-table-column>
                <el-table-column
                  width="200"
                  property="village"
                  label="Village"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="image"
                  label="Image"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="birth_day"
                  label="Birth Day"
                ></el-table-column>
                <el-table-column
                  width="200"
                  property="created_at"
                  label="Created At"
                ></el-table-column>
                <el-table-column
                  width="200"
                  property="updated_at"
                  label="Updated At"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="active_key"
                  label="Active Key"
                ></el-table-column>
              </el-table>
              <!-- <span slot="reference">Navigator Two</span> -->
              <!-- <el-button slot="reference">Click to activate</el-button> -->
              <!-- <span class="main_title"
              ><i class="el-icon-menu"></i>Customers's information</span
            > -->
            </el-dialog>
            <!-- </el-popover> -->
          </el-menu-item>

          <el-menu-item>
            <!--  <span class="demonstration">click to trigger</span> -->
            <!-- <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" placement="bottom-end">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="date" label="Date" width="150">
                </el-table-column>
                <el-table-column prop="name" label="Name" width="120">
                </el-table-column>
                <el-table-column prop="state" label="State" width="120">
                </el-table-column>
                <el-table-column prop="city" label="City" width="120">
                </el-table-column>
                <el-table-column prop="address" label="Address" width="300">
                </el-table-column>
                <el-table-column prop="zip" label="Zip" width="120">
                </el-table-column>
                <el-table-column fixed="right" label="Operations" width="120">
                  <template slot="scope">
                    <el-button type="text" size="small"
                      >Detail</el-button
                    >
                    <el-button type="text" size="small">Edit</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-dropdown-menu>
          </el-dropdown> -->
          </el-menu-item>
          <!-- <el-menu-item>
          <el-button type="text" @click="dialogTableVisible = true"
            >open a Table nested Dialog</el-button
          >

          <el-dialog
            title="Shipping address"
            :visible.sync="dialogTableVisible"
          >
            <el-table :data="gridData"
              ><el-button type="text" @click="dialogTableVisible = true"
                >open a Table nested Dialog</el-button
              >

              <el-dialog
                title="Shipping address"
                :visible.sync="dialogTableVisible"
              >
                <el-table :data="gridData">
                  <el-table-column
                    property="date"
                    label="Date"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    property="name"
                    label="Name"
                    width="200"
                  ></el-table-column>
                  <el-table-column
                    property="address"
                    label="Address"
                  ></el-table-column>
                </el-table>
              </el-dialog>
              <el-table-column
                property="date"
                label="Date"
                width="150"
              ></el-table-column>
              <el-table-column
                property="name"
                label="Name"
                width="200"
              ></el-table-column>
              <el-table-column
                property="address"
                label="Address"
              ></el-table-column>
            </el-table>
          </el-dialog>
        </el-menu-item> -->
          <!-- <el-menu-item index="4" disabled>
          <i class="el-icon-setting"></i>
          <span>Navigator Four</span>
        </el-menu-item> -->
        </el-menu>
      </el-col>
      <div class="top">
        <img src="https://www.obloliving.com/wp-content/uploads/revslider/home-slider-21-1/11-2.gif"
        class="top-img"
        >

      </div>
    </div>
  </div>
</template>

<script>
/* import TopNavabar from "../views/TopNavabar.vue" */
export default {

};
</script>

<style>
.center {
  background: whitesmoke;
}
.nav {
  width: 80%;
  float: right;
}

.left {
  float: left;
  width: 20%;
  height: 100vh;
  background: white;
}
.img {
}
.imghome {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  float: left;
  margin: 20px 0 10px 50px;
}
.text-home {
  text-align: center;
  margin-top: 40px;
  font-size: 14px;
  margin-right: 100px;
  font-weight: 900;
}
/* .main_title {
  float: left;
} */
.top-img {
  margin-top: 250px;
  height: 350px;
  width: 360px;
}
</style>
