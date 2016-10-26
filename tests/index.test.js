'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable no-underscore-dangle */

var _expect = require('expect.js');

var _expect2 = _interopRequireDefault(_expect);

var _ = require('.');

var _2 = _interopRequireDefault(_);

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

var _jssExpand = require('jss-expand');

var _jssExpand2 = _interopRequireDefault(_jssExpand);

var _jss = require('jss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('jss-extend', function () {
  var jss = void 0;
  var warning = void 0;

  beforeEach(function () {
    _get__('extend').__Rewire__('warning', function (condition, message) {
      warning = message;
    });
    jss = _get__('create')().use(_get__('extend')(), _get__('nested')(), _get__('expand')());
  });

  afterEach(function () {
    _get__('extend').__ResetDependency__('warning');
    warning = undefined;
  });

  describe('simple extend', function () {
    var sheet = void 0;

    beforeEach(function () {
      var a = { float: 'left' };
      sheet = jss.createStyleSheet({
        a: a,
        b: {
          extend: a,
          width: '1px'
        }
      }, { named: false });
    });

    it('should extend', function () {
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.getRule('b')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('a {\n' + '  float: left;\n' + '}\n' + 'b {\n' + '  float: left;\n' + '  width: 1px;\n' + '}');
    });
  });

  describe('ensure override order', function () {
    var sheet = void 0;

    beforeEach(function () {
      var a = {
        float: 'left',
        color: 'red'
      };
      sheet = jss.createStyleSheet({
        a: {
          extend: a,
          float: 'right'
        }
      }, { named: false });
    });

    it('should have correct order', function () {
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('a {\n' + '  float: right;\n' + '  color: red;\n' + '}');
    });
  });

  describe('multi extend', function () {
    var sheet = void 0;

    beforeEach(function () {
      var a = { float: 'left' };
      var b = { position: 'absolute' };
      sheet = jss.createStyleSheet({
        c: {
          extend: [a, b],
          width: '1px'
        }
      }, { named: false });
    });

    it('should have correct output', function () {
      _get__('expect')(sheet.getRule('c')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('c {\n' + '  float: left;\n' + '  position: absolute;\n' + '  width: 1px;\n' + '}');
    });
  });

  describe('nested extend 1', function () {
    var sheet = void 0;

    beforeEach(function () {
      var c = { float: 'left' };
      var b = { extend: c, display: 'none' };
      sheet = jss.createStyleSheet({
        a: {
          extend: b,
          width: '1px'
        }
      }, { named: false });
    });

    it('should should have correct output', function () {
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('a {\n' + '  float: left;\n' + '  display: none;\n' + '  width: 1px;\n' + '}');
    });
  });

  describe('nested extend 2', function () {
    var sheet = void 0;

    beforeEach(function () {
      var b = {
        '&:hover': {
          float: 'left',
          width: '3px'
        }
      };
      sheet = jss.createStyleSheet({
        a: {
          extend: b,
          width: '1px',
          '&:hover': {
            width: '2px',
            height: '2px'
          }
        }
      }, { named: false });
    });

    it('should have correct output', function () {
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('a {\n' + '  width: 1px;\n' + '}\n' + 'a:hover {\n' + '  float: left;\n' + '  width: 2px;\n' + '  height: 2px;\n' + '}');
    });
  });

  describe('deep nested extend', function () {
    var sheet = void 0;

    beforeEach(function () {
      var a = {
        '&:hover': { width: '5px', height: '5px' },
        border: { width: '3px' }
      };
      var b = {
        extend: a,
        '&:hover': { width: '4px' },
        border: { color: 'blue' }
      };
      var c = {
        extend: b,
        '&:hover': { height: '2px' }
      };
      var d = {
        extend: c,
        '&:hover': { width: '2px' }
      };
      sheet = jss.createStyleSheet({
        a: {
          extend: d,
          width: '2px',
          border: {
            width: '1px',
            color: 'red',
            style: 'solid'
          },
          '&:hover': {
            color: 'red'
          }
        }
      }, { named: false });
    });

    it('should have correct output', function () {
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('a {\n' + '  border: 1px solid red;\n' + '  width: 2px;\n' + '}\n' + 'a:hover {\n' + '  width: 2px;\n' + '  height: 2px;\n' + '  color: red;\n' + '}');
    });
  });

  describe('extend using rule name', function () {
    var sheet = void 0;

    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: { float: 'left' },
        b: {
          extend: 'a',
          width: '1px'
        }
      }, { named: false });
    });

    it('should have correct output', function () {
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.getRule('b')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('a {\n' + '  float: left;\n' + '}\n' + 'b {\n' + '  float: left;\n' + '  width: 1px;\n' + '}');
    });
  });

  describe('extend using rule name', function () {
    var sheet = void 0;

    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          extend: 'a',
          width: '1px'
        }
      }, { named: false });
    });

    it('error if extend using same rule name', function () {
      _get__('expect')(warning).to.be('[JSS] A rule tries to extend itself \r\n%s');
      _get__('expect')(sheet.getRule('a')).to.not.be(undefined);
      _get__('expect')(sheet.toString()).to.be('a {\n' + '  width: 1px;\n' + '}');
    });
  });
});

var _RewiredData__ = Object.create(null);

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__);
  addPropertyToAPIObject('__GetDependency__', _get__);
  addPropertyToAPIObject('__Rewire__', _set__);
  addPropertyToAPIObject('__set__', _set__);
  addPropertyToAPIObject('__reset__', _reset__);
  addPropertyToAPIObject('__ResetDependency__', _reset__);
  addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
  if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
    return _get_original__(variableName);
  } else {
    var value = _RewiredData__[variableName];

    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__(variableName) {
  switch (variableName) {
    case 'extend':
      return _2.default;

    case 'create':
      return _jss.create;

    case 'nested':
      return _jssNested2.default;

    case 'expand':
      return _jssExpand2.default;

    case 'expect':
      return _expect2.default;
  }

  return undefined;
}

function _assign__(variableName, value) {
  if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
    return _set_original__(variableName, value);
  } else {
    return _RewiredData__[variableName] = value;
  }
}

function _set_original__(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _update_operation__(operation, variableName, prefix) {
  var oldValue = _get__(variableName);

  var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

  _assign__(variableName, newValue);

  return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      _RewiredData__[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__[variableName] = INTENTIONAL_UNDEFINED;
    } else {
      _RewiredData__[variableName] = value;
    }

    return function () {
      _reset__(variableName);
    };
  }
}

function _reset__(variableName) {
  delete _RewiredData__[variableName];
}

function _with__(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__[variableName];
      _RewiredData__[variableName] = object[variableName];
    });
    var result = callback();

    if (!!result && typeof result.then == 'function') {
      result.then(reset).catch(reset);
    } else {
      reset();
    }

    return result;
  };
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;
exports.default = _RewireAPI__;