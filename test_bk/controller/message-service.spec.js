process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const response = require('../response/message')
