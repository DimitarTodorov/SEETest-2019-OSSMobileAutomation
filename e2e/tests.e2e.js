"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nativescript_dev_appium_1 = require("nativescript-dev-appium");
const parser_1 = require("nativescript-dev-appium/lib/parser");
const chai_1 = require("chai");
require("mocha");
const fs = require('fs');
const addContext = require('mochawesome/addContext');
const rimraf = require('rimraf');
describe("sample scenario", () => {
    let driver;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            nativescript_dev_appium_1.nsCapabilities.testReporter.context = this;
            driver = yield nativescript_dev_appium_1.createDriver();
            driver.defaultWaitTime = 20000;
            let dir = "mochawesome-report";
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            rimraf('mochawesome-report/*', function () { });
        });
    });
    after(function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (parser_1.isSauceLab) {
                driver.sessionId().then(function (sessionId) {
                    console.log("Report: https://saucelabs.com/beta/tests/" + sessionId);
                });
            }
            yield driver.quit();
            console.log("Driver successfully quit");
        });
    });
    afterEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentTest.state && this.currentTest.state === "failed") {
                let png = yield driver.logScreenshot(this.currentTest.title);
                fs.copyFile(png, './mochawesome-report/' + this.currentTest.title + '.png', function (err) {
                    if (err) {
                        throw err;
                    }
                    console.log('Screenshot saved.');
                });
                addContext(this, './' + this.currentTest.title + '.png');
            }
        });
    });
    it("should find an element by text", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const btnTap = yield driver.findElementByAutomationText("TAP");
            yield btnTap.click();
            const message = " taps left";
            const lblMessage = yield driver.findElementByText(message, nativescript_dev_appium_1.SearchOptions.contains);
            const text = yield lblMessage.text();
            chai_1.expect(text).to.equal("41" + message);
        });
    });
});
