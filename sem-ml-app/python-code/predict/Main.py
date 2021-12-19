from numpy import nan, sqrt, isnan, split, array
from pandas import read_csv, to_numeric, DataFrame
from sklearn.metrics import mean_squared_error
from tensorflow import keras
from keras.models import Sequential
from keras.layers import Dense, Flatten
from keras.layers.convolutional import Conv1D, MaxPooling1D
from keras.utils.vis_utils import plot_model

# fill missing values with a value at the same time one day ago
def fill_missing(values):
	one_day = 60 * 24
	for row in range(values.shape[0]):
		for col in range(values.shape[1]):
			if isnan(values[row, col]):
				values[row, col] = values[row - one_day, col]

# Load dataset
def preprocess_data(path):
  dataset = read_csv(path, 
                    sep=';', header=0, low_memory=False, 
                    infer_datetime_format=True, 
                    parse_dates={'datetime':[0,1]}, index_col=['datetime'])
  # mark all missing values
  dataset.replace('?', nan, inplace=True)
  # make dataset numeric
  dataset = dataset.astype('float32')
  # fill missing
  fill_missing(dataset.values)
  # add a column for for the remainder of sub metering
  values = dataset.values
  dataset['sub_metering_4'] = (values[:,0] * 1000 / 60) - (values[:,4] + values[:,5] + values[:,6])
  # Resample data to daily
  daily_groups = dataset.resample('D')
  daily_data = daily_groups.sum()
  return daily_data

def split_dataset(data):
  # Split into standard weekks
  train = data
  # Restructure into windows of weekly data
  train = array(split(train, len(train)/7))
  return train

# convert history into inputs and outputs
def to_supervised(train, n_input, n_out=7):
	# flatten data
	data = train.reshape((train.shape[0]*train.shape[1], train.shape[2]))
	X, y = list(), list()
	in_start = 0
	# step over the entire history one time step at a time
	for _ in range(len(data)):
		# define the end of the input sequence
		in_end = in_start + n_input
		out_end = in_end + n_out
		# ensure we have enough data for this instance
		if out_end <= len(data):
			X.append(data[in_start:in_end, :])
			y.append(data[in_end:out_end, 0])
		# move along one time step
		in_start += 1
	return array(X), array(y)

# train the model
def build_model(train, n_input):
	# prepare data
	train_x, train_y = to_supervised(train, n_input)
	# define parameters
	verbose, epochs, batch_size = 0, 70, 16
	n_timesteps, n_features, n_outputs = train_x.shape[1], train_x.shape[2], train_y.shape[1]
	# define model
	model = Sequential()
	model.add(Conv1D(filters=32, kernel_size=3, activation='relu', input_shape=(n_timesteps,n_features)))
	model.add(Conv1D(filters=32, kernel_size=3, activation='relu'))
	model.add(MaxPooling1D(pool_size=2))
	model.add(Conv1D(filters=16, kernel_size=3, activation='relu'))
	model.add(MaxPooling1D(pool_size=2))
	model.add(Flatten())
	model.add(Dense(100, activation='relu'))
	model.add(Dense(n_outputs))
	model.compile(loss='mse', optimizer='adam')
	# fit network
	model.fit(train_x, train_y, epochs=epochs, batch_size=batch_size, verbose=verbose)
	return model

# make a forecast
def forecast(model, history, n_input):
	# flatten data
	data = array(history)
	data = data.reshape((data.shape[0]*data.shape[1], data.shape[2]))
	# retrieve last observations for input data
	input_x = data[-n_input:, :]
	# reshape into [1, n_input, n]
	input_x = input_x.reshape((1, input_x.shape[0], input_x.shape[1]))
	# forecast the next week
	yhat = model.predict(input_x, verbose=0)
	# we only want the vector forecast
	yhat = yhat[0]
	return yhat

def predict_model(train, n_input):
  model = keras.models.load_model("Quyen1.h5")
  history = [x for x in train]
  yhat_sequence = forecast(model, history, n_input)
  return yhat_sequence

def main():
  path = './household_power_consumption.txt'
  dataset = preprocess_data(path)
  train= split_dataset(dataset.values)
  n_input = 14
  result = predict_model(train, n_input)
  return result

print(main())