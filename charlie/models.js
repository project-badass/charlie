function generateModels(schema) {
  var sampleModel = fs.readFileSync('./output/models/example.js', { encoding : 'utf8'});

  for (var modelName in schema) {
    if (schema.hasOwnProperty(modelName)) {
      var model = schema[modelName];
      var properName = modelName[0].toUpperCase() + modelName.slice(1);
      var newModel = sampleModel.replace("name", modelName).replace("properName", properName);
      newModel = sampleModel.replace("// columns", generateColumns(model));
      newModel = sampleModel.replace("// validation", generateValidationSchema(model));
    }
  }
}

function generateColumns(model) {
  table.timestamp('created_at').defaultTo(bookshelf.knex.raw('now()'));
  table.timestamp('updated_at').defaultTo(bookshelf.knex.raw('now()'));
  table.increments('id').primary();
  table.string('address_line_one');
  table.string('address_line_two');
  table.string('city');
  table.string('state_province_region');
  table.string('country');
  table.string('country_code');
  table.string('postal_code');
  table.integer('user_id').references('users.id');

  var columns = '';
  for (var columnName in model) {
    if (schema.hasOwnProperty(columnName)) {
      var column = model[columnName];
      var columnText = '';
      newModel = sampleModel.replace("// validation", generateValidationSchema(model));
    }
  }
}

function generateValidationSchema(model) {

}

module.exports = generateModels;
