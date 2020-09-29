topFitsAll = [];
let highestIteration = 0;
const strains = 5;
let colors = ["#FFAA00", "#AABFD1", "#9933BB", "#0055BB", "#FF33DD"];
window.onload = run();

function run(){
	chromosomeLength = 10;
	let size = 10;
	mutationImpact = 0;
	for(let i = 0; i < strains; i++){
		generatePopulation(size);
		topFitsAll[topFitsAll.length] = topFits;
		if(labels[labels.length - 1] > highestIteration)highestIteration = labels[labels.length - 1];
		
		topFits = [];
		labels = [];
	}
	let count = [];
	for(let i = 0; i <= highestIteration; i++)count[count.length] = i;
	let dataSets = [];
	for(let i = 0; i < topFitsAll.length; i++){
		let obj = {};
		obj.label = "Algorithm Number " + i;
		obj.backgroundColor = colors[i];
		obj.borderColor = obj.backgroundColor;
		obj.data = topFitsAll[i];
		obj.fill = false;
		obj.pointRadius = 3;
		dataSets[dataSets.length] = obj;
	}
	
	let fitnessAvg = [];
	for(let i = 0; i < count.length; i++){
		let sum = 0;
		for(let j = 0; j < strains; j++){
			if(i < topFitsAll[j].length){
				sum += topFitsAll[j][i];
			}
			else {
				sum += chromosomeLength;
			}
		}
		fitnessAvg[i] = sum / strains;
	}
	dataSets[dataSets.length] = {
		label: "Average",
		backgroundColor : "#FF0000",
		borderColor: "#FF0000",
		fill: false,
		data: fitnessAvg
	};
	
	let ctx = document.getElementById("chart").getContext("2d");
	let chart = new Chart(ctx, {
		type: "line",
		data: {
			labels: count,
			datasets: dataSets
		}
	});
	
	
}

function randomColor(){
	let letters = ["A", "B", "C", "D", "E", "F"];
	let str = "#";
	for(let i = 0; i < 6; i++){
		let r = randomInt(15);
		str += r < 10 ? r : letters[r - 10];
	}
	return str;
}