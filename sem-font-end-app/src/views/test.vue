<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <p>State: {{ props.row.state }}</p>
        <p>City: {{ props.row.city }}</p>
        <p>Address: {{ props.row.address }}</p>
        <p>Zip: {{ props.row.zip }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="Date"
      prop="date">
    </el-table-column>
    <el-table-column
      label="Name"
      prop="name">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-08',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-06',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-07',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }]
      }
    }
  }
</script>
.
<template>
  <div class="container">
    <h1 style="margin: 20px 0 0 0;">Danh sách vai trò</h1>
    <h3 style="margin-bottom: 20px;"><i> (List Role)</i></h3>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="Ten" prop="ten" width="150"> </el-table-column>
      <el-table-column label="Vai tro" prop="role" width="150"> </el-table-column>
      <el-table-column label="Dia chi" prop="address"> </el-table-column>
      <el-table-column label="Ngay tao" prop="date_created" width="150"> </el-table-column>
      <el-table-column label="Ngay cap nhat" prop="date_updated" width="150">
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
          ten: "Tom",
          address: "Phuong Long Bien, Quan Long Bien, TP Ha Noi",
          role: "Quan tri vien",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
        },
        {
          ten: "Thomas",
          address: "Phuong Long Bien, Quan Long Bien, TP Ha Noi",
          role: "Thu ngan",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
        },
        {
          ten: "Mathiu",
          address: "Phuong Long Bien, Quan Long Bien, TP Ha Noi",
          role: "Nhan vien",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
        },
        {
          ten: "Tomasmo",
          address: "Phuong Long Bien, Quan Long Bien, TP Ha Noi",
          role: "Nhan vien",
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

<style scoped>
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

1.
<template>
  <div class="container">
    <h1>Bậc giá bán lẻ điện sinh hoạt</h1>
    <h3>Mo ta: </h3>
    <br />
    <el-table :data="tableElec" style="width: 100%">
      <el-table-column prop="bac" label="Bậc" width="50"> </el-table-column>
      <el-table-column prop="tieu_thu" label="Tiêu Thụ (kWh)" width="180">
      </el-table-column>
      <el-table-column prop="gia" label="Giá (Đồng/kWh)"> </el-table-column>
      <el-table-column prop="gia_cu" label="Giá Cũ (Đồng/kWh)">
      </el-table-column>
      <el-table-column fixed="right" width="350">
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
          <el-button size="mini" @click="editRole = true" class="btnEdit"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="isShowDeleteModal = true"
            class="btnDel"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    };
  },
};
</script>

<style scoped></style>



1.
<template>
  <div class="container">
    <h1>Bậc giá bán lẻ điện sinh hoạt</h1>
    <h3>Mo ta: </h3>
    <br />
    <el-table :data="tableElec" style="width: 100%">
      <el-table-column prop="bac" label="Bậc" width="50"> </el-table-column>
      <el-table-column prop="tieu_thu" label="Tiêu Thụ (kWh)" width="180">
      </el-table-column>
      <el-table-column prop="gia" label="Giá (Đồng/kWh)"> </el-table-column>
      <el-table-column prop="gia_cu" label="Giá Cũ (Đồng/kWh)">
      </el-table-column>
      <el-table-column fixed="right" width="350">
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
          <el-button size="mini" @click="editRole = true" class="btnEdit"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="isShowDeleteModal = true"
            class="btnDel"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    };
  },
};
</script>

<style scoped></style>
