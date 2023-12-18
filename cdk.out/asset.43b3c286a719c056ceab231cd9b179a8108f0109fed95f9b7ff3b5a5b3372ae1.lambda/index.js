"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Resources/Lambdas/TestCustomResourceLambda/TestCustomResource.lambda.ts
var TestCustomResource_lambda_exports = {};
__export(TestCustomResource_lambda_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(TestCustomResource_lambda_exports);
var https = __toESM(require("https"));
var handler = async (event) => {
  console.log(JSON.stringify(event, null, 2));
  const responseData = {};
  let responseStatus = "FAILED";
  try {
    switch (event.RequestType) {
      case "Create":
      case "Update":
        responseData.TestMessage = "Hello world";
        responseStatus = "SUCCESS";
        break;
      case "Delete":
        responseStatus = "SUCCESS";
        break;
      default:
        throw new Error("Unknown request type");
    }
    return await sendResponse(event, responseStatus, responseData);
  } catch (error) {
    console.error("Error:", error);
    return await sendResponse(event, responseStatus, { Error: error.message });
  }
};
function sendResponse(event, status, data) {
  const responseBody = {
    Status: status,
    Reason: "See the details in CloudWatch Log Stream.",
    PhysicalResourceId: event.LogicalResourceId,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: data
  };
  const jsonString = JSON.stringify(responseBody);
  const parsedUrl = new URL(event.ResponseURL);
  return new Promise((resolve, reject) => {
    const requestOptions = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: "PUT",
      headers: {
        "content-type": "",
        "content-length": jsonString.length
      }
    };
    const request2 = https.request(requestOptions, (response) => {
      response.on("end", () => {
        resolve();
      });
    });
    request2.on("error", (error) => {
      reject(`sendResponse Error:${error}`);
    });
    request2.write(jsonString);
    request2.end();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
