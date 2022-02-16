.
<template>
  <div class="container-mg-cus">
    <h1>Quản lý danh sách khách hàng</h1>
    <h3 style="text-align: center">(List Customer of Admin)</h3>
    <br />
    <br />
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="Họ" prop="first_name" width="100">
      </el-table-column>
      <el-table-column label="Tên đệm" prop="middle_name" width="100">
      </el-table-column>
      <el-table-column label="Họ và tên" prop="full_name" width="200" fixed>
      </el-table-column>
      <el-table-column label="Tên người dùng" prop="name" width="150" fixed>
      </el-table-column>
      <el-table-column label="Ảnh" prop="image" width="200" fixed>
        <template slot-scope="scope">
          <img :src="`${scope.row.image}`" class="image" />
        </template>
      </el-table-column>
      <el-table-column label="Địa chỉ" prop="address" width="250">
      </el-table-column>
      <el-table-column label="Email" prop="email" width="150">
      </el-table-column>
      <el-table-column label="Số điện thoại" prop="mobile" width="150">
      </el-table-column>
      <el-table-column label="Khu vực" prop="area" width="400">
      </el-table-column>
      <el-table-column label="Ngày tạo" prop="date_created" width="150">
      </el-table-column>
      <el-table-column label="Ngày cập nhật" prop="date_updated" width="150">
      </el-table-column>
      <el-table-column fixed="right" width="350">
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
          <el-button size="mini" @click="editRole = true" class="btnEdit">Chỉnh sửa</el-button>
          <el-button size="mini" type="danger" class="btnDel" @click="isShowDeleteModal = true"
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
      title="Thêm khách hàng"
      :visible.sync="addNewRole"
      style="font-size: 24px; font-weight: 900; margin-top: -120px"
      class="addcus"
    >
      <el-form :model="form" style="border: none" class="formAddCus">
        <el-form-item
          label="Họ và tên:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.name1"
            autocomplete="off"
            placeholder="Họ và tên ..."
            style="margin-left: -215px; width: 225px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Tên user:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.name2"
            autocomplete="off"
            placeholder="Tên người dùng ..."
            style="margin-left: -215px; width: 225px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Họ:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.name3"
            autocomplete="off"
            placeholder="Họ..."
            style="margin-left: -215px; width: 225px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Tên đệm:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.name4"
            autocomplete="off"
            placeholder="Tên đệm..."
            style="margin-left: -215px; width: 225px"
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
            style="width: 450px"
          >
            <el-button size="small" type="primary" style="margin-left: -20px"
              >Chọn ảnh tải lên</el-button
            >
            <div slot="tip" class="el-upload__tip" style="margin-left: -20px">
              Tệp jpg/png có kích thước nhỏ hơn 500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="Địa chỉ:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.name5"
            autocomplete="off"
            placeholder="Địa chỉ nơi ở..."
            style="margin-left: -215px; width: 225px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Email:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.name6"
            autocomplete="off"
            placeholder="Email ..."
            style="margin-left: -215px; width: 225px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Khu vực:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.name7"
            autocomplete="off"
            placeholder="Long Biên, huyện..."
            style="margin-left: -215px; width: 225px"
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
            style="margin-left: -220px"
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
            style="margin-left: -220px"
          >
          </el-date-picker>
        </el-form-item>
<div class="check">
        <el-button @click="addNewRole = false">Hủy bỏ</el-button>
        <el-button type="primary" @click="addNewRole = false"
          >Thêm khách hàng</el-button
        >
        </div>
      </el-form>
      <!--  <span slot="footer" class="dialog-footer">
        <el-button @click="addNewRole = false">Cancel</el-button>
        <el-button type="primary" @click="addNewRole = false">Add</el-button>
      </span> -->
    </el-dialog>
    <el-dialog
      title="Chỉnh sửa tài khoản"
      :visible.sync="editRole"
      style="font-size: 24px; font-weight: 900"
      class="addemb"
    >
      <el-form :model="form" style="border: none" class="formAddEmb">
        <el-form-item
          label="Họ và tên:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.nm1"
            autocomplete="off"
            placeholder="Nguyễn Thành Công"
            style="margin-left: -215px; width: 225px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Tên user:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.nm2"
            autocomplete="off"
            placeholder="Công"
            style="margin-left: -215px; width: 225px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Họ"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.nm3"
            autocomplete="off"
            placeholder="Nguyễn"
            style="margin-left: -215px; width: 225px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Tên đệm"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.nm4"
            autocomplete="off"
            placeholder="Thành"
            style="margin-left: -215px; width: 225px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Địa chỉ"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.nm5"
            autocomplete="off"
            placeholder="Số 52 Phố Ngọc Lâm"
            style="margin-left: -215px; width: 225px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Email"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.nm6"
            autocomplete="off"
            placeholder="cong@gmail.com"
            style="margin-left: -215px; width: 225px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Số điện thoại"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.nm7"
            autocomplete="off"
            placeholder="0909019087"
            style="margin-left: -215px; width: 225px"
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
            style="width: 450px"
          >
            <el-button size="small" type="primary" style="margin-left: -20px"
              >Chọn ảnh tải lên</el-button
            >
            <div slot="tip" class="el-upload__tip" style="margin-left: -20px">
              Tệp jpg/png có kích thước nhỏ hơn 500kb
            </div>
          </el-upload>
        </el-form-item>
        <!--  <el-form-item
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
        </el-form-item> -->
        <el-form-item
          label="Khu vực:"
          :label-width="formLabelWidth"
          style="margin-left: 150px"
        >
          <el-input
            v-model="form.nm8"
            autocomplete="off"
            placeholder="Quận Long Biên, Phường Ngọc Lâm, Nguyễn Xuân Khỏe"
            style="width: 450px"
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
            style="margin-left: -220px"
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
            style="margin-left: -220px"
          >
          </el-date-picker>
        </el-form-item>
