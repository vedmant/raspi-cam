const natpmp = require('nat-pmp')
const network = require('network')

network.get_gateway_ip(function(err, ip) {
  if (err) throw err;
  console.log('Current gateway IP address: %s', ip);

  // create a "client" instance connecting to your local gateway
  var client = natpmp.connect(ip);
  // explicitly ask for the current external IP address
  client.externalIp(function (err, info) {
    if (err) throw err;
    console.log('Current external IP address: %s', info.ip.join('.'));
  })
  // setup a new port mapping
  client.portMapping({ private: 80, public: 12345, ttl: 3600 }, function (err, info) {
    if (err) throw err
    console.log(info)
  })
})
