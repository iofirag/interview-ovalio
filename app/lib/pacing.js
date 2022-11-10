const redisService = require('./redisService');

const MAX_REQUESTS_PER_USER = 5;
const MAX_REQUESTS_TIME_FRAME_SECONDS = 60

module.exports = {
    async init() {
        await redisService.init()
    },

  /**
   * 	return FALSE if this user exceeded the MAX_REQUESTS_PER_USER in the past 60 seconds
   *
   * @param userToken
   * @returns {Promise<boolean>}
   */
  async validatePacing(userToken) {
    const nowMilis = Date.now()

    // remove all before MAX_REQUESTS_TIME_FRAME_SECONDS
    const removeRes = await redisService.removeFromSortedSet(userToken, '-inf', `${nowMilis-(MAX_REQUESTS_TIME_FRAME_SECONDS*1000)}`)

    // get all by key
    const userValueList = await redisService.getSortedValuesFromSortedSet(userToken, '-inf', `${nowMilis}`)

    // Check user requests less than MAX_REQUESTS_PER_USER 
    if (userValueList.length >= MAX_REQUESTS_PER_USER) return false
    
    // add new unique value
    const addRes = await redisService.addToSortedSet(userToken, `${nowMilis}`, `${nowMilis}`)
    return true;
  },
};
