//takes in a large string of CSV file
//returns an array of javascript objects

function parse(csv) {

	var csvLines = csv.split('\n');
	var properties = csvLines[0].split(',');
	var objectToAdd = new Object();
	var allObjects = new Array();

	for(rows = 1; rows < csvLines.length; rows++){

		var inputLineData = csvLines[rows].split(',');

		for(i = 0; i < properties.length; i++){

			objectToAdd[properties[i]] = inputLineData[i];

		}
		
		allObjects.push(objectToAdd);
		objectToAdd = new Object();		
	}

	return allObjects;
}

// var test = parse("id,first_name,last_name,email,gender,ip_address\n1,Jeremy,Myers,jmyers0@reference.com,Male,155.184.24.182\n2,Benjamin,Simpson,bsimpson1@google.com,Male,26.183.154.184\n3,Phyllis,Elliott,pelliott2@nih.gov,Female,255.5.63.37\n4,Kathy,Reynolds,kreynolds3@google.pl,Female,204.213.221.8\n5,Jessica,Long,jlong4@nifty.com,Female,98.244.81.23\n6,Nicholas,Rogers,nrogers5@jalbum.net,Male,213.86.242.114");
// console.log(test);