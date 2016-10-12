"use strict";
var ThreadService = (function () {
    function ThreadService() {
    }
    //returns a list of thread names
    ThreadService.prototype.getThreads = function () {
        return ["Threadname 1", "Threadname 2", "Threadname 3"];
    };
    return ThreadService;
}());
exports.ThreadService = ThreadService;
//# sourceMappingURL=thread.service.js.map