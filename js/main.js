(function() {
  var Main,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Main = (function() {
    function Main() {
      this._init = __bind(this._init, this);
      this._init();
      return;
    }

    Main.prototype._init = function() {
      console.log("bbb");
    };

    return Main;

  })();

  window.Main = Main;

}).call(this);

//# sourceMappingURL=main.js.map
