# Ember Plugin for Eslint
(still in development)

[Github](https://github.com/zipscene/eslint-plugin-ember)

## Description:

Set of Ember rules to lint source code that uses the ember framework

## Rules:

Currently there are four rules which rely on the latest release of eslint ^0.16.1

### To get the plugin:

```
	npm install eslint-plugin-ember
```

### To install the plugin:

#### Add this to your .eslintrc file


```
{
    "plugins": [
        "eslint-plugin-ember"
    ]
}
```

### Enforce comments in .extend blocks for properties  (ember-extend-comments)

ember-extend-comments will only look one depth level into the block and will enforce
that properties are given comments above.

Takes in two parameters:
	The status of the rule: 0 - Off, 1 - Warning, 2 - Error
	An array of names of properties that you don't want to require comments

An example would be:

```
	"ember/ember-extend-comments": [2, ["actions", "classnames"]]
```

### Enforce comments in .reopenclass blocks for properties (ember-reopenclass-comments)

ember-reopenclass-comments will only look one depth level into the block and will enforce
that properties are given comments above.

Takes in two parameters:
	The status of the rule: 0 - Off, 1 - Warning, 2 - Error
	An array of names of properties that you don't want to require comments

An example would be:

```
	"ember/ember-reopenclass-comments": [2, ["_class", "localStorage", "rawResponse"]]
```

### Enforce a newline above and below a .extend block (ember-newline-extend)

Takes in one parameter:
	The status of the rule: 0 - Off, 1 - Warning, 2 - Error

An example would be:

```
	"ember/ember-newline-extend": 2
```

### Enforce a newline above and below a .reopenclass block (ember-newline-reopenclass)

Takes in one parameter:
	The status of the rule: 0 - Off, 1 - Warning, 2 - Error

An example would be:

```
	"ember/ember-newline-extend": 2
```
