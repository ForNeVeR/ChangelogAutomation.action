param (
    $TestResultDir = "$PSScriptRoot/../test-results",
    $MarkdownResult = "$TestResultDir/section.md",
    $PlainTextResult = "$TestResultDir/section.txt"
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Assert-Equal($expected, $actual, $label) {
    if ($expected.TrimEnd().Replace("`r`n", "`n") -ne $actual.TrimEnd().Replace("`r`n", "`n")) {
        throw "$label not equal to expected. Expected: @'`n$expected`n'@`n`nActual: @'`n$actual`n'@"
    }
}

$expectedMd = @'
### Added

- Markdown-to-Markdown transformation
'@

$expectedTxt = @'
[Added]

- Markdown-to-Markdown transformation
'@

$actualMd = Get-Content -Raw $MarkdownResult
$actualTxt = Get-Content -Raw $PlainTextResult

Assert-Equal $expectedMd $actualMd "Markdown"
Assert-Equal $expectedTxt $actualTxt "Plain text"
