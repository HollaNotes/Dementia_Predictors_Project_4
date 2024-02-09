// Read in the data from the URLs
const url = "https://cors-anywhere.herokuapp.com/https://github.com/HollaNotes/Dementia_Predictors_Project_4/raw/0d36b56ace517b8557d32518ecb598aa494b908f/Resources/dementia_patients_health_data.csv";
const url2 = "https://cors-anywhere.herokuapp.com/https://dementia-data-2024-project-4.s3.us-west-2.amazonaws.com/cleaned_dementia_with_rating_scales.csv";

let data;  // Define first data variable 
let data2;  // Define second data variable 

// Fetch CSV data from the second URL
d3.csv(url2, { header: "first" }).then(function (csvData2) {
    // console log the data 
    console.log(csvData2);

    // Assign csvData2 to the global data variable
    data2 = csvData2;

    // Initialize the dropdown menu for Data 2 (Group)
    initGroupDropdown();

    // Fetch CSV data from the first URL
    d3.csv(url, { header: "first" }).then(function (csvData) {
        // console log the data 
        console.log(csvData);

        // Turn string columns to numeric for data
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

        // Initialize the dropdown menu for Data 1 (Dementia)
        init();

        // Call the updateScatter function after data is loaded
        updateScatter();
        //call vis1/vis2
        vis1()
        vis2()
    });
});

// Dropdown menu for Data 1 (Dementia)
function init() {
    // Get unique values from the "Dementia" column in data
    let uniqueDementiaStatusData = [...new Set(data.map(d => d.Dementia))];
    let dropdownMenuData = d3.select('#selDatasetData');
    
    // Get unique values from the "Group" column in data2
    let uniqueGroupValues = [...new Set(data2.map(d => d.Group))];
    let dropdownMenuGroup = d3.select('#selDatasetGroup');

    // Clear existing options for both dropdowns
    dropdownMenuData.html("");
    dropdownMenuGroup.html("");

    // Get original Dementia values mapping to "Not Demented" or "Demented"
    const dementiaMapping = {
        0: "Not Demented",
        1: "Demented"
    };

    // Get original Group values mapping to "Not Demented" or "Demented"
    const groupMapping = {
        "0": "Not Demented",
        "1": "Demented"
    };

    // Populate options for Data 1 (Dementia) dropdown
    uniqueDementiaStatusData.forEach(status => {
        dropdownMenuData.append("option")
            .text(dementiaMapping[status])
            .property("value", status);
    });

    // Populate options for Data 2 (Group) dropdown
    uniqueGroupValues.forEach(group => {
        dropdownMenuGroup.append("option")
            .text(groupMapping[group])
            .property("value", group);
    });
}

// Dropdown menu for Data 2 (Group)
function initGroupDropdown() {
    // Get unique values from the "Group" column in data2
    let uniqueGroups = [...new Set(data2.map(d => d.Group))];

    let dropdownMenu = d3.select('#selDatasetGroup');
    // Clear existing options
    dropdownMenu.html("");

    // Map original group values to the renamed values
    const groupMapping = {
        "0": "Not Demented",
        "1": "Demented"
    };

    // Filter and add options for Data 2 dropdown
    uniqueGroups.forEach(group => {
        if (Object.keys(groupMapping).includes(group)) {
            dropdownMenu.append("option")
                .text(groupMapping[group])
                .property("value", group);
        }
    });
}

// Option changed for Data 1 (Dementia)
function optionChangedData(value) {
    console.log(value);
    vis1(value);
    vis2(value);
};

// Option changed for Data 2 (Group)
function optionChangedGroup(value) {
    console.log(value);

    // Filter data2 based on the selected group value
    const filteredData = data2.filter(d => d.Group === value);

    // Update the scatter plot with the filtered data
    updateScatter(filteredData);
}

// Scatter plot update function
// Scatter plot update function
function updateScatter(filteredData) {
    // Select the container for the scatter plot
    const scatterContainer = d3.select("#scatter");

    // Clear any existing content 
    scatterContainer.html("");

    // Get CDR scores and ages from all data
    const cdrScores = data2.map(d => d.CDR);
    const ages = data2.map(d => d.Age);

    // Add dimensions
    const margin = { top: 60, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Append to the page
    const svg = scatterContainer.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Scatter Plot of CDR Scores vs Age");

    // Add scales for x and y axes
    const xScale = d3.scaleLinear()
        .domain([40, 100])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(cdrScores)])
        .range([height, 0]);

    // Add dots for all data points
    svg.selectAll("circle")
        .data(data2)
        .enter().append("circle")
        .attr("cx", d => xScale(d.Age))
        .attr("cy", d => yScale(d.CDR))
        .attr("r", 5)
        .style("fill", "#e75480");  

    // Add x-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Add labels
    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 10) + ")")
        .style("text-anchor", "middle")
        .text("Age");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("CDR Score");

    // Check if filteredData is not empty
    if (filteredData && filteredData.length > 0) {
        // If a value is selected, update the scatter plot with the filtered data
        // Remove existing dots
        svg.selectAll("circle").remove();

        // Add dots for the selected data points
        svg.selectAll("circle")
            .data(filteredData)
            .enter().append("circle")
            .attr("cx", d => xScale(d.Age))
            .attr("cy", d => yScale(d.CDR))
            .attr("r", 5)
            .style("fill", "purple");  
    }
}


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
        type: 'bar', 
        marker: {
            color: 'purple'
        }
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
        type: 'bar', 
        marker: {
            color: '#e75480'
        }
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

