import pymongo
import sys
import pandas as pd
import joblib
from sklearn.linear_model import LogisticRegression

# Load the trained model
model = joblib.load('logistic_regression_model.pkl')

# MongoDB connection information
mongo_uri = "mongodb://localhost:27017"
database_name = "distancesensor"
collection_name = "suspicious_activity"

# Establish a connection to MongoDB
client = pymongo.MongoClient(mongo_uri)

# Select the database and collection
db = client[database_name]
collection = db[collection_name]

if len(sys.argv) != 4:
    print("Usage: python3 save_to_mongodb.py <hour> <day> <weekday_numeric> <value>")
    sys.exit(1)
    predicted_indicator = str(model.predict(new_data)[0])

try:
    hour = int(sys.argv[1])
    weekday_numeric = int(sys.argv[2])
    value = int(sys.argv[3])

    # Create a DataFrame with the input data
    new_data = pd.DataFrame({'hour': [hour], 'weekday_numeric': [weekday_numeric], 'value': [value]})

    # Use the loaded model to make predictions
    predicted_indicator = str(model.predict(new_data)[0])

    # Create a document to insert into MongoDB
    record = {
        'hour': hour,
        'weekday_numeric': weekday_numeric,
        'value': value,
        'predicted_indicator': predicted_indicator
    }

    # Insert the record into the MongoDB collection
    if predicted_indicator == "1":
        collection.insert_one(record)

        print("Unusual Activity Detected \nRecord saved to MongoDB.")
    else:
        print("Usual Activity")
except ValueError:
    print("Error: All arguments should be integers.")
