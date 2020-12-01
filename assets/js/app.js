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
