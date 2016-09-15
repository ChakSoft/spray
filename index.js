/**
 * Spray API Client Utility for Node.JS v6+
 * 
 * Licensed under GPLv3.0
 */

const API_VERSION = '2.0.0';
const Promise = require('bluebird');
const SprayLib = require('./lib');

class SprayClient {
    constructor(options) {
        this.options = options || {};
        if(!this.options.apiKey) {
            throw "SecurityError: You must specify an API key to use this API !";
        }
        this.options.apiVersion = this.options.apiVersion || API_VERSION;
        this.options.promised = (this.options.promised === undefined ? true : this.options.promised);
    }

    login(callback) {
        let request = new SprayLib.SprayRequest('post', 'user/login', {
            'Application-Key': this.options.apiKey,
            'API-Version': this.options.apiVersion
        });
        return request.run().then(data => {
            if (!this.options.promised) {
                callback(null, data);
            }
            return data;
        }).catch(err => {
            if (!this.options.promised) {
                callback(err);
            }
            throw err;
        });
    }

    info(token, callback) {
        let request = new SprayLib.SprayRequest('get', 'user/get', {
            'Application-Key': this.options.apiKey,
            'API-Version': this.options.apiVersion,
            'Authentication-Token': token
        });
        return request.run().then(data => {
            if (!this.options.promised) {
                callback(null, data);
            }
            return data;
        }).catch(err => {
            if (!this.options.promised) {
                callback(err);
            }
            throw err;
        });
    }
}

module.exports = SprayClient;