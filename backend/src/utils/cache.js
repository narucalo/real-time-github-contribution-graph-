const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient();

// Promisify Redis client methods for easier async/await usage
const { promisify } = require('util');
const getAsync = promisify(redisClient.get).bind(redisClient);
const setexAsync = promisify(redisClient.setex).bind(redisClient);

// Function to get data from the cache
const getFromCache = async (key) => {
    try {
        const data = await getAsync(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error fetching from cache:', error.message);
        return null;
    }
};

// Function to set data in the cache with an expiration time
const setInCache = async (key, value, ttl) => {
    try {
        await setexAsync(key, ttl, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting cache:', error.message);
    }
};

// Function to clear the cache
const clearCache = async (key) => {
    try {
        await redisClient.del(key);
    } catch (error) {
        console.error('Error clearing cache:', error.message);
    }
};

module.exports = {
    getFromCache,
    setInCache,
    clearCache,
};
