# http://127.0.0.1:30001/hdSimu/ASI/index.html?perf=2
# retrieve ip address of url from mapping table
$url = (Import-Csv -Path .\outcome.csv).priIP | ForEach-Object -Process {'http://'+$_+':30001/hdSimu/'}
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

function random_curl {
	$u = $args[0] | Get-Random
	$r = $args[1] | Get-Random
	$s = $args[2] | Get-Random
	$p = $args[3] | Get-Random
	Invoke-RestMethod $u$r$s$p
}

for($i=0;$i-lt10;$i++){
	# totally GET method in simplify
	# random_curl $url_a $reg $srv $pf;
	# random_curl $url_b $reg $srv $pf;
	random_curl $url $reg $srv $pf;
	}
