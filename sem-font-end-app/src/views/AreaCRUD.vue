.
<template>
  <div class="container">
    <h1>Danh sách khu vực quản lý</h1>
    <h3 style="margin-bottom: 20px;"><i>(List Area)</i></h3>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      stripe
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>
            <i>Số hộ dân đang sử dụng hệ thống: {{ props.row.state }}</i>
          </p>
          <br />
          <!-- <p>
            <i>Cơ chế làm việc: {{ props.row.city }}</i>
          </p> -->
        </template>
      </el-table-column>
      <el-table-column label="STT" prop="stt" width="70" fixed>
      </el-table-column>
      <el-table-column label="Tên khu vực" prop="name" width="250" fixed>
      </el-table-column>
      <!-- <el-table-column label="Ảnh" prop="image" width="200" fixed>
        <template slot-scope="scope">
          <img :src="`${scope.row.image}`" class="image" />
        </template>
      </el-table-column> -->
      <el-table-column label="Mô tả" prop="description" width="750">
      </el-table-column>
      <el-table-column label="Ngày tạo" prop="date_created" width="150">
      </el-table-column>
      <el-table-column label="Ngày cập nhật" prop="date_updated" width="150">
      </el-table-column>
      <el-table-column
        label="Tình trạng"
        prop="status"
        width="150"
        :filters="[
          { text: 'Đang hoạt động', value: 'Active' },
          { text: 'Tắt trạng thái', value: 'Offline' },
        ]"
        :filter-method="filterTag"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 'Active' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.status }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="right" width="300" fixed="right">
        <template slot="header">
          <el-input
            v-model="search"
            class="searchRole"
            size="mini"
            icon="el-icon-search"
            placeholder="Nhấn để tìm kiếm"
            style="float: left; width: 60%"
          />
          <el-button
            size="mini"
            type="primary"
            class="addRole"
            @click="addNewRole = true"
            style="float: right; width: 20%"
          >
            Thêm
          </el-button>
        </template>
        <template slot-scope="">
          <el-button size="mini" @click="editRole = true">Chỉnh sửa</el-button>
          <el-button size="mini" type="danger" @click="isShowDeleteModal = true"
            >Xóa
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog item="" :visible.sync="isShowDeleteModal" class="dialogDelete">
      <div class="text-left" style="height: 100px">
        <span style="float: left; font-weight: bold"
          >Bạn đã chắc chắn chưa?</span
        >
        <br />
        <p style="float: left">Bạn có chắc chắn muốn xóa bản ghi này không?</p>
        <span
          slot="footer"
          class="dialog-footer"
          style="float: right; margin-top: 50px"
        >
          <el-button type="danger" size="mini" @click="closeShowDeleteModal()"
            >Hủy bỏ
          </el-button>
          <el-button type="primary" size="mini" @click="handleDeleteTitle()"
            >Đồng ý
          </el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog
      title="Thêm khu vực"
      :visible.sync="addNewRole"
      style="font-size: 24px; font-weight: 900"
      class="addemb"
    >
      <el-form :model="form" style="border: none" class="formAddEmb">
        <el-form-item
          label="Tên khu vực:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="Khu vực..."
            style="width: 35%; margin-right: 220px"
          ></el-input>
        </el-form-item>
       <!--  <el-form-item
          label="Ảnh:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary" style="margin-left: -220px"
              >Chọn ảnh tải lên</el-button
            >
            <div slot="tip" class="el-upload__tip" style="margin-left: -200px">
              Tệp jpg/png có kích thước nhỏ hơn 500kb
            </div>
          </el-upload>
        </el-form-item> -->
        <el-form-item
          label="Tình trạng:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-select
            v-model="form.region"
            placeholder="Vui lòng chọn tình trạng"
            style="margin-left: -220px"
          >
            <el-option label="Đang hoạt động" value="shanghai"></el-option>
            <el-option label="Tắt trạng thái" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Mô tả:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.name1"
            autocomplete="off"
            placeholder="Mô tả khu vực..."
           style="width: 35%; margin-right: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Ngày tạo:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="Vui lòng chọn ngày"
            :picker-options="pickerOptions"
            style="margin-left: -220px; width: 230px;"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="Ngày cập nhật:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="Vui lòng chọn ngày"
            :picker-options="pickerOptions"
            style="margin-left: -220px; width: 230px;"
          >
          </el-date-picker>
        </el-form-item>
        <div class="check">
         <el-button @click="addNewRole = false">Hủy bỏ</el-button>
          <el-button type="primary" @click="addNewTitle()">Thêm khu vực</el-button>
        <!-- <template slot-scope="scope">
          <el-button
              v-if="!scope.row.readonly"
              icon="el-icon-close"
              style="border: none; color: red"
              @click="openShowDeleteModal(scope.$index, scope.row)"
            >Hủy bỏ</el-button>
            <el-button
              v-if="!scope.row.readonly"
              icon="el-icon-check"
              style="border: none"
              @click="handleSave(scope.row)"
            >Thêm thiết bị
            </el-button>
            
        </template> -->
          <!-- <el-button @click="addNewRole = false">Hủy bỏ</el-button>
          <el-button type="primary" @click="addNewTitle()">Thêm thiết bị</el-button> -->
        </div>
      </el-form>
      <!--  <span slot="footer" class="dialog-footer">
        <el-button @click="addNewRole = false">Cancel</el-button>
        <el-button type="primary" @click="addNewRole = false">Add</el-button>
      </span> -->
    </el-dialog>
    <el-dialog
      title="Chỉnh sửa khu vực"
      :visible.sync="editRole"
      style="font-size: 24px; font-weight: 900"
      class="addemb"
    >
      <el-form :model="form" style="border: none" class="formAddEmb">
        <el-form-item
          label="Tên thiết bị:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.name3"
            autocomplete="off"
            placeholder="Phường Ngọc Thụy"
            style="width: 35%; margin-right: 220px"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item
          label="Ảnh:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary" style="margin-left: -220px"
              >Chọn ảnh tải lên</el-button
            >
            <div slot="tip" class="el-upload__tip" style="margin-left: -200px">
              Tệp jpg/png có kích thước nhỏ hơn 500kb
            </div>
          </el-upload>
        </el-form-item> -->
        <el-form-item
          label="Tình trạng:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-select
            v-model="form.region"
            placeholder="Vui lòng chọn tình trạng"
            style="margin-left: -220px"
          >
            <el-option label="Đang hoạt động" value="shanghai"></el-option>
            <el-option label="Tắt trạng thái" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Mô tả:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.name4"
            autocomplete="off"
            placeholder="Phường Ngọc Thụy trên cơ sở toàn bộ 898,99 ha diện tích tự nhiên và 18.568 nhân khẩu của xã Ngọc Thụy."
            style="width: 35%; margin-right: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Ngày tạo:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="Vui lòng chọn ngày"
            :picker-options="pickerOptions"
            style="margin-left: -220px; width: 230px;"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="Ngày cập nhật:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="Vui lòng chọn ngày"
            :picker-options="pickerOptions"
            style="margin-left: -220px; width: 230px;"
          >
          </el-date-picker>
        </el-form-item>
        <div class="check">
          <el-button @click="addNewRole = false">Hủy bỏ</el-button>
          <el-button type="primary" @click="addNewRole = false">Cập nhật</el-button>
        </div>
      </el-form>
      <!--  <span slot="footer" class="dialog-footer">
        <el-button @click="addNewRole = false">Cancel</el-button>
        <el-button type="primary" @click="addNewRole = false">Add</el-button>
      </span> -->
    </el-dialog>
    <!-- <el-dialog item="" :visible.sync="editRole">
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
    </el-dialog> -->
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      tableData: [
        {
          stt: "1",
          name: "Phường Bồ Đề",
                status: "Đang hoạt động",
          description:
            "Phường Bồ Đề có tổng là: 379,92 ha diện tích tự nhiên và 16.159 nhân khẩu.",
          date_created: "2021-10-20",
          date_updated: "2021-12-20",
          state:
            "2",
        },
        {
          stt: "2",
          name: "Phường Ngọc Lâm",
          status: "Đang hoạt động",
          description: "Phường Ngọc Lâm có tổng là: 113,04 ha diện tích tự nhiên và 19.604 nhân khẩu.",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
          state:
            "3",
        },
        {
          stt: "3",
          name: "Phường Long Biên",
          
          status: "Đang hoạt động",
          description: "phường Long Biên trên cơ sở toàn bộ 723,13 ha diện tích tự nhiên và 9.455 nhân khẩu của xã Long Biên.",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
          state: "6",
        },
        {
          stt: "4",
          name: "Phường Đức Giang",
          
          status: "Tắt hoạt động",
          description: "Phường Đức Giang trên cơ sở toàn bộ 240,64 ha diện tích tự nhiên và 25.767 nhân khẩu của thị trấn Đức Giang.",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
          state:
            "0",
        },
        {
          stt: "5",
          name: "Phường Ngọc Thụy",
          status: "Tắt trạng thái",
          description: "Phường Ngọc Thụy trên cơ sở toàn bộ 898,99 ha diện tích tự nhiên và 18.568 nhân khẩu của xã Ngọc Thụy.",
          date_created: "2021-10-20",
          date_updated: "2021-12-25",
          state: "0",
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "Today",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "Yesterday",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "A week ago",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      value1: "",
      value2: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
     addNewTitle() {
      if (!this.isAddNewTitle) {
        var newTitle = _.cloneDeep(this.newItem);
        this.isAddNewTitle = true;
        this.tableData.unshift(newTitle);
      }
    },
    handleDeleteTitle() {
      if (this.isAddNewTitle && this.indexTitle == 0) {
        this.isAddNewTitle = false;
      }
      this.tableData.splice(this.indexTitle, 1);
      this.isShowDeleteModal = false;
    },
    openShowDeleteModal(index, scope) {
      this.title = scope;
      this.indexTitle = index;
      this.isShowDeleteModal = true;
    },
    closeShowDeleteModal() {
      this.isShowDeleteModal = false;
    },
    openShowTitleModal(scope) {
      this.title = scope;
      this.getListItem(scope.id);
      this.isShowTitleModal = true;
      console.log(scope);
    },
    closeShowTitleModal() {
      this.isShowTitleModal = false;
    },
    openShowEditModal(scope) {
      this.title = scope;
      this.newEditTitle = _.cloneDeep(this.title);
      this.isShowEditModal = true;
    },
    openShowDeleteContent(index, scope) {
      this.content = scope;
      this.indexItem = index;
      this.isShowDeleteContent = true;
    },
    closeShowDeleteContent() {
      this.isShowDeleteContent = false;
    },
    closeShowEditModal() {
      this.isShowEditModal = false;
    },

  },
};
</script>

<style scoped>
.check {
  margin-left: 40px;
}
.el-upload-list__item{
  margin-left: -2000px;
}
.formAddEmb {
  height: 600px;
  width: 923px;
  margin-left: -20px;
  margin-bottom: 20px;
  background-color: aliceblue;
  padding-top: 20px;
}
.dialogDelete {
  height: 350px;
}
.container {
  background: White;
  height: 100vh;
  width: 95%;
  float: left;
  margin: 30px 0px 0 30px;
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
.cell {
  text-align: center;
}
.cnt {
  width: 80%;
  margin-left: 5px;
}
.image {
  width: 75px;
  height: 75px;
}
.addemb {
  height: 2000px;
}
.el-icon-date ::before {
  margin-left: -30px;
}
</style>
