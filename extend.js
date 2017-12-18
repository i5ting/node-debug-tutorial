function Base() {
    this.name = "node debug";
    this.say = function() {
        console.log('hello ' + this.name);
    }
}

function Test() {
  Base.call(this);
}

var someone = new Test();
console.log(someone.name);
someone.say();