'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL ||
                      'mongodb://localhost/sell-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                      'mongodb://localhost/test-sell-app';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'abc';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.ITEMS_URL = '/items';
exports.USERS_URL = '/users';