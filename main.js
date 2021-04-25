const core = require('@actions/core');
const crypto = require('crypto');
const exec = require('@actions/exec');
const fs = require('fs');
const path = require('path');
const toolCache = require('@actions/tool-cache');

const version = '1.0.0';
const architecture = 'x64';
const packageData = {
    darwin: {
        dotnetOs: 'osx',
        sha256: '30B8AE8551DA3DA43CACBD9227575C8AA6706EB3C7276335C4104EF8FE53DC4C',
        executableFileName: 'ChangelogAutomation'
    },
    linux: {
        dotnetOs: 'linux',
        sha256: 'D49DDC050E4B9BE46A94454270BA1D28853C244AA5D54C04758E78EBEF6F35E4',
        executableFileName: 'ChangelogAutomation'
    },
    'win32': {
        dotnetOs: 'win',
        sha256: '610D411FB5422DBA4579E96BF7C970981AFAEA17DCEDCAE4DC7C636B38A25CCD',
        executableFileName: 'ChangelogAutomation.exe'
    }
};
const packageInfo = packageData[process.platform];
if (!packageInfo) throw `Couldn't determine package info for platform ${process.platform}`;

const url = `https://github.com/ForNeVeR/ChangelogAutomation/releases/download/v${version}/ChangelogAutomation-v${version}.${packageInfo.dotnetOs}-${architecture}.zip`;

async function run() {
    try {
        core.info(`Downloading tool from ${url}`);
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
