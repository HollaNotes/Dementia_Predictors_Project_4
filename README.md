<h1>Dementia_Predictors</h1>
<h2>Project 4 - Hansle Goh, Dumiduni Geeganage, Noelle Watson</h2>

<p style="text-align: center"><img src="https://openmedscience.com/wp-content/uploads/2023/04/Alzheimers-Disease-scaled.jpeg"></p>

**<h3>Table of Contents:</h3>**
--

**<h3>Introduction:</h3>**
--


**<h3>Project Description:</h3>**
--
Our goal was to create a Dementia Prediction Model based on a dataset containing various health parameters and history.

**<h3>Data Sources:</h3>**
--
  - [Dataset 1 - Dementia Patient Health and Prescription Dataset](https://www.kaggle.com/datasets/kaggler2412/dementia-patient-health-and-prescriptions-dataset/data)
  - [Dataset 2 - Classification and Prediction of Dementia by SVM](https://data.mendeley.com/datasets/tsy6rbc5d4/1)
  - [Dataset 3 - Alzheimer MRI Images](https://www.kaggle.com/datasets/yasserhessein/dataset-alzheimer?rvi=1)

**<h3>Code and Structure:</h3>**
--
- Notebooks:
    - [First modeling notebook with all features](Classification-Models/dementia_modeling.ipynb)
    - [Second modeling notebook without *Cognitive_Test_Scores* feature](Classification-Models/dementia_modeling_no_cognitive_test.ipynb)
- API:

**<h3>Results and Evaluation:</h3>**
--


**<h3>Future Work:</h3>**
--


**<h3>References:</h3>**
--
- [Show all column names](https://stackoverflow.com/questions/49188960/how-to-show-all-columns-names-on-a-large-pandas-dataframe)
- [Save Keras model summary](https://stackoverflow.com/questions/45199047/how-to-save-model-summary-to-file-in-keras)
- [Keras tuner](https://www.tensorflow.org/tutorials/keras/keras_tuner)
- [Feature importance in random forests](https://forecastegy.com/posts/feature-importance-in-random-forests/)
- *random_forest_solution.ipynb*
- [How to set up an image classification model with your own data](https://medium.com/@ericdnbn/how-to-import-images-into-a-jupyter-notebook-using-keras-in-3-steps-2b100b18238c)
- [Plotting graphs on image classifier](https://medium.com/analytics-vidhya/how-to-do-image-classification-on-custom-dataset-using-tensorflow-52309666498e)






------------------------------------------------------------------------
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
  
  
 

Folder Contents:
- Notebooks:
    - [First modeling notebook with all features](Classification-Models/dementia_modeling.ipynb)
    - [Second modeling notebook without *Cognitive_Test_Scores* feature](Classification-Models/dementia_modeling_no_cognitive_test.ipynb)
- API:
- ETC..........

Predictors:
- Dementia (Target)

# Insights:

## Data 2 

- Because cognitive tests were not specified in the original dataset we chose, we also looked at a dataset where the specific cognitive tests used were specified among other factors of interest in predicting dementia. 
- We created a random forest model for this dataset to predict dementia status because it can deal with non-linearity and dementia might not have linear relationships with the predictor variables, we can see the feature importance 

First we created a random forest model to predict dementia with the following as predictor variables: 
- Magnetic Resonance (MR) Delay
- Gender (Male/Female)
- Age
- Education Level 
- Socioeconomic Status (SES)
- Clinical Dementia Rating (CDR) Scale
- Mini Mental State Exam (MMSE)
- Estimated Total Intracranial Volume (eTIV)
- Normalized Whole Brain Volume (nWBV)
- Atlas Scaling Factor (ASF)

The model demonstrated a 100% accuracy in predicting dementia with the rating scales like CDR and MMSE being the biggest predictors of Dementia. 

We examined the CDR and found the scale may be highly predictive of dementia as it uses information from the patient as well as an informant to establish a comprehensive assessment of an individuals ability to cognitively function as well as perform activities of daily living. 

We thought this might be a case of feature engineering where the difference in rating scale scores between demented and non-demented individuals are very different and the model uses this to get a 100% accuracy. This is seen in the scatter plot for CDR scores between demented and non-demented individuals where the difference is very dramatic. 

Thus, we decided to remove the rating scales as predictor variables and run the random forest model again. This time, the accuracy of the random forest model dropped to 82%. The biggest predictor of Dementia was normalized whole brain volume (nWBV).

nWBV can be predictive of dementia because dementia is characterized by neurodegenerative processes in the brain that can lead to neuronal loss and reduce the overall size of the brain. Thus we would expect the average demented individual have less whole brain volume than the average non-demented individual which is true when we calculate the average with the demented individuals having an average nWBV of 0.72 and non-demented individuals having an average nWBV of 0.74.

The scatter plot between demented and non-demented individuals also shows this because the clustering of nWBV for demented individuals is lower than the clustering for non-demented individuals. 

### References
- [Show all column names](https://stackoverflow.com/questions/49188960/how-to-show-all-columns-names-on-a-large-pandas-dataframe)
- [Save Keras model summary](https://stackoverflow.com/questions/45199047/how-to-save-model-summary-to-file-in-keras)
- [Keras tuner](https://www.tensorflow.org/tutorials/keras/keras_tuner)
- [Feature importance in random forests](https://forecastegy.com/posts/feature-importance-in-random-forests/)
- *random_forest_solution.ipynb*
