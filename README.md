<h1>Dementia_Predictors</h1>
<h2>Project 4 - Hansle Goh, Dumiduni Geeganage, Noelle Watson</h2>

<p style="text-align: center"><img src="https://neurosciencenews.com/files/2023/11/personality-dementia-neurosicence.jpg"></p>

**Goal**:
Our goal was to create a Dementia Prediction Model based on a dataset containing various health parameters and history.

<<<<<<< HEAD
- *Dataset used*:
https://www.kaggle.com/datasets/kaggler2412/dementia-patient-health-and-prescriptions-dataset/data
=======
Dataset used: [Kaggle - Dementia patient health dataset](https://www.kaggle.com/datasets/kaggler2412/dementia-patient-health-and-prescriptions-dataset/data)
>>>>>>> c4d8d93c252491d8a92cb926eea2dd871ef5d0c0


<<<<<<< HEAD
Method:
- Initial exploration:  
  - A Jupyter Notebook was created which utilized Pandas to read in our data and perform initial searches on our data
- Data Storage:
  - Data was stored in AWS S3 
- dementia_overview.ipynb created:
    - A Jupyter Notebook was created which utilized imports such as Pandas, matplotlib, seaborn, and pyspark
    - Our data hosted in AWS was read in with pyspark
    - Data was cleaned and transformed
    - Performed various queries to get more insights on the data and create visualizations based on insights
- Dashboard Created with app.js and index.html files:
  - app.js created
    - A JavaScript file was created which utilized D3
    - Our data hosted in AWS was not reading in properly, so cors-anywhere-herokuapp was utilized 
    -  Dashboard was initialized with a drop down menu indicating "Demented" or "Not Demented"
    -  Visualizations were added to the dashboard which change dynamically when the user changes the selection on the dropdown
  - index.html created
    - Utilized imports such as D3 and Plotly
    - Linked app.js to ensure code worked together smoothly
- Create predictive models 
  - dementia_modeling.ipynb
    - A Jupyter Notebook was created which utilized dependencies such as sklearn, tensorflow, pandas, and matplotlib
    - Preprocessing the Data
      - Columns "Prescription" and "Dosage in mg" were dropped 
      - Binary columns were encoded
      - Turned categorical columns into numeric with 'pd.get_dummies'
      - Assigned target variable ["Dementia"] and features
      - Split training and testing datasets
      - Scaled data
    - Deep Learning Model
      - Created a method that creates a new Sequential model with hyperparameter options using keras and kerastuner
      - Ran Kerastuner search for the best parameters and found the best model
      - Ran predictions and found best epoch
      - Evaluated model using out test data
    - Random Forest Model
      - Created a random forest classifier
      - fit the model and made predictions
      - Calculated the confusion matrix and displayed results
      - Calculated feature importance and created a vissualization showing the top 10 important features used in the model
    - Logistic Regression Model
      - Declared a logistic regression model and fit it using the training data
      - Generated Predictions
      - Printed confusion matrix and calculated the accuracy score
  - dementia_modeling_no_cognitive_test.ipynb created
    - After looking at the models, it became clear that the cognitive tests were very high indicators of dementia, so we decided to run the models again after dropping the "Cognitive_Test_Results" feature
  - Additional ...
    - 
  
  
 
=======
Group Members:
- Hansle Goh
- Dumiduni Geeganage
- Noelle Watson
>>>>>>> c4d8d93c252491d8a92cb926eea2dd871ef5d0c0

Folder Contents:
- Notebooks:
    - [First modeling notebook with all features](Classification-Models/dementia_modeling.ipynb)
    - [Second modeling notebook without *Cognitive_Test_Scores* feature](Classification-Models/dementia_modeling_no_cognitive_test.ipynb)
- API:
- ETC..........

<<<<<<< HEAD
=======
Method:
- Read in dataset and do initial exploration
- Create dashboard
- Create predictive models
    - Deep learning model
    - Random forest model
    - Logistic regression model
- Put into PySpark
- 

>>>>>>> c4d8d93c252491d8a92cb926eea2dd871ef5d0c0
Predictors:
- Dementia (Target)

Insights:
- 

### References
- [Show all column names](https://stackoverflow.com/questions/49188960/how-to-show-all-columns-names-on-a-large-pandas-dataframe)
- [Save Keras model summary](https://stackoverflow.com/questions/45199047/how-to-save-model-summary-to-file-in-keras)
- [Keras tuner](https://www.tensorflow.org/tutorials/keras/keras_tuner)
- [Feature importance in random forests](https://forecastegy.com/posts/feature-importance-in-random-forests/)
- *random_forest_solution.ipynb*