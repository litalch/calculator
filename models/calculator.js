
var calculate = function(action,part1,part2)
{
	try{
		//console.log(typeof(part1),typeof(part2))
		if (typeof(part1) != "number" || typeof(part2) != "number") {
			result = "ERR";
		}
		else
	
			switch(action) 
			{
			case "+": 
				result = part1 + part2;
				break;
			case "-": 
				result = part1 - part2;
				break;
			case "*": 
				result = part1 * part2;
				break;
			case "/":
				if(part2 == 0)
					result = "ERR";
				else
					result = part1 / part2;
				break;
			default:
				result = "ERR";
			}
	}
	catch(e)
	{
		console.log("error:: " + e);
		result= "ERR";
	}
	return result;
}



var calculateNextState  = function(jsonState, input)
{
	let state;
	if (jsonState == null)
		state = {display:"",part1:"",part2:"",action:""};
	else
	 	state =  jsonState;
	
	//console.log(JSON.stringify(state));
	if(input == "")
		return jsonState;
	switch(input) 
	{
	case '+': 
	case '-':
	case '*':
	case '/':
		if(state.part1 == ""){
		 	//state.display = "ERR";
		 	//when receiving action as a 1st input, ignoring 
		 	return state;
		 }
		if(state.hasOwnProperty("action") && state.action != "" )
		{
			if(state.part2 == "")
				{
				//when receiving action after action, change the action and return;
		 	 state.action = input;
		 	return state;
		      }
			calculation = calculate(state.action,parseInt(state.part1),parseInt(state.part2));
			state.part1 = calculation;
			state.part2 = "";
		}
		state.display = state.part1;
		state.action = input;
		state.equality_done = false;
		break;
	case "=":
	 	if (state.part1 == "" || state.part2 == "" || !state.hasOwnProperty("part1") || !state.hasOwnProperty("part2")) 
	 		{
		 	//state.display = "ERR";
		 	//when receiving = after as a 1st input or after an action, ignoring 
		 	return state;
		 }
		calculation = calculate(state.action,parseInt(state.part1),parseInt(state.part2));
		state.part1 = calculation.toString();
		state.display = state.part1;
		state.part2 = "";
		state.action = "";
		state.equality_done = true;
		 
	 	break;
	default:
	  	if (state.action == "" || !state.hasOwnProperty("action"))
	  		{
	  			//in case the action and part2 exists and are empty string it means that there was a calculation at part1 field. if the input is another number, should start a new calculation and part
	  			if(state.equality_done == true)
		  		{
					state.part1 ="";
					
		  		}
		  		state.part1 = state.part1 + input;
		  		state.display = state.part1;
	  		}
	  	else
	  		{
	  			state.part2 = state.part2 ? state.part2 + input : input.toString();
	  			state.display = state.part2;
	  		}
	  	state.equality_done = false;
		break;
	}
	
	return state;
}

module.exports.calculate = calculate;
module.exports.calculateNextState = calculateNextState;