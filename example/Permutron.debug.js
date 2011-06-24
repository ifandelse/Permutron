// Permutron
// (c) Jim Cowart http://www.ifandelse.com
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function(window,undefined){
    var Permutron = function(maxIdLength, isFixed, charset) {
        var _charset = charset || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            _size = maxIdLength,
            _isFixed = isFixed || false,
            _generators = [],
            _genIdx = 0;

        var Generator = function(size, maxRotations) {
            var _maxRotation = maxRotations || 1,
                _currentRotation = 1,
                _depth = size|| 0;

            this['advanceParent'] = false;
            this['childGenerator'] = undefined;
            this['depletedAvailableIds'] = false;
            this['currentIndex'] = 0;
            this['maxIdsPossible'] = function(x) {
                var multiplier = x || 1;
                var count = _charset.length * multiplier;
                if(this['childGenerator']) {
                   count = this['childGenerator']['maxIdsPossible'](count);
                }
                return count;
            }

            this['next'] = function() {
                if(!this['depletedAvailableIds']) {
                    var char = _charset.charAt(this['currentIndex']);
                    if(this['childGenerator']) {
                        char += this['childGenerator']['next']();
                        if(this['childGenerator']['advanceParent']) {
                            this['currentIndex']++;
                            this['childGenerator']['advanceParent'] = false;
                        }
                        if(this['childGenerator']['depletedAvailableIds']) {
                             this['depletedAvailableIds'] = true;
                        }
                    }
                    else {
                        this['currentIndex']++;
                    }
                    if(this['currentIndex']>= _charset.length) {
                        if(_currentRotation === _maxRotation) {
                            this['depletedAvailableIds'] = true;
                        }
                        else {
                            this['currentIndex'] = 0;
                            _currentRotation++;
                            this['advanceParent'] = true;
                        }
                    }
                    return char;
                }
            };

            _depth--;
            if(_depth > 0) {
                this['childGenerator'] = new Generator(_depth, _charset.length * _maxRotation);
            }
        }

        if(!_isFixed) {
            var i = 1;
            for(i; i <= _size; i++) {
               _generators.push(new Generator(i));
            }
        }
        else {
            _generators.push(new Generator(_size));
        }

        this['next'] = function() {
            if(!this['depletedAvailableIds']) {

                var id = _generators[_genIdx]['next']();
                if(_generators[_genIdx].depletedAvailableIds) {
                    _genIdx++;
                }
                if(_genIdx >= _generators.length) {
                    this['depletedAvailableIds'] = true;
                }

                return id;
            }
        };

        this['maxIdsPossible'] = function() {
            if(!this['maxIdsPossible']['cache']) {
                var g = 0, count = 0;
                for(g; g < _generators.length; g++) {
                      count += _generators[g]['maxIdsPossible']();
                }
                this['maxIdsPossible']['cache'] = count;
            }
            return this['maxIdsPossible']['cache'];
        };

        this['depletedAvailableIds'] = false;
    };
;
window.Permutron = Permutron;
})(window);
