import AsyncStorage from "@react-native-community/async-storage";

interface KeyValuePair {
	[key: string]: any;
}

/**
 * A minimalistic wrapper around React Native's AsyncStorage.
 */
const deviceStorage = {
	/**
	 * Get a one or more value for a key or array of keys from AsyncStorage
	 * @param key A key or array of keys
	 * @return A promise that resolves with the value(s) associated with the key(s)
	 */
	get(key: string | string[]): Promise<any> {
		if (!Array.isArray(key)) {
			return AsyncStorage.getItem(key).then((value) => {
				return JSON.parse(value || "null");
			});
		} else {
			return AsyncStorage.multiGet(key).then((values) => {
				return values.map((value) => {
					return JSON.parse(value[1] || "null");
				});
			});
		}
	},

	/**
	 * Save a key value pair or a series of key value pairs to AsyncStorage.
	 * @param key The key or an array of key/value pairs
	 * @param value The value to save
	 * @return A promise that resolves when the value(s) has been saved
	 */
	save(key: string | KeyValuePair[], value?: any): Promise<void> {
		if (!Array.isArray(key)) {
			return AsyncStorage.setItem(key, JSON.stringify(value));
		} else {
			var pairs = key.map(function (pair) {
				return [pair[0], JSON.stringify(pair[1])];
			});
			return AsyncStorage.multiSet(pairs);
		}
	},

	/**
	 * Updates the value in the store for a given key in AsyncStorage. If the value is a string it will be replaced. If the value is an object it will be deep merged.
	 * @param key The key
	 * @param value The value to update with
	 * @return A promise that resolves when the value has been updated
	 */
	update(key: string, value: any): Promise<void> {
		return deviceStorage.get(key).then((item) => {
			value = typeof value === "string" ? value : { ...item, ...value };
			return AsyncStorage.setItem(key, JSON.stringify(value));
		});
	},

	/**
	 * Delete the value for a given key in AsyncStorage.
	 * @param key The key or an array of keys to be deleted
	 * @return A promise that resolves when the key(s) has been deleted
	 */
	delete(key: string | string[]): Promise<void> {
		if (Array.isArray(key)) {
			return AsyncStorage.multiRemove(key);
		} else {
			return AsyncStorage.removeItem(key);
		}
	},

	/**
	 * Get all keys in AsyncStorage.
	 * @return A promise that resolves with the keys in AsyncStorage
	 */
	keys(): Promise<string[]> {
		return AsyncStorage.getAllKeys();
	},

	/**
	 * Push a value onto an array stored in AsyncStorage by key or create a new array in AsyncStorage for a key if it's not yet defined.
	 * @param key The key
	 * @param value The value to push onto the array
	 * @return A promise that resolves when the value has been pushed
	 */
	push(key: string, value: any): Promise<void> {
		return deviceStorage.get(key).then((currentValue) => {
			if (currentValue === null) {
				return deviceStorage.save(key, [value]);
			}
			if (Array.isArray(currentValue)) {
				return deviceStorage.save(key, [...currentValue, value]);
			}
			throw new Error(
				`Existing value for key "${key}" must be of type null or Array, received ${typeof currentValue}.`
			);
		});
	},
};

export default deviceStorage;
