import pandas as pd
from sklearn.neighbors import KNeighborsRegressor
from sklearn.preprocessing import LabelEncoder


def predict_usage(state, day, month):
    # Load the dataset
    dataset = pd.read_csv('data.csv')  # Replace with your dataset path

    # Remove unnecessary columns
    dataset = dataset.drop(['Regions', 'latitude', 'longitude'], axis=1)

    # Split Dates column into Day, Month, and Year
    dataset[['Day', 'Month', 'Year']
            ] = dataset['Dates'].str.split('-', expand=True)

    # Remove the Dates column
    dataset = dataset.drop('Dates', axis=1)
    # Encode categorical features
    label_encoder = LabelEncoder()
    dataset['States'] = label_encoder.fit_transform(dataset['States'])

    # Filter data for the specified state
    state_data = dataset[dataset['States'] ==
                         label_encoder.transform([state])[0]]

    # Split features and target variable
    X = state_data[['Day', 'Month']]
    y = state_data['Usage']

    # Build the k-NN model
    k = 5  # Number of nearest neighbors to consider
    knn = KNeighborsRegressor(n_neighbors=k)

    # Train the k-NN model
    knn.fit(X, y)

    # Prepare input for prediction
    input_data = pd.DataFrame([[day, month]], columns=['Day', 'Month'])

    # Make prediction
    prediction = knn.predict(input_data)
    return round(prediction[0], 2)


print(predict_usage('Karnataka', 20, 4))
