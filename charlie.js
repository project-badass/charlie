var fs = require('fs-extra');
var path = require('path');
var stripComments = require('strip-json-comments');
var models = require('./charlie/models')
var routes = require('./charlie/routes');

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
	var usage = "Usage: node charlie /path/to/object/schema";
	var visit = "  * Visit https://github.com/project-badass/charlie\n  * for more information.";

	if (process.argv.length < 3) {
		console.log(usage + "\n" + visit);
		process.exit(1);
	}

	var schemaPath = path.normalize(process.argv[2]);
	var workingFolder = path.dirname(schemaPath);
	try {
		var schemaData = fs.readFileSync(schemaPath, { encoding : 'utf8'});
	} catch (err) {
		console.log(usage);
		console.log("  * There was a problem reading your object schema.");
		console.log("  * Please verify the path and that the permissions");
		console.log("  * allow this process to read the file.");
		console.log(visit);
		process.exit(2);
	}

	var schema = null;
	try {
		schema = JSON.parse(stripComments(schemaData));
	} catch (err) {
		console.log(usage);
		console.log("  * There was a problem parsing your object schema.");
		console.log("  * Please verify it is valid JSON.");
		console.log(visit);
		process.exit(3);
	}

	return schema;
}

function validateOutput() {
	fs.copySync('./charlie/output', './output', { clobber: true });
	try {
		fs.accessSync('./output', fs.W_OK);
	} catch (err) {
		console.log('Charlie does not have write permissions!\n  * Charlie needs write permissions in order to\n  * create the output.');
		process.exit(4);
	}
}
