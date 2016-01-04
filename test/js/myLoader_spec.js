//here it is a tdd kata.
// we will create an easy sync module loader.

//1) Write easy register.


test("register module ", function (assert) {

    mregister('myRegisterModule','myModule');

    var myModule = required('myRegisterModule');

    assert.ok(myModule);

});