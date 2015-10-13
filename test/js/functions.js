test("Example #1 Define simple function which add two numbers", function (assert) {
    var returnedValue;
	
	function addTwoNumbers(a,b) {
		return a + b;
	}

	function returnNothing () {
		return;  //should return undefine
	}
	
	returnedValue = addTwoNumbers(2,2);
	assert.equal(returnedValue ,4, "Adding doesn't work");


	returnedValue = returnNothing();
	assert.ok(returnedValue === undefined, "Method return something");
	

});

test("Example #2 Define anonymous function", function (assert) {
	
	var addTwoNumbers = function(a,b) {
		return a + b;
	}

	assert.equal(addTwoNumbers(2,2) ,4, "Adding doesn't work");
});


test("Example #3 Double definition", function (assert) {
	
	function addTwoNumbers(a,b) {
		return a + b;
	}
	function addTwoNumbers(a,b) {  //This definition override the first one
		return "Aku ku";
	}
	assert.equal(addTwoNumbers(2,2) ,'Aku ku', "Adding doesn't work");
});


test("Example #4 Checking the type of variable with function", function (assert) {

	var addTwoNumbers = function (a,b) {
		return a + b;
	}
	assert.equal(typeof addTwoNumbers,'function', 'Is not a function');
	
	addTwoNumbers = 'Some string';
	assert.equal(typeof addTwoNumbers,'string', 'Is not a string');

	
});

test("Example #5 Function as parameter and returned value", function (assert) {
	
	var invoker = function (myfunction) { //function which invokes other one
		return myfunction();
	}
	
	assert.equal(invoker(function() { return "myfunction has been invoked"}),
		'myfunction has been invoked', 'Something wrong ');
	
});



test("Example #6 Can we check the function body ", function (assert) {
    assert.expect( 0 );
	
	var annymousFunction = function(param) { return "Akuku"};
	
	console.log("Show me function body-> "
		+ annymousFunction);
	
});


test("Example #7 Passing data by function arguments", function (assert) {
	
	var myObj = {name:"myObj"};
	var myString = "my String";

	function paramCheck(byRef, byVal) {
		byRef = {};
		byVal = "";
	}

	function paramCheck2(byRef, byVal) {
		byRef.name ="I've set it in paramCheck2";
		byVal = "";
	}

	//string by value
	//object by reference

	paramCheck(myObj,myString); 

	assert.equal(myObj.name,'myObj');
	assert.equal(myString,'my String');
		

	paramCheck2(myObj,myString);

	assert.equal(myObj.name,"I've set it in paramCheck2");
	assert.equal(myString,'my String');
});

test("Example #8 memorization", function (assert) {

    function veryLongCalculation(seed) {

    	if(veryLongCalculation[seed] === undefined) {
    		//do very long calculation 
    		console.log("....................... Bum");
    		veryLongCalculation[seed] = seed + 1;
    	} else {
    		console.log("I've used a cache");
    	}
    		return veryLongCalculation[seed];
    }

assert.equal(veryLongCalculation(1),2);
assert.equal(veryLongCalculation(1),2);

});


test("Example #9 methods", function (assert) {
	
	var myObj = {name:"myObj", myfunction2: function(){}};

	myObj.myfunction = function() {
		return "Result";
	}
	assert.equal(myObj.myfunction(),'Result');

});


test("Example #10 auto invocation", function (assert) {
    assert.expect( 2 );
	
	//m1 is a parameter 

	var result = (function(m1) {
		assert.ok( true, "Invocation" );
		return "Example #10";
	})("my");

	//such invocation can return values. 

	assert.equal(result,'Example #10');


});

function concat3Strings(a,b,c){
		return a+b+c;
	}

test("Example #11 how to use call ", function (assert) {

	//first parameter is a context
	//the rest are the real function arguments
	assert.equal(concat3Strings.call({},1,2,3),6);

});

test("Example #12 how to use apply", function (assert) {
   
	//first parameter is a context
	//second is a array of arguments 
	assert.equal(concat3Strings.apply(null,[1,2,3]),6);

});


test("Example #13 running function by eval", function (assert) {

	var a1=1,b1=2,c1=3;
	
	var myfunction = "concat3Strings(a1,b1,c1)";

	// all parameters will be resolved
	assert.equal(eval(myfunction),6);

});

test("Example #14 creation of function by constructor", function (assert) {

    //last argument is a body of the functuibn
    var f = new Function("a","b","return a+b"); 

     assert.equal(f(10,10),20);

});

test("Example #15 function arguments", function (assert) {

    function functionWithArguments(a,b,c) {
    	assert.equal(arguments.length,8); // you have always an access to all arguments		
    }
    //uses only a,b,c
    functionWithArguments(1,2,3,3,4,5,6,7);
});

test("Example #16 scope of variable", function (assert) {
    assert.expect( 0 );
    function myImmortalFunction(abc1) {
    	var abc="abc"; // all variables have function scope

    }
    myImmortalFunction('');
    
    //here abc is not defined
    //assert.ok(abc === undefined); I can' use abc because it is not defined.

});

var abcGlobal2 = "abcGlobal2";
 
test("Example #17 global scope", function (assert) {
  
    
    var abc = "abc"
    abcGlobal = "abcGlobal" // -> window.abcGlobal;

	assert.ok(abc); 
	assert.ok(abcGlobal);
	assert.ok(abcGlobal2);     
});

test("Example #18 What do you thing?", function (assert) {
    
    var foo = 1;
    function bar() {
    	if(!foo) {
    		var foo =10;
    	}
    	assert.equal(foo, 10);
    }
    bar();  
});

test("Example #19 order of hoisting", function (assert) {
        
        //foo(); // foo is not a function"
        
        bar(); // "this will run!"
        
        var foo = function () { // function expression assigned to local variable 'foo'
                //this won't run!
        }
        function bar() { // function declaration, given the name 'bar'
                assert.ok("this will run!");
        }
});

