test("Example #1: Auto ';' ", function (assert) {
    
    var i = 0; 

    while(i < 5) { // do five times 

    	i++; //add +1 to i 
    }

    if(i == 0)  //here is auto {} and i++ is invoked as new statement 
    	i++;
    
	
	assert.equal(i, 5, "Ups did you count well ?");


});

test("Example #2: initialization before usage", function (assert) {

	var z = 'Some song'; //declare variable 

    assert.equal(z, 'Some song');  // the variable is visible 
    
});

test("Example #2: double declaration", function (assert) {

	var z = 'Banana'; //declare variable 

	var z; // there isn't any problem with double declariation. 
    
    assert.equal(z, 'Banana');  // the variable is visible 

    var z = "Apple"; // Remember that second can override the first one. SS

	assert.equal(z, 'Apple');  
    
});

test("Example #3: simple hoisting", function (assert) {

	z = 'Some song'
    assert.equal(z, 'Some song');
    var z;
    
    for (var i = 0; i < 10; i++) {
        var x = 5;
    }
	assert.equal(x, 5); // x is defined and visible 
    
});

test("Example #4: adding string and numbers", function (assert) {
    var five= 5, fiveStr = '5';

	assert.equal((five + five), 10);
    assert.equal((five + fiveStr), '55');
    assert.equal((fiveStr + five), '55');

});

test("Example #5: == vs ===", function (assert) {
    var five= 5, fiveStr = '5';

	assert.equal((five == five), true); // as expected
    assert.equal((five === five), true);

    assert.equal((five == fiveStr), true); // this is new :)
	assert.equal((five === fiveStr), false); // this is new :)


});
	

test("Example #6: problem with double", function (assert) {

	assert.notEqual((3.01 + 4.0001), 7.0101); // because 7.010100...1

});

test("Example #7: date comparation", function (assert) {

	var d1 = new Date(2013, 0, 1);
	var d2 = new Date(2013, 0, 2);
	var d3 = new Date(2013, 0, 1);

	assert.ok(d1 < d2); // true
	assert.ok(d1 <= d2); // true
	assert.notOk(d1 > d2); // false
	assert.notOk(d1 >= d2); // false

	assert.ok(d1.getTime()==d3.getTime()); // true
	assert.ok(d1.valueOf()==d3.valueOf()); // true
	assert.ok(Number(d1)==Number(d3));   // true
	assert.ok(+d1==+d3);          // true
});

test("Example #8: array example", function (assert) {

	var simpleArray = [], otherArray=[1,2,3,4,5];

	assert.equal(simpleArray.length, 0); // as expected

	simpleArray.push(1);

	simpleArray.push("dog");

	assert.equal(simpleArray.length, 2); //string added to number array.

	assert.equal(typeof simpleArray,'object'); // array is an object
});	

test("Example #9: creation of new object", function (assert) {

	var newObj1 = {},   // simple initialization
		newObj2 = Object.create({}),
		newObj3 = new Object();

	assert.notEqual( newObj1, undefined); // as expected
	assert.notEqual( newObj2, undefined); // as expected
	assert.notEqual( newObj3, undefined); // as expected

});

test("Example #10: JSON example", function (assert) {

	var newObj1 = {myProp:'value1', myProp2:'value2', myArray: [3,2,1]},   // simple initialization
		newObj2 = JSON.parse('{"myProp":"value1", "myProp2":"value2", "myArray":[3,2,1]}');

	assert.equal( newObj1.myProp, 'value1'); // get property value
	assert.equal( newObj1['myProp2'],'value2'); // get property value #2
	assert.equal( newObj1.myArray[1], 2); // get property value #3

	//parse json 

	assert.equal( newObj2.myProp, 'value1'); // get property value
	assert.equal( newObj2['myProp2'],'value2'); // get property value #2
	assert.equal( newObj2.myArray[1], 2); // get property value #3


});		

test("Example #11: undefine vs null", function (assert) {

	var undefinedVariable;

	assert.equal(typeof undefinedVariable,'undefined'); // undefined
 	assert.equal(typeof null,'object');                // object
	assert.notOk(null === undefinedVariable);           // false
	assert.ok(null == undefinedVariable);            // true


});		
test("Example #12: for in", function (assert) {

	var obj= {a:1,b:2,c:3}, array = [3,2,1], output = "";

	for (var prop in obj) {
  		output+=("obj." + prop + " = " + obj[prop]+' ; ');
	}
	assert.equal(output,"obj.a = 1 ; obj.b = 2 ; obj.c = 3 ; "); // loop over the property

	//what about leght ? 
	assert.equal(obj.length, undefined); //this is important, lenght doesn't work like that.
 
	output = '';

	for (var i in array) {
  		output+=("array[" + i + "] = " + array[i]+' ; ');
	}

	assert.equal(output,"array[0] = 3 ; array[1] = 2 ; array[2] = 1 ; "); // loop over the idex

	//what about legth ? 
	assert.equal(array.length, 3);

	//and what if add property  
	array['myProperty'] = 4;

	assert.equal(array.length, 3); //length stays as it is!!!
	assert.equal(typeof array, 'object'); // still an object 
});		






