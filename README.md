compoo
======

Simple and basic life-cycle and inheritance JS screwdriver.

## How to:

use...

### Inheritance

    // viola, a class inheriting from Compoo
    var Person = Compoo.extend({
      constructor: function (name) {
        this.name = name;
      },
      sayHi: function (personName) {
        console.log("Yo, " + personName + "!");
      }
    });
    
    var Dude = Person.extend({
      sayHi: function (otherDude) {
          // notice that you don't need to use Person.prototype
          Person.sayHi.call(this);
          
          console.log("You're the dude of " + otherDude);
      }
    });
    
### Instantition

Normal Compoo way - slower but more conventient from JS point of view:

    var thisDude = Person.create();
    
Classical way with the `new` keyword - faster but meh...:

    var thatDude = new Person.constructor();

### Reflection

    var person = new Person.constructor();
    
    person.is(Person); // true
    person.is(Dude); // false

### has instead of hasOwnProperty
    person.has('name');
    