/*The module create and html element canvas and wrap it in a div contain


Firefox error  on(about.config)
user must change the broswer to set 
gfx.crash-guard.status.glcontext = 0

*/

  var  JsCanvas =(function(tagOrIdOrElement){
		var __context =null;
		var __settings ={};
		//Create an initialised the html elements
       var createCanvas=(function(tagOrIdOrElement, options){       
          var canvas =null;
         if(typeof tagOrIdOrElement ==='string'){
	        var element = document.getElementById(tagOrIdOrElement);
	           	  	if(!element){
	           	  		element = document.createElement(tagOrIdOrElement);
	           	  	  if(!document.body)
	           	  	  	document.body=  document.createElement("body");
	           	  	    document.body.appendChild(element);
	           	  	}
           	 canvas = detectedView(element, options);

          }else{
          	canvas = detectedView(tagOrIdOrElement, options);
          }
          return canvas;
       });
       var detectedView =(function(element, options){
			if(element instanceof HTMLCanvasElement){
				var div = document.createElement("div");
				if(!div.classList.contains("canvas-container"))
					div.classList.add("canvas-container")
				var parent = element.parentNode;
				if(parent){
					parent.appendChild(div);
				}
				div.appendChild(element);
			     return  enable3d(element,options);
				}
			 else{
			   var canvas = document.createElement("canvas");
			   canvas.setAttribute("class", "opengl");
           	   element.appendChild(canvas);
           	   if(!element.classList.contains("canvas-container"))
					element.classList.add("canvas-container")
           	 return enable3d(canvas,options);
           	}
       })
      //enable opengl3d content
      var enable3d =(function(canvas, options){

      	if(canvas instanceof HTMLCanvasElement){      		
          try{
              __context = canvas.getContext("webgl", options.opengl) || canvas.getContext("experimental-webgl", options.opengl);
              if(__context){
              	__context.canvas = canvas;
              }
          }catch(e){
              console.warn(e.message);
          }
          return canvas;
      	}
      	
      });
      var initialiseSettings=(function(settings){
          if(settings){
          	__settings = settings;
          }
          if(!__settings.opengl)__settings.opengl={};
          if(!__settings.opengl.stencil)__settings.opengl.stencil=true;
          return __settings;
      })
      var setDefault =(function(){
      	if(!__context)return;
      	 __context.clearColor(0.0,0.0,0.0,0.8);
	      __context.clear( __context.COLOR_BUFFER_BIT |  __context.DEPTH_BUFFER_BIT);
	      if (__context.clearDepth)  __context.clearDepth(1.0); else __context.clearDepthf(1.0);
	      __context.viewport(0, 0, __context.canvas.width, __context.canvas.height);
      });
      //return modules
      return {
          "create":(function(settings){
           __settings ==  initialiseSettings(settings);           
            createCanvas(tagOrIdOrElement, __settings);
            setDefault();
            if(__context){
	             return __context;
             }
             return null;
          })         
      }
  });
