var Joi = require('joi');
var bookshelf = require('../lib/bookshelf');

var TABLE_NAME = 'name';
module.exports.TABLE_NAME = TABLE_NAME;

var properName = bookshelf.Model.extend({
  tableName: TABLE_NAME
});
module.exports.Model = properName;

var DatabaseSchema = function(table) {
  // columns
}
module.exports.DatabaseSchema = DatabaseSchema;

var ValidationSchema = {
  // validation
};
module.exports.ValidationSchema = ValidationSchema;

module.exports.validate = function validate(object, callback) {
  Joi.validate(object, ValidationSchema, { stripUnknown: true }, function validationResponse(error, value) {
    return callback(error, value);
  });
};
