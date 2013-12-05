/* global: Compoo */
describe('Compoo', function () {
  
  it('basic features', function () {
    var properties = 'api'.split(',');
    var features = 'extend,implement,create,initialize,suspend,resume,destroy'.split(',');
    var feature, property;
    
    while (features.length > 0) {
      feature = features.shift();
      
      expect(typeof Compoo[feature]).toBe('function');
    }
    
    while (properties.length > 0) {
      property = properties.shift();
      
      expect(Compoo[property]).toBeDefined();
    }
  });
  
  describe('behaviour', function () {
    var constructor = function (name) {
      this.name = name;
    };
    
    var MyClass = Compoo.extend({
      constructor: constructor,
      type: 'MyClass'
    });
    
    var myInstance = MyClass.create('hakuna matata');
    
    it('Class inherits the required features', function () {
      var features = 'extend,implement,create,initialize,suspend,resume,destroy'.split(',');
      var feature;
      
      expect(MyClass.constructor).toBe(constructor);
      expect(MyClass.type).toBe('MyClass');
      
      while (features.length > 0) {
        feature = features.shift();
        expect(typeof Compoo[feature]).toBe('function');
      }
    });
    
    it('myInstance', function () {
      expect(myInstance.name).toBe('hakuna matata');
      expect(myInstance.type).toBe('MyClass');
    });
    
    it('Compoo, MyClass & myInstance methods return the context', function () {
      expect(Compoo.implement()).toBe(Compoo);
      expect(Compoo.initialize()).toBe(Compoo);
      expect(Compoo.suspend()).toBe(Compoo);
      expect(Compoo.resume()).toBe(Compoo);
      expect(Compoo.destroy()).toBe(Compoo);
    
      expect(MyClass.implement()).toBe(MyClass);
      expect(MyClass.initialize()).toBe(MyClass);
      expect(MyClass.suspend()).toBe(MyClass);
      expect(MyClass.resume()).toBe(MyClass);
      expect(MyClass.destroy()).toBe(MyClass);
    
      expect(myInstance.implement()).toBe(myInstance);
      expect(myInstance.initialize()).toBe(myInstance);
      expect(myInstance.suspend()).toBe(myInstance);
      expect(myInstance.resume()).toBe(myInstance);
      expect(myInstance.destroy()).toBe(myInstance);
    });
    
    it('extending baseApi will provide feature for both Compoo, MyClass & myInstance', function () {
      Compoo.api.extend('getName', function () {
        return this.getName;
      });
      
      expect(typeof Compoo.getName).toBe('function');
      expect(typeof MyClass.getName).toBe('function');
      expect(typeof myInstance.getName).toBe('function');
    });
    
  });
  
});