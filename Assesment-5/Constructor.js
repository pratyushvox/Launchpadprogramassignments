// using a constructor/prototype pattern

function Animal(name){
    this.name = name
}
//prototype pattern
Animal.prototype.eat = function(){
    console.log(`the animal ${this.name} is eating`)
}

// making a child coinstructor
function dog(name, breed){
    Animal.call(this,name)
    this.breed=breed
}

//inheritance method
// here we inherit the animal's prototype methods
dog.prototype = Object.create(Animal.prototype);
dog.prototype.constructor = dog;

dog.prototype.bark = function(){
    console.log(`${this.name} is barking saying : woof!`)
}

const dog1 = new dog("lexar","golden Retriever")
dog1.eat()
dog1.bark()



// using Es6 method

class Creature{
    constructor(name){
        this.name = name 
    }
    eat(){
        console.log(`${this.name} is eating`)
    }
}

class Doggy extends Creature{
    constructor(name,breed){
        super(name)
        this.breed = breed
    }
    bark(){
        console.log(`${this.name} is barking saying :woof`)

    }
}

const doggy2 = new Doggy("happy","labrodog")
doggy2.eat()
doggy2.bark()