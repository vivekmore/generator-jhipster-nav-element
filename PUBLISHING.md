# Publishing

Check if you're logged in
```bash
npm whoami
```

If this errors out with errors like below
```bash
$ npm whoami
npm ERR! code ENEEDAUTH
npm ERR! need auth This command requires you to be logged in.
npm ERR! need auth You need to authorize this machine using `npm adduser`

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\user1\AppData\Roaming\npm-cache\_logs\2019-06-23T23_08_22_196Z-debug.log
```

then login using
```bash
$ npm adduser

OR

$ npm login
```

Update the version (patch/minor/major) 
*e.g. for updating the patch version*

**Make sure there are no local changes (stash them if any)**
```bash
npm run bump-patch
npm publish [--otp otpcode]
npm logout
```

# Troubleshooting
See [this page](https://docs.npmjs.com/getting-started/working_with_tokens#how-to-create-a-new-full-permission-token) for token generation
```bash
npm token create
```
