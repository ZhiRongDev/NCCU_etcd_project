# http://127.0.0.1:30001/hdSimu/ASI/index.html?perf=2
# retrieve ip address of url from mapping table
$outcome = (Import-Csv -Path .\outcome.csv)
$url = $outcome.priIP | ForEach-Object -Process {'http://'+$_+':30001/hdSimu/'}
$reg1 = "USA/"
$reg2 = "EUR/"
$reg3 = "ASI/"
$reg = $reg1, $reg2, $reg3
$srv1 = "index.html"
$srv2 = "app"
$srv3 = "fileupload"
$srv = $srv1, $srv2, $srv3
$pf1 = "?perf=0"
$pf2 = "?perf=1"
$pf3 = "?perf=2"
$pf = $pf1, $pf2, $pf3
<#
$random_curl = {
	Start-Sleep (4..8 | Get-Random)
	$u = $url | Get-Random
	$r = $reg | Get-Random
	$s = $srv | Get-Random
	$p = $pf | Get-Random
	Invoke-RestMethod $u$r$s$p
}
#>
function random_curl {
	Start-Sleep (2..4 | Get-Random)
	$u = $args[0] | Get-Random
	$r = $args[1] | Get-Random
	$s = $args[2] | Get-Random
	$p = $args[3] | Get-Random
	Invoke-RestMethod $u$r$s$p
}

function pick_curl {
	Start-Sleep (1..3 | Get-Random)
	$u = 'http://'+$outcome[$outcome.host.IndexOf($args[0])].priIP+':30001/hdSimu/'
	$r = $args[1] | Get-Random
	switch($outcome.host.IndexOf($h)){
		0 {$s="app","fileupload"|Get-Random;$p="?perf=1"} # NSD.com
		1 {$s="app","index.html"|Get-Random;$p="?perf=1","?perf=0"|Get-Random} # BDS.com
		2 {$s="app";$p="?perf=0","?perf=2"|Get-Random} # CLIP.com
		3 {$s="index.html","app"|Get-Random;$p="?perf=0"} # NCCUCS.com
		4 {$s="index.html","fileupload"|Get-Random;$p="?perf=0"} # NCCU.com
		5 {$s="fileupload","app"|Get-Random;$p="?perf=2"} # BTSLIN.com
		6 {$s=$srv|Get-Random;$p=$pf|Get-Random} # unionlab.com
	}
	Invoke-RestMethod $u$r$s$p
}

<#
for($i=0;$i-lt10;$i++){
	# totally GET method in simplify
	# random_curl $url_a $reg $srv $pf;
	# random_curl $url_b $reg $srv $pf;
	random_curl $url $reg $srv $pf;
	}
#>
for($i=0;$i-lt5;$i++){
	$OuterLoopProgressParameters = @{
        Activity         = 'Updating'
        Status           = 'Progress->'
        PercentComplete  = $I * 10
        CurrentOperation = 'OuterLoop'
    }
    Write-Progress @OuterLoopProgressParameters
	# totally GET method in simplify
	for($j=0;$j-lt5;$j++){
		$InnerLoopProgressParameters = @{
            ID               = 1
            Activity         = 'Updating'
            Status           = 'Progress'
            PercentComplete  = $j
            CurrentOperation = 'InnerLoop'
        }
        Write-Progress @InnerLoopProgressParameters
		$h = $outcome.host | Get-Random;
		pick_curl $h $reg;
	}
	random_curl $url $reg $srv $pf;
	}
