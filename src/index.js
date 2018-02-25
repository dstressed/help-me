module.exports = function count(string, pairs) {
  var mask = string.split('');
  var n = getN(pairs);
  var counter = 0;
  var nDevisors = getDevisors(n);

  outer: for (var i = 1; i < n + 1; i++) {
      for (var b = 0; b < mask.length; b++) {
          if (mask[b] == 1) {
              if (!isGCD1(i + b, nDevisors)) continue outer;
          }
          if (mask[b] == 0) {
              if (isGCD1(i + b, nDevisors)) continue outer;
          }
      }
      counter++;
  }

  function getN(pairs) {
      var n;
      for (var i = 0; i < pairs.length; i++) {
          var p = Math.pow(pairs[i][0], pairs[i][1]);
          if (!n) n = p;
          else n *= p;
      }
      return n;
  }

  function isGCD1(integer, nDevisors) {
      var iDevisors = Object.keys(getDevisors(integer));
      for (var i = 0; i < iDevisors.length; i++) {
          if (nDevisors[iDevisors[i]]) return false;
      }
      return true;
  }

  function getDevisors(number) {
      var n = number;
      var devisors = {};
      for (var i = 2; i <= n; i++) {
          while (n % i == 0) {
              n /= i;
              devisors[i] = true;
          }
      }
      return devisors;
  }
  return counter % 1000000007;
};
