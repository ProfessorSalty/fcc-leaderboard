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

plan.target('deployment', {
    host: "www.shadesofmarkup.com",
    username: "admin",
    agent: process.env.SSH_AUTH_SOCK
}, {
    webRoot: "/usr/local/var",
    ownerUser: "admin",
    group: "admin"
});

var versionedDir = `${new Date().getTime()}`;

plan.remote('setup', function(remote) {
        // remote.mkdir('apps');
        remote.mkdir(`/usr/local/var/${appName}`);
        remote.mkdir(`~/${appName}`);
});

plan.local(['staging', 'deployment'], function(local) {
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

plan.remote(['staging', 'deployment'], function(remote) {
    remote.hostname();
    remote.log("Remoting in...");
    remote.exec(`cp -R ~/${appName} ${plan.runtime.options.webRoot}/${appName}/${versionedDir}`)
    remote.exec(`chown -R ${plan.runtime.options.ownerUser}:${plan.runtime.options.group} ${plan.runtime.options.webRoot}/${appName}/${versionedDir}`);
    remote.with(`cd ${plan.runtime.options.webRoot}/apps`, function() {
        remote.log("Linking")
        remote.exec(`ln -sf ../${appName}/${versionedDir} ${appName}`);
    });
});
