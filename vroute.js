(function() {

	var win = window,
		doc = document,
		location = win.location;

	//工具函数
	var util = {
		getHref: function(node) {
			return 'href' in node ? node.getAttribute('href', 2) : node.getAttribute('href');
		},
		on: 'addEventListener' in win ?
			function(node, type, cb) {
				return node.addEventListener(type, cb);
			} : function(node, type, cb) {
				return node.attachEvent('on' + type, cb);
			},

		off: 'removeEventListener' in win ?
			function(node, type, cb) {
				return node.removeEventListener(type, cb);
			} : function(node, type, cb) {
				return node.detachEvent('on' + type, cb);
			},
		extend: function(target, source) {
			if (this.typeOf(source) == 'object'){
				for (var p in source) {
					if (source.hasOwnProperty(p)) {
						target[p] = source[p];
					}
				}
			}
			return target;
		},
		typeOf: function(o) {
			var o2str = ({}).toString;
			return o == null ? String(o) : o2str.call(o).slice(8, -1).toLowerCase();
		}
	};

	var routeMap = {};
	window.routeMap = routeMap; //调试用

	//处理路由事件，简单的用hashchange事件实现了一下
	var _hashChange = function(opt) {
		var hash = location.hash.replace(new RegExp('^#' + opt.prefix), '');
		if (typeof routeMap[hash] === 'function') {
			routeMap[hash]();
		}
	};

	function VRoute(options) {
		if (this instanceof VRoute === false) return new VRoute(options);
		var self = this;
		util.on(win, 'hashchange', function() {
			_hashChange(self.opt);
		});
	}
	VRoute.prototype.get = function(routeName, cb) {
		routeMap[routeName] = cb;
		return this;
	};
	VRoute.prototype.start = function(options) {
		this.opt = util.extend({
			prefix: '!?'
		}, options);
		_hashChange(this.opt);
	};

	window.VRoute = VRoute;
})();