
function generateLinePlot(minplots = 5, maxplots = 10) {
	vis_type = "Line";
	var svg = d3.select("svg"), width = svg.attr("width")-40, height = svg.attr("height")-40;
	var y = d3.scaleLinear().domain([0, 100]).range([220, 0]).nice();
	svg.append("g")
		.attr("transform", "translate(40,40)")
		.call(d3.axisLeft(y).ticks(5).tickFormat(d => ""));
	
	var x = d3.scaleLinear()
		.domain(d3.extent(data, function(d,i) { return i; }))
		.range([ 0, width ]);
	

	//line
	svg.append("path")
		.datum(data)
		.attr("fill", "none")
		.attr("stroke", "black")
		.attr("stroke-width", 2)
		.attr("d", d3.line()
			.x(function(d, i) { return 40 + 20 * i + 5 * (i + 1); })
			.y(function(d) { return 40+y(100-d) }));
	//dot
	svg.selectAll("myCircles")
		.data(data)
		.enter()
		.append("circle")
			.attr("fill", function(d, i) { return colorSet[i]; })
			.attr("stroke", "none")
			.attr("cx", function(d,i) { return 40 + 20 * i + 5 * (i + 1); })
			.attr("cy", function(d) { return 40+y(100-d) })
			.attr("r", 5);
}