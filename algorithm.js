let population = [];
let fitness = [];
let mutationImpact = 0; //determines the possible string length that can be mutated, the bigger the population, the smaller the mutationImpact has to be
let chromosomeLength = 10;
let iteration = 0;
let topFits = [];
let labels = [];

//window.onload = generatePopulation(100);

function generatePopulation(size){
	for(let i  = 0; i < size; i++){
		let chromosome = "";
		for(let j = 0; j < chromosomeLength; j++){
			chromosome += randomInt(1);
		}
		population.push(chromosome);
	}
	//console.log(population);
	calcFitness();
	/*let ctx = document.getElementById("chart").getContext("2d");
	let chart = new Chart(ctx, {
		type: "line",
		
		data: {
			labels: labels,
			datasets: [{
				label: "Top Fitness values",
				backgroundColor: "#FFAA00",
				borderColor: "#FFAA00",
				data: topFits
			}]
		}
	});*/
}

function calcFitness(){
	let highestindex = 0;
	for(let i = 0; i < population.length; i++){
		let x = population[i].match(new RegExp("1", "g"));
		let f = x == null ? 0 : x.length;
		if(f == population[i].length){
			console.log("SUCCESS in Iteration " + iteration + " : " + population[i]);
			topFits[topFits.length] = f;
			labels[labels.length] = iteration;
			population = [];
			fitness = [];
			iteration = 0;
			return;
		}
		if(f > fitness[highestindex])highestindex = i;
		fitness[i] = f;
	}
	if(iteration % 1 == 0){
		//console.log("Best result in population Number " + iteration + ": ");
		//console.log("Chromosome: " + population[highestindex]);
		//console.log("Fitness: " + fitness[highestindex]);
		topFits[topFits.length] = fitness[highestindex];
		labels[labels.length] = iteration;
	}
	selectChromosomes();
}

function selectChromosomes(){
	let sum = 0;
	//1st
	for(let i = 0; i < fitness.length; i++){
		sum += fitness[i];
	}
	let random = randomInt(sum);
	let counter = 0;
	let index0;
	for(let i = 0; i < fitness.length; i++){
		counter += fitness[i];
		if(counter >= random){
			index0 = i;
			break;
		}
	}
	
	sum = 0;
	//2nd
	for(i = 0; i < fitness.length; i++){
		sum += i != index0 ? fitness[i] : 0;
	}
	random = randomInt(sum);
	counter = 0;
	let index1;
	for(let i = 0; i < fitness.length; i++){
		if(i == index0)continue;
		counter += fitness[i];
		if(counter >= random){
			index1 = i;
			break;
		}
	} 
	crossover(index0, index1);
}

function crossover(pIndex0, pIndex1){
	let lIndex0 = getMinIndex(fitness);
	let lIndex1 = getMinIndex(fitness, [lIndex0]);
	
	let rand = randomInt(population[pIndex0].length);
	let new0 = population[pIndex0].substr(0, rand) + population[pIndex1].substr(rand);
	let new1 = population[pIndex1].substr(0, rand) + population[pIndex0].substr(rand);
	
	
	population[lIndex0] = mutate(new0);
	population[lIndex1] = mutate(new1);
	
	
	
	fitness = [];
	iteration++;
	if(iteration > 10000)return;
	calcFitness();
}

function getMinIndex(arr, exceptIndex = -1){
	let lowestIndex = exceptIndex == 0 ? 1 : 0;
	for(let i = 0; i < arr.length; i++){
		if(exceptIndex == i)continue;
		if(arr[i] < arr[lowestIndex])lowestIndex = i;
	}
	return lowestIndex;
}
	
function mutate(gene){
	let rand = randomInt(gene.length) - (3 -mutationImpact);
	if(rand <= 0)return gene;
	let sub = "";
	let subInv = "";
	for(let i = 0; i < rand; i++){
		let rInt = randomInt(1);
		sub += rInt;
		subInv += rInt == 0 ? 1 : 0;
	}
	return gene.replace(sub, subInv);
}	

function randomInt(max){
	return Math.floor(Math.random()* ++max);
}

