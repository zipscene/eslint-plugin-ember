/**
* @author Douglas
* @fileoverview Add a space before and below extend assignments
*/

module.exports = function(context) {

	"use strict";

	//---------------------------------------------------------------------
	// Helpers
	//---------------------------------------------------------------------

	/**
	 *	Checks to see if Block has the extend property
	 *	@param {ASTNode} node
	 *	@return {boolean} true if block has extend
	 **/

	function isExtendBlock(node) {
		var calleeType, propertyName;

		if (!(node.callee.property)) { return false; }
		// if property is undefined, exit seems to be
		// an issue created by module support

		calleeType = node.callee.type;
		propertyName = node.callee.property.name;

		if (calleeType === "MemberExpression" && propertyName === "extend") {

				return true;
		}

		return false;
	}

	/**
	 *	Determines if there is a space directly before a extend block
	 *	@param {object} code : array of each line of the code
	 *	@param {integer} linenumber of where the block begins
	 *	@returns {boolean} whether there was a space beforev
	 **/

	function isNewLineBefore(code, lineNumber) {

		// block "starts" the line after the first "{"
		if (code[lineNumber - 2] !== "" ) { return false; }

		return true;
	}

	/**
	 *	Determines if there is a space directly after a extend block
	 *	@param {object} code : array of each line of the code
	 *	@param {integer} linenumber of where the block begins
	 *	@returns {boolean} whether there was a space beforev
	 **/

	function isNewLineAfter(code, lineNumber) {

		if (code[lineNumber] !== "") { return false; }

		return true;
	}

	/**
	 * Checks if there is an .extend block so we can determine if we need
	 * a new line before or after
	 * @param {ASTNode} The node of a .extend block assignment
	 * @returns{void} undefined
	 **/

	function checkForNewLineAroundBlock(node) {
		var code, startLineNumber, endLineNumber;
		code = context.getSourceLines();

		if (isExtendBlock(node)) {
			startLineNumber = node.loc.start.line;
			endLineNumber = node.loc.end.line;

			if (!isNewLineBefore(code, startLineNumber) && !isNewLineAfter(code, endLineNumber)) {

				context.report(node, "New Line is required above and below Extend block.");
			} else if (!isNewLineBefore(code, startLineNumber)) {

				context.report(node, "New line is required above the Extend block.");
			} else if (!isNewLineAfter(code, endLineNumber)) {

				context.report(node, node.loc.end, "New line is required below the Extend block.");
			}
		}

	}


	//---------------------------------------------------------------------
	// Public
	//---------------------------------------------------------------------

	return {
		"CallExpression": checkForNewLineAroundBlock
	};
};
