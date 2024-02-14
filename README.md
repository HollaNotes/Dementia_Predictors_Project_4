# <center>Dementia_Predictors</center>
## <center>Project 4 - Hansle Goh, Dumiduni Geeganage, Noelle Watson</center>

<p style="text-align: center"><img src="https://openmedscience.com/wp-content/uploads/2023/04/Alzheimers-Disease-scaled.jpeg"></p>

## Table of Contents:
- [Introduction](#item-one)
- [Project Description](#item-two)
- [Data Sources](#item-three)
- [Code and Structure](#item-four)
- [Insights](#item-five)
- [References](#item-six)


<a id="item-one"></a>
## Introduction:

**What is Dementia?**

Dementia is the impaired ability to remember, think, or make decisions that interferes with doing everyday activities. 
Alzheimer’s disease is the most common type of dementia. Though dementia mostly affects older adults, it is not a part of normal aging.

**Problem statement**

Can we use machine learning models such as logistic regression, random forests, and deep learning to predict dementia?

<a id="item-two"></a>
## Project Description:

- **Data collection**

  - Dataset #1 - Dementia Patient Health and Prescription Dataset (Kaggle) 
  - Dataset #2 - Classification and Prediction of Dementia by SVM (Data.Mendeley) 

- **Exploratory Data analysis**

  - Used Pandas and Spark to explore the Data

- **Predictive Models**

  - Deep Learning
  - Random Forest
  - Logistic Regression


- **Results validation**

  - Confusion Matrix
  - Classification Report
  - SHAP Values
  - Feature Importances

<a id="item-three"></a>
## Data Sources:

  - [Dataset 1 - Dementia Patient Health and Prescription Dataset](https://www.kaggle.com/datasets/kaggler2412/dementia-patient-health-and-prescriptions-dataset/data)
  - [Dataset 2 - Classification and Prediction of Dementia by SVM](https://data.mendeley.com/datasets/tsy6rbc5d4/1)
  
<a id="item-four"></a>
## Code and Structure:

- Notebooks:
    - [Dataset #1 - First modeling notebook with all features](Classification-Models/dementia_modeling.ipynb)
    - [Dataset #1 - Second modeling notebook without *Cognitive_Test_Scores* feature](Classification-Models/dementia_modeling_no_cognitive_test.ipynb)
    - [Dataset #2 - First modeling notebook with all features](Classification-Models/dementia_with_rating_scales.ipynb)
- API:
  - [Index.html](\index.html)
  - [app.js](\static.js\app.js)


<a id="item-five"></a>
## Insights:

### *Data 1 - Dementia Patient Health and Prescription Dataset*

After preprocessing the data and selecting the dementia column as the target variable, we attempted three approaches to predict dementia with the given features: deep learning model, random forest model, and logistic regression model.

The deep learning model was created through Keras and trained with the tuner to obtain the best hyperparameters.
- Within 60 trials, the tuner search resulted in a model with an accuracy of 100% and loss of 0.018.
- The top three models all consisted of a leaky relu activation function for hidden layers and a sigmoid activation function for the output layer.
- The top model was trained separately and evaluated using the test data, and its accuracy was 99.20% with a loss of 0.024.
- With a high accuracy and a low loss, this deep learning model was ideal and confident in predicting dementia in a given patient.

However, a random forest model was also attempted to challenge the looming question of an overfitted model.
- This model achieved an accuracy, precision, and recall of 100% with seemingly no room for error.
- The confusion matrix illustrated that the model had no type I or type II errors.
- Cognitive test scores scored the highest in feature importance at 0.592 while depression status was next at 0.136, a sizable gap between the two.
- The type of diet had minimal importance in this random forest model and heart disease was the least important feature.
- SHAP, a method based on cooperative game theory and used to increase transparency and interpretability of machine learning models, was graphed to uncover additional information about feature importance.
  - Cognitive test scores were inversely related to the model output, as lower scores are more likely to lead to a diagnosis of dementia.
  - Current smokers were also inversely related to the model output while former smokers were not, which indicate that a history of smoking leans more towards a diagnosis of dementia and current smokers lean the opposite way.
  - This can also provide further insight that although smoking early on might not have large impacts to a patient's health, the history of smoking can have detrimental health effects in the future.

Finally, a logistic regression model was created and tested as an extra measure to predict dementia.
- This model achieved an accuracy of 98.8%, which is still significant as a model performance.
- There were three false negatives, or type II errors, displayed in the confusion matrix.

Going back to the feature importance, since cognitive test scores' importance was relatively higher than the rest, we created another notebook and removed that feature to test the models without it.
- The best deep learning model from the tuner had an accuracy of 80.80% and a loss of 0.4415, which is significantly lower than the ones from the first model.
- The random forest model resulted in an accuracy of 74.00% with significantly higher type I and type II values in the confusion matrix.
  - The feature importance was relatively unchanged, which indicates that cognitive test scores are important in evaluating a patient for dementia.
  - Likewise, the SHAP values demonstrated similar patterns as to the ones from the first model.
- The logistic regression model provided a similar accuracy to the random forest model at 74.40% with many type I and type II errors.

In conclusion, the first deep learning and random forest models were the most significant with accuracies of 100% and minimal loss. The logistic regression model was also effective in predicting dementia for a given patient, but it demonstrated a few type II errors. From the random forest model, we can conclude that cognitive test scores are a key feature in predicting dementia. Without the feature, all three models failed to reach an accuracy of 85%, so they cannot effectively predict dementia. 


### *Data 2 - Classification and Prediction of Dementia by SVM* 

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


<a id="item-six"></a>
## References:

- [Show all column names](https://stackoverflow.com/questions/49188960/how-to-show-all-columns-names-on-a-large-pandas-dataframe)
- [Save Keras model summary](https://stackoverflow.com/questions/45199047/how-to-save-model-summary-to-file-in-keras)
- [Keras tuner](https://www.tensorflow.org/tutorials/keras/keras_tuner)
- [Feature importance in random forests](https://forecastegy.com/posts/feature-importance-in-random-forests/)
- *random_forest_solution.ipynb*
- [SHAP values](https://towardsdatascience.com/using-shap-values-to-explain-how-your-machine-learning-model-works-732b3f40e137)
- [Markdown-Table of contents](https://www.eddymens.com/blog/markdown-table-of-contents-toc-how-to-create-one)
- [Template for slides](https://slidesgo.com/)
- [Changing colors of graph once clicked](https://chat.openai.com/c/3297e3d5-6c5a-42d7-a5e5-a0c96b8cf7ac)
- [Building a Scatterplot JavaScript](https://d3-graph-gallery.com/graph/scatter_basic.html)
- [GroupBy JavaScript](https://stackoverflow.com/questions/40774697/how-can-i-group-an-array-of-objects-by-key)
- [Objects by Keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)









