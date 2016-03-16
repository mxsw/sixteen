
var margin = 5;

function closestSum(set, names, sum){
	var lists = [];
	var subset = [];
	
	var n = set.length;
	
	var a = []
	var b = []
	// if sum is 0, answer is true
	for(i = 0; i <= n; i++){
		a.push(1);
		b.push([]);
	}
	
	subset.push(a);
	lists.push(b);
	
	for(i = 1; i <= sum + margin; i++){
		var a = [];
		var b = [];
		
		// If sum is not 0 and set is empty, then answer is false
		a.push(0);
		b.push([]);
		
		for(j = 1; j <= n; j++){
			var bool1 = false;
			var bool2 = false;
			
			// if it can be done without the current number
			if(a[j-1]){
				bool1 = true;
			}
			
			// if it can be done with this
			else if (i >= set[j-1] && subset[i - set[j-1]][j-1]){
				bool2 = true;
			}
			
			// choose how to
			if(bool1 && bool2){
				bool1 = false; bool2 = false;
				if(Math.random() < 0.5){
					bool1 = true;
				} else {
					bool2 = true;
				}
			}
			if (bool1){
				a.push(a[j-1]);
				b.push(b[j-1]); // deep copy
			}
			else if (bool2){
				a.push(subset[i - set[j-1]][j-1] + 1);
				b.push(JSON.parse(JSON.stringify(lists[i - set[j-1]][j-1]))); // deep copy
				b[j].push(j-1); // and append this index
			} else {
				a.push(0);
				b.push([]);
			}
		}
		
		subset.push(a);
		lists.push(b);
		//console.log(b);
		//console.log();
		//console.log(lists);
     }//console.log(lists);
	
	 var delta = margin + 1;
	 
     for(i = 0; i <= margin; i++){
    	 if(subset[sum+i][n]){
    		 delta = i;
    		 break;
    	 }
    	 if(sum-i >= 0){
			 if(subset[sum-i][n]){
				 delta = -i;
				 break;
			 }
    	 }
     }

     return {possible: (delta <= margin), delta: delta, list: lists[sum+delta][n]};
}

var sum = 9;
var set = [3,34,4,12,5,2];
var names = ["a", "b", "c", "d", "e", "f"];

var out = closestSum(set, names, sum);
console.log(out.possible);
console.log(out.delta);
for(i = 0; i < out.list.length; i ++){
	console.log(names[out.list[i]]);
}
	
