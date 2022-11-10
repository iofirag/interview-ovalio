module.exports = {

	/**
	 * generates a random number between min & max
	 *
	 * @param min
	 * @param max
	 * @returns {number}
	 */
	generateRandomNumber(min = 0, max = 500) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},

	/**
	 * returns a random cell from a provided array
	 *
	 * @param arr
	 * @returns {*}
	 */
	getRandomItem(arr) {
		let idx = Math.floor(Math.random() * arr.length);
		return arr[idx];
	},

	/**
	 * generates a random full name
	 *
	 * @returns {string}
	 */
	generateRandomName() {
		return this.getRandomItem(['Ali', 'Beatriz', 'Charles', 'Diya', 'Eric', 'Fatima', 'Gabriel', 'Hanna'])
			+ ' ' + this.getRandomItem(['Barlowe', 'Caddel', 'Hart', 'Katz', 'Laurier', 'Madden', 'Elrod', 'Whitlock']);
	},

	/**
	 * generates a random alphanumerical string
	 *
	 * @param length
	 * @returns {string}
	 */
	randomString: function (length){
		let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let s = "";
		for (; s.length < length; s += chars.charAt(Math.floor(Math.random() * chars.length))) {
		}
		return s;
	},

	/**
	 * generates a token in a structure of XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX
	 *
	 * @returns {string}
	 */
	generateToken() {
		return Array.from({length: 4}).map(a => this.randomString(8)).join('-');
	},

	/**
	 * validates token structure. returns FALSE for invalid tokens
	 *
	 * @param token
	 * @returns {boolean|boolean}
	 */
	validateToken(token) {
		if (!token) return false;
		let parsed = token.split('-');
		return parsed.length === 4 && parsed.reduce((valid, cell) => {
			return valid && cell.length === 8;
		}, true);
	}

}
