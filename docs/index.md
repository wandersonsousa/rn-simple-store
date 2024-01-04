# Global





* * *

### get(key) 

Get a one or more value for a key or array of keys from AsyncStorage

**Parameters**

**key**: `String | Array`, A key or array of keys

**Returns**: `Promise`


### save(key, value) 

Save a key value pair or a series of key value pairs to AsyncStorage.

**Parameters**

**key**: `String | Array`, The key or an array of key/value pairs

**value**: `Any`, The value to save

**Returns**: `Promise`


### update(key, value) 

Updates the value in the store for a given key in AsyncStorage. If the value is a string it will be replaced. If the value is an object it will be deep merged.

**Parameters**

**key**: `String`, The key

**value**: `Value`, The value to update with

**Returns**: `Promise`


### delete(key) 

Delete the value for a given key in AsyncStorage.

**Parameters**

**key**: `String | Array`, The key or an array of keys to be deleted

**Returns**: `Promise`


### keys() 

Get all keys in AsyncStorage.

**Returns**: `Promise`, A promise which when it resolves gets passed the saved keys in AsyncStorage.


### push(key, value) 

Push a value onto an array stored in AsyncStorage by key or create a new array in AsyncStorage for a key if it's not yet defined.

**Parameters**

**key**: `String`, They key

**value**: `Any`, The value to push onto the array

**Returns**: `Promise`



* * *





**License:** MIT 

**Overview:** A minimalistic wrapper around React Native's AsyncStorage.


