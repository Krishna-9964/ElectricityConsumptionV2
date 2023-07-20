import json
import pickle
import pandas as pd
import numpy as np

__States = None
__data_columns = None
__model = None

def get_estimated_usage(State,Month,Day):
    try:
        state_index = __data_columns.index(State)
    except:
        state_index = -1
        
    x = np.zeros(len(__data_columns))
    x[0] = Month
    x[1] = Day
    if state_index >= 0 :
        x[state_index] = 1
        
    return round(__model.predict([x])[0],2)

def get_State_names():
    return __States

def load_saved_artifacts():
    print("loading the saved artifacts...")
    global __data_columns
    global __States
   
    
    with open("./artifacts/columns.json",'r') as f:
        __data_columns = json.load(f)['data_columns']
        __States = __data_columns[2:]
       
    global __model
    if __model is None:
        with open('./artifacts/electricity_consumption.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")


def state_usage():
    dataset = pd.read_csv("data.csv")
    df = pd.DataFrame(dataset)
    df[['Day','Month','Year']] = df.Dates.str.split("-", expand = True)
    df['Year'] = df['Year'].str.replace(' 00:00', '')
    df.drop(['Dates'], axis=1)
    usage_sum =  df.groupby('States')['Usage'].sum().reset_index()
    sorted_usage = usage_sum.sort_values('Usage', ascending=False).head(5)
    json_data = sorted_usage.to_json(orient='records')
    return json_data
    

if __name__ == '__main__':
    load_saved_artifacts()
    k = state_usage()
    print(k)

    # print(get_State_names())
    # print(get_estimated_usage('karnataka',6))
    # print(get_estimated_usage('assam',6))
    # print(get_estimated_usage('andhra pradesh',2))