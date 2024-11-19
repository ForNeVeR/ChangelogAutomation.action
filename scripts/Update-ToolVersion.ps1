param (
    [Parameter(Mandatory = $true)]
    [Version] $Version,

    $RepoRoot = "$PSScriptRoot/..",
    $MainJsFile = "$RepoRoot/main.js"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$architecture = 'x64'
$platforms = @(
    'linux'
    'osx'
    'win'
)

function getHash($platform) {
    $lines = Get-Content $MainJsFile
    $platformFound = $false
    foreach ($line in $lines) {
        if ($platformFound) {
            if (!($line -match "sha256: '(.*?)'")) {
                throw "Cannot find SHA256 hash in line `"$line`"."
            }
            return $Matches[1]
            break
        }
        if ($line.Contains("dotnetOs: '$platform'")) {
            $platformFound = $true
        }
    }

    throw "Cannot find platform `"$platform`" in file `"$MainJsFile`"."
}

function setHash($platform, $hash) {
    $oldHash = getHash $platform
    $content = (Get-Content $MainJsFile -Raw) -Replace $oldHash, $hash
    Set-Content $MainJsFile $content -NoNewline
}

foreach ($platform in $platforms) {
    $url = "https://github.com/ForNeVeR/ChangelogAutomation/releases/download/v$Version/ChangelogAutomation-v$Version.$platform-${architecture}.zip"
    $outPath = New-TemporaryFile
    Invoke-WebRequest $url -OutFile $outPath
    $hash = (Get-FileHash -Algorithm SHA256 $outPath).Hash
    SetHash $platform $hash
}
