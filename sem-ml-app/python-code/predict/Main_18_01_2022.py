# Import libraries
import datetime
import numpy as np
import pandas as pd
import keras


# Function predict
def predict(json_data):
    # load data
    data_df = pd.read_json(json_data, orient='records')
    data_df.index = data_df['datetime']
    daily_groups = data_df.resample('D')
    daily_data = daily_groups.sum()
    if daily_data.shape[0] > 7:
        data_df1 = daily_data.tail(7)
    else:
        data_df1 = daily_data
    data_df1['Year'] = data_df1.index.year
    data_df1['Month'] = data_df1.index.month
    data_df1['Day'] = data_df1.index.day

    # load model
    model = keras.models.load_model("Main.h5")

    # predict
    train = data_df1.values
    train = np.array(np.split(train, len(train) / 7))
    data = np.array(train)
    data = data.reshape((data.shape[0] * data.shape[1], data.shape[2]))
    input_x = data[-7:, :]
    input_x = input_x.reshape((1, input_x.shape[0], input_x.shape[1]))
    yhat = model.predict(input_x, verbose=0)

    # output
    res = []
    for pred in yhat[0]:
        res.append(pred[0])

    x = []
    for i in range(7):
        k = data_df1.tail(1).index + datetime.timedelta(days=i + 1)
        k_1 = pd.to_datetime(k.values[0])
        x.append(str(k_1.date()))

    res_df = pd.DataFrame(list(zip(x, res)), columns=['datetime', 'active_power'])
    res_df.index = res_df['datetime']
    res_df.drop('datetime', axis=1, inplace=True)
    return res_df.to_json()
