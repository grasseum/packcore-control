const structkit = require("structkit");
const {refPluginConfig} = require("./lib/config")
const {transformConfig,writeConfig,readConfig} = require("./lib/packpierStandard")
const transformInitScript = require("./lib/transformInitScript")
const readInitScript = require("./lib/readInitScript")
const sessionData = require("./lib/sessionData")

exports.pluginConfig = refPluginConfig
exports.packPierTransformConfig = transformConfig;
exports.packPierReadConfig = readConfig;
exports.packPierWriteConfig = writeConfig;
exports.transformInitScript = transformInitScript;
exports.readInitScript = readInitScript;
exports.sessionData = sessionData;

//transformInitScript  