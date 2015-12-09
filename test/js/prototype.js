test("Chect the constructor method",function (assert) {
    assert.expect(1);

    var Car = function(type) {
        this.stype = type;
    };

    var car = new Car("type");

    //.constructor contains a function which is being use on creation

    console.log("Here it is a constructor function  "+ car.constructor);

    //use constructor to create a new object.
    var car2 = new car.constructor("type1");

    assert.ok(car2 instanceof Car);

});

test("First touch of prototype",function (assert) {
    assert.expect( 4 );

    var Car = function(type) {
        this.stype = type;
    };

    assert.ok(Car.prototype instanceof Object);
    //should be empty string
    console.log('See what is prototype '+ JSON.stringify(Car.prototype));

    var car = new Car("type2");


    //add new function to a prototype
    Car.prototype.getType = function() {
        return this.stype;
    };

    //The same prototype object
    assert.equal(Car.prototype,car.constructor.prototype);

    //object proto point to "class" prototype
    assert.equal(car.__proto__,Car.prototype);
    assert.equal(car.__proto__,car.constructor.prototype);
});

test("Bad example ",function (assert) {
    assert.expect(2);

    // new Car
    function Car() {}

    // new method for Car prototype
    Car.prototype.drive = function() {
        console.log("drive");
    };

    //new Lamoborgini
    function Lamborgini() {}
    //create new proto type
    var protoObject = {drive:Car.prototype.drive};

    //a new prototype is set as plain object
    //constrictor of prototype is set to object
    Lamborgini.prototype= protoObject;

    var lamborgini = new Lamborgini();
    assert.ok(lamborgini instanceof Lamborgini);
    assert.notOk(lamborgini instanceof Car);
});

test("Fix of bad example ",function (assert) {
    assert.expect( 9 );


    function Car() {
        console.log('Runs Car constructor');
        this.engine ="any";
        this.changeEngine = function(newEngine) {
            this.engine = newEngine;
        }
    }
    //write a new version of drive to prototype
    Car.prototype.drive = function() {
        console.log("drive");
    };

    //create a new "class"
    function Lamborgini() {}

    //We expect that protorype will be an object.
    Lamborgini.prototype=new Car();


    var lamborgini = new Lamborgini();
    assert.ok(lamborgini instanceof Lamborgini);
    lamborgini.drive();
    assert.ok(lamborgini instanceof Car);

    function YellowLamborgini(){}
    YellowLamborgini.prototype = new Lamborgini();
    var yellowLamborgini = new YellowLamborgini();

    assert.ok(yellowLamborgini instanceof YellowLamborgini);
    assert.ok(yellowLamborgini instanceof Lamborgini);
    assert.ok(yellowLamborgini instanceof Car);

    assert.ok(lamborgini.engine =="any");
    assert.ok(yellowLamborgini.engine =="any");

    lamborgini.changeEngine("newEngine");

    assert.ok(lamborgini.engine =="newEngine");
    assert.ok(yellowLamborgini.engine ==="any");


});

test("simple Jquery prototype",function (assert) {

    assert.expect( 1 );

    var queryString = '#123', $ = (function() {

        //it creates a new instance of query object.
        var factoryMethod = function(selector) {
            // separate method to create object
            return new SimpleQuery(selector);

        };

        function SimpleQuery(selector) {
            this.selector = selector;
            this.getSelector = function() {return this.selector}
        }

        //remember prototype of factory method to easy register new functions

        factoryMethod.fn = factoryMethod.prototype;
        SimpleQuery.prototype = factoryMethod.fn;
        return factoryMethod;
    }());

    //register new function
    $.fn.testFunc = function() {assert.equal(this.selector,queryString);};

    //check accessibility.

    $(queryString).testFunc();

});

