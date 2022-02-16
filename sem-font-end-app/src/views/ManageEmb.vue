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
      stripe
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>
            <i>Thông số kỹ thuật: {{ props.row.state }}</i>
          </p>
          <br />
          <p>
            <i>Cơ chế làm việc: {{ props.row.city }}</i>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="STT" prop="stt" width="70" fixed>
      </el-table-column>
      <el-table-column label="Tên thiết bị" prop="name" width="250" fixed>
      </el-table-column>
      <el-table-column label="Ảnh" prop="image" width="200" fixed>
        <template slot-scope="scope">
          <img :src="`${scope.row.image}`" class="image" />
        </template>
      </el-table-column>
      <el-table-column label="Mô tả" prop="description" width="550">
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
      title="Thêm thiết bị"
      :visible.sync="addNewRole"
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
            placeholder="Thiết bị ..."
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
            v-model="form.des"
            autocomplete="off"
            placeholder="Mô tả thiết bị ..."
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
          <el-button type="primary" @click="addNewTitle()"
            >Thêm thiết bị</el-button
          >
        </div>
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
      title="Aptomat"
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
            v-model="form.des"
            autocomplete="off"
            placeholder="Sử dụng như cầu chì để ngắt mạch điện khi gặp sự cố"
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
          stt: "1",
          name: "NodeMCU ESP8266",
          image:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISFBgSERIYGBgaGBkYGRIYGxgZGRgbGRgZGRoYGBobIi0kGx0pHhgYJkQlKS4wNDU0GiM5PzkxPi01NDABCwsLEA8QHRISHTIpIyM0MjIyMDIyMjIwMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjAyMjI1MjIyMjI0MDIyMjIyMv/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAQUBAAAAAAAAAAAAAAAABQEDBAYHAv/EADsQAAIBBAECBQIFAgUCBgMAAAECAwAEERIhBTEGEyJBUWGBFDJCcZEjUgczgqHwJNFicpKxweEVQ6L/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EACERAQEAAgIBBAMAAAAAAAAAAAABAhEhMUEDImFxElGR/9oADAMBAAIRAxEAPwDs1KUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoKVWlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSqVWgUpSgUpSgVjXV3HEu8jhR8k9z8D5P0FQvV/F9nbBx5okkTjyUOWLfHx+/xWrdI8VQ3YkF3OLeUlgjH0qikenRj2I5znBJqbHQ7a7jlG0bhh9O/3HcVk1z696zZ29o0KXL3TqretPWy7HG7OvC4JBznPAqDbx49qFS3uDdJ3L3CFWHb0A5BJ78nPeqOu0rSfDfjxbvKG2dXVdmKFXQDPJJJBH8GtrivombVZELZwU2GwOM4K9wcUGXSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKClKrWJfXscC7yuFGQBkgZY8BRnuTU2L0sqopZmCqBksTgADuST2rUPFPigQxCQKxRvyBcjzPqz/oj/AP6b6DvXq/UHMur6FSoCQk6HY87I8i+XO/b05AGPfvUZJ/SR5NXjVBlwi+S3PbMEm0ExPyhGfavJ6nr7up03ji5df3jzSNJIFBb2UBVA7AAD2AxW4eDfBsl1ia7ysH6UPDyfse6p9ff2rZ7DwpbzypdTWyxoANYSAhkPH9SZAdU+iD7/AANunkGNV/jgfwDwRXomXt60ze2uX/hSEwNb2r/hw5yxA23xjhmY7a8exrQb/wAB3kTgupePPqkg9bKvufLOGJ/bNdZQe2ffn4/g8Zq6rnOEPPOc/P7H2qzJNORTCN5Vt+mFoH8spNMzOC4ONkCSAMSOOwyfir/TerXkDvaQolw6vu84fU5AKal3ABbZgO/fAGa6b1bplrcLi6hST23K8j/yuPUP5rXZ/ArRq46fdtEHyTE4V0yVK5VsbJwcZ5Na3E1UZY+NBAFj853m1w6XJYavtwnb1EDPIPxW4DxRFGRHMRuX0CxZk50Ddh6sDOM49q5xc9Kn6bbuHsi8jd5xiaJuW/MO6gKTxjkgEnjFQUcSWKxzwT73O5KeWUkjAIUDg+rb1MMYxlf4pt3y2v4pACjg5GdcgMB8kdxWXXCEmnsQLjqCCV2jdIULIJIyxLBgPZOTkjJBwK2Hpfj5jvNPOsa+ZGq2jYLBTgMQ5AZh3P0x9aG3VqVq/R/F0dwiyMuis0gVtg2QnvjuMjBxU1Y9TguOYJkk4ydWBwPqB2+9FZ1KUoFKUoFKUoFKUoFKUoFKUoKVWlYPVOpxWsZlncKo/kn4Ue5oMDxJ4kgsU2kOzEemIfmb6/QfWucxePvMLC6jI2PEkYR9V/sMcgKlPnBBNRninxhNdS7rDE0QGohkXJI/u3GGVv2OB9agvxFnJwS9u+O0mXiJ+FdRso/8wrjlzxZx8NT4dG6fdxSD/piJFxloLcqpce6tZ3GVUH+5DUn4V6fFKfxEhAYPlLIMxS1I9ONCceZxzwMZOAK5Z/8AgbksgjjL7kaSREOjH2IdeB98VO2VstlIwAd7uQM52EmeMq2x13VdsncqAQOGPeuMxxw5l2vN4dbbYcnv7n2/59OKtvg8ffA7fx2rVrDxDKnlxbec7clgMJqF2Y7jga8jALE1P2/VoZGZCdXUAvjkLt22I7fsef2rePqY3jf9S42MkJ7Z4+O/v7fFXpZNcY7fI5HHtVQgK5Q7fUH/ALVYSMHspHzkH/fNdOkViAzgKPrjkfweRWRNNHCheRgFUZLMfarUs0cMZkkYKqjJY4GAMnGa5B4x8VPfOY45AkaMMJgnY+xcDux4AQe/+13oXfEvjFru5iSN2ECyL/SRmV5MEDBK8gnOABzzWB4gki/qb26WxBCpGqgTvKTks6qxCRgH+Bx3qtj0l8rHKi21z+a13k0UkBS7MyElpWLdjwMAAAd8bqEkDyKl1AiToxWa7SV3WVkXATgFUywwXAYjB981nGW5blLqRElbjVJSrlEOEkIYoupzgEjAAJ/nNSEHVUubhJOondEXgBQAxByA5QZ1OWJIBPtjHbZuseIxbRxxwSwufKAQQqdEOMF3BZhkcgL7kkn4OgkAnk+/fGT35Ptmu7E5bBFYm+uCloDDAran1ErlzorlSdvVqowOwHz3z5Ov3hL21vqyQxKj3MRIZlRi7OmcEMBkcZ/ISMisaLw7BLhun3yO+P8AJm/oSk4wdCTq32P3rA/GXdgGtmUISCdSASN013VlPPA4JJAPI5orf+leO4wxijmMhJTUzFj/APrBdC3cMGyM49vetpTxbApCXDBHMjx4TMihkxkEqMj9yMVxrw/1Kzt45PMgEsrA6h1Vk4/KF919yT8AY5FX+hWXkQt1B5grgnROJNi22UcFwwZtRgZ4HLcGg75aXUcqCSNgysMgj3FZFcM6JfSEC5uhJHAiSKskbNshfDZbTDOhOQvGM574rYeheOZ5QVi1ZI4FLNKGDGTDchh+k6nlvfA9xUHUqVr3T/FVtKzplgyIsjnGVAZdu498BuDz6T8VPRuGGQc0V7pSlApSlApSlBDeIeuR2aBnBZnbREHGzHtk/pHPetfW1F1cslxCZmQDaRs+UhP6I0PpC/U5Y4zWxeIeixXkXlyLnB2Ujgg4xwfatR6gvVbVCkMyuo7bqBJ/6hhWP1NTyLfjrwvarAZIYljkBUIFwobJGwYZ1Chdjse2pOcZrVrfwlGyFJHdZAAztglBnOFVNSXPHbjOe4rCuev38cpe4dmb05SRRr6WDLqABjkA+nGcDOa2DofiSC6mVbgMryEprjKMXwq4YZZe/PHP9wGFqiH6P4fSzkNzO0hiQblICVBZSMCRSy5HK8oWGSOcd81OphbWa6nW3JmkURRoFluCA3p22J/qJ6WGwxwPc4q0OoWwkkS83McTkpZhWPnsSQXZ8ryOCA3sfc5JgLK1aaSSe2eO20YMiPKwdAATlGIzwR+b5I+2Lhje1mVjaPwSxeRDA/kyzoryy3DIZPU+WcgDaVmPBVsqMZIydhlW91IC8MKaqhw9xHgBZHOuiNoBI7L+pQgXY8/qrVOk9elEsl3JbrdTBMCaXZjEMFdgo41A78fcZOcq06oq2ZgjnluLmd1QxvlEjUkgpvnBQhscY+oUDFcM/Qvjn7amTdOl9YRtBbuqohZWYsSxZR+Rc8SEnncZHqGDjmp+z6+H39OyqddzhNnAyyKSecAd+BWj3ccfm2vTJGCOyR+dFArtlQxfyySxCan1FiNmGCfYFGXkZ0i0/DxK2+SF83Y5LqjzBkRAcnZ8cE6knA5e7HiXX30vFR3i7xQ95I0PmCKNMNq3bgZLNn859go5JI454ikt443EN6scfmANC8rhghIJ3mVcDY4UZLYUcAd8+rOCGSSeW5CeQziKGeTYoXY4DBMAvge/GnbHJIlLWJ1R7KR7S6j/ADq8QUyoHy3oJyEwoPIDY2QZGcr6MZ+TN4YHUbyZwOmXDWcrK+Uu1YlUzlyoY8BiMLwMcgd+RS8ZbeJUaN0wG1gdlIO4xu6cqzkLxgek6tgLrmxL4YSXP4MuxyR5MinYIONmkUacscY7d8njnXihT0HspPAOVB4BIwSP0jkfArtOuGEwPD+3T3v2eRGWTSJAFKSf3MST+VcNkn+01ENb3McCXMsY8p3aNJFZDsy98AE55B5Hwa3G+6tcX1vDHJGsVqrKJTbD1MiEKMRluAMHge/ODgA5PXViv5bXpnTEwscfpkdXTy1ypchHxlsKckj1F8fWqOevfpqSDk/21fhUlsSOC+RsTsQmQAFY8n0gDIHbt7YrbP8AEcQQzRQ2yLtDEEwF08o8Yd8cNIQMge2VOPmE6V08KNCfXIhYflOqMMbuxBC5J5J1KgcZLjAY/XUgt5GSG5WcKB/UUaqWIBKrk84+akJPDsoSF1kicTKCApIK+kOzOD+VFDctzj/arEE8drcebFFG6lCjxy5O+T62ZdyFYjXKnKg5ABxmsu36vbbSSMDbu8m39KJHQRgcRIuRo3/iIwSRnjNBh3805RBJJuhyqPwQQmFKqSNtF9PpOAOOMivEnUYzCqLAEkUKPxKO6uQMkgqPc/JP0HtiWto5LpnuZIt7W3ZWlVXEYIAPpR3OW4z77Y78moZoTdzOLGBiuWdYlO7rGDgYBOXPIzjOP4oaSV7arb23mRXe8khMbBCSjYILg5AJwMesZB2xgZzWJb9bukkMyXEiucbOrEbYAADAcMMADB+KjnQoSrgqwOCrAggjuCDyD9K8lgOTQdE6N/ildphbmNZlGBv/AJb/ALkj0n/0it56N/iBYXPG5ib3WQagf6xlP5Irlb+E3hFvJdSoqOY2eAsySiMsPMAGMAhc85FdiPS94QtrIqJr6BHwmD+XGntjHPNBORyKwDKQQezAgg/sRVyuSdfS+sbcztL5dyJlRGjIxcqwPpeMDV2GAdiufY11aIkqNhg4GQOwOOQPvRV2lKUCrborDDAEfB5q5SghOpeHoZgQVBz+lhsP9+1adJ4QSymS6jVSFP8AlucoSewDHlSfv37V0yovxB0/8TbSQcZdSFJ7BhypP+oCg5zbSkTmS7jW3jihkSNwdty4IwZCBggHABx3Na2vRLe6e5a1DlFWMRAFdPMd1XRmwcgbD478kVfuE6pYOwuI2MPAG5Dx559KsDkZ74GPtXuw69bvHLHG72bvgPgK8bEHvyDr7c4HbvxUVG3kl3HbPb+UsSRuFkZSyuzOpXQ7OSwIySoGOPYcVak/Bpb+XGBPLJwDrIjo5A5HOGUHgLg7Zzn42yGQwW+ZInumMhkeWNlfziwK5fLc4VlAxnGoxjtWGPD0clmkpZIQ7yTGXHMeFXWJ3PqAUk/AyCSB3q7RDWwvOmJ58cyI7jRo2UF+cEFNwd8Z5ZeAVxk8ZxrXrcUNm8MELC5lcNJcu+wOGLbKvfbnGDkdyc9qvzdNn8uC7k3uVIZ2ifcaxq5C5YnOHwW7e4781j9SuPxkkQZFtkZfTK4zsACC5kIBZcrqFzqPpziWSm2JBeLcyo1+40jQrGiqRGG4/MqeoA9zjkkAcA5GwR9NhunKiNVGEVLiJkjQkN6ncICokPsigHkccGoTrdlBHII7ZzIx1/LgqAUXChs5Z87En0gdsD2tdV6Zc2Lr5noZ1JVkbOw425XnHqAPt+9JjJNTwm0jFdSiWSzW9VlI1aRsBmOQCgc5YnkrnJAGcfW8OjwRZuX9MUX5w+HR5NRoiYKmQHOx+MqMdwNJ6nOGKDRU1QLlBjYBmOzD9Tc9/gCpvwezXU8dvPNiJAWXLALHg5LAHu3LYz7kE9jWksREd60c2IC0algDHK2yjnBV8AZX7Zxmtm65bvol5NdI08pDLFEcpGqkhdJAxCBQB9275BqJ8Q/hWmP4NWCKTiYs20jbE7jPCgcAYA4APvxW/upJHV58Big0IQJlMtrjAGwzsMnJPJye9RWwv0G30Vri4dZHLHzs+YjnPqZuMkEkgMGO2C3GcVHX3T7q2jyJC1uxwG/QwbJUhHGwU67DHHHyKw7Cdg4US+WhwZGP5Ag7+ggh3IBCrg5OKu3N3PeOkUas+MrFEoJIAB51GedVGccALwAKDz0bpbXMmMsqLgyTLG8gjU5wWVBk5Ix/9A156tZpBIYhJuyn1OABGQQrKUOSTwTnIHPHtWz30qdNgRIHDO+zJcIJE39QWRZ43bHpDFVDK3ucKeTpacdh9vgfFAEjIrBJGUMjK2GIyrdw3yPpWb4QSaKbeOdo1GpeRT7FwEXBypdnwACDyc9gax7G185iWD+UjKJHjKbIXJWM6ORsu+M+2Pettu76SxKzkBZ2dXa2eFSjsFZfPhkjwoGpK4XPLk45NCq9R8P20ivIkmjLjd/M86J3JUto3Lkncd2J2dF7tVmx6Vc2YndEikcoEimVlcKzMCxVGXVjoG5bAwpAyTisnp/iy2kZTP5kGpfAQB0DkEKxIG3pLOddcEtyQAAHRRLfXZW1eMRx7EJJlEuWDKXaSNAC+zaEg8BVQEexJEf1vr0V/KhujLayKoTcJ5kciBjhtDqyklm/Lt3+lT971+RrNR0qdxFbIPMnxo7NsECMHA4wd/ST8Yrbeo+GbNommntlR8eZJ5SvIPM19WqYy4znsBn3rn970CSYMnSrhJoW182GMlSp2yryxyNsz7B+O4VEGKis7/D2xn6ldi6upJJEh5BdmYFvYLngDI7D4PxXa6hPCvRksrZIVxnGzsPdj359/j7fWpuqpSlKBSlKBXlhXqlBA+I7TzIjxkqVcAjPKMGAx9q0XxD4ctJ3Q2iomxKuYwMbsuy7DtgakYHzXVSoPcVD3vR1aPSM+XqcoUUek59l7Vmy+FcUn6Xe9MJSCRiQu+UHp9RPDIc7diM4/ivL9Yt5wo6hbBGyA0iLqUJ4JZG5Xn4P2rp1/wBNeJ0kSN5zhkJJBbL+oFieAMr/AL1rnUfD9tLLIbvVMsjkBtWJdQGUMO/qU/zTf7GHcXN1NFp0+eN0WHySuuJfLJyAwJxn66j6VZ8QvY+WIXRzKsEUcC6uuj8gqzNgYGVORnt71B3Hhm7BMlsSDG7+sMUZfLLAgMOTkCva+LpFIS7jW4RvTl/Q4zyDsBhvnkZ+tWVGZ1boklkBNakqYokE7HDjZ0yzDbI1bYjtjt81F3YZLrfqKszMqOVTRh6lXRXByMBAfT3zgnPOZtpLa8kSRLt9wUY2lw2N9OyhiSHxj5P7VneJZVkLQG0ZPMeP/qpNGWJAqjVWXnHo98Y2zVStJ6nMl7dFmEcSSSH16LGqhm5d9c5b3JJPOeQO2F1PoqwyBFkSTKhsowKjbPpb2VhjPBIwRzW2+MelQBnkhKI6skaWqBfWNQA6a/mzzk98j3zmsB4Zely7po+AmZdB6CdWdULghW7rtg8HtzQYfSLeKKUi7JjZQCmyFlyWHrPBBwuWXgqTrk477NceVfaRyW5yCAjhx5DKgJI8xc/pU+hD3PcYrXrf/rblpLiQJkF1jd9Aw2ykKPICEXDcEg8DsSadRulS6KdNDxAkJ6JGIdz3Oc4wCSP7eMjAqssfxCkEcnkW0eqIRs2Q7NJrhst8L+XUZGdjz7T/AES1js4DczMpduNo5JkntnIfRGjQDlyvOxAxxyATUT1jpRsvLcOwkBGOFKtIhDO8bgkhVLIMMoJxnnkCO651mS8Ia5lYtgBXUHUkFuZEBAzycFR+o8HIqLLtS7vGmkeaTG7nLYzgnAGeST2A7k1j+W8h8uFGdyCQiKWbCjZiFHfABNYWsijZfWo7svqA/f3X/UBWxeH+nLIFcvEC5DLcFpFMDo3+Q7EqnrVvqfcZ7UVLdJs4IUErlDGqP5c8tuQs0b4LpMUJ/qbZVck+/fIqKRxcSebJHKqM6rDGiNNGp3wIPW6kryRhWzljgDNZHiG9Vn/CRt5Mat/VVZHkgMi8boqLwo7YVe+eOBWXc9aljg0SRN3URKIJCVVI1T+oqDJjYhSuuy5y7FKsZYN5BJeXfkwBXYsVBQBV45YqSikRrggBu2MA811rwZ0iGCMMlu8cgXy3Mn5mxhmKeojQsfbGcfQVyjw5dvawveW7qJUYq6NnmLVCqoMFTlts5xjRce9bn0X/ABNhmGlwmhI5eMkjnjJX8y9/as1rTpLfAqxDaxxlmVFVnYM7AAF2ICgsfc4AH7Cta6AhjdpU6i01qqHWN2V2RicsXkIDaqBxtzycmtnhYSMCOVHIPyaCSiQKMD9z9Sau1aRquVVVpSlApSlApSlAqhFVpQY0sXGKjbzpUTOsjRqXUYDkAkZ+Km6ttGDQaXP0KRZHPnHyy24iVRyxUAhmPccdhWqPZRvC8Itm3jSRTMyYClSddWPJJwvauryQ81hT2ockMMg96zocR6r4RCxidZAcBWEeM5VyBnbPYbD2rCteq39myrhjFgjy5FLxj3wp/TwDwD9q6pdeF41jdLdMOwIDMxY8cgZbsAcfxUF1mxmaEtd6Ku6HROQgB9ZLHv6S38U2NWt+o9PkkRyptpV1cNjMZYc42AzgH+4fepLrK3M7BGCPbSSpI7RZIfBwSGyf0n9J9h8VH9S6Dbvq9oGLF9NstqcqWBUHvyO/1qKe0vbFyyyFFKk+lgVcgqDlDwT6h3HatIl/El1Fcu8aR7z7okTKWz5YXGhU8Y4+2a8SdOmsHM9oxPloglZ1UjaQetFGO3qUezDJrFg8TRyMq3cIDLhlniADDB4JQ/H0P2qfubqW7BKXKTRF0eaFQEeTBBGy4HPA4IGaFavcXchuEu7uHcSEyBCuiOjbY0yCCoJyOCCRznJzmWPT4b+5zFAyRKqgxjZi7+ylgQE259/08ZJxUj4heCTZDnc6JANXAQcDBJGNRyePtWL1/oUdsmYXcOgVXYscSF+4QDBGoIyORgg5+bKlQviN4TcbWaLFqAN4WcbNjJIJ17dshU/b3qvTPEF1BG0SybIysurKr43zkqSMg5Yn4zUcFYDYLkFtRyvLYJxjOfbuRiqvJsSQQfqq6qfqF9hUWJbw90F7vzCHSKOJN5J34RPZVJ47n69ga3fxFcRdJjtoIYoy5R/+qdVLEZ9aq64OTuffsa5ublI1kjIEiOFUuhKsNTt6S6/PBBHOMAjucrpviaYYikK3UOeILgKzDnjUtnn6A0G2X3TYLuyPUsRQyKHUOGMSl9wDIHQHZm5GpB9THkVBdN6nYuHWeJlLEsi8qys2cgSLkOc45cL296mk8SpdgQ3Uf4SCLd0SPZPMCYKoEKkbqdT/AKu1QfgjoX4ucFh/Tj9TfXHZc/P/AD2ps6br4P8AC7eSs0kjI7OXVfSwCE5Cvkc5HH7c10aE4GKwIuOB+2PisyKkZ2zo2rJU1jRLWUoo29UpSgUpSgUpSgUpSgUpSgoRVl46v0oI94u9YMlqrBlZQQRgggEH7GptlzWO8VBqHV+imaMBJPKKMGVlUHGCOw/b/wB613qfRzF5Z8t5wGbY42bLqR9hkLXRpIe9YjwcEVNDk/UugrIyAxpC7LIWIC5wGUrk/OM/71rN70OSCQOkmx1yhTYNw2DyO2Poa7J1XoUU4UyKSVORgkZ4PBx3HJqC6l0aZHQ20aBNGTLHhMlDkDuTkGnKNAtvFUoPl3MazL7sw1cfuwGG/wBQz9ay7gW96SY52RvaKVsHtjAycN9j9qmOsdOj3CXLj8nccbHbPH7ZFQq+HxHIHjJcFSVVgAU5xk/PH0FBH9StrqONIHB8tGd0Kgd3GHJcDYgj2JrDaOL8Ozbjzt1VYwjf5eCWcvnXOSBggnA4rbYBNHwzAr/Y3K/9x9qtXHSYZ8kIUf5XlT/z/hqiV8J9PtrOzhuJI1eacO4dlD6KrMoWNTwG4yWPPOKlL9rS4jY3FuJAASQwAcDHJR15U4+tQnSbqS0j/DXUJntwxZHjIEkRbltc8FT3wffNZ7eLemQjKJcSP7ROixj9nOTx+wqbLGkeJOhNbXZtUdnUBTEWJJEbjYDHsRz2+K6x4W6OLSBY8eo4Zz/4vj7f961zwpaSX10/UrpQCSAiD8owAFUfRQB98fWugpHVSrkS1nQJWNEtZ0QoSMmNauivEde6NK0qlKCtKUoFKUoFKUoFKUoFKUoFUIqtKCw8dY0kVZ5ryy0ERJBxWJLBxipx0rGkhommuXPTY21cxqXGRsQCaib/AKDJI4kSQIpBUgDJxx2+ORW3vBVpo+KDV4fDca8tlj8mstOkoOyipkpVNM1WUYnSkPBHf44qKu/BEUjhzIwXOSqhcn6bfH2rb446ulKmo0jrGzSJFjjUKq8AD/5+TWci17EVe0SiaVjWspBVtErIRaNLi1cryoqtBWlKUClKUClKUClKUClKUClKUClKUCqVWlB4K1aZKvmvNBiulWWirNZa8OtBgGGgirLK14K0TS0EqoFe9ariivKivarQCvaig9KKurXgCri0V6FVqgqtEVpVKUFaUpQKUpQKUpQKUpQKUpQKUpQKUpQUqmKrSg8kV4ZauV5IoLZFeCKula84oq3imtXAtVC0FsLXtRQCvQFAUV7FUqtBUVWqVWiFKUoK0pSgUpSgUpSgUpSgUpSgUpSgUqmaUAiqEVWhoPOKoRVarRXjFU1r3VKDyBQ1XFVNB5AqoFVoKBVaUoK0pVKD1SqUoj1SlKBSlKBSlKBSlKBSlKBSlKClVpSgpSlKClKUoqhpSlBQ0pSgqKoKUoKilKUClKUFaUpQf//Z",
          status: "Đang hoạt động",
          description:
            "Đọc các thông tin mạch điện và truyền nó đến server xử lý lưu trữ",
          date_created: "2021-10-20",
          date_updated: "2021-12-20",
          state:
            "Bộ vi điều khiển: CPU RISC 32-bit Tensilica Xtensa LX106. Điện áp hoạt động: 3.3V. Điện áp đầu vào: 7-12V. Chân I / O kỹ thuật số (DIO): 16. Chân đầu vào tương tự (ADC): 1",
          city: "Bảng phát triển NodeMCU ESP8266 đi kèm với mô-đun ESP-12E chứa chip ESP8266 có bộ vi xử lý Tensilica Xtensa 32-bit LX106 RISC.",
        },
        {
          stt: "2",
          name: "Màn hình OLED",
          image:
            "https://nshopvn.com/wp-content/uploads/2019/03/man-hinh-lcd-oled-0-96-inch-giao-tiep-i2c-white-9W56-2020.jpg",
          status: "Đang hoạt động",
          description: "Hiển thị thông tin người dùng",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
          state:
            "Điện áp sử dụng: 2.2~5.5VDC. Công suất tiêu thụ: 0.04w. Góc hiển thị: lớn hơn 160 độ. Số điểm hiển thị: 128×64 điểm. Độ rộng màn hình: 0.96 inch",
          city: "Màn hình LCD Oled 0.96 inch giao tiếp I2C cho khả năng hiển thị đẹp, sang trọng, rõ nét vào ban ngày và khả năng tiết kiệm năng lượng tối đa với mức chi phí phù hợp.",
        },
        {
          stt: "3",
          name: "Cảm biến dòng điện Hall",
          image:
            "data:image/jpeg;base64,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",
          status: "Đang hoạt động",
          description: "Đo cường độ dòng điện chạy qua dây điện",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
          state: "IC chính: LM393, WCS1800. Điện áp làm việc: 5VDC.",
          city: "Cảm biến dòng điện Hall 35A WCS1800 là một cảm biến dòng hoạt động dựa trên hiệu ứng Hall.",
        },
        {
          stt: "4",
          name: "Adapter AC-DC 220V 5V",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROduox8CZCnUnWKLHdE0dzWMGGR1p0H1Q7oA&usqp=CAU",
          status: "Đang hoạt động",
          description: "Cấp nguồn cho NodeMCU ESP8266",
          date_created: "2021-10-20",
          date_updated: "2021-10-20",
          state:
            "Điện áp ngõ vào: 85~265VAC. Dòng ngõ vào: 0.0273A (110VAC) / 0.014A (AC220VAC). Điện áp ngõ ra: 5VDC (sai số 1%)",
          city: "Mạch nguồn xung AC-DC 5VDC 700mA sử dụng để chuyển nguồn xoay chiều AC sang 5VDC với dòng tối đa 700mA cấp cho mạch điện, có chất lượng tốt, thiết kế mạch dùng biến áp xung cách ly AC/DC và các cơ chế hồi tiếp, chống nhiễu cho độ an toàn và độ ổn định tối đa.",
        },
        {
          stt: "5",
          name: "Aptomat",
          image:
            "data:image/jpeg;base64,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",
          status: "Tắt trạng thái",
          description: "Sử dụng như cầu chì để ngắt mạch điện khi gặp sự cố",
          date_created: "2021-10-20",
          date_updated: "2021-12-25",
        },
        {
          stt: "6",
          name: "Modun Lora",
          image:
            "data:image/jpeg;base64,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",
          status: "Đang hoạt động",
          description: "Truyền dữ liệu",
          date_created: "2021-10-20",
          date_updated: "2021-12-25",
        },
      ],

      search: "",
      isShowDeleteModal: false,
      addNewRole: false,
      editRole: false,
      form: {
        name: "",
        des: " ",

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
/* .el-upload-list__item {
  margin-left: -2000px;
} */
.el-upload-list {
  margin-left: -2000px;
  width: 20px;
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
.check {
  margin-left: 50px;
}
</style>
