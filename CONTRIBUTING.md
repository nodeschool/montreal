# Contributing to NodeSchool Montreal

## Development

We use [Jekyll](https://jekyllrb.com/) to build [http://nodeschool.io/montreal](http://nodeschool.io/montreal). If you want to run the site or develop it locally you'll have to install the gems in our Gemfile.

Two possible approaches, which will depend on your 
environment:

```sh
bundle install --path=.gems
bundle exec jekyll build
```

or 

```sh
gem install bundler
bundle
```

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
