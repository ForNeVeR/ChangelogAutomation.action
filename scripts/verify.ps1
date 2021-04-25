param (
    $TestResultDir = "$PSScriptRoot/../test-results",
    $MarkdownResult = "$TestResultDir/section.md",
    $PlainTextResult = "$TestResultDir/section.txt"
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function assertEqual($expected, $actual, $label) {
    if ($expected.Replace("`r`n", "`n") -ne $actual.Replace("`r`n", "`n")) {
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

assertEqual($expectedMd, $actualMd, "Markdown")
assertEqual($expectedTxt, $actualTxt, "Plain text")
