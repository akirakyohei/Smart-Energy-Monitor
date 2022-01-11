import numpy as np
# trong file nay chi co hamf predict duy nhat 
def predict(input):
# ..... viet code du doan vao day
    input_x = np.array([[[input[0]], [input[1]], [input[2]],
                        [input[3]], [input[4]], [input[5]], [input[6]]]])
    model = keras.models.load_model("Quyen_Main_One_Week.h5")
    output = model.predict(input_x)
    return output[0]

#xin vi du ve dau vao va dau ra ntn 
#Ví dụ về đầu vào: Mảng gồm 7 giá trị về tổng công suất của từng ngày trong 7 ngày trước đó
# input = [2195.452, 2094.098, 2047.968, 2451.11, 2211.892, 1224.252, 1309.268]
#Ví dụ về đầu ra: Mảng gồm 7 giá trị về tổng công suất của từng ngày trong 7 ngày tiếp theo
# output = [2096.574 , 1939.0148, 1889.5426, 1994.3364, 1852.1604, 1921.3413, 1978.8315]