<div class="check">
        <el-button @click="addNewRole = false">Hủy bỏ</el-button>
        <el-button type="primary" @click="addNewRole = false"
          >Cập nhật</el-button
        >
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
import _ from "lodash";
export default {
  data() {
    return {
      tableData: [
        {
          first_name: "Trần",
          middle_name: "Khánh",
          full_name: "Trần Khánh Linh",
          name: "Linh Khánh",
          image:
            "https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png",
          address: "Số 18 Ngõ 45 Đường Vũ Đức Thận",
          email: "tkl@gmail.com",
          mobile: "0988188901",
          area: "Quận Long Biên, Phường Việt Hưng, Lương Bích Thuỷ",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
        },
        {
          first_name: "Nguyễn",
          middle_name: "Thành",
          full_name: "Nguyễn Thành Công",
          name: "Công",
          image:
            "https://img4.thuthuatphanmem.vn/uploads/2020/03/16/hinh-anh-chang-trai-chong-ma-dep-trai_111415898.jpg",
          address: "Số 52 Phố Ngọc Lâm",
          email: "cong@gmail.com",
          mobile: "0909019087 ",
          area: "Quận Long Biên, Phường Ngọc Lâm, Nguyễn Xuân Khỏe",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
        },
        {
          first_name: "Vũ",
          middle_name: "Đăng",
          full_name: "Vũ Đăng Thành",
          name: "Thành",
          image:
            "https://png.pngtree.com/png-clipart/20190921/original/pngtree-hand-drawn-cartoon-blue-dress-boy-free-button-element-png-image_4753274.jpg",
          address: "Khu Trại Chăn Nuôi, Tổ 3",
          email: "thanhzuit@gmail.com",
          mobile: "0389021185",
          area: "Quận Long Biên, Phường Giang Biên, Bùi Tuấn Nhã",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
        },
        {
          first_name: "Phạm",
          middle_name: "Thu",
          full_name: "Phạm Thu Thảo",
          name: "Thảo",
          email: "thaopt@gmail.com",
          mobile: "0902653939",
          area: "Quận Long Biên, Phường Ngọc Lâm ",
          image:
            "https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-gai-xinh-hd.jpg ",
          address: "Số 370 Đường Ngô Gia Tự, Tổ 10A",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
        },
      ],
      search: "",
      isShowDeleteModal: false,
      addNewRole: false,
      editRole: false,
      form: {
        name1: "",
        nm1: "", nm2: "",nm3: "",nm4: "",nm5: "",nm6: "",nm7: "",nm8: "",
        name2: "",
        name3: "",
        name4: "",
        name5: "",
        name6: "",
        name7: "",
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
.addemb {
  height: 2000px;
  margin-top: -145px;
}
.formAddCus {
  height: 810px;
  width: 923px;
  margin-left: -20px;
  margin-bottom: 20px;
  background-color: aliceblue;
  padding-top: 10px;
  margin-top: -20px;
}
.image {
  width: 75px;
  height: 75px;
}
.container-mg-cus {
  background: White;
  width: 1400px;
  float: left;
  margin: 40px;
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
.btnEdit,
.btnDel {
  float: right;

  margin-right: 5px;
}
.dialogDelete {
  height: 350px;
}
.addcus {
  height: 2000px;
}
.cell {
  margin-left: 200px;
}
.check {
  margin-left: 50px;
}
</style>
