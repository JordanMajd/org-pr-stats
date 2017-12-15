'use strict';

/* Exports */
module.exports = {
  flatten: flatten
};

// recursively flatten arrays
function flatten(array) {
  return array.reduce(function(flatArray, item) {
    //if is item an array flatten it recursively, otherwise add to flat array
    return flatArray.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}
