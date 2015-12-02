var fs = require('fs');
var path = require('path');
var stripComments = require('strip-json-comments');

if (process.argv.length < 3) {
	console.log("Usage: node charlie /path/to/object/schema");
	console.log("  * Please see https://github.com/project-badass/charlie");
	console.log("  * for information about the object schema file.");
	process.exit(1);
}

var schemaPath = path.normalize(process.argv[2]);
var workingFolder = path.dirname(schemaPath);
try {
	var schemaData = fs.readFileSync(schemaPath)1;
} catch (err) {
	console.log(err);
	console.log("Usage: node charlie /path/to/object/schema");
	console.log("  * There was a problem reading your object schema.");
	console.log("  * Please verify the path and that the permissions");
	console.log("  * allow this process to read the file.");
	console.log("  * Visit https://github.com/project-badass/charlie");
	console.log("  * for information about the object schema file.");
	process.exit(1);
}

console.dir(schemaData);