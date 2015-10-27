var myFuntion = function(assert, toCompare) {
    	assert.equal(this,toCompare);
    }

test("Check the context of object", function (assert) {
    assert.expect(2);

    var myObj = {};

    myFuntion(assert, window); //function with default context window

    myObj.myMethod = myFuntion;

    myObj.myMethod(assert, myObj); //function with object context
	
});

test("Check the context of object with call function", function (assert) {
    assert.expect(2);

    var myObj = {};

   	myFuntion.call(null,assert,window); // === myFuntion(window);
	myFuntion.call(myObj,assert,myObj); // === myObj.myMethod(myObj);
});

 var myBadFuction = function(arg) {
    	this.invalidConst=arg;  //this == window
    }

test("How to spoil global scope", function (assert) {
    assert.expect(1);
   
 	myBadFuction("bad value"); //missing creation of object/context

 	assert.equal("bad value",window.invalidConst);
});

test("How to create a my implementation of bind", function (assert) {
    assert.expect(2);
    var myObj = {};

    //bind - returns function with binded context

    var bind = function(ctx,funcToWrap) {  //ctx funcToWrap are clousured.
    	
    	return function() {
    		return funcToWrap.apply(ctx, arguments); //run wrapped function with context
    	}
    } 
   
   	var newSaveBadFunction = bind(myObj,myBadFuction);

   	assert.ok(myObj.invalidConst == undefined);

   	newSaveBadFunction("bad value with bind") /// === myObj.myBadFuction();

   	assert.ok(myObj.invalidConst != undefined);
});

test("cl", function (assert) {
   assert.expect(3);
   //bouble 1
   function outher(arg1) {
   	var o1 = "o1";
	//bouble 2
	return function inner() {
		var i1 = "i1";
		
		assert.ok(i1); //check acessibility
		assert.ok(o1);
		assert.ok(arg1);
	}
	//end bouble 2
   }
   //end bouble 1

   var myInner = outher("myArg");

   myInner(); // === inner();

   myInner = null; //do clean up all boubles will be disposed. 

});

test("common loop mistake ", function (assert) {
	assert.expect(5);

	var tab = [0,1,2,3,4];
	var tabFunctionToCallLater = [];

	for(var i= 0; i <tab.length; i++) {
		tabFunctionToCallLater.push(
			function() {
				return tab[i]; //always undefined, i is not "rembered"
			}
		);
	}

	for(var j= 0; j <tabFunctionToCallLater.length; j++) {
		assert.equal(undefined,tabFunctionToCallLater[j]()); //run all stored printElement functions
	}

});


test("common loop mistake with fix", function (assert) {
	assert.expect(5);

	var tab = [0,1,2,3,4];
	var tabFunctionToCallLater = [];

	for(var i = 0; i <tab.length; i++) {
	
		(function(tempI) {  //wrap i in closure
			tabFunctionToCallLater.push(
				 function() {	
					return tab[tempI]; //return i
				}
			)
		})(i);
	}

	for(var j= 0; j <tabFunctionToCallLater.length; j++) {
		assert.equal(j,tabFunctionToCallLater[j]()); 
	}
});

test("Implement real private variable", function (assert) {
	assert.expect(2);

	var obj = function() {
		var myprivateVariable = '';

	}
	// obj.myprivateVariable INVALID 

	function Obj2() {
		var myprivateVariable = 1;

		var myPrivateFunction = function() {
			assert.equal(window,this);
		}
		var myPublicMethod = function() {
			myPrivateFunction();  // THIS IS INVOKED in WINDOW context;
		}
		this.myMethod = myPublicMethod;
		return this;  //ver2 {myMethod:myPublicMethod} witout new
	}
 	var o2 = new Obj2();

 	o2.myMethod();
	// o2.myprivateVariable INVALID not possible to access
	// o2.myPrivateFunction INVALID 

	//second appraoch via factory

	function ObjFactory() {

		//"this" === "window"

		var myprivateVariable = 1;

		var myPrivateFunction = function() {
			assert.equal(window,this);
		}
		var myPublicMethod = function() {
			myPrivateFunction();  // THIS IS INVOKED in WINDOW context;
		}
		return {myMethod:myPublicMethod} //here is a different
	}

	var o3 = ObjFactory();
	o3.myMethod();
	// o3.myprivateVariable INVALID not possible to access
	// o3.myPrivateFunction INVALID 
});  

/**
By convention, we make a private that variable. 
This is used to make the object available to the private methods.
 This is a workaround for an error in the ECMAScript 
 Language Specification which causes this to be set incorrectly 
 for inner functions.
*/
test("that this", function (assert) {
	assert.expect(2);
	
	var obj ={};

	var f1 = function() {
		var that = this;

		var inner = function() {
			assert.equal(window,this);
			assert.equal(obj,that);
		};
		inner();
	};
	obj.runInner = f1;

	obj.runInner();

});



test("Replace variables", function (assert) {
	assert.expect(1);

	var $ = "MyVar";

	var test = "MyTestvar";

	(function($) {
		var a = function() {
				assert.equal($,"MyVar");
			};
		
		a();
	})($);

});


