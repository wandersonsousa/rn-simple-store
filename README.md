# RN Simple Store

A minimalistic wrapper around React Native's AsyncStorage.

_The `rn-simple-store` is a good match for apps that are **not using redux**. If you have already found that your app needs to use redux and you need to persist data to the device it is recommended that you make use of [redux-persist](https://github.com/rt2zz/redux-persist) which provides a clean interface for storing data in your reducers to device._

## Installation

```bash
npm install rn-simple-store
```

## Use In Project

```
import store from 'rn-simple-store';
```

## [API Reference](docs/index.md)

<br />

## Example Usage

---

- [Basic Object Handling](#working-with-objects)
- [Basic Array Handling](#working-with-arrays)
- [Chaining Methods/Error Handling](#chaining)
- [Deleting](#deleting-data)

### Working With Objects

---

RN-simple-store allows you to easily store data by assigning it a unique key. We will show you a few examples of just how easy it is to get started.

#### Saving and Retrieval

#### Updating

```js
// Update the object stored under the key 'album'. We will add a new property of 'albumName' to this object.
store.update('album', {
  albumName: 'Blurry Face'
})

// Get updated object
store.get('album')
.then((res) =>
  console.log(res.albumName) // 'Blurry Face'
)

// Our object stored under the key 'album' now looks like this
{
artist: 'Twenty One Pilots',
  albumName: 'Blurry Face'
}
```

<a name="arrays"></a>

### Working With Arrays

---

Arrays are easy to work with using rn-simple-store's built-in "push" method. You can use the "push" method to create an array, or add data to the array. Behind the scene's rn-simple-store will check if an array exists under the key you specified, if it does, it will add the new specified data to the existing array. If it does not exist, it will create the array for you.

#### Array Creation

```js
// Save an array to the users device. We will give it the key 'shoppingList' for easy retrieval
store.push("shoppingList", "milk");

// ['milk'] is created and stored on the users device
```

#### Retrieval and Updating

```js
// Get the array from the users device
store.get("shoppingList").then(
	(res) => console.log(res) // ['milk']
);

// Add data to 'shoppingList'
store.push("shoppingList", "coffee");

// Retrieve new array
store.get("shoppingList").then(
	(res) => console.log(res) // ['milk', 'coffee']
);
```

#### More "Advanced" Example

Instead of storing strings in an array like the above example, let's store objects. We will create a new array to store on the user's device named 'artists'.

```js
const femaleArtist = {
	name: "Lady Gaga",
	age: 31,
	gender: "female",
};

const maleArtist = {
	name: "The Weeknd",
	age: 27,
	gender: "male",
};

// Creates a new array, and inserts this object into it.
store.push("artists", femaleArtist);
// Adds this new object to the end of the array.
store.push("artists", maleArtist);

// Our new array will look like this when we retrieve it
// [{
//   name: "Lady Gaga",
//   age: 31,
//   gender: "female"
// },
// {
//   name: "The Weeknd",
//   age: 27,
//   gender: "male"
// }];
```

### Chaining

---

You can chain these methods as much as you'd like, as well as catch errors. Here is a lengthy example for you to reference.

```js
store
	.save("coffee", {
		isAwesome: true,
	})
	.then(() => store.get("coffee"))
	.then((coffee) => {
		console.assert(coffee.isAwesome === true);
	})
	.then(() =>
		store.update("coffee", {
			isNotEssential: false,
		})
	)
	.then(() => store.get("coffee"))
	.then((coffee) => {
		console.assert(coffee.isNotEssential === false);
		console.assert(coffee.isAwesome === true);
		return store.delete("coffee");
	})
	.then(() => store.get("coffee"))
	.then((coffee) => {
		console.assert(coffee === null);
	})
	.catch((error) => {
		console.error(error.message);
	});

// using the .push method for storing arrays
store
	.save("coffeeTraits", ["rich"])
	.then(store.push("coffeeTraits", "smooth"))
	.then(store.get("coffeeTraits"))
	.then(console.log); // ['rich', 'smooth']
```

### Deleting Data

---

Deleting the data on the user's device is just as easy. Just insert the key of the data you want to remove as the argument to the "delete" method, and you are done!

```js
store.delete("album"); // Bye bye
```

## License

MIT
