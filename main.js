const core = require('@actions/core');
const crypto = require('crypto');
const exec = require('@actions/exec');
const fs = require('fs');
const path = require('path');
const toolCache = require('@actions/tool-cache');

const version = '2.0.0';
const architecture = 'x64';
const packageData = {
    darwin: {
        dotnetOs: 'osx',
        sha256: 'BC243D26B9D9E03CDC942C282AB7E1AE8CF283E36030484A77F5579FC3A18A66',
        executableFileName: 'ChangelogAutomation'
    },
    linux: {
        dotnetOs: 'linux',
        sha256: 'F1AEA03C1AD250489C0DFD44722E5C841325D0DA0904BF95B3C6CCE3F7AA1EAE',
        executableFileName: 'ChangelogAutomation'
    },
    win32: {
        dotnetOs: 'win',
        sha256: 'ADF167FBEB9ABAF52D30E1516B5231CCA91A4DFBBBD8E524525700E4F0899C88',
        executableFileName: 'ChangelogAutomation.exe'
    }
};
const packageInfo = packageData[process.platform];
if (!packageInfo) throw `Couldn't determine package info for platform ${process.platform}`;

const url = `https://github.com/ForNeVeR/ChangelogAutomation/releases/download/v${version}/ChangelogAutomation-v${version}.${packageInfo.dotnetOs}-${architecture}.zip`;

async function run() {
    try {
        core.info(`Downloading ChangelogAutomation v${version} for ${process.platform} (${architecture}) from ${url}`);
        const archivePath = await toolCache.downloadTool(url);
        core.info(`Verifying the hash of the tool downloaded to ${archivePath}`);
        await verifyHash(packageInfo.sha256, archivePath);
        core.info(`Extracting the tool archive from ${archivePath}`);
        const extractedToolDirectoryPath = await toolCache.extractZip(archivePath);
        core.info(`Extracted tool location: ${extractedToolDirectoryPath}`);

        const executablePath = path.join(extractedToolDirectoryPath, packageInfo.executableFileName);
        core.info(`Extracted tool file path: ${executablePath}`);

        await exec.exec(executablePath, [
            core.getInput('input'),
            '--outputFilePath',
            core.getInput('output'),
            '--contentType',
            core.getInput('format')
        ]);
    } catch (e) {
        core.setFailed(`Action failed with error ${e}`);
    }
}

async function verifyHash(expectedSha256, path) {
    const fileData = await readFileAsync(path);
    const actualSha256 = crypto.createHash('sha256').update(fileData).digest('hex');
    if (expectedSha256.localeCompare(actualSha256, undefined, { sensitivity: 'base' }) !== 0) {
        throw `Hash of file ${path} expected to be ${expectedSha256}, but was ${actualSha256}`;
    }
}

function readFileAsync(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err != null) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

run();
