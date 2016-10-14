var plan = require('flightplan');
var appName = "freecodecamp-leaderboard";

plan.target('setup', {
    host: "mysupertestsite.com",
    username: "gregorysmith",
    agent: process.env.SSH_AUTH_SOCK,
    webRoot: "/usr/local/var"
});

plan.target('staging', {
    host: "mysupertestsite.com",
    username: "gregorysmith",
    agent: process.env.SSH_AUTH_SOCK
}, {
    webRoot: "/usr/local/var",
    ownerUser: "gregorysmith",
    group: "admin"
});

plan.target('production', {
    host: "gregoftheweb.com",
    username: "webadmin",
    agent: process.env.SSH_AUTH_SOCK
}, {
    webRoot: "/var/www",
    ownerUser: "webadmin",
    group: "www-data"
});

var versionedDir = `${new Date().getTime()}`;

plan.remote('setup', function(remote) {
        // remote.mkdir('apps');
        remote.mkdir(`${plan.runtime.options.webRoot}/${appName}`);
        remote.mkdir(`~/${appName}`);
});

plan.local(['staging', 'production'], function(local) {
    local.log("Running local flightplan");

    var filesToTransfer = local.exec('find dist', {silent: true})
                    .stdout.split('\n')
                    .map(function(file) {
                        var newName = file.slice(5);
                        return newName;
                    })
                    .filter(function(file) {
                        return file.length > 0 && file !== ".DS_Store";
                    });
    local.log("Moving files");
    local.with(`cd dist`, function() {
        local.transfer(filesToTransfer, `~/${appName}`);
    });
});

plan.remote(['staging', 'production'], function(remote) {
    remote.hostname();
    remote.log("Remoting in...");
    remote.exec(`cp -R ~/${appName} ${plan.runtime.options.webRoot}/${appName}/${versionedDir}`)
    remote.exec(`chown -R ${plan.runtime.options.ownerUser}:${plan.runtime.options.group} ${plan.runtime.options.webRoot}/${appName}/${versionedDir}`);
    remote.with(`cd ${plan.runtime.options.webRoot}/apps`, function() {
        remote.log("Linking")
        local.exec(`rm -r ~/${appName}`);
        remote.exec(`ln -sf ../${appName}/${versionedDir} ${appName}`);
    });
});
