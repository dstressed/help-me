module.exports = function count(string, pairs) {
  var n = getN(pairs);
  var counter = 0;
  var stringLength = string.length;

  if (stringLength == 1) {
      counter = 1;
      for (var i = 0, length = pairs.length; i < length; i++) {
          counter *= (pairs[i][0] - 1);
      }
      counter = (string === '1') ? counter : n - counter;
  }

  if (stringLength == 2) {
      var b = 1;
      var previousObject = {};
      var currentObject;

      getNewObject();
      var max = Object.keys(currentObject);
      max = max[max.length - 1];

      var arr = new Array(stringLength);
      for (i = 0; i < arr.length; i++) {
          arr[i] = (currentObject[i + 1]) ? 0 : 1;
      }


      for (i += 1; i <= n + stringLength; i++) {
          if (string == arr.join('')) counter++;
          arr = arr.slice(1);
          var next = (currentObject[i]) ? 0 : 1;
          arr.push(next);
          if (i == max) {
              getNewObject();
              max = Object.keys(currentObject);
              max = max[max.length - 1];
          }
      }

      for (i = 0; i < pairs.length; i++) {
          var integer = pairs[i][0];
          var power = pairs[i][1];
          for (b = 0; b < power - 1; b++) {
              counter = (counter * integer) % 1000000007;
          }
      }
  }

  function getNewObject() {
      currentObject = previousObject;
      previousObject = {};
      var currentLimit = b + 50000;
      for (b; b < currentLimit; b++) {
          for (var i = 0, length = pairs.length; i < length; i++) {
              currentObject[pairs[i][0] * b] = true;
              previousObject[pairs[i][0] * b] = true;
          }
      }
  }

  function getN(pairs) {
      var n = pairs[0][0];
      for (var i = 1, length = pairs.length ; i < length; i++) {
          n *= pairs[i][0];
      }
      return n;
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
