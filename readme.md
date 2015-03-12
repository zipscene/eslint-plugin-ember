# Ember Rules

## Usage:

### Configuration

Comment rules can be configured to allow specific properties to not require comments above
such as :
	"ember/ember-extend-comments": [2, [ "actions", "classNames"] ]

### Add this to your .eslintrc
```
{
	"plugins": [
		"eslint-plugin-ember"
	]
}

```

### Then to configure the rules use:
```
{
	"rules": {
		"ember/ember-newline-extend": 2,
		"ember/ember-newline-reopenclass": 2,
		"ember/ember-extend-comments": [2, [ "actions", "classNames"]],
		"ember/ember-reopenclass-comments": [2, [ "_class, "localStorage", "rawResponse" ]
	}
}

