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
    vis2()
}

// Option changed
function optionChanged(value) {
    console.log(value);
    vis1(value);
    vis2(value);

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
    // Extract cognitive test scores from the filtered data
    let Cognitive_Test_Scores = filteredData.map(object => parseFloat(object.Cognitive_Test_Scores));
    
    // Count occurances of each score
    let count_scores = {};
    Cognitive_Test_Scores.forEach(score => {
        count_scores[score] = (count_scores[score] || 0) + 1;
    });

    // Convert to arrays
    let scoresArray = Object.keys(count_scores).map(score => parseFloat(score));
    let countsArray = Object.values(count_scores);


    // Create trace for Plotly with custom hover text
    var trace1 = {
        x: scoresArray,
        y: countsArray,
        text: Cognitive_Test_Scores, // Set custom hover text
        hoverinfo: "x+y",  // Show custom text and x-value in hover info
        type: 'bar'
    };

    // Data array
    let plotData = [trace1];

    // Apply a title to the layout and add axis labels
    let layout = {
        title: "Cognitive Scores - Demented vs. Non-Demented",
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
            title: 'Cognitive Test Scores'
        },
        yaxis: {
            title: 'Count'
        }
    };

    // Update the existing graph or create a new one
    Plotly.newPlot("vis1", plotData, layout);
}


function vis2(selectedDementiaStatus) {
    // Filter data based on selectedDementiaStatus
    let filteredData;
    if (selectedDementiaStatus !== undefined) {
        filteredData = data.filter(d => d.Dementia === +selectedDementiaStatus);
    } else {
        filteredData = data;
    }
    // Extract cognitive test scores from the filtered data
    let Depression_Status = filteredData.map(object => object.Depression_Status);
    
    // Count occurances of each score
    let count_statuses = {};
    Depression_Status.forEach(status => {
        count_statuses[status] = (count_statuses[status] || 0) + 1;
    });

    // Convert to arrays
    let statusesArray  = Object.keys(count_statuses);
    let countsArray  = Object.values(count_statuses);


    // Create trace for Plotly with custom hover text
    var trace1 = {
        x: statusesArray,
        y: countsArray,
        text: Depression_Status, // Set custom hover text
        hoverinfo: "x+y",  // Show custom text and x-value in hover info
        type: 'bar'
    };

    // Data array
    let plotData = [trace1];

    // Apply a title to the layout and add axis labels
    let layout = {
        title: "Depression Status - Demented vs. Non-Demented",
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
            title: 'Depression'
        },
        yaxis: {
            title: 'Count'
        }
    };

    // Update the existing graph or create a new one
    Plotly.newPlot("vis2", plotData, layout);
}