
var _myRegistry = [];

function wrapFunction(f_argument) {

    console.log(f_argument);
    return new Function('m_module',f_argument);
}
function initialize(func) {
    var module ={};
    func.call({},module);
    console.log('returned value -> '+JSON.stringify(module.export));
    return module.export;
}
function m_register(name, f_argument) {
    var func;

    if(typeof f_argument === 'function') {
        func = f_argument;
    } else if(typeof f_argument === 'string') {
        func = wrapFunction(f_argument)
        console.log('wrapped');

    } else {
        throw new Exception('invalid argument')
    }


    _myRegistry[name]= initialize(func);
    console.log('log ->' + _myRegistry[name]);
}

function m_required(name) {
    return  _myRegistry[name];
}