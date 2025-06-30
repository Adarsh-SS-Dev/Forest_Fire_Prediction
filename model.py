import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

#Load the csv file
df = pd.read_csv("forestfires.csv")

df.head()