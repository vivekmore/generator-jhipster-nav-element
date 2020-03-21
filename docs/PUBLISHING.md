# Publishing

1. Create the upgrade branch
    ```bash
    git checkout -b upgrade
    ```

2. Make your changes to upgrade any dependencies along with **generator-jhipster**

3. Check if you're logged in
    ```bash
    npm whoami
    ```

4. If this errors out with errors like below
    ```bash
    $ npm whoami
    npm ERR! code ENEEDAUTH
    npm ERR! need auth This command requires you to be logged in.
    npm ERR! need auth You need to authorize this machine using `npm adduser`
    
    npm ERR! A complete log of this run can be found in:
    npm ERR!     C:\Users\user1\AppData\Roaming\npm-cache\_logs\2019-06-23T23_08_22_196Z-debug.log
    ```

5. Then login using
    ```bash
    $ npm adduser
    
    OR
    
    $ npm login
    ```

6. Update the version (patch/minor/major) `only works in Git Bash at the moment`
    
    *e.g. for updating the patch version*

    **Make sure there are no local changes (stash them if any)**
    ```bash
    npm run bump-patch
    npm publish [--otp otpcode]
    npm logout
    ```

7. Merge the upgrade branch to develop
    ```bash
    git co develop
    git merge upgrade --no-ff
    git push origin develop
    ```

8. Merge the tag to master (e.g. to merge a newly created v1.0.0 tag to master)
    ```bash
    git co master
    git merge v1.0.0
    git push origin master
    ```

# Troubleshooting
See [this page](https://docs.npmjs.com/getting-started/working_with_tokens#how-to-create-a-new-full-permission-token) for token generation
    ```bash
    npm token create
    ```
