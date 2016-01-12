var path = require('path');
var stripComments = require('strip-json-comments');
var fs = require('fs-extra');
var usage = "Usage: node charlie /path/to/object/schema";
var visit = "  * Visit https://github.com/project-badass/charlie\n  * for more information.";

module.exports = {
  cmdLine: function() {
    if (process.argv.length < 3) {
      console.log(usage + "\n" + visit);
      return false;
    }

    return true;
  },
  schemaPath: function() {
    var schemaPath = path.normalize(process.argv[2]);
    try {
      fs.accessSync(schemaPath, fs.F_OK);
      return true;
    } catch (err) {
      console.log
      console.log(usage);
      console.log("  * There was a problem reading your object schema from disk.");
      console.log("  * Please verify the path and that the permissions");
      console.log("  * allow this process to read the file.");
      console.log(visit);
      return false;
    }
  },
  schemaFormat: function() {
    var schemaPath = path.normalize(process.argv[2]);
    var schemaData = fs.readFileSync(schemaPath, { encoding : 'utf8'});
    
    try {
      schema = JSON.parse(stripComments(schemaData));
      if (!this.checkSchema(schema)) {
        throw new Error();
      }
      return schema;
    } catch (err) {
      console.log(err);
      console.log(usage);
      console.log("  * There was a problem parsing your object schema.");
      console.log("  * Please verify it is valid JSON.");
      console.log(visit);
      return false;
    }
  },
  checkSchema: function(schema) {
    for (var attribute in schema) {
      if (schema.hasOwnProperty(attribute)) {
        try {
          if (attribute == 'models') {
            for (var modelAttribute in schema.models) {
              console.log('Checking ' + modelAttribute);
              if (!this.checkModel(schema.models, modelAttribute)) {
                return false;
              }
            } 
          }
        } catch (err) {
          console.log(err);
          console.log(usage);
          console.log("  * There was a problem parsing `" + attribute + "`");
          console.log("  * in your object schema. Please double check it.");
          return false;
        }
      }
    }

    return true;
  },
  checkModel: function(schema, modelName) {
    // validate the schema for a particular model
    var model = schema[modelName]
    console.log('modelName: ' + modelName);
    var success = true;
    for (var columnName in model) {
      if (model.hasOwnProperty(columnName)) {
        console.log('Checking `' + modelName + '` column: ' + columnName);
        try {
          if (!this.checkColumn(model, columnName)) {
            return false;
          }
          console.log('Finished checking column: ' + columnName);
        } catch (err) {
          console.log(err);
          console.log(usage);
          console.log("  * There was a problem parsing `" + columnName + "` in `" + modelName + "`");
          console.log("  * in your object schema. Please double check it.");
          return false;
        }
      }
    }

    return true;
  },
  checkColumn: function(model, columnName) {
    // validate the schema for a particular object in a model
    var column = model[columnName];
    var foundType = false;
    for (var attribute in column) {
      if (column.hasOwnProperty(attribute)) {
        console.log('Checking column: ' + attribute);
        if (attribute == 'type') {
          var type = column[attribute];
          switch (type) {
            case 'boolean':
            case 'date': 
            case 'number':
            case 'object':
            case 'string':
              foundType = true;
              break;
            default:
              console.log('Unrecognized type of `' + type + '` in `' + columnName + '`');
              return false;
              break;
          }
        } else if (attribute != 'references' && attribute != 'fk' && attribute != 'foreignKey' 
                  && attribute != 'required' && attribute != 'format') {
          console.log('Ignoring attribute `' + attribute + '` in `' + columnName + '`');
        }
      }
    }

    if (!foundType) {
      console.log('Column `' + columnName + '` is missing the required attribute `type`');
      return false;
    } else {
      return true;
    }
  }
}
