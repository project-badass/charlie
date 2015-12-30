var fs = require('fs-extra');
var path = require('path');
var stripComments = require('strip-json-comments');
var models = require('./charlie/models');
var routes = require('./charlie/routes');
var validator = require('./charlie/validator');

var schema = validateInput();
validateOutput();

// db(schema);
models(schema);

for (var model in schema) {
  if (schema.hasOwnProperty(model)) {
  	// models(model);
    routes(model);
  }
}

function validateInput() {
	var usage = "Usage: node charlie /path/to/object/schema [/path/to/output]";
	var visit = "  * Visit https://github.com/project-badass/charlie\n  * for more information.";

	if (!validator.cmdLine() || !validator.schemaPath()) {
		process.exit(1);
	}

	var schema = validator.schemaFormat();
	if (!schema) {
		process.exit(2);
	}

	return schema;
}

function validateOutput() {
	outputDir = '';
	// if (process.argv[3]) {
	// 	outputDir = process.argv[3];
	// } else {
		outputDir = '../charlie-output';
	// }

	try {
		fs.copySync('./charlie/output', outputDir, { clobber: true });
		fs.accessSync(outputDir, fs.F_OK);
	} catch (err) {
		console.log('Charlie does not have write permissions!\n  * Charlie needs write permissions in order to\n  * create the output.');
		process.exit(4);
	}
}
