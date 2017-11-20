/**
 * Luno functions
 */

const https = require('https');
const moment = require('moment');

function formatLunoCurrency(number)
{
  return parseFloat(number).toFixed(0).replace(/./g, function(c, i, a) { return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c; });
}

function getLunoTicker(callback) {
  return getLunoTickerFull(function(ticker) {
    var dateFormatted = moment(ticker.timestamp).fromNow();
    var priceFormatted = formatLunoCurrency(ticker.bid);
    callback({
      text: "`["+dateFormatted+"] BTC/ZAR "+priceFormatted+"`"
    });
  });
}

function getLunoTickerFull(pair, callback) {
  return https.get({
    host: 'api.mybitx.com',
    path: '/api/1/ticker?pair=' + pair
  }, function(response) {
    var body = '';
    response.on('data', function(d) { body += d; });
    response.on('end', function() {
      var parsed = JSON.parse(body);
      callback(parsed);
    });
  });
}

function createEmbed(ticker) {
  return {
    embed: {
      color: 0xF69222,
      fields: [
        { name: "Pair",        value: ticker.pair,                                                     inline: true },
        { name: "Last Trade",  value: formatLunoCurrency(ticker.last_trade),                           inline: true },
        { name: "Timestamp",   value: moment(ticker.timestamp).format("YYYY-MM-DD HH:mm:ss") + " UTC", inline: true },
        { name: "Bid",         value: formatLunoCurrency(ticker.bid),                                  inline: true },
        { name: "Ask",         value: formatLunoCurrency(ticker.ask),                                  inline: true },
        { name: "24hr Volume", value: "BTC " + ticker.rolling_24_hour_volume,                          inline: true }
      ],
      footer: {
        text: "`.luno help` for more info"
      }
    }
  }
}

exports.getLunoTicker = getLunoTicker;
exports.getLunoTickerFull = getLunoTickerFull;
exports.formatLunoCurrency = formatLunoCurrency;
exports.createEmbed = createEmbed;