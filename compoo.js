(function (_global, _create, _slice) {
  // implicit shim for Object.create method
  if (typeof _create !== 'function') {
    _create = (function (proto) {
      var Surrogate = function () {};
      
      return function (proto) {
        Surrogate.prototype = proto;
        return new Surrogate();
      }
    })();
  }
  
  // returns the current context
  var noOp = function () {
    return this;
  };
  
  // don't have to explain this too much...
  var _extend = function (obj, provider) {
    var objs = _slice.call(obj, 2);
    var p;
    
    for (p in provider) {
      if (provider.hasOwnProperty(p)) {
        obj[p] = provider[p];
      }
    }
    
    if (objs.length > 0) {
      _extend.apply(this, [obj].concat(objs));
    }
    
    return obj;
  };
  
  var Compoo = {
    // API life-cycle methods
    initialize: noOp,
    suspend: noOp,
    resume: noOp,
    destroy: noOp,
    
    // auxiliary methods
    create: function () {
      var instance = _create(this);
      this.constructor.apply(instance, arguments);
      return instance;
    },
    
    // extends a new class object from the component context
    extend: function (features) {
      var Super = this;
      var component = _create(Super);
      
      _extend(component, features);
      
      if (!component.hasOwnProperty('constructor')) {
        component.constructor = function () {
          Super.constructor.apply(this, arguments);
        }
      }
      
      component.constructor.prototype = component;
      
      return component;
    },
    
    // shorthand for reflection
    is: function (component) {
      // this is actually fun stuff...
      return (this instanceof component.constructor);
    },
    
    has: function (property) {
      return (this.hasOwnProperty(property));
    }
  };
  
  _global.Compoo = Compoo;
})(function () {
  return this;
}(), Object.create, Array.prototype.slice);