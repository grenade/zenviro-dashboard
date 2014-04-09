
tt.app.filter('urlencode', urlencode);
tt.app.filter('tofilename', tofilename);

function urlencode() {
  return function(input) {
    return input
        ? window.encodeURIComponent(input).replace(/%5C/g,"%255C")
        : $null;
  };
}

function tofilename() {
  return function(input) {
    return input
        ? input.replace('\\\\','').replace('$', '').replace(/\\/g,'.')
        : $null;
  };
}