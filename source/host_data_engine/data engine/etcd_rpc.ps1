# ref: https://etcd.io/docs/v3.5/dev-guide/api_grpc_gateway/
$URL1 = "http://localhost:2379"
$URL2 = "http://localhost:22379"
$URL3 = "http://localhost:32379"
$Put= "/v3/kv/put"
$Range= "/v3/kv/range"
$data_Key = [Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes('fo1o'))
$data_Value = [Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes('barbeer'))
$PostParam_put = '{"key": "'+$data_Key+'", "value": "'+$data_Value+'"}'
$PostParam_range1 = '{"key": "'+$data_Key+'"}'
$PostParam_range2 = '{"key": "Zm9v", "range_end": "Zm9w"}'
$URL = $URL1, $URL2, $URL3 | Get-Random
$res_put = Invoke-WebRequest -Uri "$URL$Put" -Method POST -Body $PostParam_put
$URL = $URL1, $URL2, $URL3 | Get-Random
$res_range1 = Invoke-WebRequest -Uri "$URL$Range" -Method POST -Body $PostParam_range1
$URL = $URL1, $URL2, $URL3 | Get-Random
$res_range2 = Invoke-WebRequest -Uri "$URL$Range" -Method POST -Body $PostParam_range2
