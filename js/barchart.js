
/* This is the most important function in this document. 
    The others are there to provide an interactive demo,
    but some of them may be useful in the final product.
    */
function create_barchart(datas) {
    let dataset = [];
	for (let i = 0; i < plotcount; i++) {
		dataset.push(getRandomArray(5));
	}
    const svg_height = 150;
    const left_border = 40;
    const bottom_border = 20;
    const top_border = 20;
    const right_border = 20;
    const bar_width = 10;
    const bar_spacing = 5;
    const bar_count = 5;
    
    let y_scale = d3.scaleLinear().domain([0, 100]).range([svg_height - top_border - bottom_border, 0]).nice();
    
    let first_selected_value = Math.floor(Math.random() * bar_count);
    let second_selected_value = Math.floor(Math.random() * bar_count);
    while (second_selected_value == first_selected_value)
    {
        second_selected_value = Math.floor(Math.random() * bar_count);
    }

    const point = svg.selectAll("rect").data(dataset).join("rect")
        .style("stroke", "black" )
        .style("fill", (d,i) => {
            return "white";
        })
        .attr("x", (d,i) => (left_border + bar_width * i + bar_spacing * (i + 1)) )
        .attr("y", (d) => (top_border + y_scale(100-d)) )
        .attr("width", (d) => bar_width )
        .attr("height", (d) => y_scale(d));
	
    // Code copied from boxplot.js to replace color coding with dots
    svg.selectAll("circle")
	.data([first_selected_value, second_selected_value])
	.enter()
	.append("circle")
	.attr("cx", d => (left_border + 5 + bar_width * d + bar_spacing * (d + 1)) )
	.attr("cy", svg_height - bottom_border/2 )
	.attr("r", 5 )
	.style("fill", 'black' );

    var yaxis = d3.axisLeft(y_scale).ticks(1).tickFormat(d => "");
    svg.append("g").attr("transform", "translate(" + left_border + ", " + top_border + ")").call(yaxis);
}
