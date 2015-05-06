/*********************************
Author: Tony Brix
Website: tonybrix.info

settings:
  time: milliseconds between letters. Can be a number or a function that returns a number
  text: string
  autoStart: true/false
  byLine: true = write 1 line at a time, false = write 1 character at a time
  onFinished: a function to execute on finish. It is passed 1 boolean argument. true = .spellOut("finish") called
  onStep: a function to execute after every step
methods:
  start:
  pause:
  finish:
  destroy:
  reset:
  isPaused:
  isFinished:
  isRunning:
  writesLeft:
**************************************/
(function($){
  var spellOut = {
    init: function(options){
      return this.each(function(){
        var $this = $(this);
        if($this.data("spellOut"))
        {
          throw("Already initialized");
        }
        var settings = $.extend({
          time: 50,
          text: null,
          autoStart: false,
          byLine: false,
          onFinished: $.noop,
          onStep: $.noop
        }, options);
        try{
          settings.time = parseInt(settings.time);
        }catch(e){}
        settings.append = (settings.text != null);
        if(settings.text == null)
        {
          settings.text = $this.text()
          $this.text("");
        }
        settings.timeout = null;
        settings.inittext = settings.text;
        settings.divtext = $this.text();
        $this.data("spellOut", settings);
        if(settings.autoStart)
        {
          spellOut._writeNext.call($this);
        }
      });
    },
    pause: function(){
      return this.each(function(){
        var $this = $(this);
        var data = $this.data("spellOut");
        if(!data)
        {
          throw("spellOut not initialized");
        }
        else if(data.timeout !== null)
        {
          clearTimeout(data.timeout);
          data.timeout = null;
          $this.data("spellOut", data);
        }
        else if(data.text == null)
        {
          throw("spellOut is finished");
        }
        else
        {
          throw("spellOut already paused");
        }
      });
    },
    finish: function(){
      return this.each(function(){
        var $this = $(this);
        var data = $this.data("spellOut");
        if(!data)
        {
          throw("spellOut not initialized");
        }
        else if(data.text == null)
        {
          throw("spellOut already finished");
        }
        else
        {
          clearTimeout(data.timeout);
          data.timeout = null;
          $this.text($this.text() + data.text);
          data.text = null;
          $this.data("spellOut", data);
          data.onFinished.call($this, true);
        }
      });
    },
    start: function(){
      return this.each(function(){
        var $this = $(this);
        var data = $this.data("spellOut");
        if(!data)
        {
          throw("spellOut not initialized");
        }
        else if(data.timeout != null)
        {
          throw("spellOut already started");
        }
        else if(data.text == null)
        {
          $this.text(data.divtext);
          data.text = data.inittext;
          $this.data("spellOut", data);
        }
        spellOut._writeNext.call($this);
      });
    },
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        var data = $this.data("spellOut");
        if(!data)
        {
          throw("spellOut not initialized");
        }
        /*else if(!data.append)
        {
          $this.text(data.inittext);
        }
        else
        {
          $this.text(data.divtext);
        }*/
        clearTimeout(data.timeout);
        $this.removeData("spellOut");
      });
    },
    reset: function(){
      return this.each(function(){
        var $this = $(this);
        var data = $this.data("spellOut");
        if(!data)
        {
          throw("spellOut not initialized");
        }
        clearTimeout(data.timeout);
        $this.text(data.divtext);
        data.timeout = null;
        data.text = data.inittext;
        $this.data("spellOut", data);
      });
    },
    isPaused: function(){
      var data = this.data("spellOut");
      if(!data)
      {
        throw("spellOut not initialized");
      }
      else if(data.timeout == null && data.text != null)
      {
        return true;
      }
      else
      {
        return false;
      }
    },
    isFinished: function(){
      var data = this.data("spellOut");
      if(!data)
      {
        throw("spellOut not initialized");
      }
      else if(data.timeout == null && data.text == null)
      {
        return true;
      }
      else
      {
        return false;
      }
    },
    isRunning: function(){
      var data = this.data("spellOut");
      if(!data)
      {
        throw("spellOut not initialized");
      }
      else if(data.timeout != null)
      {
        return true;
      }
      else
      {
        return false;
      }
    },
    writesLeft: function(){
      var data = this.data("spellOut");
      if(!data)
      {
        throw("spellOut not initialized");
      }
      else if(data.text != null)
      {
        if(data.byLine)
        {
          return data.text.split("\n").length;
        }
        else
        {
          return data.text.length;
        }
      }
      else
      {
        return 0;
      }
    },
    
    _writeNext: function(){
      var $this = $(this);
      var data = $this.data("spellOut");
      if(data.byLine)
      {
        var newLinePos = data.text.indexOf("\n") + 1;
        if(newLinePos == 0)
        {
          $this.html($this.html() + data.text);
          data.text = null;
          data.timeout = null;
          data.onStep.call($this);
          data.onFinished.call($this, false);
          return;
        }
        else
        {
          $this.html($this.html() + data.text.substring(0, newLinePos));
          data.text = data.text.substring(newLinePos);
        }
      }
      else
      {
        $this.html($this.html() + data.text.substring(0, 1));
        if(data.text.length == 1)
        {
          data.text = null;
          data.timeout = null;
          data.onStep.call($this);
          data.onFinished.call($this, false);
          return;
        }
        else
        {
          data.text = data.text.substring(1);
        }
      }
      if(typeof(data.time) == "function")
      {
        data.timeout = setTimeout(function(){spellOut._writeNext.call($this)}, data.time.call($this));
      }
      else
      {
        data.timeout = setTimeout(function(){spellOut._writeNext.call($this)}, data.time);
      }
      $this.data('spellOut', data);
      data.onStep.call($this);
    }
  };
  $.fn.spellOut = function(options){
    if(typeof(options) == "object" || typeof(options) == "undefined")
    {
      return spellOut.init.call(this,  options);
    }
    else if(typeof(options) == "string" && options.substring(0, 1) != "_" && spellOut[options])
    {
      return spellOut[options].apply(this, Array.prototype.slice.call( arguments, 1 ));
    }
    else
    {
      throw("Invalid arguments")
    }
  };
})(jQuery);