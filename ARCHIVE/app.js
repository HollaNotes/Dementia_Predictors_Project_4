// Read in the data from the URL
const url = "https://cors-anywhere.herokuapp.com/https://github.com/HollaNotes/Dementia_Predictors_Project_4/raw/0d36b56ace517b8557d32518ecb598aa494b908f/Resources/dementia_patients_health_data.csv";
let data;  // Define data variable 

// Fetch CSV data 
d3.csv(url, { header: "first" }).then(function(csvData) {
    // Log the csv data to the console
    console.log(csvData);

    // turn string columns to numeric
    csvData.forEach(function(turnNumeric) {
        turnNumeric.AlcoholLevel = +turnNumeric.AlcoholLevel;
        turnNumeric.HeartRate = +turnNumeric.HeartRate;
        turnNumeric.BloodOxygenLevel = +turnNumeric.BloodOxygenLevel;
        turnNumeric.BodyTemperature = +turnNumeric.BodyTemperature;
        turnNumeric.Weight = +turnNumeric.Weight;
        turnNumeric.MRI_Delay = +turnNumeric.MRI_Delay;
        turnNumeric.Age = +turnNumeric.Age;
        turnNumeric.Cognitive_Test_Scores = +turnNumeric.Cognitive_Test_Scores;
        turnNumeric.Dementia = +turnNumeric.Dementia;
    });

    // Assign csvData to the global data variable
    data = csvData;

    
    init();
});

// dropdown menu
function init() {
    // get unique values from the "Dementia" column
    let uniqueDementiaStatus = [...new Set(data.map(d => d.Dementia))];
    
    let dropdownMenu = d3.select('#selDataset');
    // get unique values populated on dropdown
    uniqueDementiaStatus.forEach(status => {
        //change 0 to say Not Demented, Else Demented
        let displayText = status === 0 ? "Not Demented" : "Demented";
        dropdownMenu.append("option")
                    .text(displayText)
                    .property("value", status)
    });
}

// Option changed
function optionChanged(value) { 
    console.log(value); 
};
