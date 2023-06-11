# read parameters
args = commandArgs(trailingOnly=TRUE)
if (length(args)==0) {
  stop("USAGE: Rscript data_process.R host_data.csv hostmap.csv outcome.csv", call.=FALSE)
}
# parse parameters
data.raw.fn <- args[1]
hostmap.fn <- args[2]
out.fn <- args[3]

# data.raw.fn <- '20230611194015-hosts_data.csv'
df <- read.csv(data.raw.fn)

# scores factor
scores.fac <- function(data){
  t.cp <- table(data$ctlPerf)
  cp.fac <- mean(t.cp*1:length(t.cp))
  wl.fac <- data$workload/-100
  cnt.fac <- data$count/-1.25
  ms.fac <- mean(data$ms)/-1.75
  return(sum(cp.fac,wl.fac,cnt.fac,ms.fac))
}

# alive if overnode
host.status <- function(n){
  s <- 1
  if (sum(n)>1000) s <- 0
  return(s)
}

# hostmap.fn <- 'hostmap.csv'
hostmap <- read.csv(hostmap.fn, stringsAsFactors = FALSE)
# reset to 1 to recalculate status
hostmap$status <- 1
# finish score calculation
# scores <- c()
for (hostip in unique(df$host)) {
  print(hostip)
  d.host <- df[df$host==hostip,]
  hosta <- host.status(d.host$node)
  hostmap[hostmap$IP==hostip,"status"] <- hosta
  hostmap[hostmap$IP==hostip,"scores"] <- ifelse(!hosta,0,scores.fac(d.host))
  # scores <- c(scores, scores.fac(d.host))
  # print(scores)
}
write.csv(hostmap, file = hostmap.fn, row.names = FALSE)

# hostmap$status <- 0
# hostmap$status <- c(rep(1,14),0,0,0)
# choos available host
h.s.1 <- hostmap[hostmap$status==1,]
# out.fn <- 'outcome.csv'
out <- read.csv(out.fn, stringsAsFactors = FALSE)
# reset to 0 to recalculate reboot status
out$rbstatus <- 0
# candi.ip <- c()
for (host.main in unique(hostmap$host)) {
  print(host.main)
  h.sec <- h.s.1[h.s.1$host==host.main,]
  print(h.sec)
  if(!length(row.names(h.sec)))
    out[out$host==host.main,"rbstatus"] <- 1
  else
    out[out$host==host.main,"priIP"] <- h.sec$IP[which.max(h.sec$scores)]
  print(h.sec$IP[which.max(h.sec$scores)])
  # candi.ip <- c(candi.ip, h.sec$IP[which.max(h.sec$scores)])
}

# out$priIP <- h.s.1[candi.ip,"IP"]
write.csv(out, file = out.fn, row.names = FALSE)
# author@CWayneH
# version 1.0
