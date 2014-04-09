$(document).ready(function () {
    var uri = 'ws://uk01351.bfl.local:8989';
    var ws;
    $('#wsPoke').click(function () {
        ws = new WebSocket(uri);
    });
    if ("WebSocket" in window) {
        var bufferSize = 1000;
        $('#wsMessageContainer').height($(window).height()-240);
        var mouseButtonDown = false;
        $(document).mousedown(function(e){ mouseButtonDown = true; });
        $(document).mouseup(function(e){ mouseButtonDown = false; });
        try {
            ws = new WebSocket(uri);
            ws.onopen = function () {
                $('#wsPoke').hide();
                $('#wsStatus').text('Bot is probably alive...');
                ws.send('{ "source": "client", "message": "Web Socket server at: ' + uri + ', listening and responding.", "severity": "Information" }');
            };
            ws.onmessage = function (evt) {
                $('#wsPoke').hide();
                var response = $.parseJSON(evt.data);
                var displayMessage;
                switch (response.severity) {
                    case 'Debug':
                        displayMessage = '<i class="fa fa-info" style="color: gray;"></i> <span style="color: gray;">' + response.source + ': ' + response.message + '</span>';
                        break;
                    case 'Information':
                        displayMessage = '<i class="fa fa-info"></i> <span>' + response.source + ': ' + response.message + '</span>';
                        break;
                    case 'Error':
                        displayMessage = '<i class="fa fa-warning" style="color: red;"></i> <span style="color: red;">' + response.source + ': ' + response.message + '</span>';
                        break;
                    default:
                        displayMessage = '<i class="fa fa-warning" style="color: yellow;"></i> <span style="color: yellow;">' + response.source + ': ' + response.message + '</span>';
                        break;
                }
                $('<div/>', { html: displayMessage }).appendTo('#wsMessageContainer');
                if ($('#wsMessageContainer').children().length > bufferSize) {
                    $('#wsMessageContainer div:lt(1)').remove();
                }
                if(!mouseButtonDown) {
                    $('#wsMessageContainer').scrollTop($('#wsMessageContainer')[0].scrollHeight);
                }
            };
            ws.onclose = function () {
                $('#wsStatus').html('Bot may not be alive...');
                $('#wsPoke').show();
            };
        } catch
        (exception)
        {
            $('#wsStatus').text(exception);
        }
    } else
    {
        $('#wsStatus').text('Web socket compatible browser required');
    }
});
