/* *
 * @author Douglas
 * @fileoverview exports ember plugins for eslint
 * */

(function (){

	'use strict';

	module.exports = {
		rules: { // export rules
			'ember-extend-comments': require('./rules/ember-extend-comments.js'),
			'ember-reopenclass-comments': require('./rules/ember-reopenclass-comments.js'),
			'ember-newline-extend': require('./rules/ember-newline-extend.js'),
			'ember-newline-reopenclass': require('./rules/ember-newline-reopenclass.js')
		},
		rulesConfig: { // Default config
			'ember-extend-comments': 2,
			'ember-reopenclass-comments': 2,
			'ember-newline-extend': 2,
			'ember-newline-reopenclass': 2
		}
	};

})();
