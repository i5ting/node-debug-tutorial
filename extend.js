function base() {
    this.name = "node debug";
    this.say = function() {
        console.log('hello ' + this.name);
    }
}

function test() {
  base.call(this);
}

var t = new test();
console.log(t.name);
t.say();