var JSRedis = function() {

  this.cacheNameSpace = "JSCache:";
  this.expiration = 120; // In minutes

  this.setNameSpace = function(namespace){

    if (namespace.indexOf(":") = -1) {
       namespace += ":";
    }

    this.cacheNameSpace = namespace;
  };

  this.doesExist = function(key) {
    var cachedItem;

    cachedItem = localStorage.getItem(this.cacheNameSpace + key);

    return ((cachedItem !== null ? true : false));
  };

  this.get = function(key) {
    var value;

    value = this.unstringify(localStorage.getItem(this.cacheNameSpace + key));
    
    if (value) {
      if (this.isExpired(value.expiration)){
        this.remove(key);
        return false;
      } 
      return value.data;
    } else{
      return null;
    }
  };

  this.mset = function(arrayOfObjects) {
    for (var i = 0; i < arrayOfObjects.length; i++) {
      this.set(arrayOfObjects[i].key, arrayOfObjects[i].value);
    }
  };

  this.set = function(key, value) {
    var value, store = {};

    if (typeof value == "object") {
      value = this.stringify(value);
    }

    store.data = value;
    store.expiration = this.getExpirationDate();
    store = this.stringify(store);

     localStorage.setItem(this.cacheNameSpace + key, store);
     return true;
  };

  this.flush = function() {
    var i, len;

    for (i = 0, len = localStorage.length; i < len; ++i) {
      if (localStorage.key(i).indexOf(this.cacheNameSpace) != -1) {
        this.remove(this.stripNameSpace(localStorage.key(i)));
      }
    }

    return true;
  };

  this.refresh = function(key) {
    var value;

    value = this.get(key);
    return this.set(key,value);
  };

  this.remove = function(key) {
     localStorage.removeItem(this.cacheNameSpace + key);
     return true;
  };

  this.setExpiration = function(expiration) {
     this.expiration = expiration;
  };

  this.getExpirationDate = function(){
    var expiration = new Date();
    expiration.setMinutes(this.expiration);
    return expiration;
  };

  this.isExpired = function(expiration){
    var now = new Date();
    var expiration_date = new Date(expiration);

    return now > expiration_date;
  };

  this.append = function(key, value) {
    var existing, newValue;
    newValue = this.get(key) + value;
    return this.set(key, newValue);
  };

  this.rename = function(key, newKey) {
    var value;

    value = this.get(key);
    this.set(newKey, value);
    return this.remove(key);
  };

  this.whereKeyLike = function(search) {
    var matches = [];

    for (i = 0, len = localStorage.length; i < len; ++i) {
      if (localStorage.key(i).indexOf(this.cacheNameSpace) != -1 && localStorage.key(i).indexOf(search) != -1  ) {
          matches.push(this.get(this.stripNameSpace(localStorage.key(i))));
      }
    }
    return matches;
  };

  this.randomKey = function(){
    var keys, floor;

    keys = this.getAllKeys();

    if (keys.length > 0){
      floor =  Math.floor(Math.random() * keys.length);
      return keys[floor];
    } else{
      return false;
    }
  };

  this.getAllKeys = function(){
    var keys = [];

     for (i = 0, len = localStorage.length; i < len; ++i) {
      if (localStorage.key(i).indexOf(this.cacheNameSpace) != -1) {
          keys.push(this.stripNameSpace(localStorage.key(i)));
      }
    }
    return keys;
  }

  this.getAllValues = function() {
    var dump = [];

    for (i = 0, len = localStorage.length; i < len; ++i) {
      if (localStorage.key(i).indexOf(this.cacheNameSpace) != -1) {
          dump.push(this.get(this.stripNameSpace(localStorage.key(i))));
      }
    }
    return dump;
  };

  this.stripNameSpace = function(key){
     return key.replace(this.cacheNameSpace, '');
  };

  this.isSupported = function() {
    if (window.localStorage !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  this.stringify = function(data) {
    return JSON.stringify(data);
  };

  this.unstringify = function(data) {
    return JSON.parse(data);
  };
};