var fs = require('fs-extra');

function generateModels(schema) {

  var sampleModel = fs.readFileSync('./charlie/output/models/example.js', { encoding : 'utf8'});

  for (var modelName in schema) {
    if (schema.hasOwnProperty(modelName)) {
      var model = schema[modelName];
      var properName = modelName[0].toUpperCase() + modelName.slice(1);
      var newModel = sampleModel.replace("name", modelName).replace("properName", properName);
      newModel = sampleModel.replace("// columns", generateColumns(model));
      newModel = sampleModel.replace("// validation", generateValidationSchema(model));
      console.log("output dir: " + outputDir);
      fs.writeFileSync(outputDir, newModel);
    }
  }
}

function generateColumns(model) {
  // table.timestamp('created_at').defaultTo(bookshelf.knex.raw('now()'));
  // table.timestamp('updated_at').defaultTo(bookshelf.knex.raw('now()'));
  // table.increments('id').primary();
  // table.string('address_line_one');
  // table.string('address_line_two');
  // table.string('city');
  // table.string('state_province_region');
  // table.string('country');
  // table.string('country_code');
  // table.string('postal_code');
  // table.integer('user_id').references('users.id');

  var columns = '';
  for (var columnName in model) {
    if (schema.hasOwnProperty(columnName)) {
      var column = model[columnName];
      columns += 'table.' + column.type + '.(\'' + columnName + '\')';
      if (column.defaultValue) {
        columns += '.defaultTo(' + column.defaultValue + ')';
      }
      if (column.primary) {
        columns += '.primary()';
      }
      if (column.references || column.fk || column.foreignKey) {
        if (column.references) {
          var fk = column.references;
        } else if (column.fk) { 
          var fk = column.fk;
        } else if (column.foreignKey) {
          var fk = column.foreignKey;
        }

        columns += '.references(\'' + fk + '\')';
      }
      columns += ';\n\t';
    }
  }

  return columns;
}

function generateValidationSchema(model) {
  // name: Joi.string(),
  // email: Joi.string().required(),
  // password: Joi.string().required(),
  // phone: Joi.string().required(),
  // organization_id: Joi.number().integer().required(),
  // role: Joi.string().required()

  var validations = '';
  for (var columnName in model) {
    if (schema.hasOwnProperty(columnName)) {
      if (validations != '') {
        validations += ',\n\t';
      }
      var column = model[columnName];
      validations += columnName + ': Joi.' + column.type + '()';
      if (column.required === true) {
        validations += '.required()';
      }
      if (column.format) {
        validations += '.regex(/' + column.format + '/)';
      }
    }
  }

  return validations;
}

module.exports = generateModels;
