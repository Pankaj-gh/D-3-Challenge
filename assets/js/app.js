// @TODO: YOUR CODE HERE!

// Determing width and Height
var svgWidth = 960;
var svgHeight = 500;


// Setting Margins
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

// Chart width and Height
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;


//  SVG wrapper, append an SVG group to hold chart & shift the it left & top
var svg = d3.select(".scatter-plot")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // importing CSV FILE
d3.csv('assets/data/data.csv').then(function(data){
    // console.log(data)

    // parse data as numbers
    data.forEach(function(d){
        d.income = +d.income;
        d.obesity = +d.obesity;

    });


    // Creating Scale Function

    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d=>d.income), d3.max(data, d=> d.income)])
        .range([0, chartWidth])
        .nice()

    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.obesity), d3.max(data, d => d.obesity)])
        .range([chartHeight, 0])
        .nice()
    
    // creating axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // appending axes to chart
    chartGroup.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    
    chartGroup.append('g')
        .call(leftAxis);


    // creating circles
    var circlesGroup = chartGroup.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xLinearScale(d.income))
    .attr('cy', d => yLinearScale(d.obesity))
    .attr('r', '15')
    .attr('fill', 'pink')
    .attr('opacity', '.75');

    // append text to data
    var textGroup = chartGroup.selectAll('.stateText')
    .data(data)
    .enter()
    .append('text')
    .attr('x', d => xLinearScale(d.income))
    .attr('y', d => yLinearScale(d.obesity))
    .text(function(d){
        return d.abbr
        })
    .attr('text-anchor', 'middle')

    // initialize tooltip
    var toolTip = d3.tip()
    .attr('class', 'tooltip')
    .offset([90, 90])
    .html(function(d){
        return(`${d.abbr}:<br>Income: ${d.income} <br>Obesity: ${d.obesity} `);

    });

    // create tooltip in chart
    chartGroup.call(toolTip);

    // create event listeners to display and hide tooltip
    circlesGroup.on('click', function(data){
        toolTip.show(data, this);
    })
    // mouse out
        .on('mouseout', function(data, index){
            toolTip.hide(data)
        });
    
    textGroup.on('click', function(data){
        toolTip.show(data, this);
    })
        .on('mouseout', function(data, index){
            toolTip.hide(data)
        })
