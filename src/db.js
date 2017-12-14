'use strict';


module.exports = DB;

function DB(){
  this.data = {};
}

// Return true if successfully stores, else false.
DB.prototype.store = function(type, item){

  if(item !== undefined && item.id !== undefined && type !== undefined){

    if(this.data[type] === undefined){
      this.data[type] = {};
    }

    this.data[type][item.id] = item;

    return true;

  } else {

    return false;
  }
}

// Return item if successfull, else undefined.
DB.prototype.fetch = function(type, id){
  if(type !== undefined && id !== undefined && this.data[type] !== undefined){
    return this.data[type][id];
  }
}
