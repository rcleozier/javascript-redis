Javascript Redis Library
=========

A Redis Like Javascript Caching Library

  - Lightweight
  - Easy Installation
  - Features Expiration
  
#### Instantiation 
```javascript
   var cache = new JSRedis();
```

#### Storing data
```javascript
  cache.set('username', "brogrammer"));
```

#### Multi Set. Store an array of objects in one function call
```javascript
   cache.mset(arrayOfObjects);
```

#### Retrieving data
```javascript
  cache.get('username'));
```
#### Appending data
```javascript
  cache.set('description', "A short description"));
  cache.append('description',' A little bit more descriptive');
```

#### Rename a key in the cache
```javascript
  cache.rename('username','email');
```

#### Check if a key exist in the cache
```javascript
  cache.doesExist('username');
```

#### Checking if browser supports JSRedis
```javascript
  cache.isSupported();
```

#### Flushing all keys in the cache
```javascript
  cache.flush();
```

#### Remove a key from the cache
```javascript
  cache.remove('email');
```

#### Refreshing a key from the cache (Updating expiration of key)
```javascript
  cache.refresh('description');
```

#### Get all current keys in the cache
```javascript
  cache.getAllKeys();
```

#### Get all values in the cache
```javascript
  cache.getAllValues();
```

#### Get a value of a key where like
```javascript
  cache.whereKeyLike('user');
```

#### Get a random key from the cache
```javascript
  cache.randomKey();
```

#### Set the default expiration in minutes
```javascript
  cache.setExpiration(60);
```

#### Set the default namespace of the cache
```javascript
  cache.setNameSpace('newNamespace');
```
