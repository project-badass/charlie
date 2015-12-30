var usage = "Usage: node charlie /path/to/object/schema";
var visit = "  * Visit https://github.com/project-badass/charlie\n  * for more information.";

module.exports = {

  cmdLine = function() {
    if (process.argv.length < 3) {
      console.log(usage + "\n" + visit);
      return false;
    }
  },
  schemaPath = function() {
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
      return false;
    }
  },
  schemaFormat = function(schemaJSON) {
    var schema = null;
    try {
      schema = JSON.parse(stripComments(schemaJSON));
      return schema;
    } catch (err) {
      console.log(usage);
      console.log("  * There was a problem parsing your object schema.");
      console.log("  * Please verify it is valid JSON.");
      console.log(visit);
      return false;
    }
  },
  checkSchema = function(schema) {
    for (var modelName in schema) {
      if (schema.hasOwnProperty(modelName)) {
        try {
          checkModel(schema[modelName]));
        } catch (err) {
          console.log(usage);
          console.log("  * There was a problem parsing `" + modelName + "`");
          console.log("  * in your object schema. Please double check it.");
          return false;
        }
      }
    }

    return true;
  },
  checkModel = function(model) {
    for (var columnName in model) {
      if (schema.hasOwnProperty(columnName)) {
        try {
          checkColumn(model[columnName]));
        } catch (err) {
          console.log(usage);
          console.log("  * There was a problem parsing `" + columnName + "` in `" + modelName + "`");
          console.log("  * in your object schema. Please double check it.");
          return false;
        }
      }
    }

    return true;
  },
  checkColumn = function(column) {

  }
}
