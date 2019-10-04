# Contributing to NodeSchool Montreal

## Don't Modify gh-pages Branch

First off, don't directly modify the gh-pages branch, as this is auto generated based on changes in the master branch.

What you should do is follow the instructions here on using Jekyll. This is important, due to the use of a number of extensions not supported the Jekyll environment used by gh-pages.

## Development

We use [Jekyll](https://jekyllrb.com/) to build [http://nodeschool.io/montreal](http://nodeschool.io/montreal). If you want to run the site or develop it locally you'll have to install the gems in our Gemfile:

```sh
bundle install --path=.gems
bundle exec jekyll build
```

Note, this is the same set of commands used by Travis.

### Generating the Site

A local development server can be started by running:

```sh
bundle exec jekyll serve
```

### Generating the Attendees List

We pull in event information through the [Tito](http://tito.io) embed widget but all the attendees listed are pulled via the [Tito API](http://api.tito.io). In order to update the listing of attendees, you'll have:

- Request our Tito API "auth_token" (ping @matchai)

- Create a `config.json` in the root with the following: `{ "auth_token": "..." }`

- `npm install`

- `npm run update-attendees` or `node ./tasks/update-attendees.js`
