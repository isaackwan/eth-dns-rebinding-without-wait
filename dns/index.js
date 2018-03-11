var named = require("mname");
var server = named.createServer();

const localRecord = new named.ARecord('127.0.0.1');
const serverRecord1 = new named.ARecord(process.env.SERVER_IP);
const serverRecord2 = new named.AAAARecord(process.env.SERVER_IPv6);

server.listenUdp({port: 53, address: "::"}, function() {
	console.log('DNS server started on port 53');
});

server.on('query', function(query, done) {
	var domain = query.name();
	console.log('DNS Query: %s', domain)
	if (domain.split(".")[0] > Date.now()) {
		query.addAnswer(domain, serverRecord1, 10);
		query.addAnswer(domain, serverRecord2, 10);
	} else {
		query.addAnswer(domain, localRecord, 10);
	}
	query.respond();
	done();
});
