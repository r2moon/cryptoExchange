var toCoin = '', toVal = 0;
var fromCoin = '', fromVal = 0;
var targetDate = moment().format("DD-MM-YYYY");
var rate = 0;
const apiBaseURL = 'https://api.coingecko.com/api/v3/';

/// getConvertionRate
function getRate() {
  if (fromCoin && toCoin && targetDate) {
    let cacheData = localStorage.getItem(`${fromCoin}-${toCoin}-${targetDate}`);
    if (cacheData > 0) {
      rate = cacheData;
      updateValues();
      return;
    }

    $.get(`${apiBaseURL}coins/${fromCoin}/history?date=${targetDate}`, function (fromData) {
      $.get(`${apiBaseURL}coins/${toCoin}/history?date=${targetDate}`, function (toData) {
        if (fromData['market_data'] &&
          toData['market_data'] &&
          fromData['market_data']['current_price'] &&
          toData['market_data']['current_price']) {
          rate = toData['market_data']['current_price']['usd'] / fromData['market_data']['current_price']['usd'];
          localStorage.setItem(`${fromCoin}-${toCoin}-${targetDate}`, rate);
        } else
          rate = 0;

        updateValues();
      });
    });
  }
}

/// Update coin amounts

function updateValues(changeTo = true) {
  if (rate === 0) {
    $('.to-input').val(0);
    return;
  }
  if (changeTo) {
    $('.to-input').val((fromVal / rate));
  } else {
    $('.from-input').val((toVal * rate));
  }
}

$(document).ready(function () {
  /// fetch coin list from coingecko
  $.get(`${apiBaseURL}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`, function (data) {
    for (var i = 0; i < data.length; i++) {
      fromCoin
      $('#coin-menu-to').append(`<li><a href="#" id=${data[i]['id']}>${data[i]['symbol'].toUpperCase()}</a></li>`);
      $('#coin-menu-from').append(`<li><a href="#" id=${data[i]['id']}>${data[i]['symbol'].toUpperCase()}</a></li>`);
    }

    $('#coin-menu-from li a').click(function () {
      $('#from-but-txt').text($(this).text());
      fromCoin = $(this).attr('id');
      getRate();
    });

    $('#coin-menu-to li a').click(function () {
      $('#to-but-txt').text($(this).text());
      toCoin = $(this).attr('id');
      getRate();
    });

    $('.date-input').val(moment().format("YYYY-MM-DD"));
    $('.date-input').change(function () {
      targetDate = $(this).val();
      targetDate = moment(targetDate).format("DD-MM-YYYY");
      getRate();
    });

    $('.from-input').bind('keyup', function () {
      fromVal = $(this).val();
      updateValues();
    });

    $('.to-input').bind('keyup', function () {
      toVal = $(this).val();
      updateValues(false);
    });
  });
})
