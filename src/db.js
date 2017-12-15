'use strict';


module.exports = DB;

function DB(){
  this.data = {};
}

// Return key if successfully stores, else undefined.
DB.prototype.store = function(type, item){

  if(item !== undefined && item.id !== undefined && type !== undefined){

    if(this.data[type] === undefined){
      this.data[type] = {};
    }

    this.data[type][item.id] = item;

    return item.id;
  }
}

// Return item if successfull, else undefined.
DB.prototype.fetch = function(type, id){
  if(type !== undefined && id !== undefined && this.data[type] !== undefined){
    return this.data[type][id];
  }
}

// Return number of items of given type, undefined if type does not exist
DB.prototype.count = function(type){
  if(type !== undefined && this.data[type] !== undefined){
    return Object.keys(this.data[type]).length;
  }
}
