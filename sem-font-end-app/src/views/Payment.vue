.
<template>
  <div class="container-pm">
    <div class="header">
      <h1 style="margin-left: -300px;">HÓA ĐƠN TIỀN ĐIỆN THÁNG</h1>
      <h3 style="margin-left: 350px;"> (Khách hàng)</h3>
    </div>
    <div class="main">
      <p>
        Tên khách hàng: ..................................................<br />
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
    <el-row class="row-payment">
    <el-button size="medium" type="danger" icon="el-icon-circle-plus" round @click="open2" >Tạo mới</el-button>
    <el-button size="medium" type="danger" icon="el-icon-edit" round >Cập nhật</el-button>
    <el-button size="medium" type="danger" icon="el-icon-delete-solid" round @click="open2">Xóa HĐ</el-button>
    <el-button size="medium" type="danger" icon="el-icon-s-claim" round @click="open1">In</el-button>
    
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    open1() {
        this.$message({
          message: 'Thành công, bạn đã gửi hóa đơn đến email của mình.',
          type: 'success'
        });
      },
      open2() {
        this.$message('Chưa có bản hóa đơn mới.');
      },
      open3() {
        this.$message({
          message: 'Không có bản lưu trữ để xóa.',
          type: 'warning'
        });
      },
  }
};
</script>

<style scoped>
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
  margin-right: 500px;
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
.row-payment{
    margin-top: 20px;
}
/* .el-icon-s-claim {
    font-size: 18px;
} */
.container-pm {
  margin: 40px 0 0 350px;
}
</style>
