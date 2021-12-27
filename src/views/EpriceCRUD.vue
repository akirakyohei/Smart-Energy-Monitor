.
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

<style></style>
