let vm = require('vm')
let debug = vm.runInDebugContext('Debug')

function test() {}

debug.setListener((event, execState, eventData, data) => {
    if (event != debug.DebugEvent.Break) return

    var script   = eventData.func().script().name()
    var line     = eventData.sourceLine()
    var col      = eventData.sourceColumn()

    var location = script + ":" + line + ":" + col

    var funcName = eventData.func().name()
    if (funcName != "") {
        location += " " + funcName + "()"
    }

    console.log(location)
})

debug.setBreakPoint(test, 0, 0)

test()