.
<template>
  <div class="container">
    <h1>Quản lý thiết bị nhúng</h1>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="STT" prop="stt" width="100"> </el-table-column>
      <el-table-column label="Ten thiet bi" prop="name" width="150"> </el-table-column>
      <el-table-column label="Anh" prop="image" width="150"> </el-table-column>
      <el-table-column label="Mo ta" prop="description"> </el-table-column>
      <el-table-column label="Ngay tao" prop="date_created" width="150"> </el-table-column>
      <el-table-column label="Ngay cap nhat" prop="date_updated" width="150">
      </el-table-column>
       <el-table-column
        label="Tinh trang"
        prop="status"
        width="150"
        :filters="[
          { text: 'Active', value: 'Active' },
          { text: 'Offline', value: 'Offline' },
        ]"
        :filter-method="filterTag"
      >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.status === 'Active' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.status}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input
            v-model="search"
            class="searchRole"
            size="mini"
            icon="el-icon-search"
            placeholder="Enter to search"
            style="float: left; width: 60%"
          />
          <el-button
            size="mini"
            type="primary"
            class="addRole"
            @click="addNewRole = true"
            style="float: right; width: 20%"
          >
            Them
          </el-button>
        </template>
        <template slot-scope="">
          <el-button size="mini" @click="editRole = true">Edit</el-button>
          <el-button size="mini" type="danger" @click="isShowDeleteModal = true"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog item="" :visible.sync="isShowDeleteModal">
      <div class="text-left" style="height: 100px">
        <span style="float: left; font-weight: bold">Are you sure?</span>
        <br />
        <p style="float: left">Are you sure you want to delete this record?</p>
        <span
          slot="footer"
          class="dialog-footer"
          style="float: right; margin-top: 50px"
        >
          <el-button type="danger" size="mini" @click="closeShowDeleteModal()"
            >Cancel
          </el-button>
          <el-button type="primary" size="mini" @click="handleDeleteTitle()"
            >Accept
          </el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog
      title="Them vai tro"
      :visible.sync="addNewRole"
      style="font-size: 24px; font-weight: 900"
    >
      <el-form :model="form" style="border: none">
        <el-form-item
          label="Ten:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="Type name..."
            style="margin-left: -200px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Dia chi:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.address"
            autocomplete="off"
            placeholder="Type name..."
            style="margin-left: -200px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Vai tro:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-select
            v-model="form.region"
            placeholder="Please select"
            style="margin-left: -220px"
          >
            <el-option label="Admin Bac Long Bien" value="shanghai"></el-option>
            <el-option label="Admin Long Bien" value="shanghai"></el-option>
            <el-option label="Thu ngan Long Bien" value="beijing"></el-option>
            <el-option label="Nhan vien Long Bien" value="shanghai"></el-option>
            <el-option label="Nhan vien Long Bien" value="beijing"></el-option>
            <el-option label="Admin Nam Long Bien" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Hoac:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="Nhap ten moi khac"
            style="margin-left: -200px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNewRole = false">Cancel</el-button>
        <el-button type="primary" @click="addNewRole = false">Add</el-button>
      </span>
    </el-dialog>
    <el-dialog item="" :visible.sync="editRole">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Password" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Age" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Submit</el-button
          >
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          stt: "1",
          name: "NodeMCU ESP8266",
          image: "",
          status: "Active",
          description: "Chức năng: đọc các thông tin mạch điện và truyền nó đến server xử lý lưu trữ",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
        },
        {
          stt: "2",
          name: "NodeMCU ESP8266",
          image: "",
          status: "Active",
          description: "Chức năng: đọc các thông tin mạch điện và truyền nó đến server xử lý lưu trữ",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
        },
        {
          stt: "3",
          name: "NodeMCU ESP8266",
          image: "",
          status: "Active",
          description: "Chức năng: đọc các thông tin mạch điện và truyền nó đến server xử lý lưu trữ",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
        },
        {
          stt: "4",
          name: "NodeMCU ESP8266",
          image: "",
          status: "Active",
          description: "Chức năng: đọc các thông tin mạch điện và truyền nó đến server xử lý lưu trữ",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
        },
      ],
      search: "",
      isShowDeleteModal: false,
      addNewRole: false,
      editRole: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",

      },

      formLabelWidth: "120px",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style>
.container {
  background: White;
  height: 100vh;
  width: 80%;
  float: right;
}
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-button {
  text-align: center;
  font-size: 10px;
}
.el-form {
  box-shadow: 0px 15px 60px white;
}
.el-dialog__body {
  height: 300px;
}
.el-input__inner {
  width: 200px;
}
.adRole {
}
.searchRole {
  /* style="float: left; width: 60%; padding-right: 30px;" */
}
</style>
