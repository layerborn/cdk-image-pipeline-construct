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
  INPUT_PARAM_KEY: () => INPUT_PARAM_KEY,
  handler: () => handler
});
module.exports = __toCommonJS(TestCustomResource_lambda_exports);
var https = __toESM(require("https"));
var url = __toESM(require("url"));
var INPUT_PARAM_KEY = "ParamSendToLambda";
var handler = async (event, context) => {
  let statusCode = 200;
  console.log("REQUEST RECEIVED:\n" + JSON.stringify(event));
  console.log("REQUEST RECEIVED:\n" + JSON.stringify(context));
  const responseData = { output1: "" };
  const param1 = process.env[INPUT_PARAM_KEY];
  responseData.output1 = param1 ?? "No input parameter found";
  const responseBody = JSON.stringify({
    Status: "SUCCESS",
    Reason: "See the details in CloudWatch Log Stream: " + context.logStreamName,
    PhysicalResourceId: context.logStreamName,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: responseData
  });
  const parsedUrl = url.parse(event.ResponseURL);
  const options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.path,
    method: "PUT",
    headers: {
      "content-type": "",
      "content-length": responseBody.length.toString()
    }
  };
  await new Promise(function(resolve, reject) {
    https.request(options, (res) => {
      statusCode = res.statusCode ?? 500;
      resolve(statusCode);
    }).on("error", (e) => {
      reject(Error("Error sending response" + e));
    });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  INPUT_PARAM_KEY,
  handler
});
