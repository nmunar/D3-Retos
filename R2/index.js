const URL = "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json"
d3.json(URL).then(data=>{
    let maxX = 0;
    let maxY = 0;
    data.forEach((item) => {
        if (item.purchasingpower >= maxX) {
          maxX = item.purchasingpower;
        }
        if (item.lifeexpectancy >= maxY) {
          maxY = item.lifeexpectancy;
        }
      });
    const canvas = d3.select("#canvas");
    const width = 700;
    const height = 500;

    const margin = {top:10,left:50,bottom:40,right:10};
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;
    
    const svg = canvas.append("svg");
    svg.attr("width",width);
    svg.attr("height",height);

    let g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0,34435.37]).range([0,iwidth]);
    const y = d3.scaleBand().domain(data.map(d=>d.lifeexpectancy)).range([iheight,0]).padding(0);    

    const bars = g.selectAll("circle").data(data);
    
    bars.enter().append("circle")
        .style("fill","steelblue")
        .attr("cx",d=>x(d.purchasingpower))
        .attr("cy",d=>y(d.lifeexpectancy))
        .attr("r",d=>(d.population*0.0000009));
    
    g.append("g")
            .classed("x--axis",true)
            .call(d3.axisBottom(x))
            .attr("transform",`translate(0,${iheight})`);
    
    g.append("g")
            .classed("y--axis",true)
            .call(d3.axisLeft(y));
});


