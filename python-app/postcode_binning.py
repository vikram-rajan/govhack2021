import pandas as pd
import numpy as np
import glob
import csv

def read_rental_bond():

    csv_file = open('rental_data.csv', 'w')
    writer = csv.writer(csv_file)
    writer.writerow(['Month','Year','Postcode','# of Bonds'])

    for file in glob.glob("*.xlsx"):

        print(file)
        year = file[0:-5].split('_')[-1]
        month = file[0:-5].split('_')[-2]

        dataframe = pd.read_excel(file, skiprows=2)

        postcode_list=pd.unique(dataframe['Postcode'])

        for postcode in postcode_list:
            ind = dataframe['Postcode'] == postcode
            print(month,year,postcode,len(dataframe['Postcode'][ind]))
            writer.writerow([month,year,postcode,len(dataframe['Postcode'][ind])])

    csv_file.close

read_rental_bond()