import numpy as np
# trong file nay chi co hamf predict duy nhat 
def predict(input):
# ..... viet code du doan vao day
    input_x = np.array([[[input[0]], [input[1]], [input[2]], [input[3]], [input[4]],
                        [input[5]], [input[6]], [input[7]], [input[8]], [input[9]],
                        [input[10]], [input[11]], [input[12]], [input[13]], [input[14]],
                        [input[15]], [input[16]], [input[17]], [input[18]], [input[19]],
                        [input[20]], [input[21]], [input[22]], [input[23]], [input[24]],
                        [input[25]], [input[26]], [input[27]], [input[28]], [input[29]]]])
    model = keras.models.load_model("Quyen_Main_One_Month.h5")
    output = model.predict(input_x)
    return output[0]

#xin vi du ve dau vao va dau ra ntn 
#Ví dụ về đầu vào: Mảng gồm 30 giá trị về tổng công suất của từng ngày trong 30 ngày trước đó
# input = [2195.452, 2094.098, ..., 1224.252, 1309.268] (gồm 30 giá trị của 30 ngày trước đó)
#Ví dụ về đầu ra: Mảng gồm 30 giá trị về tổng công suất của từng ngày trong 30 ngày tiếp theo
# output = [2096.574 , 1939.0148, ..., 1921.3413, 1978.8315] (gồm 30 giá trị của 30 ngày tiếp theo)