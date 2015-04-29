/**
@module ember
@submodule ember-htmlbars
*/

import Ember from 'ember-metal/core'; // Ember.assert
import o_create from "ember-metal/platform/create";
import { registerKeyword } from "ember-htmlbars/keywords";

/**
 @private
 @property helpers
*/
var helpers = o_create(null);

/**
@module ember
@submodule ember-htmlbars
*/

/**
  @private
  @method _registerHelper
  @for Ember.HTMLBars
  @param {String} name
  @param {Object|Function} helperFunc the helper function to add
*/
export function registerHelper(name, helperFunc) {
  if (helperFunc.isLegacyViewHelper) {
    registerKeyword(name, function(morph, env, scope, params, hash, template, inverse, visitor) {
      Ember.assert("You can only pass attributes (such as name=value) not bare " +
             "values to a helper for a View found in '" + helperFunc.viewClass + "'", params.length === 0);

      env.hooks.keyword('view', morph, env, scope, [helperFunc.viewClass], hash, template, inverse, visitor);
      return true;
    });
    return;
  }

  helpers[name] = helperFunc;
}

export default helpers;
