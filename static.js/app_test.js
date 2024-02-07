// Read in the data from the URL
const url = "https://cors-anywhere.herokuapp.com/https://github.com/HollaNotes/Dementia_Predictors_Project_4/raw/0d36b56ace517b8557d32518ecb598aa494b908f/Resources/dementia_patients_health_data.csv";
let data;  // Define data variable 

// Fetch CSV data 
d3.csv(url, { header: "first" }).then(function (csvData) {
    // Log the csv data to the console
    console.log(csvData);

    // turn string columns to numeric
    csvData.forEach(function (turnNumeric) {
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
            ;

    });
    vis1()
}

// Option changed
function optionChanged(value) {
    console.log(value);
    vis1(value)

};

// Create visualization

function vis1(selectedDementiaStatus) {
    // Filter data based on selectedDementiaStatus
    let filteredData;
    if (selectedDementiaStatus !== undefined) {
        filteredData = data.filter(d => d.Dementia === +selectedDementiaStatus);
    } else {
        filteredData = data;
    }
    // Initialized arrays
    let condition_count = 0
    let total = 0
    let dementia_status = ["Demented", "Not Demented"]
    let chronic_health_condition = ["Diabetes", "Heart Disease", "Hypertension", "None"]

    // For loop to populate arrays
    for (let i = 0; i < data.length; i++) {
        row = data[i];
        chronic_health_condition.push(row.Chronic_Health_Conditions);
        dementia_status.push(row.Dementia)
        if (row.Chronic_Health_Conditions == chronic_health_condition){
            condition_count += 1;            
        }
       
      

    }

    let Cognitive_Test_Scores = filteredData.map(object => parseFloat(object.Cognitive_Test_Scores));
    let MRI_Delay = filteredData.map(object => parseFloat(object.MRI_Delay));
    let Age = filteredData.map(object => parseFloat(object.Age));

    // Create trace for Plotly with custom hover text
    var trace1 = {
        x: chronic_health_condition,
        y: Age.slice(0, 10).reverse(),
        text: Cognitive_Test_Scores, // Set custom hover text
        hoverinfo: "text+x+y",  // Show custom text and x-value in hover info
        type: 'bar'
    };

    // Data array
    let plotData = [trace1];

    // Apply a title to the layout and add axis labels
    let layout = {
        title: "VISUALIZATION 1",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        },
        font: {
            family: "Arial, sans-serif"
        },
        xaxis: {
            title: 'Chronic Health Condition'
        },
        yaxis: {
            title: 'Age'
        }
    };

    // Update the existing graph or create a new one
    Plotly.newPlot("vis1", plotData, layout);
}

// function vis1() {
//     let Cognitive_Test_Scores = data.map(object => parseFloat(object.Cognitive_Test_Scores));
//     let MRI_Delay = data.map(object => parseFloat(object.MRI_Delay));
//     let Age = data.map(object => parseFloat(object.Age));

//     // Create trace for Plotly with custom hover text
//     var trace1 = {
//         x: Cognitive_Test_Scores.slice(0,20).reverse(),
//         y: Age.slice(0,10).reverse(),
//         text: Cognitive_Test_Scores, // Set custom hover text
//         hoverinfo: "text+x+y",  // Show custom text and x-value in hover info
//         type: 'bar'
//     };

//     // Data array
//     let plotData = [trace1];

//     // Apply a title to the layout and add axis labels
//     let layout = {
//         title: "Scatter Plot",
//         margin: {
//             l: 100,
//             r: 100,
//             t: 100,
//             b: 100
//         },
//         font: {
//             family: "Arial, sans-serif"
//         },
//         xaxis: {
//             title: 'Cognitive Test Scores' 
//         },
//         yaxis: {
//             title: 'Age' 
//         }
//     };

//     // Update the existing graph or create a new one
//     Plotly.newPlot("vis1", plotData, layout);
// }
