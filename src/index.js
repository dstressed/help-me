module.exports = function count(string, pairs) {
  var MOD = 1000000007;
  var stringLength = string.length;
  var n = getN(pairs);
  var counter = 0;

  if (stringLength == 1) {
      counter = 1;
      for (var i = 0, length = pairs.length; i < length; i++) {
          counter *= (pairs[i][0] - 1);
      }
      counter = (string === '1') ? counter : n - counter;
  }

  if (stringLength == 2 || stringLength == 4) {
      var previousObject = {};
      var currentObject;
      var currentLimit = 0;
      var currentValues = getPrimes(pairs);
      getNewObject();

      function getPrimes(pairs) {
          var arr = [];
          for (var i = 0, length = pairs.length; i < length; i++) {
              arr.push(pairs[i][0]);
          }
          return arr;
      }

      function getNewObject() {
          currentObject = previousObject;
          previousObject = {};
          currentLimit += 100;
          for (var i = 0, length = pairs.length; i < length; i++) {
              var prime = pairs[i][0];
              for (var n = currentValues[i]; n < currentLimit + 10; n += prime) {
                  currentObject[n] = true;
                  previousObject[n] = true;
              }
              currentValues[i] = n;
          }
      }

      var currentString = new Array(stringLength);
      for (i = 0; i < stringLength; i++) {
          currentString[i] = (currentObject[i + 1]) ? 0 : 1;
      }

      n += stringLength + 1;

      for (i += 1; i < n; i++) {
          if (string == currentString.join('')) counter++;
          currentString = currentString.slice(1);
          var next = (currentObject[i]) ? 0 : 1;
          currentString.push(next);
          if (i == currentLimit) {
              getNewObject();
          }
      }

      for (i = 0; i < pairs.length; i++) {
          var base = pairs[i][0];
          var power = pairs[i][1] - 1;
          var currentExponetiatedNumber = pow(base, power);
          counter = multiply(counter, currentExponetiatedNumber);
      }
  }

  function getN(pairs) {
      var n = pairs[0][0];
      for (var i = 1, length = pairs.length ; i < length; i++) {
          n *= pairs[i][0];
      }
      return n;
  }

  function pow(base, power) {
      var result = 1;

      while (power > 0) {
          if (power & 1 === 1) {
              result = multiply(result, base) % MOD;
          }

          power = ~~(power / 2);
          base = multiply(base, base) % MOD;
      }

      return result;
  }

  function multiply(a, b) {
      var result = 0;
      while (b > 0) {
          if (b & 1 === 1) {
              b--;
              result = (result + a) % MOD;
          }
          a = (a + a) % MOD;
          b = ~~(b / 2);
      }
      return result;
  }

  return counter;
};

/*
module.exports = function count(string, pairs) {
    var mask = string.split('');
    var n = getN(pairs);
    var counter = 0;

    outer: for (var i = 1; i <= n; i++) {
        for (var b = 0; b < mask.length; b++) {
            if (mask[b] == 0) {
                if (getGCD(i + b , n) == 1) continue outer;
            }
            if (mask[b] == 1) {
                if (getGCD(i + b , n) != 1) continue outer;
            }
        }
        counter++;
    }

    for (i = 0; i < pairs.length; i++) {
        var integer = pairs[i][0];
        var power = pairs[i][1];
        for (b = 0; b < power - 1; b++) {
            counter = (counter * integer) % 1000000007;
        }
    }

    function getN(pairs) {
        var n = pairs[0][0];
        for (var i = 1, length = pairs.length ; i < length; i++) {
            n *= pairs[i][0];
        }
        return n;
    }

    function getGCD(a, b) {
        if (!b) {
            return a;
        }
        return getGCD(b, a % b);
    };

    return counter % 1000000007;
};
*/

/*
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
*/
