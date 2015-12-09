module.exports.modelToObj = function (model) {
  var ret = {};
  for (var key in model.attributes) {
    ret[key] = model.attributes[key];
  }
  return ret;
}