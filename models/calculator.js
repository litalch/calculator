


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


var parseObject = function(jsonState)
{
	let state  = JSON.parse(jsonState);
	return state;
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
		if(state.part1 == "")
		 	return "ERR";
		if(state.hasOwnProperty("action") && state.action != "" )
		{
			if(state.part2 == "")
				return "ERR";
			calculate = calculate(state.action,parseInt(state.part1),parseInt(state.part2));
			state.part1 = calculate;
			state.part2 = "";
		}
		state.display = state.part1;
		state.action = input;
		
		break;
	case "=":
	 	if(state.part1 == "" || state.part2 == "" || !state.hasOwnProperty("part1") || !state.hasOwnProperty("part2")) 
	 		return "ERR";
		calculate = calculate(state.action,parseInt(state.part1),parseInt(state.part2));
		state.part1 = calculate.toString();
		state.display = state.part1;
		state.part2 = "";
		state.action = "";
		 
	 	break;
	default:
	  	if (state.action == "" || !state.hasOwnProperty("action"))
	  		{
	  			//in case the action and part2 exists and are empty string it means that there was a calculation at part1 field. if the input is another number, should start a new calculation and part
	  			if(state.hasOwnProperty("action") && state.action =="" && state.hasOwnProperty("part2") && state.part2 == "")
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
		break;
	}
	
	return state;
}

module.exports.calculate = calculate;
module.exports.calculateNextState = calculateNextState;