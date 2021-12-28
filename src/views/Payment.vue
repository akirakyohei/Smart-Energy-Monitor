.
<template>
  <div class="container">
    <div class="header">
      <h1>HÓA ĐƠN TIỀN ĐIỆN THÁNG</h1>
      <h3 style="text-align: center"> (Khách hàng)</h3>
    </div>
    <div class="main">
      <p>
        Tên khách hàng: (full name)..................................................<br />
        Địa chỉ: (quận, huyện, vùng)..................................................<br />Số điện thoại: ..................................................<br />Email:
      .................................................. <br />
        Số công tơ: ..................................................<br />
        Mã giá KT:.................................................. <br />
        ID hóa đơn: ..................................................<br />
        Nội dung: ..................................................<br />
        Điện năng tiêu thụ: ..................................................(kWh)
      </p>
      <br />
      <hr />
      <br />
      <h3>Giá điện</h3>
      <p>
        Cộng:..................................................<br />Tiền thuế (VAT 10%):..................................................<br />Tổng tiền phải thanh toán:..................................................<br />
      </p>
      <br />
      <hr />
      <br />
      <h4><i>Số tiền bằng chữ:.................................................. </i></h4>
      <br />
      <hr />
      <br />
      <p>
        Nhân viên giao dịch:.................................................. <br />
        Mã nhân viên:.................................................. <br />
        Ngày tạo:.................................................. <br />
      </p>
    </div>
    <el-row>
    <el-button size="medium" type="danger" icon="el-icon-circle-plus" round >Tạo mới</el-button>
    <el-button size="medium" type="danger" icon="el-icon-edit" round >Cập nhật</el-button>
    <el-button size="medium" type="danger" icon="el-icon-delete-solid" round>Xóa HĐ</el-button>
    <el-button size="medium" type="danger" icon="el-icon-s-claim" round>In</el-button>
    
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
.header {
  background: white;
}
.main {
  background: rgb(206, 127, 166);
  width: 800px;
  margin: auto;
  height: 600px;
  margin-top: 30px;
  padding-top: 30px;
}
p {
  font-size: 18px;
  text-align: left;
  margin-left: 50px;
}
h3,
h4 {
  text-align: left;
  margin-left: 50px;
}
/* .el-button {
    float: right;
    margin-right: 400px;
    margin-top: 20px;
    width: 100px;
    font-size: 14px;
} */
/* .el-button {
    float: right;
    margin-top: 20px;
    margin-right: 400px;
} */
.el-row {
    margin-top: 20px;
    margin-right: -350px;
}
/* .el-icon-s-claim {
    font-size: 18px;
} */
</style>
