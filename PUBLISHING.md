# Publishing

Check if you're logged in

```bash
npm whoami
```

If this errors out, log in using

```bash
npm login
```

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
