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
  
  // extensible API, extending this will provide
  // the new features to every Compoo instance
  var baseApi = {
    
    // shorthand for reflection
    is: function (component) {
      // this is actually fun stuff...
      return (this instanceof component.constructor);
    },
    
    // shorthand for hasOwnProperty
    has: function (property) {
      return (this.hasOwnProperty(property));
    },
    
    // returns the required attribute's value specified by a key
    get: function (key) {
      return this[key];
    },
    
    // sets the specified attribute's value on the context
    set: function (key, value) {
      this[key] = value;
      return this;
    }
  };
  
  var Compoo = _create(baseApi);
  
  _extend(Compoo, {
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
    
    // implements features from the given mixins/objects
    implement: function () {
      var features = _slice.call(arguments);
      var feature;
      
      while (features.length > 0) {
        feature = features.shift();
        _extend(this, feature);
      }
      
      return this;
    },
    
    // builds a new object based on the context's
    // prototype and clones the attributes
    clone: function (attributes) {
      var clone = _create(this.constructor.prototype);
      
      clone.implement(this, attributes);
      
      return clone;
    },
    
    api: {
      // extends the baseApi to provide new features to instance prototypes
      extend: function (key, feature) {
        if (typeof key === 'string' &&
          typeof feature === 'function' &&
          !baseApi.has(key)
        ) {
          baseApi[key] = feature;
        }

        return this;
      }
    }
  });
  
  _global.Compoo = Compoo;
})(function () {
  return this;
}(), Object.create, Array.prototype.slice);