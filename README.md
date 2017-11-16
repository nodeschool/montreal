![NodeSchool Montréal Logo](http://nodeschool.io/montreal/i/NodeSchoolMTL.svg)

# NodeSchool Montreal Website

We use [Jekyll](https://jekyllrb.com/) to build [http://nodeschool.io/montreal](http://nodeschool.io/montreal). If you want to run the site or develop it locally you'll have to install [Jekyll](https://github.com/jekyll/jekyll) and [Jekyll-Sitemap](https://github.com/jekyll/jekyll-sitemap).

Aditionally, in order to suport both French and English
content, we need to use gems (Ruby modules) that are not
supported by GitHub's gh-pages Jekyll scripts. For this
reason we run jekyll with the help of [Travis](https://travis-ci.com/).

Notes to Mentors
----------------

If you are adding yourself or removing yourself as a 
mentor, you should create a PR request, first having modified
the following resources, as appropiate:

   - _config.yml
   - i/mentors/

Generating the Site
-------------------

One you have made your changes, you can test them, by
running (tested on macOS and Linux):

`script/cibuild`

`bundle exec jekyll serve`

Note, that the `script/deploy` is intended to be used
by Travis and should not be run locally. When run it
will do all the magic necessary to take the generated
site and push it to the gh-pages branch.

Pull Request
------------

Remember when making your pull request (PR) to do it against
the [gh-pages-src](https://github.com/nodeschool/montreal/tree/gh-pages-src) branch. Doing anything else will most definitely
result in a rejected PR.

Event Information
-----------------

We pull in event information through the [Tito](http://tito.io) embed widget but all the attendees listed are pulled via the [Tito API](http://api.tito.io). In order to update the listing of attendees, you'll have:

- Request our Tito API `auth_token`

- Create a `config.json` in the root with the following: `{ "auth_token": "..." }`

- `npm install`

- `npm update-attendees` or `node ./tasks/update-attendees.js`
