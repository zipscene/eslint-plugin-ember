/**
* @author Douglas
* @fileoverview Add a space before and below extend assignments
**/

module.exports = function(context) {

	"use strict";

	//---------------------------------------------------------------------
	// Variables
	//---------------------------------------------------------------------

	// stores the number of reopenClass in a block and an object
	// where they are located
	var reopenFound = {
		numberOfReopens: 0,
		locOfReopens: [ {} ]
	};

	// Allows for Properties to be added here so that comments
	// are no longer required
	var globalPropertyList = [];

	if (context.options) {
		globalPropertyList = (context.options[0]);
	}

	//---------------------------------------------------------------------
	// Helpers
	//---------------------------------------------------------------------

	/**
	 *	Checks to see if Block has the reopenClass property and shows where the
	 *	location is
	 *	@param {ASTNode} node
	 *	@return {Object} number of extends found, and where they are located
	 **/

	function reopenClassBlockLocations(node) {
		if (node.callee.property) {
			if (node.callee.property.name === 'reopenClass') {
				reopenFound.locOfReopens[reopenFound.numberOfReopens] = node.loc;
				reopenFound.numberOfReopens++;
			}
		}
	}


	/**
	 *	Checks to see if the property is a member of default ember properties
	 *	if it is then a comment will not be required for it.
	 *	@param {ASTNode} node
	 *	@return {Object} number of extends found, and where they are located
	 **/

	function isEmberProperty(node) {
		var stat;
		stat = false;

		if (globalPropertyList) {
			globalPropertyList.forEach(function (property){
				if (node.key.name === property) {
					stat = true;
				}
			});
		}

		return stat;
	}

	/**
	 * Checks to make sure that there is atleast a space, above the comment
	 * to seperate the comment from anything else that may be on the line
	 * above
	 * @param {ASTnode} - ASTnode is a tree of the code
	 * @param {object} - Code is an array of each line of a document
	 * @return {boolean}
	 **/

	function isSpaceAboveComment(node, code) {
		var currComment = node.leadingComments;

		if (currComment) {
			var startPosOfComment = currComment[currComment.length - 1].loc.start.line;

			if (code[startPosOfComment - 2] !== "") {
					return false;
			}
		}
		return true;
	}


	/**
	 * checks to see if there is a comment directly above a property,
	 * this means that there cannot be any spacing between the comment
	 * and the property
	 * @param {ASTNode} - ASTnode is a tree of the code
	 * @param {object} - Code is an array of each line of a document
	 * @return {boolean}
	 **/

	function isCommentDirectlyAbove(node, code) {
		var currComment = node.leadingComments;
		var currProperty = node.loc;

		if (currComment) {
			if (currProperty.start.line - currComment[currComment.length - 1].loc.end.line !== 1) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Checks to see if an object is empty
	 * @param {object}
	 * @return {boolean}
	 **/

	function isEmpty(obj) {
		return Object.keys(obj).length === 0;
	}

	/**
	 * @param {ASTNode} Current node
	 * @return {void} Stores everything in the variable "scope"
	 **/

	function checkScope(node, reopenLoc) {
		var nodeStartLine, nodeEndLine, reopenStartLine, reopenEndLine;
		nodeStartLine = node.loc.start.line;
		nodeEndLine = node.loc.end.line;
		reopenStartLine = reopenLoc.start.line;
		reopenEndLine = reopenLoc.end.line;

		if ((nodeStartLine > reopenStartLine) && (nodeEndLine < reopenEndLine)) { // inside extend\
			if (node.parent.parent.callee) {
				if (node.parent.parent.callee.property) {
					if (node.parent.parent.callee.property.name === "reopenClass") {
						return true;
					}
				}
			}
			return false;
		}
	}

	/**
	 * Checks if there is an .extend block so we can determine if we need
	 * a new line before or after
	 * @param {ASTNode} The node of a .reopenClass block assignment
	 * @returns{void} undefined
	 **/

	function checkForNewLineAroundBlock(node) {
		var code;
		code = context.getSourceLines();

		if (reopenFound.numberOfReopens > 0) {
			reopenFound.locOfReopens.forEach(function (reopenLoc){
				if (node.type === 'Property') { // May not be needed, waiting until module support to be sure
					// check to make sure property is in range of extend
					if (checkScope(node, reopenLoc)) {
						// if there is no comment
						if (!node.leadingComments) {
							if (!isEmberProperty(node)) {
								context.report(node, "Comments are required above properties");
							}
						}
						// if there is a comment but no space above the comment
						if (!isSpaceAboveComment(node, code)) {
							context.report(node, "A space must be above all comments that are associated with properties");
						}
						if (!isCommentDirectlyAbove(node, code)) {
							context.report(node, "A space is not allowed between the property and the comment");
						}
					}
				}
			});
		}
	}

	//---------------------------------------------------------------------
	// Public
	//---------------------------------------------------------------------

	return {
		"CallExpression": reopenClassBlockLocations, // finds all the extend blocks
		"Property": checkForNewLineAroundBlock // Finds and reports all Errors
	};
};
