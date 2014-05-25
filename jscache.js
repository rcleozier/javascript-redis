var JSCache = function() {

  this.cacheNameSpace = "JSCache:";

  this.doesExist = function(key) {
    var cachedItem;

    cachedItem = localStorage.getItem(this.cacheNameSpace + key, value);

    return ((typeof cachedItem != undefined ? true : false));
  };

  this.get = function(key) {
    var value;

    value = localStorage.getItem(this.cacheNameSpace + key);
    return value;
  };

  this.mset = function(arrayOfObjects) {
    for (var i = ; i < arrayOfObjects.length; i++) {
      this.set(arrayOfObjects[i].key, arrayOfObjects[i].value);
    }
  };

  this.set = function(key, value) {
    var value;

    if (typeof value == "object") {
      value = this.stringify(value);
    }

    return localStorage.setItem(this.cacheNameSpace + key, value);
  };

  this.flush = function() {
    var i, len;

    for (i = 0, len = localStorage.length; i < len; ++i) {
      if (localStorage.key(i).indexOf(this.cacheNameSpace) != -1) {
        this.remove(localStorage.key(i));
      }
    }
  };

  this.refresh = function() {

  };

  this.remove = function(key) {
    return localStorage.removeItem(this.cacheNameSpace + key);
  };

  this.setExpiration = function() {

  };

  this.append = function(key, value) {
    var existing, newValue;

    existing = this.get(key);

    this.set(key, newValue);
  };

  this.rename = function(key, newKey) {
    var value;

    value = this.get(key);
    this.set(newKey, value);
    return this.remove(key);
  };

  this.persist = function(key) {

  };

  this.whereKeyLike = function(key) {

  };

  this.getAll = function() {
    return;
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
};