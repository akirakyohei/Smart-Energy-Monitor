.
<template>
  <div class="container-pm">
    <div class="header">
      <h1 style="margin-left: -300px">HÓA ĐƠN TIỀN ĐIỆN THEO THÁNG</h1>
      <!--       <h3 style="margin-left: 350px;"> (Khách hàng)</h3> -->
    </div>
    <div class="main">
      <p>
        <b>Họ và tên:</b> <i>Trần Khánh Linh </i><br />
        <b>Địa chỉ</b> (quận, huyện, vùng): <br /><i>
          Số 18 Ngõ 45 Đường Vũ Đức Thận, Phường Việt Hưng, Quận Long Biên </i
        ><br />
        <b>Số công tơ:</b><i> 489678567</i><br />
        <b>Mã giá KT:</b><i> 9485576348</i><br />
        <b>ID hóa đơn:</b><i> 0002</i> <br />
        <b>Nội dung:</b
        ><el-input size="small" class="nd" placeholder="" v-model="input3">
        </el-input>
        <br />
        <b>Điện năng tiêu thụ</b>(kWh): <i>110 </i>
      </p>
      <br />
      <hr />
      <br />
      <p><b>Giá điện:</b><i> 1700đ/1kWh</i> </p>
      <p>
        Cộng:<i> 187000đ</i><br />Tiền thuế (VAT 10%):<i> 18700đ</i> <br /><b>Tổng tiền phải thanh toán:</b><i> 205700đ
</i> <br />
      </p>
      <br />
      <hr />
      <br />
      <p><b>
        <i>Số tiền bằng chữ:</i>
      </b><i> Hai trăm linh năm nghìn bảy trăm đồng </i>
      </p>
      <br />
      <hr />
      <br />
      <p>
        Nhân viên giao dịch: 0009xxxx
        <br />
        Mã nhân viên: 100000xxx<br />
        Ngày tạo: 15.06.2017 <br />
      </p>
    </div>
    <el-row class="row-payment">
      <el-button size="medium" type="danger" icon="el-icon-circle-plus" round
        @click="open2">Tạo mới</el-button
      >
      <el-button size="medium" type="danger" icon="el-icon-edit" round
        >Cập nhật</el-button
      >
      <el-button size="medium" type="danger" icon="el-icon-delete-solid" round
        @click="open3">Xóa HĐ</el-button
      >
      <el-button size="medium" type="danger" icon="el-icon-s-claim" round
        @click="open1">In</el-button
      >
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input3: "",
    };
  },
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
.el-textarea__inner {
  padding: 10px 0 0 0;
  line-height: 0;
  background-color: aqua;
}
.nd {
  height: 20px;
  padding-right: 200px;
  width: 80%;
  margin: 20px 0 20px 20px;
  color: rgb(57, 85, 109);
}
.header {
  background: white;
}
.main {
  background: rgb(206, 127, 166);
  width: 800px;
  margin: auto;
  height: 650px;
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
.row-payment {
  margin-top: 20px;
}
/* .el-icon-s-claim {
    font-size: 18px;
} */
.container-pm {
  margin: 40px 0 0 350px;
}
</style>
