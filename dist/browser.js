(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DummyComponent = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.DefaultErrorComponent = DefaultErrorComponent;
exports.DefaultLoadingComponent = DefaultLoadingComponent;

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DummyComponent = exports.DummyComponent = function (_React$Component) {
  (0, _inherits3.default)(DummyComponent, _React$Component);

  function DummyComponent() {
    (0, _classCallCheck3.default)(this, DummyComponent);
    return (0, _possibleConstructorReturn3.default)(this, (DummyComponent.__proto__ || (0, _getPrototypeOf2.default)(DummyComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DummyComponent, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return DummyComponent;
}(_react2.default.Component);

function DefaultErrorComponent(_ref) {
  var error = _ref.error;

  return _react2.default.createElement(
    'pre',
    { style: { color: 'red' } },
    error.message,
    ' ',
    _react2.default.createElement('br', null),
    error.stack
  );
}

function DefaultLoadingComponent() {
  return _react2.default.createElement(
    'p',
    null,
    'Loading...'
  );
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"babel-runtime/core-js/object/get-prototype-of":14,"babel-runtime/helpers/classCallCheck":18,"babel-runtime/helpers/createClass":19,"babel-runtime/helpers/inherits":21,"babel-runtime/helpers/possibleConstructorReturn":22}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = compose;

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _utils = require('./utils');

var _common_components = require('./common_components');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compose(fn, L1, E1) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      contextTypes = _ref.contextTypes,
      _ref$pure = _ref.pure,
      pure = _ref$pure === undefined ? true : _ref$pure,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef;

  return function (ChildComponent, L2, E2) {
    (0, _invariant2.default)(Boolean(ChildComponent), 'Should provide a child component to build the higher order container.');

    if ((0, _utils.isReactNative)()) {
      (0, _invariant2.default)(L1 || L2, 'Should provide a loading component in ReactNative.');

      (0, _invariant2.default)(E1 || E2, 'Should provide a error handling component in ReactNative.');
    }

    // eslint-disable-next-line no-unused-vars
    var LoadingComponent = L1 || L2 || (0, _._getDefaultLoadingComponent)();
    // eslint-disable-next-line no-unused-vars
    var ErrorComponent = E1 || E2 || (0, _._getDefaultErrorComponent)();

    // If this is disabled, we simply need to return the DummyComponent
    if ((0, _.getDisableMode)()) {
      return (0, _utils.inheritStatics)(_common_components.DummyComponent, ChildComponent);
    }

    var Container = function (_React$Component) {
      (0, _inherits3.default)(Container, _React$Component);

      function Container(props, context) {
        (0, _classCallCheck3.default)(this, Container);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).call(this, props, context));

        _this.getWrappedInstance = _this.getWrappedInstance.bind(_this);

        _this.state = {};

        // XXX: In the server side environment, we need to
        // stop the subscription right away. Otherwise, it's a starting
        // point to huge subscription leak.
        _this._subscribe();
        return _this;
      }

      (0, _createClass3.default)(Container, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this._mounted = true;
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
          if (prevProps !== this.props) {
            this._subscribe();
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this._mounted = false;
          this._unsubscribe();
        }
      }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
          if (!pure) {
            return true;
          }

          return !(0, _shallowequal2.default)(this.props, nextProps) || this.state.error !== nextState.error || !(0, _shallowequal2.default)(this.state.payload, nextState.payload);
        }
      }, {
        key: 'getWrappedInstance',
        value: function getWrappedInstance() {
          (0, _invariant2.default)(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the compose() call.');
          return this.refs.wrappedInstance;
        }
      }, {
        key: 'render',
        value: function render() {
          var error = this._getError();
          var loading = this._isLoading();

          if (error) {
            return _react2.default.createElement(ErrorComponent, { error: error });
          }

          if (loading) {
            return _react2.default.createElement(LoadingComponent, this._getProps());
          }

          return _react2.default.createElement(ChildComponent, this._getProps());
        }
      }, {
        key: '_subscribe',
        value: function _subscribe() {
          var _this2 = this;

          this._unsubscribe();

          var onData = function onData(error, payload) {
            if (error) {
              (0, _invariant2.default)(error.message && error.stack, 'Passed error should be an instance of an Error.');
            }

            var state = { error: error, payload: payload };

            if (_this2._mounted) {
              _this2.setState(state);
            } else {
              _this2.state = state;
            }
          };

          this._stop = fn(this.props, onData, this.context);
        }
      }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
          if (this._stop) {
            this._stop();
          }
        }
      }, {
        key: '_getProps',
        value: function _getProps() {
          var _state$payload = this.state.payload,
              payload = _state$payload === undefined ? {} : _state$payload;


          var props = (0, _extends3.default)({}, this.props, payload);

          if (withRef) {
            props.ref = 'wrappedInstance';
          }

          return props;
        }
      }, {
        key: '_getError',
        value: function _getError() {
          var error = this.state.error;

          return error;
        }
      }, {
        key: '_isLoading',
        value: function _isLoading() {
          var payload = this.state.payload;

          return !Boolean(payload);
        }
      }]);
      return Container;
    }(_react2.default.Component);

    Container.contextTypes = contextTypes;
    return (0, _utils.inheritStatics)(Container, ChildComponent);
  };
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./":8,"./common_components":1,"./utils":9,"babel-runtime/core-js/object/get-prototype-of":14,"babel-runtime/helpers/classCallCheck":18,"babel-runtime/helpers/createClass":19,"babel-runtime/helpers/extends":20,"babel-runtime/helpers/inherits":21,"babel-runtime/helpers/possibleConstructorReturn":22,"invariant":102,"shallowequal":109}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = composeAll;

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var _common_components = require('./common_components');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// utility function to compose multiple composers at once.
function composeAll() {
  for (var _len = arguments.length, composers = Array(_len), _key = 0; _key < _len; _key++) {
    composers[_key] = arguments[_key];
  }

  return function (BaseComponent) {
    if ((0, _.getDisableMode)()) {
      return _common_components.DummyComponent;
    }

    if (BaseComponent === null || BaseComponent === undefined) {
      throw new Error('Curry function of composeAll needs an input.');
    }

    var FinalComponent = BaseComponent;
    composers.forEach(function (composer) {
      if (typeof composer !== 'function') {
        throw new Error('Composer should be a function.');
      }

      FinalComponent = composer(FinalComponent);

      if (FinalComponent === null || FinalComponent === undefined) {
        throw new Error('Composer function should return a value.');
      }
    });

    FinalComponent.__OriginalBaseComponent = BaseComponent.__OriginalBaseComponent || BaseComponent;

    var stubbingMode = (0, _.getStubbingMode)();

    if (!stubbingMode) {
      return FinalComponent;
    }

    // return the stubbing mode.
    var ResultContainer = function ResultContainer(props) {
      // If there's an stub use it.
      if (ResultContainer.__composerStub) {
        var data = ResultContainer.__composerStub(props);
        var finalProps = (0, _extends3.default)({}, props, data);

        return _react2.default.createElement(FinalComponent.__OriginalBaseComponent, finalProps);
      }

      // if there's no stub, just use the FinalComponent.
      var displayName = FinalComponent.displayName || FinalComponent.name;
      return _react2.default.createElement(
        'span',
        null,
        '<' + displayName + ' />'
      );
    };

    (0, _utils.inheritStatics)(ResultContainer, FinalComponent);

    return ResultContainer;
  };
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./":8,"./common_components":1,"./utils":9,"babel-runtime/helpers/extends":20}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = composeWithMobx;

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

var _mobx = require('mobx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function composeWithMobx(fn, L, E, options) {
  var onPropsChange = function onPropsChange(props, onData) {
    var reactiveFn = function reactiveFn() {
      return fn(props, onData);
    };

    (0, _mobx.autorun)(reactiveFn);

    return reactiveFn();
  };

  return (0, _compose2.default)(onPropsChange, L, E, options);
}
},{"../compose":2,"mobx":107}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = composeWithObservable;

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function composeWithObservable(fn, L, E, options) {
  var onPropsChange = function onPropsChange(props, sendData, context) {
    var observable = fn(props, context);
    (0, _invariant2.default)(typeof observable.subscribe === 'function', 'Should return an observable from the callback of `composeWithObservable`');

    sendData();
    var onData = function onData(data) {
      (0, _invariant2.default)((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object', 'Should return a plain object from the promise');
      var clonedData = (0, _extends3.default)({}, data);
      sendData(null, clonedData);
    };

    var onError = function onError(err) {
      sendData(err);
    };

    var sub = observable.subscribe(onData, onError);
    return sub.completed.bind(sub);
  };

  return (0, _compose2.default)(onPropsChange, L, E, options);
}
},{"../compose":2,"babel-runtime/helpers/extends":20,"babel-runtime/helpers/typeof":23,"invariant":102}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = composeWithPromise;

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function composeWithPromise(fn, L, E, options) {
  var onPropsChange = function onPropsChange(props, onData, context) {
    var promise = fn(props, context);
    (0, _invariant2.default)(typeof promise.then === 'function' && typeof promise.catch === 'function', 'Should return a promise from the callback of `composeWithPromise`');

    onData();
    promise.then(function (data) {
      (0, _invariant2.default)((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object', 'Should return a plain object from the promise');
      var clonedData = (0, _extends3.default)({}, data);
      onData(null, clonedData);
    }).catch(function (err) {
      onData(err);
    });
  };

  return (0, _compose2.default)(onPropsChange, L, E, options);
}
},{"../compose":2,"babel-runtime/helpers/extends":20,"babel-runtime/helpers/typeof":23,"invariant":102}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = composeWithTracker;

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function composeWithTracker(reactiveFn, L, E, options) {
  var onPropsChange = function onPropsChange(props, onData, context) {
    var trackerCleanup = void 0;
    var handler = Tracker.nonreactive(function () {
      return Tracker.autorun(function () {
        trackerCleanup = reactiveFn(props, onData, context);
      });
    });

    return function () {
      if (typeof trackerCleanup === 'function') {
        trackerCleanup();
      }
      return handler.stop();
    };
  };

  return (0, _compose2.default)(onPropsChange, L, E, options);
}
},{"../compose":2}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeWithMobx = exports.composeWithObservable = exports.composeWithPromise = exports.composeWithTracker = exports.composeAll = exports.compose = undefined;
exports.disable = disable;
exports.getDisableMode = getDisableMode;
exports.setStubbingMode = setStubbingMode;
exports.getStubbingMode = getStubbingMode;
exports.setComposerStub = setComposerStub;
exports.setDefaultLoadingComponent = setDefaultLoadingComponent;
exports.setDefaultErrorComponent = setDefaultErrorComponent;
exports._getDefaultLoadingComponent = _getDefaultLoadingComponent;
exports._getDefaultErrorComponent = _getDefaultErrorComponent;

var _compose2 = require('./compose');

var _compose3 = _interopRequireDefault(_compose2);

var _compose_all = require('./compose_all');

var _compose_all2 = _interopRequireDefault(_compose_all);

var _with_tracker = require('./composers/with_tracker');

var _with_tracker2 = _interopRequireDefault(_with_tracker);

var _with_promise = require('./composers/with_promise');

var _with_promise2 = _interopRequireDefault(_with_promise);

var _with_observable = require('./composers/with_observable');

var _with_observable2 = _interopRequireDefault(_with_observable);

var _with_mobx = require('./composers/with_mobx');

var _with_mobx2 = _interopRequireDefault(_with_mobx);

var _common_components = require('./common_components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compose = exports.compose = _compose3.default;
var composeAll = exports.composeAll = _compose_all2.default;
var composeWithTracker = exports.composeWithTracker = _with_tracker2.default;
var composeWithPromise = exports.composeWithPromise = _with_promise2.default;
var composeWithObservable = exports.composeWithObservable = _with_observable2.default;
var composeWithMobx = exports.composeWithMobx = _with_mobx2.default;

var disableMode = false;
var stubbingMode = false;
var defaultErrorComponent = null;
var defaultLoadingComponent = null;

// A way to disable the functionality of react-komposer and always show the
// loading component.
// This is very useful in testing where we can ignore React kompser's behaviour.
function disable() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  disableMode = value;
}

function getDisableMode() {
  return disableMode;
}

// stubbing

function setStubbingMode() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  stubbingMode = value;
}

function getStubbingMode() {
  return stubbingMode;
}

function setComposerStub(Container, composerStub) {
  Container.__composerStub = composerStub;
}

// default components
function setDefaultLoadingComponent(comp) {
  defaultLoadingComponent = comp;
}

function setDefaultErrorComponent(comp) {
  defaultErrorComponent = comp;
}

function _getDefaultLoadingComponent() {
  return defaultLoadingComponent || _common_components.DefaultLoadingComponent;
}

function _getDefaultErrorComponent() {
  return defaultErrorComponent || _common_components.DefaultErrorComponent;
}
},{"./common_components":1,"./compose":2,"./compose_all":3,"./composers/with_mobx":4,"./composers/with_observable":5,"./composers/with_promise":6,"./composers/with_tracker":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inheritStatics = inheritStatics;
exports.isReactNative = isReactNative;

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inheritStatics(Container, ChildComponent) {
  var childDisplayName =
  // Get the display name if it's set.
  ChildComponent.displayName ||
  // Get the display name from the function name.
  ChildComponent.name ||
  // If not, just add a default one.
  'ChildComponent';

  Container.displayName = 'Container(' + childDisplayName + ')';
  return (0, _hoistNonReactStatics2.default)(Container, ChildComponent);
}

function isReactNative() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return true;
  }

  return false;
}
},{"hoist-non-react-statics":101}],10:[function(require,module,exports){
'use strict';

if (typeof window !== 'undefined') {
  window.ReactKomposer = require('./index');
}
},{"./index":8}],11:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":24}],12:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":25}],13:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":26}],14:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":27}],15:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":28}],16:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":29}],17:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":30}],18:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],19:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":13}],20:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _assign = require("../core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
},{"../core-js/object/assign":11}],21:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"../core-js/object/create":12,"../core-js/object/set-prototype-of":15,"../helpers/typeof":23}],22:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":23}],23:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":16,"../core-js/symbol/iterator":17}],24:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":36,"../../modules/es6.object.assign":90}],25:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};

},{"../../modules/_core":36,"../../modules/es6.object.create":91}],26:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":36,"../../modules/es6.object.define-property":92}],27:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;

},{"../../modules/_core":36,"../../modules/es6.object.get-prototype-of":93}],28:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;

},{"../../modules/_core":36,"../../modules/es6.object.set-prototype-of":94}],29:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/_core":36,"../../modules/es6.object.to-string":95,"../../modules/es6.symbol":97,"../../modules/es7.symbol.async-iterator":98,"../../modules/es7.symbol.observable":99}],30:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/_wks-ext":87,"../../modules/es6.string.iterator":96,"../../modules/web.dom.iterable":100}],31:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],32:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],33:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":52}],34:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":79,"./_to-iobject":81,"./_to-length":82}],35:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],36:[function(require,module,exports){
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],37:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":31}],38:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],39:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":44}],40:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":45,"./_is-object":52}],41:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],42:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":66,"./_object-keys":69,"./_object-pie":70}],43:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":36,"./_ctx":37,"./_global":45,"./_has":46,"./_hide":47}],44:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],45:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],46:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],47:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":39,"./_object-dp":61,"./_property-desc":72}],48:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":45}],49:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":39,"./_dom-create":40,"./_fails":44}],50:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":35}],51:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":35}],52:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],53:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":47,"./_object-create":60,"./_property-desc":72,"./_set-to-string-tag":75,"./_wks":88}],54:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":43,"./_hide":47,"./_iter-create":53,"./_iterators":56,"./_library":57,"./_object-gpo":67,"./_redefine":73,"./_set-to-string-tag":75,"./_wks":88}],55:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],56:[function(require,module,exports){
module.exports = {};

},{}],57:[function(require,module,exports){
module.exports = true;

},{}],58:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":44,"./_has":46,"./_is-object":52,"./_object-dp":61,"./_uid":85}],59:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

},{"./_descriptors":39,"./_fails":44,"./_iobject":50,"./_object-gops":66,"./_object-keys":69,"./_object-pie":70,"./_to-object":83}],60:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":33,"./_dom-create":40,"./_enum-bug-keys":41,"./_html":48,"./_object-dps":62,"./_shared-key":76}],61:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":33,"./_descriptors":39,"./_ie8-dom-define":49,"./_to-primitive":84}],62:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":33,"./_descriptors":39,"./_object-dp":61,"./_object-keys":69}],63:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":39,"./_has":46,"./_ie8-dom-define":49,"./_object-pie":70,"./_property-desc":72,"./_to-iobject":81,"./_to-primitive":84}],64:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":65,"./_to-iobject":81}],65:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":41,"./_object-keys-internal":68}],66:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],67:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":46,"./_shared-key":76,"./_to-object":83}],68:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":34,"./_has":46,"./_shared-key":76,"./_to-iobject":81}],69:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":41,"./_object-keys-internal":68}],70:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],71:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":36,"./_export":43,"./_fails":44}],72:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],73:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":47}],74:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_an-object":33,"./_ctx":37,"./_is-object":52,"./_object-gopd":63}],75:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":46,"./_object-dp":61,"./_wks":88}],76:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":77,"./_uid":85}],77:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":36,"./_global":45,"./_library":57}],78:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":38,"./_to-integer":80}],79:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":80}],80:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],81:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":38,"./_iobject":50}],82:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":80}],83:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":38}],84:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":52}],85:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],86:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":36,"./_global":45,"./_library":57,"./_object-dp":61,"./_wks-ext":87}],87:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":88}],88:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":45,"./_shared":77,"./_uid":85}],89:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":32,"./_iter-define":54,"./_iter-step":55,"./_iterators":56,"./_to-iobject":81}],90:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":43,"./_object-assign":59}],91:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: require('./_object-create') });

},{"./_export":43,"./_object-create":60}],92:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":39,"./_export":43,"./_object-dp":61}],93:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_object-gpo":67,"./_object-sap":71,"./_to-object":83}],94:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });

},{"./_export":43,"./_set-proto":74}],95:[function(require,module,exports){

},{}],96:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":54,"./_string-at":78}],97:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toObject = require('./_to-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $GOPS = require('./_object-gops');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":33,"./_descriptors":39,"./_enum-keys":42,"./_export":43,"./_fails":44,"./_global":45,"./_has":46,"./_hide":47,"./_is-array":51,"./_is-object":52,"./_library":57,"./_meta":58,"./_object-create":60,"./_object-dp":61,"./_object-gopd":63,"./_object-gopn":65,"./_object-gopn-ext":64,"./_object-gops":66,"./_object-keys":69,"./_object-pie":70,"./_property-desc":72,"./_redefine":73,"./_set-to-string-tag":75,"./_shared":77,"./_to-iobject":81,"./_to-object":83,"./_to-primitive":84,"./_uid":85,"./_wks":88,"./_wks-define":86,"./_wks-ext":87}],98:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":86}],99:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":86}],100:[function(require,module,exports){
require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./_global":45,"./_hide":47,"./_iterators":56,"./_wks":88,"./es6.array.iterator":89}],101:[function(require,module,exports){
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};

},{}],102:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":108}],103:[function(require,module,exports){
/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;

},{}],104:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isArguments;

},{}],105:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;

},{}],106:[function(require,module,exports){
/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = require('lodash._getnative'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash._getnative":103,"lodash.isarguments":104,"lodash.isarray":105}],107:[function(require,module,exports){
(function (global){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
registerGlobals();
exports.extras = {
    allowStateChanges: allowStateChanges,
    getAtom: getAtom,
    getDebugName: getDebugName,
    getDependencyTree: getDependencyTree,
    getObserverTree: getObserverTree,
    isComputingDerivation: isComputingDerivation,
    isSpyEnabled: isSpyEnabled,
    resetGlobalState: resetGlobalState,
    spyReport: spyReport,
    spyReportEnd: spyReportEnd,
    spyReportStart: spyReportStart,
    trackTransitions: trackTransitions,
    setReactionScheduler: setReactionScheduler
};
exports._ = {
    getAdministration: getAdministration,
    resetGlobalState: resetGlobalState
};
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx(module.exports);
}
var actionFieldDecorator = createClassPropertyDecorator(function (target, key, value, args, originalDescriptor) {
    var actionName = (args && args.length === 1) ? args[0] : (value.name || key || "<unnamed action>");
    var wrappedAction = action(actionName, value);
    addHiddenProp(target, key, wrappedAction);
}, function (key) {
    return this[key];
}, function () {
    invariant(false, "It is not allowed to assign new values to @action fields");
}, false, true);
function action(arg1, arg2, arg3, arg4) {
    if (arguments.length === 1 && typeof arg1 === "function")
        return createAction(arg1.name || "<unnamed action>", arg1);
    if (arguments.length === 2 && typeof arg2 === "function")
        return createAction(arg1, arg2);
    if (arguments.length === 1 && typeof arg1 === "string")
        return namedActionDecorator(arg1);
    return namedActionDecorator(arg2).apply(null, arguments);
}
exports.action = action;
function namedActionDecorator(name) {
    return function (target, prop, descriptor) {
        if (descriptor && typeof descriptor.value === "function") {
            descriptor.value = createAction(name, descriptor.value);
            descriptor.enumerable = false;
            descriptor.configurable = true;
            return descriptor;
        }
        return actionFieldDecorator(name).apply(this, arguments);
    };
}
function runInAction(arg1, arg2, arg3) {
    var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    var fn = typeof arg1 === "function" ? arg1 : arg2;
    var scope = typeof arg1 === "function" ? arg2 : arg3;
    invariant(typeof fn === "function", "`runInAction` expects a function");
    invariant(fn.length === 0, "`runInAction` expects a function without arguments");
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    return executeAction(actionName, fn, scope, undefined);
}
exports.runInAction = runInAction;
function isAction(thing) {
    return typeof thing === "function" && thing.isMobxAction === true;
}
exports.isAction = isAction;
function autorun(arg1, arg2, arg3) {
    var name, view, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        view = arg2;
        scope = arg3;
    }
    else if (typeof arg1 === "function") {
        name = arg1.name || ("Autorun@" + getNextId());
        view = arg1;
        scope = arg2;
    }
    assertUnwrapped(view, "autorun methods cannot have modifiers");
    invariant(typeof view === "function", "autorun expects a function");
    invariant(isAction(view) === false, "Warning: attempted to pass an action to autorun. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.");
    if (scope)
        view = view.bind(scope);
    var reaction = new Reaction(name, function () {
        this.track(reactionRunner);
    });
    function reactionRunner() {
        view(reaction);
    }
    reaction.schedule();
    return reaction.getDisposer();
}
exports.autorun = autorun;
function when(arg1, arg2, arg3, arg4) {
    var name, predicate, effect, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        predicate = arg2;
        effect = arg3;
        scope = arg4;
    }
    else if (typeof arg1 === "function") {
        name = ("When@" + getNextId());
        predicate = arg1;
        effect = arg2;
        scope = arg3;
    }
    var disposer = autorun(name, function (r) {
        if (predicate.call(scope)) {
            r.dispose();
            var prevUntracked = untrackedStart();
            effect.call(scope);
            untrackedEnd(prevUntracked);
        }
    });
    return disposer;
}
exports.when = when;
function autorunUntil(predicate, effect, scope) {
    deprecated("`autorunUntil` is deprecated, please use `when`.");
    return when.apply(null, arguments);
}
exports.autorunUntil = autorunUntil;
function autorunAsync(arg1, arg2, arg3, arg4) {
    var name, func, delay, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        func = arg2;
        delay = arg3;
        scope = arg4;
    }
    else if (typeof arg1 === "function") {
        name = arg1.name || ("AutorunAsync@" + getNextId());
        func = arg1;
        delay = arg2;
        scope = arg3;
    }
    invariant(isAction(func) === false, "Warning: attempted to pass an action to autorunAsync. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.");
    if (delay === void 0)
        delay = 1;
    if (scope)
        func = func.bind(scope);
    var isScheduled = false;
    var r = new Reaction(name, function () {
        if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                if (!r.isDisposed)
                    r.track(reactionRunner);
            }, delay);
        }
    });
    function reactionRunner() { func(r); }
    r.schedule();
    return r.getDisposer();
}
exports.autorunAsync = autorunAsync;
function reaction(arg1, arg2, arg3, arg4, arg5, arg6) {
    var name, expression, effect, fireImmediately, delay, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        expression = arg2;
        effect = arg3;
        fireImmediately = arg4;
        delay = arg5;
        scope = arg6;
    }
    else {
        name = arg1.name || arg2.name || ("Reaction@" + getNextId());
        expression = arg1;
        effect = arg2;
        fireImmediately = arg3;
        delay = arg4;
        scope = arg5;
    }
    if (fireImmediately === void 0)
        fireImmediately = false;
    if (delay === void 0)
        delay = 0;
    var _a = getValueModeFromValue(expression, ValueMode.Reference), valueMode = _a[0], unwrappedExpression = _a[1];
    var compareStructural = valueMode === ValueMode.Structure;
    if (scope) {
        unwrappedExpression = unwrappedExpression.bind(scope);
        effect = action(name, effect.bind(scope));
    }
    var firstTime = true;
    var isScheduled = false;
    var nextValue = undefined;
    var r = new Reaction(name, function () {
        if (delay < 1) {
            reactionRunner();
        }
        else if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                reactionRunner();
            }, delay);
        }
    });
    function reactionRunner() {
        if (r.isDisposed)
            return;
        var changed = false;
        r.track(function () {
            var v = unwrappedExpression(r);
            changed = valueDidChange(compareStructural, nextValue, v);
            nextValue = v;
        });
        if (firstTime && fireImmediately)
            effect(nextValue, r);
        if (!firstTime && changed === true)
            effect(nextValue, r);
        if (firstTime)
            firstTime = false;
    }
    r.schedule();
    return r.getDisposer();
}
exports.reaction = reaction;
var computedDecorator = createClassPropertyDecorator(function (target, name, _, decoratorArgs, originalDescriptor) {
    invariant(typeof originalDescriptor !== "undefined", "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'. It looks like it was used on a property.");
    var baseValue = originalDescriptor.get;
    var setter = originalDescriptor.set;
    invariant(typeof baseValue === "function", "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'");
    var compareStructural = false;
    if (decoratorArgs && decoratorArgs.length === 1 && decoratorArgs[0].asStructure === true)
        compareStructural = true;
    var adm = asObservableObject(target, undefined, ValueMode.Recursive);
    defineObservableProperty(adm, name, compareStructural ? asStructure(baseValue) : baseValue, false, setter);
}, function (name) {
    var observable = this.$mobx.values[name];
    if (observable === undefined)
        return undefined;
    return observable.get();
}, function (name, value) {
    this.$mobx.values[name].set(value);
}, false, true);
function computed(targetOrExpr, keyOrScopeOrSetter, baseDescriptor, options) {
    if ((typeof targetOrExpr === "function" || isModifierWrapper(targetOrExpr)) && arguments.length < 3) {
        if (typeof keyOrScopeOrSetter === "function")
            return computedExpr(targetOrExpr, keyOrScopeOrSetter, undefined);
        else
            return computedExpr(targetOrExpr, undefined, keyOrScopeOrSetter);
    }
    return computedDecorator.apply(null, arguments);
}
exports.computed = computed;
function computedExpr(expr, setter, scope) {
    var _a = getValueModeFromValue(expr, ValueMode.Recursive), mode = _a[0], value = _a[1];
    return new ComputedValue(value, scope, mode === ValueMode.Structure, value.name, setter);
}
function createTransformer(transformer, onCleanup) {
    invariant(typeof transformer === "function" && transformer.length === 1, "createTransformer expects a function that accepts one argument");
    var objectCache = {};
    var resetId = globalState.resetId;
    var Transformer = (function (_super) {
        __extends(Transformer, _super);
        function Transformer(sourceIdentifier, sourceObject) {
            _super.call(this, function () { return transformer(sourceObject); }, null, false, "Transformer-" + transformer.name + "-" + sourceIdentifier, undefined);
            this.sourceIdentifier = sourceIdentifier;
            this.sourceObject = sourceObject;
        }
        Transformer.prototype.onBecomeUnobserved = function () {
            var lastValue = this.value;
            _super.prototype.onBecomeUnobserved.call(this);
            delete objectCache[this.sourceIdentifier];
            if (onCleanup)
                onCleanup(lastValue, this.sourceObject);
        };
        return Transformer;
    }(ComputedValue));
    return function (object) {
        if (resetId !== globalState.resetId) {
            objectCache = {};
            resetId = globalState.resetId;
        }
        var identifier = getMemoizationId(object);
        var reactiveTransformer = objectCache[identifier];
        if (reactiveTransformer)
            return reactiveTransformer.get();
        reactiveTransformer = objectCache[identifier] = new Transformer(identifier, object);
        return reactiveTransformer.get();
    };
}
exports.createTransformer = createTransformer;
function getMemoizationId(object) {
    if (object === null || typeof object !== "object")
        throw new Error("[mobx] transform expected some kind of object, got: " + object);
    var tid = object.$transformId;
    if (tid === undefined) {
        tid = getNextId();
        addHiddenProp(object, "$transformId", tid);
    }
    return tid;
}
function expr(expr, scope) {
    if (!isComputingDerivation())
        console.warn("[mobx.expr] 'expr' should only be used inside other reactive functions.");
    return computed(expr, scope).get();
}
exports.expr = expr;
function extendObservable(target) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    invariant(arguments.length >= 2, "extendObservable expected 2 or more arguments");
    invariant(typeof target === "object", "extendObservable expects an object as first argument");
    invariant(!(isObservableMap(target)), "extendObservable should not be used on maps, use map.merge instead");
    properties.forEach(function (propSet) {
        invariant(typeof propSet === "object", "all arguments of extendObservable should be objects");
        invariant(!isObservable(propSet), "extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540");
        extendObservableHelper(target, propSet, ValueMode.Recursive, null);
    });
    return target;
}
exports.extendObservable = extendObservable;
function extendObservableHelper(target, properties, mode, name) {
    var adm = asObservableObject(target, name, mode);
    for (var key in properties)
        if (hasOwnProperty(properties, key)) {
            if (target === properties && !isPropertyConfigurable(target, key))
                continue;
            var descriptor = Object.getOwnPropertyDescriptor(properties, key);
            setObservableObjectInstanceProperty(adm, key, descriptor);
        }
    return target;
}
function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
}
function nodeToDependencyTree(node) {
    var result = {
        name: node.name
    };
    if (node.observing && node.observing.length > 0)
        result.dependencies = unique(node.observing).map(nodeToDependencyTree);
    return result;
}
function getObserverTree(thing, property) {
    return nodeToObserverTree(getAtom(thing, property));
}
function nodeToObserverTree(node) {
    var result = {
        name: node.name
    };
    if (hasObservers(node))
        result.observers = getObservers(node).map(nodeToObserverTree);
    return result;
}
function intercept(thing, propOrHandler, handler) {
    if (typeof handler === "function")
        return interceptProperty(thing, propOrHandler, handler);
    else
        return interceptInterceptable(thing, propOrHandler);
}
exports.intercept = intercept;
function interceptInterceptable(thing, handler) {
    if (isPlainObject(thing) && !isObservableObject(thing)) {
        deprecated("Passing plain objects to intercept / observe is deprecated and will be removed in 3.0");
        return getAdministration(observable(thing)).intercept(handler);
    }
    return getAdministration(thing).intercept(handler);
}
function interceptProperty(thing, property, handler) {
    if (isPlainObject(thing) && !isObservableObject(thing)) {
        deprecated("Passing plain objects to intercept / observe is deprecated and will be removed in 3.0");
        extendObservable(thing, {
            property: thing[property]
        });
        return interceptProperty(thing, property, handler);
    }
    return getAdministration(thing, property).intercept(handler);
}
function isComputed(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableObject(value) === false)
            return false;
        var atom = getAtom(value, property);
        return isComputedValue(atom);
    }
    return isComputedValue(value);
}
exports.isComputed = isComputed;
function isObservable(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableArray(value) || isObservableMap(value))
            throw new Error("[mobx.isObservable] isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
        else if (isObservableObject(value)) {
            var o = value.$mobx;
            return o.values && !!o.values[property];
        }
        return false;
    }
    return isObservableObject(value) || !!value.$mobx || isAtom(value) || isReaction(value) || isComputedValue(value);
}
exports.isObservable = isObservable;
var decoratorImpl = createClassPropertyDecorator(function (target, name, baseValue) {
    var prevA = allowStateChangesStart(true);
    if (typeof baseValue === "function")
        baseValue = asReference(baseValue);
    var adm = asObservableObject(target, undefined, ValueMode.Recursive);
    defineObservableProperty(adm, name, baseValue, true, undefined);
    allowStateChangesEnd(prevA);
}, function (name) {
    var observable = this.$mobx.values[name];
    if (observable === undefined)
        return undefined;
    return observable.get();
}, function (name, value) {
    setPropertyValue(this, name, value);
}, true, false);
function observableDecorator(target, key, baseDescriptor) {
    invariant(arguments.length >= 2 && arguments.length <= 3, "Illegal decorator config", key);
    assertPropertyConfigurable(target, key);
    invariant(!baseDescriptor || !baseDescriptor.get, "@observable can not be used on getters, use @computed instead");
    return decoratorImpl.apply(null, arguments);
}
function observable(v, keyOrScope) {
    if (v === void 0) { v = undefined; }
    if (typeof arguments[1] === "string")
        return observableDecorator.apply(null, arguments);
    invariant(arguments.length < 3, "observable expects zero, one or two arguments");
    if (isObservable(v))
        return v;
    var _a = getValueModeFromValue(v, ValueMode.Recursive), mode = _a[0], value = _a[1];
    var sourceType = mode === ValueMode.Reference ? ValueType.Reference : getTypeOfValue(value);
    switch (sourceType) {
        case ValueType.Array:
        case ValueType.PlainObject:
            return makeChildObservable(value, mode);
        case ValueType.Reference:
        case ValueType.ComplexObject:
            return new ObservableValue(value, mode);
        case ValueType.ComplexFunction:
            throw new Error("[mobx.observable] To be able to make a function reactive it should not have arguments. If you need an observable reference to a function, use `observable(asReference(f))`");
        case ValueType.ViewFunction:
            deprecated("Use `computed(expr)` instead of `observable(expr)`");
            return computed(v, keyOrScope);
    }
    invariant(false, "Illegal State");
}
exports.observable = observable;
var ValueType;
(function (ValueType) {
    ValueType[ValueType["Reference"] = 0] = "Reference";
    ValueType[ValueType["PlainObject"] = 1] = "PlainObject";
    ValueType[ValueType["ComplexObject"] = 2] = "ComplexObject";
    ValueType[ValueType["Array"] = 3] = "Array";
    ValueType[ValueType["ViewFunction"] = 4] = "ViewFunction";
    ValueType[ValueType["ComplexFunction"] = 5] = "ComplexFunction";
})(ValueType || (ValueType = {}));
function getTypeOfValue(value) {
    if (value === null || value === undefined)
        return ValueType.Reference;
    if (typeof value === "function")
        return value.length ? ValueType.ComplexFunction : ValueType.ViewFunction;
    if (isArrayLike(value))
        return ValueType.Array;
    if (typeof value === "object")
        return isPlainObject(value) ? ValueType.PlainObject : ValueType.ComplexObject;
    return ValueType.Reference;
}
function observe(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === "function")
        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
    else
        return observeObservable(thing, propOrCb, cbOrFire);
}
exports.observe = observe;
function observeObservable(thing, listener, fireImmediately) {
    if (isPlainObject(thing) && !isObservableObject(thing)) {
        deprecated("Passing plain objects to intercept / observe is deprecated and will be removed in 3.0");
        return getAdministration(observable(thing)).observe(listener, fireImmediately);
    }
    return getAdministration(thing).observe(listener, fireImmediately);
}
function observeObservableProperty(thing, property, listener, fireImmediately) {
    if (isPlainObject(thing) && !isObservableObject(thing)) {
        deprecated("Passing plain objects to intercept / observe is deprecated and will be removed in 3.0");
        extendObservable(thing, {
            property: thing[property]
        });
        return observeObservableProperty(thing, property, listener, fireImmediately);
    }
    return getAdministration(thing, property).observe(listener, fireImmediately);
}
function toJS(source, detectCycles, __alreadySeen) {
    if (detectCycles === void 0) { detectCycles = true; }
    if (__alreadySeen === void 0) { __alreadySeen = null; }
    function cache(value) {
        if (detectCycles)
            __alreadySeen.push([source, value]);
        return value;
    }
    if (isObservable(source)) {
        if (detectCycles && __alreadySeen === null)
            __alreadySeen = [];
        if (detectCycles && source !== null && typeof source === "object") {
            for (var i = 0, l = __alreadySeen.length; i < l; i++)
                if (__alreadySeen[i][0] === source)
                    return __alreadySeen[i][1];
        }
        if (isObservableArray(source)) {
            var res = cache([]);
            var toAdd = source.map(function (value) { return toJS(value, detectCycles, __alreadySeen); });
            res.length = toAdd.length;
            for (var i = 0, l = toAdd.length; i < l; i++)
                res[i] = toAdd[i];
            return res;
        }
        if (isObservableObject(source)) {
            var res = cache({});
            for (var key in source)
                res[key] = toJS(source[key], detectCycles, __alreadySeen);
            return res;
        }
        if (isObservableMap(source)) {
            var res_1 = cache({});
            source.forEach(function (value, key) { return res_1[key] = toJS(value, detectCycles, __alreadySeen); });
            return res_1;
        }
        if (isObservableValue(source))
            return toJS(source.get(), detectCycles, __alreadySeen);
    }
    return source;
}
exports.toJS = toJS;
function toJSlegacy(source, detectCycles, __alreadySeen) {
    if (detectCycles === void 0) { detectCycles = true; }
    if (__alreadySeen === void 0) { __alreadySeen = null; }
    deprecated("toJSlegacy is deprecated and will be removed in the next major. Use `toJS` instead. See #566");
    function cache(value) {
        if (detectCycles)
            __alreadySeen.push([source, value]);
        return value;
    }
    if (source instanceof Date || source instanceof RegExp)
        return source;
    if (detectCycles && __alreadySeen === null)
        __alreadySeen = [];
    if (detectCycles && source !== null && typeof source === "object") {
        for (var i = 0, l = __alreadySeen.length; i < l; i++)
            if (__alreadySeen[i][0] === source)
                return __alreadySeen[i][1];
    }
    if (!source)
        return source;
    if (isArrayLike(source)) {
        var res = cache([]);
        var toAdd = source.map(function (value) { return toJSlegacy(value, detectCycles, __alreadySeen); });
        res.length = toAdd.length;
        for (var i = 0, l = toAdd.length; i < l; i++)
            res[i] = toAdd[i];
        return res;
    }
    if (isObservableMap(source)) {
        var res_2 = cache({});
        source.forEach(function (value, key) { return res_2[key] = toJSlegacy(value, detectCycles, __alreadySeen); });
        return res_2;
    }
    if (isObservableValue(source))
        return toJSlegacy(source.get(), detectCycles, __alreadySeen);
    if (typeof source === "object") {
        var res = cache({});
        for (var key in source)
            res[key] = toJSlegacy(source[key], detectCycles, __alreadySeen);
        return res;
    }
    return source;
}
exports.toJSlegacy = toJSlegacy;
function toJSON(source, detectCycles, __alreadySeen) {
    if (detectCycles === void 0) { detectCycles = true; }
    if (__alreadySeen === void 0) { __alreadySeen = null; }
    deprecated("toJSON is deprecated. Use toJS instead");
    return toJSlegacy.apply(null, arguments);
}
exports.toJSON = toJSON;
function log(msg) {
    console.log(msg);
    return msg;
}
function whyRun(thing, prop) {
    switch (arguments.length) {
        case 0:
            thing = globalState.trackingDerivation;
            if (!thing)
                return log("whyRun() can only be used if a derivation is active, or by passing an computed value / reaction explicitly. If you invoked whyRun from inside a computation; the computation is currently suspended but re-evaluating because somebody requested it's value.");
            break;
        case 2:
            thing = getAtom(thing, prop);
            break;
    }
    thing = getAtom(thing);
    if (isComputedValue(thing))
        return log(thing.whyRun());
    else if (isReaction(thing))
        return log(thing.whyRun());
    else
        invariant(false, "whyRun can only be used on reactions and computed values");
}
exports.whyRun = whyRun;
function createAction(actionName, fn) {
    invariant(typeof fn === "function", "`action` can only be invoked on functions");
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    var res = function () {
        return executeAction(actionName, fn, this, arguments);
    };
    res.isMobxAction = true;
    return res;
}
function executeAction(actionName, fn, scope, args) {
    invariant(!isComputedValue(globalState.trackingDerivation), "Computed values or transformers should not invoke actions or trigger other side effects");
    var notifySpy = isSpyEnabled();
    var startTime;
    if (notifySpy) {
        startTime = Date.now();
        var l = (args && args.length) || 0;
        var flattendArgs = new Array(l);
        if (l > 0)
            for (var i = 0; i < l; i++)
                flattendArgs[i] = args[i];
        spyReportStart({
            type: "action",
            name: actionName,
            fn: fn,
            target: scope,
            arguments: flattendArgs
        });
    }
    var prevUntracked = untrackedStart();
    transactionStart(actionName, scope, false);
    var prevAllowStateChanges = allowStateChangesStart(true);
    try {
        return fn.apply(scope, args);
    }
    finally {
        allowStateChangesEnd(prevAllowStateChanges);
        transactionEnd(false);
        untrackedEnd(prevUntracked);
        if (notifySpy)
            spyReportEnd({ time: Date.now() - startTime });
    }
}
function useStrict(strict) {
    if (arguments.length === 0) {
        deprecated("`useStrict` without arguments is deprecated, use `isStrictModeEnabled()` instead");
        return globalState.strictMode;
    }
    else {
        invariant(globalState.trackingDerivation === null, "It is not allowed to set `useStrict` when a derivation is running");
        globalState.strictMode = strict;
        globalState.allowStateChanges = !strict;
    }
}
exports.useStrict = useStrict;
function isStrictModeEnabled() {
    return globalState.strictMode;
}
exports.isStrictModeEnabled = isStrictModeEnabled;
function allowStateChanges(allowStateChanges, func) {
    var prev = allowStateChangesStart(allowStateChanges);
    var res = func();
    allowStateChangesEnd(prev);
    return res;
}
function allowStateChangesStart(allowStateChanges) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
}
function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
}
var BaseAtom = (function () {
    function BaseAtom(name) {
        if (name === void 0) { name = "Atom@" + getNextId(); }
        this.name = name;
        this.isPendingUnobservation = true;
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.NOT_TRACKING;
    }
    BaseAtom.prototype.onBecomeUnobserved = function () {
    };
    BaseAtom.prototype.reportObserved = function () {
        reportObserved(this);
    };
    BaseAtom.prototype.reportChanged = function () {
        transactionStart("propagatingAtomChange", null, false);
        propagateChanged(this);
        transactionEnd(false);
    };
    BaseAtom.prototype.toString = function () {
        return this.name;
    };
    return BaseAtom;
}());
exports.BaseAtom = BaseAtom;
var Atom = (function (_super) {
    __extends(Atom, _super);
    function Atom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
        if (name === void 0) { name = "Atom@" + getNextId(); }
        if (onBecomeObservedHandler === void 0) { onBecomeObservedHandler = noop; }
        if (onBecomeUnobservedHandler === void 0) { onBecomeUnobservedHandler = noop; }
        _super.call(this, name);
        this.name = name;
        this.onBecomeObservedHandler = onBecomeObservedHandler;
        this.onBecomeUnobservedHandler = onBecomeUnobservedHandler;
        this.isPendingUnobservation = false;
        this.isBeingTracked = false;
    }
    Atom.prototype.reportObserved = function () {
        startBatch();
        _super.prototype.reportObserved.call(this);
        if (!this.isBeingTracked) {
            this.isBeingTracked = true;
            this.onBecomeObservedHandler();
        }
        endBatch();
        return !!globalState.trackingDerivation;
    };
    Atom.prototype.onBecomeUnobserved = function () {
        this.isBeingTracked = false;
        this.onBecomeUnobservedHandler();
    };
    return Atom;
}(BaseAtom));
exports.Atom = Atom;
var isAtom = createInstanceofPredicate("Atom", BaseAtom);
var ComputedValue = (function () {
    function ComputedValue(derivation, scope, compareStructural, name, setter) {
        this.derivation = derivation;
        this.scope = scope;
        this.compareStructural = compareStructural;
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.observing = [];
        this.newObserving = null;
        this.isPendingUnobservation = false;
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.runId = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.UP_TO_DATE;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.value = undefined;
        this.isComputing = false;
        this.isRunningSetter = false;
        this.name = name || "ComputedValue@" + getNextId();
        if (setter)
            this.setter = createAction(name + "-setter", setter);
    }
    ComputedValue.prototype.peek = function () {
        this.isComputing = true;
        var prevAllowStateChanges = allowStateChangesStart(false);
        var res = this.derivation.call(this.scope);
        allowStateChangesEnd(prevAllowStateChanges);
        this.isComputing = false;
        return res;
    };
    ;
    ComputedValue.prototype.peekUntracked = function () {
        var hasError = true;
        try {
            var res = this.peek();
            hasError = false;
            return res;
        }
        finally {
            if (hasError)
                handleExceptionInDerivation(this);
        }
    };
    ComputedValue.prototype.onBecomeStale = function () {
        propagateMaybeChanged(this);
    };
    ComputedValue.prototype.onBecomeUnobserved = function () {
        invariant(this.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR only onBecomeUnobserved shouldn't be called twice in a row");
        clearObserving(this);
        this.value = undefined;
    };
    ComputedValue.prototype.get = function () {
        invariant(!this.isComputing, "Cycle detected in computation " + this.name, this.derivation);
        startBatch();
        if (globalState.inBatch === 1) {
            if (shouldCompute(this))
                this.value = this.peekUntracked();
        }
        else {
            reportObserved(this);
            if (shouldCompute(this))
                if (this.trackAndCompute())
                    propagateChangeConfirmed(this);
        }
        var result = this.value;
        endBatch();
        return result;
    };
    ComputedValue.prototype.recoverFromError = function () {
        this.isComputing = false;
    };
    ComputedValue.prototype.set = function (value) {
        if (this.setter) {
            invariant(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
            this.isRunningSetter = true;
            try {
                this.setter.call(this.scope, value);
            }
            finally {
                this.isRunningSetter = false;
            }
        }
        else
            invariant(false, "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
    };
    ComputedValue.prototype.trackAndCompute = function () {
        if (isSpyEnabled()) {
            spyReport({
                object: this,
                type: "compute",
                fn: this.derivation,
                target: this.scope
            });
        }
        var oldValue = this.value;
        var newValue = this.value = trackDerivedFunction(this, this.peek);
        return valueDidChange(this.compareStructural, newValue, oldValue);
    };
    ComputedValue.prototype.observe = function (listener, fireImmediately) {
        var _this = this;
        var firstTime = true;
        var prevValue = undefined;
        return autorun(function () {
            var newValue = _this.get();
            if (!firstTime || fireImmediately) {
                var prevU = untrackedStart();
                listener(newValue, prevValue);
                untrackedEnd(prevU);
            }
            firstTime = false;
            prevValue = newValue;
        });
    };
    ComputedValue.prototype.toJSON = function () {
        return this.get();
    };
    ComputedValue.prototype.toString = function () {
        return this.name + "[" + this.derivation.toString() + "]";
    };
    ComputedValue.prototype.whyRun = function () {
        var isTracking = Boolean(globalState.trackingDerivation);
        var observing = unique(this.isComputing ? this.newObserving : this.observing).map(function (dep) { return dep.name; });
        var observers = unique(getObservers(this).map(function (dep) { return dep.name; }));
        return (("\nWhyRun? computation '" + this.name + "':\n * Running because: " + (isTracking ? "[active] the value of this computation is needed by a reaction" : this.isComputing ? "[get] The value of this computed was requested outside a reaction" : "[idle] not running at the moment") + "\n") +
            (this.dependenciesState === IDerivationState.NOT_TRACKING
                ?
                    " * This computation is suspended (not in use by any reaction) and won't run automatically.\n\tDidn't expect this computation to be suspended at this point?\n\t  1. Make sure this computation is used by a reaction (reaction, autorun, observer).\n\t  2. Check whether you are using this computation synchronously (in the same stack as they reaction that needs it).\n"
                :
                    " * This computation will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + ((this.isComputing && isTracking) ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\tMissing items in this list?\n\t  1. Check whether all used values are properly marked as observable (use isObservable to verify)\n\t  2. Make sure you didn't dereference values too early. MobX observes props, not primitives. E.g: use 'person.name' instead of 'name' in your computation.\n  * If the outcome of this computation changes, the following observers will be re-run:\n    " + joinStrings(observers) + "\n"));
    };
    return ComputedValue;
}());
var isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);
var IDerivationState;
(function (IDerivationState) {
    IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING";
    IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
    IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
})(IDerivationState || (IDerivationState = {}));
exports.IDerivationState = IDerivationState;
function shouldCompute(derivation) {
    switch (derivation.dependenciesState) {
        case IDerivationState.UP_TO_DATE: return false;
        case IDerivationState.NOT_TRACKING:
        case IDerivationState.STALE: return true;
        case IDerivationState.POSSIBLY_STALE: {
            var hasError = true;
            var prevUntracked = untrackedStart();
            try {
                var obs = derivation.observing, l = obs.length;
                for (var i = 0; i < l; i++) {
                    var obj = obs[i];
                    if (isComputedValue(obj)) {
                        obj.get();
                        if (derivation.dependenciesState === IDerivationState.STALE) {
                            hasError = false;
                            untrackedEnd(prevUntracked);
                            return true;
                        }
                    }
                }
                hasError = false;
                changeDependenciesStateTo0(derivation);
                untrackedEnd(prevUntracked);
                return false;
            }
            finally {
                if (hasError) {
                    changeDependenciesStateTo0(derivation);
                }
            }
        }
    }
}
function isComputingDerivation() {
    return globalState.trackingDerivation !== null;
}
function checkIfStateModificationsAreAllowed() {
    if (!globalState.allowStateChanges) {
        invariant(false, globalState.strictMode
            ? "It is not allowed to create or change state outside an `action` when MobX is in strict mode. Wrap the current method in `action` if this state change is intended"
            : "It is not allowed to change the state when a computed value or transformer is being evaluated. Use 'autorun' to create reactive functions with side-effects.");
    }
}
function trackDerivedFunction(derivation, f) {
    changeDependenciesStateTo0(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState.runId;
    var prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    var hasException = true;
    var result;
    try {
        result = f.call(derivation);
        hasException = false;
    }
    finally {
        if (hasException) {
            handleExceptionInDerivation(derivation);
        }
        else {
            globalState.trackingDerivation = prevTracking;
            bindDependencies(derivation);
        }
    }
    return result;
}
function handleExceptionInDerivation(derivation) {
    var message = ("[mobx] An uncaught exception occurred while calculating your computed value, autorun or transformer. Or inside the render() method of an observer based React component. " +
        "These functions should never throw exceptions as MobX will not always be able to recover from them. " +
        ("Please fix the error reported after this message or enable 'Pause on (caught) exceptions' in your debugger to find the root cause. In: '" + derivation.name + "'. ") +
        "For more details see https://github.com/mobxjs/mobx/issues/462");
    if (isSpyEnabled()) {
        spyReport({
            type: "error",
            message: message
        });
    }
    console.warn(message);
    changeDependenciesStateTo0(derivation);
    derivation.newObserving = null;
    derivation.unboundDepsCount = 0;
    derivation.recoverFromError();
    endBatch();
    resetGlobalState();
}
function bindDependencies(derivation) {
    var prevObserving = derivation.observing;
    var observing = derivation.observing = derivation.newObserving;
    derivation.newObserving = null;
    var i0 = 0, l = derivation.unboundDepsCount;
    for (var i = 0; i < l; i++) {
        var dep = observing[i];
        if (dep.diffValue === 0) {
            dep.diffValue = 1;
            if (i0 !== i)
                observing[i0] = dep;
            i0++;
        }
    }
    observing.length = i0;
    l = prevObserving.length;
    while (l--) {
        var dep = prevObserving[l];
        if (dep.diffValue === 0) {
            removeObserver(dep, derivation);
        }
        dep.diffValue = 0;
    }
    while (i0--) {
        var dep = observing[i0];
        if (dep.diffValue === 1) {
            dep.diffValue = 0;
            addObserver(dep, derivation);
        }
    }
}
function clearObserving(derivation) {
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
        removeObserver(obs[i], derivation);
    derivation.dependenciesState = IDerivationState.NOT_TRACKING;
    obs.length = 0;
}
function untracked(action) {
    var prev = untrackedStart();
    var res = action();
    untrackedEnd(prev);
    return res;
}
exports.untracked = untracked;
function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
}
function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
}
function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState === IDerivationState.UP_TO_DATE)
        return;
    derivation.dependenciesState = IDerivationState.UP_TO_DATE;
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
        obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
}
var persistentKeys = ["mobxGuid", "resetId", "spyListeners", "strictMode", "runId"];
var MobXGlobals = (function () {
    function MobXGlobals() {
        this.version = 4;
        this.trackingDerivation = null;
        this.runId = 0;
        this.mobxGuid = 0;
        this.inTransaction = 0;
        this.isRunningReactions = false;
        this.inBatch = 0;
        this.pendingUnobservations = [];
        this.pendingReactions = [];
        this.allowStateChanges = true;
        this.strictMode = false;
        this.resetId = 0;
        this.spyListeners = [];
    }
    return MobXGlobals;
}());
var globalState = (function () {
    var res = new MobXGlobals();
    if (global.__mobservableTrackingStack || global.__mobservableViewStack)
        throw new Error("[mobx] An incompatible version of mobservable is already loaded.");
    if (global.__mobxGlobal && global.__mobxGlobal.version !== res.version)
        throw new Error("[mobx] An incompatible version of mobx is already loaded.");
    if (global.__mobxGlobal)
        return global.__mobxGlobal;
    return global.__mobxGlobal = res;
})();
function registerGlobals() {
}
function resetGlobalState() {
    globalState.resetId++;
    var defaultGlobals = new MobXGlobals();
    for (var key in defaultGlobals)
        if (persistentKeys.indexOf(key) === -1)
            globalState[key] = defaultGlobals[key];
    globalState.allowStateChanges = !globalState.strictMode;
}
function hasObservers(observable) {
    return observable.observers && observable.observers.length > 0;
}
function getObservers(observable) {
    return observable.observers;
}
function invariantObservers(observable) {
    var list = observable.observers;
    var map = observable.observersIndexes;
    var l = list.length;
    for (var i = 0; i < l; i++) {
        var id = list[i].__mapid;
        if (i) {
            invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list");
        }
        else {
            invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldnt be held in map.");
        }
    }
    invariant(list.length === 0 || Object.keys(map).length === list.length - 1, "INTERNAL ERROR there is no junk in map");
}
function addObserver(observable, node) {
    var l = observable.observers.length;
    if (l) {
        observable.observersIndexes[node.__mapid] = l;
    }
    observable.observers[l] = node;
    if (observable.lowestObserverState > node.dependenciesState)
        observable.lowestObserverState = node.dependenciesState;
}
function removeObserver(observable, node) {
    if (observable.observers.length === 1) {
        observable.observers.length = 0;
        queueForUnobservation(observable);
    }
    else {
        var list = observable.observers;
        var map_1 = observable.observersIndexes;
        var filler = list.pop();
        if (filler !== node) {
            var index = map_1[node.__mapid] || 0;
            if (index) {
                map_1[filler.__mapid] = index;
            }
            else {
                delete map_1[filler.__mapid];
            }
            list[index] = filler;
        }
        delete map_1[node.__mapid];
    }
}
function queueForUnobservation(observable) {
    if (!observable.isPendingUnobservation) {
        observable.isPendingUnobservation = true;
        globalState.pendingUnobservations.push(observable);
    }
}
function startBatch() {
    globalState.inBatch++;
}
function endBatch() {
    if (globalState.inBatch === 1) {
        var list = globalState.pendingUnobservations;
        for (var i = 0; i < list.length; i++) {
            var observable_1 = list[i];
            observable_1.isPendingUnobservation = false;
            if (observable_1.observers.length === 0) {
                observable_1.onBecomeUnobserved();
            }
        }
        globalState.pendingUnobservations = [];
    }
    globalState.inBatch--;
}
function reportObserved(observable) {
    var derivation = globalState.trackingDerivation;
    if (derivation !== null) {
        if (derivation.runId !== observable.lastAccessedBy) {
            observable.lastAccessedBy = derivation.runId;
            derivation.newObserving[derivation.unboundDepsCount++] = observable;
        }
    }
    else if (observable.observers.length === 0) {
        queueForUnobservation(observable);
    }
}
function invariantLOS(observable, msg) {
    var min = getObservers(observable).reduce(function (a, b) { return Math.min(a, b.dependenciesState); }, 2);
    if (min >= observable.lowestObserverState)
        return;
    throw new Error("lowestObserverState is wrong for " + msg + " because " + min + " < " + observable.lowestObserverState);
}
function propagateChanged(observable) {
    if (observable.lowestObserverState === IDerivationState.STALE)
        return;
    observable.lowestObserverState = IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.UP_TO_DATE)
            d.onBecomeStale();
        d.dependenciesState = IDerivationState.STALE;
    }
}
function propagateChangeConfirmed(observable) {
    if (observable.lowestObserverState === IDerivationState.STALE)
        return;
    observable.lowestObserverState = IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.POSSIBLY_STALE)
            d.dependenciesState = IDerivationState.STALE;
        else if (d.dependenciesState === IDerivationState.UP_TO_DATE)
            observable.lowestObserverState = IDerivationState.UP_TO_DATE;
    }
}
function propagateMaybeChanged(observable) {
    if (observable.lowestObserverState !== IDerivationState.UP_TO_DATE)
        return;
    observable.lowestObserverState = IDerivationState.POSSIBLY_STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
            d.dependenciesState = IDerivationState.POSSIBLY_STALE;
            d.onBecomeStale();
        }
    }
}
var Reaction = (function () {
    function Reaction(name, onInvalidate) {
        if (name === void 0) { name = "Reaction@" + getNextId(); }
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.observing = [];
        this.newObserving = [];
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
    }
    Reaction.prototype.onBecomeStale = function () {
        this.schedule();
    };
    Reaction.prototype.schedule = function () {
        if (!this._isScheduled) {
            this._isScheduled = true;
            globalState.pendingReactions.push(this);
            startBatch();
            runReactions();
            endBatch();
        }
    };
    Reaction.prototype.isScheduled = function () {
        return this._isScheduled;
    };
    Reaction.prototype.runReaction = function () {
        if (!this.isDisposed) {
            this._isScheduled = false;
            if (shouldCompute(this)) {
                this._isTrackPending = true;
                this.onInvalidate();
                if (this._isTrackPending && isSpyEnabled()) {
                    spyReport({
                        object: this,
                        type: "scheduled-reaction"
                    });
                }
            }
        }
    };
    Reaction.prototype.track = function (fn) {
        startBatch();
        var notify = isSpyEnabled();
        var startTime;
        if (notify) {
            startTime = Date.now();
            spyReportStart({
                object: this,
                type: "reaction",
                fn: fn
            });
        }
        this._isRunning = true;
        trackDerivedFunction(this, fn);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            clearObserving(this);
        }
        if (notify) {
            spyReportEnd({
                time: Date.now() - startTime
            });
        }
        endBatch();
    };
    Reaction.prototype.recoverFromError = function () {
        this._isRunning = false;
        this._isTrackPending = false;
    };
    Reaction.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                startBatch();
                clearObserving(this);
                endBatch();
            }
        }
    };
    Reaction.prototype.getDisposer = function () {
        var r = this.dispose.bind(this);
        r.$mobx = this;
        return r;
    };
    Reaction.prototype.toString = function () {
        return "Reaction[" + this.name + "]";
    };
    Reaction.prototype.whyRun = function () {
        var observing = unique(this._isRunning ? this.newObserving : this.observing).map(function (dep) { return dep.name; });
        return ("\nWhyRun? reaction '" + this.name + "':\n * Status: [" + (this.isDisposed ? "stopped" : this._isRunning ? "running" : this.isScheduled() ? "scheduled" : "idle") + "]\n * This reaction will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + ((this._isRunning) ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\tMissing items in this list?\n\t  1. Check whether all used values are properly marked as observable (use isObservable to verify)\n\t  2. Make sure you didn't dereference values too early. MobX observes props, not primitives. E.g: use 'person.name' instead of 'name' in your computation.\n");
    };
    return Reaction;
}());
exports.Reaction = Reaction;
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function (f) { return f(); };
function runReactions() {
    if (globalState.isRunningReactions === true || globalState.inTransaction > 0)
        return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0;
    while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
            resetGlobalState();
            throw new Error(("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations.")
                + (" Probably there is a cycle in the reactive function: " + allReactions[0]));
        }
        var remainingReactions = allReactions.splice(0);
        for (var i = 0, l = remainingReactions.length; i < l; i++)
            remainingReactions[i].runReaction();
    }
    globalState.isRunningReactions = false;
}
var isReaction = createInstanceofPredicate("Reaction", Reaction);
function setReactionScheduler(fn) {
    var baseScheduler = reactionScheduler;
    reactionScheduler = function (f) { return fn(function () { return baseScheduler(f); }); };
}
function isSpyEnabled() {
    return !!globalState.spyListeners.length;
}
function spyReport(event) {
    if (!globalState.spyListeners.length)
        return false;
    var listeners = globalState.spyListeners;
    for (var i = 0, l = listeners.length; i < l; i++)
        listeners[i](event);
}
function spyReportStart(event) {
    var change = objectAssign({}, event, { spyReportStart: true });
    spyReport(change);
}
var END_EVENT = { spyReportEnd: true };
function spyReportEnd(change) {
    if (change)
        spyReport(objectAssign({}, change, END_EVENT));
    else
        spyReport(END_EVENT);
}
function spy(listener) {
    globalState.spyListeners.push(listener);
    return once(function () {
        var idx = globalState.spyListeners.indexOf(listener);
        if (idx !== -1)
            globalState.spyListeners.splice(idx, 1);
    });
}
exports.spy = spy;
function trackTransitions(onReport) {
    deprecated("trackTransitions is deprecated. Use mobx.spy instead");
    if (typeof onReport === "boolean") {
        deprecated("trackTransitions only takes a single callback function. If you are using the mobx-react-devtools, please update them first");
        onReport = arguments[1];
    }
    if (!onReport) {
        deprecated("trackTransitions without callback has been deprecated and is a no-op now. If you are using the mobx-react-devtools, please update them first");
        return function () { };
    }
    return spy(onReport);
}
function transaction(action, thisArg, report) {
    if (thisArg === void 0) { thisArg = undefined; }
    if (report === void 0) { report = true; }
    transactionStart((action.name) || "anonymous transaction", thisArg, report);
    try {
        return action.call(thisArg);
    }
    finally {
        transactionEnd(report);
    }
}
exports.transaction = transaction;
function transactionStart(name, thisArg, report) {
    if (thisArg === void 0) { thisArg = undefined; }
    if (report === void 0) { report = true; }
    startBatch();
    globalState.inTransaction += 1;
    if (report && isSpyEnabled()) {
        spyReportStart({
            type: "transaction",
            target: thisArg,
            name: name
        });
    }
}
function transactionEnd(report) {
    if (report === void 0) { report = true; }
    if (--globalState.inTransaction === 0) {
        runReactions();
    }
    if (report && isSpyEnabled())
        spyReportEnd();
    endBatch();
}
function hasInterceptors(interceptable) {
    return (interceptable.interceptors && interceptable.interceptors.length > 0);
}
function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once(function () {
        var idx = interceptors.indexOf(handler);
        if (idx !== -1)
            interceptors.splice(idx, 1);
    });
}
function interceptChange(interceptable, change) {
    var prevU = untrackedStart();
    try {
        var interceptors = interceptable.interceptors;
        for (var i = 0, l = interceptors.length; i < l; i++) {
            change = interceptors[i](change);
            invariant(!change || change.type, "Intercept handlers should return nothing or a change object");
            if (!change)
                break;
        }
        return change;
    }
    finally {
        untrackedEnd(prevU);
    }
}
function hasListeners(listenable) {
    return listenable.changeListeners && listenable.changeListeners.length > 0;
}
function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once(function () {
        var idx = listeners.indexOf(handler);
        if (idx !== -1)
            listeners.splice(idx, 1);
    });
}
function notifyListeners(listenable, change) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners;
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
        if (Array.isArray(change)) {
            listeners[i].apply(null, change);
        }
        else {
            listeners[i](change);
        }
    }
    untrackedEnd(prevU);
}
var ValueMode;
(function (ValueMode) {
    ValueMode[ValueMode["Recursive"] = 0] = "Recursive";
    ValueMode[ValueMode["Reference"] = 1] = "Reference";
    ValueMode[ValueMode["Structure"] = 2] = "Structure";
    ValueMode[ValueMode["Flat"] = 3] = "Flat";
})(ValueMode || (ValueMode = {}));
exports.ValueMode = ValueMode;
function withModifier(modifier, value) {
    assertUnwrapped(value, "Modifiers are not allowed to be nested");
    return {
        mobxModifier: modifier,
        value: value
    };
}
function getModifier(value) {
    if (value) {
        return value.mobxModifier || null;
    }
    return null;
}
function asReference(value) {
    return withModifier(ValueMode.Reference, value);
}
exports.asReference = asReference;
asReference.mobxModifier = ValueMode.Reference;
function asStructure(value) {
    return withModifier(ValueMode.Structure, value);
}
exports.asStructure = asStructure;
asStructure.mobxModifier = ValueMode.Structure;
function asFlat(value) {
    return withModifier(ValueMode.Flat, value);
}
exports.asFlat = asFlat;
asFlat.mobxModifier = ValueMode.Flat;
function asMap(data, modifierFunc) {
    return map(data, modifierFunc);
}
exports.asMap = asMap;
function getValueModeFromValue(value, defaultMode) {
    var mode = getModifier(value);
    if (mode)
        return [mode, value.value];
    return [defaultMode, value];
}
function getValueModeFromModifierFunc(func) {
    if (func === undefined)
        return ValueMode.Recursive;
    var mod = getModifier(func);
    invariant(mod !== null, "Cannot determine value mode from function. Please pass in one of these: mobx.asReference, mobx.asStructure or mobx.asFlat, got: " + func);
    return mod;
}
function isModifierWrapper(value) {
    return value.mobxModifier !== undefined;
}
function makeChildObservable(value, parentMode, name) {
    var childMode;
    if (isObservable(value))
        return value;
    switch (parentMode) {
        case ValueMode.Reference:
            return value;
        case ValueMode.Flat:
            assertUnwrapped(value, "Items inside 'asFlat' cannot have modifiers");
            childMode = ValueMode.Reference;
            break;
        case ValueMode.Structure:
            assertUnwrapped(value, "Items inside 'asStructure' cannot have modifiers");
            childMode = ValueMode.Structure;
            break;
        case ValueMode.Recursive:
            _a = getValueModeFromValue(value, ValueMode.Recursive), childMode = _a[0], value = _a[1];
            break;
        default:
            invariant(false, "Illegal State");
    }
    if (Array.isArray(value))
        return createObservableArray(value, childMode, name);
    if (isPlainObject(value) && Object.isExtensible(value))
        return extendObservableHelper(value, value, childMode, name);
    return value;
    var _a;
}
function assertUnwrapped(value, message) {
    if (getModifier(value) !== null)
        throw new Error("[mobx] asStructure / asReference / asFlat cannot be used here. " + message);
}
var safariPrototypeSetterInheritanceBug = (function () {
    var v = false;
    var p = {};
    Object.defineProperty(p, "0", { set: function () { v = true; } });
    Object.create(p)["0"] = 1;
    return v === false;
})();
var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
var StubArray = (function () {
    function StubArray() {
    }
    return StubArray;
}());
StubArray.prototype = [];
var ObservableArrayAdministration = (function () {
    function ObservableArrayAdministration(name, mode, array, owned) {
        this.mode = mode;
        this.array = array;
        this.owned = owned;
        this.lastKnownLength = 0;
        this.interceptors = null;
        this.changeListeners = null;
        this.atom = new BaseAtom(name || ("ObservableArray@" + getNextId()));
    }
    ObservableArrayAdministration.prototype.makeReactiveArrayItem = function (value) {
        assertUnwrapped(value, "Array values cannot have modifiers");
        if (this.mode === ValueMode.Flat || this.mode === ValueMode.Reference)
            return value;
        return makeChildObservable(value, this.mode, this.atom.name + "[..]");
    };
    ObservableArrayAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        if (fireImmediately) {
            listener({
                object: this.array,
                type: "splice",
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
            });
        }
        return registerListener(this, listener);
    };
    ObservableArrayAdministration.prototype.getArrayLength = function () {
        this.atom.reportObserved();
        return this.values.length;
    };
    ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
        if (typeof newLength !== "number" || newLength < 0)
            throw new Error("[mobx.array] Out of range: " + newLength);
        var currentLength = this.values.length;
        if (newLength === currentLength)
            return;
        else if (newLength > currentLength)
            this.spliceWithArray(currentLength, 0, new Array(newLength - currentLength));
        else
            this.spliceWithArray(newLength, currentLength - newLength);
    };
    ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
        if (oldLength !== this.lastKnownLength)
            throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed. Did you use peek() to change it?");
        this.lastKnownLength += delta;
        if (delta > 0 && oldLength + delta + 1 > OBSERVABLE_ARRAY_BUFFER_SIZE)
            reserveArrayBuffer(oldLength + delta + 1);
    };
    ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        checkIfStateModificationsAreAllowed();
        var length = this.values.length;
        if (index === undefined)
            index = 0;
        else if (index > length)
            index = length;
        else if (index < 0)
            index = Math.max(0, length + index);
        if (arguments.length === 1)
            deleteCount = length - index;
        else if (deleteCount === undefined || deleteCount === null)
            deleteCount = 0;
        else
            deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        if (newItems === undefined)
            newItems = [];
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this.array,
                type: "splice",
                index: index,
                removedCount: deleteCount,
                added: newItems
            });
            if (!change)
                return EMPTY_ARRAY;
            deleteCount = change.removedCount;
            newItems = change.added;
        }
        newItems = newItems.map(this.makeReactiveArrayItem, this);
        var lengthDelta = newItems.length - deleteCount;
        this.updateArrayLength(length, lengthDelta);
        var res = (_a = this.values).splice.apply(_a, [index, deleteCount].concat(newItems));
        if (deleteCount !== 0 || newItems.length !== 0)
            this.notifyArraySplice(index, newItems, res);
        return res;
        var _a;
    };
    ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "update",
            index: index, newValue: newValue, oldValue: oldValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        this.atom.reportChanged();
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "splice",
            index: index, removed: removed, added: added,
            removedCount: removed.length,
            addedCount: added.length
        } : null;
        if (notifySpy)
            spyReportStart(change);
        this.atom.reportChanged();
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    return ObservableArrayAdministration;
}());
var ObservableArray = (function (_super) {
    __extends(ObservableArray, _super);
    function ObservableArray(initialValues, mode, name, owned) {
        if (owned === void 0) { owned = false; }
        _super.call(this);
        var adm = new ObservableArrayAdministration(name, mode, this, owned);
        addHiddenFinalProp(this, "$mobx", adm);
        if (initialValues && initialValues.length) {
            adm.updateArrayLength(0, initialValues.length);
            adm.values = initialValues.map(adm.makeReactiveArrayItem, adm);
            adm.notifyArraySplice(0, adm.values.slice(), EMPTY_ARRAY);
        }
        else {
            adm.values = [];
        }
        if (safariPrototypeSetterInheritanceBug) {
            Object.defineProperty(adm.array, "0", ENTRY_0);
        }
    }
    ObservableArray.prototype.intercept = function (handler) {
        return this.$mobx.intercept(handler);
    };
    ObservableArray.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        return this.$mobx.observe(listener, fireImmediately);
    };
    ObservableArray.prototype.clear = function () {
        return this.splice(0);
    };
    ObservableArray.prototype.concat = function () {
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i - 0] = arguments[_i];
        }
        this.$mobx.atom.reportObserved();
        return Array.prototype.concat.apply(this.slice(), arrays.map(function (a) { return isObservableArray(a) ? a.slice() : a; }));
    };
    ObservableArray.prototype.replace = function (newItems) {
        return this.$mobx.spliceWithArray(0, this.$mobx.values.length, newItems);
    };
    ObservableArray.prototype.toJS = function () {
        return this.slice();
    };
    ObservableArray.prototype.toJSON = function () {
        return this.toJS();
    };
    ObservableArray.prototype.peek = function () {
        return this.$mobx.values;
    };
    ObservableArray.prototype.find = function (predicate, thisArg, fromIndex) {
        if (fromIndex === void 0) { fromIndex = 0; }
        this.$mobx.atom.reportObserved();
        var items = this.$mobx.values, l = items.length;
        for (var i = fromIndex; i < l; i++)
            if (predicate.call(thisArg, items[i], i, this))
                return items[i];
        return undefined;
    };
    ObservableArray.prototype.splice = function (index, deleteCount) {
        var newItems = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            newItems[_i - 2] = arguments[_i];
        }
        switch (arguments.length) {
            case 0:
                return [];
            case 1:
                return this.$mobx.spliceWithArray(index);
            case 2:
                return this.$mobx.spliceWithArray(index, deleteCount);
        }
        return this.$mobx.spliceWithArray(index, deleteCount, newItems);
    };
    ObservableArray.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(adm.values.length, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.pop = function () {
        return this.splice(Math.max(this.$mobx.values.length - 1, 0), 1)[0];
    };
    ObservableArray.prototype.shift = function () {
        return this.splice(0, 1)[0];
    };
    ObservableArray.prototype.unshift = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(0, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.reverse = function () {
        this.$mobx.atom.reportObserved();
        var clone = this.slice();
        return clone.reverse.apply(clone, arguments);
    };
    ObservableArray.prototype.sort = function (compareFn) {
        this.$mobx.atom.reportObserved();
        var clone = this.slice();
        return clone.sort.apply(clone, arguments);
    };
    ObservableArray.prototype.remove = function (value) {
        var idx = this.$mobx.values.indexOf(value);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        }
        return false;
    };
    ObservableArray.prototype.move = function (fromIndex, toIndex) {
        function checkIndex(index) {
            if (index < 0) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is negative");
            }
            var length = this.$mobx.values.length;
            if (index >= length) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is not smaller than " + length);
            }
        }
        checkIndex.call(this, fromIndex);
        checkIndex.call(this, toIndex);
        if (fromIndex === toIndex) {
            return;
        }
        var oldItems = this.$mobx.values;
        var newItems;
        if (fromIndex < toIndex) {
            newItems = oldItems.slice(0, fromIndex).concat(oldItems.slice(fromIndex + 1, toIndex + 1), [oldItems[fromIndex]], oldItems.slice(toIndex + 1));
        }
        else {
            newItems = oldItems.slice(0, toIndex).concat([oldItems[fromIndex]], oldItems.slice(toIndex, fromIndex), oldItems.slice(fromIndex + 1));
        }
        this.replace(newItems);
    };
    ObservableArray.prototype.toString = function () {
        return "[mobx.array] " + Array.prototype.toString.apply(this.$mobx.values, arguments);
    };
    ObservableArray.prototype.toLocaleString = function () {
        return "[mobx.array] " + Array.prototype.toLocaleString.apply(this.$mobx.values, arguments);
    };
    return ObservableArray;
}(StubArray));
declareIterator(ObservableArray.prototype, function () {
    return arrayAsIterator(this.slice());
});
makeNonEnumerable(ObservableArray.prototype, [
    "constructor",
    "intercept",
    "observe",
    "clear",
    "concat",
    "replace",
    "toJS",
    "toJSON",
    "peek",
    "find",
    "splice",
    "push",
    "pop",
    "shift",
    "unshift",
    "reverse",
    "sort",
    "remove",
    "move",
    "toString",
    "toLocaleString"
]);
Object.defineProperty(ObservableArray.prototype, "length", {
    enumerable: false,
    configurable: true,
    get: function () {
        return this.$mobx.getArrayLength();
    },
    set: function (newLength) {
        this.$mobx.setArrayLength(newLength);
    }
});
[
    "every",
    "filter",
    "forEach",
    "indexOf",
    "join",
    "lastIndexOf",
    "map",
    "reduce",
    "reduceRight",
    "slice",
    "some"
].forEach(function (funcName) {
    var baseFunc = Array.prototype[funcName];
    invariant(typeof baseFunc === "function", "Base function not defined on Array prototype: '" + funcName + "'");
    addHiddenProp(ObservableArray.prototype, funcName, function () {
        this.$mobx.atom.reportObserved();
        return baseFunc.apply(this.$mobx.values, arguments);
    });
});
var ENTRY_0 = {
    configurable: true,
    enumerable: false,
    set: createArraySetter(0),
    get: createArrayGetter(0)
};
function createArrayBufferItem(index) {
    var set = createArraySetter(index);
    var get = createArrayGetter(index);
    Object.defineProperty(ObservableArray.prototype, "" + index, {
        enumerable: false,
        configurable: true,
        set: set, get: get
    });
}
function createArraySetter(index) {
    return function (newValue) {
        var adm = this.$mobx;
        var values = adm.values;
        assertUnwrapped(newValue, "Modifiers cannot be used on array values. For non-reactive array values use makeReactive(asFlat(array)).");
        if (index < values.length) {
            checkIfStateModificationsAreAllowed();
            var oldValue = values[index];
            if (hasInterceptors(adm)) {
                var change = interceptChange(adm, {
                    type: "update",
                    object: adm.array,
                    index: index, newValue: newValue
                });
                if (!change)
                    return;
                newValue = change.newValue;
            }
            newValue = adm.makeReactiveArrayItem(newValue);
            var changed = (adm.mode === ValueMode.Structure) ? !deepEquals(oldValue, newValue) : oldValue !== newValue;
            if (changed) {
                values[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
            }
        }
        else if (index === values.length) {
            adm.spliceWithArray(index, 0, [newValue]);
        }
        else
            throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values.length);
    };
}
function createArrayGetter(index) {
    return function () {
        var impl = this.$mobx;
        if (impl && index < impl.values.length) {
            impl.atom.reportObserved();
            return impl.values[index];
        }
        console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + impl.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
        return undefined;
    };
}
function reserveArrayBuffer(max) {
    for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max; index++)
        createArrayBufferItem(index);
    OBSERVABLE_ARRAY_BUFFER_SIZE = max;
}
reserveArrayBuffer(1000);
function createObservableArray(initialValues, mode, name) {
    return new ObservableArray(initialValues, mode, name);
}
function fastArray(initialValues) {
    deprecated("fastArray is deprecated. Please use `observable(asFlat([]))`");
    return createObservableArray(initialValues, ValueMode.Flat, null);
}
exports.fastArray = fastArray;
var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing.$mobx);
}
exports.isObservableArray = isObservableArray;
var ObservableMapMarker = {};
var ObservableMap = (function () {
    function ObservableMap(initialData, valueModeFunc) {
        var _this = this;
        this.$mobx = ObservableMapMarker;
        this._data = {};
        this._hasMap = {};
        this.name = "ObservableMap@" + getNextId();
        this._keys = new ObservableArray(null, ValueMode.Reference, this.name + ".keys()", true);
        this.interceptors = null;
        this.changeListeners = null;
        this._valueMode = getValueModeFromModifierFunc(valueModeFunc);
        if (this._valueMode === ValueMode.Flat)
            this._valueMode = ValueMode.Reference;
        allowStateChanges(true, function () {
            if (isPlainObject(initialData))
                _this.merge(initialData);
            else if (Array.isArray(initialData))
                initialData.forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    return _this.set(key, value);
                });
        });
    }
    ObservableMap.prototype._has = function (key) {
        return typeof this._data[key] !== "undefined";
    };
    ObservableMap.prototype.has = function (key) {
        if (!this.isValidKey(key))
            return false;
        key = "" + key;
        if (this._hasMap[key])
            return this._hasMap[key].get();
        return this._updateHasMapEntry(key, false).get();
    };
    ObservableMap.prototype.set = function (key, value) {
        this.assertValidKey(key);
        key = "" + key;
        var hasKey = this._has(key);
        assertUnwrapped(value, "[mobx.map.set] Expected unwrapped value to be inserted to key '" + key + "'. If you need to use modifiers pass them as second argument to the constructor");
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: hasKey ? "update" : "add",
                object: this,
                newValue: value,
                name: key
            });
            if (!change)
                return;
            value = change.newValue;
        }
        if (hasKey) {
            this._updateValue(key, value);
        }
        else {
            this._addValue(key, value);
        }
    };
    ObservableMap.prototype.delete = function (key) {
        var _this = this;
        this.assertValidKey(key);
        key = "" + key;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: "delete",
                object: this,
                name: key
            });
            if (!change)
                return false;
        }
        if (this._has(key)) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "delete",
                object: this,
                oldValue: this._data[key].value,
                name: key
            } : null;
            if (notifySpy)
                spyReportStart(change);
            transaction(function () {
                _this._keys.remove(key);
                _this._updateHasMapEntry(key, false);
                var observable = _this._data[key];
                observable.setNewValue(undefined);
                _this._data[key] = undefined;
            }, undefined, false);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy)
                spyReportEnd();
            return true;
        }
        return false;
    };
    ObservableMap.prototype._updateHasMapEntry = function (key, value) {
        var entry = this._hasMap[key];
        if (entry) {
            entry.setNewValue(value);
        }
        else {
            entry = this._hasMap[key] = new ObservableValue(value, ValueMode.Reference, this.name + "." + key + "?", false);
        }
        return entry;
    };
    ObservableMap.prototype._updateValue = function (name, newValue) {
        var observable = this._data[name];
        newValue = observable.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "update",
                object: this,
                oldValue: observable.value,
                name: name, newValue: newValue
            } : null;
            if (notifySpy)
                spyReportStart(change);
            observable.setNewValue(newValue);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy)
                spyReportEnd();
        }
    };
    ObservableMap.prototype._addValue = function (name, newValue) {
        var _this = this;
        transaction(function () {
            var observable = _this._data[name] = new ObservableValue(newValue, _this._valueMode, _this.name + "." + name, false);
            newValue = observable.value;
            _this._updateHasMapEntry(name, true);
            _this._keys.push(name);
        }, undefined, false);
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            type: "add",
            object: this,
            name: name, newValue: newValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    ObservableMap.prototype.get = function (key) {
        key = "" + key;
        if (this.has(key))
            return this._data[key].get();
        return undefined;
    };
    ObservableMap.prototype.keys = function () {
        return arrayAsIterator(this._keys.slice());
    };
    ObservableMap.prototype.values = function () {
        return arrayAsIterator(this._keys.map(this.get, this));
    };
    ObservableMap.prototype.entries = function () {
        var _this = this;
        return arrayAsIterator(this._keys.map(function (key) { return [key, _this.get(key)]; }));
    };
    ObservableMap.prototype.forEach = function (callback, thisArg) {
        var _this = this;
        this.keys().forEach(function (key) { return callback.call(thisArg, _this.get(key), key); });
    };
    ObservableMap.prototype.merge = function (other) {
        var _this = this;
        transaction(function () {
            if (isObservableMap(other))
                other.keys().forEach(function (key) { return _this.set(key, other.get(key)); });
            else
                Object.keys(other).forEach(function (key) { return _this.set(key, other[key]); });
        }, undefined, false);
        return this;
    };
    ObservableMap.prototype.clear = function () {
        var _this = this;
        transaction(function () {
            untracked(function () {
                _this.keys().forEach(_this.delete, _this);
            });
        }, undefined, false);
    };
    Object.defineProperty(ObservableMap.prototype, "size", {
        get: function () {
            return this._keys.length;
        },
        enumerable: true,
        configurable: true
    });
    ObservableMap.prototype.toJS = function () {
        var _this = this;
        var res = {};
        this.keys().forEach(function (key) { return res[key] = _this.get(key); });
        return res;
    };
    ObservableMap.prototype.toJs = function () {
        deprecated("toJs is deprecated, use toJS instead");
        return this.toJS();
    };
    ObservableMap.prototype.toJSON = function () {
        return this.toJS();
    };
    ObservableMap.prototype.isValidKey = function (key) {
        if (key === null || key === undefined)
            return false;
        if (typeof key !== "string" && typeof key !== "number" && typeof key !== "boolean")
            return false;
        return true;
    };
    ObservableMap.prototype.assertValidKey = function (key) {
        if (!this.isValidKey(key))
            throw new Error("[mobx.map] Invalid key: '" + key + "'");
    };
    ObservableMap.prototype.toString = function () {
        var _this = this;
        return this.name + "[{ " + this.keys().map(function (key) { return (key + ": " + ("" + _this.get(key))); }).join(", ") + " }]";
    };
    ObservableMap.prototype.observe = function (listener, fireImmediately) {
        invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable maps.");
        return registerListener(this, listener);
    };
    ObservableMap.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableMap;
}());
exports.ObservableMap = ObservableMap;
declareIterator(ObservableMap.prototype, function () {
    return this.entries();
});
function map(initialValues, valueModifier) {
    return new ObservableMap(initialValues, valueModifier);
}
exports.map = map;
var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);
exports.isObservableMap = isObservableMap;
var COMPUTED_FUNC_DEPRECATED = ("\nIn MobX 2.* passing a function without arguments to (extend)observable will automatically be inferred to be a computed value.\nThis behavior is ambiguous and will change in MobX 3 to create just an observable reference to the value passed in.\nTo disambiguate, please pass the function wrapped with a modifier: use 'computed(fn)' (for current behavior; automatic conversion), or 'asReference(fn)' (future behavior, just store reference) or 'action(fn)'.\nNote that the idiomatic way to write computed properties is 'observable({ get propertyName() { ... }})'.\nFor more details, see https://github.com/mobxjs/mobx/issues/532");
var ObservableObjectAdministration = (function () {
    function ObservableObjectAdministration(target, name, mode) {
        this.target = target;
        this.name = name;
        this.mode = mode;
        this.values = {};
        this.changeListeners = null;
        this.interceptors = null;
    }
    ObservableObjectAdministration.prototype.observe = function (callback, fireImmediately) {
        invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
        return registerListener(this, callback);
    };
    ObservableObjectAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableObjectAdministration;
}());
function asObservableObject(target, name, mode) {
    if (mode === void 0) { mode = ValueMode.Recursive; }
    if (isObservableObject(target))
        return target.$mobx;
    if (!isPlainObject(target))
        name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
    if (!name)
        name = "ObservableObject@" + getNextId();
    var adm = new ObservableObjectAdministration(target, name, mode);
    addHiddenFinalProp(target, "$mobx", adm);
    return adm;
}
function handleAsComputedValue(value) {
    return typeof value === "function" && value.length === 0 && !isAction(value);
}
function setObservableObjectInstanceProperty(adm, propName, descriptor) {
    if (adm.values[propName]) {
        invariant("value" in descriptor, "cannot redefine property " + propName);
        adm.target[propName] = descriptor.value;
    }
    else {
        if ("value" in descriptor) {
            if (handleAsComputedValue(descriptor.value)) {
                deprecated(COMPUTED_FUNC_DEPRECATED + ")in: " + adm.name + "." + propName);
            }
            defineObservableProperty(adm, propName, descriptor.value, true, undefined);
        }
        else {
            defineObservableProperty(adm, propName, descriptor.get, true, descriptor.set);
        }
    }
}
function defineObservableProperty(adm, propName, newValue, asInstanceProperty, setter) {
    if (asInstanceProperty)
        assertPropertyConfigurable(adm.target, propName);
    var observable;
    var name = adm.name + "." + propName;
    var isComputed = true;
    if (isComputedValue(newValue)) {
        observable = newValue;
        newValue.name = name;
        if (!newValue.scope)
            newValue.scope = adm.target;
    }
    else if (handleAsComputedValue(newValue)) {
        observable = new ComputedValue(newValue, adm.target, false, name, setter);
    }
    else if (getModifier(newValue) === ValueMode.Structure && typeof newValue.value === "function" && newValue.value.length === 0) {
        observable = new ComputedValue(newValue.value, adm.target, true, name, setter);
    }
    else {
        isComputed = false;
        if (hasInterceptors(adm)) {
            var change = interceptChange(adm, {
                object: adm.target,
                name: propName,
                type: "add",
                newValue: newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        observable = new ObservableValue(newValue, adm.mode, name, false);
        newValue = observable.value;
    }
    adm.values[propName] = observable;
    if (asInstanceProperty) {
        Object.defineProperty(adm.target, propName, isComputed ? generateComputedPropConfig(propName) : generateObservablePropConfig(propName));
    }
    if (!isComputed)
        notifyPropertyAddition(adm, adm.target, propName, newValue);
}
var observablePropertyConfigs = {};
var computedPropertyConfigs = {};
function generateObservablePropConfig(propName) {
    var config = observablePropertyConfigs[propName];
    if (config)
        return config;
    return observablePropertyConfigs[propName] = {
        configurable: true,
        enumerable: true,
        get: function () {
            return this.$mobx.values[propName].get();
        },
        set: function (v) {
            setPropertyValue(this, propName, v);
        }
    };
}
function generateComputedPropConfig(propName) {
    var config = computedPropertyConfigs[propName];
    if (config)
        return config;
    return computedPropertyConfigs[propName] = {
        configurable: true,
        enumerable: false,
        get: function () {
            return this.$mobx.values[propName].get();
        },
        set: function (v) {
            return this.$mobx.values[propName].set(v);
        }
    };
}
function setPropertyValue(instance, name, newValue) {
    var adm = instance.$mobx;
    var observable = adm.values[name];
    if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
            type: "update",
            object: instance,
            name: name, newValue: newValue
        });
        if (!change)
            return;
        newValue = change.newValue;
    }
    newValue = observable.prepareNewValue(newValue);
    if (newValue !== UNCHANGED) {
        var notify = hasListeners(adm);
        var notifySpy = isSpyEnabled();
        var change = notify || notifySpy ? {
            type: "update",
            object: instance,
            oldValue: observable.value,
            name: name, newValue: newValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        observable.setNewValue(newValue);
        if (notify)
            notifyListeners(adm, change);
        if (notifySpy)
            spyReportEnd();
    }
}
function notifyPropertyAddition(adm, object, name, newValue) {
    var notify = hasListeners(adm);
    var notifySpy = isSpyEnabled();
    var change = notify || notifySpy ? {
        type: "add",
        object: object, name: name, newValue: newValue
    } : null;
    if (notifySpy)
        spyReportStart(change);
    if (notify)
        notifyListeners(adm, change);
    if (notifySpy)
        spyReportEnd();
}
var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
function isObservableObject(thing) {
    if (isObject(thing)) {
        runLazyInitializers(thing);
        return isObservableObjectAdministration(thing.$mobx);
    }
    return false;
}
exports.isObservableObject = isObservableObject;
var UNCHANGED = {};
var ObservableValue = (function (_super) {
    __extends(ObservableValue, _super);
    function ObservableValue(value, mode, name, notifySpy) {
        if (name === void 0) { name = "ObservableValue@" + getNextId(); }
        if (notifySpy === void 0) { notifySpy = true; }
        _super.call(this, name);
        this.mode = mode;
        this.hasUnreportedChange = false;
        this.value = undefined;
        var _a = getValueModeFromValue(value, ValueMode.Recursive), childmode = _a[0], unwrappedValue = _a[1];
        if (this.mode === ValueMode.Recursive)
            this.mode = childmode;
        this.value = makeChildObservable(unwrappedValue, this.mode, this.name);
        if (notifySpy && isSpyEnabled()) {
            spyReport({ type: "create", object: this, newValue: this.value });
        }
    }
    ObservableValue.prototype.set = function (newValue) {
        var oldValue = this.value;
        newValue = this.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            if (notifySpy) {
                spyReportStart({
                    type: "update",
                    object: this,
                    newValue: newValue, oldValue: oldValue
                });
            }
            this.setNewValue(newValue);
            if (notifySpy)
                spyReportEnd();
        }
    };
    ObservableValue.prototype.prepareNewValue = function (newValue) {
        assertUnwrapped(newValue, "Modifiers cannot be used on non-initial values.");
        checkIfStateModificationsAreAllowed();
        if (hasInterceptors(this)) {
            var change = interceptChange(this, { object: this, type: "update", newValue: newValue });
            if (!change)
                return UNCHANGED;
            newValue = change.newValue;
        }
        var changed = valueDidChange(this.mode === ValueMode.Structure, this.value, newValue);
        if (changed)
            return makeChildObservable(newValue, this.mode, this.name);
        return UNCHANGED;
    };
    ObservableValue.prototype.setNewValue = function (newValue) {
        var oldValue = this.value;
        this.value = newValue;
        this.reportChanged();
        if (hasListeners(this))
            notifyListeners(this, [newValue, oldValue]);
    };
    ObservableValue.prototype.get = function () {
        this.reportObserved();
        return this.value;
    };
    ObservableValue.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableValue.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately)
            listener(this.value, undefined);
        return registerListener(this, listener);
    };
    ObservableValue.prototype.toJSON = function () {
        return this.get();
    };
    ObservableValue.prototype.toString = function () {
        return this.name + "[" + this.value + "]";
    };
    return ObservableValue;
}(BaseAtom));
var isObservableValue = createInstanceofPredicate("ObservableValue", ObservableValue);
function getAtom(thing, property) {
    if (typeof thing === "object" && thing !== null) {
        if (isObservableArray(thing)) {
            invariant(property === undefined, "It is not possible to get index atoms from arrays");
            return thing.$mobx.atom;
        }
        if (isObservableMap(thing)) {
            if (property === undefined)
                return getAtom(thing._keys);
            var observable_2 = thing._data[property] || thing._hasMap[property];
            invariant(!!observable_2, "the entry '" + property + "' does not exist in the observable map '" + getDebugName(thing) + "'");
            return observable_2;
        }
        runLazyInitializers(thing);
        if (isObservableObject(thing)) {
            invariant(!!property, "please specify a property");
            var observable_3 = thing.$mobx.values[property];
            invariant(!!observable_3, "no observable property '" + property + "' found on the observable object '" + getDebugName(thing) + "'");
            return observable_3;
        }
        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
            return thing;
        }
    }
    else if (typeof thing === "function") {
        if (isReaction(thing.$mobx)) {
            return thing.$mobx;
        }
    }
    invariant(false, "Cannot obtain atom from " + thing);
}
function getAdministration(thing, property) {
    invariant(thing, "Expecting some object");
    if (property !== undefined)
        return getAdministration(getAtom(thing, property));
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing))
        return thing;
    if (isObservableMap(thing))
        return thing;
    runLazyInitializers(thing);
    if (thing.$mobx)
        return thing.$mobx;
    invariant(false, "Cannot obtain administration from " + thing);
}
function getDebugName(thing, property) {
    var named;
    if (property !== undefined)
        named = getAtom(thing, property);
    else if (isObservableObject(thing) || isObservableMap(thing))
        named = getAdministration(thing);
    else
        named = getAtom(thing);
    return named.name;
}
function createClassPropertyDecorator(onInitialize, get, set, enumerable, allowCustomArguments) {
    function classPropertyDecorator(target, key, descriptor, customArgs, argLen) {
        invariant(allowCustomArguments || quacksLikeADecorator(arguments), "This function is a decorator, but it wasn't invoked like a decorator");
        if (!descriptor) {
            var newDescriptor = {
                enumerable: enumerable,
                configurable: true,
                get: function () {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true)
                        typescriptInitializeProperty(this, key, undefined, onInitialize, customArgs, descriptor);
                    return get.call(this, key);
                },
                set: function (v) {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true) {
                        typescriptInitializeProperty(this, key, v, onInitialize, customArgs, descriptor);
                    }
                    else {
                        set.call(this, key, v);
                    }
                }
            };
            if (arguments.length < 3 || arguments.length === 5 && argLen < 3) {
                Object.defineProperty(target, key, newDescriptor);
            }
            return newDescriptor;
        }
        else {
            if (!hasOwnProperty(target, "__mobxLazyInitializers")) {
                addHiddenProp(target, "__mobxLazyInitializers", (target.__mobxLazyInitializers && target.__mobxLazyInitializers.slice()) || []);
            }
            var value_1 = descriptor.value, initializer_1 = descriptor.initializer;
            target.__mobxLazyInitializers.push(function (instance) {
                onInitialize(instance, key, (initializer_1 ? initializer_1.call(instance) : value_1), customArgs, descriptor);
            });
            return {
                enumerable: enumerable, configurable: true,
                get: function () {
                    if (this.__mobxDidRunLazyInitializers !== true)
                        runLazyInitializers(this);
                    return get.call(this, key);
                },
                set: function (v) {
                    if (this.__mobxDidRunLazyInitializers !== true)
                        runLazyInitializers(this);
                    set.call(this, key, v);
                }
            };
        }
    }
    if (allowCustomArguments) {
        return function () {
            if (quacksLikeADecorator(arguments))
                return classPropertyDecorator.apply(null, arguments);
            var outerArgs = arguments;
            var argLen = arguments.length;
            return function (target, key, descriptor) { return classPropertyDecorator(target, key, descriptor, outerArgs, argLen); };
        };
    }
    return classPropertyDecorator;
}
function typescriptInitializeProperty(instance, key, v, onInitialize, customArgs, baseDescriptor) {
    if (!hasOwnProperty(instance, "__mobxInitializedProps"))
        addHiddenProp(instance, "__mobxInitializedProps", {});
    instance.__mobxInitializedProps[key] = true;
    onInitialize(instance, key, v, customArgs, baseDescriptor);
}
function runLazyInitializers(instance) {
    if (instance.__mobxDidRunLazyInitializers === true)
        return;
    if (instance.__mobxLazyInitializers) {
        addHiddenProp(instance, "__mobxDidRunLazyInitializers", true);
        instance.__mobxDidRunLazyInitializers && instance.__mobxLazyInitializers.forEach(function (initializer) { return initializer(instance); });
    }
}
function quacksLikeADecorator(args) {
    return (args.length === 2 || args.length === 3) && typeof args[1] === "string";
}
function iteratorSymbol() {
    return (typeof Symbol === "function" && Symbol.iterator) || "@@iterator";
}
var IS_ITERATING_MARKER = "__$$iterating";
function arrayAsIterator(array) {
    invariant(array[IS_ITERATING_MARKER] !== true, "Illegal state: cannot recycle array as iterator");
    addHiddenFinalProp(array, IS_ITERATING_MARKER, true);
    var idx = -1;
    addHiddenFinalProp(array, "next", function next() {
        idx++;
        return {
            done: idx >= this.length,
            value: idx < this.length ? this[idx] : undefined
        };
    });
    return array;
}
function declareIterator(prototType, iteratorFactory) {
    addHiddenFinalProp(prototType, iteratorSymbol(), iteratorFactory);
}
var SimpleEventEmitter = (function () {
    function SimpleEventEmitter() {
        this.listeners = [];
        deprecated("extras.SimpleEventEmitter is deprecated and will be removed in the next major release");
    }
    SimpleEventEmitter.prototype.emit = function () {
        var listeners = this.listeners.slice();
        for (var i = 0, l = listeners.length; i < l; i++)
            listeners[i].apply(null, arguments);
    };
    SimpleEventEmitter.prototype.on = function (listener) {
        var _this = this;
        this.listeners.push(listener);
        return once(function () {
            var idx = _this.listeners.indexOf(listener);
            if (idx !== -1)
                _this.listeners.splice(idx, 1);
        });
    };
    SimpleEventEmitter.prototype.once = function (listener) {
        var subscription = this.on(function () {
            subscription();
            listener.apply(this, arguments);
        });
        return subscription;
    };
    return SimpleEventEmitter;
}());
exports.SimpleEventEmitter = SimpleEventEmitter;
var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
function getNextId() {
    return ++globalState.mobxGuid;
}
function invariant(check, message, thing) {
    if (!check)
        throw new Error("[mobx] Invariant failed: " + message + (thing ? " in '" + thing + "'" : ""));
}
var deprecatedMessages = [];
function deprecated(msg) {
    if (deprecatedMessages.indexOf(msg) !== -1)
        return;
    deprecatedMessages.push(msg);
    console.error("[mobx] Deprecated: " + msg);
}
function once(func) {
    var invoked = false;
    return function () {
        if (invoked)
            return;
        invoked = true;
        return func.apply(this, arguments);
    };
}
var noop = function () { };
function unique(list) {
    var res = [];
    list.forEach(function (item) {
        if (res.indexOf(item) === -1)
            res.push(item);
    });
    return res;
}
function joinStrings(things, limit, separator) {
    if (limit === void 0) { limit = 100; }
    if (separator === void 0) { separator = " - "; }
    if (!things)
        return "";
    var sliced = things.slice(0, limit);
    return "" + sliced.join(separator) + (things.length > limit ? " (... and " + (things.length - limit) + "more)" : "");
}
function isObject(value) {
    return value !== null && typeof value === "object";
}
function isPlainObject(value) {
    if (value === null || typeof value !== "object")
        return false;
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}
function objectAssign() {
    var res = arguments[0];
    for (var i = 1, l = arguments.length; i < l; i++) {
        var source = arguments[i];
        for (var key in source)
            if (hasOwnProperty(source, key)) {
                res[key] = source[key];
            }
    }
    return res;
}
function valueDidChange(compareStructural, oldValue, newValue) {
    return compareStructural
        ? !deepEquals(oldValue, newValue)
        : oldValue !== newValue;
}
var prototypeHasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwnProperty(object, propName) {
    return prototypeHasOwnProperty.call(object, propName);
}
function makeNonEnumerable(object, propNames) {
    for (var i = 0; i < propNames.length; i++) {
        addHiddenProp(object, propNames[i], object[propNames[i]]);
    }
}
function addHiddenProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}
function addHiddenFinalProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
    });
}
function isPropertyConfigurable(object, prop) {
    var descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || (descriptor.configurable !== false && descriptor.writable !== false);
}
function assertPropertyConfigurable(object, prop) {
    invariant(isPropertyConfigurable(object, prop), "Cannot make property '" + prop + "' observable, it is not configurable and writable in the target object");
}
function getEnumerableKeys(obj) {
    var res = [];
    for (var key in obj)
        res.push(key);
    return res;
}
function deepEquals(a, b) {
    if (a === null && b === null)
        return true;
    if (a === undefined && b === undefined)
        return true;
    var aIsArray = isArrayLike(a);
    if (aIsArray !== isArrayLike(b)) {
        return false;
    }
    else if (aIsArray) {
        if (a.length !== b.length)
            return false;
        for (var i = a.length - 1; i >= 0; i--)
            if (!deepEquals(a[i], b[i]))
                return false;
        return true;
    }
    else if (typeof a === "object" && typeof b === "object") {
        if (a === null || b === null)
            return false;
        if (getEnumerableKeys(a).length !== getEnumerableKeys(b).length)
            return false;
        for (var prop in a) {
            if (!(prop in b))
                return false;
            if (!deepEquals(a[prop], b[prop]))
                return false;
        }
        return true;
    }
    return a === b;
}
function createInstanceofPredicate(name, clazz) {
    var propName = "isMobX" + name;
    clazz.prototype[propName] = true;
    return function (x) {
        return isObject(x) && x[propName] === true;
    };
}
function isArrayLike(x) {
    return Array.isArray(x) || isObservableArray(x);
}
exports.isArrayLike = isArrayLike;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],108:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],109:[function(require,module,exports){
'use strict';

var fetchKeys = require('lodash.keys');

module.exports = function shallowEqual(objA, objB, compare, compareContext) {

    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if (ret !== void 0) {
        return !!ret;
    }

    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    var keysA = fetchKeys(objA);
    var keysB = fetchKeys(objB);

    var len = keysA.length;
    if (len !== keysB.length) {
        return false;
    }

    compareContext = compareContext || null;

    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var i = 0; i < len; i++) {
        var key = keysA[i];
        if (!bHasOwnProperty(key)) {
            return false;
        }
        var valueA = objA[key];
        var valueB = objB[key];

        var _ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
        if (_ret === false || _ret === void 0 && valueA !== valueB) {
            return false;
        }
    }

    return true;
};
},{"lodash.keys":106}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21tb25fY29tcG9uZW50cy5qcyIsImNvbXBvc2UuanMiLCJjb21wb3NlX2FsbC5qcyIsImNvbXBvc2Vycy93aXRoX21vYnguanMiLCJjb21wb3NlcnMvd2l0aF9vYnNlcnZhYmxlLmpzIiwiY29tcG9zZXJzL3dpdGhfcHJvbWlzZS5qcyIsImNvbXBvc2Vycy93aXRoX3RyYWNrZXIuanMiLCJpbmRleC5qcyIsInV0aWxzLmpzIiwid2luZG93X2JpbmQuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9pbnZhcmlhbnQvYnJvd3Nlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2guX2dldG5hdGl2ZS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNhcmd1bWVudHMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzYXJyYXkvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvbW9ieC9saWIvbW9ieC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvc2hhbGxvd2VxdWFsL21vZHVsZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3JOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0UEE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5dkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRHVtbXlDb21wb25lbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YnKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrJyk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MnKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG5leHBvcnRzLkRlZmF1bHRFcnJvckNvbXBvbmVudCA9IERlZmF1bHRFcnJvckNvbXBvbmVudDtcbmV4cG9ydHMuRGVmYXVsdExvYWRpbmdDb21wb25lbnQgPSBEZWZhdWx0TG9hZGluZ0NvbXBvbmVudDtcblxudmFyIF9yZWFjdCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydSZWFjdCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUmVhY3QnXSA6IG51bGwpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIER1bW15Q29tcG9uZW50ID0gZXhwb3J0cy5EdW1teUNvbXBvbmVudCA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKER1bW15Q29tcG9uZW50LCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBEdW1teUNvbXBvbmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEdW1teUNvbXBvbmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKER1bW15Q29tcG9uZW50Ll9fcHJvdG9fXyB8fCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShEdW1teUNvbXBvbmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHVtbXlDb21wb25lbnQsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEdW1teUNvbXBvbmVudDtcbn0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbmZ1bmN0aW9uIERlZmF1bHRFcnJvckNvbXBvbmVudChfcmVmKSB7XG4gIHZhciBlcnJvciA9IF9yZWYuZXJyb3I7XG5cbiAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICdwcmUnLFxuICAgIHsgc3R5bGU6IHsgY29sb3I6ICdyZWQnIH0gfSxcbiAgICBlcnJvci5tZXNzYWdlLFxuICAgICcgJyxcbiAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnYnInLCBudWxsKSxcbiAgICBlcnJvci5zdGFja1xuICApO1xufVxuXG5mdW5jdGlvbiBEZWZhdWx0TG9hZGluZ0NvbXBvbmVudCgpIHtcbiAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICdwJyxcbiAgICBudWxsLFxuICAgICdMb2FkaW5nLi4uJ1xuICApO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzJyk7XG5cbnZhciBfZXh0ZW5kczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHRlbmRzMik7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YnKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrJyk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MnKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjb21wb3NlO1xuXG52YXIgX3JlYWN0ID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlYWN0J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWFjdCddIDogbnVsbCk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX2ludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xuXG52YXIgX2ludmFyaWFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnZhcmlhbnQpO1xuXG52YXIgX3NoYWxsb3dlcXVhbCA9IHJlcXVpcmUoJ3NoYWxsb3dlcXVhbCcpO1xuXG52YXIgX3NoYWxsb3dlcXVhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zaGFsbG93ZXF1YWwpO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgX2NvbW1vbl9jb21wb25lbnRzID0gcmVxdWlyZSgnLi9jb21tb25fY29tcG9uZW50cycpO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNvbXBvc2UoZm4sIEwxLCBFMSkge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDoge30sXG4gICAgICBjb250ZXh0VHlwZXMgPSBfcmVmLmNvbnRleHRUeXBlcyxcbiAgICAgIF9yZWYkcHVyZSA9IF9yZWYucHVyZSxcbiAgICAgIHB1cmUgPSBfcmVmJHB1cmUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmJHB1cmUsXG4gICAgICBfcmVmJHdpdGhSZWYgPSBfcmVmLndpdGhSZWYsXG4gICAgICB3aXRoUmVmID0gX3JlZiR3aXRoUmVmID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkd2l0aFJlZjtcblxuICByZXR1cm4gZnVuY3Rpb24gKENoaWxkQ29tcG9uZW50LCBMMiwgRTIpIHtcbiAgICAoMCwgX2ludmFyaWFudDIuZGVmYXVsdCkoQm9vbGVhbihDaGlsZENvbXBvbmVudCksICdTaG91bGQgcHJvdmlkZSBhIGNoaWxkIGNvbXBvbmVudCB0byBidWlsZCB0aGUgaGlnaGVyIG9yZGVyIGNvbnRhaW5lci4nKTtcblxuICAgIGlmICgoMCwgX3V0aWxzLmlzUmVhY3ROYXRpdmUpKCkpIHtcbiAgICAgICgwLCBfaW52YXJpYW50Mi5kZWZhdWx0KShMMSB8fCBMMiwgJ1Nob3VsZCBwcm92aWRlIGEgbG9hZGluZyBjb21wb25lbnQgaW4gUmVhY3ROYXRpdmUuJyk7XG5cbiAgICAgICgwLCBfaW52YXJpYW50Mi5kZWZhdWx0KShFMSB8fCBFMiwgJ1Nob3VsZCBwcm92aWRlIGEgZXJyb3IgaGFuZGxpbmcgY29tcG9uZW50IGluIFJlYWN0TmF0aXZlLicpO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciBMb2FkaW5nQ29tcG9uZW50ID0gTDEgfHwgTDIgfHwgKDAsIF8uX2dldERlZmF1bHRMb2FkaW5nQ29tcG9uZW50KSgpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciBFcnJvckNvbXBvbmVudCA9IEUxIHx8IEUyIHx8ICgwLCBfLl9nZXREZWZhdWx0RXJyb3JDb21wb25lbnQpKCk7XG5cbiAgICAvLyBJZiB0aGlzIGlzIGRpc2FibGVkLCB3ZSBzaW1wbHkgbmVlZCB0byByZXR1cm4gdGhlIER1bW15Q29tcG9uZW50XG4gICAgaWYgKCgwLCBfLmdldERpc2FibGVNb2RlKSgpKSB7XG4gICAgICByZXR1cm4gKDAsIF91dGlscy5pbmhlcml0U3RhdGljcykoX2NvbW1vbl9jb21wb25lbnRzLkR1bW15Q29tcG9uZW50LCBDaGlsZENvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgdmFyIENvbnRhaW5lciA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShDb250YWluZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgICBmdW5jdGlvbiBDb250YWluZXIocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQ29udGFpbmVyKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChDb250YWluZXIuX19wcm90b19fIHx8ICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKENvbnRhaW5lcikpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgICAgICBfdGhpcy5nZXRXcmFwcGVkSW5zdGFuY2UgPSBfdGhpcy5nZXRXcmFwcGVkSW5zdGFuY2UuYmluZChfdGhpcyk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7fTtcblxuICAgICAgICAvLyBYWFg6IEluIHRoZSBzZXJ2ZXIgc2lkZSBlbnZpcm9ubWVudCwgd2UgbmVlZCB0b1xuICAgICAgICAvLyBzdG9wIHRoZSBzdWJzY3JpcHRpb24gcmlnaHQgYXdheS4gT3RoZXJ3aXNlLCBpdCdzIGEgc3RhcnRpbmdcbiAgICAgICAgLy8gcG9pbnQgdG8gaHVnZSBzdWJzY3JpcHRpb24gbGVhay5cbiAgICAgICAgX3RoaXMuX3N1YnNjcmliZSgpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICB9XG5cbiAgICAgICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKENvbnRhaW5lciwgW3tcbiAgICAgICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgICAgdGhpcy5fbW91bnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgICBpZiAocHJldlByb3BzICE9PSB0aGlzLnByb3BzKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgICAgdGhpcy5fbW91bnRlZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgICAgIGlmICghcHVyZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICEoMCwgX3NoYWxsb3dlcXVhbDIuZGVmYXVsdCkodGhpcy5wcm9wcywgbmV4dFByb3BzKSB8fCB0aGlzLnN0YXRlLmVycm9yICE9PSBuZXh0U3RhdGUuZXJyb3IgfHwgISgwLCBfc2hhbGxvd2VxdWFsMi5kZWZhdWx0KSh0aGlzLnN0YXRlLnBheWxvYWQsIG5leHRTdGF0ZS5wYXlsb2FkKTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRXcmFwcGVkSW5zdGFuY2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0V3JhcHBlZEluc3RhbmNlKCkge1xuICAgICAgICAgICgwLCBfaW52YXJpYW50Mi5kZWZhdWx0KSh3aXRoUmVmLCAnVG8gYWNjZXNzIHRoZSB3cmFwcGVkIGluc3RhbmNlLCB5b3UgbmVlZCB0byBzcGVjaWZ5ICcgKyAneyB3aXRoUmVmOiB0cnVlIH0gYXMgdGhlIGZvdXJ0aCBhcmd1bWVudCBvZiB0aGUgY29tcG9zZSgpIGNhbGwuJyk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVmcy53cmFwcGVkSW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0aGlzLl9nZXRFcnJvcigpO1xuICAgICAgICAgIHZhciBsb2FkaW5nID0gdGhpcy5faXNMb2FkaW5nKCk7XG5cbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChFcnJvckNvbXBvbmVudCwgeyBlcnJvcjogZXJyb3IgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChMb2FkaW5nQ29tcG9uZW50LCB0aGlzLl9nZXRQcm9wcygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQ2hpbGRDb21wb25lbnQsIHRoaXMuX2dldFByb3BzKCkpO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19zdWJzY3JpYmUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3N1YnNjcmliZSgpIHtcbiAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgICB2YXIgb25EYXRhID0gZnVuY3Rpb24gb25EYXRhKGVycm9yLCBwYXlsb2FkKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKGVycm9yLm1lc3NhZ2UgJiYgZXJyb3Iuc3RhY2ssICdQYXNzZWQgZXJyb3Igc2hvdWxkIGJlIGFuIGluc3RhbmNlIG9mIGFuIEVycm9yLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB7IGVycm9yOiBlcnJvciwgcGF5bG9hZDogcGF5bG9hZCB9O1xuXG4gICAgICAgICAgICBpZiAoX3RoaXMyLl9tb3VudGVkKSB7XG4gICAgICAgICAgICAgIF90aGlzMi5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpczIuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdGhpcy5fc3RvcCA9IGZuKHRoaXMucHJvcHMsIG9uRGF0YSwgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfdW5zdWJzY3JpYmUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3Vuc3Vic2NyaWJlKCkge1xuICAgICAgICAgIGlmICh0aGlzLl9zdG9wKSB7XG4gICAgICAgICAgICB0aGlzLl9zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19nZXRQcm9wcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0UHJvcHMoKSB7XG4gICAgICAgICAgdmFyIF9zdGF0ZSRwYXlsb2FkID0gdGhpcy5zdGF0ZS5wYXlsb2FkLFxuICAgICAgICAgICAgICBwYXlsb2FkID0gX3N0YXRlJHBheWxvYWQgPT09IHVuZGVmaW5lZCA/IHt9IDogX3N0YXRlJHBheWxvYWQ7XG5cblxuICAgICAgICAgIHZhciBwcm9wcyA9ICgwLCBfZXh0ZW5kczMuZGVmYXVsdCkoe30sIHRoaXMucHJvcHMsIHBheWxvYWQpO1xuXG4gICAgICAgICAgaWYgKHdpdGhSZWYpIHtcbiAgICAgICAgICAgIHByb3BzLnJlZiA9ICd3cmFwcGVkSW5zdGFuY2UnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBwcm9wcztcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfZ2V0RXJyb3InLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldEVycm9yKCkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHRoaXMuc3RhdGUuZXJyb3I7XG5cbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2lzTG9hZGluZycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfaXNMb2FkaW5nKCkge1xuICAgICAgICAgIHZhciBwYXlsb2FkID0gdGhpcy5zdGF0ZS5wYXlsb2FkO1xuXG4gICAgICAgICAgcmV0dXJuICFCb29sZWFuKHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgICB9XSk7XG4gICAgICByZXR1cm4gQ29udGFpbmVyO1xuICAgIH0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbiAgICBDb250YWluZXIuY29udGV4dFR5cGVzID0gY29udGV4dFR5cGVzO1xuICAgIHJldHVybiAoMCwgX3V0aWxzLmluaGVyaXRTdGF0aWNzKShDb250YWluZXIsIENoaWxkQ29tcG9uZW50KTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcycpO1xuXG52YXIgX2V4dGVuZHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXh0ZW5kczIpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjb21wb3NlQWxsO1xuXG52YXIgX3JlYWN0ID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlYWN0J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWFjdCddIDogbnVsbCk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vJyk7XG5cbnZhciBfY29tbW9uX2NvbXBvbmVudHMgPSByZXF1aXJlKCcuL2NvbW1vbl9jb21wb25lbnRzJyk7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIHV0aWxpdHkgZnVuY3Rpb24gdG8gY29tcG9zZSBtdWx0aXBsZSBjb21wb3NlcnMgYXQgb25jZS5cbmZ1bmN0aW9uIGNvbXBvc2VBbGwoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBjb21wb3NlcnMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBjb21wb3NlcnNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKEJhc2VDb21wb25lbnQpIHtcbiAgICBpZiAoKDAsIF8uZ2V0RGlzYWJsZU1vZGUpKCkpIHtcbiAgICAgIHJldHVybiBfY29tbW9uX2NvbXBvbmVudHMuRHVtbXlDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgaWYgKEJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgQmFzZUNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1cnJ5IGZ1bmN0aW9uIG9mIGNvbXBvc2VBbGwgbmVlZHMgYW4gaW5wdXQuJyk7XG4gICAgfVxuXG4gICAgdmFyIEZpbmFsQ29tcG9uZW50ID0gQmFzZUNvbXBvbmVudDtcbiAgICBjb21wb3NlcnMuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9zZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgY29tcG9zZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb21wb3NlciBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgIH1cblxuICAgICAgRmluYWxDb21wb25lbnQgPSBjb21wb3NlcihGaW5hbENvbXBvbmVudCk7XG5cbiAgICAgIGlmIChGaW5hbENvbXBvbmVudCA9PT0gbnVsbCB8fCBGaW5hbENvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ29tcG9zZXIgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIHZhbHVlLicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgRmluYWxDb21wb25lbnQuX19PcmlnaW5hbEJhc2VDb21wb25lbnQgPSBCYXNlQ29tcG9uZW50Ll9fT3JpZ2luYWxCYXNlQ29tcG9uZW50IHx8IEJhc2VDb21wb25lbnQ7XG5cbiAgICB2YXIgc3R1YmJpbmdNb2RlID0gKDAsIF8uZ2V0U3R1YmJpbmdNb2RlKSgpO1xuXG4gICAgaWYgKCFzdHViYmluZ01vZGUpIHtcbiAgICAgIHJldHVybiBGaW5hbENvbXBvbmVudDtcbiAgICB9XG5cbiAgICAvLyByZXR1cm4gdGhlIHN0dWJiaW5nIG1vZGUuXG4gICAgdmFyIFJlc3VsdENvbnRhaW5lciA9IGZ1bmN0aW9uIFJlc3VsdENvbnRhaW5lcihwcm9wcykge1xuICAgICAgLy8gSWYgdGhlcmUncyBhbiBzdHViIHVzZSBpdC5cbiAgICAgIGlmIChSZXN1bHRDb250YWluZXIuX19jb21wb3NlclN0dWIpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBSZXN1bHRDb250YWluZXIuX19jb21wb3NlclN0dWIocHJvcHMpO1xuICAgICAgICB2YXIgZmluYWxQcm9wcyA9ICgwLCBfZXh0ZW5kczMuZGVmYXVsdCkoe30sIHByb3BzLCBkYXRhKTtcblxuICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRmluYWxDb21wb25lbnQuX19PcmlnaW5hbEJhc2VDb21wb25lbnQsIGZpbmFsUHJvcHMpO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGVyZSdzIG5vIHN0dWIsIGp1c3QgdXNlIHRoZSBGaW5hbENvbXBvbmVudC5cbiAgICAgIHZhciBkaXNwbGF5TmFtZSA9IEZpbmFsQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IEZpbmFsQ29tcG9uZW50Lm5hbWU7XG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdzcGFuJyxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgJzwnICsgZGlzcGxheU5hbWUgKyAnIC8+J1xuICAgICAgKTtcbiAgICB9O1xuXG4gICAgKDAsIF91dGlscy5pbmhlcml0U3RhdGljcykoUmVzdWx0Q29udGFpbmVyLCBGaW5hbENvbXBvbmVudCk7XG5cbiAgICByZXR1cm4gUmVzdWx0Q29udGFpbmVyO1xuICB9O1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNvbXBvc2VXaXRoTW9ieDtcblxudmFyIF9jb21wb3NlID0gcmVxdWlyZSgnLi4vY29tcG9zZScpO1xuXG52YXIgX2NvbXBvc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9zZSk7XG5cbnZhciBfbW9ieCA9IHJlcXVpcmUoJ21vYngnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY29tcG9zZVdpdGhNb2J4KGZuLCBMLCBFLCBvcHRpb25zKSB7XG4gIHZhciBvblByb3BzQ2hhbmdlID0gZnVuY3Rpb24gb25Qcm9wc0NoYW5nZShwcm9wcywgb25EYXRhKSB7XG4gICAgdmFyIHJlYWN0aXZlRm4gPSBmdW5jdGlvbiByZWFjdGl2ZUZuKCkge1xuICAgICAgcmV0dXJuIGZuKHByb3BzLCBvbkRhdGEpO1xuICAgIH07XG5cbiAgICAoMCwgX21vYnguYXV0b3J1bikocmVhY3RpdmVGbik7XG5cbiAgICByZXR1cm4gcmVhY3RpdmVGbigpO1xuICB9O1xuXG4gIHJldHVybiAoMCwgX2NvbXBvc2UyLmRlZmF1bHQpKG9uUHJvcHNDaGFuZ2UsIEwsIEUsIG9wdGlvbnMpO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzJyk7XG5cbnZhciBfZXh0ZW5kczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHRlbmRzMik7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YnKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNvbXBvc2VXaXRoT2JzZXJ2YWJsZTtcblxudmFyIF9jb21wb3NlID0gcmVxdWlyZSgnLi4vY29tcG9zZScpO1xuXG52YXIgX2NvbXBvc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9zZSk7XG5cbnZhciBfaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5cbnZhciBfaW52YXJpYW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludmFyaWFudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNvbXBvc2VXaXRoT2JzZXJ2YWJsZShmbiwgTCwgRSwgb3B0aW9ucykge1xuICB2YXIgb25Qcm9wc0NoYW5nZSA9IGZ1bmN0aW9uIG9uUHJvcHNDaGFuZ2UocHJvcHMsIHNlbmREYXRhLCBjb250ZXh0KSB7XG4gICAgdmFyIG9ic2VydmFibGUgPSBmbihwcm9wcywgY29udGV4dCk7XG4gICAgKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKHR5cGVvZiBvYnNlcnZhYmxlLnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJywgJ1Nob3VsZCByZXR1cm4gYW4gb2JzZXJ2YWJsZSBmcm9tIHRoZSBjYWxsYmFjayBvZiBgY29tcG9zZVdpdGhPYnNlcnZhYmxlYCcpO1xuXG4gICAgc2VuZERhdGEoKTtcbiAgICB2YXIgb25EYXRhID0gZnVuY3Rpb24gb25EYXRhKGRhdGEpIHtcbiAgICAgICgwLCBfaW52YXJpYW50Mi5kZWZhdWx0KSgodHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoZGF0YSkpID09PSAnb2JqZWN0JywgJ1Nob3VsZCByZXR1cm4gYSBwbGFpbiBvYmplY3QgZnJvbSB0aGUgcHJvbWlzZScpO1xuICAgICAgdmFyIGNsb25lZERhdGEgPSAoMCwgX2V4dGVuZHMzLmRlZmF1bHQpKHt9LCBkYXRhKTtcbiAgICAgIHNlbmREYXRhKG51bGwsIGNsb25lZERhdGEpO1xuICAgIH07XG5cbiAgICB2YXIgb25FcnJvciA9IGZ1bmN0aW9uIG9uRXJyb3IoZXJyKSB7XG4gICAgICBzZW5kRGF0YShlcnIpO1xuICAgIH07XG5cbiAgICB2YXIgc3ViID0gb2JzZXJ2YWJsZS5zdWJzY3JpYmUob25EYXRhLCBvbkVycm9yKTtcbiAgICByZXR1cm4gc3ViLmNvbXBsZXRlZC5iaW5kKHN1Yik7XG4gIH07XG5cbiAgcmV0dXJuICgwLCBfY29tcG9zZTIuZGVmYXVsdCkob25Qcm9wc0NoYW5nZSwgTCwgRSwgb3B0aW9ucyk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMnKTtcblxudmFyIF9leHRlbmRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4dGVuZHMyKTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZicpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY29tcG9zZVdpdGhQcm9taXNlO1xuXG52YXIgX2NvbXBvc2UgPSByZXF1aXJlKCcuLi9jb21wb3NlJyk7XG5cbnZhciBfY29tcG9zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb3NlKTtcblxudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcblxudmFyIF9pbnZhcmlhbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW52YXJpYW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY29tcG9zZVdpdGhQcm9taXNlKGZuLCBMLCBFLCBvcHRpb25zKSB7XG4gIHZhciBvblByb3BzQ2hhbmdlID0gZnVuY3Rpb24gb25Qcm9wc0NoYW5nZShwcm9wcywgb25EYXRhLCBjb250ZXh0KSB7XG4gICAgdmFyIHByb21pc2UgPSBmbihwcm9wcywgY29udGV4dCk7XG4gICAgKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKHR5cGVvZiBwcm9taXNlLnRoZW4gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHByb21pc2UuY2F0Y2ggPT09ICdmdW5jdGlvbicsICdTaG91bGQgcmV0dXJuIGEgcHJvbWlzZSBmcm9tIHRoZSBjYWxsYmFjayBvZiBgY29tcG9zZVdpdGhQcm9taXNlYCcpO1xuXG4gICAgb25EYXRhKCk7XG4gICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAoMCwgX2ludmFyaWFudDIuZGVmYXVsdCkoKHR5cGVvZiBkYXRhID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKGRhdGEpKSA9PT0gJ29iamVjdCcsICdTaG91bGQgcmV0dXJuIGEgcGxhaW4gb2JqZWN0IGZyb20gdGhlIHByb21pc2UnKTtcbiAgICAgIHZhciBjbG9uZWREYXRhID0gKDAsIF9leHRlbmRzMy5kZWZhdWx0KSh7fSwgZGF0YSk7XG4gICAgICBvbkRhdGEobnVsbCwgY2xvbmVkRGF0YSk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgb25EYXRhKGVycik7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuICgwLCBfY29tcG9zZTIuZGVmYXVsdCkob25Qcm9wc0NoYW5nZSwgTCwgRSwgb3B0aW9ucyk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY29tcG9zZVdpdGhUcmFja2VyO1xuXG52YXIgX2NvbXBvc2UgPSByZXF1aXJlKCcuLi9jb21wb3NlJyk7XG5cbnZhciBfY29tcG9zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb3NlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY29tcG9zZVdpdGhUcmFja2VyKHJlYWN0aXZlRm4sIEwsIEUsIG9wdGlvbnMpIHtcbiAgdmFyIG9uUHJvcHNDaGFuZ2UgPSBmdW5jdGlvbiBvblByb3BzQ2hhbmdlKHByb3BzLCBvbkRhdGEsIGNvbnRleHQpIHtcbiAgICB2YXIgdHJhY2tlckNsZWFudXAgPSB2b2lkIDA7XG4gICAgdmFyIGhhbmRsZXIgPSBUcmFja2VyLm5vbnJlYWN0aXZlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBUcmFja2VyLmF1dG9ydW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB0cmFja2VyQ2xlYW51cCA9IHJlYWN0aXZlRm4ocHJvcHMsIG9uRGF0YSwgY29udGV4dCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodHlwZW9mIHRyYWNrZXJDbGVhbnVwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRyYWNrZXJDbGVhbnVwKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFuZGxlci5zdG9wKCk7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gKDAsIF9jb21wb3NlMi5kZWZhdWx0KShvblByb3BzQ2hhbmdlLCBMLCBFLCBvcHRpb25zKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNvbXBvc2VXaXRoTW9ieCA9IGV4cG9ydHMuY29tcG9zZVdpdGhPYnNlcnZhYmxlID0gZXhwb3J0cy5jb21wb3NlV2l0aFByb21pc2UgPSBleHBvcnRzLmNvbXBvc2VXaXRoVHJhY2tlciA9IGV4cG9ydHMuY29tcG9zZUFsbCA9IGV4cG9ydHMuY29tcG9zZSA9IHVuZGVmaW5lZDtcbmV4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7XG5leHBvcnRzLmdldERpc2FibGVNb2RlID0gZ2V0RGlzYWJsZU1vZGU7XG5leHBvcnRzLnNldFN0dWJiaW5nTW9kZSA9IHNldFN0dWJiaW5nTW9kZTtcbmV4cG9ydHMuZ2V0U3R1YmJpbmdNb2RlID0gZ2V0U3R1YmJpbmdNb2RlO1xuZXhwb3J0cy5zZXRDb21wb3NlclN0dWIgPSBzZXRDb21wb3NlclN0dWI7XG5leHBvcnRzLnNldERlZmF1bHRMb2FkaW5nQ29tcG9uZW50ID0gc2V0RGVmYXVsdExvYWRpbmdDb21wb25lbnQ7XG5leHBvcnRzLnNldERlZmF1bHRFcnJvckNvbXBvbmVudCA9IHNldERlZmF1bHRFcnJvckNvbXBvbmVudDtcbmV4cG9ydHMuX2dldERlZmF1bHRMb2FkaW5nQ29tcG9uZW50ID0gX2dldERlZmF1bHRMb2FkaW5nQ29tcG9uZW50O1xuZXhwb3J0cy5fZ2V0RGVmYXVsdEVycm9yQ29tcG9uZW50ID0gX2dldERlZmF1bHRFcnJvckNvbXBvbmVudDtcblxudmFyIF9jb21wb3NlMiA9IHJlcXVpcmUoJy4vY29tcG9zZScpO1xuXG52YXIgX2NvbXBvc2UzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9zZTIpO1xuXG52YXIgX2NvbXBvc2VfYWxsID0gcmVxdWlyZSgnLi9jb21wb3NlX2FsbCcpO1xuXG52YXIgX2NvbXBvc2VfYWxsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbXBvc2VfYWxsKTtcblxudmFyIF93aXRoX3RyYWNrZXIgPSByZXF1aXJlKCcuL2NvbXBvc2Vycy93aXRoX3RyYWNrZXInKTtcblxudmFyIF93aXRoX3RyYWNrZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2l0aF90cmFja2VyKTtcblxudmFyIF93aXRoX3Byb21pc2UgPSByZXF1aXJlKCcuL2NvbXBvc2Vycy93aXRoX3Byb21pc2UnKTtcblxudmFyIF93aXRoX3Byb21pc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2l0aF9wcm9taXNlKTtcblxudmFyIF93aXRoX29ic2VydmFibGUgPSByZXF1aXJlKCcuL2NvbXBvc2Vycy93aXRoX29ic2VydmFibGUnKTtcblxudmFyIF93aXRoX29ic2VydmFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2l0aF9vYnNlcnZhYmxlKTtcblxudmFyIF93aXRoX21vYnggPSByZXF1aXJlKCcuL2NvbXBvc2Vycy93aXRoX21vYngnKTtcblxudmFyIF93aXRoX21vYngyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2l0aF9tb2J4KTtcblxudmFyIF9jb21tb25fY29tcG9uZW50cyA9IHJlcXVpcmUoJy4vY29tbW9uX2NvbXBvbmVudHMnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNvbXBvc2UgPSBleHBvcnRzLmNvbXBvc2UgPSBfY29tcG9zZTMuZGVmYXVsdDtcbnZhciBjb21wb3NlQWxsID0gZXhwb3J0cy5jb21wb3NlQWxsID0gX2NvbXBvc2VfYWxsMi5kZWZhdWx0O1xudmFyIGNvbXBvc2VXaXRoVHJhY2tlciA9IGV4cG9ydHMuY29tcG9zZVdpdGhUcmFja2VyID0gX3dpdGhfdHJhY2tlcjIuZGVmYXVsdDtcbnZhciBjb21wb3NlV2l0aFByb21pc2UgPSBleHBvcnRzLmNvbXBvc2VXaXRoUHJvbWlzZSA9IF93aXRoX3Byb21pc2UyLmRlZmF1bHQ7XG52YXIgY29tcG9zZVdpdGhPYnNlcnZhYmxlID0gZXhwb3J0cy5jb21wb3NlV2l0aE9ic2VydmFibGUgPSBfd2l0aF9vYnNlcnZhYmxlMi5kZWZhdWx0O1xudmFyIGNvbXBvc2VXaXRoTW9ieCA9IGV4cG9ydHMuY29tcG9zZVdpdGhNb2J4ID0gX3dpdGhfbW9ieDIuZGVmYXVsdDtcblxudmFyIGRpc2FibGVNb2RlID0gZmFsc2U7XG52YXIgc3R1YmJpbmdNb2RlID0gZmFsc2U7XG52YXIgZGVmYXVsdEVycm9yQ29tcG9uZW50ID0gbnVsbDtcbnZhciBkZWZhdWx0TG9hZGluZ0NvbXBvbmVudCA9IG51bGw7XG5cbi8vIEEgd2F5IHRvIGRpc2FibGUgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgcmVhY3Qta29tcG9zZXIgYW5kIGFsd2F5cyBzaG93IHRoZVxuLy8gbG9hZGluZyBjb21wb25lbnQuXG4vLyBUaGlzIGlzIHZlcnkgdXNlZnVsIGluIHRlc3Rpbmcgd2hlcmUgd2UgY2FuIGlnbm9yZSBSZWFjdCBrb21wc2VyJ3MgYmVoYXZpb3VyLlxuZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgdmFyIHZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gIGRpc2FibGVNb2RlID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldERpc2FibGVNb2RlKCkge1xuICByZXR1cm4gZGlzYWJsZU1vZGU7XG59XG5cbi8vIHN0dWJiaW5nXG5cbmZ1bmN0aW9uIHNldFN0dWJiaW5nTW9kZSgpIHtcbiAgdmFyIHZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gIHN0dWJiaW5nTW9kZSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRTdHViYmluZ01vZGUoKSB7XG4gIHJldHVybiBzdHViYmluZ01vZGU7XG59XG5cbmZ1bmN0aW9uIHNldENvbXBvc2VyU3R1YihDb250YWluZXIsIGNvbXBvc2VyU3R1Yikge1xuICBDb250YWluZXIuX19jb21wb3NlclN0dWIgPSBjb21wb3NlclN0dWI7XG59XG5cbi8vIGRlZmF1bHQgY29tcG9uZW50c1xuZnVuY3Rpb24gc2V0RGVmYXVsdExvYWRpbmdDb21wb25lbnQoY29tcCkge1xuICBkZWZhdWx0TG9hZGluZ0NvbXBvbmVudCA9IGNvbXA7XG59XG5cbmZ1bmN0aW9uIHNldERlZmF1bHRFcnJvckNvbXBvbmVudChjb21wKSB7XG4gIGRlZmF1bHRFcnJvckNvbXBvbmVudCA9IGNvbXA7XG59XG5cbmZ1bmN0aW9uIF9nZXREZWZhdWx0TG9hZGluZ0NvbXBvbmVudCgpIHtcbiAgcmV0dXJuIGRlZmF1bHRMb2FkaW5nQ29tcG9uZW50IHx8IF9jb21tb25fY29tcG9uZW50cy5EZWZhdWx0TG9hZGluZ0NvbXBvbmVudDtcbn1cblxuZnVuY3Rpb24gX2dldERlZmF1bHRFcnJvckNvbXBvbmVudCgpIHtcbiAgcmV0dXJuIGRlZmF1bHRFcnJvckNvbXBvbmVudCB8fCBfY29tbW9uX2NvbXBvbmVudHMuRGVmYXVsdEVycm9yQ29tcG9uZW50O1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuaW5oZXJpdFN0YXRpY3MgPSBpbmhlcml0U3RhdGljcztcbmV4cG9ydHMuaXNSZWFjdE5hdGl2ZSA9IGlzUmVhY3ROYXRpdmU7XG5cbnZhciBfaG9pc3ROb25SZWFjdFN0YXRpY3MgPSByZXF1aXJlKCdob2lzdC1ub24tcmVhY3Qtc3RhdGljcycpO1xuXG52YXIgX2hvaXN0Tm9uUmVhY3RTdGF0aWNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hvaXN0Tm9uUmVhY3RTdGF0aWNzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaW5oZXJpdFN0YXRpY3MoQ29udGFpbmVyLCBDaGlsZENvbXBvbmVudCkge1xuICB2YXIgY2hpbGREaXNwbGF5TmFtZSA9XG4gIC8vIEdldCB0aGUgZGlzcGxheSBuYW1lIGlmIGl0J3Mgc2V0LlxuICBDaGlsZENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fFxuICAvLyBHZXQgdGhlIGRpc3BsYXkgbmFtZSBmcm9tIHRoZSBmdW5jdGlvbiBuYW1lLlxuICBDaGlsZENvbXBvbmVudC5uYW1lIHx8XG4gIC8vIElmIG5vdCwganVzdCBhZGQgYSBkZWZhdWx0IG9uZS5cbiAgJ0NoaWxkQ29tcG9uZW50JztcblxuICBDb250YWluZXIuZGlzcGxheU5hbWUgPSAnQ29udGFpbmVyKCcgKyBjaGlsZERpc3BsYXlOYW1lICsgJyknO1xuICByZXR1cm4gKDAsIF9ob2lzdE5vblJlYWN0U3RhdGljczIuZGVmYXVsdCkoQ29udGFpbmVyLCBDaGlsZENvbXBvbmVudCk7XG59XG5cbmZ1bmN0aW9uIGlzUmVhY3ROYXRpdmUoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbmRvdy5SZWFjdEtvbXBvc2VyID0gcmVxdWlyZSgnLi9pbmRleCcpO1xufSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cbnZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9hc3NpZ24yLmRlZmF1bHQgfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3NldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIik7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9jcmVhdGVcIik7XG5cbnZhciBfY3JlYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZSk7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHN1cGVyQ2xhc3MpKSk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCA/ICgwLCBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAoKHR5cGVvZiBjYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShjYWxsKSkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIik7XG5cbnZhciBfaXRlcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXRlcmF0b3IpO1xuXG52YXIgX3N5bWJvbCA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbFwiKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfaXRlcmF0b3IyLmRlZmF1bHQgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpIHtcbiAgcmV0dXJuICRPYmplY3QuY3JlYXRlKFAsIEQpO1xufTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5zZXRQcm90b3R5cGVPZjtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuU3ltYm9sO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNi4xMScgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuIiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgcmVzdWx0ID0gZ2V0S2V5cyhpdCk7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZiAoZ2V0U3ltYm9scykge1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdCk7XG4gICAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChzeW1ib2xzLmxlbmd0aCA+IGkpIGlmIChpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBoYXMoZXhwb3J0cywga2V5KSkgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgdHlwZW9mIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSAhPSAnZnVuY3Rpb24nKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb25lLCB2YWx1ZSkge1xuICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZSB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7XG4iLCJ2YXIgTUVUQSA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBzZXREZXNjID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBpZCA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24gKGl0KSB7XG4gIHNldERlc2MoaXQsIE1FVEEsIHsgdmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IH0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSkgc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6IE1FVEEsXG4gIE5FRUQ6IGZhbHNlLFxuICBmYXN0S2V5OiBmYXN0S2V5LFxuICBnZXRXZWFrOiBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSB7XG4gICAgICBrZXkgPSBrZXlzW2orK107XG4gICAgICBpZiAoIURFU0NSSVBUT1JTIHx8IGlzRW51bS5jYWxsKFMsIGtleSkpIFRba2V5XSA9IFNba2V5XTtcbiAgICB9XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcbiIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZFBzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIEVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJyk7XG4gIHZhciBpID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcbiIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgZ09QTiA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZjtcbnZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG4iLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKE8sIHByb3RvKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBpZiAoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCkgdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24gKHRlc3QsIGJ1Z2d5LCBzZXQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoIChlKSB7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYgKGJ1Z2d5KSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG4iLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiBjb3JlLnZlcnNpb24sXG4gIG1vZGU6IHJlcXVpcmUoJy4vX2xpYnJhcnknKSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE5IERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG4iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcbiIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmIChuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKSBkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7IHZhbHVlOiB3a3NFeHQuZihuYW1lKSB9KTtcbn07XG4iLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuL193a3MnKTtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IGNyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpIH0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcbiIsIi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpIHtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcbiIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IHNldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXQgfSk7XG4iLCIiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBNRVRBID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWTtcbnZhciAkZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgd2tzRGVmaW5lID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpO1xudmFyIGVudW1LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBfY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGdPUE5FeHQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKTtcbnZhciAkR09QRCA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJyk7XG52YXIgJEdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyICREUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BEID0gJEdPUEQuZjtcbnZhciBkUCA9ICREUC5mO1xudmFyIGdPUE4gPSBnT1BORXh0LmY7XG52YXIgJFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgJEpTT04gPSBnbG9iYWwuSlNPTjtcbnZhciBfc3RyaW5naWZ5ID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIEhJRERFTiA9IHdrcygnX2hpZGRlbicpO1xudmFyIFRPX1BSSU1JVElWRSA9IHdrcygndG9QcmltaXRpdmUnKTtcbnZhciBpc0VudW0gPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9QU3ltYm9scyA9IHNoYXJlZCgnb3Atc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0W1BST1RPVFlQRV07XG52YXIgVVNFX05BVElWRSA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbicgJiYgISEkR09QUy5mO1xudmFyIFFPYmplY3QgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkUCh0aGlzLCAnYScsIHsgdmFsdWU6IDcgfSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbiAoaXQsIGtleSwgRCkge1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYgKHByb3RvRGVzYykgZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZiAocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bykgZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAodGFnKSB7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKSB7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG8pICRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmIChoYXMoQWxsU3ltYm9scywga2V5KSkge1xuICAgIGlmICghRC5lbnVtZXJhYmxlKSB7XG4gICAgICBpZiAoIWhhcyhpdCwgSElEREVOKSkgZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pIGl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwgeyBlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKSB9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKSB7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgbCA9IGtleXMubGVuZ3RoO1xuICB2YXIga2V5O1xuICB3aGlsZSAobCA+IGkpICRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApIHtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpIHtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gIGl0ID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSkgcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmIChEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpIEQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgdmFyIG5hbWVzID0gZ09QTih0b0lPYmplY3QoaXQpKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSB7XG4gICAgaWYgKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSB7XG4gIHZhciBJU19PUCA9IGl0ID09PSBPYmplY3RQcm90bztcbiAgdmFyIG5hbWVzID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKSByZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmICghVVNFX05BVElWRSkge1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCkgdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzID09PSBPYmplY3RQcm90bykgJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYgKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpIHRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYgKERFU0NSSVBUT1JTICYmIHNldHRlcikgc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0IH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICAkR09QUy5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZiAoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSkge1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgU3ltYm9sOiAkU3ltYm9sIH0pO1xuXG5mb3IgKHZhciBlczZTeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGogPSAwOyBlczZTeW1ib2xzLmxlbmd0aCA+IGo7KXdrcyhlczZTeW1ib2xzW2orK10pO1xuXG5mb3IgKHZhciB3ZWxsS25vd25TeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgayA9IDA7IHdlbGxLbm93blN5bWJvbHMubGVuZ3RoID4gazspIHdrc0RlZmluZSh3ZWxsS25vd25TeW1ib2xzW2srK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKHN5bSkge1xuICAgIGlmICghaXNTeW1ib2woc3ltKSkgdGhyb3cgVHlwZUVycm9yKHN5bSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICAgIGZvciAodmFyIGtleSBpbiBTeW1ib2xSZWdpc3RyeSkgaWYgKFN5bWJvbFJlZ2lzdHJ5W2tleV0gPT09IHN5bSkgcmV0dXJuIGtleTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbiAoKSB7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyBDaHJvbWUgMzggYW5kIDM5IGBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzYCBmYWlscyBvbiBwcmltaXRpdmVzXG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zNDQzXG52YXIgRkFJTFNfT05fUFJJTUlUSVZFUyA9ICRmYWlscyhmdW5jdGlvbiAoKSB7ICRHT1BTLmYoMSk7IH0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIEZBSUxTX09OX1BSSU1JVElWRVMsICdPYmplY3QnLCB7XG4gIGdldE93blByb3BlcnR5U3ltYm9sczogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSB7XG4gICAgcmV0dXJuICRHT1BTLmYodG9PYmplY3QoaXQpKTtcbiAgfVxufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoeyBhOiBTIH0pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCkge1xuICAgIHZhciBhcmdzID0gW2l0XTtcbiAgICB2YXIgaSA9IDE7XG4gICAgdmFyIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgICRyZXBsYWNlciA9IHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZiAoIWlzT2JqZWN0KHJlcGxhY2VyKSAmJiBpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSkgcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgaWYgKCFpc0FycmF5KHJlcGxhY2VyKSkgcmVwbGFjZXIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiAkcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykgdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuIiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdhc3luY0l0ZXJhdG9yJyk7XG4iLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ29ic2VydmFibGUnKTtcbiIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbnZhciBET01JdGVyYWJsZXMgPSAoJ0NTU1J1bGVMaXN0LENTU1N0eWxlRGVjbGFyYXRpb24sQ1NTVmFsdWVMaXN0LENsaWVudFJlY3RMaXN0LERPTVJlY3RMaXN0LERPTVN0cmluZ0xpc3QsJyArXG4gICdET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LCcgK1xuICAnTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCwnICtcbiAgJ1NWR1BhdGhTZWdMaXN0LFNWR1BvaW50TGlzdCxTVkdTdHJpbmdMaXN0LFNWR1RyYW5zZm9ybUxpc3QsU291cmNlQnVmZmVyTGlzdCxTdHlsZVNoZWV0TGlzdCxUZXh0VHJhY2tDdWVMaXN0LCcgK1xuICAnVGV4dFRyYWNrTGlzdCxUb3VjaExpc3QnKS5zcGxpdCgnLCcpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IERPTUl0ZXJhYmxlcy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IERPTUl0ZXJhYmxlc1tpXTtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV07XG4gIHZhciBwcm90byA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10pIGhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSRUFDVF9TVEFUSUNTID0ge1xuICAgIGNoaWxkQ29udGV4dFR5cGVzOiB0cnVlLFxuICAgIGNvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgZ2V0RGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIG1peGluczogdHJ1ZSxcbiAgICBwcm9wVHlwZXM6IHRydWUsXG4gICAgdHlwZTogdHJ1ZVxufTtcblxudmFyIEtOT1dOX1NUQVRJQ1MgPSB7XG4gICAgbmFtZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHRydWUsXG4gICAgcHJvdG90eXBlOiB0cnVlLFxuICAgIGNhbGxlcjogdHJ1ZSxcbiAgICBhcmd1bWVudHM6IHRydWUsXG4gICAgYXJpdHk6IHRydWVcbn07XG5cbnZhciBpc0dldE93blByb3BlcnR5U3ltYm9sc0F2YWlsYWJsZSA9IHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgc291cmNlQ29tcG9uZW50LCBjdXN0b21TdGF0aWNzKSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2VDb21wb25lbnQgIT09ICdzdHJpbmcnKSB7IC8vIGRvbid0IGhvaXN0IG92ZXIgc3RyaW5nIChodG1sKSBjb21wb25lbnRzXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlQ29tcG9uZW50KTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNHZXRPd25Qcm9wZXJ0eVN5bWJvbHNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZUNvbXBvbmVudCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoIVJFQUNUX1NUQVRJQ1Nba2V5c1tpXV0gJiYgIUtOT1dOX1NUQVRJQ1Nba2V5c1tpXV0gJiYgKCFjdXN0b21TdGF0aWNzIHx8ICFjdXN0b21TdGF0aWNzW2tleXNbaV1dKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldENvbXBvbmVudFtrZXlzW2ldXSA9IHNvdXJjZUNvbXBvbmVudFtrZXlzW2ldXTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjkuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmblRvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UoL1tcXFxcXiQuKis/KClbXFxde318XS9nLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgcmV0dXJuIGlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaSB3aGljaCByZXR1cm4gJ2Z1bmN0aW9uJyBmb3IgcmVnZXhlc1xuICAvLyBhbmQgU2FmYXJpIDggZXF1aXZhbGVudHMgd2hpY2ggcmV0dXJuICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvcnMuXG4gIHJldHVybiBpc09iamVjdCh2YWx1ZSkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjQgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZuVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZSgvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2csICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNBcnJheSA9IGdldE5hdGl2ZShBcnJheSwgJ2lzQXJyYXknKTtcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgcmV0dXJuIGlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcnJheVRhZztcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpIHdoaWNoIHJldHVybiAnZnVuY3Rpb24nIGZvciByZWdleGVzXG4gIC8vIGFuZCBTYWZhcmkgOCBlcXVpdmFsZW50cyB3aGljaCByZXR1cm4gJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGNvbnN0cnVjdG9ycy5cbiAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgcmV0dXJuIHJlSXNOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiByZUlzSG9zdEN0b3IudGVzdCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMS4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnbG9kYXNoLl9nZXRuYXRpdmUnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXlxcZCskLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IGdldE5hdGl2ZShPYmplY3QsICdrZXlzJyk7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgoZ2V0TGVuZ3RoKHZhbHVlKSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgPyArdmFsdWUgOiAtMTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQSBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbiBvZiBgT2JqZWN0LmtleXNgIHdoaWNoIGNyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlXG4gKiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gIHZhciBwcm9wcyA9IGtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBwcm9wc0xlbmd0aCAmJiBvYmplY3QubGVuZ3RoO1xuXG4gIHZhciBhbGxvd0luZGV4ZXMgPSAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgcHJvcHNMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmICgoYWxsb3dJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBDdG9yID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3QuY29uc3RydWN0b3I7XG4gIGlmICgodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0KSB8fFxuICAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICBsZW5ndGggPSAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xucmVnaXN0ZXJHbG9iYWxzKCk7XG5leHBvcnRzLmV4dHJhcyA9IHtcbiAgICBhbGxvd1N0YXRlQ2hhbmdlczogYWxsb3dTdGF0ZUNoYW5nZXMsXG4gICAgZ2V0QXRvbTogZ2V0QXRvbSxcbiAgICBnZXREZWJ1Z05hbWU6IGdldERlYnVnTmFtZSxcbiAgICBnZXREZXBlbmRlbmN5VHJlZTogZ2V0RGVwZW5kZW5jeVRyZWUsXG4gICAgZ2V0T2JzZXJ2ZXJUcmVlOiBnZXRPYnNlcnZlclRyZWUsXG4gICAgaXNDb21wdXRpbmdEZXJpdmF0aW9uOiBpc0NvbXB1dGluZ0Rlcml2YXRpb24sXG4gICAgaXNTcHlFbmFibGVkOiBpc1NweUVuYWJsZWQsXG4gICAgcmVzZXRHbG9iYWxTdGF0ZTogcmVzZXRHbG9iYWxTdGF0ZSxcbiAgICBzcHlSZXBvcnQ6IHNweVJlcG9ydCxcbiAgICBzcHlSZXBvcnRFbmQ6IHNweVJlcG9ydEVuZCxcbiAgICBzcHlSZXBvcnRTdGFydDogc3B5UmVwb3J0U3RhcnQsXG4gICAgdHJhY2tUcmFuc2l0aW9uczogdHJhY2tUcmFuc2l0aW9ucyxcbiAgICBzZXRSZWFjdGlvblNjaGVkdWxlcjogc2V0UmVhY3Rpb25TY2hlZHVsZXJcbn07XG5leHBvcnRzLl8gPSB7XG4gICAgZ2V0QWRtaW5pc3RyYXRpb246IGdldEFkbWluaXN0cmF0aW9uLFxuICAgIHJlc2V0R2xvYmFsU3RhdGU6IHJlc2V0R2xvYmFsU3RhdGVcbn07XG5pZiAodHlwZW9mIF9fTU9CWF9ERVZUT09MU19HTE9CQUxfSE9PS19fID09PSAnb2JqZWN0Jykge1xuICAgIF9fTU9CWF9ERVZUT09MU19HTE9CQUxfSE9PS19fLmluamVjdE1vYngobW9kdWxlLmV4cG9ydHMpO1xufVxudmFyIGFjdGlvbkZpZWxkRGVjb3JhdG9yID0gY3JlYXRlQ2xhc3NQcm9wZXJ0eURlY29yYXRvcihmdW5jdGlvbiAodGFyZ2V0LCBrZXksIHZhbHVlLCBhcmdzLCBvcmlnaW5hbERlc2NyaXB0b3IpIHtcbiAgICB2YXIgYWN0aW9uTmFtZSA9IChhcmdzICYmIGFyZ3MubGVuZ3RoID09PSAxKSA/IGFyZ3NbMF0gOiAodmFsdWUubmFtZSB8fCBrZXkgfHwgXCI8dW5uYW1lZCBhY3Rpb24+XCIpO1xuICAgIHZhciB3cmFwcGVkQWN0aW9uID0gYWN0aW9uKGFjdGlvbk5hbWUsIHZhbHVlKTtcbiAgICBhZGRIaWRkZW5Qcm9wKHRhcmdldCwga2V5LCB3cmFwcGVkQWN0aW9uKTtcbn0sIGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gdGhpc1trZXldO1xufSwgZnVuY3Rpb24gKCkge1xuICAgIGludmFyaWFudChmYWxzZSwgXCJJdCBpcyBub3QgYWxsb3dlZCB0byBhc3NpZ24gbmV3IHZhbHVlcyB0byBAYWN0aW9uIGZpZWxkc1wiKTtcbn0sIGZhbHNlLCB0cnVlKTtcbmZ1bmN0aW9uIGFjdGlvbihhcmcxLCBhcmcyLCBhcmczLCBhcmc0KSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZzEgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUFjdGlvbihhcmcxLm5hbWUgfHwgXCI8dW5uYW1lZCBhY3Rpb24+XCIsIGFyZzEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBhcmcyID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJldHVybiBjcmVhdGVBY3Rpb24oYXJnMSwgYXJnMik7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZzEgPT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybiBuYW1lZEFjdGlvbkRlY29yYXRvcihhcmcxKTtcbiAgICByZXR1cm4gbmFtZWRBY3Rpb25EZWNvcmF0b3IoYXJnMikuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn1cbmV4cG9ydHMuYWN0aW9uID0gYWN0aW9uO1xuZnVuY3Rpb24gbmFtZWRBY3Rpb25EZWNvcmF0b3IobmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wLCBkZXNjcmlwdG9yKSB7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yICYmIHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBjcmVhdGVBY3Rpb24obmFtZSwgZGVzY3JpcHRvci52YWx1ZSk7XG4gICAgICAgICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb25GaWVsZERlY29yYXRvcihuYW1lKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5mdW5jdGlvbiBydW5JbkFjdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgdmFyIGFjdGlvbk5hbWUgPSB0eXBlb2YgYXJnMSA9PT0gXCJzdHJpbmdcIiA/IGFyZzEgOiBhcmcxLm5hbWUgfHwgXCI8dW5uYW1lZCBhY3Rpb24+XCI7XG4gICAgdmFyIGZuID0gdHlwZW9mIGFyZzEgPT09IFwiZnVuY3Rpb25cIiA/IGFyZzEgOiBhcmcyO1xuICAgIHZhciBzY29wZSA9IHR5cGVvZiBhcmcxID09PSBcImZ1bmN0aW9uXCIgPyBhcmcyIDogYXJnMztcbiAgICBpbnZhcmlhbnQodHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCIsIFwiYHJ1bkluQWN0aW9uYCBleHBlY3RzIGEgZnVuY3Rpb25cIik7XG4gICAgaW52YXJpYW50KGZuLmxlbmd0aCA9PT0gMCwgXCJgcnVuSW5BY3Rpb25gIGV4cGVjdHMgYSBmdW5jdGlvbiB3aXRob3V0IGFyZ3VtZW50c1wiKTtcbiAgICBpbnZhcmlhbnQodHlwZW9mIGFjdGlvbk5hbWUgPT09IFwic3RyaW5nXCIgJiYgYWN0aW9uTmFtZS5sZW5ndGggPiAwLCBcImFjdGlvbnMgc2hvdWxkIGhhdmUgdmFsaWQgbmFtZXMsIGdvdDogJ1wiICsgYWN0aW9uTmFtZSArIFwiJ1wiKTtcbiAgICByZXR1cm4gZXhlY3V0ZUFjdGlvbihhY3Rpb25OYW1lLCBmbiwgc2NvcGUsIHVuZGVmaW5lZCk7XG59XG5leHBvcnRzLnJ1bkluQWN0aW9uID0gcnVuSW5BY3Rpb247XG5mdW5jdGlvbiBpc0FjdGlvbih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IFwiZnVuY3Rpb25cIiAmJiB0aGluZy5pc01vYnhBY3Rpb24gPT09IHRydWU7XG59XG5leHBvcnRzLmlzQWN0aW9uID0gaXNBY3Rpb247XG5mdW5jdGlvbiBhdXRvcnVuKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICB2YXIgbmFtZSwgdmlldywgc2NvcGU7XG4gICAgaWYgKHR5cGVvZiBhcmcxID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIG5hbWUgPSBhcmcxO1xuICAgICAgICB2aWV3ID0gYXJnMjtcbiAgICAgICAgc2NvcGUgPSBhcmczO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYXJnMSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIG5hbWUgPSBhcmcxLm5hbWUgfHwgKFwiQXV0b3J1bkBcIiArIGdldE5leHRJZCgpKTtcbiAgICAgICAgdmlldyA9IGFyZzE7XG4gICAgICAgIHNjb3BlID0gYXJnMjtcbiAgICB9XG4gICAgYXNzZXJ0VW53cmFwcGVkKHZpZXcsIFwiYXV0b3J1biBtZXRob2RzIGNhbm5vdCBoYXZlIG1vZGlmaWVyc1wiKTtcbiAgICBpbnZhcmlhbnQodHlwZW9mIHZpZXcgPT09IFwiZnVuY3Rpb25cIiwgXCJhdXRvcnVuIGV4cGVjdHMgYSBmdW5jdGlvblwiKTtcbiAgICBpbnZhcmlhbnQoaXNBY3Rpb24odmlldykgPT09IGZhbHNlLCBcIldhcm5pbmc6IGF0dGVtcHRlZCB0byBwYXNzIGFuIGFjdGlvbiB0byBhdXRvcnVuLiBBY3Rpb25zIGFyZSB1bnRyYWNrZWQgYW5kIHdpbGwgbm90IHRyaWdnZXIgb24gc3RhdGUgY2hhbmdlcy4gVXNlIGByZWFjdGlvbmAgb3Igd3JhcCBvbmx5IHlvdXIgc3RhdGUgbW9kaWZpY2F0aW9uIGNvZGUgaW4gYW4gYWN0aW9uLlwiKTtcbiAgICBpZiAoc2NvcGUpXG4gICAgICAgIHZpZXcgPSB2aWV3LmJpbmQoc2NvcGUpO1xuICAgIHZhciByZWFjdGlvbiA9IG5ldyBSZWFjdGlvbihuYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudHJhY2socmVhY3Rpb25SdW5uZXIpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHJlYWN0aW9uUnVubmVyKCkge1xuICAgICAgICB2aWV3KHJlYWN0aW9uKTtcbiAgICB9XG4gICAgcmVhY3Rpb24uc2NoZWR1bGUoKTtcbiAgICByZXR1cm4gcmVhY3Rpb24uZ2V0RGlzcG9zZXIoKTtcbn1cbmV4cG9ydHMuYXV0b3J1biA9IGF1dG9ydW47XG5mdW5jdGlvbiB3aGVuKGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQpIHtcbiAgICB2YXIgbmFtZSwgcHJlZGljYXRlLCBlZmZlY3QsIHNjb3BlO1xuICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBuYW1lID0gYXJnMTtcbiAgICAgICAgcHJlZGljYXRlID0gYXJnMjtcbiAgICAgICAgZWZmZWN0ID0gYXJnMztcbiAgICAgICAgc2NvcGUgPSBhcmc0O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYXJnMSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIG5hbWUgPSAoXCJXaGVuQFwiICsgZ2V0TmV4dElkKCkpO1xuICAgICAgICBwcmVkaWNhdGUgPSBhcmcxO1xuICAgICAgICBlZmZlY3QgPSBhcmcyO1xuICAgICAgICBzY29wZSA9IGFyZzM7XG4gICAgfVxuICAgIHZhciBkaXNwb3NlciA9IGF1dG9ydW4obmFtZSwgZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHNjb3BlKSkge1xuICAgICAgICAgICAgci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB2YXIgcHJldlVudHJhY2tlZCA9IHVudHJhY2tlZFN0YXJ0KCk7XG4gICAgICAgICAgICBlZmZlY3QuY2FsbChzY29wZSk7XG4gICAgICAgICAgICB1bnRyYWNrZWRFbmQocHJldlVudHJhY2tlZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGlzcG9zZXI7XG59XG5leHBvcnRzLndoZW4gPSB3aGVuO1xuZnVuY3Rpb24gYXV0b3J1blVudGlsKHByZWRpY2F0ZSwgZWZmZWN0LCBzY29wZSkge1xuICAgIGRlcHJlY2F0ZWQoXCJgYXV0b3J1blVudGlsYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGB3aGVuYC5cIik7XG4gICAgcmV0dXJuIHdoZW4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn1cbmV4cG9ydHMuYXV0b3J1blVudGlsID0gYXV0b3J1blVudGlsO1xuZnVuY3Rpb24gYXV0b3J1bkFzeW5jKGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQpIHtcbiAgICB2YXIgbmFtZSwgZnVuYywgZGVsYXksIHNjb3BlO1xuICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBuYW1lID0gYXJnMTtcbiAgICAgICAgZnVuYyA9IGFyZzI7XG4gICAgICAgIGRlbGF5ID0gYXJnMztcbiAgICAgICAgc2NvcGUgPSBhcmc0O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYXJnMSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIG5hbWUgPSBhcmcxLm5hbWUgfHwgKFwiQXV0b3J1bkFzeW5jQFwiICsgZ2V0TmV4dElkKCkpO1xuICAgICAgICBmdW5jID0gYXJnMTtcbiAgICAgICAgZGVsYXkgPSBhcmcyO1xuICAgICAgICBzY29wZSA9IGFyZzM7XG4gICAgfVxuICAgIGludmFyaWFudChpc0FjdGlvbihmdW5jKSA9PT0gZmFsc2UsIFwiV2FybmluZzogYXR0ZW1wdGVkIHRvIHBhc3MgYW4gYWN0aW9uIHRvIGF1dG9ydW5Bc3luYy4gQWN0aW9ucyBhcmUgdW50cmFja2VkIGFuZCB3aWxsIG5vdCB0cmlnZ2VyIG9uIHN0YXRlIGNoYW5nZXMuIFVzZSBgcmVhY3Rpb25gIG9yIHdyYXAgb25seSB5b3VyIHN0YXRlIG1vZGlmaWNhdGlvbiBjb2RlIGluIGFuIGFjdGlvbi5cIik7XG4gICAgaWYgKGRlbGF5ID09PSB2b2lkIDApXG4gICAgICAgIGRlbGF5ID0gMTtcbiAgICBpZiAoc2NvcGUpXG4gICAgICAgIGZ1bmMgPSBmdW5jLmJpbmQoc2NvcGUpO1xuICAgIHZhciBpc1NjaGVkdWxlZCA9IGZhbHNlO1xuICAgIHZhciByID0gbmV3IFJlYWN0aW9uKG5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFpc1NjaGVkdWxlZCkge1xuICAgICAgICAgICAgaXNTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaXNTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoIXIuaXNEaXNwb3NlZClcbiAgICAgICAgICAgICAgICAgICAgci50cmFjayhyZWFjdGlvblJ1bm5lcik7XG4gICAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBmdW5jdGlvbiByZWFjdGlvblJ1bm5lcigpIHsgZnVuYyhyKTsgfVxuICAgIHIuc2NoZWR1bGUoKTtcbiAgICByZXR1cm4gci5nZXREaXNwb3NlcigpO1xufVxuZXhwb3J0cy5hdXRvcnVuQXN5bmMgPSBhdXRvcnVuQXN5bmM7XG5mdW5jdGlvbiByZWFjdGlvbihhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1LCBhcmc2KSB7XG4gICAgdmFyIG5hbWUsIGV4cHJlc3Npb24sIGVmZmVjdCwgZmlyZUltbWVkaWF0ZWx5LCBkZWxheSwgc2NvcGU7XG4gICAgaWYgKHR5cGVvZiBhcmcxID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIG5hbWUgPSBhcmcxO1xuICAgICAgICBleHByZXNzaW9uID0gYXJnMjtcbiAgICAgICAgZWZmZWN0ID0gYXJnMztcbiAgICAgICAgZmlyZUltbWVkaWF0ZWx5ID0gYXJnNDtcbiAgICAgICAgZGVsYXkgPSBhcmc1O1xuICAgICAgICBzY29wZSA9IGFyZzY7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBuYW1lID0gYXJnMS5uYW1lIHx8IGFyZzIubmFtZSB8fCAoXCJSZWFjdGlvbkBcIiArIGdldE5leHRJZCgpKTtcbiAgICAgICAgZXhwcmVzc2lvbiA9IGFyZzE7XG4gICAgICAgIGVmZmVjdCA9IGFyZzI7XG4gICAgICAgIGZpcmVJbW1lZGlhdGVseSA9IGFyZzM7XG4gICAgICAgIGRlbGF5ID0gYXJnNDtcbiAgICAgICAgc2NvcGUgPSBhcmc1O1xuICAgIH1cbiAgICBpZiAoZmlyZUltbWVkaWF0ZWx5ID09PSB2b2lkIDApXG4gICAgICAgIGZpcmVJbW1lZGlhdGVseSA9IGZhbHNlO1xuICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKVxuICAgICAgICBkZWxheSA9IDA7XG4gICAgdmFyIF9hID0gZ2V0VmFsdWVNb2RlRnJvbVZhbHVlKGV4cHJlc3Npb24sIFZhbHVlTW9kZS5SZWZlcmVuY2UpLCB2YWx1ZU1vZGUgPSBfYVswXSwgdW53cmFwcGVkRXhwcmVzc2lvbiA9IF9hWzFdO1xuICAgIHZhciBjb21wYXJlU3RydWN0dXJhbCA9IHZhbHVlTW9kZSA9PT0gVmFsdWVNb2RlLlN0cnVjdHVyZTtcbiAgICBpZiAoc2NvcGUpIHtcbiAgICAgICAgdW53cmFwcGVkRXhwcmVzc2lvbiA9IHVud3JhcHBlZEV4cHJlc3Npb24uYmluZChzY29wZSk7XG4gICAgICAgIGVmZmVjdCA9IGFjdGlvbihuYW1lLCBlZmZlY3QuYmluZChzY29wZSkpO1xuICAgIH1cbiAgICB2YXIgZmlyc3RUaW1lID0gdHJ1ZTtcbiAgICB2YXIgaXNTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICB2YXIgbmV4dFZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHZhciByID0gbmV3IFJlYWN0aW9uKG5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGRlbGF5IDwgMSkge1xuICAgICAgICAgICAgcmVhY3Rpb25SdW5uZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghaXNTY2hlZHVsZWQpIHtcbiAgICAgICAgICAgIGlzU2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlzU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmVhY3Rpb25SdW5uZXIoKTtcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHJlYWN0aW9uUnVubmVyKCkge1xuICAgICAgICBpZiAoci5pc0Rpc3Bvc2VkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICByLnRyYWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB2ID0gdW53cmFwcGVkRXhwcmVzc2lvbihyKTtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB2YWx1ZURpZENoYW5nZShjb21wYXJlU3RydWN0dXJhbCwgbmV4dFZhbHVlLCB2KTtcbiAgICAgICAgICAgIG5leHRWYWx1ZSA9IHY7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZmlyc3RUaW1lICYmIGZpcmVJbW1lZGlhdGVseSlcbiAgICAgICAgICAgIGVmZmVjdChuZXh0VmFsdWUsIHIpO1xuICAgICAgICBpZiAoIWZpcnN0VGltZSAmJiBjaGFuZ2VkID09PSB0cnVlKVxuICAgICAgICAgICAgZWZmZWN0KG5leHRWYWx1ZSwgcik7XG4gICAgICAgIGlmIChmaXJzdFRpbWUpXG4gICAgICAgICAgICBmaXJzdFRpbWUgPSBmYWxzZTtcbiAgICB9XG4gICAgci5zY2hlZHVsZSgpO1xuICAgIHJldHVybiByLmdldERpc3Bvc2VyKCk7XG59XG5leHBvcnRzLnJlYWN0aW9uID0gcmVhY3Rpb247XG52YXIgY29tcHV0ZWREZWNvcmF0b3IgPSBjcmVhdGVDbGFzc1Byb3BlcnR5RGVjb3JhdG9yKGZ1bmN0aW9uICh0YXJnZXQsIG5hbWUsIF8sIGRlY29yYXRvckFyZ3MsIG9yaWdpbmFsRGVzY3JpcHRvcikge1xuICAgIGludmFyaWFudCh0eXBlb2Ygb3JpZ2luYWxEZXNjcmlwdG9yICE9PSBcInVuZGVmaW5lZFwiLCBcIkBjb21wdXRlZCBjYW4gb25seSBiZSB1c2VkIG9uIGdldHRlciBmdW5jdGlvbnMsIGxpa2U6ICdAY29tcHV0ZWQgZ2V0IG15UHJvcHMoKSB7IHJldHVybiAuLi47IH0nLiBJdCBsb29rcyBsaWtlIGl0IHdhcyB1c2VkIG9uIGEgcHJvcGVydHkuXCIpO1xuICAgIHZhciBiYXNlVmFsdWUgPSBvcmlnaW5hbERlc2NyaXB0b3IuZ2V0O1xuICAgIHZhciBzZXR0ZXIgPSBvcmlnaW5hbERlc2NyaXB0b3Iuc2V0O1xuICAgIGludmFyaWFudCh0eXBlb2YgYmFzZVZhbHVlID09PSBcImZ1bmN0aW9uXCIsIFwiQGNvbXB1dGVkIGNhbiBvbmx5IGJlIHVzZWQgb24gZ2V0dGVyIGZ1bmN0aW9ucywgbGlrZTogJ0Bjb21wdXRlZCBnZXQgbXlQcm9wcygpIHsgcmV0dXJuIC4uLjsgfSdcIik7XG4gICAgdmFyIGNvbXBhcmVTdHJ1Y3R1cmFsID0gZmFsc2U7XG4gICAgaWYgKGRlY29yYXRvckFyZ3MgJiYgZGVjb3JhdG9yQXJncy5sZW5ndGggPT09IDEgJiYgZGVjb3JhdG9yQXJnc1swXS5hc1N0cnVjdHVyZSA9PT0gdHJ1ZSlcbiAgICAgICAgY29tcGFyZVN0cnVjdHVyYWwgPSB0cnVlO1xuICAgIHZhciBhZG0gPSBhc09ic2VydmFibGVPYmplY3QodGFyZ2V0LCB1bmRlZmluZWQsIFZhbHVlTW9kZS5SZWN1cnNpdmUpO1xuICAgIGRlZmluZU9ic2VydmFibGVQcm9wZXJ0eShhZG0sIG5hbWUsIGNvbXBhcmVTdHJ1Y3R1cmFsID8gYXNTdHJ1Y3R1cmUoYmFzZVZhbHVlKSA6IGJhc2VWYWx1ZSwgZmFsc2UsIHNldHRlcik7XG59LCBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBvYnNlcnZhYmxlID0gdGhpcy4kbW9ieC52YWx1ZXNbbmFtZV07XG4gICAgaWYgKG9ic2VydmFibGUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5nZXQoKTtcbn0sIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMuJG1vYngudmFsdWVzW25hbWVdLnNldCh2YWx1ZSk7XG59LCBmYWxzZSwgdHJ1ZSk7XG5mdW5jdGlvbiBjb21wdXRlZCh0YXJnZXRPckV4cHIsIGtleU9yU2NvcGVPclNldHRlciwgYmFzZURlc2NyaXB0b3IsIG9wdGlvbnMpIHtcbiAgICBpZiAoKHR5cGVvZiB0YXJnZXRPckV4cHIgPT09IFwiZnVuY3Rpb25cIiB8fCBpc01vZGlmaWVyV3JhcHBlcih0YXJnZXRPckV4cHIpKSAmJiBhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgICBpZiAodHlwZW9mIGtleU9yU2NvcGVPclNldHRlciA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVkRXhwcih0YXJnZXRPckV4cHIsIGtleU9yU2NvcGVPclNldHRlciwgdW5kZWZpbmVkKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGNvbXB1dGVkRXhwcih0YXJnZXRPckV4cHIsIHVuZGVmaW5lZCwga2V5T3JTY29wZU9yU2V0dGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXB1dGVkRGVjb3JhdG9yLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59XG5leHBvcnRzLmNvbXB1dGVkID0gY29tcHV0ZWQ7XG5mdW5jdGlvbiBjb21wdXRlZEV4cHIoZXhwciwgc2V0dGVyLCBzY29wZSkge1xuICAgIHZhciBfYSA9IGdldFZhbHVlTW9kZUZyb21WYWx1ZShleHByLCBWYWx1ZU1vZGUuUmVjdXJzaXZlKSwgbW9kZSA9IF9hWzBdLCB2YWx1ZSA9IF9hWzFdO1xuICAgIHJldHVybiBuZXcgQ29tcHV0ZWRWYWx1ZSh2YWx1ZSwgc2NvcGUsIG1vZGUgPT09IFZhbHVlTW9kZS5TdHJ1Y3R1cmUsIHZhbHVlLm5hbWUsIHNldHRlcik7XG59XG5mdW5jdGlvbiBjcmVhdGVUcmFuc2Zvcm1lcih0cmFuc2Zvcm1lciwgb25DbGVhbnVwKSB7XG4gICAgaW52YXJpYW50KHR5cGVvZiB0cmFuc2Zvcm1lciA9PT0gXCJmdW5jdGlvblwiICYmIHRyYW5zZm9ybWVyLmxlbmd0aCA9PT0gMSwgXCJjcmVhdGVUcmFuc2Zvcm1lciBleHBlY3RzIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIG9uZSBhcmd1bWVudFwiKTtcbiAgICB2YXIgb2JqZWN0Q2FjaGUgPSB7fTtcbiAgICB2YXIgcmVzZXRJZCA9IGdsb2JhbFN0YXRlLnJlc2V0SWQ7XG4gICAgdmFyIFRyYW5zZm9ybWVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFRyYW5zZm9ybWVyLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBUcmFuc2Zvcm1lcihzb3VyY2VJZGVudGlmaWVyLCBzb3VyY2VPYmplY3QpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRyYW5zZm9ybWVyKHNvdXJjZU9iamVjdCk7IH0sIG51bGwsIGZhbHNlLCBcIlRyYW5zZm9ybWVyLVwiICsgdHJhbnNmb3JtZXIubmFtZSArIFwiLVwiICsgc291cmNlSWRlbnRpZmllciwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHRoaXMuc291cmNlSWRlbnRpZmllciA9IHNvdXJjZUlkZW50aWZpZXI7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZU9iamVjdCA9IHNvdXJjZU9iamVjdDtcbiAgICAgICAgfVxuICAgICAgICBUcmFuc2Zvcm1lci5wcm90b3R5cGUub25CZWNvbWVVbm9ic2VydmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGxhc3RWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLm9uQmVjb21lVW5vYnNlcnZlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgZGVsZXRlIG9iamVjdENhY2hlW3RoaXMuc291cmNlSWRlbnRpZmllcl07XG4gICAgICAgICAgICBpZiAob25DbGVhbnVwKVxuICAgICAgICAgICAgICAgIG9uQ2xlYW51cChsYXN0VmFsdWUsIHRoaXMuc291cmNlT2JqZWN0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFRyYW5zZm9ybWVyO1xuICAgIH0oQ29tcHV0ZWRWYWx1ZSkpO1xuICAgIHJldHVybiBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICAgIGlmIChyZXNldElkICE9PSBnbG9iYWxTdGF0ZS5yZXNldElkKSB7XG4gICAgICAgICAgICBvYmplY3RDYWNoZSA9IHt9O1xuICAgICAgICAgICAgcmVzZXRJZCA9IGdsb2JhbFN0YXRlLnJlc2V0SWQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlkZW50aWZpZXIgPSBnZXRNZW1vaXphdGlvbklkKG9iamVjdCk7XG4gICAgICAgIHZhciByZWFjdGl2ZVRyYW5zZm9ybWVyID0gb2JqZWN0Q2FjaGVbaWRlbnRpZmllcl07XG4gICAgICAgIGlmIChyZWFjdGl2ZVRyYW5zZm9ybWVyKVxuICAgICAgICAgICAgcmV0dXJuIHJlYWN0aXZlVHJhbnNmb3JtZXIuZ2V0KCk7XG4gICAgICAgIHJlYWN0aXZlVHJhbnNmb3JtZXIgPSBvYmplY3RDYWNoZVtpZGVudGlmaWVyXSA9IG5ldyBUcmFuc2Zvcm1lcihpZGVudGlmaWVyLCBvYmplY3QpO1xuICAgICAgICByZXR1cm4gcmVhY3RpdmVUcmFuc2Zvcm1lci5nZXQoKTtcbiAgICB9O1xufVxuZXhwb3J0cy5jcmVhdGVUcmFuc2Zvcm1lciA9IGNyZWF0ZVRyYW5zZm9ybWVyO1xuZnVuY3Rpb24gZ2V0TWVtb2l6YXRpb25JZChvYmplY3QpIHtcbiAgICBpZiAob2JqZWN0ID09PSBudWxsIHx8IHR5cGVvZiBvYmplY3QgIT09IFwib2JqZWN0XCIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4XSB0cmFuc2Zvcm0gZXhwZWN0ZWQgc29tZSBraW5kIG9mIG9iamVjdCwgZ290OiBcIiArIG9iamVjdCk7XG4gICAgdmFyIHRpZCA9IG9iamVjdC4kdHJhbnNmb3JtSWQ7XG4gICAgaWYgKHRpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRpZCA9IGdldE5leHRJZCgpO1xuICAgICAgICBhZGRIaWRkZW5Qcm9wKG9iamVjdCwgXCIkdHJhbnNmb3JtSWRcIiwgdGlkKTtcbiAgICB9XG4gICAgcmV0dXJuIHRpZDtcbn1cbmZ1bmN0aW9uIGV4cHIoZXhwciwgc2NvcGUpIHtcbiAgICBpZiAoIWlzQ29tcHV0aW5nRGVyaXZhdGlvbigpKVxuICAgICAgICBjb25zb2xlLndhcm4oXCJbbW9ieC5leHByXSAnZXhwcicgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbnNpZGUgb3RoZXIgcmVhY3RpdmUgZnVuY3Rpb25zLlwiKTtcbiAgICByZXR1cm4gY29tcHV0ZWQoZXhwciwgc2NvcGUpLmdldCgpO1xufVxuZXhwb3J0cy5leHByID0gZXhwcjtcbmZ1bmN0aW9uIGV4dGVuZE9ic2VydmFibGUodGFyZ2V0KSB7XG4gICAgdmFyIHByb3BlcnRpZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBwcm9wZXJ0aWVzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICBpbnZhcmlhbnQoYXJndW1lbnRzLmxlbmd0aCA+PSAyLCBcImV4dGVuZE9ic2VydmFibGUgZXhwZWN0ZWQgMiBvciBtb3JlIGFyZ3VtZW50c1wiKTtcbiAgICBpbnZhcmlhbnQodHlwZW9mIHRhcmdldCA9PT0gXCJvYmplY3RcIiwgXCJleHRlbmRPYnNlcnZhYmxlIGV4cGVjdHMgYW4gb2JqZWN0IGFzIGZpcnN0IGFyZ3VtZW50XCIpO1xuICAgIGludmFyaWFudCghKGlzT2JzZXJ2YWJsZU1hcCh0YXJnZXQpKSwgXCJleHRlbmRPYnNlcnZhYmxlIHNob3VsZCBub3QgYmUgdXNlZCBvbiBtYXBzLCB1c2UgbWFwLm1lcmdlIGluc3RlYWRcIik7XG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wU2V0KSB7XG4gICAgICAgIGludmFyaWFudCh0eXBlb2YgcHJvcFNldCA9PT0gXCJvYmplY3RcIiwgXCJhbGwgYXJndW1lbnRzIG9mIGV4dGVuZE9ic2VydmFibGUgc2hvdWxkIGJlIG9iamVjdHNcIik7XG4gICAgICAgIGludmFyaWFudCghaXNPYnNlcnZhYmxlKHByb3BTZXQpLCBcImV4dGVuZGluZyBhbiBvYmplY3Qgd2l0aCBhbm90aGVyIG9ic2VydmFibGUgKG9iamVjdCkgaXMgbm90IHN1cHBvcnRlZC4gUGxlYXNlIGNvbnN0cnVjdCBhbiBleHBsaWNpdCBwcm9wZXJ0eW1hcCwgdXNpbmcgYHRvSlNgIGlmIG5lZWQuIFNlZSBpc3N1ZSAjNTQwXCIpO1xuICAgICAgICBleHRlbmRPYnNlcnZhYmxlSGVscGVyKHRhcmdldCwgcHJvcFNldCwgVmFsdWVNb2RlLlJlY3Vyc2l2ZSwgbnVsbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmV4cG9ydHMuZXh0ZW5kT2JzZXJ2YWJsZSA9IGV4dGVuZE9ic2VydmFibGU7XG5mdW5jdGlvbiBleHRlbmRPYnNlcnZhYmxlSGVscGVyKHRhcmdldCwgcHJvcGVydGllcywgbW9kZSwgbmFtZSkge1xuICAgIHZhciBhZG0gPSBhc09ic2VydmFibGVPYmplY3QodGFyZ2V0LCBuYW1lLCBtb2RlKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcGVydGllcylcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5KHByb3BlcnRpZXMsIGtleSkpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IHByb3BlcnRpZXMgJiYgIWlzUHJvcGVydHlDb25maWd1cmFibGUodGFyZ2V0LCBrZXkpKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3BlcnRpZXMsIGtleSk7XG4gICAgICAgICAgICBzZXRPYnNlcnZhYmxlT2JqZWN0SW5zdGFuY2VQcm9wZXJ0eShhZG0sIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gZ2V0RGVwZW5kZW5jeVRyZWUodGhpbmcsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIG5vZGVUb0RlcGVuZGVuY3lUcmVlKGdldEF0b20odGhpbmcsIHByb3BlcnR5KSk7XG59XG5mdW5jdGlvbiBub2RlVG9EZXBlbmRlbmN5VHJlZShub2RlKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lXG4gICAgfTtcbiAgICBpZiAobm9kZS5vYnNlcnZpbmcgJiYgbm9kZS5vYnNlcnZpbmcubGVuZ3RoID4gMClcbiAgICAgICAgcmVzdWx0LmRlcGVuZGVuY2llcyA9IHVuaXF1ZShub2RlLm9ic2VydmluZykubWFwKG5vZGVUb0RlcGVuZGVuY3lUcmVlKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZ2V0T2JzZXJ2ZXJUcmVlKHRoaW5nLCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiBub2RlVG9PYnNlcnZlclRyZWUoZ2V0QXRvbSh0aGluZywgcHJvcGVydHkpKTtcbn1cbmZ1bmN0aW9uIG5vZGVUb09ic2VydmVyVHJlZShub2RlKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lXG4gICAgfTtcbiAgICBpZiAoaGFzT2JzZXJ2ZXJzKG5vZGUpKVxuICAgICAgICByZXN1bHQub2JzZXJ2ZXJzID0gZ2V0T2JzZXJ2ZXJzKG5vZGUpLm1hcChub2RlVG9PYnNlcnZlclRyZWUpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBpbnRlcmNlcHQodGhpbmcsIHByb3BPckhhbmRsZXIsIGhhbmRsZXIpIHtcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIGludGVyY2VwdFByb3BlcnR5KHRoaW5nLCBwcm9wT3JIYW5kbGVyLCBoYW5kbGVyKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBpbnRlcmNlcHRJbnRlcmNlcHRhYmxlKHRoaW5nLCBwcm9wT3JIYW5kbGVyKTtcbn1cbmV4cG9ydHMuaW50ZXJjZXB0ID0gaW50ZXJjZXB0O1xuZnVuY3Rpb24gaW50ZXJjZXB0SW50ZXJjZXB0YWJsZSh0aGluZywgaGFuZGxlcikge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHRoaW5nKSAmJiAhaXNPYnNlcnZhYmxlT2JqZWN0KHRoaW5nKSkge1xuICAgICAgICBkZXByZWNhdGVkKFwiUGFzc2luZyBwbGFpbiBvYmplY3RzIHRvIGludGVyY2VwdCAvIG9ic2VydmUgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDMuMFwiKTtcbiAgICAgICAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uKG9ic2VydmFibGUodGhpbmcpKS5pbnRlcmNlcHQoaGFuZGxlcik7XG4gICAgfVxuICAgIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbih0aGluZykuaW50ZXJjZXB0KGhhbmRsZXIpO1xufVxuZnVuY3Rpb24gaW50ZXJjZXB0UHJvcGVydHkodGhpbmcsIHByb3BlcnR5LCBoYW5kbGVyKSB7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QodGhpbmcpICYmICFpc09ic2VydmFibGVPYmplY3QodGhpbmcpKSB7XG4gICAgICAgIGRlcHJlY2F0ZWQoXCJQYXNzaW5nIHBsYWluIG9iamVjdHMgdG8gaW50ZXJjZXB0IC8gb2JzZXJ2ZSBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gMy4wXCIpO1xuICAgICAgICBleHRlbmRPYnNlcnZhYmxlKHRoaW5nLCB7XG4gICAgICAgICAgICBwcm9wZXJ0eTogdGhpbmdbcHJvcGVydHldXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaW50ZXJjZXB0UHJvcGVydHkodGhpbmcsIHByb3BlcnR5LCBoYW5kbGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uKHRoaW5nLCBwcm9wZXJ0eSkuaW50ZXJjZXB0KGhhbmRsZXIpO1xufVxuZnVuY3Rpb24gaXNDb21wdXRlZCh2YWx1ZSwgcHJvcGVydHkpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpc09ic2VydmFibGVPYmplY3QodmFsdWUpID09PSBmYWxzZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGF0b20gPSBnZXRBdG9tKHZhbHVlLCBwcm9wZXJ0eSk7XG4gICAgICAgIHJldHVybiBpc0NvbXB1dGVkVmFsdWUoYXRvbSk7XG4gICAgfVxuICAgIHJldHVybiBpc0NvbXB1dGVkVmFsdWUodmFsdWUpO1xufVxuZXhwb3J0cy5pc0NvbXB1dGVkID0gaXNDb21wdXRlZDtcbmZ1bmN0aW9uIGlzT2JzZXJ2YWJsZSh2YWx1ZSwgcHJvcGVydHkpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpc09ic2VydmFibGVBcnJheSh2YWx1ZSkgfHwgaXNPYnNlcnZhYmxlTWFwKHZhbHVlKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4LmlzT2JzZXJ2YWJsZV0gaXNPYnNlcnZhYmxlKG9iamVjdCwgcHJvcGVydHlOYW1lKSBpcyBub3Qgc3VwcG9ydGVkIGZvciBhcnJheXMgYW5kIG1hcHMuIFVzZSBtYXAuaGFzIG9yIGFycmF5Lmxlbmd0aCBpbnN0ZWFkLlwiKTtcbiAgICAgICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFyIG8gPSB2YWx1ZS4kbW9ieDtcbiAgICAgICAgICAgIHJldHVybiBvLnZhbHVlcyAmJiAhIW8udmFsdWVzW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc09ic2VydmFibGVPYmplY3QodmFsdWUpIHx8ICEhdmFsdWUuJG1vYnggfHwgaXNBdG9tKHZhbHVlKSB8fCBpc1JlYWN0aW9uKHZhbHVlKSB8fCBpc0NvbXB1dGVkVmFsdWUodmFsdWUpO1xufVxuZXhwb3J0cy5pc09ic2VydmFibGUgPSBpc09ic2VydmFibGU7XG52YXIgZGVjb3JhdG9ySW1wbCA9IGNyZWF0ZUNsYXNzUHJvcGVydHlEZWNvcmF0b3IoZnVuY3Rpb24gKHRhcmdldCwgbmFtZSwgYmFzZVZhbHVlKSB7XG4gICAgdmFyIHByZXZBID0gYWxsb3dTdGF0ZUNoYW5nZXNTdGFydCh0cnVlKTtcbiAgICBpZiAodHlwZW9mIGJhc2VWYWx1ZSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBiYXNlVmFsdWUgPSBhc1JlZmVyZW5jZShiYXNlVmFsdWUpO1xuICAgIHZhciBhZG0gPSBhc09ic2VydmFibGVPYmplY3QodGFyZ2V0LCB1bmRlZmluZWQsIFZhbHVlTW9kZS5SZWN1cnNpdmUpO1xuICAgIGRlZmluZU9ic2VydmFibGVQcm9wZXJ0eShhZG0sIG5hbWUsIGJhc2VWYWx1ZSwgdHJ1ZSwgdW5kZWZpbmVkKTtcbiAgICBhbGxvd1N0YXRlQ2hhbmdlc0VuZChwcmV2QSk7XG59LCBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBvYnNlcnZhYmxlID0gdGhpcy4kbW9ieC52YWx1ZXNbbmFtZV07XG4gICAgaWYgKG9ic2VydmFibGUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5nZXQoKTtcbn0sIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgIHNldFByb3BlcnR5VmFsdWUodGhpcywgbmFtZSwgdmFsdWUpO1xufSwgdHJ1ZSwgZmFsc2UpO1xuZnVuY3Rpb24gb2JzZXJ2YWJsZURlY29yYXRvcih0YXJnZXQsIGtleSwgYmFzZURlc2NyaXB0b3IpIHtcbiAgICBpbnZhcmlhbnQoYXJndW1lbnRzLmxlbmd0aCA+PSAyICYmIGFyZ3VtZW50cy5sZW5ndGggPD0gMywgXCJJbGxlZ2FsIGRlY29yYXRvciBjb25maWdcIiwga2V5KTtcbiAgICBhc3NlcnRQcm9wZXJ0eUNvbmZpZ3VyYWJsZSh0YXJnZXQsIGtleSk7XG4gICAgaW52YXJpYW50KCFiYXNlRGVzY3JpcHRvciB8fCAhYmFzZURlc2NyaXB0b3IuZ2V0LCBcIkBvYnNlcnZhYmxlIGNhbiBub3QgYmUgdXNlZCBvbiBnZXR0ZXJzLCB1c2UgQGNvbXB1dGVkIGluc3RlYWRcIik7XG4gICAgcmV0dXJuIGRlY29yYXRvckltcGwuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn1cbmZ1bmN0aW9uIG9ic2VydmFibGUodiwga2V5T3JTY29wZSkge1xuICAgIGlmICh2ID09PSB2b2lkIDApIHsgdiA9IHVuZGVmaW5lZDsgfVxuICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzFdID09PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZURlY29yYXRvci5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIGludmFyaWFudChhcmd1bWVudHMubGVuZ3RoIDwgMywgXCJvYnNlcnZhYmxlIGV4cGVjdHMgemVybywgb25lIG9yIHR3byBhcmd1bWVudHNcIik7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZSh2KSlcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgdmFyIF9hID0gZ2V0VmFsdWVNb2RlRnJvbVZhbHVlKHYsIFZhbHVlTW9kZS5SZWN1cnNpdmUpLCBtb2RlID0gX2FbMF0sIHZhbHVlID0gX2FbMV07XG4gICAgdmFyIHNvdXJjZVR5cGUgPSBtb2RlID09PSBWYWx1ZU1vZGUuUmVmZXJlbmNlID8gVmFsdWVUeXBlLlJlZmVyZW5jZSA6IGdldFR5cGVPZlZhbHVlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHNvdXJjZVR5cGUpIHtcbiAgICAgICAgY2FzZSBWYWx1ZVR5cGUuQXJyYXk6XG4gICAgICAgIGNhc2UgVmFsdWVUeXBlLlBsYWluT2JqZWN0OlxuICAgICAgICAgICAgcmV0dXJuIG1ha2VDaGlsZE9ic2VydmFibGUodmFsdWUsIG1vZGUpO1xuICAgICAgICBjYXNlIFZhbHVlVHlwZS5SZWZlcmVuY2U6XG4gICAgICAgIGNhc2UgVmFsdWVUeXBlLkNvbXBsZXhPYmplY3Q6XG4gICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGVWYWx1ZSh2YWx1ZSwgbW9kZSk7XG4gICAgICAgIGNhc2UgVmFsdWVUeXBlLkNvbXBsZXhGdW5jdGlvbjpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4Lm9ic2VydmFibGVdIFRvIGJlIGFibGUgdG8gbWFrZSBhIGZ1bmN0aW9uIHJlYWN0aXZlIGl0IHNob3VsZCBub3QgaGF2ZSBhcmd1bWVudHMuIElmIHlvdSBuZWVkIGFuIG9ic2VydmFibGUgcmVmZXJlbmNlIHRvIGEgZnVuY3Rpb24sIHVzZSBgb2JzZXJ2YWJsZShhc1JlZmVyZW5jZShmKSlgXCIpO1xuICAgICAgICBjYXNlIFZhbHVlVHlwZS5WaWV3RnVuY3Rpb246XG4gICAgICAgICAgICBkZXByZWNhdGVkKFwiVXNlIGBjb21wdXRlZChleHByKWAgaW5zdGVhZCBvZiBgb2JzZXJ2YWJsZShleHByKWBcIik7XG4gICAgICAgICAgICByZXR1cm4gY29tcHV0ZWQodiwga2V5T3JTY29wZSk7XG4gICAgfVxuICAgIGludmFyaWFudChmYWxzZSwgXCJJbGxlZ2FsIFN0YXRlXCIpO1xufVxuZXhwb3J0cy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZTtcbnZhciBWYWx1ZVR5cGU7XG4oZnVuY3Rpb24gKFZhbHVlVHlwZSkge1xuICAgIFZhbHVlVHlwZVtWYWx1ZVR5cGVbXCJSZWZlcmVuY2VcIl0gPSAwXSA9IFwiUmVmZXJlbmNlXCI7XG4gICAgVmFsdWVUeXBlW1ZhbHVlVHlwZVtcIlBsYWluT2JqZWN0XCJdID0gMV0gPSBcIlBsYWluT2JqZWN0XCI7XG4gICAgVmFsdWVUeXBlW1ZhbHVlVHlwZVtcIkNvbXBsZXhPYmplY3RcIl0gPSAyXSA9IFwiQ29tcGxleE9iamVjdFwiO1xuICAgIFZhbHVlVHlwZVtWYWx1ZVR5cGVbXCJBcnJheVwiXSA9IDNdID0gXCJBcnJheVwiO1xuICAgIFZhbHVlVHlwZVtWYWx1ZVR5cGVbXCJWaWV3RnVuY3Rpb25cIl0gPSA0XSA9IFwiVmlld0Z1bmN0aW9uXCI7XG4gICAgVmFsdWVUeXBlW1ZhbHVlVHlwZVtcIkNvbXBsZXhGdW5jdGlvblwiXSA9IDVdID0gXCJDb21wbGV4RnVuY3Rpb25cIjtcbn0pKFZhbHVlVHlwZSB8fCAoVmFsdWVUeXBlID0ge30pKTtcbmZ1bmN0aW9uIGdldFR5cGVPZlZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBWYWx1ZVR5cGUuUmVmZXJlbmNlO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA/IFZhbHVlVHlwZS5Db21wbGV4RnVuY3Rpb24gOiBWYWx1ZVR5cGUuVmlld0Z1bmN0aW9uO1xuICAgIGlmIChpc0FycmF5TGlrZSh2YWx1ZSkpXG4gICAgICAgIHJldHVybiBWYWx1ZVR5cGUuQXJyYXk7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgcmV0dXJuIGlzUGxhaW5PYmplY3QodmFsdWUpID8gVmFsdWVUeXBlLlBsYWluT2JqZWN0IDogVmFsdWVUeXBlLkNvbXBsZXhPYmplY3Q7XG4gICAgcmV0dXJuIFZhbHVlVHlwZS5SZWZlcmVuY2U7XG59XG5mdW5jdGlvbiBvYnNlcnZlKHRoaW5nLCBwcm9wT3JDYiwgY2JPckZpcmUsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgIGlmICh0eXBlb2YgY2JPckZpcmUgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIG9ic2VydmVPYnNlcnZhYmxlUHJvcGVydHkodGhpbmcsIHByb3BPckNiLCBjYk9yRmlyZSwgZmlyZUltbWVkaWF0ZWx5KTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBvYnNlcnZlT2JzZXJ2YWJsZSh0aGluZywgcHJvcE9yQ2IsIGNiT3JGaXJlKTtcbn1cbmV4cG9ydHMub2JzZXJ2ZSA9IG9ic2VydmU7XG5mdW5jdGlvbiBvYnNlcnZlT2JzZXJ2YWJsZSh0aGluZywgbGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHRoaW5nKSAmJiAhaXNPYnNlcnZhYmxlT2JqZWN0KHRoaW5nKSkge1xuICAgICAgICBkZXByZWNhdGVkKFwiUGFzc2luZyBwbGFpbiBvYmplY3RzIHRvIGludGVyY2VwdCAvIG9ic2VydmUgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDMuMFwiKTtcbiAgICAgICAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uKG9ic2VydmFibGUodGhpbmcpKS5vYnNlcnZlKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0QWRtaW5pc3RyYXRpb24odGhpbmcpLm9ic2VydmUobGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSk7XG59XG5mdW5jdGlvbiBvYnNlcnZlT2JzZXJ2YWJsZVByb3BlcnR5KHRoaW5nLCBwcm9wZXJ0eSwgbGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHRoaW5nKSAmJiAhaXNPYnNlcnZhYmxlT2JqZWN0KHRoaW5nKSkge1xuICAgICAgICBkZXByZWNhdGVkKFwiUGFzc2luZyBwbGFpbiBvYmplY3RzIHRvIGludGVyY2VwdCAvIG9ic2VydmUgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDMuMFwiKTtcbiAgICAgICAgZXh0ZW5kT2JzZXJ2YWJsZSh0aGluZywge1xuICAgICAgICAgICAgcHJvcGVydHk6IHRoaW5nW3Byb3BlcnR5XVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmVPYnNlcnZhYmxlUHJvcGVydHkodGhpbmcsIHByb3BlcnR5LCBsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KTtcbiAgICB9XG4gICAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uKHRoaW5nLCBwcm9wZXJ0eSkub2JzZXJ2ZShsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KTtcbn1cbmZ1bmN0aW9uIHRvSlMoc291cmNlLCBkZXRlY3RDeWNsZXMsIF9fYWxyZWFkeVNlZW4pIHtcbiAgICBpZiAoZGV0ZWN0Q3ljbGVzID09PSB2b2lkIDApIHsgZGV0ZWN0Q3ljbGVzID0gdHJ1ZTsgfVxuICAgIGlmIChfX2FscmVhZHlTZWVuID09PSB2b2lkIDApIHsgX19hbHJlYWR5U2VlbiA9IG51bGw7IH1cbiAgICBmdW5jdGlvbiBjYWNoZSh2YWx1ZSkge1xuICAgICAgICBpZiAoZGV0ZWN0Q3ljbGVzKVxuICAgICAgICAgICAgX19hbHJlYWR5U2Vlbi5wdXNoKFtzb3VyY2UsIHZhbHVlXSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZShzb3VyY2UpKSB7XG4gICAgICAgIGlmIChkZXRlY3RDeWNsZXMgJiYgX19hbHJlYWR5U2VlbiA9PT0gbnVsbClcbiAgICAgICAgICAgIF9fYWxyZWFkeVNlZW4gPSBbXTtcbiAgICAgICAgaWYgKGRldGVjdEN5Y2xlcyAmJiBzb3VyY2UgIT09IG51bGwgJiYgdHlwZW9mIHNvdXJjZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBfX2FscmVhZHlTZWVuLmxlbmd0aDsgaSA8IGw7IGkrKylcbiAgICAgICAgICAgICAgICBpZiAoX19hbHJlYWR5U2VlbltpXVswXSA9PT0gc291cmNlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hbHJlYWR5U2VlbltpXVsxXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlQXJyYXkoc291cmNlKSkge1xuICAgICAgICAgICAgdmFyIHJlcyA9IGNhY2hlKFtdKTtcbiAgICAgICAgICAgIHZhciB0b0FkZCA9IHNvdXJjZS5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0b0pTKHZhbHVlLCBkZXRlY3RDeWNsZXMsIF9fYWxyZWFkeVNlZW4pOyB9KTtcbiAgICAgICAgICAgIHJlcy5sZW5ndGggPSB0b0FkZC5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRvQWRkLmxlbmd0aDsgaSA8IGw7IGkrKylcbiAgICAgICAgICAgICAgICByZXNbaV0gPSB0b0FkZFtpXTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdChzb3VyY2UpKSB7XG4gICAgICAgICAgICB2YXIgcmVzID0gY2FjaGUoe30pO1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSlcbiAgICAgICAgICAgICAgICByZXNba2V5XSA9IHRvSlMoc291cmNlW2tleV0sIGRldGVjdEN5Y2xlcywgX19hbHJlYWR5U2Vlbik7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc09ic2VydmFibGVNYXAoc291cmNlKSkge1xuICAgICAgICAgICAgdmFyIHJlc18xID0gY2FjaGUoe30pO1xuICAgICAgICAgICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHsgcmV0dXJuIHJlc18xW2tleV0gPSB0b0pTKHZhbHVlLCBkZXRlY3RDeWNsZXMsIF9fYWxyZWFkeVNlZW4pOyB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXNfMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlVmFsdWUoc291cmNlKSlcbiAgICAgICAgICAgIHJldHVybiB0b0pTKHNvdXJjZS5nZXQoKSwgZGV0ZWN0Q3ljbGVzLCBfX2FscmVhZHlTZWVuKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbn1cbmV4cG9ydHMudG9KUyA9IHRvSlM7XG5mdW5jdGlvbiB0b0pTbGVnYWN5KHNvdXJjZSwgZGV0ZWN0Q3ljbGVzLCBfX2FscmVhZHlTZWVuKSB7XG4gICAgaWYgKGRldGVjdEN5Y2xlcyA9PT0gdm9pZCAwKSB7IGRldGVjdEN5Y2xlcyA9IHRydWU7IH1cbiAgICBpZiAoX19hbHJlYWR5U2VlbiA9PT0gdm9pZCAwKSB7IF9fYWxyZWFkeVNlZW4gPSBudWxsOyB9XG4gICAgZGVwcmVjYXRlZChcInRvSlNsZWdhY3kgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yLiBVc2UgYHRvSlNgIGluc3RlYWQuIFNlZSAjNTY2XCIpO1xuICAgIGZ1bmN0aW9uIGNhY2hlKHZhbHVlKSB7XG4gICAgICAgIGlmIChkZXRlY3RDeWNsZXMpXG4gICAgICAgICAgICBfX2FscmVhZHlTZWVuLnB1c2goW3NvdXJjZSwgdmFsdWVdKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgRGF0ZSB8fCBzb3VyY2UgaW5zdGFuY2VvZiBSZWdFeHApXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgaWYgKGRldGVjdEN5Y2xlcyAmJiBfX2FscmVhZHlTZWVuID09PSBudWxsKVxuICAgICAgICBfX2FscmVhZHlTZWVuID0gW107XG4gICAgaWYgKGRldGVjdEN5Y2xlcyAmJiBzb3VyY2UgIT09IG51bGwgJiYgdHlwZW9mIHNvdXJjZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IF9fYWxyZWFkeVNlZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgICAgICAgaWYgKF9fYWxyZWFkeVNlZW5baV1bMF0gPT09IHNvdXJjZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gX19hbHJlYWR5U2VlbltpXVsxXTtcbiAgICB9XG4gICAgaWYgKCFzb3VyY2UpXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgaWYgKGlzQXJyYXlMaWtlKHNvdXJjZSkpIHtcbiAgICAgICAgdmFyIHJlcyA9IGNhY2hlKFtdKTtcbiAgICAgICAgdmFyIHRvQWRkID0gc291cmNlLm1hcChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHRvSlNsZWdhY3kodmFsdWUsIGRldGVjdEN5Y2xlcywgX19hbHJlYWR5U2Vlbik7IH0pO1xuICAgICAgICByZXMubGVuZ3RoID0gdG9BZGQubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRvQWRkLmxlbmd0aDsgaSA8IGw7IGkrKylcbiAgICAgICAgICAgIHJlc1tpXSA9IHRvQWRkW2ldO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlTWFwKHNvdXJjZSkpIHtcbiAgICAgICAgdmFyIHJlc18yID0gY2FjaGUoe30pO1xuICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkgeyByZXR1cm4gcmVzXzJba2V5XSA9IHRvSlNsZWdhY3kodmFsdWUsIGRldGVjdEN5Y2xlcywgX19hbHJlYWR5U2Vlbik7IH0pO1xuICAgICAgICByZXR1cm4gcmVzXzI7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVWYWx1ZShzb3VyY2UpKVxuICAgICAgICByZXR1cm4gdG9KU2xlZ2FjeShzb3VyY2UuZ2V0KCksIGRldGVjdEN5Y2xlcywgX19hbHJlYWR5U2Vlbik7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIHJlcyA9IGNhY2hlKHt9KTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSlcbiAgICAgICAgICAgIHJlc1trZXldID0gdG9KU2xlZ2FjeShzb3VyY2Vba2V5XSwgZGV0ZWN0Q3ljbGVzLCBfX2FscmVhZHlTZWVuKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbn1cbmV4cG9ydHMudG9KU2xlZ2FjeSA9IHRvSlNsZWdhY3k7XG5mdW5jdGlvbiB0b0pTT04oc291cmNlLCBkZXRlY3RDeWNsZXMsIF9fYWxyZWFkeVNlZW4pIHtcbiAgICBpZiAoZGV0ZWN0Q3ljbGVzID09PSB2b2lkIDApIHsgZGV0ZWN0Q3ljbGVzID0gdHJ1ZTsgfVxuICAgIGlmIChfX2FscmVhZHlTZWVuID09PSB2b2lkIDApIHsgX19hbHJlYWR5U2VlbiA9IG51bGw7IH1cbiAgICBkZXByZWNhdGVkKFwidG9KU09OIGlzIGRlcHJlY2F0ZWQuIFVzZSB0b0pTIGluc3RlYWRcIik7XG4gICAgcmV0dXJuIHRvSlNsZWdhY3kuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn1cbmV4cG9ydHMudG9KU09OID0gdG9KU09OO1xuZnVuY3Rpb24gbG9nKG1zZykge1xuICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgcmV0dXJuIG1zZztcbn1cbmZ1bmN0aW9uIHdoeVJ1bih0aGluZywgcHJvcCkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICB0aGluZyA9IGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbjtcbiAgICAgICAgICAgIGlmICghdGhpbmcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvZyhcIndoeVJ1bigpIGNhbiBvbmx5IGJlIHVzZWQgaWYgYSBkZXJpdmF0aW9uIGlzIGFjdGl2ZSwgb3IgYnkgcGFzc2luZyBhbiBjb21wdXRlZCB2YWx1ZSAvIHJlYWN0aW9uIGV4cGxpY2l0bHkuIElmIHlvdSBpbnZva2VkIHdoeVJ1biBmcm9tIGluc2lkZSBhIGNvbXB1dGF0aW9uOyB0aGUgY29tcHV0YXRpb24gaXMgY3VycmVudGx5IHN1c3BlbmRlZCBidXQgcmUtZXZhbHVhdGluZyBiZWNhdXNlIHNvbWVib2R5IHJlcXVlc3RlZCBpdCdzIHZhbHVlLlwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICB0aGluZyA9IGdldEF0b20odGhpbmcsIHByb3ApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaW5nID0gZ2V0QXRvbSh0aGluZyk7XG4gICAgaWYgKGlzQ29tcHV0ZWRWYWx1ZSh0aGluZykpXG4gICAgICAgIHJldHVybiBsb2codGhpbmcud2h5UnVuKCkpO1xuICAgIGVsc2UgaWYgKGlzUmVhY3Rpb24odGhpbmcpKVxuICAgICAgICByZXR1cm4gbG9nKHRoaW5nLndoeVJ1bigpKTtcbiAgICBlbHNlXG4gICAgICAgIGludmFyaWFudChmYWxzZSwgXCJ3aHlSdW4gY2FuIG9ubHkgYmUgdXNlZCBvbiByZWFjdGlvbnMgYW5kIGNvbXB1dGVkIHZhbHVlc1wiKTtcbn1cbmV4cG9ydHMud2h5UnVuID0gd2h5UnVuO1xuZnVuY3Rpb24gY3JlYXRlQWN0aW9uKGFjdGlvbk5hbWUsIGZuKSB7XG4gICAgaW52YXJpYW50KHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiLCBcImBhY3Rpb25gIGNhbiBvbmx5IGJlIGludm9rZWQgb24gZnVuY3Rpb25zXCIpO1xuICAgIGludmFyaWFudCh0eXBlb2YgYWN0aW9uTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBhY3Rpb25OYW1lLmxlbmd0aCA+IDAsIFwiYWN0aW9ucyBzaG91bGQgaGF2ZSB2YWxpZCBuYW1lcywgZ290OiAnXCIgKyBhY3Rpb25OYW1lICsgXCInXCIpO1xuICAgIHZhciByZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBleGVjdXRlQWN0aW9uKGFjdGlvbk5hbWUsIGZuLCB0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgcmVzLmlzTW9ieEFjdGlvbiA9IHRydWU7XG4gICAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGV4ZWN1dGVBY3Rpb24oYWN0aW9uTmFtZSwgZm4sIHNjb3BlLCBhcmdzKSB7XG4gICAgaW52YXJpYW50KCFpc0NvbXB1dGVkVmFsdWUoZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uKSwgXCJDb21wdXRlZCB2YWx1ZXMgb3IgdHJhbnNmb3JtZXJzIHNob3VsZCBub3QgaW52b2tlIGFjdGlvbnMgb3IgdHJpZ2dlciBvdGhlciBzaWRlIGVmZmVjdHNcIik7XG4gICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCgpO1xuICAgIHZhciBzdGFydFRpbWU7XG4gICAgaWYgKG5vdGlmeVNweSkge1xuICAgICAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICB2YXIgbCA9IChhcmdzICYmIGFyZ3MubGVuZ3RoKSB8fCAwO1xuICAgICAgICB2YXIgZmxhdHRlbmRBcmdzID0gbmV3IEFycmF5KGwpO1xuICAgICAgICBpZiAobCA+IDApXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKylcbiAgICAgICAgICAgICAgICBmbGF0dGVuZEFyZ3NbaV0gPSBhcmdzW2ldO1xuICAgICAgICBzcHlSZXBvcnRTdGFydCh7XG4gICAgICAgICAgICB0eXBlOiBcImFjdGlvblwiLFxuICAgICAgICAgICAgbmFtZTogYWN0aW9uTmFtZSxcbiAgICAgICAgICAgIGZuOiBmbixcbiAgICAgICAgICAgIHRhcmdldDogc2NvcGUsXG4gICAgICAgICAgICBhcmd1bWVudHM6IGZsYXR0ZW5kQXJnc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIHByZXZVbnRyYWNrZWQgPSB1bnRyYWNrZWRTdGFydCgpO1xuICAgIHRyYW5zYWN0aW9uU3RhcnQoYWN0aW9uTmFtZSwgc2NvcGUsIGZhbHNlKTtcbiAgICB2YXIgcHJldkFsbG93U3RhdGVDaGFuZ2VzID0gYWxsb3dTdGF0ZUNoYW5nZXNTdGFydCh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkoc2NvcGUsIGFyZ3MpO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgYWxsb3dTdGF0ZUNoYW5nZXNFbmQocHJldkFsbG93U3RhdGVDaGFuZ2VzKTtcbiAgICAgICAgdHJhbnNhY3Rpb25FbmQoZmFsc2UpO1xuICAgICAgICB1bnRyYWNrZWRFbmQocHJldlVudHJhY2tlZCk7XG4gICAgICAgIGlmIChub3RpZnlTcHkpXG4gICAgICAgICAgICBzcHlSZXBvcnRFbmQoeyB0aW1lOiBEYXRlLm5vdygpIC0gc3RhcnRUaW1lIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVzZVN0cmljdChzdHJpY3QpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZXByZWNhdGVkKFwiYHVzZVN0cmljdGAgd2l0aG91dCBhcmd1bWVudHMgaXMgZGVwcmVjYXRlZCwgdXNlIGBpc1N0cmljdE1vZGVFbmFibGVkKClgIGluc3RlYWRcIik7XG4gICAgICAgIHJldHVybiBnbG9iYWxTdGF0ZS5zdHJpY3RNb2RlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaW52YXJpYW50KGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbiA9PT0gbnVsbCwgXCJJdCBpcyBub3QgYWxsb3dlZCB0byBzZXQgYHVzZVN0cmljdGAgd2hlbiBhIGRlcml2YXRpb24gaXMgcnVubmluZ1wiKTtcbiAgICAgICAgZ2xvYmFsU3RhdGUuc3RyaWN0TW9kZSA9IHN0cmljdDtcbiAgICAgICAgZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZUNoYW5nZXMgPSAhc3RyaWN0O1xuICAgIH1cbn1cbmV4cG9ydHMudXNlU3RyaWN0ID0gdXNlU3RyaWN0O1xuZnVuY3Rpb24gaXNTdHJpY3RNb2RlRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gZ2xvYmFsU3RhdGUuc3RyaWN0TW9kZTtcbn1cbmV4cG9ydHMuaXNTdHJpY3RNb2RlRW5hYmxlZCA9IGlzU3RyaWN0TW9kZUVuYWJsZWQ7XG5mdW5jdGlvbiBhbGxvd1N0YXRlQ2hhbmdlcyhhbGxvd1N0YXRlQ2hhbmdlcywgZnVuYykge1xuICAgIHZhciBwcmV2ID0gYWxsb3dTdGF0ZUNoYW5nZXNTdGFydChhbGxvd1N0YXRlQ2hhbmdlcyk7XG4gICAgdmFyIHJlcyA9IGZ1bmMoKTtcbiAgICBhbGxvd1N0YXRlQ2hhbmdlc0VuZChwcmV2KTtcbiAgICByZXR1cm4gcmVzO1xufVxuZnVuY3Rpb24gYWxsb3dTdGF0ZUNoYW5nZXNTdGFydChhbGxvd1N0YXRlQ2hhbmdlcykge1xuICAgIHZhciBwcmV2ID0gZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZUNoYW5nZXM7XG4gICAgZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZUNoYW5nZXMgPSBhbGxvd1N0YXRlQ2hhbmdlcztcbiAgICByZXR1cm4gcHJldjtcbn1cbmZ1bmN0aW9uIGFsbG93U3RhdGVDaGFuZ2VzRW5kKHByZXYpIHtcbiAgICBnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlQ2hhbmdlcyA9IHByZXY7XG59XG52YXIgQmFzZUF0b20gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJhc2VBdG9tKG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IHZvaWQgMCkgeyBuYW1lID0gXCJBdG9tQFwiICsgZ2V0TmV4dElkKCk7IH1cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5pc1BlbmRpbmdVbm9ic2VydmF0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnNJbmRleGVzID0ge307XG4gICAgICAgIHRoaXMuZGlmZlZhbHVlID0gMDtcbiAgICAgICAgdGhpcy5sYXN0QWNjZXNzZWRCeSA9IDA7XG4gICAgICAgIHRoaXMubG93ZXN0T2JzZXJ2ZXJTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuTk9UX1RSQUNLSU5HO1xuICAgIH1cbiAgICBCYXNlQXRvbS5wcm90b3R5cGUub25CZWNvbWVVbm9ic2VydmVkID0gZnVuY3Rpb24gKCkge1xuICAgIH07XG4gICAgQmFzZUF0b20ucHJvdG90eXBlLnJlcG9ydE9ic2VydmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXBvcnRPYnNlcnZlZCh0aGlzKTtcbiAgICB9O1xuICAgIEJhc2VBdG9tLnByb3RvdHlwZS5yZXBvcnRDaGFuZ2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0cmFuc2FjdGlvblN0YXJ0KFwicHJvcGFnYXRpbmdBdG9tQ2hhbmdlXCIsIG51bGwsIGZhbHNlKTtcbiAgICAgICAgcHJvcGFnYXRlQ2hhbmdlZCh0aGlzKTtcbiAgICAgICAgdHJhbnNhY3Rpb25FbmQoZmFsc2UpO1xuICAgIH07XG4gICAgQmFzZUF0b20ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH07XG4gICAgcmV0dXJuIEJhc2VBdG9tO1xufSgpKTtcbmV4cG9ydHMuQmFzZUF0b20gPSBCYXNlQXRvbTtcbnZhciBBdG9tID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXRvbSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBdG9tKG5hbWUsIG9uQmVjb21lT2JzZXJ2ZWRIYW5kbGVyLCBvbkJlY29tZVVub2JzZXJ2ZWRIYW5kbGVyKSB7XG4gICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9IFwiQXRvbUBcIiArIGdldE5leHRJZCgpOyB9XG4gICAgICAgIGlmIChvbkJlY29tZU9ic2VydmVkSGFuZGxlciA9PT0gdm9pZCAwKSB7IG9uQmVjb21lT2JzZXJ2ZWRIYW5kbGVyID0gbm9vcDsgfVxuICAgICAgICBpZiAob25CZWNvbWVVbm9ic2VydmVkSGFuZGxlciA9PT0gdm9pZCAwKSB7IG9uQmVjb21lVW5vYnNlcnZlZEhhbmRsZXIgPSBub29wOyB9XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIG5hbWUpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLm9uQmVjb21lT2JzZXJ2ZWRIYW5kbGVyID0gb25CZWNvbWVPYnNlcnZlZEhhbmRsZXI7XG4gICAgICAgIHRoaXMub25CZWNvbWVVbm9ic2VydmVkSGFuZGxlciA9IG9uQmVjb21lVW5vYnNlcnZlZEhhbmRsZXI7XG4gICAgICAgIHRoaXMuaXNQZW5kaW5nVW5vYnNlcnZhdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQmVpbmdUcmFja2VkID0gZmFsc2U7XG4gICAgfVxuICAgIEF0b20ucHJvdG90eXBlLnJlcG9ydE9ic2VydmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydEJhdGNoKCk7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUucmVwb3J0T2JzZXJ2ZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzQmVpbmdUcmFja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmlzQmVpbmdUcmFja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25CZWNvbWVPYnNlcnZlZEhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbmRCYXRjaCgpO1xuICAgICAgICByZXR1cm4gISFnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb247XG4gICAgfTtcbiAgICBBdG9tLnByb3RvdHlwZS5vbkJlY29tZVVub2JzZXJ2ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNCZWluZ1RyYWNrZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkJlY29tZVVub2JzZXJ2ZWRIYW5kbGVyKCk7XG4gICAgfTtcbiAgICByZXR1cm4gQXRvbTtcbn0oQmFzZUF0b20pKTtcbmV4cG9ydHMuQXRvbSA9IEF0b207XG52YXIgaXNBdG9tID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZShcIkF0b21cIiwgQmFzZUF0b20pO1xudmFyIENvbXB1dGVkVmFsdWUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbXB1dGVkVmFsdWUoZGVyaXZhdGlvbiwgc2NvcGUsIGNvbXBhcmVTdHJ1Y3R1cmFsLCBuYW1lLCBzZXR0ZXIpIHtcbiAgICAgICAgdGhpcy5kZXJpdmF0aW9uID0gZGVyaXZhdGlvbjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLmNvbXBhcmVTdHJ1Y3R1cmFsID0gY29tcGFyZVN0cnVjdHVyYWw7XG4gICAgICAgIHRoaXMuZGVwZW5kZW5jaWVzU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLk5PVF9UUkFDS0lORztcbiAgICAgICAgdGhpcy5vYnNlcnZpbmcgPSBbXTtcbiAgICAgICAgdGhpcy5uZXdPYnNlcnZpbmcgPSBudWxsO1xuICAgICAgICB0aGlzLmlzUGVuZGluZ1Vub2JzZXJ2YXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnNJbmRleGVzID0ge307XG4gICAgICAgIHRoaXMuZGlmZlZhbHVlID0gMDtcbiAgICAgICAgdGhpcy5ydW5JZCA9IDA7XG4gICAgICAgIHRoaXMubGFzdEFjY2Vzc2VkQnkgPSAwO1xuICAgICAgICB0aGlzLmxvd2VzdE9ic2VydmVyU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEU7XG4gICAgICAgIHRoaXMudW5ib3VuZERlcHNDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuX19tYXBpZCA9IFwiI1wiICsgZ2V0TmV4dElkKCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaXNDb21wdXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmdTZXR0ZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZSB8fCBcIkNvbXB1dGVkVmFsdWVAXCIgKyBnZXROZXh0SWQoKTtcbiAgICAgICAgaWYgKHNldHRlcilcbiAgICAgICAgICAgIHRoaXMuc2V0dGVyID0gY3JlYXRlQWN0aW9uKG5hbWUgKyBcIi1zZXR0ZXJcIiwgc2V0dGVyKTtcbiAgICB9XG4gICAgQ29tcHV0ZWRWYWx1ZS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc0NvbXB1dGluZyA9IHRydWU7XG4gICAgICAgIHZhciBwcmV2QWxsb3dTdGF0ZUNoYW5nZXMgPSBhbGxvd1N0YXRlQ2hhbmdlc1N0YXJ0KGZhbHNlKTtcbiAgICAgICAgdmFyIHJlcyA9IHRoaXMuZGVyaXZhdGlvbi5jYWxsKHRoaXMuc2NvcGUpO1xuICAgICAgICBhbGxvd1N0YXRlQ2hhbmdlc0VuZChwcmV2QWxsb3dTdGF0ZUNoYW5nZXMpO1xuICAgICAgICB0aGlzLmlzQ29tcHV0aW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICA7XG4gICAgQ29tcHV0ZWRWYWx1ZS5wcm90b3R5cGUucGVla1VudHJhY2tlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciByZXMgPSB0aGlzLnBlZWsoKTtcbiAgICAgICAgICAgIGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKGhhc0Vycm9yKVxuICAgICAgICAgICAgICAgIGhhbmRsZUV4Y2VwdGlvbkluRGVyaXZhdGlvbih0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZS5wcm90b3R5cGUub25CZWNvbWVTdGFsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcHJvcGFnYXRlTWF5YmVDaGFuZ2VkKHRoaXMpO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZS5wcm90b3R5cGUub25CZWNvbWVVbm9ic2VydmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpbnZhcmlhbnQodGhpcy5kZXBlbmRlbmNpZXNTdGF0ZSAhPT0gSURlcml2YXRpb25TdGF0ZS5OT1RfVFJBQ0tJTkcsIFwiSU5URVJOQUwgRVJST1Igb25seSBvbkJlY29tZVVub2JzZXJ2ZWQgc2hvdWxkbid0IGJlIGNhbGxlZCB0d2ljZSBpbiBhIHJvd1wiKTtcbiAgICAgICAgY2xlYXJPYnNlcnZpbmcodGhpcyk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGludmFyaWFudCghdGhpcy5pc0NvbXB1dGluZywgXCJDeWNsZSBkZXRlY3RlZCBpbiBjb21wdXRhdGlvbiBcIiArIHRoaXMubmFtZSwgdGhpcy5kZXJpdmF0aW9uKTtcbiAgICAgICAgc3RhcnRCYXRjaCgpO1xuICAgICAgICBpZiAoZ2xvYmFsU3RhdGUuaW5CYXRjaCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKHNob3VsZENvbXB1dGUodGhpcykpXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGVla1VudHJhY2tlZCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVwb3J0T2JzZXJ2ZWQodGhpcyk7XG4gICAgICAgICAgICBpZiAoc2hvdWxkQ29tcHV0ZSh0aGlzKSlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFja0FuZENvbXB1dGUoKSlcbiAgICAgICAgICAgICAgICAgICAgcHJvcGFnYXRlQ2hhbmdlQ29uZmlybWVkKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnZhbHVlO1xuICAgICAgICBlbmRCYXRjaCgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZS5wcm90b3R5cGUucmVjb3ZlckZyb21FcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc0NvbXB1dGluZyA9IGZhbHNlO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnNldHRlcikge1xuICAgICAgICAgICAgaW52YXJpYW50KCF0aGlzLmlzUnVubmluZ1NldHRlciwgXCJUaGUgc2V0dGVyIG9mIGNvbXB1dGVkIHZhbHVlICdcIiArIHRoaXMubmFtZSArIFwiJyBpcyB0cnlpbmcgdG8gdXBkYXRlIGl0c2VsZi4gRGlkIHlvdSBpbnRlbmQgdG8gdXBkYXRlIGFuIF9vYnNlcnZhYmxlXyB2YWx1ZSwgaW5zdGVhZCBvZiB0aGUgY29tcHV0ZWQgcHJvcGVydHk/XCIpO1xuICAgICAgICAgICAgdGhpcy5pc1J1bm5pbmdTZXR0ZXIgPSB0cnVlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRlci5jYWxsKHRoaXMuc2NvcGUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNSdW5uaW5nU2V0dGVyID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaW52YXJpYW50KGZhbHNlLCBcIltDb21wdXRlZFZhbHVlICdcIiArIHRoaXMubmFtZSArIFwiJ10gSXQgaXMgbm90IHBvc3NpYmxlIHRvIGFzc2lnbiBhIG5ldyB2YWx1ZSB0byBhIGNvbXB1dGVkIHZhbHVlLlwiKTtcbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUucHJvdG90eXBlLnRyYWNrQW5kQ29tcHV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzU3B5RW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBzcHlSZXBvcnQoe1xuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNvbXB1dGVcIixcbiAgICAgICAgICAgICAgICBmbjogdGhpcy5kZXJpdmF0aW9uLFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5zY29wZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gdGhpcy52YWx1ZSA9IHRyYWNrRGVyaXZlZEZ1bmN0aW9uKHRoaXMsIHRoaXMucGVlayk7XG4gICAgICAgIHJldHVybiB2YWx1ZURpZENoYW5nZSh0aGlzLmNvbXBhcmVTdHJ1Y3R1cmFsLCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZS5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBmaXJzdFRpbWUgPSB0cnVlO1xuICAgICAgICB2YXIgcHJldlZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gYXV0b3J1bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSBfdGhpcy5nZXQoKTtcbiAgICAgICAgICAgIGlmICghZmlyc3RUaW1lIHx8IGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2VSA9IHVudHJhY2tlZFN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIobmV3VmFsdWUsIHByZXZWYWx1ZSk7XG4gICAgICAgICAgICAgICAgdW50cmFja2VkRW5kKHByZXZVKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICAgICAgICAgICAgcHJldlZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoKTtcbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCJbXCIgKyB0aGlzLmRlcml2YXRpb24udG9TdHJpbmcoKSArIFwiXVwiO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZS5wcm90b3R5cGUud2h5UnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaXNUcmFja2luZyA9IEJvb2xlYW4oZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uKTtcbiAgICAgICAgdmFyIG9ic2VydmluZyA9IHVuaXF1ZSh0aGlzLmlzQ29tcHV0aW5nID8gdGhpcy5uZXdPYnNlcnZpbmcgOiB0aGlzLm9ic2VydmluZykubWFwKGZ1bmN0aW9uIChkZXApIHsgcmV0dXJuIGRlcC5uYW1lOyB9KTtcbiAgICAgICAgdmFyIG9ic2VydmVycyA9IHVuaXF1ZShnZXRPYnNlcnZlcnModGhpcykubWFwKGZ1bmN0aW9uIChkZXApIHsgcmV0dXJuIGRlcC5uYW1lOyB9KSk7XG4gICAgICAgIHJldHVybiAoKFwiXFxuV2h5UnVuPyBjb21wdXRhdGlvbiAnXCIgKyB0aGlzLm5hbWUgKyBcIic6XFxuICogUnVubmluZyBiZWNhdXNlOiBcIiArIChpc1RyYWNraW5nID8gXCJbYWN0aXZlXSB0aGUgdmFsdWUgb2YgdGhpcyBjb21wdXRhdGlvbiBpcyBuZWVkZWQgYnkgYSByZWFjdGlvblwiIDogdGhpcy5pc0NvbXB1dGluZyA/IFwiW2dldF0gVGhlIHZhbHVlIG9mIHRoaXMgY29tcHV0ZWQgd2FzIHJlcXVlc3RlZCBvdXRzaWRlIGEgcmVhY3Rpb25cIiA6IFwiW2lkbGVdIG5vdCBydW5uaW5nIGF0IHRoZSBtb21lbnRcIikgKyBcIlxcblwiKSArXG4gICAgICAgICAgICAodGhpcy5kZXBlbmRlbmNpZXNTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5OT1RfVFJBQ0tJTkdcbiAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgIFwiICogVGhpcyBjb21wdXRhdGlvbiBpcyBzdXNwZW5kZWQgKG5vdCBpbiB1c2UgYnkgYW55IHJlYWN0aW9uKSBhbmQgd29uJ3QgcnVuIGF1dG9tYXRpY2FsbHkuXFxuXFx0RGlkbid0IGV4cGVjdCB0aGlzIGNvbXB1dGF0aW9uIHRvIGJlIHN1c3BlbmRlZCBhdCB0aGlzIHBvaW50P1xcblxcdCAgMS4gTWFrZSBzdXJlIHRoaXMgY29tcHV0YXRpb24gaXMgdXNlZCBieSBhIHJlYWN0aW9uIChyZWFjdGlvbiwgYXV0b3J1biwgb2JzZXJ2ZXIpLlxcblxcdCAgMi4gQ2hlY2sgd2hldGhlciB5b3UgYXJlIHVzaW5nIHRoaXMgY29tcHV0YXRpb24gc3luY2hyb25vdXNseSAoaW4gdGhlIHNhbWUgc3RhY2sgYXMgdGhleSByZWFjdGlvbiB0aGF0IG5lZWRzIGl0KS5cXG5cIlxuICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgXCIgKiBUaGlzIGNvbXB1dGF0aW9uIHdpbGwgcmUtcnVuIGlmIGFueSBvZiB0aGUgZm9sbG93aW5nIG9ic2VydmFibGVzIGNoYW5nZXM6XFxuICAgIFwiICsgam9pblN0cmluZ3Mob2JzZXJ2aW5nKSArIFwiXFxuICAgIFwiICsgKCh0aGlzLmlzQ29tcHV0aW5nICYmIGlzVHJhY2tpbmcpID8gXCIgKC4uLiBvciBhbnkgb2JzZXJ2YWJsZSBhY2Nlc3NlZCBkdXJpbmcgdGhlIHJlbWFpbmRlciBvZiB0aGUgY3VycmVudCBydW4pXCIgOiBcIlwiKSArIFwiXFxuXFx0TWlzc2luZyBpdGVtcyBpbiB0aGlzIGxpc3Q/XFxuXFx0ICAxLiBDaGVjayB3aGV0aGVyIGFsbCB1c2VkIHZhbHVlcyBhcmUgcHJvcGVybHkgbWFya2VkIGFzIG9ic2VydmFibGUgKHVzZSBpc09ic2VydmFibGUgdG8gdmVyaWZ5KVxcblxcdCAgMi4gTWFrZSBzdXJlIHlvdSBkaWRuJ3QgZGVyZWZlcmVuY2UgdmFsdWVzIHRvbyBlYXJseS4gTW9iWCBvYnNlcnZlcyBwcm9wcywgbm90IHByaW1pdGl2ZXMuIEUuZzogdXNlICdwZXJzb24ubmFtZScgaW5zdGVhZCBvZiAnbmFtZScgaW4geW91ciBjb21wdXRhdGlvbi5cXG4gICogSWYgdGhlIG91dGNvbWUgb2YgdGhpcyBjb21wdXRhdGlvbiBjaGFuZ2VzLCB0aGUgZm9sbG93aW5nIG9ic2VydmVycyB3aWxsIGJlIHJlLXJ1bjpcXG4gICAgXCIgKyBqb2luU3RyaW5ncyhvYnNlcnZlcnMpICsgXCJcXG5cIikpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbXB1dGVkVmFsdWU7XG59KCkpO1xudmFyIGlzQ29tcHV0ZWRWYWx1ZSA9IGNyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUoXCJDb21wdXRlZFZhbHVlXCIsIENvbXB1dGVkVmFsdWUpO1xudmFyIElEZXJpdmF0aW9uU3RhdGU7XG4oZnVuY3Rpb24gKElEZXJpdmF0aW9uU3RhdGUpIHtcbiAgICBJRGVyaXZhdGlvblN0YXRlW0lEZXJpdmF0aW9uU3RhdGVbXCJOT1RfVFJBQ0tJTkdcIl0gPSAtMV0gPSBcIk5PVF9UUkFDS0lOR1wiO1xuICAgIElEZXJpdmF0aW9uU3RhdGVbSURlcml2YXRpb25TdGF0ZVtcIlVQX1RPX0RBVEVcIl0gPSAwXSA9IFwiVVBfVE9fREFURVwiO1xuICAgIElEZXJpdmF0aW9uU3RhdGVbSURlcml2YXRpb25TdGF0ZVtcIlBPU1NJQkxZX1NUQUxFXCJdID0gMV0gPSBcIlBPU1NJQkxZX1NUQUxFXCI7XG4gICAgSURlcml2YXRpb25TdGF0ZVtJRGVyaXZhdGlvblN0YXRlW1wiU1RBTEVcIl0gPSAyXSA9IFwiU1RBTEVcIjtcbn0pKElEZXJpdmF0aW9uU3RhdGUgfHwgKElEZXJpdmF0aW9uU3RhdGUgPSB7fSkpO1xuZXhwb3J0cy5JRGVyaXZhdGlvblN0YXRlID0gSURlcml2YXRpb25TdGF0ZTtcbmZ1bmN0aW9uIHNob3VsZENvbXB1dGUoZGVyaXZhdGlvbikge1xuICAgIHN3aXRjaCAoZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZSkge1xuICAgICAgICBjYXNlIElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURTogcmV0dXJuIGZhbHNlO1xuICAgICAgICBjYXNlIElEZXJpdmF0aW9uU3RhdGUuTk9UX1RSQUNLSU5HOlxuICAgICAgICBjYXNlIElEZXJpdmF0aW9uU3RhdGUuU1RBTEU6IHJldHVybiB0cnVlO1xuICAgICAgICBjYXNlIElEZXJpdmF0aW9uU3RhdGUuUE9TU0lCTFlfU1RBTEU6IHtcbiAgICAgICAgICAgIHZhciBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcHJldlVudHJhY2tlZCA9IHVudHJhY2tlZFN0YXJ0KCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBvYnMgPSBkZXJpdmF0aW9uLm9ic2VydmluZywgbCA9IG9icy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IG9ic1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcHV0ZWRWYWx1ZShvYmopKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouZ2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5TVEFMRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW50cmFja2VkRW5kKHByZXZVbnRyYWNrZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY2hhbmdlRGVwZW5kZW5jaWVzU3RhdGVUbzAoZGVyaXZhdGlvbik7XG4gICAgICAgICAgICAgICAgdW50cmFja2VkRW5kKHByZXZVbnRyYWNrZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGlmIChoYXNFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VEZXBlbmRlbmNpZXNTdGF0ZVRvMChkZXJpdmF0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBpc0NvbXB1dGluZ0Rlcml2YXRpb24oKSB7XG4gICAgcmV0dXJuIGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbiAhPT0gbnVsbDtcbn1cbmZ1bmN0aW9uIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkKCkge1xuICAgIGlmICghZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZUNoYW5nZXMpIHtcbiAgICAgICAgaW52YXJpYW50KGZhbHNlLCBnbG9iYWxTdGF0ZS5zdHJpY3RNb2RlXG4gICAgICAgICAgICA/IFwiSXQgaXMgbm90IGFsbG93ZWQgdG8gY3JlYXRlIG9yIGNoYW5nZSBzdGF0ZSBvdXRzaWRlIGFuIGBhY3Rpb25gIHdoZW4gTW9iWCBpcyBpbiBzdHJpY3QgbW9kZS4gV3JhcCB0aGUgY3VycmVudCBtZXRob2QgaW4gYGFjdGlvbmAgaWYgdGhpcyBzdGF0ZSBjaGFuZ2UgaXMgaW50ZW5kZWRcIlxuICAgICAgICAgICAgOiBcIkl0IGlzIG5vdCBhbGxvd2VkIHRvIGNoYW5nZSB0aGUgc3RhdGUgd2hlbiBhIGNvbXB1dGVkIHZhbHVlIG9yIHRyYW5zZm9ybWVyIGlzIGJlaW5nIGV2YWx1YXRlZC4gVXNlICdhdXRvcnVuJyB0byBjcmVhdGUgcmVhY3RpdmUgZnVuY3Rpb25zIHdpdGggc2lkZS1lZmZlY3RzLlwiKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0cmFja0Rlcml2ZWRGdW5jdGlvbihkZXJpdmF0aW9uLCBmKSB7XG4gICAgY2hhbmdlRGVwZW5kZW5jaWVzU3RhdGVUbzAoZGVyaXZhdGlvbik7XG4gICAgZGVyaXZhdGlvbi5uZXdPYnNlcnZpbmcgPSBuZXcgQXJyYXkoZGVyaXZhdGlvbi5vYnNlcnZpbmcubGVuZ3RoICsgMTAwKTtcbiAgICBkZXJpdmF0aW9uLnVuYm91bmREZXBzQ291bnQgPSAwO1xuICAgIGRlcml2YXRpb24ucnVuSWQgPSArK2dsb2JhbFN0YXRlLnJ1bklkO1xuICAgIHZhciBwcmV2VHJhY2tpbmcgPSBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb247XG4gICAgZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uID0gZGVyaXZhdGlvbjtcbiAgICB2YXIgaGFzRXhjZXB0aW9uID0gdHJ1ZTtcbiAgICB2YXIgcmVzdWx0O1xuICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IGYuY2FsbChkZXJpdmF0aW9uKTtcbiAgICAgICAgaGFzRXhjZXB0aW9uID0gZmFsc2U7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICBpZiAoaGFzRXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBoYW5kbGVFeGNlcHRpb25JbkRlcml2YXRpb24oZGVyaXZhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb24gPSBwcmV2VHJhY2tpbmc7XG4gICAgICAgICAgICBiaW5kRGVwZW5kZW5jaWVzKGRlcml2YXRpb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBoYW5kbGVFeGNlcHRpb25JbkRlcml2YXRpb24oZGVyaXZhdGlvbikge1xuICAgIHZhciBtZXNzYWdlID0gKFwiW21vYnhdIEFuIHVuY2F1Z2h0IGV4Y2VwdGlvbiBvY2N1cnJlZCB3aGlsZSBjYWxjdWxhdGluZyB5b3VyIGNvbXB1dGVkIHZhbHVlLCBhdXRvcnVuIG9yIHRyYW5zZm9ybWVyLiBPciBpbnNpZGUgdGhlIHJlbmRlcigpIG1ldGhvZCBvZiBhbiBvYnNlcnZlciBiYXNlZCBSZWFjdCBjb21wb25lbnQuIFwiICtcbiAgICAgICAgXCJUaGVzZSBmdW5jdGlvbnMgc2hvdWxkIG5ldmVyIHRocm93IGV4Y2VwdGlvbnMgYXMgTW9iWCB3aWxsIG5vdCBhbHdheXMgYmUgYWJsZSB0byByZWNvdmVyIGZyb20gdGhlbS4gXCIgK1xuICAgICAgICAoXCJQbGVhc2UgZml4IHRoZSBlcnJvciByZXBvcnRlZCBhZnRlciB0aGlzIG1lc3NhZ2Ugb3IgZW5hYmxlICdQYXVzZSBvbiAoY2F1Z2h0KSBleGNlcHRpb25zJyBpbiB5b3VyIGRlYnVnZ2VyIHRvIGZpbmQgdGhlIHJvb3QgY2F1c2UuIEluOiAnXCIgKyBkZXJpdmF0aW9uLm5hbWUgKyBcIicuIFwiKSArXG4gICAgICAgIFwiRm9yIG1vcmUgZGV0YWlscyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vYnhqcy9tb2J4L2lzc3Vlcy80NjJcIik7XG4gICAgaWYgKGlzU3B5RW5hYmxlZCgpKSB7XG4gICAgICAgIHNweVJlcG9ydCh7XG4gICAgICAgICAgICB0eXBlOiBcImVycm9yXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgY2hhbmdlRGVwZW5kZW5jaWVzU3RhdGVUbzAoZGVyaXZhdGlvbik7XG4gICAgZGVyaXZhdGlvbi5uZXdPYnNlcnZpbmcgPSBudWxsO1xuICAgIGRlcml2YXRpb24udW5ib3VuZERlcHNDb3VudCA9IDA7XG4gICAgZGVyaXZhdGlvbi5yZWNvdmVyRnJvbUVycm9yKCk7XG4gICAgZW5kQmF0Y2goKTtcbiAgICByZXNldEdsb2JhbFN0YXRlKCk7XG59XG5mdW5jdGlvbiBiaW5kRGVwZW5kZW5jaWVzKGRlcml2YXRpb24pIHtcbiAgICB2YXIgcHJldk9ic2VydmluZyA9IGRlcml2YXRpb24ub2JzZXJ2aW5nO1xuICAgIHZhciBvYnNlcnZpbmcgPSBkZXJpdmF0aW9uLm9ic2VydmluZyA9IGRlcml2YXRpb24ubmV3T2JzZXJ2aW5nO1xuICAgIGRlcml2YXRpb24ubmV3T2JzZXJ2aW5nID0gbnVsbDtcbiAgICB2YXIgaTAgPSAwLCBsID0gZGVyaXZhdGlvbi51bmJvdW5kRGVwc0NvdW50O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBkZXAgPSBvYnNlcnZpbmdbaV07XG4gICAgICAgIGlmIChkZXAuZGlmZlZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICBkZXAuZGlmZlZhbHVlID0gMTtcbiAgICAgICAgICAgIGlmIChpMCAhPT0gaSlcbiAgICAgICAgICAgICAgICBvYnNlcnZpbmdbaTBdID0gZGVwO1xuICAgICAgICAgICAgaTArKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBvYnNlcnZpbmcubGVuZ3RoID0gaTA7XG4gICAgbCA9IHByZXZPYnNlcnZpbmcubGVuZ3RoO1xuICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgdmFyIGRlcCA9IHByZXZPYnNlcnZpbmdbbF07XG4gICAgICAgIGlmIChkZXAuZGlmZlZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICByZW1vdmVPYnNlcnZlcihkZXAsIGRlcml2YXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGRlcC5kaWZmVmFsdWUgPSAwO1xuICAgIH1cbiAgICB3aGlsZSAoaTAtLSkge1xuICAgICAgICB2YXIgZGVwID0gb2JzZXJ2aW5nW2kwXTtcbiAgICAgICAgaWYgKGRlcC5kaWZmVmFsdWUgPT09IDEpIHtcbiAgICAgICAgICAgIGRlcC5kaWZmVmFsdWUgPSAwO1xuICAgICAgICAgICAgYWRkT2JzZXJ2ZXIoZGVwLCBkZXJpdmF0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGNsZWFyT2JzZXJ2aW5nKGRlcml2YXRpb24pIHtcbiAgICB2YXIgb2JzID0gZGVyaXZhdGlvbi5vYnNlcnZpbmc7XG4gICAgdmFyIGkgPSBvYnMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pXG4gICAgICAgIHJlbW92ZU9ic2VydmVyKG9ic1tpXSwgZGVyaXZhdGlvbik7XG4gICAgZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuTk9UX1RSQUNLSU5HO1xuICAgIG9icy5sZW5ndGggPSAwO1xufVxuZnVuY3Rpb24gdW50cmFja2VkKGFjdGlvbikge1xuICAgIHZhciBwcmV2ID0gdW50cmFja2VkU3RhcnQoKTtcbiAgICB2YXIgcmVzID0gYWN0aW9uKCk7XG4gICAgdW50cmFja2VkRW5kKHByZXYpO1xuICAgIHJldHVybiByZXM7XG59XG5leHBvcnRzLnVudHJhY2tlZCA9IHVudHJhY2tlZDtcbmZ1bmN0aW9uIHVudHJhY2tlZFN0YXJ0KCkge1xuICAgIHZhciBwcmV2ID0gZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uO1xuICAgIGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbiA9IG51bGw7XG4gICAgcmV0dXJuIHByZXY7XG59XG5mdW5jdGlvbiB1bnRyYWNrZWRFbmQocHJldikge1xuICAgIGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbiA9IHByZXY7XG59XG5mdW5jdGlvbiBjaGFuZ2VEZXBlbmRlbmNpZXNTdGF0ZVRvMChkZXJpdmF0aW9uKSB7XG4gICAgaWYgKGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEU7XG4gICAgdmFyIG9icyA9IGRlcml2YXRpb24ub2JzZXJ2aW5nO1xuICAgIHZhciBpID0gb2JzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBvYnNbaV0ubG93ZXN0T2JzZXJ2ZXJTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURTtcbn1cbnZhciBwZXJzaXN0ZW50S2V5cyA9IFtcIm1vYnhHdWlkXCIsIFwicmVzZXRJZFwiLCBcInNweUxpc3RlbmVyc1wiLCBcInN0cmljdE1vZGVcIiwgXCJydW5JZFwiXTtcbnZhciBNb2JYR2xvYmFscyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTW9iWEdsb2JhbHMoKSB7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IDQ7XG4gICAgICAgIHRoaXMudHJhY2tpbmdEZXJpdmF0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5ydW5JZCA9IDA7XG4gICAgICAgIHRoaXMubW9ieEd1aWQgPSAwO1xuICAgICAgICB0aGlzLmluVHJhbnNhY3Rpb24gPSAwO1xuICAgICAgICB0aGlzLmlzUnVubmluZ1JlYWN0aW9ucyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmluQmF0Y2ggPSAwO1xuICAgICAgICB0aGlzLnBlbmRpbmdVbm9ic2VydmF0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLnBlbmRpbmdSZWFjdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5hbGxvd1N0YXRlQ2hhbmdlcyA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RyaWN0TW9kZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlc2V0SWQgPSAwO1xuICAgICAgICB0aGlzLnNweUxpc3RlbmVycyA9IFtdO1xuICAgIH1cbiAgICByZXR1cm4gTW9iWEdsb2JhbHM7XG59KCkpO1xudmFyIGdsb2JhbFN0YXRlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzID0gbmV3IE1vYlhHbG9iYWxzKCk7XG4gICAgaWYgKGdsb2JhbC5fX21vYnNlcnZhYmxlVHJhY2tpbmdTdGFjayB8fCBnbG9iYWwuX19tb2JzZXJ2YWJsZVZpZXdTdGFjaylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYnhdIEFuIGluY29tcGF0aWJsZSB2ZXJzaW9uIG9mIG1vYnNlcnZhYmxlIGlzIGFscmVhZHkgbG9hZGVkLlwiKTtcbiAgICBpZiAoZ2xvYmFsLl9fbW9ieEdsb2JhbCAmJiBnbG9iYWwuX19tb2J4R2xvYmFsLnZlcnNpb24gIT09IHJlcy52ZXJzaW9uKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieF0gQW4gaW5jb21wYXRpYmxlIHZlcnNpb24gb2YgbW9ieCBpcyBhbHJlYWR5IGxvYWRlZC5cIik7XG4gICAgaWYgKGdsb2JhbC5fX21vYnhHbG9iYWwpXG4gICAgICAgIHJldHVybiBnbG9iYWwuX19tb2J4R2xvYmFsO1xuICAgIHJldHVybiBnbG9iYWwuX19tb2J4R2xvYmFsID0gcmVzO1xufSkoKTtcbmZ1bmN0aW9uIHJlZ2lzdGVyR2xvYmFscygpIHtcbn1cbmZ1bmN0aW9uIHJlc2V0R2xvYmFsU3RhdGUoKSB7XG4gICAgZ2xvYmFsU3RhdGUucmVzZXRJZCsrO1xuICAgIHZhciBkZWZhdWx0R2xvYmFscyA9IG5ldyBNb2JYR2xvYmFscygpO1xuICAgIGZvciAodmFyIGtleSBpbiBkZWZhdWx0R2xvYmFscylcbiAgICAgICAgaWYgKHBlcnNpc3RlbnRLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpXG4gICAgICAgICAgICBnbG9iYWxTdGF0ZVtrZXldID0gZGVmYXVsdEdsb2JhbHNba2V5XTtcbiAgICBnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlQ2hhbmdlcyA9ICFnbG9iYWxTdGF0ZS5zdHJpY3RNb2RlO1xufVxuZnVuY3Rpb24gaGFzT2JzZXJ2ZXJzKG9ic2VydmFibGUpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5vYnNlcnZlcnMgJiYgb2JzZXJ2YWJsZS5vYnNlcnZlcnMubGVuZ3RoID4gMDtcbn1cbmZ1bmN0aW9uIGdldE9ic2VydmVycyhvYnNlcnZhYmxlKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUub2JzZXJ2ZXJzO1xufVxuZnVuY3Rpb24gaW52YXJpYW50T2JzZXJ2ZXJzKG9ic2VydmFibGUpIHtcbiAgICB2YXIgbGlzdCA9IG9ic2VydmFibGUub2JzZXJ2ZXJzO1xuICAgIHZhciBtYXAgPSBvYnNlcnZhYmxlLm9ic2VydmVyc0luZGV4ZXM7XG4gICAgdmFyIGwgPSBsaXN0Lmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgaWQgPSBsaXN0W2ldLl9fbWFwaWQ7XG4gICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgICBpbnZhcmlhbnQobWFwW2lkXSA9PT0gaSwgXCJJTlRFUk5BTCBFUlJPUiBtYXBzIGRlcml2YXRpb24uX19tYXBpZCB0byBpbmRleCBpbiBsaXN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW52YXJpYW50KCEoaWQgaW4gbWFwKSwgXCJJTlRFUk5BTCBFUlJPUiBvYnNlcnZlciBvbiBpbmRleCAwIHNob3VsZG50IGJlIGhlbGQgaW4gbWFwLlwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnZhcmlhbnQobGlzdC5sZW5ndGggPT09IDAgfHwgT2JqZWN0LmtleXMobWFwKS5sZW5ndGggPT09IGxpc3QubGVuZ3RoIC0gMSwgXCJJTlRFUk5BTCBFUlJPUiB0aGVyZSBpcyBubyBqdW5rIGluIG1hcFwiKTtcbn1cbmZ1bmN0aW9uIGFkZE9ic2VydmVyKG9ic2VydmFibGUsIG5vZGUpIHtcbiAgICB2YXIgbCA9IG9ic2VydmFibGUub2JzZXJ2ZXJzLmxlbmd0aDtcbiAgICBpZiAobCkge1xuICAgICAgICBvYnNlcnZhYmxlLm9ic2VydmVyc0luZGV4ZXNbbm9kZS5fX21hcGlkXSA9IGw7XG4gICAgfVxuICAgIG9ic2VydmFibGUub2JzZXJ2ZXJzW2xdID0gbm9kZTtcbiAgICBpZiAob2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlID4gbm9kZS5kZXBlbmRlbmNpZXNTdGF0ZSlcbiAgICAgICAgb2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlID0gbm9kZS5kZXBlbmRlbmNpZXNTdGF0ZTtcbn1cbmZ1bmN0aW9uIHJlbW92ZU9ic2VydmVyKG9ic2VydmFibGUsIG5vZGUpIHtcbiAgICBpZiAob2JzZXJ2YWJsZS5vYnNlcnZlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIG9ic2VydmFibGUub2JzZXJ2ZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgIHF1ZXVlRm9yVW5vYnNlcnZhdGlvbihvYnNlcnZhYmxlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBsaXN0ID0gb2JzZXJ2YWJsZS5vYnNlcnZlcnM7XG4gICAgICAgIHZhciBtYXBfMSA9IG9ic2VydmFibGUub2JzZXJ2ZXJzSW5kZXhlcztcbiAgICAgICAgdmFyIGZpbGxlciA9IGxpc3QucG9wKCk7XG4gICAgICAgIGlmIChmaWxsZXIgIT09IG5vZGUpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IG1hcF8xW25vZGUuX19tYXBpZF0gfHwgMDtcbiAgICAgICAgICAgIGlmIChpbmRleCkge1xuICAgICAgICAgICAgICAgIG1hcF8xW2ZpbGxlci5fX21hcGlkXSA9IGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG1hcF8xW2ZpbGxlci5fX21hcGlkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3RbaW5kZXhdID0gZmlsbGVyO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBtYXBfMVtub2RlLl9fbWFwaWRdO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHF1ZXVlRm9yVW5vYnNlcnZhdGlvbihvYnNlcnZhYmxlKSB7XG4gICAgaWYgKCFvYnNlcnZhYmxlLmlzUGVuZGluZ1Vub2JzZXJ2YXRpb24pIHtcbiAgICAgICAgb2JzZXJ2YWJsZS5pc1BlbmRpbmdVbm9ic2VydmF0aW9uID0gdHJ1ZTtcbiAgICAgICAgZ2xvYmFsU3RhdGUucGVuZGluZ1Vub2JzZXJ2YXRpb25zLnB1c2gob2JzZXJ2YWJsZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc3RhcnRCYXRjaCgpIHtcbiAgICBnbG9iYWxTdGF0ZS5pbkJhdGNoKys7XG59XG5mdW5jdGlvbiBlbmRCYXRjaCgpIHtcbiAgICBpZiAoZ2xvYmFsU3RhdGUuaW5CYXRjaCA9PT0gMSkge1xuICAgICAgICB2YXIgbGlzdCA9IGdsb2JhbFN0YXRlLnBlbmRpbmdVbm9ic2VydmF0aW9ucztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2YWJsZV8xID0gbGlzdFtpXTtcbiAgICAgICAgICAgIG9ic2VydmFibGVfMS5pc1BlbmRpbmdVbm9ic2VydmF0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAob2JzZXJ2YWJsZV8xLm9ic2VydmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlXzEub25CZWNvbWVVbm9ic2VydmVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsU3RhdGUucGVuZGluZ1Vub2JzZXJ2YXRpb25zID0gW107XG4gICAgfVxuICAgIGdsb2JhbFN0YXRlLmluQmF0Y2gtLTtcbn1cbmZ1bmN0aW9uIHJlcG9ydE9ic2VydmVkKG9ic2VydmFibGUpIHtcbiAgICB2YXIgZGVyaXZhdGlvbiA9IGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbjtcbiAgICBpZiAoZGVyaXZhdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoZGVyaXZhdGlvbi5ydW5JZCAhPT0gb2JzZXJ2YWJsZS5sYXN0QWNjZXNzZWRCeSkge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZS5sYXN0QWNjZXNzZWRCeSA9IGRlcml2YXRpb24ucnVuSWQ7XG4gICAgICAgICAgICBkZXJpdmF0aW9uLm5ld09ic2VydmluZ1tkZXJpdmF0aW9uLnVuYm91bmREZXBzQ291bnQrK10gPSBvYnNlcnZhYmxlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG9ic2VydmFibGUub2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBxdWV1ZUZvclVub2JzZXJ2YXRpb24ob2JzZXJ2YWJsZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW52YXJpYW50TE9TKG9ic2VydmFibGUsIG1zZykge1xuICAgIHZhciBtaW4gPSBnZXRPYnNlcnZlcnMob2JzZXJ2YWJsZSkucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBNYXRoLm1pbihhLCBiLmRlcGVuZGVuY2llc1N0YXRlKTsgfSwgMik7XG4gICAgaWYgKG1pbiA+PSBvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGUpXG4gICAgICAgIHJldHVybjtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJsb3dlc3RPYnNlcnZlclN0YXRlIGlzIHdyb25nIGZvciBcIiArIG1zZyArIFwiIGJlY2F1c2UgXCIgKyBtaW4gKyBcIiA8IFwiICsgb2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlKTtcbn1cbmZ1bmN0aW9uIHByb3BhZ2F0ZUNoYW5nZWQob2JzZXJ2YWJsZSkge1xuICAgIGlmIChvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuU1RBTEUpXG4gICAgICAgIHJldHVybjtcbiAgICBvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlNUQUxFO1xuICAgIHZhciBvYnNlcnZlcnMgPSBvYnNlcnZhYmxlLm9ic2VydmVycztcbiAgICB2YXIgaSA9IG9ic2VydmVycy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2YXIgZCA9IG9ic2VydmVyc1tpXTtcbiAgICAgICAgaWYgKGQuZGVwZW5kZW5jaWVzU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURSlcbiAgICAgICAgICAgIGQub25CZWNvbWVTdGFsZSgpO1xuICAgICAgICBkLmRlcGVuZGVuY2llc1N0YXRlID0gSURlcml2YXRpb25TdGF0ZS5TVEFMRTtcbiAgICB9XG59XG5mdW5jdGlvbiBwcm9wYWdhdGVDaGFuZ2VDb25maXJtZWQob2JzZXJ2YWJsZSkge1xuICAgIGlmIChvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuU1RBTEUpXG4gICAgICAgIHJldHVybjtcbiAgICBvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlNUQUxFO1xuICAgIHZhciBvYnNlcnZlcnMgPSBvYnNlcnZhYmxlLm9ic2VydmVycztcbiAgICB2YXIgaSA9IG9ic2VydmVycy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2YXIgZCA9IG9ic2VydmVyc1tpXTtcbiAgICAgICAgaWYgKGQuZGVwZW5kZW5jaWVzU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuUE9TU0lCTFlfU1RBTEUpXG4gICAgICAgICAgICBkLmRlcGVuZGVuY2llc1N0YXRlID0gSURlcml2YXRpb25TdGF0ZS5TVEFMRTtcbiAgICAgICAgZWxzZSBpZiAoZC5kZXBlbmRlbmNpZXNTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFKVxuICAgICAgICAgICAgb2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlID0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHByb3BhZ2F0ZU1heWJlQ2hhbmdlZChvYnNlcnZhYmxlKSB7XG4gICAgaWYgKG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZSAhPT0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFKVxuICAgICAgICByZXR1cm47XG4gICAgb2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlID0gSURlcml2YXRpb25TdGF0ZS5QT1NTSUJMWV9TVEFMRTtcbiAgICB2YXIgb2JzZXJ2ZXJzID0gb2JzZXJ2YWJsZS5vYnNlcnZlcnM7XG4gICAgdmFyIGkgPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmFyIGQgPSBvYnNlcnZlcnNbaV07XG4gICAgICAgIGlmIChkLmRlcGVuZGVuY2llc1N0YXRlID09PSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEUpIHtcbiAgICAgICAgICAgIGQuZGVwZW5kZW5jaWVzU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlBPU1NJQkxZX1NUQUxFO1xuICAgICAgICAgICAgZC5vbkJlY29tZVN0YWxlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG52YXIgUmVhY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlYWN0aW9uKG5hbWUsIG9uSW52YWxpZGF0ZSkge1xuICAgICAgICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7IG5hbWUgPSBcIlJlYWN0aW9uQFwiICsgZ2V0TmV4dElkKCk7IH1cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5vbkludmFsaWRhdGUgPSBvbkludmFsaWRhdGU7XG4gICAgICAgIHRoaXMub2JzZXJ2aW5nID0gW107XG4gICAgICAgIHRoaXMubmV3T2JzZXJ2aW5nID0gW107XG4gICAgICAgIHRoaXMuZGVwZW5kZW5jaWVzU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLk5PVF9UUkFDS0lORztcbiAgICAgICAgdGhpcy5kaWZmVmFsdWUgPSAwO1xuICAgICAgICB0aGlzLnJ1bklkID0gMDtcbiAgICAgICAgdGhpcy51bmJvdW5kRGVwc0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fX21hcGlkID0gXCIjXCIgKyBnZXROZXh0SWQoKTtcbiAgICAgICAgdGhpcy5pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzVHJhY2tQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzUnVubmluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBSZWFjdGlvbi5wcm90b3R5cGUub25CZWNvbWVTdGFsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuICAgIH07XG4gICAgUmVhY3Rpb24ucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzU2NoZWR1bGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1NjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgICAgICBnbG9iYWxTdGF0ZS5wZW5kaW5nUmVhY3Rpb25zLnB1c2godGhpcyk7XG4gICAgICAgICAgICBzdGFydEJhdGNoKCk7XG4gICAgICAgICAgICBydW5SZWFjdGlvbnMoKTtcbiAgICAgICAgICAgIGVuZEJhdGNoKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJlYWN0aW9uLnByb3RvdHlwZS5pc1NjaGVkdWxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU2NoZWR1bGVkO1xuICAgIH07XG4gICAgUmVhY3Rpb24ucHJvdG90eXBlLnJ1blJlYWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5faXNTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChzaG91bGRDb21wdXRlKHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNUcmFja1BlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMub25JbnZhbGlkYXRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzVHJhY2tQZW5kaW5nICYmIGlzU3B5RW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNweVJlcG9ydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInNjaGVkdWxlZC1yZWFjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUmVhY3Rpb24ucHJvdG90eXBlLnRyYWNrID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHN0YXJ0QmF0Y2goKTtcbiAgICAgICAgdmFyIG5vdGlmeSA9IGlzU3B5RW5hYmxlZCgpO1xuICAgICAgICB2YXIgc3RhcnRUaW1lO1xuICAgICAgICBpZiAobm90aWZ5KSB7XG4gICAgICAgICAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQoe1xuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICB0eXBlOiBcInJlYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgZm46IGZuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc1J1bm5pbmcgPSB0cnVlO1xuICAgICAgICB0cmFja0Rlcml2ZWRGdW5jdGlvbih0aGlzLCBmbik7XG4gICAgICAgIHRoaXMuX2lzUnVubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1RyYWNrUGVuZGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICBjbGVhck9ic2VydmluZyh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm90aWZ5KSB7XG4gICAgICAgICAgICBzcHlSZXBvcnRFbmQoe1xuICAgICAgICAgICAgICAgIHRpbWU6IERhdGUubm93KCkgLSBzdGFydFRpbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVuZEJhdGNoKCk7XG4gICAgfTtcbiAgICBSZWFjdGlvbi5wcm90b3R5cGUucmVjb3ZlckZyb21FcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5faXNSdW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzVHJhY2tQZW5kaW5nID0gZmFsc2U7XG4gICAgfTtcbiAgICBSZWFjdGlvbi5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzUnVubmluZykge1xuICAgICAgICAgICAgICAgIHN0YXJ0QmF0Y2goKTtcbiAgICAgICAgICAgICAgICBjbGVhck9ic2VydmluZyh0aGlzKTtcbiAgICAgICAgICAgICAgICBlbmRCYXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBSZWFjdGlvbi5wcm90b3R5cGUuZ2V0RGlzcG9zZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByID0gdGhpcy5kaXNwb3NlLmJpbmQodGhpcyk7XG4gICAgICAgIHIuJG1vYnggPSB0aGlzO1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIFJlYWN0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFwiUmVhY3Rpb25bXCIgKyB0aGlzLm5hbWUgKyBcIl1cIjtcbiAgICB9O1xuICAgIFJlYWN0aW9uLnByb3RvdHlwZS53aHlSdW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvYnNlcnZpbmcgPSB1bmlxdWUodGhpcy5faXNSdW5uaW5nID8gdGhpcy5uZXdPYnNlcnZpbmcgOiB0aGlzLm9ic2VydmluZykubWFwKGZ1bmN0aW9uIChkZXApIHsgcmV0dXJuIGRlcC5uYW1lOyB9KTtcbiAgICAgICAgcmV0dXJuIChcIlxcbldoeVJ1bj8gcmVhY3Rpb24gJ1wiICsgdGhpcy5uYW1lICsgXCInOlxcbiAqIFN0YXR1czogW1wiICsgKHRoaXMuaXNEaXNwb3NlZCA/IFwic3RvcHBlZFwiIDogdGhpcy5faXNSdW5uaW5nID8gXCJydW5uaW5nXCIgOiB0aGlzLmlzU2NoZWR1bGVkKCkgPyBcInNjaGVkdWxlZFwiIDogXCJpZGxlXCIpICsgXCJdXFxuICogVGhpcyByZWFjdGlvbiB3aWxsIHJlLXJ1biBpZiBhbnkgb2YgdGhlIGZvbGxvd2luZyBvYnNlcnZhYmxlcyBjaGFuZ2VzOlxcbiAgICBcIiArIGpvaW5TdHJpbmdzKG9ic2VydmluZykgKyBcIlxcbiAgICBcIiArICgodGhpcy5faXNSdW5uaW5nKSA/IFwiICguLi4gb3IgYW55IG9ic2VydmFibGUgYWNjZXNzZWQgZHVyaW5nIHRoZSByZW1haW5kZXIgb2YgdGhlIGN1cnJlbnQgcnVuKVwiIDogXCJcIikgKyBcIlxcblxcdE1pc3NpbmcgaXRlbXMgaW4gdGhpcyBsaXN0P1xcblxcdCAgMS4gQ2hlY2sgd2hldGhlciBhbGwgdXNlZCB2YWx1ZXMgYXJlIHByb3Blcmx5IG1hcmtlZCBhcyBvYnNlcnZhYmxlICh1c2UgaXNPYnNlcnZhYmxlIHRvIHZlcmlmeSlcXG5cXHQgIDIuIE1ha2Ugc3VyZSB5b3UgZGlkbid0IGRlcmVmZXJlbmNlIHZhbHVlcyB0b28gZWFybHkuIE1vYlggb2JzZXJ2ZXMgcHJvcHMsIG5vdCBwcmltaXRpdmVzLiBFLmc6IHVzZSAncGVyc29uLm5hbWUnIGluc3RlYWQgb2YgJ25hbWUnIGluIHlvdXIgY29tcHV0YXRpb24uXFxuXCIpO1xuICAgIH07XG4gICAgcmV0dXJuIFJlYWN0aW9uO1xufSgpKTtcbmV4cG9ydHMuUmVhY3Rpb24gPSBSZWFjdGlvbjtcbnZhciBNQVhfUkVBQ1RJT05fSVRFUkFUSU9OUyA9IDEwMDtcbnZhciByZWFjdGlvblNjaGVkdWxlciA9IGZ1bmN0aW9uIChmKSB7IHJldHVybiBmKCk7IH07XG5mdW5jdGlvbiBydW5SZWFjdGlvbnMoKSB7XG4gICAgaWYgKGdsb2JhbFN0YXRlLmlzUnVubmluZ1JlYWN0aW9ucyA9PT0gdHJ1ZSB8fCBnbG9iYWxTdGF0ZS5pblRyYW5zYWN0aW9uID4gMClcbiAgICAgICAgcmV0dXJuO1xuICAgIHJlYWN0aW9uU2NoZWR1bGVyKHJ1blJlYWN0aW9uc0hlbHBlcik7XG59XG5mdW5jdGlvbiBydW5SZWFjdGlvbnNIZWxwZXIoKSB7XG4gICAgZ2xvYmFsU3RhdGUuaXNSdW5uaW5nUmVhY3Rpb25zID0gdHJ1ZTtcbiAgICB2YXIgYWxsUmVhY3Rpb25zID0gZ2xvYmFsU3RhdGUucGVuZGluZ1JlYWN0aW9ucztcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgd2hpbGUgKGFsbFJlYWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICgrK2l0ZXJhdGlvbnMgPT09IE1BWF9SRUFDVElPTl9JVEVSQVRJT05TKSB7XG4gICAgICAgICAgICByZXNldEdsb2JhbFN0YXRlKCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKFwiUmVhY3Rpb24gZG9lc24ndCBjb252ZXJnZSB0byBhIHN0YWJsZSBzdGF0ZSBhZnRlciBcIiArIE1BWF9SRUFDVElPTl9JVEVSQVRJT05TICsgXCIgaXRlcmF0aW9ucy5cIilcbiAgICAgICAgICAgICAgICArIChcIiBQcm9iYWJseSB0aGVyZSBpcyBhIGN5Y2xlIGluIHRoZSByZWFjdGl2ZSBmdW5jdGlvbjogXCIgKyBhbGxSZWFjdGlvbnNbMF0pKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVtYWluaW5nUmVhY3Rpb25zID0gYWxsUmVhY3Rpb25zLnNwbGljZSgwKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSByZW1haW5pbmdSZWFjdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgICAgICAgcmVtYWluaW5nUmVhY3Rpb25zW2ldLnJ1blJlYWN0aW9uKCk7XG4gICAgfVxuICAgIGdsb2JhbFN0YXRlLmlzUnVubmluZ1JlYWN0aW9ucyA9IGZhbHNlO1xufVxudmFyIGlzUmVhY3Rpb24gPSBjcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlKFwiUmVhY3Rpb25cIiwgUmVhY3Rpb24pO1xuZnVuY3Rpb24gc2V0UmVhY3Rpb25TY2hlZHVsZXIoZm4pIHtcbiAgICB2YXIgYmFzZVNjaGVkdWxlciA9IHJlYWN0aW9uU2NoZWR1bGVyO1xuICAgIHJlYWN0aW9uU2NoZWR1bGVyID0gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGZuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJhc2VTY2hlZHVsZXIoZik7IH0pOyB9O1xufVxuZnVuY3Rpb24gaXNTcHlFbmFibGVkKCkge1xuICAgIHJldHVybiAhIWdsb2JhbFN0YXRlLnNweUxpc3RlbmVycy5sZW5ndGg7XG59XG5mdW5jdGlvbiBzcHlSZXBvcnQoZXZlbnQpIHtcbiAgICBpZiAoIWdsb2JhbFN0YXRlLnNweUxpc3RlbmVycy5sZW5ndGgpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB2YXIgbGlzdGVuZXJzID0gZ2xvYmFsU3RhdGUuc3B5TGlzdGVuZXJzO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7IGkrKylcbiAgICAgICAgbGlzdGVuZXJzW2ldKGV2ZW50KTtcbn1cbmZ1bmN0aW9uIHNweVJlcG9ydFN0YXJ0KGV2ZW50KSB7XG4gICAgdmFyIGNoYW5nZSA9IG9iamVjdEFzc2lnbih7fSwgZXZlbnQsIHsgc3B5UmVwb3J0U3RhcnQ6IHRydWUgfSk7XG4gICAgc3B5UmVwb3J0KGNoYW5nZSk7XG59XG52YXIgRU5EX0VWRU5UID0geyBzcHlSZXBvcnRFbmQ6IHRydWUgfTtcbmZ1bmN0aW9uIHNweVJlcG9ydEVuZChjaGFuZ2UpIHtcbiAgICBpZiAoY2hhbmdlKVxuICAgICAgICBzcHlSZXBvcnQob2JqZWN0QXNzaWduKHt9LCBjaGFuZ2UsIEVORF9FVkVOVCkpO1xuICAgIGVsc2VcbiAgICAgICAgc3B5UmVwb3J0KEVORF9FVkVOVCk7XG59XG5mdW5jdGlvbiBzcHkobGlzdGVuZXIpIHtcbiAgICBnbG9iYWxTdGF0ZS5zcHlMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgcmV0dXJuIG9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWR4ID0gZ2xvYmFsU3RhdGUuc3B5TGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgICAgICBpZiAoaWR4ICE9PSAtMSlcbiAgICAgICAgICAgIGdsb2JhbFN0YXRlLnNweUxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc3B5ID0gc3B5O1xuZnVuY3Rpb24gdHJhY2tUcmFuc2l0aW9ucyhvblJlcG9ydCkge1xuICAgIGRlcHJlY2F0ZWQoXCJ0cmFja1RyYW5zaXRpb25zIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb2J4LnNweSBpbnN0ZWFkXCIpO1xuICAgIGlmICh0eXBlb2Ygb25SZXBvcnQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgIGRlcHJlY2F0ZWQoXCJ0cmFja1RyYW5zaXRpb25zIG9ubHkgdGFrZXMgYSBzaW5nbGUgY2FsbGJhY2sgZnVuY3Rpb24uIElmIHlvdSBhcmUgdXNpbmcgdGhlIG1vYngtcmVhY3QtZGV2dG9vbHMsIHBsZWFzZSB1cGRhdGUgdGhlbSBmaXJzdFwiKTtcbiAgICAgICAgb25SZXBvcnQgPSBhcmd1bWVudHNbMV07XG4gICAgfVxuICAgIGlmICghb25SZXBvcnQpIHtcbiAgICAgICAgZGVwcmVjYXRlZChcInRyYWNrVHJhbnNpdGlvbnMgd2l0aG91dCBjYWxsYmFjayBoYXMgYmVlbiBkZXByZWNhdGVkIGFuZCBpcyBhIG5vLW9wIG5vdy4gSWYgeW91IGFyZSB1c2luZyB0aGUgbW9ieC1yZWFjdC1kZXZ0b29scywgcGxlYXNlIHVwZGF0ZSB0aGVtIGZpcnN0XCIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyB9O1xuICAgIH1cbiAgICByZXR1cm4gc3B5KG9uUmVwb3J0KTtcbn1cbmZ1bmN0aW9uIHRyYW5zYWN0aW9uKGFjdGlvbiwgdGhpc0FyZywgcmVwb3J0KSB7XG4gICAgaWYgKHRoaXNBcmcgPT09IHZvaWQgMCkgeyB0aGlzQXJnID0gdW5kZWZpbmVkOyB9XG4gICAgaWYgKHJlcG9ydCA9PT0gdm9pZCAwKSB7IHJlcG9ydCA9IHRydWU7IH1cbiAgICB0cmFuc2FjdGlvblN0YXJ0KChhY3Rpb24ubmFtZSkgfHwgXCJhbm9ueW1vdXMgdHJhbnNhY3Rpb25cIiwgdGhpc0FyZywgcmVwb3J0KTtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gYWN0aW9uLmNhbGwodGhpc0FyZyk7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cmFuc2FjdGlvbkVuZChyZXBvcnQpO1xuICAgIH1cbn1cbmV4cG9ydHMudHJhbnNhY3Rpb24gPSB0cmFuc2FjdGlvbjtcbmZ1bmN0aW9uIHRyYW5zYWN0aW9uU3RhcnQobmFtZSwgdGhpc0FyZywgcmVwb3J0KSB7XG4gICAgaWYgKHRoaXNBcmcgPT09IHZvaWQgMCkgeyB0aGlzQXJnID0gdW5kZWZpbmVkOyB9XG4gICAgaWYgKHJlcG9ydCA9PT0gdm9pZCAwKSB7IHJlcG9ydCA9IHRydWU7IH1cbiAgICBzdGFydEJhdGNoKCk7XG4gICAgZ2xvYmFsU3RhdGUuaW5UcmFuc2FjdGlvbiArPSAxO1xuICAgIGlmIChyZXBvcnQgJiYgaXNTcHlFbmFibGVkKCkpIHtcbiAgICAgICAgc3B5UmVwb3J0U3RhcnQoe1xuICAgICAgICAgICAgdHlwZTogXCJ0cmFuc2FjdGlvblwiLFxuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzQXJnLFxuICAgICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiB0cmFuc2FjdGlvbkVuZChyZXBvcnQpIHtcbiAgICBpZiAocmVwb3J0ID09PSB2b2lkIDApIHsgcmVwb3J0ID0gdHJ1ZTsgfVxuICAgIGlmICgtLWdsb2JhbFN0YXRlLmluVHJhbnNhY3Rpb24gPT09IDApIHtcbiAgICAgICAgcnVuUmVhY3Rpb25zKCk7XG4gICAgfVxuICAgIGlmIChyZXBvcnQgJiYgaXNTcHlFbmFibGVkKCkpXG4gICAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgIGVuZEJhdGNoKCk7XG59XG5mdW5jdGlvbiBoYXNJbnRlcmNlcHRvcnMoaW50ZXJjZXB0YWJsZSkge1xuICAgIHJldHVybiAoaW50ZXJjZXB0YWJsZS5pbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0YWJsZS5pbnRlcmNlcHRvcnMubGVuZ3RoID4gMCk7XG59XG5mdW5jdGlvbiByZWdpc3RlckludGVyY2VwdG9yKGludGVyY2VwdGFibGUsIGhhbmRsZXIpIHtcbiAgICB2YXIgaW50ZXJjZXB0b3JzID0gaW50ZXJjZXB0YWJsZS5pbnRlcmNlcHRvcnMgfHwgKGludGVyY2VwdGFibGUuaW50ZXJjZXB0b3JzID0gW10pO1xuICAgIGludGVyY2VwdG9ycy5wdXNoKGhhbmRsZXIpO1xuICAgIHJldHVybiBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlkeCA9IGludGVyY2VwdG9ycy5pbmRleE9mKGhhbmRsZXIpO1xuICAgICAgICBpZiAoaWR4ICE9PSAtMSlcbiAgICAgICAgICAgIGludGVyY2VwdG9ycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGludGVyY2VwdENoYW5nZShpbnRlcmNlcHRhYmxlLCBjaGFuZ2UpIHtcbiAgICB2YXIgcHJldlUgPSB1bnRyYWNrZWRTdGFydCgpO1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBpbnRlcmNlcHRvcnMgPSBpbnRlcmNlcHRhYmxlLmludGVyY2VwdG9ycztcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBpbnRlcmNlcHRvcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjaGFuZ2UgPSBpbnRlcmNlcHRvcnNbaV0oY2hhbmdlKTtcbiAgICAgICAgICAgIGludmFyaWFudCghY2hhbmdlIHx8IGNoYW5nZS50eXBlLCBcIkludGVyY2VwdCBoYW5kbGVycyBzaG91bGQgcmV0dXJuIG5vdGhpbmcgb3IgYSBjaGFuZ2Ugb2JqZWN0XCIpO1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoYW5nZTtcbiAgICB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHVudHJhY2tlZEVuZChwcmV2VSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaGFzTGlzdGVuZXJzKGxpc3RlbmFibGUpIHtcbiAgICByZXR1cm4gbGlzdGVuYWJsZS5jaGFuZ2VMaXN0ZW5lcnMgJiYgbGlzdGVuYWJsZS5jaGFuZ2VMaXN0ZW5lcnMubGVuZ3RoID4gMDtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyTGlzdGVuZXIobGlzdGVuYWJsZSwgaGFuZGxlcikge1xuICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5hYmxlLmNoYW5nZUxpc3RlbmVycyB8fCAobGlzdGVuYWJsZS5jaGFuZ2VMaXN0ZW5lcnMgPSBbXSk7XG4gICAgbGlzdGVuZXJzLnB1c2goaGFuZGxlcik7XG4gICAgcmV0dXJuIG9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWR4ID0gbGlzdGVuZXJzLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIGlmIChpZHggIT09IC0xKVxuICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbm90aWZ5TGlzdGVuZXJzKGxpc3RlbmFibGUsIGNoYW5nZSkge1xuICAgIHZhciBwcmV2VSA9IHVudHJhY2tlZFN0YXJ0KCk7XG4gICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmFibGUuY2hhbmdlTGlzdGVuZXJzO1xuICAgIGlmICghbGlzdGVuZXJzKVxuICAgICAgICByZXR1cm47XG4gICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoYW5nZSkpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyc1tpXS5hcHBseShudWxsLCBjaGFuZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGlzdGVuZXJzW2ldKGNoYW5nZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW50cmFja2VkRW5kKHByZXZVKTtcbn1cbnZhciBWYWx1ZU1vZGU7XG4oZnVuY3Rpb24gKFZhbHVlTW9kZSkge1xuICAgIFZhbHVlTW9kZVtWYWx1ZU1vZGVbXCJSZWN1cnNpdmVcIl0gPSAwXSA9IFwiUmVjdXJzaXZlXCI7XG4gICAgVmFsdWVNb2RlW1ZhbHVlTW9kZVtcIlJlZmVyZW5jZVwiXSA9IDFdID0gXCJSZWZlcmVuY2VcIjtcbiAgICBWYWx1ZU1vZGVbVmFsdWVNb2RlW1wiU3RydWN0dXJlXCJdID0gMl0gPSBcIlN0cnVjdHVyZVwiO1xuICAgIFZhbHVlTW9kZVtWYWx1ZU1vZGVbXCJGbGF0XCJdID0gM10gPSBcIkZsYXRcIjtcbn0pKFZhbHVlTW9kZSB8fCAoVmFsdWVNb2RlID0ge30pKTtcbmV4cG9ydHMuVmFsdWVNb2RlID0gVmFsdWVNb2RlO1xuZnVuY3Rpb24gd2l0aE1vZGlmaWVyKG1vZGlmaWVyLCB2YWx1ZSkge1xuICAgIGFzc2VydFVud3JhcHBlZCh2YWx1ZSwgXCJNb2RpZmllcnMgYXJlIG5vdCBhbGxvd2VkIHRvIGJlIG5lc3RlZFwiKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBtb2J4TW9kaWZpZXI6IG1vZGlmaWVyLFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICB9O1xufVxuZnVuY3Rpb24gZ2V0TW9kaWZpZXIodmFsdWUpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLm1vYnhNb2RpZmllciB8fCBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIGFzUmVmZXJlbmNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHdpdGhNb2RpZmllcihWYWx1ZU1vZGUuUmVmZXJlbmNlLCB2YWx1ZSk7XG59XG5leHBvcnRzLmFzUmVmZXJlbmNlID0gYXNSZWZlcmVuY2U7XG5hc1JlZmVyZW5jZS5tb2J4TW9kaWZpZXIgPSBWYWx1ZU1vZGUuUmVmZXJlbmNlO1xuZnVuY3Rpb24gYXNTdHJ1Y3R1cmUodmFsdWUpIHtcbiAgICByZXR1cm4gd2l0aE1vZGlmaWVyKFZhbHVlTW9kZS5TdHJ1Y3R1cmUsIHZhbHVlKTtcbn1cbmV4cG9ydHMuYXNTdHJ1Y3R1cmUgPSBhc1N0cnVjdHVyZTtcbmFzU3RydWN0dXJlLm1vYnhNb2RpZmllciA9IFZhbHVlTW9kZS5TdHJ1Y3R1cmU7XG5mdW5jdGlvbiBhc0ZsYXQodmFsdWUpIHtcbiAgICByZXR1cm4gd2l0aE1vZGlmaWVyKFZhbHVlTW9kZS5GbGF0LCB2YWx1ZSk7XG59XG5leHBvcnRzLmFzRmxhdCA9IGFzRmxhdDtcbmFzRmxhdC5tb2J4TW9kaWZpZXIgPSBWYWx1ZU1vZGUuRmxhdDtcbmZ1bmN0aW9uIGFzTWFwKGRhdGEsIG1vZGlmaWVyRnVuYykge1xuICAgIHJldHVybiBtYXAoZGF0YSwgbW9kaWZpZXJGdW5jKTtcbn1cbmV4cG9ydHMuYXNNYXAgPSBhc01hcDtcbmZ1bmN0aW9uIGdldFZhbHVlTW9kZUZyb21WYWx1ZSh2YWx1ZSwgZGVmYXVsdE1vZGUpIHtcbiAgICB2YXIgbW9kZSA9IGdldE1vZGlmaWVyKHZhbHVlKTtcbiAgICBpZiAobW9kZSlcbiAgICAgICAgcmV0dXJuIFttb2RlLCB2YWx1ZS52YWx1ZV07XG4gICAgcmV0dXJuIFtkZWZhdWx0TW9kZSwgdmFsdWVdO1xufVxuZnVuY3Rpb24gZ2V0VmFsdWVNb2RlRnJvbU1vZGlmaWVyRnVuYyhmdW5jKSB7XG4gICAgaWYgKGZ1bmMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIFZhbHVlTW9kZS5SZWN1cnNpdmU7XG4gICAgdmFyIG1vZCA9IGdldE1vZGlmaWVyKGZ1bmMpO1xuICAgIGludmFyaWFudChtb2QgIT09IG51bGwsIFwiQ2Fubm90IGRldGVybWluZSB2YWx1ZSBtb2RlIGZyb20gZnVuY3Rpb24uIFBsZWFzZSBwYXNzIGluIG9uZSBvZiB0aGVzZTogbW9ieC5hc1JlZmVyZW5jZSwgbW9ieC5hc1N0cnVjdHVyZSBvciBtb2J4LmFzRmxhdCwgZ290OiBcIiArIGZ1bmMpO1xuICAgIHJldHVybiBtb2Q7XG59XG5mdW5jdGlvbiBpc01vZGlmaWVyV3JhcHBlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5tb2J4TW9kaWZpZXIgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIG1ha2VDaGlsZE9ic2VydmFibGUodmFsdWUsIHBhcmVudE1vZGUsIG5hbWUpIHtcbiAgICB2YXIgY2hpbGRNb2RlO1xuICAgIGlmIChpc09ic2VydmFibGUodmFsdWUpKVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgc3dpdGNoIChwYXJlbnRNb2RlKSB7XG4gICAgICAgIGNhc2UgVmFsdWVNb2RlLlJlZmVyZW5jZTpcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgY2FzZSBWYWx1ZU1vZGUuRmxhdDpcbiAgICAgICAgICAgIGFzc2VydFVud3JhcHBlZCh2YWx1ZSwgXCJJdGVtcyBpbnNpZGUgJ2FzRmxhdCcgY2Fubm90IGhhdmUgbW9kaWZpZXJzXCIpO1xuICAgICAgICAgICAgY2hpbGRNb2RlID0gVmFsdWVNb2RlLlJlZmVyZW5jZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFZhbHVlTW9kZS5TdHJ1Y3R1cmU6XG4gICAgICAgICAgICBhc3NlcnRVbndyYXBwZWQodmFsdWUsIFwiSXRlbXMgaW5zaWRlICdhc1N0cnVjdHVyZScgY2Fubm90IGhhdmUgbW9kaWZpZXJzXCIpO1xuICAgICAgICAgICAgY2hpbGRNb2RlID0gVmFsdWVNb2RlLlN0cnVjdHVyZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFZhbHVlTW9kZS5SZWN1cnNpdmU6XG4gICAgICAgICAgICBfYSA9IGdldFZhbHVlTW9kZUZyb21WYWx1ZSh2YWx1ZSwgVmFsdWVNb2RlLlJlY3Vyc2l2ZSksIGNoaWxkTW9kZSA9IF9hWzBdLCB2YWx1ZSA9IF9hWzFdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpbnZhcmlhbnQoZmFsc2UsIFwiSWxsZWdhbCBTdGF0ZVwiKTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICByZXR1cm4gY3JlYXRlT2JzZXJ2YWJsZUFycmF5KHZhbHVlLCBjaGlsZE1vZGUsIG5hbWUpO1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSAmJiBPYmplY3QuaXNFeHRlbnNpYmxlKHZhbHVlKSlcbiAgICAgICAgcmV0dXJuIGV4dGVuZE9ic2VydmFibGVIZWxwZXIodmFsdWUsIHZhbHVlLCBjaGlsZE1vZGUsIG5hbWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgICB2YXIgX2E7XG59XG5mdW5jdGlvbiBhc3NlcnRVbndyYXBwZWQodmFsdWUsIG1lc3NhZ2UpIHtcbiAgICBpZiAoZ2V0TW9kaWZpZXIodmFsdWUpICE9PSBudWxsKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieF0gYXNTdHJ1Y3R1cmUgLyBhc1JlZmVyZW5jZSAvIGFzRmxhdCBjYW5ub3QgYmUgdXNlZCBoZXJlLiBcIiArIG1lc3NhZ2UpO1xufVxudmFyIHNhZmFyaVByb3RvdHlwZVNldHRlckluaGVyaXRhbmNlQnVnID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdiA9IGZhbHNlO1xuICAgIHZhciBwID0ge307XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHAsIFwiMFwiLCB7IHNldDogZnVuY3Rpb24gKCkgeyB2ID0gdHJ1ZTsgfSB9KTtcbiAgICBPYmplY3QuY3JlYXRlKHApW1wiMFwiXSA9IDE7XG4gICAgcmV0dXJuIHYgPT09IGZhbHNlO1xufSkoKTtcbnZhciBPQlNFUlZBQkxFX0FSUkFZX0JVRkZFUl9TSVpFID0gMDtcbnZhciBTdHViQXJyYXkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN0dWJBcnJheSgpIHtcbiAgICB9XG4gICAgcmV0dXJuIFN0dWJBcnJheTtcbn0oKSk7XG5TdHViQXJyYXkucHJvdG90eXBlID0gW107XG52YXIgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uKG5hbWUsIG1vZGUsIGFycmF5LCBvd25lZCkge1xuICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICAgICAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG4gICAgICAgIHRoaXMub3duZWQgPSBvd25lZDtcbiAgICAgICAgdGhpcy5sYXN0S25vd25MZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmludGVyY2VwdG9ycyA9IG51bGw7XG4gICAgICAgIHRoaXMuY2hhbmdlTGlzdGVuZXJzID0gbnVsbDtcbiAgICAgICAgdGhpcy5hdG9tID0gbmV3IEJhc2VBdG9tKG5hbWUgfHwgKFwiT2JzZXJ2YWJsZUFycmF5QFwiICsgZ2V0TmV4dElkKCkpKTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLm1ha2VSZWFjdGl2ZUFycmF5SXRlbSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBhc3NlcnRVbndyYXBwZWQodmFsdWUsIFwiQXJyYXkgdmFsdWVzIGNhbm5vdCBoYXZlIG1vZGlmaWVyc1wiKTtcbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gVmFsdWVNb2RlLkZsYXQgfHwgdGhpcy5tb2RlID09PSBWYWx1ZU1vZGUuUmVmZXJlbmNlKVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICByZXR1cm4gbWFrZUNoaWxkT2JzZXJ2YWJsZSh2YWx1ZSwgdGhpcy5tb2RlLCB0aGlzLmF0b20ubmFtZSArIFwiWy4uXVwiKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS5pbnRlcmNlcHQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvcih0aGlzLCBoYW5kbGVyKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgaWYgKGZpcmVJbW1lZGlhdGVseSA9PT0gdm9pZCAwKSB7IGZpcmVJbW1lZGlhdGVseSA9IGZhbHNlOyB9XG4gICAgICAgIGlmIChmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyKHtcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMuYXJyYXksXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzcGxpY2VcIixcbiAgICAgICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgICAgICBhZGRlZDogdGhpcy52YWx1ZXMuc2xpY2UoKSxcbiAgICAgICAgICAgICAgICBhZGRlZENvdW50OiB0aGlzLnZhbHVlcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgcmVtb3ZlZDogW10sXG4gICAgICAgICAgICAgICAgcmVtb3ZlZENvdW50OiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVnaXN0ZXJMaXN0ZW5lcih0aGlzLCBsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUuZ2V0QXJyYXlMZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMubGVuZ3RoO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLnNldEFycmF5TGVuZ3RoID0gZnVuY3Rpb24gKG5ld0xlbmd0aCkge1xuICAgICAgICBpZiAodHlwZW9mIG5ld0xlbmd0aCAhPT0gXCJudW1iZXJcIiB8fCBuZXdMZW5ndGggPCAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYnguYXJyYXldIE91dCBvZiByYW5nZTogXCIgKyBuZXdMZW5ndGgpO1xuICAgICAgICB2YXIgY3VycmVudExlbmd0aCA9IHRoaXMudmFsdWVzLmxlbmd0aDtcbiAgICAgICAgaWYgKG5ld0xlbmd0aCA9PT0gY3VycmVudExlbmd0aClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZWxzZSBpZiAobmV3TGVuZ3RoID4gY3VycmVudExlbmd0aClcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlV2l0aEFycmF5KGN1cnJlbnRMZW5ndGgsIDAsIG5ldyBBcnJheShuZXdMZW5ndGggLSBjdXJyZW50TGVuZ3RoKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlV2l0aEFycmF5KG5ld0xlbmd0aCwgY3VycmVudExlbmd0aCAtIG5ld0xlbmd0aCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUudXBkYXRlQXJyYXlMZW5ndGggPSBmdW5jdGlvbiAob2xkTGVuZ3RoLCBkZWx0YSkge1xuICAgICAgICBpZiAob2xkTGVuZ3RoICE9PSB0aGlzLmxhc3RLbm93bkxlbmd0aClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4XSBNb2RpZmljYXRpb24gZXhjZXB0aW9uOiB0aGUgaW50ZXJuYWwgc3RydWN0dXJlIG9mIGFuIG9ic2VydmFibGUgYXJyYXkgd2FzIGNoYW5nZWQuIERpZCB5b3UgdXNlIHBlZWsoKSB0byBjaGFuZ2UgaXQ/XCIpO1xuICAgICAgICB0aGlzLmxhc3RLbm93bkxlbmd0aCArPSBkZWx0YTtcbiAgICAgICAgaWYgKGRlbHRhID4gMCAmJiBvbGRMZW5ndGggKyBkZWx0YSArIDEgPiBPQlNFUlZBQkxFX0FSUkFZX0JVRkZFUl9TSVpFKVxuICAgICAgICAgICAgcmVzZXJ2ZUFycmF5QnVmZmVyKG9sZExlbmd0aCArIGRlbHRhICsgMSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUuc3BsaWNlV2l0aEFycmF5ID0gZnVuY3Rpb24gKGluZGV4LCBkZWxldGVDb3VudCwgbmV3SXRlbXMpIHtcbiAgICAgICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQoKTtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMudmFsdWVzLmxlbmd0aDtcbiAgICAgICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID4gbGVuZ3RoKVxuICAgICAgICAgICAgaW5kZXggPSBsZW5ndGg7XG4gICAgICAgIGVsc2UgaWYgKGluZGV4IDwgMClcbiAgICAgICAgICAgIGluZGV4ID0gTWF0aC5tYXgoMCwgbGVuZ3RoICsgaW5kZXgpO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gbGVuZ3RoIC0gaW5kZXg7XG4gICAgICAgIGVsc2UgaWYgKGRlbGV0ZUNvdW50ID09PSB1bmRlZmluZWQgfHwgZGVsZXRlQ291bnQgPT09IG51bGwpXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZGVsZXRlQ291bnQsIGxlbmd0aCAtIGluZGV4KSk7XG4gICAgICAgIGlmIChuZXdJdGVtcyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgbmV3SXRlbXMgPSBbXTtcbiAgICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLmFycmF5LFxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3BsaWNlXCIsXG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIHJlbW92ZWRDb3VudDogZGVsZXRlQ291bnQsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IG5ld0l0ZW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghY2hhbmdlKVxuICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWV9BUlJBWTtcbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gY2hhbmdlLnJlbW92ZWRDb3VudDtcbiAgICAgICAgICAgIG5ld0l0ZW1zID0gY2hhbmdlLmFkZGVkO1xuICAgICAgICB9XG4gICAgICAgIG5ld0l0ZW1zID0gbmV3SXRlbXMubWFwKHRoaXMubWFrZVJlYWN0aXZlQXJyYXlJdGVtLCB0aGlzKTtcbiAgICAgICAgdmFyIGxlbmd0aERlbHRhID0gbmV3SXRlbXMubGVuZ3RoIC0gZGVsZXRlQ291bnQ7XG4gICAgICAgIHRoaXMudXBkYXRlQXJyYXlMZW5ndGgobGVuZ3RoLCBsZW5ndGhEZWx0YSk7XG4gICAgICAgIHZhciByZXMgPSAoX2EgPSB0aGlzLnZhbHVlcykuc3BsaWNlLmFwcGx5KF9hLCBbaW5kZXgsIGRlbGV0ZUNvdW50XS5jb25jYXQobmV3SXRlbXMpKTtcbiAgICAgICAgaWYgKGRlbGV0ZUNvdW50ICE9PSAwIHx8IG5ld0l0ZW1zLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAgIHRoaXMubm90aWZ5QXJyYXlTcGxpY2UoaW5kZXgsIG5ld0l0ZW1zLCByZXMpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB2YXIgX2E7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUubm90aWZ5QXJyYXlDaGlsZFVwZGF0ZSA9IGZ1bmN0aW9uIChpbmRleCwgbmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHZhciBub3RpZnlTcHkgPSAhdGhpcy5vd25lZCAmJiBpc1NweUVuYWJsZWQoKTtcbiAgICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyh0aGlzKTtcbiAgICAgICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHkgPyB7XG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMuYXJyYXksXG4gICAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LCBuZXdWYWx1ZTogbmV3VmFsdWUsIG9sZFZhbHVlOiBvbGRWYWx1ZVxuICAgICAgICB9IDogbnVsbDtcbiAgICAgICAgaWYgKG5vdGlmeVNweSlcbiAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0KGNoYW5nZSk7XG4gICAgICAgIHRoaXMuYXRvbS5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICBub3RpZnlMaXN0ZW5lcnModGhpcywgY2hhbmdlKTtcbiAgICAgICAgaWYgKG5vdGlmeVNweSlcbiAgICAgICAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLm5vdGlmeUFycmF5U3BsaWNlID0gZnVuY3Rpb24gKGluZGV4LCBhZGRlZCwgcmVtb3ZlZCkge1xuICAgICAgICB2YXIgbm90aWZ5U3B5ID0gIXRoaXMub3duZWQgJiYgaXNTcHlFbmFibGVkKCk7XG4gICAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnModGhpcyk7XG4gICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5ID8ge1xuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLmFycmF5LFxuICAgICAgICAgICAgdHlwZTogXCJzcGxpY2VcIixcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCwgcmVtb3ZlZDogcmVtb3ZlZCwgYWRkZWQ6IGFkZGVkLFxuICAgICAgICAgICAgcmVtb3ZlZENvdW50OiByZW1vdmVkLmxlbmd0aCxcbiAgICAgICAgICAgIGFkZGVkQ291bnQ6IGFkZGVkLmxlbmd0aFxuICAgICAgICB9IDogbnVsbDtcbiAgICAgICAgaWYgKG5vdGlmeVNweSlcbiAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0KGNoYW5nZSk7XG4gICAgICAgIHRoaXMuYXRvbS5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICBub3RpZnlMaXN0ZW5lcnModGhpcywgY2hhbmdlKTtcbiAgICAgICAgaWYgKG5vdGlmeVNweSlcbiAgICAgICAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgIH07XG4gICAgcmV0dXJuIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uO1xufSgpKTtcbnZhciBPYnNlcnZhYmxlQXJyYXkgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhPYnNlcnZhYmxlQXJyYXksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZUFycmF5KGluaXRpYWxWYWx1ZXMsIG1vZGUsIG5hbWUsIG93bmVkKSB7XG4gICAgICAgIGlmIChvd25lZCA9PT0gdm9pZCAwKSB7IG93bmVkID0gZmFsc2U7IH1cbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHZhciBhZG0gPSBuZXcgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24obmFtZSwgbW9kZSwgdGhpcywgb3duZWQpO1xuICAgICAgICBhZGRIaWRkZW5GaW5hbFByb3AodGhpcywgXCIkbW9ieFwiLCBhZG0pO1xuICAgICAgICBpZiAoaW5pdGlhbFZhbHVlcyAmJiBpbml0aWFsVmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgYWRtLnVwZGF0ZUFycmF5TGVuZ3RoKDAsIGluaXRpYWxWYWx1ZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGFkbS52YWx1ZXMgPSBpbml0aWFsVmFsdWVzLm1hcChhZG0ubWFrZVJlYWN0aXZlQXJyYXlJdGVtLCBhZG0pO1xuICAgICAgICAgICAgYWRtLm5vdGlmeUFycmF5U3BsaWNlKDAsIGFkbS52YWx1ZXMuc2xpY2UoKSwgRU1QVFlfQVJSQVkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWRtLnZhbHVlcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzYWZhcmlQcm90b3R5cGVTZXR0ZXJJbmhlcml0YW5jZUJ1Zykge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFkbS5hcnJheSwgXCIwXCIsIEVOVFJZXzApO1xuICAgICAgICB9XG4gICAgfVxuICAgIE9ic2VydmFibGVBcnJheS5wcm90b3R5cGUuaW50ZXJjZXB0ID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG1vYnguaW50ZXJjZXB0KGhhbmRsZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5LnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgaWYgKGZpcmVJbW1lZGlhdGVseSA9PT0gdm9pZCAwKSB7IGZpcmVJbW1lZGlhdGVseSA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiB0aGlzLiRtb2J4Lm9ic2VydmUobGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXkucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGxpY2UoMCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXkucHJvdG90eXBlLmNvbmNhdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFycmF5cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJyYXlzW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJG1vYnguYXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseSh0aGlzLnNsaWNlKCksIGFycmF5cy5tYXAoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGlzT2JzZXJ2YWJsZUFycmF5KGEpID8gYS5zbGljZSgpIDogYTsgfSkpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5LnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gKG5ld0l0ZW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRtb2J4LnNwbGljZVdpdGhBcnJheSgwLCB0aGlzLiRtb2J4LnZhbHVlcy5sZW5ndGgsIG5ld0l0ZW1zKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheS5wcm90b3R5cGUudG9KUyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b0pTKCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXkucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRtb2J4LnZhbHVlcztcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheS5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uIChwcmVkaWNhdGUsIHRoaXNBcmcsIGZyb21JbmRleCkge1xuICAgICAgICBpZiAoZnJvbUluZGV4ID09PSB2b2lkIDApIHsgZnJvbUluZGV4ID0gMDsgfVxuICAgICAgICB0aGlzLiRtb2J4LmF0b20ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy4kbW9ieC52YWx1ZXMsIGwgPSBpdGVtcy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSBmcm9tSW5kZXg7IGkgPCBsOyBpKyspXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgaXRlbXNbaV0sIGksIHRoaXMpKVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtc1tpXTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheS5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24gKGluZGV4LCBkZWxldGVDb3VudCkge1xuICAgICAgICB2YXIgbmV3SXRlbXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG5ld0l0ZW1zW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kbW9ieC5zcGxpY2VXaXRoQXJyYXkoaW5kZXgpO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRtb2J4LnNwbGljZVdpdGhBcnJheShpbmRleCwgZGVsZXRlQ291bnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLiRtb2J4LnNwbGljZVdpdGhBcnJheShpbmRleCwgZGVsZXRlQ291bnQsIG5ld0l0ZW1zKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBpdGVtc1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYWRtID0gdGhpcy4kbW9ieDtcbiAgICAgICAgYWRtLnNwbGljZVdpdGhBcnJheShhZG0udmFsdWVzLmxlbmd0aCwgMCwgaXRlbXMpO1xuICAgICAgICByZXR1cm4gYWRtLnZhbHVlcy5sZW5ndGg7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXkucHJvdG90eXBlLnBvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BsaWNlKE1hdGgubWF4KHRoaXMuJG1vYngudmFsdWVzLmxlbmd0aCAtIDEsIDApLCAxKVswXTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheS5wcm90b3R5cGUuc2hpZnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwbGljZSgwLCAxKVswXTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheS5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBpdGVtc1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYWRtID0gdGhpcy4kbW9ieDtcbiAgICAgICAgYWRtLnNwbGljZVdpdGhBcnJheSgwLCAwLCBpdGVtcyk7XG4gICAgICAgIHJldHVybiBhZG0udmFsdWVzLmxlbmd0aDtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheS5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kbW9ieC5hdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgIHZhciBjbG9uZSA9IHRoaXMuc2xpY2UoKTtcbiAgICAgICAgcmV0dXJuIGNsb25lLnJldmVyc2UuYXBwbHkoY2xvbmUsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXkucHJvdG90eXBlLnNvcnQgPSBmdW5jdGlvbiAoY29tcGFyZUZuKSB7XG4gICAgICAgIHRoaXMuJG1vYnguYXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICB2YXIgY2xvbmUgPSB0aGlzLnNsaWNlKCk7XG4gICAgICAgIHJldHVybiBjbG9uZS5zb3J0LmFwcGx5KGNsb25lLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGlkeCA9IHRoaXMuJG1vYngudmFsdWVzLmluZGV4T2YodmFsdWUpO1xuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXkucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbiAoZnJvbUluZGV4LCB0b0luZGV4KSB7XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieC5hcnJheV0gSW5kZXggb3V0IG9mIGJvdW5kczogXCIgKyBpbmRleCArIFwiIGlzIG5lZ2F0aXZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuJG1vYngudmFsdWVzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieC5hcnJheV0gSW5kZXggb3V0IG9mIGJvdW5kczogXCIgKyBpbmRleCArIFwiIGlzIG5vdCBzbWFsbGVyIHRoYW4gXCIgKyBsZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoZWNrSW5kZXguY2FsbCh0aGlzLCBmcm9tSW5kZXgpO1xuICAgICAgICBjaGVja0luZGV4LmNhbGwodGhpcywgdG9JbmRleCk7XG4gICAgICAgIGlmIChmcm9tSW5kZXggPT09IHRvSW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb2xkSXRlbXMgPSB0aGlzLiRtb2J4LnZhbHVlcztcbiAgICAgICAgdmFyIG5ld0l0ZW1zO1xuICAgICAgICBpZiAoZnJvbUluZGV4IDwgdG9JbmRleCkge1xuICAgICAgICAgICAgbmV3SXRlbXMgPSBvbGRJdGVtcy5zbGljZSgwLCBmcm9tSW5kZXgpLmNvbmNhdChvbGRJdGVtcy5zbGljZShmcm9tSW5kZXggKyAxLCB0b0luZGV4ICsgMSksIFtvbGRJdGVtc1tmcm9tSW5kZXhdXSwgb2xkSXRlbXMuc2xpY2UodG9JbmRleCArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5ld0l0ZW1zID0gb2xkSXRlbXMuc2xpY2UoMCwgdG9JbmRleCkuY29uY2F0KFtvbGRJdGVtc1tmcm9tSW5kZXhdXSwgb2xkSXRlbXMuc2xpY2UodG9JbmRleCwgZnJvbUluZGV4KSwgb2xkSXRlbXMuc2xpY2UoZnJvbUluZGV4ICsgMSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVwbGFjZShuZXdJdGVtcyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gXCJbbW9ieC5hcnJheV0gXCIgKyBBcnJheS5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkodGhpcy4kbW9ieC52YWx1ZXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXkucHJvdG90eXBlLnRvTG9jYWxlU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gXCJbbW9ieC5hcnJheV0gXCIgKyBBcnJheS5wcm90b3R5cGUudG9Mb2NhbGVTdHJpbmcuYXBwbHkodGhpcy4kbW9ieC52YWx1ZXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZUFycmF5O1xufShTdHViQXJyYXkpKTtcbmRlY2xhcmVJdGVyYXRvcihPYnNlcnZhYmxlQXJyYXkucHJvdG90eXBlLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFycmF5QXNJdGVyYXRvcih0aGlzLnNsaWNlKCkpO1xufSk7XG5tYWtlTm9uRW51bWVyYWJsZShPYnNlcnZhYmxlQXJyYXkucHJvdG90eXBlLCBbXG4gICAgXCJjb25zdHJ1Y3RvclwiLFxuICAgIFwiaW50ZXJjZXB0XCIsXG4gICAgXCJvYnNlcnZlXCIsXG4gICAgXCJjbGVhclwiLFxuICAgIFwiY29uY2F0XCIsXG4gICAgXCJyZXBsYWNlXCIsXG4gICAgXCJ0b0pTXCIsXG4gICAgXCJ0b0pTT05cIixcbiAgICBcInBlZWtcIixcbiAgICBcImZpbmRcIixcbiAgICBcInNwbGljZVwiLFxuICAgIFwicHVzaFwiLFxuICAgIFwicG9wXCIsXG4gICAgXCJzaGlmdFwiLFxuICAgIFwidW5zaGlmdFwiLFxuICAgIFwicmV2ZXJzZVwiLFxuICAgIFwic29ydFwiLFxuICAgIFwicmVtb3ZlXCIsXG4gICAgXCJtb3ZlXCIsXG4gICAgXCJ0b1N0cmluZ1wiLFxuICAgIFwidG9Mb2NhbGVTdHJpbmdcIlxuXSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoT2JzZXJ2YWJsZUFycmF5LnByb3RvdHlwZSwgXCJsZW5ndGhcIiwge1xuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG1vYnguZ2V0QXJyYXlMZW5ndGgoKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKG5ld0xlbmd0aCkge1xuICAgICAgICB0aGlzLiRtb2J4LnNldEFycmF5TGVuZ3RoKG5ld0xlbmd0aCk7XG4gICAgfVxufSk7XG5bXG4gICAgXCJldmVyeVwiLFxuICAgIFwiZmlsdGVyXCIsXG4gICAgXCJmb3JFYWNoXCIsXG4gICAgXCJpbmRleE9mXCIsXG4gICAgXCJqb2luXCIsXG4gICAgXCJsYXN0SW5kZXhPZlwiLFxuICAgIFwibWFwXCIsXG4gICAgXCJyZWR1Y2VcIixcbiAgICBcInJlZHVjZVJpZ2h0XCIsXG4gICAgXCJzbGljZVwiLFxuICAgIFwic29tZVwiXG5dLmZvckVhY2goZnVuY3Rpb24gKGZ1bmNOYW1lKSB7XG4gICAgdmFyIGJhc2VGdW5jID0gQXJyYXkucHJvdG90eXBlW2Z1bmNOYW1lXTtcbiAgICBpbnZhcmlhbnQodHlwZW9mIGJhc2VGdW5jID09PSBcImZ1bmN0aW9uXCIsIFwiQmFzZSBmdW5jdGlvbiBub3QgZGVmaW5lZCBvbiBBcnJheSBwcm90b3R5cGU6ICdcIiArIGZ1bmNOYW1lICsgXCInXCIpO1xuICAgIGFkZEhpZGRlblByb3AoT2JzZXJ2YWJsZUFycmF5LnByb3RvdHlwZSwgZnVuY05hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kbW9ieC5hdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgIHJldHVybiBiYXNlRnVuYy5hcHBseSh0aGlzLiRtb2J4LnZhbHVlcywgYXJndW1lbnRzKTtcbiAgICB9KTtcbn0pO1xudmFyIEVOVFJZXzAgPSB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHNldDogY3JlYXRlQXJyYXlTZXR0ZXIoMCksXG4gICAgZ2V0OiBjcmVhdGVBcnJheUdldHRlcigwKVxufTtcbmZ1bmN0aW9uIGNyZWF0ZUFycmF5QnVmZmVySXRlbShpbmRleCkge1xuICAgIHZhciBzZXQgPSBjcmVhdGVBcnJheVNldHRlcihpbmRleCk7XG4gICAgdmFyIGdldCA9IGNyZWF0ZUFycmF5R2V0dGVyKGluZGV4KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JzZXJ2YWJsZUFycmF5LnByb3RvdHlwZSwgXCJcIiArIGluZGV4LCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHNldDogc2V0LCBnZXQ6IGdldFxuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlQXJyYXlTZXR0ZXIoaW5kZXgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIHZhciBhZG0gPSB0aGlzLiRtb2J4O1xuICAgICAgICB2YXIgdmFsdWVzID0gYWRtLnZhbHVlcztcbiAgICAgICAgYXNzZXJ0VW53cmFwcGVkKG5ld1ZhbHVlLCBcIk1vZGlmaWVycyBjYW5ub3QgYmUgdXNlZCBvbiBhcnJheSB2YWx1ZXMuIEZvciBub24tcmVhY3RpdmUgYXJyYXkgdmFsdWVzIHVzZSBtYWtlUmVhY3RpdmUoYXNGbGF0KGFycmF5KSkuXCIpO1xuICAgICAgICBpZiAoaW5kZXggPCB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCgpO1xuICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gdmFsdWVzW2luZGV4XTtcbiAgICAgICAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnMoYWRtKSkge1xuICAgICAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UoYWRtLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogYWRtLmFycmF5LFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICghY2hhbmdlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IGFkbS5tYWtlUmVhY3RpdmVBcnJheUl0ZW0obmV3VmFsdWUpO1xuICAgICAgICAgICAgdmFyIGNoYW5nZWQgPSAoYWRtLm1vZGUgPT09IFZhbHVlTW9kZS5TdHJ1Y3R1cmUpID8gIWRlZXBFcXVhbHMob2xkVmFsdWUsIG5ld1ZhbHVlKSA6IG9sZFZhbHVlICE9PSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzW2luZGV4XSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIGFkbS5ub3RpZnlBcnJheUNoaWxkVXBkYXRlKGluZGV4LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhZG0uc3BsaWNlV2l0aEFycmF5KGluZGV4LCAwLCBbbmV3VmFsdWVdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieC5hcnJheV0gSW5kZXggb3V0IG9mIGJvdW5kcywgXCIgKyBpbmRleCArIFwiIGlzIGxhcmdlciB0aGFuIFwiICsgdmFsdWVzLmxlbmd0aCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUFycmF5R2V0dGVyKGluZGV4KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGltcGwgPSB0aGlzLiRtb2J4O1xuICAgICAgICBpZiAoaW1wbCAmJiBpbmRleCA8IGltcGwudmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaW1wbC5hdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgICAgICByZXR1cm4gaW1wbC52YWx1ZXNbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybihcIlttb2J4LmFycmF5XSBBdHRlbXB0IHRvIHJlYWQgYW4gYXJyYXkgaW5kZXggKFwiICsgaW5kZXggKyBcIikgdGhhdCBpcyBvdXQgb2YgYm91bmRzIChcIiArIGltcGwudmFsdWVzLmxlbmd0aCArIFwiKS4gUGxlYXNlIGNoZWNrIGxlbmd0aCBmaXJzdC4gT3V0IG9mIGJvdW5kIGluZGljZXMgd2lsbCBub3QgYmUgdHJhY2tlZCBieSBNb2JYXCIpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG59XG5mdW5jdGlvbiByZXNlcnZlQXJyYXlCdWZmZXIobWF4KSB7XG4gICAgZm9yICh2YXIgaW5kZXggPSBPQlNFUlZBQkxFX0FSUkFZX0JVRkZFUl9TSVpFOyBpbmRleCA8IG1heDsgaW5kZXgrKylcbiAgICAgICAgY3JlYXRlQXJyYXlCdWZmZXJJdGVtKGluZGV4KTtcbiAgICBPQlNFUlZBQkxFX0FSUkFZX0JVRkZFUl9TSVpFID0gbWF4O1xufVxucmVzZXJ2ZUFycmF5QnVmZmVyKDEwMDApO1xuZnVuY3Rpb24gY3JlYXRlT2JzZXJ2YWJsZUFycmF5KGluaXRpYWxWYWx1ZXMsIG1vZGUsIG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVBcnJheShpbml0aWFsVmFsdWVzLCBtb2RlLCBuYW1lKTtcbn1cbmZ1bmN0aW9uIGZhc3RBcnJheShpbml0aWFsVmFsdWVzKSB7XG4gICAgZGVwcmVjYXRlZChcImZhc3RBcnJheSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIGBvYnNlcnZhYmxlKGFzRmxhdChbXSkpYFwiKTtcbiAgICByZXR1cm4gY3JlYXRlT2JzZXJ2YWJsZUFycmF5KGluaXRpYWxWYWx1ZXMsIFZhbHVlTW9kZS5GbGF0LCBudWxsKTtcbn1cbmV4cG9ydHMuZmFzdEFycmF5ID0gZmFzdEFycmF5O1xudmFyIGlzT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24gPSBjcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlKFwiT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb25cIiwgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24pO1xuZnVuY3Rpb24gaXNPYnNlcnZhYmxlQXJyYXkodGhpbmcpIHtcbiAgICByZXR1cm4gaXNPYmplY3QodGhpbmcpICYmIGlzT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24odGhpbmcuJG1vYngpO1xufVxuZXhwb3J0cy5pc09ic2VydmFibGVBcnJheSA9IGlzT2JzZXJ2YWJsZUFycmF5O1xudmFyIE9ic2VydmFibGVNYXBNYXJrZXIgPSB7fTtcbnZhciBPYnNlcnZhYmxlTWFwID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlTWFwKGluaXRpYWxEYXRhLCB2YWx1ZU1vZGVGdW5jKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJG1vYnggPSBPYnNlcnZhYmxlTWFwTWFya2VyO1xuICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgICAgIHRoaXMuX2hhc01hcCA9IHt9O1xuICAgICAgICB0aGlzLm5hbWUgPSBcIk9ic2VydmFibGVNYXBAXCIgKyBnZXROZXh0SWQoKTtcbiAgICAgICAgdGhpcy5fa2V5cyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkobnVsbCwgVmFsdWVNb2RlLlJlZmVyZW5jZSwgdGhpcy5uYW1lICsgXCIua2V5cygpXCIsIHRydWUpO1xuICAgICAgICB0aGlzLmludGVyY2VwdG9ycyA9IG51bGw7XG4gICAgICAgIHRoaXMuY2hhbmdlTGlzdGVuZXJzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdmFsdWVNb2RlID0gZ2V0VmFsdWVNb2RlRnJvbU1vZGlmaWVyRnVuYyh2YWx1ZU1vZGVGdW5jKTtcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlTW9kZSA9PT0gVmFsdWVNb2RlLkZsYXQpXG4gICAgICAgICAgICB0aGlzLl92YWx1ZU1vZGUgPSBWYWx1ZU1vZGUuUmVmZXJlbmNlO1xuICAgICAgICBhbGxvd1N0YXRlQ2hhbmdlcyh0cnVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChpbml0aWFsRGF0YSkpXG4gICAgICAgICAgICAgICAgX3RoaXMubWVyZ2UoaW5pdGlhbERhdGEpO1xuICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpbml0aWFsRGF0YSkpXG4gICAgICAgICAgICAgICAgaW5pdGlhbERhdGEuZm9yRWFjaChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IF9hWzBdLCB2YWx1ZSA9IF9hWzFdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUuX2hhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9kYXRhW2tleV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkS2V5KGtleSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGtleSA9IFwiXCIgKyBrZXk7XG4gICAgICAgIGlmICh0aGlzLl9oYXNNYXBba2V5XSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNNYXBba2V5XS5nZXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZUhhc01hcEVudHJ5KGtleSwgZmFsc2UpLmdldCgpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5hc3NlcnRWYWxpZEtleShrZXkpO1xuICAgICAgICBrZXkgPSBcIlwiICsga2V5O1xuICAgICAgICB2YXIgaGFzS2V5ID0gdGhpcy5faGFzKGtleSk7XG4gICAgICAgIGFzc2VydFVud3JhcHBlZCh2YWx1ZSwgXCJbbW9ieC5tYXAuc2V0XSBFeHBlY3RlZCB1bndyYXBwZWQgdmFsdWUgdG8gYmUgaW5zZXJ0ZWQgdG8ga2V5ICdcIiArIGtleSArIFwiJy4gSWYgeW91IG5lZWQgdG8gdXNlIG1vZGlmaWVycyBwYXNzIHRoZW0gYXMgc2Vjb25kIGFyZ3VtZW50IHRvIHRoZSBjb25zdHJ1Y3RvclwiKTtcbiAgICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogaGFzS2V5ID8gXCJ1cGRhdGVcIiA6IFwiYWRkXCIsXG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBrZXlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdmFsdWUgPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0tleSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmFsdWUoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRWYWx1ZShrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmFzc2VydFZhbGlkS2V5KGtleSk7XG4gICAgICAgIGtleSA9IFwiXCIgKyBrZXk7XG4gICAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnModGhpcykpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UodGhpcywge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZGVsZXRlXCIsXG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgICAgIG5hbWU6IGtleVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2hhcyhrZXkpKSB7XG4gICAgICAgICAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkKCk7XG4gICAgICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKHRoaXMpO1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHkgPyB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJkZWxldGVcIixcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IHRoaXMuX2RhdGFba2V5XS52YWx1ZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBrZXlcbiAgICAgICAgICAgIH0gOiBudWxsO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSlcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRTdGFydChjaGFuZ2UpO1xuICAgICAgICAgICAgdHJhbnNhY3Rpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9rZXlzLnJlbW92ZShrZXkpO1xuICAgICAgICAgICAgICAgIF90aGlzLl91cGRhdGVIYXNNYXBFbnRyeShrZXksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IF90aGlzLl9kYXRhW2tleV07XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5zZXROZXdWYWx1ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIF90aGlzLl9kYXRhW2tleV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9LCB1bmRlZmluZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5KVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUuX3VwZGF0ZUhhc01hcEVudHJ5ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5faGFzTWFwW2tleV07XG4gICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgZW50cnkuc2V0TmV3VmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW50cnkgPSB0aGlzLl9oYXNNYXBba2V5XSA9IG5ldyBPYnNlcnZhYmxlVmFsdWUodmFsdWUsIFZhbHVlTW9kZS5SZWZlcmVuY2UsIHRoaXMubmFtZSArIFwiLlwiICsga2V5ICsgXCI/XCIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwLnByb3RvdHlwZS5fdXBkYXRlVmFsdWUgPSBmdW5jdGlvbiAobmFtZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSB0aGlzLl9kYXRhW25hbWVdO1xuICAgICAgICBuZXdWYWx1ZSA9IG9ic2VydmFibGUucHJlcGFyZU5ld1ZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBVTkNIQU5HRUQpIHtcbiAgICAgICAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQoKTtcbiAgICAgICAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnModGhpcyk7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweSA/IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2JzZXJ2YWJsZS52YWx1ZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLCBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgICAgICAgIH0gOiBudWxsO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSlcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRTdGFydChjaGFuZ2UpO1xuICAgICAgICAgICAgb2JzZXJ2YWJsZS5zZXROZXdWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5KVxuICAgICAgICAgICAgICAgIG5vdGlmeUxpc3RlbmVycyh0aGlzLCBjaGFuZ2UpO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSlcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUuX2FkZFZhbHVlID0gZnVuY3Rpb24gKG5hbWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRyYW5zYWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvYnNlcnZhYmxlID0gX3RoaXMuX2RhdGFbbmFtZV0gPSBuZXcgT2JzZXJ2YWJsZVZhbHVlKG5ld1ZhbHVlLCBfdGhpcy5fdmFsdWVNb2RlLCBfdGhpcy5uYW1lICsgXCIuXCIgKyBuYW1lLCBmYWxzZSk7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IG9ic2VydmFibGUudmFsdWU7XG4gICAgICAgICAgICBfdGhpcy5fdXBkYXRlSGFzTWFwRW50cnkobmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICBfdGhpcy5fa2V5cy5wdXNoKG5hbWUpO1xuICAgICAgICB9LCB1bmRlZmluZWQsIGZhbHNlKTtcbiAgICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCgpO1xuICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKHRoaXMpO1xuICAgICAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweSA/IHtcbiAgICAgICAgICAgIHR5cGU6IFwiYWRkXCIsXG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICBuYW1lOiBuYW1lLCBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgICAgfSA6IG51bGw7XG4gICAgICAgIGlmIChub3RpZnlTcHkpXG4gICAgICAgICAgICBzcHlSZXBvcnRTdGFydChjaGFuZ2UpO1xuICAgICAgICBpZiAobm90aWZ5KVxuICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgIGlmIChub3RpZnlTcHkpXG4gICAgICAgICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAga2V5ID0gXCJcIiArIGtleTtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtrZXldLmdldCgpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5QXNJdGVyYXRvcih0aGlzLl9rZXlzLnNsaWNlKCkpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJyYXlBc0l0ZXJhdG9yKHRoaXMuX2tleXMubWFwKHRoaXMuZ2V0LCB0aGlzKSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gYXJyYXlBc0l0ZXJhdG9yKHRoaXMuX2tleXMubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIFtrZXksIF90aGlzLmdldChrZXkpXTsgfSkpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmtleXMoKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgX3RoaXMuZ2V0KGtleSksIGtleSk7IH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUubWVyZ2UgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdHJhbnNhY3Rpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZU1hcChvdGhlcikpXG4gICAgICAgICAgICAgICAgb3RoZXIua2V5cygpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gX3RoaXMuc2V0KGtleSwgb3RoZXIuZ2V0KGtleSkpOyB9KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhvdGhlcikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBfdGhpcy5zZXQoa2V5LCBvdGhlcltrZXldKTsgfSk7XG4gICAgICAgIH0sIHVuZGVmaW5lZCwgZmFsc2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0cmFuc2FjdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB1bnRyYWNrZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmtleXMoKS5mb3JFYWNoKF90aGlzLmRlbGV0ZSwgX3RoaXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHVuZGVmaW5lZCwgZmFsc2UpO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9ic2VydmFibGVNYXAucHJvdG90eXBlLCBcInNpemVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9rZXlzLmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUudG9KUyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJlcyA9IHt9O1xuICAgICAgICB0aGlzLmtleXMoKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHJlc1trZXldID0gX3RoaXMuZ2V0KGtleSk7IH0pO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUudG9KcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVwcmVjYXRlZChcInRvSnMgaXMgZGVwcmVjYXRlZCwgdXNlIHRvSlMgaW5zdGVhZFwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9KUygpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b0pTKCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwLnByb3RvdHlwZS5pc1ZhbGlkS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2Yga2V5ICE9PSBcIm51bWJlclwiICYmIHR5cGVvZiBrZXkgIT09IFwiYm9vbGVhblwiKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAucHJvdG90eXBlLmFzc2VydFZhbGlkS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZEtleShrZXkpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYngubWFwXSBJbnZhbGlkIGtleTogJ1wiICsga2V5ICsgXCInXCIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIlt7IFwiICsgdGhpcy5rZXlzKCkubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIChrZXkgKyBcIjogXCIgKyAoXCJcIiArIF90aGlzLmdldChrZXkpKSk7IH0pLmpvaW4oXCIsIFwiKSArIFwiIH1dXCI7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgaW52YXJpYW50KGZpcmVJbW1lZGlhdGVseSAhPT0gdHJ1ZSwgXCJgb2JzZXJ2ZWAgZG9lc24ndCBzdXBwb3J0IHRoZSBmaXJlIGltbWVkaWF0ZWx5IHByb3BlcnR5IGZvciBvYnNlcnZhYmxlIG1hcHMuXCIpO1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJMaXN0ZW5lcih0aGlzLCBsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwLnByb3RvdHlwZS5pbnRlcmNlcHQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvcih0aGlzLCBoYW5kbGVyKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlTWFwO1xufSgpKTtcbmV4cG9ydHMuT2JzZXJ2YWJsZU1hcCA9IE9ic2VydmFibGVNYXA7XG5kZWNsYXJlSXRlcmF0b3IoT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGUsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5lbnRyaWVzKCk7XG59KTtcbmZ1bmN0aW9uIG1hcChpbml0aWFsVmFsdWVzLCB2YWx1ZU1vZGlmaWVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlTWFwKGluaXRpYWxWYWx1ZXMsIHZhbHVlTW9kaWZpZXIpO1xufVxuZXhwb3J0cy5tYXAgPSBtYXA7XG52YXIgaXNPYnNlcnZhYmxlTWFwID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZShcIk9ic2VydmFibGVNYXBcIiwgT2JzZXJ2YWJsZU1hcCk7XG5leHBvcnRzLmlzT2JzZXJ2YWJsZU1hcCA9IGlzT2JzZXJ2YWJsZU1hcDtcbnZhciBDT01QVVRFRF9GVU5DX0RFUFJFQ0FURUQgPSAoXCJcXG5JbiBNb2JYIDIuKiBwYXNzaW5nIGEgZnVuY3Rpb24gd2l0aG91dCBhcmd1bWVudHMgdG8gKGV4dGVuZClvYnNlcnZhYmxlIHdpbGwgYXV0b21hdGljYWxseSBiZSBpbmZlcnJlZCB0byBiZSBhIGNvbXB1dGVkIHZhbHVlLlxcblRoaXMgYmVoYXZpb3IgaXMgYW1iaWd1b3VzIGFuZCB3aWxsIGNoYW5nZSBpbiBNb2JYIDMgdG8gY3JlYXRlIGp1c3QgYW4gb2JzZXJ2YWJsZSByZWZlcmVuY2UgdG8gdGhlIHZhbHVlIHBhc3NlZCBpbi5cXG5UbyBkaXNhbWJpZ3VhdGUsIHBsZWFzZSBwYXNzIHRoZSBmdW5jdGlvbiB3cmFwcGVkIHdpdGggYSBtb2RpZmllcjogdXNlICdjb21wdXRlZChmbiknIChmb3IgY3VycmVudCBiZWhhdmlvcjsgYXV0b21hdGljIGNvbnZlcnNpb24pLCBvciAnYXNSZWZlcmVuY2UoZm4pJyAoZnV0dXJlIGJlaGF2aW9yLCBqdXN0IHN0b3JlIHJlZmVyZW5jZSkgb3IgJ2FjdGlvbihmbiknLlxcbk5vdGUgdGhhdCB0aGUgaWRpb21hdGljIHdheSB0byB3cml0ZSBjb21wdXRlZCBwcm9wZXJ0aWVzIGlzICdvYnNlcnZhYmxlKHsgZ2V0IHByb3BlcnR5TmFtZSgpIHsgLi4uIH19KScuXFxuRm9yIG1vcmUgZGV0YWlscywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb2J4anMvbW9ieC9pc3N1ZXMvNTMyXCIpO1xudmFyIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uKHRhcmdldCwgbmFtZSwgbW9kZSkge1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgdGhpcy52YWx1ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5jaGFuZ2VMaXN0ZW5lcnMgPSBudWxsO1xuICAgICAgICB0aGlzLmludGVyY2VwdG9ycyA9IG51bGw7XG4gICAgfVxuICAgIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICAgIGludmFyaWFudChmaXJlSW1tZWRpYXRlbHkgIT09IHRydWUsIFwiYG9ic2VydmVgIGRvZXNuJ3Qgc3VwcG9ydCB0aGUgZmlyZSBpbW1lZGlhdGVseSBwcm9wZXJ0eSBmb3Igb2JzZXJ2YWJsZSBvYmplY3RzLlwiKTtcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVyTGlzdGVuZXIodGhpcywgY2FsbGJhY2spO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS5pbnRlcmNlcHQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvcih0aGlzLCBoYW5kbGVyKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb247XG59KCkpO1xuZnVuY3Rpb24gYXNPYnNlcnZhYmxlT2JqZWN0KHRhcmdldCwgbmFtZSwgbW9kZSkge1xuICAgIGlmIChtb2RlID09PSB2b2lkIDApIHsgbW9kZSA9IFZhbHVlTW9kZS5SZWN1cnNpdmU7IH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KHRhcmdldCkpXG4gICAgICAgIHJldHVybiB0YXJnZXQuJG1vYng7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KHRhcmdldCkpXG4gICAgICAgIG5hbWUgPSAodGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWUgfHwgXCJPYnNlcnZhYmxlT2JqZWN0XCIpICsgXCJAXCIgKyBnZXROZXh0SWQoKTtcbiAgICBpZiAoIW5hbWUpXG4gICAgICAgIG5hbWUgPSBcIk9ic2VydmFibGVPYmplY3RAXCIgKyBnZXROZXh0SWQoKTtcbiAgICB2YXIgYWRtID0gbmV3IE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbih0YXJnZXQsIG5hbWUsIG1vZGUpO1xuICAgIGFkZEhpZGRlbkZpbmFsUHJvcCh0YXJnZXQsIFwiJG1vYnhcIiwgYWRtKTtcbiAgICByZXR1cm4gYWRtO1xufVxuZnVuY3Rpb24gaGFuZGxlQXNDb21wdXRlZFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiICYmIHZhbHVlLmxlbmd0aCA9PT0gMCAmJiAhaXNBY3Rpb24odmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0T2JzZXJ2YWJsZU9iamVjdEluc3RhbmNlUHJvcGVydHkoYWRtLCBwcm9wTmFtZSwgZGVzY3JpcHRvcikge1xuICAgIGlmIChhZG0udmFsdWVzW3Byb3BOYW1lXSkge1xuICAgICAgICBpbnZhcmlhbnQoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IsIFwiY2Fubm90IHJlZGVmaW5lIHByb3BlcnR5IFwiICsgcHJvcE5hbWUpO1xuICAgICAgICBhZG0udGFyZ2V0W3Byb3BOYW1lXSA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVBc0NvbXB1dGVkVmFsdWUoZGVzY3JpcHRvci52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBkZXByZWNhdGVkKENPTVBVVEVEX0ZVTkNfREVQUkVDQVRFRCArIFwiKWluOiBcIiArIGFkbS5uYW1lICsgXCIuXCIgKyBwcm9wTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZpbmVPYnNlcnZhYmxlUHJvcGVydHkoYWRtLCBwcm9wTmFtZSwgZGVzY3JpcHRvci52YWx1ZSwgdHJ1ZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlZmluZU9ic2VydmFibGVQcm9wZXJ0eShhZG0sIHByb3BOYW1lLCBkZXNjcmlwdG9yLmdldCwgdHJ1ZSwgZGVzY3JpcHRvci5zZXQpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZGVmaW5lT2JzZXJ2YWJsZVByb3BlcnR5KGFkbSwgcHJvcE5hbWUsIG5ld1ZhbHVlLCBhc0luc3RhbmNlUHJvcGVydHksIHNldHRlcikge1xuICAgIGlmIChhc0luc3RhbmNlUHJvcGVydHkpXG4gICAgICAgIGFzc2VydFByb3BlcnR5Q29uZmlndXJhYmxlKGFkbS50YXJnZXQsIHByb3BOYW1lKTtcbiAgICB2YXIgb2JzZXJ2YWJsZTtcbiAgICB2YXIgbmFtZSA9IGFkbS5uYW1lICsgXCIuXCIgKyBwcm9wTmFtZTtcbiAgICB2YXIgaXNDb21wdXRlZCA9IHRydWU7XG4gICAgaWYgKGlzQ29tcHV0ZWRWYWx1ZShuZXdWYWx1ZSkpIHtcbiAgICAgICAgb2JzZXJ2YWJsZSA9IG5ld1ZhbHVlO1xuICAgICAgICBuZXdWYWx1ZS5uYW1lID0gbmFtZTtcbiAgICAgICAgaWYgKCFuZXdWYWx1ZS5zY29wZSlcbiAgICAgICAgICAgIG5ld1ZhbHVlLnNjb3BlID0gYWRtLnRhcmdldDtcbiAgICB9XG4gICAgZWxzZSBpZiAoaGFuZGxlQXNDb21wdXRlZFZhbHVlKG5ld1ZhbHVlKSkge1xuICAgICAgICBvYnNlcnZhYmxlID0gbmV3IENvbXB1dGVkVmFsdWUobmV3VmFsdWUsIGFkbS50YXJnZXQsIGZhbHNlLCBuYW1lLCBzZXR0ZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChnZXRNb2RpZmllcihuZXdWYWx1ZSkgPT09IFZhbHVlTW9kZS5TdHJ1Y3R1cmUgJiYgdHlwZW9mIG5ld1ZhbHVlLnZhbHVlID09PSBcImZ1bmN0aW9uXCIgJiYgbmV3VmFsdWUudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG9ic2VydmFibGUgPSBuZXcgQ29tcHV0ZWRWYWx1ZShuZXdWYWx1ZS52YWx1ZSwgYWRtLnRhcmdldCwgdHJ1ZSwgbmFtZSwgc2V0dGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlzQ29tcHV0ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyhhZG0pKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKGFkbSwge1xuICAgICAgICAgICAgICAgIG9iamVjdDogYWRtLnRhcmdldCxcbiAgICAgICAgICAgICAgICBuYW1lOiBwcm9wTmFtZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFkZFwiLFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGVWYWx1ZShuZXdWYWx1ZSwgYWRtLm1vZGUsIG5hbWUsIGZhbHNlKTtcbiAgICAgICAgbmV3VmFsdWUgPSBvYnNlcnZhYmxlLnZhbHVlO1xuICAgIH1cbiAgICBhZG0udmFsdWVzW3Byb3BOYW1lXSA9IG9ic2VydmFibGU7XG4gICAgaWYgKGFzSW5zdGFuY2VQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYWRtLnRhcmdldCwgcHJvcE5hbWUsIGlzQ29tcHV0ZWQgPyBnZW5lcmF0ZUNvbXB1dGVkUHJvcENvbmZpZyhwcm9wTmFtZSkgOiBnZW5lcmF0ZU9ic2VydmFibGVQcm9wQ29uZmlnKHByb3BOYW1lKSk7XG4gICAgfVxuICAgIGlmICghaXNDb21wdXRlZClcbiAgICAgICAgbm90aWZ5UHJvcGVydHlBZGRpdGlvbihhZG0sIGFkbS50YXJnZXQsIHByb3BOYW1lLCBuZXdWYWx1ZSk7XG59XG52YXIgb2JzZXJ2YWJsZVByb3BlcnR5Q29uZmlncyA9IHt9O1xudmFyIGNvbXB1dGVkUHJvcGVydHlDb25maWdzID0ge307XG5mdW5jdGlvbiBnZW5lcmF0ZU9ic2VydmFibGVQcm9wQ29uZmlnKHByb3BOYW1lKSB7XG4gICAgdmFyIGNvbmZpZyA9IG9ic2VydmFibGVQcm9wZXJ0eUNvbmZpZ3NbcHJvcE5hbWVdO1xuICAgIGlmIChjb25maWcpXG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgcmV0dXJuIG9ic2VydmFibGVQcm9wZXJ0eUNvbmZpZ3NbcHJvcE5hbWVdID0ge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG1vYngudmFsdWVzW3Byb3BOYW1lXS5nZXQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgc2V0UHJvcGVydHlWYWx1ZSh0aGlzLCBwcm9wTmFtZSwgdik7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVDb21wdXRlZFByb3BDb25maWcocHJvcE5hbWUpIHtcbiAgICB2YXIgY29uZmlnID0gY29tcHV0ZWRQcm9wZXJ0eUNvbmZpZ3NbcHJvcE5hbWVdO1xuICAgIGlmIChjb25maWcpXG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgcmV0dXJuIGNvbXB1dGVkUHJvcGVydHlDb25maWdzW3Byb3BOYW1lXSA9IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kbW9ieC52YWx1ZXNbcHJvcE5hbWVdLmdldCgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kbW9ieC52YWx1ZXNbcHJvcE5hbWVdLnNldCh2KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBzZXRQcm9wZXJ0eVZhbHVlKGluc3RhbmNlLCBuYW1lLCBuZXdWYWx1ZSkge1xuICAgIHZhciBhZG0gPSBpbnN0YW5jZS4kbW9ieDtcbiAgICB2YXIgb2JzZXJ2YWJsZSA9IGFkbS52YWx1ZXNbbmFtZV07XG4gICAgaWYgKGhhc0ludGVyY2VwdG9ycyhhZG0pKSB7XG4gICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UoYWRtLCB7XG4gICAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgb2JqZWN0OiBpbnN0YW5jZSxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIG5ld1ZhbHVlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgIH1cbiAgICBuZXdWYWx1ZSA9IG9ic2VydmFibGUucHJlcGFyZU5ld1ZhbHVlKG5ld1ZhbHVlKTtcbiAgICBpZiAobmV3VmFsdWUgIT09IFVOQ0hBTkdFRCkge1xuICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKGFkbSk7XG4gICAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQoKTtcbiAgICAgICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHkgPyB7XG4gICAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgb2JqZWN0OiBpbnN0YW5jZSxcbiAgICAgICAgICAgIG9sZFZhbHVlOiBvYnNlcnZhYmxlLnZhbHVlLFxuICAgICAgICAgICAgbmFtZTogbmFtZSwgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgIH0gOiBudWxsO1xuICAgICAgICBpZiAobm90aWZ5U3B5KVxuICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQoY2hhbmdlKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zZXROZXdWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICBub3RpZnlMaXN0ZW5lcnMoYWRtLCBjaGFuZ2UpO1xuICAgICAgICBpZiAobm90aWZ5U3B5KVxuICAgICAgICAgICAgc3B5UmVwb3J0RW5kKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gbm90aWZ5UHJvcGVydHlBZGRpdGlvbihhZG0sIG9iamVjdCwgbmFtZSwgbmV3VmFsdWUpIHtcbiAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKGFkbSk7XG4gICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCgpO1xuICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5ID8ge1xuICAgICAgICB0eXBlOiBcImFkZFwiLFxuICAgICAgICBvYmplY3Q6IG9iamVjdCwgbmFtZTogbmFtZSwgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgfSA6IG51bGw7XG4gICAgaWYgKG5vdGlmeVNweSlcbiAgICAgICAgc3B5UmVwb3J0U3RhcnQoY2hhbmdlKTtcbiAgICBpZiAobm90aWZ5KVxuICAgICAgICBub3RpZnlMaXN0ZW5lcnMoYWRtLCBjaGFuZ2UpO1xuICAgIGlmIChub3RpZnlTcHkpXG4gICAgICAgIHNweVJlcG9ydEVuZCgpO1xufVxudmFyIGlzT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZShcIk9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvblwiLCBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24pO1xuZnVuY3Rpb24gaXNPYnNlcnZhYmxlT2JqZWN0KHRoaW5nKSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaW5nKSkge1xuICAgICAgICBydW5MYXp5SW5pdGlhbGl6ZXJzKHRoaW5nKTtcbiAgICAgICAgcmV0dXJuIGlzT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uKHRoaW5nLiRtb2J4KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZXhwb3J0cy5pc09ic2VydmFibGVPYmplY3QgPSBpc09ic2VydmFibGVPYmplY3Q7XG52YXIgVU5DSEFOR0VEID0ge307XG52YXIgT2JzZXJ2YWJsZVZhbHVlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoT2JzZXJ2YWJsZVZhbHVlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGVWYWx1ZSh2YWx1ZSwgbW9kZSwgbmFtZSwgbm90aWZ5U3B5KSB7XG4gICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9IFwiT2JzZXJ2YWJsZVZhbHVlQFwiICsgZ2V0TmV4dElkKCk7IH1cbiAgICAgICAgaWYgKG5vdGlmeVNweSA9PT0gdm9pZCAwKSB7IG5vdGlmeVNweSA9IHRydWU7IH1cbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgbmFtZSk7XG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICAgIHRoaXMuaGFzVW5yZXBvcnRlZENoYW5nZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgX2EgPSBnZXRWYWx1ZU1vZGVGcm9tVmFsdWUodmFsdWUsIFZhbHVlTW9kZS5SZWN1cnNpdmUpLCBjaGlsZG1vZGUgPSBfYVswXSwgdW53cmFwcGVkVmFsdWUgPSBfYVsxXTtcbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gVmFsdWVNb2RlLlJlY3Vyc2l2ZSlcbiAgICAgICAgICAgIHRoaXMubW9kZSA9IGNoaWxkbW9kZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG1ha2VDaGlsZE9ic2VydmFibGUodW53cmFwcGVkVmFsdWUsIHRoaXMubW9kZSwgdGhpcy5uYW1lKTtcbiAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBpc1NweUVuYWJsZWQoKSkge1xuICAgICAgICAgICAgc3B5UmVwb3J0KHsgdHlwZTogXCJjcmVhdGVcIiwgb2JqZWN0OiB0aGlzLCBuZXdWYWx1ZTogdGhpcy52YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBPYnNlcnZhYmxlVmFsdWUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMucHJlcGFyZU5ld1ZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBVTkNIQU5HRUQpIHtcbiAgICAgICAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQoKTtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkpIHtcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRTdGFydCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlLCBvbGRWYWx1ZTogb2xkVmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0TmV3VmFsdWUobmV3VmFsdWUpO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSlcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZVZhbHVlLnByb3RvdHlwZS5wcmVwYXJlTmV3VmFsdWUgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgYXNzZXJ0VW53cmFwcGVkKG5ld1ZhbHVlLCBcIk1vZGlmaWVycyBjYW5ub3QgYmUgdXNlZCBvbiBub24taW5pdGlhbCB2YWx1ZXMuXCIpO1xuICAgICAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCgpO1xuICAgICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKHRoaXMsIHsgb2JqZWN0OiB0aGlzLCB0eXBlOiBcInVwZGF0ZVwiLCBuZXdWYWx1ZTogbmV3VmFsdWUgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gVU5DSEFOR0VEO1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoYW5nZWQgPSB2YWx1ZURpZENoYW5nZSh0aGlzLm1vZGUgPT09IFZhbHVlTW9kZS5TdHJ1Y3R1cmUsIHRoaXMudmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgaWYgKGNoYW5nZWQpXG4gICAgICAgICAgICByZXR1cm4gbWFrZUNoaWxkT2JzZXJ2YWJsZShuZXdWYWx1ZSwgdGhpcy5tb2RlLCB0aGlzLm5hbWUpO1xuICAgICAgICByZXR1cm4gVU5DSEFOR0VEO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVZhbHVlLnByb3RvdHlwZS5zZXROZXdWYWx1ZSA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICBpZiAoaGFzTGlzdGVuZXJzKHRoaXMpKVxuICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIFtuZXdWYWx1ZSwgb2xkVmFsdWVdKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVWYWx1ZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVZhbHVlLnByb3RvdHlwZS5pbnRlcmNlcHQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvcih0aGlzLCBoYW5kbGVyKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVWYWx1ZS5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICAgIGlmIChmaXJlSW1tZWRpYXRlbHkpXG4gICAgICAgICAgICBsaXN0ZW5lcih0aGlzLnZhbHVlLCB1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJMaXN0ZW5lcih0aGlzLCBsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlVmFsdWUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlVmFsdWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCJbXCIgKyB0aGlzLnZhbHVlICsgXCJdXCI7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZVZhbHVlO1xufShCYXNlQXRvbSkpO1xudmFyIGlzT2JzZXJ2YWJsZVZhbHVlID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZShcIk9ic2VydmFibGVWYWx1ZVwiLCBPYnNlcnZhYmxlVmFsdWUpO1xuZnVuY3Rpb24gZ2V0QXRvbSh0aGluZywgcHJvcGVydHkpIHtcbiAgICBpZiAodHlwZW9mIHRoaW5nID09PSBcIm9iamVjdFwiICYmIHRoaW5nICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc09ic2VydmFibGVBcnJheSh0aGluZykpIHtcbiAgICAgICAgICAgIGludmFyaWFudChwcm9wZXJ0eSA9PT0gdW5kZWZpbmVkLCBcIkl0IGlzIG5vdCBwb3NzaWJsZSB0byBnZXQgaW5kZXggYXRvbXMgZnJvbSBhcnJheXNcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpbmcuJG1vYnguYXRvbTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlTWFwKHRoaW5nKSkge1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEF0b20odGhpbmcuX2tleXMpO1xuICAgICAgICAgICAgdmFyIG9ic2VydmFibGVfMiA9IHRoaW5nLl9kYXRhW3Byb3BlcnR5XSB8fCB0aGluZy5faGFzTWFwW3Byb3BlcnR5XTtcbiAgICAgICAgICAgIGludmFyaWFudCghIW9ic2VydmFibGVfMiwgXCJ0aGUgZW50cnkgJ1wiICsgcHJvcGVydHkgKyBcIicgZG9lcyBub3QgZXhpc3QgaW4gdGhlIG9ic2VydmFibGUgbWFwICdcIiArIGdldERlYnVnTmFtZSh0aGluZykgKyBcIidcIik7XG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZV8yO1xuICAgICAgICB9XG4gICAgICAgIHJ1bkxhenlJbml0aWFsaXplcnModGhpbmcpO1xuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KHRoaW5nKSkge1xuICAgICAgICAgICAgaW52YXJpYW50KCEhcHJvcGVydHksIFwicGxlYXNlIHNwZWNpZnkgYSBwcm9wZXJ0eVwiKTtcbiAgICAgICAgICAgIHZhciBvYnNlcnZhYmxlXzMgPSB0aGluZy4kbW9ieC52YWx1ZXNbcHJvcGVydHldO1xuICAgICAgICAgICAgaW52YXJpYW50KCEhb2JzZXJ2YWJsZV8zLCBcIm5vIG9ic2VydmFibGUgcHJvcGVydHkgJ1wiICsgcHJvcGVydHkgKyBcIicgZm91bmQgb24gdGhlIG9ic2VydmFibGUgb2JqZWN0ICdcIiArIGdldERlYnVnTmFtZSh0aGluZykgKyBcIidcIik7XG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZV8zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0F0b20odGhpbmcpIHx8IGlzQ29tcHV0ZWRWYWx1ZSh0aGluZykgfHwgaXNSZWFjdGlvbih0aGluZykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGluZztcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdGhpbmcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBpZiAoaXNSZWFjdGlvbih0aGluZy4kbW9ieCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGluZy4kbW9ieDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnZhcmlhbnQoZmFsc2UsIFwiQ2Fubm90IG9idGFpbiBhdG9tIGZyb20gXCIgKyB0aGluZyk7XG59XG5mdW5jdGlvbiBnZXRBZG1pbmlzdHJhdGlvbih0aGluZywgcHJvcGVydHkpIHtcbiAgICBpbnZhcmlhbnQodGhpbmcsIFwiRXhwZWN0aW5nIHNvbWUgb2JqZWN0XCIpO1xuICAgIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gZ2V0QWRtaW5pc3RyYXRpb24oZ2V0QXRvbSh0aGluZywgcHJvcGVydHkpKTtcbiAgICBpZiAoaXNBdG9tKHRoaW5nKSB8fCBpc0NvbXB1dGVkVmFsdWUodGhpbmcpIHx8IGlzUmVhY3Rpb24odGhpbmcpKVxuICAgICAgICByZXR1cm4gdGhpbmc7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU1hcCh0aGluZykpXG4gICAgICAgIHJldHVybiB0aGluZztcbiAgICBydW5MYXp5SW5pdGlhbGl6ZXJzKHRoaW5nKTtcbiAgICBpZiAodGhpbmcuJG1vYngpXG4gICAgICAgIHJldHVybiB0aGluZy4kbW9ieDtcbiAgICBpbnZhcmlhbnQoZmFsc2UsIFwiQ2Fubm90IG9idGFpbiBhZG1pbmlzdHJhdGlvbiBmcm9tIFwiICsgdGhpbmcpO1xufVxuZnVuY3Rpb24gZ2V0RGVidWdOYW1lKHRoaW5nLCBwcm9wZXJ0eSkge1xuICAgIHZhciBuYW1lZDtcbiAgICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgbmFtZWQgPSBnZXRBdG9tKHRoaW5nLCBwcm9wZXJ0eSk7XG4gICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KHRoaW5nKSB8fCBpc09ic2VydmFibGVNYXAodGhpbmcpKVxuICAgICAgICBuYW1lZCA9IGdldEFkbWluaXN0cmF0aW9uKHRoaW5nKTtcbiAgICBlbHNlXG4gICAgICAgIG5hbWVkID0gZ2V0QXRvbSh0aGluZyk7XG4gICAgcmV0dXJuIG5hbWVkLm5hbWU7XG59XG5mdW5jdGlvbiBjcmVhdGVDbGFzc1Byb3BlcnR5RGVjb3JhdG9yKG9uSW5pdGlhbGl6ZSwgZ2V0LCBzZXQsIGVudW1lcmFibGUsIGFsbG93Q3VzdG9tQXJndW1lbnRzKSB7XG4gICAgZnVuY3Rpb24gY2xhc3NQcm9wZXJ0eURlY29yYXRvcih0YXJnZXQsIGtleSwgZGVzY3JpcHRvciwgY3VzdG9tQXJncywgYXJnTGVuKSB7XG4gICAgICAgIGludmFyaWFudChhbGxvd0N1c3RvbUFyZ3VtZW50cyB8fCBxdWFja3NMaWtlQURlY29yYXRvcihhcmd1bWVudHMpLCBcIlRoaXMgZnVuY3Rpb24gaXMgYSBkZWNvcmF0b3IsIGJ1dCBpdCB3YXNuJ3QgaW52b2tlZCBsaWtlIGEgZGVjb3JhdG9yXCIpO1xuICAgICAgICBpZiAoIWRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIHZhciBuZXdEZXNjcmlwdG9yID0ge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGVudW1lcmFibGUsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX19tb2J4SW5pdGlhbGl6ZWRQcm9wcyB8fCB0aGlzLl9fbW9ieEluaXRpYWxpemVkUHJvcHNba2V5XSAhPT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVzY3JpcHRJbml0aWFsaXplUHJvcGVydHkodGhpcywga2V5LCB1bmRlZmluZWQsIG9uSW5pdGlhbGl6ZSwgY3VzdG9tQXJncywgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXQuY2FsbCh0aGlzLCBrZXkpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX19tb2J4SW5pdGlhbGl6ZWRQcm9wcyB8fCB0aGlzLl9fbW9ieEluaXRpYWxpemVkUHJvcHNba2V5XSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZXNjcmlwdEluaXRpYWxpemVQcm9wZXJ0eSh0aGlzLCBrZXksIHYsIG9uSW5pdGlhbGl6ZSwgY3VzdG9tQXJncywgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQuY2FsbCh0aGlzLCBrZXksIHYpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMyB8fCBhcmd1bWVudHMubGVuZ3RoID09PSA1ICYmIGFyZ0xlbiA8IDMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIG5ld0Rlc2NyaXB0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld0Rlc2NyaXB0b3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3BlcnR5KHRhcmdldCwgXCJfX21vYnhMYXp5SW5pdGlhbGl6ZXJzXCIpKSB7XG4gICAgICAgICAgICAgICAgYWRkSGlkZGVuUHJvcCh0YXJnZXQsIFwiX19tb2J4TGF6eUluaXRpYWxpemVyc1wiLCAodGFyZ2V0Ll9fbW9ieExhenlJbml0aWFsaXplcnMgJiYgdGFyZ2V0Ll9fbW9ieExhenlJbml0aWFsaXplcnMuc2xpY2UoKSkgfHwgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHZhbHVlXzEgPSBkZXNjcmlwdG9yLnZhbHVlLCBpbml0aWFsaXplcl8xID0gZGVzY3JpcHRvci5pbml0aWFsaXplcjtcbiAgICAgICAgICAgIHRhcmdldC5fX21vYnhMYXp5SW5pdGlhbGl6ZXJzLnB1c2goZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgb25Jbml0aWFsaXplKGluc3RhbmNlLCBrZXksIChpbml0aWFsaXplcl8xID8gaW5pdGlhbGl6ZXJfMS5jYWxsKGluc3RhbmNlKSA6IHZhbHVlXzEpLCBjdXN0b21BcmdzLCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBlbnVtZXJhYmxlLCBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fbW9ieERpZFJ1bkxhenlJbml0aWFsaXplcnMgIT09IHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICBydW5MYXp5SW5pdGlhbGl6ZXJzKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0LmNhbGwodGhpcywga2V5KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX19tb2J4RGlkUnVuTGF6eUluaXRpYWxpemVycyAhPT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bkxhenlJbml0aWFsaXplcnModGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHNldC5jYWxsKHRoaXMsIGtleSwgdik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoYWxsb3dDdXN0b21Bcmd1bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChxdWFja3NMaWtlQURlY29yYXRvcihhcmd1bWVudHMpKVxuICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc1Byb3BlcnR5RGVjb3JhdG9yLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB2YXIgb3V0ZXJBcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgdmFyIGFyZ0xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7IHJldHVybiBjbGFzc1Byb3BlcnR5RGVjb3JhdG9yKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yLCBvdXRlckFyZ3MsIGFyZ0xlbik7IH07XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjbGFzc1Byb3BlcnR5RGVjb3JhdG9yO1xufVxuZnVuY3Rpb24gdHlwZXNjcmlwdEluaXRpYWxpemVQcm9wZXJ0eShpbnN0YW5jZSwga2V5LCB2LCBvbkluaXRpYWxpemUsIGN1c3RvbUFyZ3MsIGJhc2VEZXNjcmlwdG9yKSB7XG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShpbnN0YW5jZSwgXCJfX21vYnhJbml0aWFsaXplZFByb3BzXCIpKVxuICAgICAgICBhZGRIaWRkZW5Qcm9wKGluc3RhbmNlLCBcIl9fbW9ieEluaXRpYWxpemVkUHJvcHNcIiwge30pO1xuICAgIGluc3RhbmNlLl9fbW9ieEluaXRpYWxpemVkUHJvcHNba2V5XSA9IHRydWU7XG4gICAgb25Jbml0aWFsaXplKGluc3RhbmNlLCBrZXksIHYsIGN1c3RvbUFyZ3MsIGJhc2VEZXNjcmlwdG9yKTtcbn1cbmZ1bmN0aW9uIHJ1bkxhenlJbml0aWFsaXplcnMoaW5zdGFuY2UpIHtcbiAgICBpZiAoaW5zdGFuY2UuX19tb2J4RGlkUnVuTGF6eUluaXRpYWxpemVycyA9PT0gdHJ1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChpbnN0YW5jZS5fX21vYnhMYXp5SW5pdGlhbGl6ZXJzKSB7XG4gICAgICAgIGFkZEhpZGRlblByb3AoaW5zdGFuY2UsIFwiX19tb2J4RGlkUnVuTGF6eUluaXRpYWxpemVyc1wiLCB0cnVlKTtcbiAgICAgICAgaW5zdGFuY2UuX19tb2J4RGlkUnVuTGF6eUluaXRpYWxpemVycyAmJiBpbnN0YW5jZS5fX21vYnhMYXp5SW5pdGlhbGl6ZXJzLmZvckVhY2goZnVuY3Rpb24gKGluaXRpYWxpemVyKSB7IHJldHVybiBpbml0aWFsaXplcihpbnN0YW5jZSk7IH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHF1YWNrc0xpa2VBRGVjb3JhdG9yKGFyZ3MpIHtcbiAgICByZXR1cm4gKGFyZ3MubGVuZ3RoID09PSAyIHx8IGFyZ3MubGVuZ3RoID09PSAzKSAmJiB0eXBlb2YgYXJnc1sxXSA9PT0gXCJzdHJpbmdcIjtcbn1cbmZ1bmN0aW9uIGl0ZXJhdG9yU3ltYm9sKCkge1xuICAgIHJldHVybiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvcikgfHwgXCJAQGl0ZXJhdG9yXCI7XG59XG52YXIgSVNfSVRFUkFUSU5HX01BUktFUiA9IFwiX18kJGl0ZXJhdGluZ1wiO1xuZnVuY3Rpb24gYXJyYXlBc0l0ZXJhdG9yKGFycmF5KSB7XG4gICAgaW52YXJpYW50KGFycmF5W0lTX0lURVJBVElOR19NQVJLRVJdICE9PSB0cnVlLCBcIklsbGVnYWwgc3RhdGU6IGNhbm5vdCByZWN5Y2xlIGFycmF5IGFzIGl0ZXJhdG9yXCIpO1xuICAgIGFkZEhpZGRlbkZpbmFsUHJvcChhcnJheSwgSVNfSVRFUkFUSU5HX01BUktFUiwgdHJ1ZSk7XG4gICAgdmFyIGlkeCA9IC0xO1xuICAgIGFkZEhpZGRlbkZpbmFsUHJvcChhcnJheSwgXCJuZXh0XCIsIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgIGlkeCsrO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZG9uZTogaWR4ID49IHRoaXMubGVuZ3RoLFxuICAgICAgICAgICAgdmFsdWU6IGlkeCA8IHRoaXMubGVuZ3RoID8gdGhpc1tpZHhdIDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIGFycmF5O1xufVxuZnVuY3Rpb24gZGVjbGFyZUl0ZXJhdG9yKHByb3RvdFR5cGUsIGl0ZXJhdG9yRmFjdG9yeSkge1xuICAgIGFkZEhpZGRlbkZpbmFsUHJvcChwcm90b3RUeXBlLCBpdGVyYXRvclN5bWJvbCgpLCBpdGVyYXRvckZhY3RvcnkpO1xufVxudmFyIFNpbXBsZUV2ZW50RW1pdHRlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2ltcGxlRXZlbnRFbWl0dGVyKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgICAgICBkZXByZWNhdGVkKFwiZXh0cmFzLlNpbXBsZUV2ZW50RW1pdHRlciBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgcmVsZWFzZVwiKTtcbiAgICB9XG4gICAgU2ltcGxlRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuc2xpY2UoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgICBTaW1wbGVFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gb25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaWR4ID0gX3RoaXMubGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgICAgICAgICAgaWYgKGlkeCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgX3RoaXMubGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNpbXBsZUV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gdGhpcy5vbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH07XG4gICAgcmV0dXJuIFNpbXBsZUV2ZW50RW1pdHRlcjtcbn0oKSk7XG5leHBvcnRzLlNpbXBsZUV2ZW50RW1pdHRlciA9IFNpbXBsZUV2ZW50RW1pdHRlcjtcbnZhciBFTVBUWV9BUlJBWSA9IFtdO1xuT2JqZWN0LmZyZWV6ZShFTVBUWV9BUlJBWSk7XG5mdW5jdGlvbiBnZXROZXh0SWQoKSB7XG4gICAgcmV0dXJuICsrZ2xvYmFsU3RhdGUubW9ieEd1aWQ7XG59XG5mdW5jdGlvbiBpbnZhcmlhbnQoY2hlY2ssIG1lc3NhZ2UsIHRoaW5nKSB7XG4gICAgaWYgKCFjaGVjaylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYnhdIEludmFyaWFudCBmYWlsZWQ6IFwiICsgbWVzc2FnZSArICh0aGluZyA/IFwiIGluICdcIiArIHRoaW5nICsgXCInXCIgOiBcIlwiKSk7XG59XG52YXIgZGVwcmVjYXRlZE1lc3NhZ2VzID0gW107XG5mdW5jdGlvbiBkZXByZWNhdGVkKG1zZykge1xuICAgIGlmIChkZXByZWNhdGVkTWVzc2FnZXMuaW5kZXhPZihtc2cpICE9PSAtMSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGRlcHJlY2F0ZWRNZXNzYWdlcy5wdXNoKG1zZyk7XG4gICAgY29uc29sZS5lcnJvcihcIlttb2J4XSBEZXByZWNhdGVkOiBcIiArIG1zZyk7XG59XG5mdW5jdGlvbiBvbmNlKGZ1bmMpIHtcbiAgICB2YXIgaW52b2tlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpbnZva2VkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpbnZva2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7IH07XG5mdW5jdGlvbiB1bmlxdWUobGlzdCkge1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKHJlcy5pbmRleE9mKGl0ZW0pID09PSAtMSlcbiAgICAgICAgICAgIHJlcy5wdXNoKGl0ZW0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBqb2luU3RyaW5ncyh0aGluZ3MsIGxpbWl0LCBzZXBhcmF0b3IpIHtcbiAgICBpZiAobGltaXQgPT09IHZvaWQgMCkgeyBsaW1pdCA9IDEwMDsgfVxuICAgIGlmIChzZXBhcmF0b3IgPT09IHZvaWQgMCkgeyBzZXBhcmF0b3IgPSBcIiAtIFwiOyB9XG4gICAgaWYgKCF0aGluZ3MpXG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIHZhciBzbGljZWQgPSB0aGluZ3Muc2xpY2UoMCwgbGltaXQpO1xuICAgIHJldHVybiBcIlwiICsgc2xpY2VkLmpvaW4oc2VwYXJhdG9yKSArICh0aGluZ3MubGVuZ3RoID4gbGltaXQgPyBcIiAoLi4uIGFuZCBcIiArICh0aGluZ3MubGVuZ3RoIC0gbGltaXQpICsgXCJtb3JlKVwiIDogXCJcIik7XG59XG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSk7XG4gICAgcmV0dXJuIHByb3RvID09PSBPYmplY3QucHJvdG90eXBlIHx8IHByb3RvID09PSBudWxsO1xufVxuZnVuY3Rpb24gb2JqZWN0QXNzaWduKCkge1xuICAgIHZhciByZXMgPSBhcmd1bWVudHNbMF07XG4gICAgZm9yICh2YXIgaSA9IDEsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIHZhbHVlRGlkQ2hhbmdlKGNvbXBhcmVTdHJ1Y3R1cmFsLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICByZXR1cm4gY29tcGFyZVN0cnVjdHVyYWxcbiAgICAgICAgPyAhZGVlcEVxdWFscyhvbGRWYWx1ZSwgbmV3VmFsdWUpXG4gICAgICAgIDogb2xkVmFsdWUgIT09IG5ld1ZhbHVlO1xufVxudmFyIHByb3RvdHlwZUhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iamVjdCwgcHJvcE5hbWUpIHtcbiAgICByZXR1cm4gcHJvdG90eXBlSGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BOYW1lKTtcbn1cbmZ1bmN0aW9uIG1ha2VOb25FbnVtZXJhYmxlKG9iamVjdCwgcHJvcE5hbWVzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYWRkSGlkZGVuUHJvcChvYmplY3QsIHByb3BOYW1lc1tpXSwgb2JqZWN0W3Byb3BOYW1lc1tpXV0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZEhpZGRlblByb3Aob2JqZWN0LCBwcm9wTmFtZSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wTmFtZSwge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfSk7XG59XG5mdW5jdGlvbiBhZGRIaWRkZW5GaW5hbFByb3Aob2JqZWN0LCBwcm9wTmFtZSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wTmFtZSwge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaXNQcm9wZXJ0eUNvbmZpZ3VyYWJsZShvYmplY3QsIHByb3ApIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wKTtcbiAgICByZXR1cm4gIWRlc2NyaXB0b3IgfHwgKGRlc2NyaXB0b3IuY29uZmlndXJhYmxlICE9PSBmYWxzZSAmJiBkZXNjcmlwdG9yLndyaXRhYmxlICE9PSBmYWxzZSk7XG59XG5mdW5jdGlvbiBhc3NlcnRQcm9wZXJ0eUNvbmZpZ3VyYWJsZShvYmplY3QsIHByb3ApIHtcbiAgICBpbnZhcmlhbnQoaXNQcm9wZXJ0eUNvbmZpZ3VyYWJsZShvYmplY3QsIHByb3ApLCBcIkNhbm5vdCBtYWtlIHByb3BlcnR5ICdcIiArIHByb3AgKyBcIicgb2JzZXJ2YWJsZSwgaXQgaXMgbm90IGNvbmZpZ3VyYWJsZSBhbmQgd3JpdGFibGUgaW4gdGhlIHRhcmdldCBvYmplY3RcIik7XG59XG5mdW5jdGlvbiBnZXRFbnVtZXJhYmxlS2V5cyhvYmopIHtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgcmVzLnB1c2goa2V5KTtcbiAgICByZXR1cm4gcmVzO1xufVxuZnVuY3Rpb24gZGVlcEVxdWFscyhhLCBiKSB7XG4gICAgaWYgKGEgPT09IG51bGwgJiYgYiA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCAmJiBiID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIHZhciBhSXNBcnJheSA9IGlzQXJyYXlMaWtlKGEpO1xuICAgIGlmIChhSXNBcnJheSAhPT0gaXNBcnJheUxpa2UoYikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIGlmIChhSXNBcnJheSkge1xuICAgICAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSlcbiAgICAgICAgICAgIGlmICghZGVlcEVxdWFscyhhW2ldLCBiW2ldKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgYiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBpZiAoYSA9PT0gbnVsbCB8fCBiID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoZ2V0RW51bWVyYWJsZUtleXMoYSkubGVuZ3RoICE9PSBnZXRFbnVtZXJhYmxlS2V5cyhiKS5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gYSkge1xuICAgICAgICAgICAgaWYgKCEocHJvcCBpbiBiKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIWRlZXBFcXVhbHMoYVtwcm9wXSwgYltwcm9wXSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gYSA9PT0gYjtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUobmFtZSwgY2xhenopIHtcbiAgICB2YXIgcHJvcE5hbWUgPSBcImlzTW9iWFwiICsgbmFtZTtcbiAgICBjbGF6ei5wcm90b3R5cGVbcHJvcE5hbWVdID0gdHJ1ZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0KHgpICYmIHhbcHJvcE5hbWVdID09PSB0cnVlO1xuICAgIH07XG59XG5mdW5jdGlvbiBpc0FycmF5TGlrZSh4KSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoeCkgfHwgaXNPYnNlcnZhYmxlQXJyYXkoeCk7XG59XG5leHBvcnRzLmlzQXJyYXlMaWtlID0gaXNBcnJheUxpa2U7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmV0Y2hLZXlzID0gcmVxdWlyZSgnbG9kYXNoLmtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGFsbG93RXF1YWwob2JqQSwgb2JqQiwgY29tcGFyZSwgY29tcGFyZUNvbnRleHQpIHtcblxuICAgIHZhciByZXQgPSBjb21wYXJlID8gY29tcGFyZS5jYWxsKGNvbXBhcmVDb250ZXh0LCBvYmpBLCBvYmpCKSA6IHZvaWQgMDtcblxuICAgIGlmIChyZXQgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gISFyZXQ7XG4gICAgfVxuXG4gICAgaWYgKG9iakEgPT09IG9iakIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmpBICE9PSAnb2JqZWN0JyB8fCBvYmpBID09PSBudWxsIHx8IHR5cGVvZiBvYmpCICE9PSAnb2JqZWN0JyB8fCBvYmpCID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIga2V5c0EgPSBmZXRjaEtleXMob2JqQSk7XG4gICAgdmFyIGtleXNCID0gZmV0Y2hLZXlzKG9iakIpO1xuXG4gICAgdmFyIGxlbiA9IGtleXNBLmxlbmd0aDtcbiAgICBpZiAobGVuICE9PSBrZXlzQi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbXBhcmVDb250ZXh0ID0gY29tcGFyZUNvbnRleHQgfHwgbnVsbDtcblxuICAgIC8vIFRlc3QgZm9yIEEncyBrZXlzIGRpZmZlcmVudCBmcm9tIEIuXG4gICAgdmFyIGJIYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuYmluZChvYmpCKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzQVtpXTtcbiAgICAgICAgaWYgKCFiSGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2YWx1ZUEgPSBvYmpBW2tleV07XG4gICAgICAgIHZhciB2YWx1ZUIgPSBvYmpCW2tleV07XG5cbiAgICAgICAgdmFyIF9yZXQgPSBjb21wYXJlID8gY29tcGFyZS5jYWxsKGNvbXBhcmVDb250ZXh0LCB2YWx1ZUEsIHZhbHVlQiwga2V5KSA6IHZvaWQgMDtcbiAgICAgICAgaWYgKF9yZXQgPT09IGZhbHNlIHx8IF9yZXQgPT09IHZvaWQgMCAmJiB2YWx1ZUEgIT09IHZhbHVlQikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59OyJdfQ==
