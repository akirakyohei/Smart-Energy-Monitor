.
<template>
  <div class="container">
    <div class="nav">
         <el-input
              v-model="search"
              size="medium"
              placeholder="Enter to search ..."
              style="float: center; width: 30%; margin-top: 15px; margin-left: 300px;"
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
        thuytt1599@gmail.column
      </p>
      <i class="el-icon-caret-bottom" style="margin-right: -205px;"></i>
      <el-avatar
        class="avata"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <!-- {{admin.name}} -->
    </div>
    <el-col :span="6">
      <!-- <h5>Custom colors</h5> -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height: 100vh"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span class="main_title">Energy Board</span>
          </template>
          <!-- <el-menu-item-group title="Manage account & embedd">
            <el-menu-item index="1-1">Account</el-menu-item>
            <el-menu-item index="1-2">Device Embedd</el-menu-item>
          </el-menu-item-group> -->
          <!-- el-menu-item-group title="Manage Users">
            <el-submenu index="1-3">
              <template slot="title">Users</template>
              <el-menu-item index="1-3"
                ><span class="demonstration" @click="dialogTableVisible = true"
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
                          <el-button
                            @click="handleClick"
                            type="text"
                            size="small"
                            >Detail</el-button
                          >
                          <el-button type="text" size="small">Edit</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-dialog>
              </el-menu-item>
            </el-submenu>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">VN electricity price list</template>
            <el-menu-item index="1-4-1">
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
              <a href="https://sunemit.com/gia-ban-le-dien-sinh-hoat-cua-evn-moi-nhat/" target="_blank">Explore more</a>
            </el-menu-item>
          </el-submenu> -->
        </el-submenu>
        <el-menu-item index="2">
          <span class="main_title" @click="dialogTableVisible = true"
            ><i class="el-icon-edit-outline"></i>Edit Profile</span
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
        <el-menu-item index="" class="main_title">
          <i class="el-icon-chat-dot-square"></i>
          <span>Chating</span>
        </el-menu-item>
        <el-menu-item index="3" class="main_title">
          <i class="el-icon-message-solid"></i>
          <span>Notification</span>
        </el-menu-item>
        <el-menu-item index="3" class="main_title">
          <i class="el-icon-s-promotion"></i>
          <span>Rating</span>
        </el-menu-item>
        <el-menu-item>
          <!-- <span class="demonstration">click to trigger</span> -->
          <el-dropdown trigger="click">
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
                    <el-button @click="handleClick" type="text" size="small"
                      >Detail</el-button
                    >
                    <el-button type="text" size="small">Edit</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-dropdown-menu>
          </el-dropdown>
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
    <!-- <el-col :span="12">
        <div class="totalE">
        </div>
        <h1> Hùy tai t</h1>
    </el-col> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      gridData: [
        {
          id: "1",
          email: "jack@gmail.com",
          first_name: "Michal",
          last_name: "Jack",
          full_name: "Michal Jack",
          province: "Thừa Thiên Huế",
          mobile: "098xxxxxxx",
          district: "Thừa Thiên Huế",
          village: "Thừa Thiên Huế",
          image: "abc",
          created_at: "2016-05-02",
          updated_at: "2021-02-12",
          active_key: "34xx",
          birth_day: "2016-05-02",
          address: "New York City",
        },
        {
          id: "2",
          email: "jack@gmail.com",
          first_name: "Michal",
          last_name: "Jack",
          full_name: "Michal Jack",
          province: "Thừa Thiên Huế",
          mobile: "098xxxxxxx",
          district: "Thừa Thiên Huế",
          village: "Thừa Thiên Huế",
          image: "abc",
          created_at: "2021-01-15",
          updated_at: "2021-02-15",
          active_key: "34xx",
          birth_day: "2016-05-02",
          address: "New York City",
        },
        {
          id: "3",
          email: "jack@gmail.com",
          first_name: "Michal",
          last_name: "Jack",
          full_name: "Michal Jack",
          province: "Thừa Thiên Huế",
          mobile: "098xxxxxxx",
          district: "Thừa Thiên Huế",
          village: "Thừa Thiên Huế",
          image: "abc",
          created_at: "2021-01-15",
          updated_at: "2021-02-15",
          active_key: "34xx",
          birth_day: "2016-05-02",
          address: "New York City",
        },
        {
          id: "4",
          email: "jack@gmail.com",
          first_name: "Michal",
          last_name: "Jack",
          full_name: "Michal Jack",
          province: "Thừa Thiên Huế",
          mobile: "098xxxxxxx",
          district: "Thừa Thiên Huế",
          village: "Thừa Thiên Huế",
          image: "abc",
          created_at: "2021-01-15",
          updated_at: "2021-02-15",
          active_key: "34xx",
          birth_day: "2016-05-02",
          address: "New York City",
        },
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Home",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Office",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Home",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Office",
        },
      ],
      tableElec: [
        {
          bac: "1",
          gia_cu: "1.678",
          gia: "1.549",
          tieu_thu: "0-50",
        },
        {
          bac: "2",
          gia_cu: "1.600 ",
          gia: "1.734  ",
          tieu_thu: "51 – 100",
        },
        {
          bac: "3",
          gia_cu: "1.858",
          gia: "2.014",
          tieu_thu: "101 – 200 ",
        },
        {
          bac: "4",
          gia_cu: "2.340",
          gia: "2.536",
          tieu_thu: "201 – 300",
        },
        {
          bac: "5",
          gia_cu: "2.615",
          gia: "2.834 ",
          tieu_thu: "301 – 400",
        },
        {
          bac: "6",
          gia_cu: "2.701",
          gia: "2.927 ",
          tieu_thu: "Lớn hơn từ 401",
        },
      ],
      tabPosition: "left",
      dialogTableVisible: false,
      dialogTableElecVisible: false,
    };
  },
};
</script>

<style scoped>
.nav {
  background-color: bisque;
  height: 60px;
}
.tableData {
  width: 100vh;
}
.avata {
  float: right;
  margin: auto;
  margin-right: 20px;
  margin-top: 10px;
}
.el-icon-caret-bottom {
  float: right;
  margin: 25px -65px 0 0;
}
.main_title {
  font-weight: 900;
  font-size: 19px;
}
.el-popover {
  margin-top: 70px;
  margin-left: 50vh;
  /* background: rgb(80, 74, 74); */
}
a {
    color: rgb(219, 221, 255);
}
.outD {
}
</style>
