const util = require('util');
const redis = require('redis');

const client = redis.createClient({
    url: `${process.env.REDIS_URL || 'redis://default:redispw@0.0.0.0:49153'}`
});

client.on('connect', () => {
    console.log('Redis Connected!');
});

client.on('error', (error) => {
    console.error('Redis Error: ', error);
});

const setClient = util.promisify(client.set).bind(client);
const getClient = util.promisify(client.get).bind(client);
const existsClient = util.promisify(client.exists).bind(client);

const Set = async (key, value, expireTime) => {
    await setClient(key, JSON.stringify(value), 'EX', expireTime);
};

const Get = async (key) => {
    let data = await getClient(key);
    return JSON.parse(data);
};

const Exists = async (key) => {
    let isExists = await existsClient(key);
    return isExists === 1;
};

module.exports = {Set, Get, Exists};
