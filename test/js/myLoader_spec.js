//here it is a tdd kata.
// we will create an easy sync module loader.

//1) Write easy register. str -> module
//2) Write register function instead of string. func -> module
//3) register str via export.module.


test("simple register module", function (assert) {
    console.log('simple register module');
    var strValue = 'myRegisterModule';
    m_register(strValue,
        'm_module.export = "myRegisterModule";');
    console.log('registered');
    var myModule = m_required(strValue);
    console.log('required');
    assert.ok(myModule,strValue);
    assert.notOk(window.m_module);  //leak
});

test("simple registration module via function", function (assert) {

    var retValue = 'returned from function';
    m_register('myRegisterModule',function(m_module){ m_module.export = retValue; });
    var myModule = m_required('myRegisterModule');
    assert.ok(myModule,retValue);
    assert.notOk(window.m_module);  //leak
});

