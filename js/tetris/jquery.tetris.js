/**
  Author: Tony Brix
  Website: tonybrix.info
*/
(function($){
  $.extend($.jCanvas.defaults, {
    fromCenter: false,
    cropFromCenter: false
  });
  $.jCanvas();
  if(!$.store)
  {
    $.store = {disabled: true};
  }
  else if(!$.store.disabled)
  {
    if(typeof($.store.get("level")) == "undefined")
    {
      $.store.set("level", 1);
    }
    if(typeof($.store.get("highscore1")) == "undefined")
    {
      $.store.set("highscore1", {level: 1, lines: 0,score: 0, name: "Anonymous"});
    }
    if(typeof($.store.get("highscore2")) == "undefined")
    {
      $.store.set("highscore2", {level: 1, lines: 0,score: 0, name: "Anonymous"});
    }
    if(typeof($.store.get("highscore3")) == "undefined")
    {
      $.store.set("highscore3", {level: 1, lines: 0,score: 0, name: "Anonymous"});
    }
  }
  $(function(){
    $("<div style='display:none;position:absolute;top:-1000px;left:-1000px'>"+
        "<img src='/tetris/images/sprite.png' alt=' ' />"+
      "</div>").appendTo("body");
  });
  var tetris = {
    _defaults: {
      level: ((!$.store.disabled)? $.store.get("level") : 1)
    },
    _render: function(){
      $this = this;
      var data = $this.data("tetris");
      for(var i = 0; i < 18; i++)
      {
        for(var j = 0; j < 10; j++)
        {
          if(data.oldBoard[i][j] != data.newBoard[i][j])
          {
            $this.drawImage({
              source: "/tetris/images/sprite.png",
              x: (j * 27) + 5,
              y: (i * 27) + 5,
              sx: data.newBoard[i][j] * 27,
              sy: 0,
              sWidth: 27,
              sHeight: 27
            });
            data.newBoard[i][j] = data.oldBoard[i][j];
          }
        }
      }
    },
    _block1: function(x, y){
    // **** 336,69
      $this = this;
      $this.drawImage({
        source: "/tetris/images/sprite.png",
        x: x,
        y: y + 13,
        sx: 27,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 27,
        y: y + 13,
        sx: 27,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 54,
        y: y + 13,
        sx: 27,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 81,
        y: y + 13,
        sx: 27,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      });
    },
    _block2: function(x, y){
    //**
    //**
      $this = this;
      $this.drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 27,
        y: y,
        sx: 54,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 54,
        y: y,
        sx: 54,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 27,
        y: y + 27,
        sx: 54,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 54,
        y: y + 27,
        sx: 54,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      });
    },
    _block3: function(x, y){
    //***
    // *
      $this = this;
      $this.drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 13,
        y: y,
        sx: 81,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 40,
        y: y,
        sx: 81,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 67,
        y: y,
        sx: 81,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 40,
        y: y + 27,
        sx: 81,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      });
    },
    _block4: function(x, y){
    //***
    //  *
      $this = this;
      $this.drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 13,
        y: y,
        sx: 108,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 40,
        y: y,
        sx: 108,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 67,
        y: y,
        sx: 108,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 67,
        y: y + 27,
        sx: 108,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      });
    },
    _block5: function(x, y){
    //***
    //*
      $this = this;
      $this.drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 13,
        y: y,
        sx: 135,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 40,
        y: y,
        sx: 135,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 67,
        y: y,
        sx: 135,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 13,
        y: y + 27,
        sx: 135,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      });
    },
    _block6: function(x, y){
    // **
    //**
      $this = this;
      $this.drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 40,
        y: y,
        sx: 162,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 67,
        y: y,
        sx: 162,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 13,
        y: y + 27,
        sx: 162,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 40,
        y: y + 27,
        sx: 162,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      });
    },
    _block7: function(x, y){
    //**
    // **
      $this = this;
      $this.drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 13,
        y: y,
        sx: 189,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 40,
        y: y,
        sx: 189,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 40,
        y: y + 27,
        sx: 189,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      })
      .drawImage({
        source: "/tetris/images/sprite.png",
        x: x + 67,
        y: y + 27,
        sx: 189,
        sy: 0,
        sWidth: 27,
        sHeight: 27
      });
    },
    init: function(options){
      return this.each(function(){
        var $this = $(this);
        if($this.data("tetris"))
        {
          throw("Already initialized");
        }
        var data = $.extend(tetris._defaults, options);
        tetris._id = this.id;
        $this.data("tetris", data)
        .keydown(function(e){
          e.preventDefault();
          var $this = $(this);
          var data = $this.data("tetris");
          switch(e.which)
          {
            case 37:
              console.log("move left");
              break;
            case 38:
            case 88:
              console.log("rotate right");
              break;
            case 39:
              console.log("move right");
              break;
            case 40:
              console.log("move down");
              break;
            case 90:
              console.log("rotate left");
              break;
            case 80:
              console.log("pause");
              break;
            case 17:
            case 32:
              console.log("move to bottom");
              break;
            default:
              console.log(e.which);
          }
        })
        .bind("contextmenu",function(e){return false;});
        tetris.reset.call($this);
      });
    },
    destroy: function(){
      return this.each(function(){
        $(this).clearCanvas().unbind().removeData("tetris");
      });
    },
    reset: function()
    {
      return this.each(function(){
        var $this = $(this);
        var data = $this.data("tetris");
        if(!data)
        {
          throw("Not initialized");
        }
        $this.attr({width: "500px", height: "496px"})
        .css({width: "500px", height: "496px"})
        .clearCanvas()
        .drawImage({
          source: "/tetris/images/background.png",
          x: 0,
          y: 0,
          load: function(){
            $(this).drawText({
              fillStyle: "#000",
              x: 310,
              y: 182,
              font: "24pt Verdana, sans-serif",
              text: "Level 0"
            })
            .drawText({
              fillStyle: "#000",
              x: 310,
              y: 230,
              font: "24pt Verdana, sans-serif",
              text: "Score 0"
            })
            .drawText({
              fillStyle: "#000",
              x: 310,
              y: 280,
              font: "24pt Verdana, sans-serif",
              text: "Lines 0"
            });
          }
        });
        data.oldBoard = data.newBoard = new Array(18);
        for(var i = 0; i < 18; i++)
        {
          data.oldBoard[i] = data.newBoard[i] = new Array(10);
          for(var j = 0; j < 10; j++)
          {
            data.oldBoard[i][j] = data.newBoard[i][j] = 0;
          }
        }
        ////show "play now" screen
      });
    },
    setOptions: function(options)
    {
      return this.each(function()
      {
        var $this = $(this);
        var data = $this.data("tetris");
        if(!data)
        {
          throw("Not initialized");
        }
        data = $.extend(data, options);
      });
    },
    getData: function(){
      return this.data("tetris");
    }
  };
  
  $.fn.tetris = function(options){
    if(this.get(0).tagName.toLowerCase() != "canvas")
    {
      throw("Must be a CANVAS element.");
    }
    if(typeof(options) == "object" || typeof(options) == "undefined")
    {
      return tetris.init.call(this,  options);
    }
    else if(typeof(options) == "string" && options.substring(0, 1) != "_" && tetris[options])
    {
      return tetris[options].apply(this, Array.prototype.slice.call( arguments, 1 ));
    }
    else
    {
      throw("Invalid arguments")
    }
  };
})(jQuery);