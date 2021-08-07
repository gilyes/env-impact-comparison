param (
    [Parameter(Mandatory)]
    [string]$version
)

7z a -tzip releases\$version\env-impact-comparison.zip ..\env-impact-comparison '-xr!node_modules' '-xr!.git' '-xr!releases'
