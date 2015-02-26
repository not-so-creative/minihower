# Minihower
A single context eisenhower decision graph using
[LocalForage](http://mozilla.github.io/localforage) and
[Backbone](http://backbonejs.org)

This was developed as a small concept for the direction that
[not-so-creative/eisenhower](https://github.com/not-so-creative/eisenhower)
could take if integrating iconography and categorization beyond that of a
"topic" (context).

## Development
Make sure you have both **grunt-cli** and **bower** installed.

  npm install -g grunt-cli bower

Once you have a copy of this repository a simple `npm install` will grab all
the dependencies for development, and it will run `bower install` for you.

### Launch Development Server
Minihower uses [grunt-contrib-connect](https://github.com/grunt/grunt-contrib-connect)
to provide a simple http server that serves the `/public` directory of the
project.

  grunt serve

This will also launch a watch task + livereload server, meaning all file changes
you make while the server is running get built and loaded into the browser
automagically.

### Testing
The only testing that exists for this project is a simple
[jshint](http://jshint.com). If you want more tests feel free to send a
pull request.

Testing is run as a part of the development server, and build tasks, however if
you wish to run just the tests use `grunt test`.

### Build
For a more production ready build, with minified styles and scripts, you can use
`grunt build`.

### Play Nice
Where possible use an [EditorConfig](http://editorconfig.org/) compatible editor/plugin.

* Remove trailing whitespace from files.
* Use ASCII filenames.
* Run `grunt test` before commit and check for errors.

**Do this all with ease!**

	mv .git/hooks/pre-commit.sample .git/hooks/pre-commit
	echo "\n# run grunt test before commit, abort if errors\ngrunt test" >> .git/hooks/pre-commit

## License
**Unless otherwise stated**

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain
one at http://mozilla.org/MPL/2.0/.
