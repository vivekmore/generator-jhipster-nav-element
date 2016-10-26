'use strict';
var path = require('path'),
  util = require('util'),
  yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  fs = require('fs'),
  shelljs = require('shelljs'),
  semver = require('semver'),
  os = require('os'),
  pluralize = require('pluralize');

module.exports = DefaultGenerator;

function DefaultGenerator() {
  yeoman.Base.apply(this, arguments);
}

util.inherits(DefaultGenerator, yeoman.Base);

/**
 * Ask questions required to build the default template
 *
 * @param {object} generator - generator instance to use
 */
DefaultGenerator.prototype.defaultTemplateQuestions = function (generator) {

  var done = generator.async();
  var prompts = [
    {
      type: 'input',
      name: 'navElementKey',
      message: 'What would you like the nav element id to be? (e.g. aboutUs, about-us)',
      // validate: function (input) {
      //   if (/^([a-zA-Z0-9_]*)$/.test(input)) {
      //     return true;
      //   } else {
      //     return 'Your nav element id cannot contain special characters or a blank space';
      //   }
      // },
      default: 'about-us'
    },
    {
      type: 'list',
      name: 'createDirective',
      message: 'Would you like me to create a sample directive for your nav element?',
      choices: [
        {value: true, name: 'Yes'},
        {value: false, name: 'No'}
      ],
      default: true
    }
  ];

  generator.prompt(prompts)
    .then(function (props) {
      generator.props.navElementKey = props.navElementKey;
      generator.props.createDirective = props.createDirective;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));

};
