.
<template>
  <div class="container">
    <h1>Danh sách vai trò</h1>
    <h3><i> (List Role)</i></h3>
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
            <i>Công việc: {{ props.row.state }}</i>
          </p>
          <br />
          <!-- <p>
            <i>Cơ chế làm việc: {{ props.row.city }}</i>
          </p> -->
        </template>
      </el-table-column>
      <el-table-column label="STT" prop="stt" width="70" fixed>
      </el-table-column>
      <el-table-column label="Tên" prop="name" width="250" fixed>
      </el-table-column>
      <el-table-column label="Ảnh" prop="image" width="200" fixed>
        <template slot-scope="scope">
          <img :src="`${scope.row.image}`" class="image" />
        </template>
      </el-table-column>
      <el-table-column label="Vai trò" prop="description" width="150">
      </el-table-column>
      <el-table-column label="Địa chỉ" prop="address" width="750">
      </el-table-column>
      <el-table-column label="Ngày tạo" prop="date_created" width="150">
      </el-table-column>
      <el-table-column label="Ngày cập nhật" prop="date_updated" width="150">
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
      title="Thêm vai trò"
      :visible.sync="addNewRole"
      style="font-size: 24px; font-weight: 900"
      class="addemb"
    >
      <el-form :model="form" style="border: none" class="formAddEmb">
        <el-form-item
          label="Tên vai trò:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            size="medium"
            v-model="form.name"
            autocomplete="off"
            placeholder="Admin (Quản lý) ..."
            style="width: 35%; margin-right: 260px"
          ></el-input>
        </el-form-item>
        <el-form-item
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
            style="margin-left: 40px; width: 50%"
          >
            <el-button size="small" type="primary" style="margin-left: -20px"
              >Chọn ảnh tải lên</el-button
            >
            <div slot="tip" class="el-upload__tip" style="margin-left: -25px">
              Tệp jpg/png có kích thước nhỏ hơn 500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="Vai trò:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-select
            v-model="form.region"
            placeholder="Vui lòng chọn vai trò"
            style="margin-left: -260px"
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
          label="Hoặc:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            size="medium"
            v-model="form.name"
            autocomplete="off"
            placeholder="Nhập tên mới khác ..."
            style="width: 35%; margin-right: 260px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Địa chỉ:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            size="medium"
            v-model="form.name"
            autocomplete="off"
            placeholder="Số đường, số nhà ..."
            style="width: 35%; margin-right: 260px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Ngày tạo:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-date-picker
            size="medium"
            v-model="value2"
            type="date"
            placeholder="Vui lòng chọn ngày"
            :picker-options="pickerOptions"
            style="margin-left: -260px; width: 35%"
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
            style="margin-left: -260px; width: 35%"
          >
          </el-date-picker>
        </el-form-item>
        <el-button @click="addNewRole = false">Hủy bỏ</el-button>
        <el-button type="primary" @click="addNewTitle()"
          >Thêm thiết bị</el-button
        >
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
      </el-form>
      <!--  <span slot="footer" class="dialog-footer">
        <el-button @click="addNewRole = false">Cancel</el-button>
        <el-button type="primary" @click="addNewRole = false">Add</el-button>
      </span> -->
    </el-dialog>
    <el-dialog
      title="Chỉnh sửa vai trò"
      :visible.sync="editRole"
      style="font-size: 24px; font-weight: 900"
      class="addemb"
    >
      <el-form :model="form" style="border: none" class="formAddEmb">
        <el-form-item
          label="Tên nhân viên:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            size="medium"
            v-model="form.name"
            autocomplete="off"
            placeholder="Phan Thu Quỳnh"
            style="width: 35%; margin-right: 260px"
          ></el-input>
        </el-form-item>
        <el-form-item
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
            style="margin-left: 40px; width: 50%"
          >
            <el-button size="small" type="primary" style="margin-left: -20px"
              >Chọn ảnh tải lên</el-button
            >
            <div slot="tip" class="el-upload__tip" style="margin-left: -25px">
              Tệp jpg/png có kích thước nhỏ hơn 500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="Vai trò:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-select
            v-model="form.region"
            placeholder="Vui lòng chọn vai trò"
            style="margin-left: -260px"
          >
            <el-option label="Quản trị viên Long Biên" value="shanghai"></el-option>
            <el-option label="Chuyên viên" value="shanghai"></el-option>
            <el-option label="Quản trị viên Ngọc Thụy" value="beijing"></el-option>
            <el-option label="Thu ngân" value="shanghai"></el-option>
            <el-option label="Quản trị viên Đức Giang" value="beijing"></el-option>
           
          </el-select>
        </el-form-item>
        <el-form-item
          label="Hoặc:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            size="medium"
            v-model="form.name"
            autocomplete="off"
            placeholder="Nhập tên mới khác ..."
            style="width: 35%; margin-right: 260px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Địa chỉ:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            size="medium"
            v-model="form.name"
            autocomplete="off"
            placeholder="Số 46, Ngõ 325 Đường Kim Ngưu, Phường Thanh Lương, Quận Hai Bà Trưng, Thành phố Hà Nội"
            style="width: 35%; margin-right: 260px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Ngày tạo:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-date-picker
            size="medium"
            v-model="value2"
            type="date"
            placeholder="Vui lòng chọn ngày"
            :picker-options="pickerOptions"
            style="margin-left: -260px; width: 35%"
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
            style="margin-left: -260px; width: 35%"
          >
          </el-date-picker>
        </el-form-item>
        <el-button @click="addNewRole = false">Hủy bỏ</el-button>
        <el-button type="primary" @click="addNewTitle()"
          >Lưu</el-button
        >
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
      </el-form>
      <!--  <span slot="footer" class="dialog-footer">
        <el-button @click="addNewRole = false">Cancel</el-button>
        <el-button type="primary" @click="addNewRole = false">Add</el-button>
      </span> -->
    </el-dialog>
    <!-- <el-dialog
      title="Phan Thu Quỳnh"
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
            v-model="form.name"
            autocomplete="off"
            placeholder="Aptomat"
            style="margin-left: -200px"
          ></el-input>
        </el-form-item>
        <el-form-item
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
        </el-form-item>
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
            v-model="form.name"
            autocomplete="off"
            placeholder="Sử dụng như cầu chì để ngắt mạch điện khi gặp sự cố"
            style="margin-left: -220px"
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
            style="margin-left: -200px"
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
            style="margin-left: -200px"
          >
          </el-date-picker>
        </el-form-item>

        <el-button @click="addNewRole = false">Hủy bỏ</el-button>
        <el-button type="primary" @click="addNewRole = false"
          >Cập nhật</el-button
        >
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNewRole = false">Cancel</el-button>
        <el-button type="primary" @click="addNewRole = false">Add</el-button>
      </span> 
    </el-dialog> -->
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
import _ from "lodash";
export default {
  data() {
    return {
      tableData: [
        {
          stt: "1",
          name: "Bùi Huy Phương",
          address:
            "Số 3, ngõ 3, tổ 6 phố Lệ Mật, Phường Việt Hưng, Quận Long Biên, Thành phố Hà Nội",
          image:
            "https://cdnsg.kilala.vn/data/upload/article/4925/ENRQ7uiUwAA3z4o.jpg",
          description: "Quản trị viên",
          date_created: "2021-10-20",
          date_updated: "2021-12-20",
          state: "Quản lý khách hàng, bảng điện năng tiêu thụ cả vùng, ...",
        },
        {
          stt: "2",
          name: "Phan Thu Quỳnh",
          address:
            "Số 46, Ngõ 325 Đường Kim Ngưu, Phường Thanh Lương, Quận Hai Bà Trưng, Thành phố Hà Nội",
          image:
            "https://hiquynhon.com/wp-content/uploads/2018/01/yeu-va-lay-con-gai-binh-dinh-tai-sao-khong-2.jpg",

          description: "Thu ngân",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
          state: "Xử lý hóa đơn",
        },
        {
          stt: "3",
          name: "Phan Thế Đạt",
          image:
            "https://i.vietgiaitri.com/2022/1/18/lam-me-don-than-con-trai-diem-chau-mong-som-duoc-gap-ba-ruot-cdb-6276273.jpg",
          address:
            "Số 4, ngách 122/115, đường Do Nha, Phường Tây Mỗ, Quận Nam Từ Liêm, Thành phố Hà Nội",
          description: "Chuyên viên",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
          state: "Sửa chữa sự cố điện tại hộ dân",
        },
        {
          stt: "4",
          name: "Vũ Đình Huy",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtnAZ6u4hWrraX6krf5owMLzFMM0cNlx1asQJI7AtEZDEFmKZJT3eYrlKCN0j2kRpT4qI&usqp=CAU",
          address:
            "Tòa nhà Diamond Flower, Số 48 Lê Văn Lương, Phường Nhân Chính, Quận Thanh Xuân, Thành phố Hà Nội",
          description: "Quản trị viên",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
          state: "Admin phân vùng",
        },
        {
          stt: "5",
          name: "Đặng Hữu Thọ",
          image:
            "https://i.pinimg.com/236x/e3/f9/91/e3f9910f42c3a3f1961662c234619356.jpg",

          description: "Chuyên viên",
          date_created: "2021-10-20",
          date_updated: "2021-12-25",
          address:
            "Tầng 5, số 358/40/149 Bùi Xương Trạch, Phường Khương Đình, Quận Thanh Xuân, Thành phố Hà Nội",
          state: "Sửa chữa sự cố tại các công tơ điện của các hộ gia đình.",
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
.el-upload-list__item {
  margin-left: -2000px;
}
.el-upload-list {
  margin-right: 2000px;
}
.formAddEmb {
  height: 650px;
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
  height: 500px;
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
  border-radius: 50%;
}
.addemb {
  height: 2200px;
}
.el-icon-date ::before {
  margin-left: -30px;
}
</style>
