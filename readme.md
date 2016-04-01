# Ember Plugin for Eslint

Set of Ember rules to lint source code that uses the ember framework

## Installation:

```
npm install eslint-plugin-ember --save-dev
```

Add this to your .eslintrc file

```
{
  "plugins": ["eslint-plugin-ember"]
}
```

## Rules:

Currently there are four rules which rely on eslint ^0.16.1

##### ember-extend-comments

Enforce comments in .extend blocks for properties. `ember-extend-comments` will only look one depth level into the block and will enforce that properties are given comments above.

Parameters:

- The status of the rule: 0 - Off, 1 - Warning, 2 - Error
- An array of names of properties that you don't want to require comments

```
"ember/ember-extend-comments": [2, ["actions", "classnames"]]
```

##### ember-reopenclass-comments

Enforce comments in .reopenclass blocks for properties. `ember-reopenclass-comments` will only look one depth level into the block and will enforce that properties are given comments above.

Parameters:

- The status of the rule: 0 - Off, 1 - Warning, 2 - Error
- An array of names of properties that you don't want to require comments

```
"ember/ember-reopenclass-comments": [2, ["_class", "localStorage", "rawResponse"]]
```

##### ember-newline-extend

Enforce a newline above and below a `.extend` block

Parameters:

- The status of the rule: 0 - Off, 1 - Warning, 2 - Error

```
"ember/ember-newline-extend": 2
```

##### ember-newline-reopenclass

Enforce a newline above and below a `.reopenclass` block

Parameters:

- The status of the rule: 0 - Off, 1 - Warning, 2 - Error

```
"ember/ember-newline-extend": 2
```
