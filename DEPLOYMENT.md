# Deployment

Due to certain Jekyll extensions used in building the site, which
aren't available using gh-pages we have opted to build gh-pages
using a master branch and travis.

# Travis

If this project is not build in a while Travis will forget about it
and require a refresh, along with GitHub.

The necessary keys used by Travis are in encrypted deploy_key store.
Details on how this is created can be found in this Gist, with section
'Get encrypted credentials' being reproduced below, in case the Gist
goes away:

https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

If the keys needs to be regenerated before sure to update the files,
GitHub and the .travis.yml file as appropriate.

## Get encrypted credentials

The trickiest part of all this is that you want to give Travis the ability to run your deploy script and push changes to gh-pages, without checking in the necessary credentials to your repo. The solution for this is to use Travis's [encrypted file support](https://docs.travis-ci.com/user/encrypting-files/).

_NOTE: an earlier version of this guide recommended generating a GitHub personal access token and encrypting that. Although this is simpler, it is not a good idea in general, since it means any of your repository's collaborators would be able to edit the Travis build script to email them your access token, thus giving them access to all your repositories. The repository-specific deploy key approach is safer._

First, [generate a new SSH key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/). You should _not_ reuse existing SSH keys, and you should _not_ add the SSH key to your GitHub account. Also, you must ensure that you do not include a passphrase (i.e., just press enter when asked for one).

Next, add that deploy key to your repository at `https://github.com/<your name>/<your repo>/settings/keys`.

Now use the Travis client to encrypt the generated deploy key. The result should look something like this:

```
$ travis encrypt-file deploy_key
encrypting deploy_key for domenic/travis-encrypt-file-example
storing result as deploy_key.enc
storing secure env variables for decryption

Please add the following to your build script (before_install stage in your .travis.yml, for instance):

    openssl aes-256-cbc -K $encrypted_0a6446eb3ae3_key -iv $encrypted_0a6446eb3ae3_key -in super_secret.txt.enc -out super_secret.txt -d

Pro Tip: You can add it automatically by running with --add.

Make sure to add deploy_key.enc to the git repository.
Make sure not to add deploy_key to the git repository.
Commit all changes to your .travis.yml.
```

Make note of that encryption label, here `"0a6446eb3ae3"`. This can be public information; it just says which environment variables to use on the Travis server when decrypting this file.

You should follow the instructions and commit `deploy_key.enc` to the repository. You should also add `deploy_key` to your `.gitignore`, or delete it. Ignore the bits about `.travis.yml`, however; we're going to do that part all custom-like.


