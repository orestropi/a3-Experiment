
//wrong d3 version d3 v4
//referenced https://www.d3-graph-gallery.com/boxplot

console.log("hi");

function generateBoxPlot(data) {
	
	let plotcount = data.length; /*/Math.floor(Math.random() * (maxplots+1-minplots)) + minplots;/**/
	let firstInd = Math.floor(Math.random() * plotcount);
	let targets = [firstInd, firstInd];
	while (targets[0] == targets[1]) {
		targets[1] = Math.floor(Math.random() * plotcount);
	}

	// set the dimensions and margins of the graph
	let margin = {top: 25, right: 25, bottom: 25, left: 25};
	let width = (75*plotcount) - margin.left - margin.right;
	let height = 500 - margin.top - margin.bottom;
	let svg = d3.select("svg") /*svg = d3.select("#plot")
		.append("svg")*/
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	// create data
	let dataset = /*[];
	for (let i = 0; i < plotcount; i++) {
		dataset.push(getRandomArray(5));
	}/*/data;/**/

	let c = 0;
    
	
	/* Converted to use d3.rollup() instead of the deprecated d3.nest()
	// thx https://observablehq.com/@d3/d3v6-migration-guide
	var sumstat = d3.rollup(dataset, function(d) {
			let sorted = d.sort(d3.ascending);
			let q1 = d3.quantile(sorted, .25);
			let median = d3.quantile(sorted, .5);
			let q3 = d3.quantile(sorted, .75);
			let min = sorted[0];
			let max = sorted[sorted.length-1];
			return({q1: q1, median: median, q3: q3, min: min, max: max, range: max-min, iqr: q3-q1})
		}, () => c++);
		
	console.log(sumstat);
	console.log(sumstat[0]);
	console.log(sumstat[1]);
	console.log(sumstat[2]);
	console.log(sumstat[3]);
	console.log(sumstat[4]);
	/**/
    //* Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
	var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
		.key(() => c++)
		.rollup(function(d) {
			let sorted = d.sort(d3.ascending);
			let q1 = d3.quantile(sorted, .25);
			let median = d3.quantile(sorted, .5);
			let q3 = d3.quantile(sorted, .75);
			let min = sorted[0];
			let max = sorted[sorted.length-1];
			return({q1: q1, median: median, q3: q3, min: min, max: max, range: max-min, iqr: q3-q1})
		})
		.entries(dataset)/**/
	let y = d3.scaleLinear()
	  .domain([-0.05,1])
	  .range([height, 0]);
	svg.call(d3.axisLeft(y).tickFormat("").tickSize(0)); 
	let x = d3.scaleLinear()
		.domain([0,plotcount-1])
		.range([0, width+25]); 
	svg.append("g") 
	   .attr("transform", "translate(0," + height + ")")
	   .call(d3.axisBottom(x).tickFormat("").tickSize(0))
	x = d3.scaleLinear()
		.domain([0,plotcount-1])
		.range([50, width]);
	svg.selectAll("vertLines")
		.data(sumstat)
		.enter()
		.append("line")
			.attr("x1", d => x(d.key) )
			.attr("x2", d => x(d.key) )
			.attr("y1", d => y(d.value.min) )
			.attr("y2", d => y(d.value.max) )
			.attr("stroke", "black")
			.style("width", 40)
	var boxWidth = 50
	svg.selectAll("boxes")
		.data(sumstat)
		.enter()
		.append("rect")
			.attr("x", d => x(d.key)-boxWidth/2 )
			.attr("y", d => y(d.value.q3) )
			.attr("height", d => y(d.value.q1)-y(d.value.q3) )
			.attr("width", boxWidth )
			.attr("stroke", "black")
			.style("fill", 'white' );
		
	svg.selectAll('selectionDots')
		.data([sumstat[targets[0]], sumstat[targets[1]]])
		.enter()
		.append("circle")
			.attr("cx", d => x(d.key) )
			.attr("cy", height-15 )
			.attr("r", 5 )
			.style("fill", 'black' );
	svg.selectAll("medianLines")
		.data(sumstat)
		.enter()
		.append("line")
	   	.attr("x1", d => x(d.key)-boxWidth/2 )
	   	.attr("x2", d => x(d.key)+boxWidth/2 )
	   	.attr("y1", d => y(d.value.median) )
	   	.attr("y2", d => y(d.value.median) )
	   	.attr("stroke", "black")
	   	.style("width", 80)
	svg.selectAll("minLines")
		.data(sumstat)
		.enter()
		.append("line")
	   	.attr("x1", d => x(d.key)-boxWidth/2 )
	   	.attr("x2", d => x(d.key)+boxWidth/2 )
	   	.attr("y1", d => y(d.value.max) )
	   	.attr("y2", d => y(d.value.max) )
	   	.attr("stroke", "black")
	   	.style("width", 80)
	svg.selectAll("medianLines")
		.data(sumstat)
		.enter()
		.append("line")
	   	.attr("x1", d => x(d.key)-boxWidth/2 )
	   	.attr("x2", d => x(d.key)+boxWidth/2 )
	   	.attr("y1", d => y(d.value.min) )
	   	.attr("y2", d => y(d.value.min) )
	   	.attr("stroke", "black")
	   	.style("width", 80)

	return {
		max: Math.max(sumstat[targets[0]].value.range, sumstat[targets[1]].value.range), 
		min: Math.min(sumstat[targets[0]].value.range, sumstat[targets[1]].value.range)
	};
}
