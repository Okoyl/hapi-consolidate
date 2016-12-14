"use strict";
const consolidate = require('consolidate');
const resolve = require('path').resolve;

exports.register = (server, options, next) => {
  var internals = {};

  server.decorate('server', 'consolidate', options => {
    internals = options;
  });

/**
 * consolidate template rendering for Hapi.js
 * @param {string} filename - Name of template file to be rendered.
 * @param {object} context - The context for the template.
 */
  const render = function(template, context) {
    context = Object.assign( context || {}, internals.options, {template: template} );
    template = `${resolve(internals.path, template)}.${internals.extension}`;

    consolidate[internals.name](template, context)
      .then(html => {
       return this.response(html);
      }).catch(err => {
        console.error(err);
      }).bind(this);
  };

  server.decorate('reply', 'render', render);

  next();
};

exports.register.attributes = {
  connections: false,
  once: true,
  pkg: require('./package.json')
};
