# Setting up Travis CI

Project's `.travis.yml` is set-up to deploy to GitHub pages.

1. Being logged in [GitHub](https://github.com/)
   1. navigate to [tokens](https://github.com/settings/tokens)
   2. click **Generate new token**, confirm your password if required
   3. set **Token description** = `tmdb-web-client-travis`
   4. check `public_repo` under `repo` section
   5. click **Generate token**
   6. copy token to clipboard
2. Being logged in [Travis CI](https://travis-ci.org/)
   1. navigate to your Profile
   2. locate the repo (`tmdb-web-client`) and enable it
   3. click **Settings** for the repo
   4. under **Environment Variables**
      - set **Name** = `GITHUB_TOKEN`
      - set **Value** = token obtained from GitHub
      - click **Add**

Now when you push to `master` Travis will queue your project
and build it as soon as it can. You can follow the execution
on your [home page](https://travis-ci.org/).

`gh-pages` branch will contain the output from `npm run build`.
Of course provided `npm test` went smoothly.
