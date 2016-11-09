"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// System imports
var core_1 = require('@angular/core');
var CodeSnippetsComponent = (function () {
    function CodeSnippetsComponent() {
        this.title = "Code Snippets Page";
    }
    CodeSnippetsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'code-snippets-page',
            templateUrl: 'code-snippets.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], CodeSnippetsComponent);
    return CodeSnippetsComponent;
}());
exports.CodeSnippetsComponent = CodeSnippetsComponent;
//# sourceMappingURL=code-snippets.component.js.map