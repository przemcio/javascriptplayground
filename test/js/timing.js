
test("setTimeoutTest",function (assert) {
    assert.expect( 2 );

    var done1 = assert.async();
    var done2 = assert.async();

    setTimeout(
        function myMethod() {
            assert.ok(true,"resumed test in setTimeout");
            done1();

        },100);


    var interVal  = setInterval(function() {
        assert.ok(true,"resumed test in setInterval");
        clearInterval(interVal);
        done2();

    },150);

});

test("first async test" ,function(assert){
    console.log("Start asyc test");
    assert.expect( 1 );
    var done = assert.async();

    setTimeout(function() {
        assert.ok(true);
        console.log("in asyc");
        done();
    },1);
    console.log("End asyc test ");
});

test( "asynchronous timeout", function( assert ) {
    assert.expect( 2);
    var doneA1 = assert.async();
    var doneA2 = assert.async();
    window.tmCounter = 0;
    var orgTimeout = window.setTimeout;

    mySetTimeout = function(fn,tm) {
        var currentC = tmCounter++;
        var registerTime = new Date();
        console.log("start setTimeout Method# "+currentC+' registered time '+registerTime);

        var wrappedFunction =  function () {
            var startMethodTime = new Date();
            console.log("Method# "+currentC+' starttime= '+startMethodTime
                +' delay= '+(startMethodTime.getTime()-registerTime.getTime()));

            fn.call(window);

            var endMethodTime = new Date();
            console.log("Method#"+currentC+' exectime= '+(endMethodTime.getTime()-startMethodTime.getTime()));

        };

        return orgTimeout.call(window,wrappedFunction,tm);
    };

    mySetTimeout(function () {
        assert.ok( true, "Passed and ready to resume! m0" );
        doneA1();
    }, 100);
    mySetTimeout(function () {
        assert.ok( true, "Passed and ready to resume! m11" );
        doneA2();
    }, 200);

});