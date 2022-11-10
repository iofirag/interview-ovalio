const redis = require('redis');

module.exports = {
    async init() {
        this.client = redis.createClient();
        this.client.on('error', (err) => console.log('Redis Client Error', err));
        await this.client.connect()
    },

    async addToSortedSet(key, score, value) {
        return await this.runAnyCommand('ZADD', key, score, value)
    },

    async removeFromSortedSet(key, min, max) {
        return await this.runAnyCommand('ZREMRANGEBYSCORE', key, min, max)
    },

    async getSortedValuesFromSortedSet(key, min, max) {
        return await this.runAnyCommand('ZRANGEBYSCORE', key, min, max)
    },

    async runAnyCommand(...rest) {
        return await this.client.sendCommand(rest)
    },

    async disconnect() {
        await this.client.disconnect();
    },
}