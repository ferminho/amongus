
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_DATABUFFER_IMPLEMENTED="1";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CD="";
CFG_CONFIG="debug";
CFG_HOST="winnt";
CFG_HTML5_WEBAUDIO_ENABLED="1";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MODPATH="";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_DEPTH_BUFFER_ENABLED="1";
CFG_OPENGL_GLES20_ENABLED="1";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.glsl;*.txt|*.xml|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[character.png];type=image/png;width=512;height=10;\n[misc.png];type=image/png;width=512;height=8;\n[press_space.png];type=image/png;width=53;height=8;\n[test.png];type=image/png;width=8;height=8;\n[tileset.png];type=image/png;width=512;height=8;\n[title.png];type=image/png;width=64;height=64;\n[mojo_font.png];type=image/png;width=864;height=13;\n[mojo2_font.png];type=image/png;width=960;height=16;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript Monkey runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Monkey Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function debugLog( str ){
	if( window.console!=undefined ) window.console.log( str );
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Monkey Exception"; 
}


function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBDisplayMode( width,height ){
	this.width=width;
	this.height=height;
}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "monkeystate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "monkeystate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.GetDeviceWidth=function(){
	return 0;
}

BBGame.prototype.GetDeviceHeight=function(){
	return 0;
}

BBGame.prototype.SetDeviceWindow=function( width,height,flags ){
}

BBGame.prototype.GetDisplayModes=function(){
	return new Array();
}

BBGame.prototype.GetDesktopMode=function(){
	return null;
}

BBGame.prototype.SetSwapInterval=function( interval ){
}

BBGame.prototype.PathToFilePath=function( path ){
	return "";
}

//***** js Game *****

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Monkey Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}


var webglGraphicsSeq=1;

function BBHtml5Game( canvas ){

	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){

		//can't get these to fire!
		canvas.addEventListener( "webglcontextlost",function( event ){
			event.preventDefault();
//			print( "WebGL context lost!" );
		},false );

		canvas.addEventListener( "webglcontextrestored",function( event ){
			++webglGraphicsSeq;
//			print( "WebGL context restored!" );
		},false );

		var attrs={ alpha:false };
	
		this._gl=this._canvas.getContext( "webgl",attrs );

		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl",attrs );
		
		if( !this._gl ) this.Die( "Can't create WebGL" );
		
		gl=this._gl;
	}
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;
	if( this._suspended ) return;
	
	var game=this;
	var seq=game._timerSeq;
	
	var maxUpdates=4;
	var updateRate=this._updateRate;
	
	if( !updateRate ){

		var reqAnimFrame=(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
	
		if( reqAnimFrame ){
			function animate(){
				if( seq!=game._timerSeq ) return;
	
				game.UpdateGame();
				if( seq!=game._timerSeq ) return;
	
				reqAnimFrame( animate );
				game.RenderGame();
			}
			reqAnimFrame( animate );
			return;
		}
		
		maxUpdates=1;
		updateRate=60;
	}
	
	var updatePeriod=1000.0/updateRate;
	var nextUpdate=0;

	function timeElapsed(){
		if( seq!=game._timerSeq ) return;
		
		if( !nextUpdate ) nextUpdate=Date.now();
		
		for( var i=0;i<maxUpdates;++i ){
		
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			nextUpdate+=updatePeriod;
			var delay=nextUpdate-Date.now();
			
			if( delay>0 ){
				setTimeout( timeElapsed,delay );
				game.RenderGame();
				return;
			}
		}
		nextUpdate=0;
		setTimeout( timeElapsed,0 );
		game.RenderGame();
	}

	setTimeout( timeElapsed,0 );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "monkey://data/" )!=0 ) return "";
	path=path.slice(14);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "monkey:" )!=0 ){
		return path;
	}else if( path.indexOf( "monkey://data/" )==0 ) {
		return "data/"+path.slice( 14 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

BBHtml5Game.prototype.GetDeviceWidth=function(){
	return this._canvas.width;
}

BBHtml5Game.prototype.GetDeviceHeight=function(){
	return this._canvas.height;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	BBGame.prototype.RenderGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var xscale=1;
	var yscale=1;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}
	
	canvas.onclick=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		eatEvent( e );
		return;
	}
	
	canvas.oncontextmenu=function( e ){
		return false;
	}
	
	canvas.ontouchstart=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}
	}
	
	canvas.onblur=function( e ){
		for( var i=0;i<256;++i ) game.KeyEvent( BBGameEvent.KeyUp,i );
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}
	
	canvas.updateSize=function(){
		xscale=canvas.width/canvas.clientWidth;
		yscale=canvas.height/canvas.clientHeight;
		game.RenderGame();
	}
	
	canvas.updateSize();
	
	canvas.focus();
	
	game.StartGame();

	game.RenderGame();
}


function BBMonkeyGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBMonkeyGame.prototype=extend_class( BBHtml5Game );

BBMonkeyGame.Main=function( canvas ){

	var game=new BBMonkeyGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}


// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

// ***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	game.IncLoading();

	var image=new Image();
	image.onload=function(){ game.DecLoading(); }
	image.onerror=function(){ game.DecLoading(); }
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;	
	this.gc.globalAlpha=this.alpha;	
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<2 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawPoly2=function( verts,surface,srx,srcy ){
	if( verts.length<4 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=4;i<verts.length;i+=4 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

// ***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

// ***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
}

if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

//print( "Using WebAudio!" );

// ***** WebAudio *****

var wa=null;

// ***** WebAudio gxtkSample *****

var gxtkSample=function(){
	this.waBuffer=null;
	this.state=0;
}

gxtkSample.prototype.Load=function( path ){
	if( this.state ) return false;

	var req=new XMLHttpRequest();
	
	req.open( "get",BBGame.Game().PathToUrl( path ),true );
	req.responseType="arraybuffer";
	
	var abuf=this;
	
	req.onload=function(){
		wa.decodeAudioData( req.response,function( buffer ){
			//success!
			abuf.waBuffer=buffer;
			abuf.state=1;
		},function(){
			abuf.state=-1;
		} );
	}
	
	req.onerror=function(){
		abuf.state=-1;
	}
	
	req.send();
	
	this.state=2;
			
	return true;
}

gxtkSample.prototype.Discard=function(){
}

// ***** WebAudio gxtkChannel *****

var gxtkChannel=function(){
	this.buffer=null;
	this.flags=0;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.waSource=null;
	this.waPan=wa.create
	this.waGain=wa.createGain();
	this.waGain.connect( wa.destination );
	this.waPanner=wa.createPanner();
	this.waPanner.rolloffFactor=0;
	this.waPanner.panningModel="equalpower";
	this.waPanner.connect( this.waGain );
	this.startTime=0;
	this.offset=0;
	this.state=0;
}

// ***** WebAudio gxtkAudio *****

var gxtkAudio=function(){

	if( !wa ){
		window.AudioContext=window.AudioContext || window.webkitAudioContext;
		wa=new AudioContext();
	}
	
	this.okay=true;
	this.music=null;
	this.musicState=0;
	this.musicVolume=1;
	this.channels=new Array();
	for( var i=0;i<32;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.Suspend=function(){
	if( this.MusicState()==1 ) this.music.pause();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=1 ) continue;
		this.PauseChannel( i );
		chan.state=5;
	}
}

gxtkAudio.prototype.Resume=function(){
	if( this.MusicState()==1 ) this.music.play();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=5 ) continue;
		chan.state=2;
		this.ResumeChannel( i );
	}
}

gxtkAudio.prototype.LoadSample=function( path ){

	var sample=new gxtkSample();
	if( !sample.Load( BBHtml5Game.Html5Game().PathToUrl( path ) ) ) return null;
	
	return sample;
}

gxtkAudio.prototype.PlaySample=function( buffer,channel,flags ){

	if( buffer.state!=1 ) return;

	var chan=this.channels[channel];
	
	if( chan.state ){
		chan.waSource.onended=null
		chan.waSource.stop( 0 );
	}
	
	chan.buffer=buffer;
	chan.flags=flags;

	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}

	chan.offset=0;	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0 );

	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){

	var chan=this.channels[channel];
	if( !chan.state ) return;
	
	if( chan.state==1 ){
		chan.waSource.onended=null;
		chan.waSource.stop( 0 );
		chan.waSource=null;
	}

	chan.state=0;
}

gxtkAudio.prototype.PauseChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=1 ) return;
	
	chan.offset=(chan.offset+(wa.currentTime-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
	
	chan.waSource.onended=null;
	chan.waSource.stop( 0 );
	chan.waSource=null;
	
	chan.state=2;
}

gxtkAudio.prototype.ResumeChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=2 ) return;
	
	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=chan.buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(chan.flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}
	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0,chan.offset );

	chan.state=1;
}

gxtkAudio.prototype.ChannelState=function( channel ){
	return this.channels[channel].state & 3;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];

	chan.volume=volume;
	
	chan.waGain.gain.value=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];

	chan.pan=pan;
	
	var sin=Math.sin( pan*3.14159265359/2 );
	var cos=Math.cos( pan*3.14159265359/2 );
	
	chan.waPanner.setPosition( sin,0,-cos );
}

gxtkAudio.prototype.SetRate=function( channel,rate ){

	var chan=this.channels[channel];

	if( chan.state==1 ){
		//update offset for pause/resume
		var time=wa.currentTime;
		chan.offset=(chan.offset+(time-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
		chan.startTime=time;
	}

	chan.rate=rate;
	
	if( chan.waSource ) chan.waSource.playbackRate.value=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	if( this.musicState ) this.music.pause();
	this.music=new Audio( BBGame.Game().PathToUrl( path ) );
	this.music.loop=(flags&1)!=0;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.StopMusic=function(){
	if( !this.musicState ) return;
	this.music.pause();
	this.music=null;
	this.musicState=0;
}

gxtkAudio.prototype.PauseMusic=function(){
	if( this.musicState!=1 ) return;
	this.music.pause();
	this.musicState=2;
}

gxtkAudio.prototype.ResumeMusic=function(){
	if( this.musicState!=2 ) return;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.MusicState=function(){
	if( this.musicState==1 && this.music.ended && !this.music.loop ){
		this.music=null;
		this.musicState=0;
	}
	return this.musicState;
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.musicVolume=volume;
	if( this.musicState ) this.music.volume=volume;
}

}else{

//print( "Using OldAudio!" );

// ***** gxtkChannel class *****

var gxtkChannel=function(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

// ***** gxtkAudio class *****

var gxtkAudio=function(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
		if( !this.okay ) this.channels[i].state=-1;
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ){
			if( chan.audio.ended && !chan.audio.loop ){
				chan.state=0;
			}else{
				chan.audio.pause();
				chan.state=3;
			}
		}
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==3 ){
			chan.audio.play();
			chan.state=1;
		}
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return null;

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];

	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;

	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	if( chan.state==3 ) return 1;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state>0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

// ***** gxtkSample class *****

//function gxtkSample( audio ){
var gxtkSample=function( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
//			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
//				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

}


function BBThread(){
	this.result=null;
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.result=null;
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Result=function(){
	return this.result;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}


function BBDataBuffer(){
	this.arrayBuffer=null;
	this.length=0;
}

BBDataBuffer.tbuf=new ArrayBuffer(4);
BBDataBuffer.tbytes=new Int8Array( BBDataBuffer.tbuf );
BBDataBuffer.tshorts=new Int16Array( BBDataBuffer.tbuf );
BBDataBuffer.tints=new Int32Array( BBDataBuffer.tbuf );
BBDataBuffer.tfloats=new Float32Array( BBDataBuffer.tbuf );

BBDataBuffer.prototype._Init=function( buffer ){
	this.arrayBuffer=buffer;
	this.length=buffer.byteLength;
	this.bytes=new Int8Array( buffer );	
	this.shorts=new Int16Array( buffer,0,this.length/2 );	
	this.ints=new Int32Array( buffer,0,this.length/4 );	
	this.floats=new Float32Array( buffer,0,this.length/4 );
}

BBDataBuffer.prototype._New=function( length ){
	if( this.arrayBuffer ) return false;
	
	var buf=new ArrayBuffer( length );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._Load=function( path ){
	if( this.arrayBuffer ) return false;
	
	var buf=BBGame.Game().LoadData( path );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._LoadAsync=function( path,thread ){

	var buf=this;
	
	var xhr=new XMLHttpRequest();
	xhr.open( "GET",BBGame.Game().PathToUrl( path ),true );
	xhr.responseType="arraybuffer";
	
	xhr.onload=function(e){
		if( this.status==200 || this.status==0 ){
			buf._Init( xhr.response );
			thread.result=buf;
		}
		thread.running=false;
	}
	
	xhr.onerror=function(e){
		thread.running=false;
	}
	
	xhr.send();
}


BBDataBuffer.prototype.GetArrayBuffer=function(){
	return this.arrayBuffer;
}

BBDataBuffer.prototype.Length=function(){
	return this.length;
}

BBDataBuffer.prototype.Discard=function(){
	if( this.arrayBuffer ){
		this.arrayBuffer=null;
		this.length=0;
	}
}

BBDataBuffer.prototype.PokeByte=function( addr,value ){
	this.bytes[addr]=value;
}

BBDataBuffer.prototype.PokeShort=function( addr,value ){
	if( addr&1 ){
		BBDataBuffer.tshorts[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		return;
	}
	this.shorts[addr>>1]=value;
}

BBDataBuffer.prototype.PokeInt=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tints[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.ints[addr>>2]=value;
}

BBDataBuffer.prototype.PokeFloat=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tfloats[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.floats[addr>>2]=value;
}

BBDataBuffer.prototype.PeekByte=function( addr ){
	return this.bytes[addr];
}

BBDataBuffer.prototype.PeekShort=function( addr ){
	if( addr&1 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		return BBDataBuffer.tshorts[0];
	}
	return this.shorts[addr>>1];
}

BBDataBuffer.prototype.PeekInt=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tints[0];
	}
	return this.ints[addr>>2];
}

BBDataBuffer.prototype.PeekFloat=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tfloats[0];
	}
	return this.floats[addr>>2];
}


var bb_texs_loading=0;

function BBLoadStaticTexImage( path,info ){

	var game=BBHtml5Game.Html5Game();

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	if( info.length>0 ) info[0]=parseInt( game.GetMetaData( path,"width" ) );
	if( info.length>1 ) info[1]=parseInt( game.GetMetaData( path,"height" ) );
	
	var img=new Image();
	img.src=game.PathToUrl( path );
	
	return img;
}

function BBTextureLoading( tex ){
	return tex && tex._loading;
}

function BBTexturesLoading(){
	return bb_texs_loading;
}

function _glGenerateMipmap( target ){

	var tex=gl.getParameter( gl.TEXTURE_BINDING_2D );
	
	if( tex && tex._loading ){
		tex._genmipmap=true;
	}else{
		gl.generateMipmap( target );
	}
}

function _glBindTexture( target,tex ){

	gl.bindTexture( target,tex );
}

function _glTexImage2D( target,level,internalformat,width,height,border,format,type,pixels ){

	gl.texImage2D( target,level,internalformat,width,height,border,format,type,pixels ? new Uint8Array(pixels.arrayBuffer) : null );
}

function _glTexImage2D2( target,level,internalformat,format,type,img ){

	if( img.complete ){
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true );	
		gl.texImage2D( target,level,internalformat,format,type,img );
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false );	
		return;
	}
	
	var tex=gl.getParameter( gl.TEXTURE_BINDING_2D );
	if( 	tex._loading ){
		tex._loading+=1;
	}else{
		tex._loading=1;
	}

	bb_texs_loading+=1;
	
	var onload=function(){
	
		var tmp=gl.getParameter( gl.TEXTURE_BINDING_2D );
		gl.bindTexture( target,tex );
		
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true );	
		gl.texImage2D( target,level,internalformat,format,type,img );
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false );	

		if( tex._genmipmap && tex._loading==1 ){
			gl.generateMipmap( target );
			tex._genmipmap=false;
		}
		gl.bindTexture( target,tmp );
		
		img.removeEventListener( "load",onload );
		tex._loading-=1;
		
		bb_texs_loading-=1;
	}
	
	img.addEventListener( "load",onload );
}

function _glTexImage2D3( target,level,internalformat,format,type,path ){

	var game=BBHtml5Game.Html5Game();

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	var img=new Image();
	img.src=game.PathToUrl( path );
	
	_glTexImage2D2( target,level,internalformat,format,type,img );
}

function _glTexSubImage2D( target,level,xoffset,yoffset,width,height,format,type,data,dataOffset ){

	gl.texSubImage2D( target,level,xoffset,yoffset,width,height,format,type,new Uint8Array( data.arrayBuffer,dataOffset ) );
	
}

function _glTexSubImage2D2( target,level,xoffset,yoffset,format,type,img ){

	if( img.complete ){
		gl.texSubImage2D( target,level,xoffset,yoffset,format,type,img );
		return;
	}
	
	var tex=gl.getParameter( gl.TEXTURE_BINDING_2D );
	if( 	tex._loading>0 ){
		tex._loading+=1;
	}else{
		tex._loading=1;
	}
	
	bb_texs_loading+=1;

	var onload=function(){
	
		var tmp=gl.getParameter( gl.TEXTURE_BINDING_2D );
		gl.bindTexture( target,tex );

		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true );	
		gl.texSubImage2D( target,level,xoffset,yoffset,format,type,img );
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false );

		if( tex._genmipmap && tex._loading==1 ){
			gl.generateMipmap( target );
			tex._genmipmap=false;
		}
		gl.bindTexture( target,tmp );
		
		img.removeEventListener( "load",onload );
		tex._loading-=1;
		
		bb_texs_loading-=1;
	}
	
	img.addEventListener( "load",onload );
}

function _glTexSubImage2D3( target,level,xoffset,yoffset,format,type,path ){

	var game=BBHtml5Game.Html5Game();

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	var img=new Image();
	img.src=game.PathToUrl( path );
	
	_glTexSubImage2D2( target,level,xoffset,yoffset,format,type,img );
}

// Dodgy code to convert 'any' to i,f,iv,fv...
//
function _mkf( p ){
	if( typeof(p)=="boolean" ) return p?1.0:0.0;
	if( typeof(p)=="number" ) return p;
	return 0.0;
}

function _mki( p ){
	if( typeof(p)=="boolean" ) return p?1:0;
	if( typeof(p)=="number" ) return p|0;
	if( typeof(p)=="object" ) return p;
	return 0;
}

function _mkb( p ){
	if( typeof(p)=="boolean" ) return p;
	if( typeof(p)=="number" ) return p!=0;
	return false;
}

function _mkfv( p,params ){
	if( !params || !params.length ) return;
	if( (p instanceof Array) || (p instanceof Int32Array) || (p instanceof Float32Array) ){
		var n=Math.min( params.length,p.length );
		for( var i=0;i<n;++i ){
			params[i]=_mkf(p[i]);
		}
	}else{
		params[0]=_mkf(p);
	}
}

function _mkiv( p,params ){
	if( !params || !params.length ) return;
	if( (p instanceof Array) || (p instanceof Int32Array) || (p instanceof Float32Array) ){
		var n=Math.min( params.length,p.length );
		for( var i=0;i<n;++i ){
			params[i]=_mki(p[i]);
		}
	}else{
		params[0]=_mki(p);
	}
}

function _mkbv( p,params ){
	if( !params || !params.length ) return;
	if( (p instanceof Array) || (p instanceof Int32Array) || (p instanceof Float32Array) ){
		var n=Math.min( params.length,p.length );
		for( var i=0;i<n;++i ){
			params[i]=_mkb(p[i]);
		}
	}else{
		params[0]=_mkb(p);
	}
}

function _glBufferData( target,size,data,usage ){
	if( !data ){
		gl.bufferData( target,size,usage );
	}else if( size==data.size ){
		gl.bufferData( target,data.arrayBuffer,usage );
	}else{
		gl.bufferData( target,new Int8Array( data.arrayBuffer,0,size ),usage );
	}
}

function _glBufferSubData( target,offset,size,data,dataOffset ){
	if( size==data.size && dataOffset==0 ){
		gl.bufferSubData( target,offset,data.arrayBuffer );
	}else{
		gl.bufferSubData( target,offset,new Int8Array( data.arrayBuffer,dataOffset,size ) );
	}
}


function _glClearDepthf( depth ){
	gl.clearDepth( depth );
}

function _glDepthRange( zNear,zFar ){
	gl.depthRange( zNear,zFar );
}

function _glGetActiveAttrib( program,index,size,type,name ){
	var info=gl.getActiveAttrib( program,index );
	if( size && size.length ) size[0]=info.size;
	if( type && type.length ) type[0]=info.type;
	if( name && name.length ) name[0]=info.name;
}

function _glGetActiveUniform( program,index,size,type,name ){
	var info=gl.getActiveUniform( program,index );
	if( size && size.length ) size[0]=info.size;
	if( type && type.length ) type[0]=info.type;
	if( name && name.length ) name[0]=info.name;
}

function _glGetAttachedShaders( program, maxcount, count, shaders ){
	var t=gl.getAttachedShaders();
	if( count && count.length ) count[0]=t.length;
	if( shaders ){
		var n=t.length;
		if( maxcount<n ) n=maxcount;
		if( shaders.length<n ) n=shaders.length;
		for( var i=0;i<n;++i ) shaders[i]=t[i];
	}
}

function _glGetBooleanv( pname,params ){
	_mkbv( gl.getParameter( pname ),params );
}

function _glGetBufferParameteriv( target, pname, params ){
	_mkiv( gl.glGetBufferParameter( target,pname ),params );
}

function _glGetFloatv( pname,params ){
	_mkfv( gl.getParameter( pname ),params );
}

function _glGetFramebufferAttachmentParameteriv( target, attachment, pname, params ){
	_mkiv( gl.getFrameBufferAttachmentParameter( target,attachment,pname ),params );
}

function _glGetIntegerv( pname, params ){
	_mkiv( gl.getParameter( pname ),params );
}

function _glGetProgramiv( program, pname, params ){
	_mkiv( gl.getProgramParameter( program,pname ),params );
}

function _glGetRenderbufferParameteriv( target, pname, params ){
	_mkiv( gl.getRenderbufferParameter( target,pname ),params );
}

function _glGetShaderiv( shader, pname, params ){
	_mkiv( gl.getShaderParameter( shader,pname ),params );
}

function _glGetString( pname ){
	var p=gl.getParameter( pname );
	if( typeof(p)=="string" ) return p;
	return "";
}

function _glGetTexParameterfv( target, pname, params ){
	_mkfv( gl.getTexParameter( target,pname ),params );
}

function _glGetTexParameteriv( target, pname, params ){
	_mkiv( gl.getTexParameter( target,pname ),params );
}

function _glGetUniformfv( program, location, params ){
	_mkfv( gl.getUniform( program,location ),params );
}

function _glGetUniformiv( program, location, params ){
	_mkiv( gl.getUniform( program,location ),params );
}

function _glGetUniformLocation( program, name ){
	var l=gl.getUniformLocation( program,name );
	if( l ) return l;
	return -1;
}

function _glGetVertexAttribfv( index, pname, params ){
	_mkfv( gl.getVertexAttrib( index,pname ),params );
}

function _glGetVertexAttribiv( index, pname, params ){
	_mkiv( gl.getVertexAttrib( index,pname ),params );
}

function _glReadPixels( x,y,width,height,format,type,data,dataOffset ){
	gl.readPixels( x,y,width,height,format,type,new Uint8Array( data.arrayBuffer,dataOffset,data.length-dataOffset ) );
}

function _glBindBuffer( target,buffer ){
	if( buffer ){
		gl.bindBuffer( target,buffer );
	}else{
		gl.bindBuffer( target,null );
	}
}

function _glBindFramebuffer( target,framebuffer ){
	if( framebuffer ){
		gl.bindFramebuffer( target,framebuffer );
	}else{
		gl.bindFramebuffer( target,null );
	}
}

function _glBindRenderbuffer( target,renderbuffer ){
	if( renderbuffer ){
		gl.bindRenderbuffer( target,renderbuffer );
	}else{
		gl.bindRenderbuffer( target,null );
	}
}

function _glUniform1fv( location, count, v ){
	if( v.length==count ){
		gl.uniform1fv( location,v );
	}else{
		gl.uniform1fv( location,v.slice(0,cont) );
	}
}

function _glUniform1iv( location, count, v ){
	if( v.length==count ){
		gl.uniform1iv( location,v );
	}else{
		gl.uniform1iv( location,v.slice(0,cont) );
	}
}

function _glUniform2fv( location, count, v ){
	var n=count*2;
	if( v.length==n ){
		gl.uniform2fv( location,v );
	}else{
		gl.uniform2fv( location,v.slice(0,n) );
	}
}

function _glUniform2iv( location, count, v ){
	var n=count*2;
	if( v.length==n ){
		gl.uniform2iv( location,v );
	}else{
		gl.uniform2iv( location,v.slice(0,n) );
	}
}

function _glUniform3fv( location, count, v ){
	var n=count*3;
	if( v.length==n ){
		gl.uniform3fv( location,v );
	}else{
		gl.uniform3fv( location,v.slice(0,n) );
	}
}

function _glUniform3iv( location, count, v ){
	var n=count*3;
	if( v.length==n ){
		gl.uniform3iv( location,v );
	}else{
		gl.uniform3iv( location,v.slice(0,n) );
	}
}

function _glUniform4fv( location, count, v ){
	var n=count*4;
	if( v.length==n ){
		gl.uniform4fv( location,v );
	}else{
		gl.uniform4fv( location,v.slice(0,n) );
	}
}

function _glUniform4iv( location, count, v ){
	var n=count*4;
	if( v.length==n ){
		gl.uniform4iv( location,v );
	}else{
		gl.uniform4iv( location,v.slice(0,n) );
	}
}

function _glUniformMatrix2fv( location, count, transpose, value ){
	var n=count*4;
	if( value.length==n ){
		gl.uniformMatrix2fv( location,transpose,value );
	}else{
		gl.uniformMatrix2fv( location,transpose,value.slice(0,n) );
	}
}

function _glUniformMatrix3fv( location, count, transpose, value ){
	var n=count*9;
	if( value.length==n ){
		gl.uniformMatrix3fv( location,transpose,value );
	}else{
		gl.uniformMatrix3fv( location,transpose,value.slice(0,n) );
	}
}

function _glUniformMatrix4fv( location, count, transpose, value ){
	var n=count*16;
	if( value.length==n ){
		gl.uniformMatrix4fv( location,transpose,value );
	}else{
		gl.uniformMatrix4fv( location,transpose,value.slice(0,n) );
	}
}

function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<152>";
	if((bb_app__app)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<152>";
		error("App has already been created");
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<153>";
	bb_app__app=this;
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<154>";
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<155>";
	bb_app__game.SetDelegate(bb_app__delegate);
	pop_err();
	return this;
}
c_App.prototype.p_OnResize=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnCreate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnResume=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnRender=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnClose=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<177>";
	bb_app_EndApp();
	pop_err();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<181>";
	this.p_OnClose();
	pop_err();
	return 0;
}
function c_AmongUs(){
	c_App.call(this);
	this.m_canvas=null;
	this.m_scenes=new_object_array(2);
	this.m_nextExpectedFrame=0;
	this.m_transitioning=true;
	this.m_currentScene=0;
}
c_AmongUs.prototype=extend_class(c_App);
c_AmongUs.m_new=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<12>";
	c_App.m_new.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<12>";
	pop_err();
	return this;
}
c_AmongUs.prototype.p_OnCreate=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<25>";
	c_Time.m_instance.p_Update();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<27>";
	this.m_canvas=c_Canvas.m_new.call(new c_Canvas,null);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<28>";
	this.m_canvas.p_SetProjection2d(0.0,64.0,0.0,64.0,-1.0,1.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<30>";
	dbg_array(this.m_scenes,0)[dbg_index]=(c_Menu.m_new.call(new c_Menu));
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<31>";
	dbg_array(this.m_scenes,1)[dbg_index]=(c_Game.m_new.call(new c_Game));
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<33>";
	dbg_array(this.m_scenes,0)[dbg_index].p_Start();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<35>";
	this.m_nextExpectedFrame=bb_app_Millisecs()+25;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<36>";
	pop_err();
	return 0;
}
c_AmongUs.prototype.p_OnUpdate=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<40>";
	var t_time=bb_app_Millisecs();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<42>";
	if(this.m_transitioning){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<43>";
		if(!((bb_input2_KeyDown(32))!=0)){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<43>";
			this.m_transitioning=false;
		}
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<45>";
		if(t_time>=this.m_nextExpectedFrame){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<46>";
			bb_input_UpdateMouse();
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<47>";
			this.m_nextExpectedFrame=t_time+25;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<48>";
			c_Time.m_instance.p_Update();
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<49>";
			var t_status=dbg_array(this.m_scenes,this.m_currentScene)[dbg_index].p_Update();
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<50>";
			if(t_status==2){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<51>";
				this.m_currentScene+=1;
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<52>";
				dbg_array(this.m_scenes,this.m_currentScene)[dbg_index].p_Start();
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<53>";
				this.m_transitioning=true;
			}else{
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<54>";
				if(t_status==1){
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<55>";
					this.m_currentScene-=1;
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<56>";
					if(this.m_currentScene<0){
						err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<56>";
						bb_app_EndApp();
					}
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<57>";
					dbg_array(this.m_scenes,this.m_currentScene)[dbg_index].p_Start();
				}
			}
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<61>";
	pop_err();
	return 0;
}
c_AmongUs.prototype.p_OnRender=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<65>";
	this.m_canvas.p_Clear(0.0,0.0,0.0,1.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<66>";
	if(!this.m_transitioning){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<67>";
		dbg_array(this.m_scenes,this.m_currentScene)[dbg_index].p_Draw(this.m_canvas);
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<69>";
	this.m_canvas.p_Flush();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<70>";
	pop_err();
	return 0;
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<65>";
	pop_err();
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<75>";
	this.m__graphics=(new gxtkGraphics);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<76>";
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<77>";
	bb_graphics_SetFont(null,32);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<79>";
	this.m__audio=(new gxtkAudio);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<80>";
	bb_audio_SetAudioDevice(this.m__audio);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<82>";
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<83>";
	bb_input2_SetInputDevice(this.m__input);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<85>";
	bb_app_ValidateDeviceWindow(false);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<87>";
	bb_app_EnumDisplayModes();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<89>";
	bb_app__app.p_OnCreate();
	pop_err();
}
c_GameDelegate.prototype.SuspendGame=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<93>";
	bb_app__app.p_OnSuspend();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<94>";
	this.m__audio.Suspend();
	pop_err();
}
c_GameDelegate.prototype.ResumeGame=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<98>";
	this.m__audio.Resume();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<99>";
	bb_app__app.p_OnResume();
	pop_err();
}
c_GameDelegate.prototype.UpdateGame=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<103>";
	bb_app_ValidateDeviceWindow(true);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<104>";
	this.m__input.p_BeginUpdate();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<105>";
	bb_app__app.p_OnUpdate();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<106>";
	this.m__input.p_EndUpdate();
	pop_err();
}
c_GameDelegate.prototype.RenderGame=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<110>";
	bb_app_ValidateDeviceWindow(true);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<111>";
	var t_mode=this.m__graphics.BeginRender();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<112>";
	if((t_mode)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<112>";
		bb_graphics_BeginRender();
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<113>";
	if(t_mode==2){
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<113>";
		bb_app__app.p_OnLoading();
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<113>";
		bb_app__app.p_OnRender();
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<114>";
	if((t_mode)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<114>";
		bb_graphics_EndRender();
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<115>";
	this.m__graphics.EndRender();
	pop_err();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<119>";
	this.m__input.p_KeyEvent(t_event,t_data);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<120>";
	if(t_event!=1){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<121>";
	var t_1=t_data;
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<122>";
	if(t_1==432){
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<123>";
		bb_app__app.p_OnClose();
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<124>";
		if(t_1==416){
			err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<125>";
			bb_app__app.p_OnBack();
		}
	}
	pop_err();
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<130>";
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<134>";
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<138>";
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
	pop_err();
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<142>";
	this.m__graphics.DiscardGraphics();
	pop_err();
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<76>";
	c_AmongUs.m_new.call(new c_AmongUs);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/amongus.monkey<77>";
	pop_err();
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<63>";
	bb_graphics_device=t_dev;
	pop_err();
	return 0;
}
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<70>";
	pop_err();
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<114>";
	dbg_object(this).m_tx=t_tx;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<115>";
	dbg_object(this).m_ty=t_ty;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<116>";
	dbg_object(this).m_flags=dbg_object(this).m_flags&-2;
	pop_err();
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<197>";
	this.m_flags=t_iflags;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<199>";
	if((this.m_flags&2)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<200>";
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<200>";
		var t_=this.m_frames;
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<200>";
		var t_2=0;
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<200>";
		while(t_2<t_.length){
			err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<200>";
			var t_f=dbg_array(t_,t_2)[dbg_index];
			err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<200>";
			t_2=t_2+1;
			err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<201>";
			dbg_object(t_f).m_x+=1;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<203>";
		this.m_width-=2;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<206>";
	if((this.m_flags&4)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<207>";
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<207>";
		var t_3=this.m_frames;
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<207>";
		var t_4=0;
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<207>";
		while(t_4<t_3.length){
			err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<207>";
			var t_f2=dbg_array(t_3,t_4)[dbg_index];
			err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<207>";
			t_4=t_4+1;
			err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<208>";
			dbg_object(t_f2).m_y+=1;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<210>";
		this.m_height-=2;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<213>";
	if((this.m_flags&1)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<214>";
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<217>";
	if(this.m_frames.length==1 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_x==0 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<218>";
		this.m_flags|=65536;
	}
	pop_err();
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<143>";
	if((this.m_surface)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<143>";
		error("Image already initialized");
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<144>";
	this.m_surface=t_surf;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<146>";
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<147>";
	this.m_height=this.m_surface.Height();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<149>";
	this.m_frames=new_object_array(t_nframes);
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<150>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<151>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<154>";
	this.p_ApplyFlags(t_iflags);
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<155>";
	pop_err();
	return this;
}
c_Image.prototype.p_Init2=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<159>";
	if((this.m_surface)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<159>";
		error("Image already initialized");
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<160>";
	this.m_surface=t_surf;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<161>";
	this.m_source=t_src;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<163>";
	this.m_width=t_iwidth;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<164>";
	this.m_height=t_iheight;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<166>";
	this.m_frames=new_object_array(t_nframes);
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<168>";
	var t_ix=t_x;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<168>";
	var t_iy=t_y;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<170>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<171>";
		if(t_ix+this.m_width>t_srcw){
			err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<172>";
			t_ix=0;
			err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<173>";
			t_iy+=this.m_height;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<175>";
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<176>";
			error("Image frame outside surface");
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<178>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy);
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<179>";
		t_ix+=this.m_width;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<182>";
	this.p_ApplyFlags(t_iflags);
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<183>";
	pop_err();
	return this;
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_firstChar=0;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
}
c_GraphicsContext.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<29>";
	pop_err();
	return this;
}
var bb_graphics_context=null;
function bb_data_FixDataPath(t_path){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/data.monkey<7>";
	var t_i=t_path.indexOf(":/",0);
	err_info="F:/progs/gamedev/monkey/modules/mojo/data.monkey<8>";
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo/data.monkey<8>";
		pop_err();
		return t_path;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/data.monkey<9>";
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		err_info="F:/progs/gamedev/monkey/modules/mojo/data.monkey<9>";
		pop_err();
		return t_path;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/data.monkey<10>";
	var t_="monkey://data/"+t_path;
	pop_err();
	return t_;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<23>";
	dbg_object(this).m_x=t_x;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<24>";
	dbg_object(this).m_y=t_y;
	pop_err();
	return this;
}
c_Frame.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<18>";
	pop_err();
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<239>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<240>";
	if((t_surf)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<240>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<244>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<245>";
	if((t_surf)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<245>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init2(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<548>";
	if(!((t_font)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<549>";
		if(!((dbg_object(bb_graphics_context).m_defaultFont)!=null)){
			err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<550>";
			dbg_object(bb_graphics_context).m_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<552>";
		t_font=dbg_object(bb_graphics_context).m_defaultFont;
		err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<553>";
		t_firstChar=32;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<555>";
	dbg_object(bb_graphics_context).m_font=t_font;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<556>";
	dbg_object(bb_graphics_context).m_firstChar=t_firstChar;
	pop_err();
	return 0;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/audio.monkey<22>";
	bb_audio_device=t_dev;
	pop_err();
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHitPut=0;
	this.m__keyHitQueue=new_number_array(33);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<26>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<27>";
		dbg_array(this.m__joyStates,t_i)[dbg_index]=c_JoyState.m_new.call(new c_JoyState);
	}
	pop_err();
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<237>";
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<238>";
	dbg_array(this.m__keyHit,t_key)[dbg_index]+=1;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<239>";
	dbg_array(this.m__keyHitQueue,this.m__keyHitPut)[dbg_index]=t_key;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<240>";
	this.m__keyHitPut+=1;
	pop_err();
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<189>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<190>";
		var t_state=dbg_array(this.m__joyStates,t_i)[dbg_index];
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<191>";
		if(!BBGame.Game().PollJoystick(t_i,dbg_object(t_state).m_joyx,dbg_object(t_state).m_joyy,dbg_object(t_state).m_joyz,dbg_object(t_state).m_buttons)){
			err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<191>";
			break;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<192>";
		for(var t_j=0;t_j<32;t_j=t_j+1){
			err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<193>";
			var t_key=256+t_i*32+t_j;
			err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<194>";
			if(dbg_array(dbg_object(t_state).m_buttons,t_j)[dbg_index]){
				err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<195>";
				if(!dbg_array(this.m__keyDown,t_key)[dbg_index]){
					err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<196>";
					dbg_array(this.m__keyDown,t_key)[dbg_index]=true;
					err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<197>";
					this.p_PutKeyHit(t_key);
				}
			}else{
				err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<200>";
				dbg_array(this.m__keyDown,t_key)[dbg_index]=false;
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_EndUpdate=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<207>";
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<208>";
		dbg_array(this.m__keyHit,dbg_array(this.m__keyHitQueue,t_i)[dbg_index])[dbg_index]=0;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<210>";
	this.m__keyHitPut=0;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<211>";
	this.m__charGet=0;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<212>";
	this.m__charPut=0;
	pop_err();
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<111>";
	var t_1=t_event;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<112>";
	if(t_1==1){
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<113>";
		if(!dbg_array(this.m__keyDown,t_data)[dbg_index]){
			err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<114>";
			dbg_array(this.m__keyDown,t_data)[dbg_index]=true;
			err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<115>";
			this.p_PutKeyHit(t_data);
			err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<116>";
			if(t_data==1){
				err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<117>";
				dbg_array(this.m__keyDown,384)[dbg_index]=true;
				err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<118>";
				this.p_PutKeyHit(384);
			}else{
				err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<119>";
				if(t_data==384){
					err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<120>";
					dbg_array(this.m__keyDown,1)[dbg_index]=true;
					err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<121>";
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<124>";
		if(t_1==2){
			err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<125>";
			if(dbg_array(this.m__keyDown,t_data)[dbg_index]){
				err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<126>";
				dbg_array(this.m__keyDown,t_data)[dbg_index]=false;
				err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<127>";
				if(t_data==1){
					err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<128>";
					dbg_array(this.m__keyDown,384)[dbg_index]=false;
				}else{
					err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<129>";
					if(t_data==384){
						err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<130>";
						dbg_array(this.m__keyDown,1)[dbg_index]=false;
					}
				}
			}
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<133>";
			if(t_1==3){
				err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<134>";
				if(this.m__charPut<this.m__charQueue.length){
					err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<135>";
					dbg_array(this.m__charQueue,this.m__charPut)[dbg_index]=t_data;
					err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<136>";
					this.m__charPut+=1;
				}
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<142>";
	var t_2=t_event;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<143>";
	if(t_2==4){
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<144>";
		this.p_KeyEvent(1,1+t_data);
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<145>";
		if(t_2==5){
			err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<146>";
			this.p_KeyEvent(2,1+t_data);
			pop_err();
			return;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<148>";
			if(t_2==6){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<152>";
	this.m__mouseX=t_x;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<153>";
	this.m__mouseY=t_y;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<154>";
	dbg_array(this.m__touchX,0)[dbg_index]=t_x;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<155>";
	dbg_array(this.m__touchY,0)[dbg_index]=t_y;
	pop_err();
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<159>";
	var t_3=t_event;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<160>";
	if(t_3==7){
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<161>";
		this.p_KeyEvent(1,384+t_data);
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<162>";
		if(t_3==8){
			err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<163>";
			this.p_KeyEvent(2,384+t_data);
			pop_err();
			return;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<165>";
			if(t_3==9){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<169>";
	dbg_array(this.m__touchX,t_data)[dbg_index]=t_x;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<170>";
	dbg_array(this.m__touchY,t_data)[dbg_index]=t_y;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<171>";
	if(t_data==0){
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<172>";
		this.m__mouseX=t_x;
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<173>";
		this.m__mouseY=t_y;
	}
	pop_err();
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<178>";
	var t_4=t_event;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<179>";
	if(t_4==10){
	}else{
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<183>";
	this.m__accelX=t_x;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<184>";
	this.m__accelY=t_y;
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<185>";
	this.m__accelZ=t_z;
	pop_err();
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<47>";
	if(t_key>0 && t_key<512){
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<47>";
		pop_err();
		return dbg_array(this.m__keyDown,t_key)[dbg_index];
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<48>";
	pop_err();
	return false;
}
c_InputDevice.prototype.p_MouseX=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<69>";
	pop_err();
	return this.m__mouseX;
}
c_InputDevice.prototype.p_MouseY=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<73>";
	pop_err();
	return this.m__mouseY;
}
c_InputDevice.prototype.p_KeyHit=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<52>";
	if(t_key>0 && t_key<512){
		err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<52>";
		pop_err();
		return dbg_array(this.m__keyHit,t_key)[dbg_index];
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<53>";
	pop_err();
	return 0;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/inputdevice.monkey<14>";
	pop_err();
	return this;
}
var bb_input2_device=null;
function bb_input2_SetInputDevice(t_dev){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/input.monkey<22>";
	bb_input2_device=t_dev;
	pop_err();
	return 0;
}
var bb_app__devWidth=0;
var bb_app__devHeight=0;
function bb_app_ValidateDeviceWindow(t_notifyApp){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<57>";
	var t_w=bb_app__game.GetDeviceWidth();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<58>";
	var t_h=bb_app__game.GetDeviceHeight();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<59>";
	if(t_w==bb_app__devWidth && t_h==bb_app__devHeight){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<60>";
	bb_app__devWidth=t_w;
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<61>";
	bb_app__devHeight=t_h;
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<62>";
	if(t_notifyApp){
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<62>";
		bb_app__app.p_OnResize();
	}
	pop_err();
}
function c_DisplayMode(){
	Object.call(this);
	this.m__width=0;
	this.m__height=0;
}
c_DisplayMode.m_new=function(t_width,t_height){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<192>";
	this.m__width=t_width;
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<193>";
	this.m__height=t_height;
	pop_err();
	return this;
}
c_DisplayMode.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<189>";
	pop_err();
	return this;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map.prototype.p_Contains=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<25>";
	var t_=this.p_FindNode(t_key)!=null;
	pop_err();
	return t_;
}
c_Map.prototype.p_RotateLeft=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<223>";
					this.p_RotateLeft(t_node);
				}
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<227>";
				this.p_RotateRight(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<239>";
					this.p_RotateRight(t_node);
				}
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<243>";
				this.p_RotateLeft(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map.prototype.p_Set=function(t_key,t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<45>";
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<53>";
		this.p_InsertFixup(t_node);
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map.prototype.p_Insert=function(t_key,t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<146>";
	var t_=this.p_Set(t_key,t_value);
	pop_err();
	return t_;
}
function c_IntMap(){
	c_Map.call(this);
}
c_IntMap.prototype=extend_class(c_Map);
c_IntMap.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<534>";
	c_Map.m_new.call(this);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<534>";
	pop_err();
	return this;
}
c_IntMap.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack.m_new2=function(t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<71>";
	if(this.m_length==this.m_data.length){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<72>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<74>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<75>";
	this.m_length+=1;
	pop_err();
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<83>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<84>";
		this.p_Push(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<79>";
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack.prototype.p_ToArray=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<18>";
	var t_t=new_object_array(this.m_length);
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<19>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<20>";
		dbg_array(t_t,t_i)[dbg_index]=dbg_array(this.m_data,t_i)[dbg_index];
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<22>";
	pop_err();
	return t_t;
}
function c_Node(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
var bb_app__displayModes=[];
var bb_app__desktopMode=null;
function bb_app_DeviceWidth(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<263>";
	pop_err();
	return bb_app__devWidth;
}
function bb_app_DeviceHeight(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<267>";
	pop_err();
	return bb_app__devHeight;
}
function bb_app_EnumDisplayModes(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<33>";
	var t_modes=bb_app__game.GetDisplayModes();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<34>";
	var t_mmap=c_IntMap.m_new.call(new c_IntMap);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<35>";
	var t_mstack=c_Stack.m_new.call(new c_Stack);
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<36>";
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<37>";
		var t_w=dbg_object(dbg_array(t_modes,t_i)[dbg_index]).width;
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<38>";
		var t_h=dbg_object(dbg_array(t_modes,t_i)[dbg_index]).height;
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<39>";
		var t_size=t_w<<16|t_h;
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<40>";
		if(t_mmap.p_Contains(t_size)){
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<42>";
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,dbg_object(dbg_array(t_modes,t_i)[dbg_index]).width,dbg_object(dbg_array(t_modes,t_i)[dbg_index]).height);
			err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<43>";
			t_mmap.p_Insert(t_size,t_mode);
			err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<44>";
			t_mstack.p_Push(t_mode);
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<47>";
	bb_app__displayModes=t_mstack.p_ToArray();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<48>";
	var t_mode2=bb_app__game.GetDesktopMode();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<49>";
	if((t_mode2)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<50>";
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,dbg_object(t_mode2).width,dbg_object(t_mode2).height);
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<52>";
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app_DeviceWidth(),bb_app_DeviceHeight());
	}
	pop_err();
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<312>";
	dbg_object(bb_graphics_context).m_ix=t_ix;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<313>";
	dbg_object(bb_graphics_context).m_iy=t_iy;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<314>";
	dbg_object(bb_graphics_context).m_jx=t_jx;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<315>";
	dbg_object(bb_graphics_context).m_jy=t_jy;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<316>";
	dbg_object(bb_graphics_context).m_tx=t_tx;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<317>";
	dbg_object(bb_graphics_context).m_ty=t_ty;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<318>";
	dbg_object(bb_graphics_context).m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<319>";
	dbg_object(bb_graphics_context).m_matDirty=1;
	pop_err();
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<308>";
	bb_graphics_SetMatrix(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<254>";
	dbg_object(bb_graphics_context).m_color_r=t_r;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<255>";
	dbg_object(bb_graphics_context).m_color_g=t_g;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<256>";
	dbg_object(bb_graphics_context).m_color_b=t_b;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<257>";
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<271>";
	dbg_object(bb_graphics_context).m_alpha=t_alpha;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<272>";
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	pop_err();
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<280>";
	dbg_object(bb_graphics_context).m_blend=t_blend;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<281>";
	bb_graphics_renderDevice.SetBlend(t_blend);
	pop_err();
	return 0;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<289>";
	dbg_object(bb_graphics_context).m_scissor_x=t_x;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<290>";
	dbg_object(bb_graphics_context).m_scissor_y=t_y;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<291>";
	dbg_object(bb_graphics_context).m_scissor_width=t_width;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<292>";
	dbg_object(bb_graphics_context).m_scissor_height=t_height;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<293>";
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	pop_err();
	return 0;
}
function bb_graphics_BeginRender(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<225>";
	bb_graphics_renderDevice=bb_graphics_device;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<226>";
	dbg_object(bb_graphics_context).m_matrixSp=0;
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<227>";
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<228>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<229>";
	bb_graphics_SetAlpha(1.0);
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<230>";
	bb_graphics_SetBlend(0);
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<231>";
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	pop_err();
	return 0;
}
function bb_graphics_EndRender(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/graphics.monkey<235>";
	bb_graphics_renderDevice=null;
	pop_err();
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<259>";
	error("");
	pop_err();
}
function c_Time(){
	Object.call(this);
	this.m_initialTime=0;
	this.m_realActTime=0;
	this.m_realLastFrame=0.0;
	this.m_timeDistortion=1.0;
	this.m_lastFrame=0.0;
	this.m_actTime=0.0;
	this.m_lastFpsTime=-1;
	this.m_frames=0;
	this.m_fps=0.0;
}
c_Time.m_new=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<26>";
	this.m_initialTime=bb_app_Millisecs();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<27>";
	this.m_realActTime=0;
	pop_err();
	return this;
}
c_Time.m_instance=null;
c_Time.prototype.p_Update=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<31>";
	var t_temp=bb_app_Millisecs()-this.m_initialTime;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<33>";
	this.m_realLastFrame=(t_temp-this.m_realActTime);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<34>";
	this.m_lastFrame=this.m_realLastFrame*this.m_timeDistortion;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<35>";
	this.m_actTime=this.m_actTime+this.m_lastFrame;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<36>";
	this.m_realActTime=t_temp;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<38>";
	if((this.m_lastFpsTime)==-1.0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<39>";
		this.m_lastFpsTime=t_temp;
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<40>";
		if(t_temp-this.m_lastFpsTime>=5000){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<41>";
			this.m_lastFpsTime=t_temp;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<42>";
			this.m_fps=(((this.m_frames+1)/5)|0);
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<43>";
			this.m_frames=0;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<45>";
			print(String(this.m_fps));
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/time.monkey<48>";
			this.m_frames+=1;
		}
	}
	pop_err();
}
function bb_app_Millisecs(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<233>";
	var t_=bb_app__game.Millisecs();
	pop_err();
	return t_;
}
function c_DrawList(){
	Object.call(this);
	this.m__font=null;
	this.m__defaultMaterial=null;
	this.m__next=0;
	this.m__ops=c_Stack3.m_new.call(new c_Stack3);
	this.m__data=c_DataBuffer.m_new.call(new c_DataBuffer,4096,true);
	this.m__op=bb_graphics2_nullOp;
	this.m__casters=c_Stack4.m_new.call(new c_Stack4);
	this.m__casterVerts=c_FloatStack.m_new2.call(new c_FloatStack);
	this.m__blend=1;
	this.m__color=[1.0,1.0,1.0,1.0];
	this.m__alpha=255.0;
	this.m__pmcolor=-1;
	this.m__ix=1.0;
	this.m__jx=.0;
	this.m__tx=.0;
	this.m__iy=.0;
	this.m__jy=1.0;
	this.m__ty=.0;
	this.m__matStack=new_number_array(384);
	this.m__matSp=0;
}
c_DrawList.prototype.p_SetFont=function(t_font){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1477>";
	if(!((t_font)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1477>";
		t_font=bb_graphics2_defaultFont;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1478>";
	this.m__font=t_font;
	pop_err();
}
c_DrawList.prototype.p_SetDefaultMaterial=function(t_material){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1486>";
	this.m__defaultMaterial=t_material;
	pop_err();
}
c_DrawList.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1341>";
	bb_graphics2_InitMojo2();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1343>";
	this.p_SetFont(null);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1344>";
	this.p_SetDefaultMaterial(bb_graphics2_fastShader.p_DefaultMaterial());
	pop_err();
	return this;
}
c_DrawList.prototype.p_IsEmpty=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1848>";
	var t_=this.m__next==0;
	pop_err();
	return t_;
}
c_DrawList.prototype.p_Render=function(t_op,t_index,t_count){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1861>";
	if(!dbg_object(t_op).m_material.p_Bind()){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1863>";
	if(dbg_object(t_op).m_blend!=bb_graphics2_rs_blend){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1864>";
		bb_graphics2_rs_blend=dbg_object(t_op).m_blend;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1865>";
		var t_4=bb_graphics2_rs_blend;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1866>";
		if(t_4==0){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1867>";
			gl.disable(3042);
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1868>";
			if(t_4==1){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1869>";
				gl.enable(3042);
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1870>";
				gl.blendFunc(1,771);
			}else{
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1871>";
				if(t_4==2){
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1872>";
					gl.enable(3042);
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1873>";
					gl.blendFunc(1,1);
				}else{
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1874>";
					if(t_4==3){
						err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1875>";
						gl.enable(3042);
						err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1876>";
						gl.blendFunc(774,771);
					}else{
						err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1877>";
						if(t_4==4){
							err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1878>";
							gl.enable(3042);
							err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1879>";
							gl.blendFunc(774,0);
						}
					}
				}
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1883>";
	var t_5=dbg_object(t_op).m_order;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1884>";
	if(t_5==1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1885>";
		gl.drawArrays(0,t_index,t_count);
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1886>";
		if(t_5==2){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1887>";
			gl.drawArrays(1,t_index,t_count);
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1888>";
			if(t_5==3){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1889>";
				gl.drawArrays(4,t_index,t_count);
			}else{
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1890>";
				if(t_5==4){
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1891>";
					gl.drawElements(4,((t_count/4)|0)*6,5123,(((t_index/4)|0)*6+(t_index&3)*3510)*2);
				}else{
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1893>";
					var t_j=0;
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1894>";
					while(t_j<t_count){
						err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1895>";
						gl.drawArrays(6,t_index+t_j,dbg_object(t_op).m_order);
						err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1896>";
						t_j+=dbg_object(t_op).m_order;
					}
				}
			}
		}
	}
	pop_err();
}
c_DrawList.prototype.p_Render2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1903>";
	if(!((this.m__next)!=0)){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1905>";
	var t_offset=0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1905>";
	var t_opid=0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1905>";
	var t_ops=this.m__ops.p_Data();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1905>";
	var t_length=this.m__ops.p_Length2();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1907>";
	while(t_offset<this.m__next){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1909>";
		var t_size=this.m__next-t_offset;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1909>";
		var t_lastop=t_length;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1911>";
		if(t_size>65520){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1913>";
			t_size=0;
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1914>";
			t_lastop=t_opid;
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1915>";
			while(t_lastop<t_length){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1916>";
				var t_op=dbg_array(t_ops,t_lastop)[dbg_index];
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1917>";
				var t_n=dbg_object(t_op).m_count*28;
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1918>";
				if(t_size+t_n>65520){
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1918>";
					break;
				}
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1919>";
				t_size+=t_n;
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1920>";
				t_lastop+=1;
			}
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1923>";
			if(!((t_size)!=0)){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1924>";
				var t_op2=dbg_array(t_ops,t_opid)[dbg_index];
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1925>";
				var t_count=dbg_object(t_op2).m_count;
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1926>";
				while((t_count)!=0){
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1927>";
					var t_n2=t_count;
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1928>";
					if(t_n2>2340){
						err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1928>";
						t_n2=((2340/dbg_object(t_op2).m_order)|0)*dbg_object(t_op2).m_order;
					}
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1929>";
					var t_size2=t_n2*28;
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1931>";
					if(true){
						err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1931>";
						_glBufferData(34962,65520,null,35040);
					}
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1932>";
					_glBufferSubData(34962,0,t_size2,this.m__data,t_offset);
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1934>";
					this.p_Render(t_op2,0,t_n2);
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1936>";
					t_offset+=t_size2;
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1937>";
					t_count-=t_n2;
				}
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1939>";
				t_opid+=1;
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1940>";
				continue;
			}
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1945>";
		if(true){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1945>";
			_glBufferData(34962,65520,null,35040);
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1946>";
		_glBufferSubData(34962,0,t_size,this.m__data,t_offset);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1948>";
		var t_index=0;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1949>";
		while(t_opid<t_lastop){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1950>";
			var t_op3=dbg_array(t_ops,t_opid)[dbg_index];
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1951>";
			this.p_Render(t_op3,t_index,dbg_object(t_op3).m_count);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1952>";
			t_index+=dbg_object(t_op3).m_count;
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1953>";
			t_opid+=1;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1955>";
		t_offset+=t_size;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1959>";
	gl.getError();
	pop_err();
}
c_DrawList.prototype.p_Reset=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1964>";
	this.m__next=0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1966>";
	var t_data=this.m__ops.p_Data();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1967>";
	for(var t_i=0;t_i<this.m__ops.p_Length2();t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1968>";
		dbg_object(dbg_array(t_data,t_i)[dbg_index]).m_material=null;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1969>";
		bb_graphics2_freeOps.p_Push7(dbg_array(t_data,t_i)[dbg_index]);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1971>";
	this.m__ops.p_Clear2();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1972>";
	this.m__op=bb_graphics2_nullOp;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1974>";
	this.m__casters.p_Clear2();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1975>";
	this.m__casterVerts.p_Clear2();
	pop_err();
}
c_DrawList.prototype.p_Flush=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1979>";
	this.p_Render2();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1980>";
	this.p_Reset();
	pop_err();
}
c_DrawList.prototype.p_SetBlendMode=function(t_blend){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1348>";
	this.m__blend=t_blend;
	pop_err();
}
c_DrawList.prototype.p_SetColor=function(t_r,t_g,t_b){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1356>";
	dbg_array(this.m__color,0)[dbg_index]=t_r;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1357>";
	dbg_array(this.m__color,1)[dbg_index]=t_g;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1358>";
	dbg_array(this.m__color,2)[dbg_index]=t_b;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1359>";
	this.m__pmcolor=((this.m__alpha)|0)<<24|((dbg_array(this.m__color,2)[dbg_index]*this.m__alpha)|0)<<16|((dbg_array(this.m__color,1)[dbg_index]*this.m__alpha)|0)<<8|((dbg_array(this.m__color,0)[dbg_index]*this.m__alpha)|0);
	pop_err();
}
c_DrawList.prototype.p_SetColor2=function(t_r,t_g,t_b,t_a){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1363>";
	dbg_array(this.m__color,0)[dbg_index]=t_r;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1364>";
	dbg_array(this.m__color,1)[dbg_index]=t_g;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1365>";
	dbg_array(this.m__color,2)[dbg_index]=t_b;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1366>";
	dbg_array(this.m__color,3)[dbg_index]=t_a;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1367>";
	this.m__alpha=t_a*255.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1368>";
	this.m__pmcolor=((this.m__alpha)|0)<<24|((dbg_array(this.m__color,2)[dbg_index]*this.m__alpha)|0)<<16|((dbg_array(this.m__color,1)[dbg_index]*this.m__alpha)|0)<<8|((dbg_array(this.m__color,0)[dbg_index]*this.m__alpha)|0);
	pop_err();
}
c_DrawList.prototype.p_BeginPrim=function(t_material,t_order){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2009>";
	if(!((t_material)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2009>";
		t_material=this.m__defaultMaterial;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2011>";
	if(this.m__next+t_order*28>this.m__data.Length()){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2013>";
		var t_newsize=bb_math_Max(this.m__data.Length()+((this.m__data.Length()/2)|0),this.m__next+t_order*28);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2014>";
		var t_data=c_DataBuffer.m_new.call(new c_DataBuffer,t_newsize,true);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2015>";
		this.m__data.p_CopyBytes(0,t_data,0,this.m__next);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2016>";
		this.m__data.Discard();
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2017>";
		this.m__data=t_data;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2020>";
	if(t_material==dbg_object(this.m__op).m_material && this.m__blend==dbg_object(this.m__op).m_blend && t_order==dbg_object(this.m__op).m_order){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2021>";
		dbg_object(this.m__op).m_count+=t_order;
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2025>";
	if((bb_graphics2_freeOps.p_Length2())!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2025>";
		this.m__op=bb_graphics2_freeOps.p_Pop();
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2025>";
		this.m__op=c_DrawOp.m_new.call(new c_DrawOp);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2027>";
	this.m__ops.p_Push7(this.m__op);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2028>";
	dbg_object(this.m__op).m_material=t_material;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2029>";
	dbg_object(this.m__op).m_blend=this.m__blend;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2030>";
	dbg_object(this.m__op).m_order=t_order;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2031>";
	dbg_object(this.m__op).m_count=t_order;
	pop_err();
}
c_DrawList.prototype.p_PrimVert=function(t_x0,t_y0,t_s0,t_t0){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2064>";
	this.m__data.PokeFloat(this.m__next+0,t_x0*this.m__ix+t_y0*this.m__jx+this.m__tx);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2065>";
	this.m__data.PokeFloat(this.m__next+4,t_x0*this.m__iy+t_y0*this.m__jy+this.m__ty);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2066>";
	this.m__data.PokeFloat(this.m__next+8,t_s0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2067>";
	this.m__data.PokeFloat(this.m__next+12,t_t0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2068>";
	this.m__data.PokeFloat(this.m__next+16,this.m__ix);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2069>";
	this.m__data.PokeFloat(this.m__next+20,this.m__iy);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2070>";
	this.m__data.PokeInt(this.m__next+24,this.m__pmcolor);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2071>";
	this.m__next+=28;
	pop_err();
}
c_DrawList.prototype.p_AddShadowCaster=function(t_caster){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1816>";
	this.m__casters.p_Push10(t_caster);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1817>";
	var t_verts=dbg_object(t_caster).m__verts;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1818>";
	for(var t_i=0;t_i<t_verts.length-1;t_i=t_i+2){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1819>";
		var t_x0=dbg_array(t_verts,t_i)[dbg_index];
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1820>";
		var t_y0=dbg_array(t_verts,t_i+1)[dbg_index];
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1821>";
		this.m__casterVerts.p_Push13(t_x0*this.m__ix+t_y0*this.m__jx+this.m__tx);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1822>";
		this.m__casterVerts.p_Push13(t_x0*this.m__iy+t_y0*this.m__jy+this.m__ty);
	}
	pop_err();
}
c_DrawList.prototype.p_PushMatrix=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1463>";
	dbg_array(this.m__matStack,this.m__matSp+0)[dbg_index]=this.m__ix;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1463>";
	dbg_array(this.m__matStack,this.m__matSp+1)[dbg_index]=this.m__iy;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1464>";
	dbg_array(this.m__matStack,this.m__matSp+2)[dbg_index]=this.m__jx;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1464>";
	dbg_array(this.m__matStack,this.m__matSp+3)[dbg_index]=this.m__jy;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1465>";
	dbg_array(this.m__matStack,this.m__matSp+4)[dbg_index]=this.m__tx;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1465>";
	dbg_array(this.m__matStack,this.m__matSp+5)[dbg_index]=this.m__ty;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1466>";
	this.m__matSp+=6;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1466>";
	if(this.m__matSp>=this.m__matStack.length){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1466>";
		this.m__matSp-=this.m__matStack.length;
	}
	pop_err();
}
c_DrawList.prototype.p_SetMatrix=function(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1399>";
	this.m__ix=t_ix;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1399>";
	this.m__iy=t_iy;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1400>";
	this.m__jx=t_jx;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1400>";
	this.m__jy=t_jy;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1401>";
	this.m__tx=t_tx;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1401>";
	this.m__ty=t_ty;
	pop_err();
}
c_DrawList.prototype.p_Transform=function(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1414>";
	var t_ix2=t_ix*this.m__ix+t_iy*this.m__jx;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1414>";
	var t_iy2=t_ix*this.m__iy+t_iy*this.m__jy;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1415>";
	var t_jx2=t_jx*this.m__ix+t_jy*this.m__jx;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1415>";
	var t_jy2=t_jx*this.m__iy+t_jy*this.m__jy;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1416>";
	var t_tx2=t_tx*this.m__ix+t_ty*this.m__jx+this.m__tx;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1416>";
	var t_ty2=t_tx*this.m__iy+t_ty*this.m__jy+this.m__ty;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1417>";
	this.p_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	pop_err();
}
c_DrawList.prototype.p_Translate=function(t_tx,t_ty){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1421>";
	this.p_Transform(1.0,0.0,0.0,1.0,t_tx,t_ty);
	pop_err();
}
c_DrawList.prototype.p_Rotate=function(t_rz){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1425>";
	this.p_Transform(Math.cos((t_rz)*D2R),-Math.sin((t_rz)*D2R),Math.sin((t_rz)*D2R),Math.cos((t_rz)*D2R),0.0,0.0);
	pop_err();
	return 0;
}
c_DrawList.prototype.p_TranslateRotate=function(t_tx,t_ty,t_rz){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1433>";
	this.p_Translate(t_tx,t_ty);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1434>";
	this.p_Rotate(t_rz);
	pop_err();
}
c_DrawList.prototype.p_Scale=function(t_sx,t_sy){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1429>";
	this.p_Transform(t_sx,0.0,0.0,t_sy,0.0,0.0);
	pop_err();
}
c_DrawList.prototype.p_TranslateRotateScale=function(t_tx,t_ty,t_rz,t_sx,t_sy){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1448>";
	this.p_Translate(t_tx,t_ty);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1449>";
	this.p_Rotate(t_rz);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1450>";
	this.p_Scale(t_sx,t_sy);
	pop_err();
}
c_DrawList.prototype.p_PopMatrix=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1470>";
	this.m__matSp-=6;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1470>";
	if(this.m__matSp<0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1470>";
		this.m__matSp+=this.m__matStack.length;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1471>";
	this.m__ix=dbg_array(this.m__matStack,this.m__matSp+0)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1471>";
	this.m__iy=dbg_array(this.m__matStack,this.m__matSp+1)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1472>";
	this.m__jx=dbg_array(this.m__matStack,this.m__matSp+2)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1472>";
	this.m__jy=dbg_array(this.m__matStack,this.m__matSp+3)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1473>";
	this.m__tx=dbg_array(this.m__matStack,this.m__matSp+4)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1473>";
	this.m__ty=dbg_array(this.m__matStack,this.m__matSp+5)[dbg_index];
	pop_err();
}
c_DrawList.prototype.p_AddShadowCaster2=function(t_caster,t_tx,t_ty,t_rz,t_sx,t_sy){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1841>";
	this.p_PushMatrix();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1842>";
	this.p_TranslateRotateScale(t_tx,t_ty,t_rz,t_sx,t_sy);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1843>";
	this.p_AddShadowCaster(t_caster);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1844>";
	this.p_PopMatrix();
	pop_err();
}
c_DrawList.prototype.p_AddShadowCaster3=function(t_caster,t_tx,t_ty,t_rz){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1834>";
	this.p_PushMatrix();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1835>";
	this.p_TranslateRotate(t_tx,t_ty,t_rz);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1836>";
	this.p_AddShadowCaster(t_caster);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1837>";
	this.p_PopMatrix();
	pop_err();
}
c_DrawList.prototype.p_AddShadowCaster4=function(t_caster,t_tx,t_ty){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1827>";
	this.p_PushMatrix();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1828>";
	this.p_Translate(t_tx,t_ty);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1829>";
	this.p_AddShadowCaster(t_caster);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1830>";
	this.p_PopMatrix();
	pop_err();
}
c_DrawList.prototype.p_DrawImage=function(t_image){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1683>";
	this.p_BeginPrim(dbg_object(t_image).m__material,4);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1684>";
	this.p_PrimVert(dbg_object(t_image).m__x0,dbg_object(t_image).m__y0,dbg_object(t_image).m__s0,dbg_object(t_image).m__t0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1685>";
	this.p_PrimVert(dbg_object(t_image).m__x1,dbg_object(t_image).m__y0,dbg_object(t_image).m__s1,dbg_object(t_image).m__t0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1686>";
	this.p_PrimVert(dbg_object(t_image).m__x1,dbg_object(t_image).m__y1,dbg_object(t_image).m__s1,dbg_object(t_image).m__t1);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1687>";
	this.p_PrimVert(dbg_object(t_image).m__x0,dbg_object(t_image).m__y1,dbg_object(t_image).m__s0,dbg_object(t_image).m__t1);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1688>";
	if((dbg_object(t_image).m__caster)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1688>";
		this.p_AddShadowCaster(dbg_object(t_image).m__caster);
	}
	pop_err();
}
c_DrawList.prototype.p_DrawImage2=function(t_image,t_tx,t_ty,t_rz,t_sx,t_sy){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1724>";
	this.p_PushMatrix();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1725>";
	this.p_TranslateRotateScale(t_tx,t_ty,t_rz,t_sx,t_sy);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1726>";
	this.p_DrawImage(t_image);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1727>";
	this.p_PopMatrix();
	pop_err();
}
c_DrawList.prototype.p_DrawImage3=function(t_image,t_tx,t_ty,t_rz){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1706>";
	this.p_PushMatrix();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1707>";
	this.p_TranslateRotate(t_tx,t_ty,t_rz);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1708>";
	this.p_DrawImage(t_image);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1709>";
	this.p_PopMatrix();
	pop_err();
}
c_DrawList.prototype.p_DrawImage4=function(t_image,t_tx,t_ty){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1692>";
	this.p_PushMatrix();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1693>";
	this.p_Translate(t_tx,t_ty);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1694>";
	this.p_DrawImage(t_image);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1695>";
	this.p_PopMatrix();
	pop_err();
}
c_DrawList.prototype.p_SetAlpha=function(t_a){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1372>";
	dbg_array(this.m__color,3)[dbg_index]=t_a;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1373>";
	this.m__alpha=t_a*255.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1374>";
	this.m__pmcolor=((this.m__alpha)|0)<<24|((dbg_array(this.m__color,2)[dbg_index]*this.m__alpha)|0)<<16|((dbg_array(this.m__color,1)[dbg_index]*this.m__alpha)|0)<<8|((dbg_array(this.m__color,0)[dbg_index]*this.m__alpha)|0);
	pop_err();
}
c_DrawList.prototype.p_DrawRect=function(t_x0,t_y0,t_width,t_height,t_material,t_s0,t_t0,t_s1,t_t1){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1619>";
	var t_x1=t_x0+t_width;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1619>";
	var t_y1=t_y0+t_height;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1620>";
	this.p_BeginPrim(t_material,4);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1621>";
	this.p_PrimVert(t_x0,t_y0,t_s0,t_t0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1622>";
	this.p_PrimVert(t_x1,t_y0,t_s1,t_t0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1623>";
	this.p_PrimVert(t_x1,t_y1,t_s1,t_t1);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1624>";
	this.p_PrimVert(t_x0,t_y1,t_s0,t_t1);
	pop_err();
}
c_DrawList.prototype.p_DrawRect2=function(t_x0,t_y0,t_width,t_height,t_image,t_sourceX,t_sourceY,t_sourceWidth,t_sourceHeight){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1636>";
	var t_material=dbg_object(t_image).m__material;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1637>";
	var t_s0=(dbg_object(t_image).m__x+t_sourceX)/(t_material.p_Width());
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1638>";
	var t_t0=(dbg_object(t_image).m__y+t_sourceY)/(t_material.p_Height());
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1639>";
	var t_s1=(dbg_object(t_image).m__x+t_sourceX+t_sourceWidth)/(t_material.p_Width());
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1640>";
	var t_t1=(dbg_object(t_image).m__y+t_sourceY+t_sourceHeight)/(t_material.p_Height());
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1641>";
	this.p_DrawRect(t_x0,t_y0,t_width,t_height,t_material,t_s0,t_t0,t_s1,t_t1);
	pop_err();
}
c_DrawList.prototype.p_DrawRect3=function(t_x,t_y,t_image,t_sourceX,t_sourceY,t_sourceWidth,t_sourceHeight){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1632>";
	this.p_DrawRect2(t_x,t_y,(t_sourceWidth),(t_sourceHeight),t_image,t_sourceX,t_sourceY,t_sourceWidth,t_sourceHeight);
	pop_err();
}
c_DrawList.prototype.p_DrawRect4=function(t_x0,t_y0,t_width,t_height,t_image){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1628>";
	this.p_DrawRect(t_x0,t_y0,t_width,t_height,dbg_object(t_image).m__material,dbg_object(t_image).m__s0,dbg_object(t_image).m__t0,dbg_object(t_image).m__s1,dbg_object(t_image).m__t1);
	pop_err();
}
function c_Canvas(){
	c_DrawList.call(this);
	this.m__dirty=-1;
	this.m__lights=new_object_array(4);
	this.m__seq=0;
	this.m__texture=null;
	this.m__width=0;
	this.m__height=0;
	this.m__twidth=0;
	this.m__theight=0;
	this.m__image=null;
	this.m__viewport=[0,0,640,480];
	this.m__vpx=0;
	this.m__vpy=0;
	this.m__vpw=0;
	this.m__vph=0;
	this.m__scissor=[0,0,10000,10000];
	this.m__scx=0;
	this.m__scy=0;
	this.m__scw=0;
	this.m__sch=0;
	this.m__clsScissor=false;
	this.m__projMatrix=bb_math3d_Mat4New();
	this.m__viewMatrix=bb_math3d_Mat4New();
	this.m__modelMatrix=bb_math3d_Mat4New();
	this.m__ambientLight=[0.0,0.0,0.0,1.0];
	this.m__fogColor=[0.0,0.0,0.0,0.0];
	this.m__shadowMap=null;
	this.m__lineWidth=1.0;
	this.m__colorMask=[true,true,true,true];
}
c_Canvas.prototype=extend_class(c_DrawList);
c_Canvas.prototype.p_Init3=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2524>";
	this.m__dirty=-1;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2525>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2526>";
		dbg_array(this.m__lights,t_i)[dbg_index]=c_LightData.m_new.call(new c_LightData);
	}
	pop_err();
}
c_Canvas.m__active=null;
c_Canvas.prototype.p_Flush=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2443>";
	this.p_FlushPrims();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2445>";
	if(!((this.m__texture)!=null)){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2447>";
	if((dbg_object(this.m__texture).m__flags&256)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2448>";
		this.p_Validate();
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2450>";
		gl.disable(3089);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2451>";
		gl.viewport(0,0,this.m__twidth,this.m__theight);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2453>";
		if(this.m__width==this.m__twidth && this.m__height==this.m__theight){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2454>";
			_glReadPixels(0,0,this.m__twidth,this.m__theight,6408,5121,object_downcast((dbg_object(this.m__texture).m__data),c_DataBuffer),0);
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2456>";
			for(var t_y=0;t_y<this.m__height;t_y=t_y+1){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2457>";
				_glReadPixels(dbg_object(this.m__image).m__x,dbg_object(this.m__image).m__y+t_y,this.m__width,1,6408,5121,object_downcast((dbg_object(this.m__texture).m__data),c_DataBuffer),(dbg_object(this.m__image).m__y+t_y)*(this.m__twidth*4)+dbg_object(this.m__image).m__x*4);
			}
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2461>";
		this.m__dirty|=2;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2464>";
	this.m__texture.p_UpdateMipmaps();
	pop_err();
}
c_Canvas.prototype.p_Validate=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2537>";
	if(this.m__seq!=webglGraphicsSeq){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2538>";
		this.m__seq=webglGraphicsSeq;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2539>";
		bb_graphics2_InitVbos();
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2540>";
		if(!((this.m__texture)!=null)){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2541>";
			this.m__width=bb_app_DeviceWidth();
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2542>";
			this.m__height=bb_app_DeviceHeight();
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2543>";
			this.m__twidth=this.m__width;
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2544>";
			this.m__theight=this.m__height;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2546>";
		this.m__dirty=-1;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2549>";
	if(c_Canvas.m__active==this){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2550>";
		if(!((this.m__dirty)!=0)){
			pop_err();
			return;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2552>";
		if((c_Canvas.m__active)!=null){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2552>";
			c_Canvas.m__active.p_Flush();
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2553>";
		c_Canvas.m__active=this;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2554>";
		this.m__dirty=-1;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2559>";
	if((this.m__dirty&1)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2561>";
		if((this.m__texture)!=null){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2562>";
			_glBindFramebuffer(36160,this.m__texture.p_GLFramebuffer());
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2564>";
			_glBindFramebuffer(36160,bb_graphics2_defaultFbo);
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2568>";
	if((this.m__dirty&2)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2570>";
		if(!((this.m__texture)!=null)){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2571>";
			this.m__width=bb_app_DeviceWidth();
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2572>";
			this.m__height=bb_app_DeviceHeight();
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2573>";
			this.m__twidth=this.m__width;
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2574>";
			this.m__theight=this.m__height;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2577>";
		this.m__vpx=dbg_array(this.m__viewport,0)[dbg_index];
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2577>";
		this.m__vpy=dbg_array(this.m__viewport,1)[dbg_index];
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2577>";
		this.m__vpw=dbg_array(this.m__viewport,2)[dbg_index];
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2577>";
		this.m__vph=dbg_array(this.m__viewport,3)[dbg_index];
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2578>";
		if((this.m__image)!=null){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2579>";
			this.m__vpx+=dbg_object(this.m__image).m__x;
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2580>";
			this.m__vpy+=dbg_object(this.m__image).m__y;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2583>";
		this.m__scx=dbg_array(this.m__scissor,0)[dbg_index];
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2583>";
		this.m__scy=dbg_array(this.m__scissor,1)[dbg_index];
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2583>";
		this.m__scw=dbg_array(this.m__scissor,2)[dbg_index];
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2583>";
		this.m__sch=dbg_array(this.m__scissor,3)[dbg_index];
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2585>";
		if(this.m__scx<0){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2585>";
			this.m__scx=0;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2585>";
			if(this.m__scx>this.m__vpw){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2585>";
				this.m__scx=this.m__vpw;
			}
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2586>";
		if(this.m__scw<0){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2586>";
			this.m__scw=0;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2586>";
			if(this.m__scx+this.m__scw>this.m__vpw){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2586>";
				this.m__scw=this.m__vpw-this.m__scx;
			}
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2588>";
		if(this.m__scy<0){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2588>";
			this.m__scy=0;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2588>";
			if(this.m__scy>this.m__vph){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2588>";
				this.m__scy=this.m__vph;
			}
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2589>";
		if(this.m__sch<0){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2589>";
			this.m__sch=0;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2589>";
			if(this.m__scy+this.m__sch>this.m__vph){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2589>";
				this.m__sch=this.m__vph-this.m__scy;
			}
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2591>";
		this.m__scx+=this.m__vpx;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2591>";
		this.m__scy+=this.m__vpy;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2593>";
		if(!((this.m__texture)!=null)){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2594>";
			this.m__vpy=this.m__theight-this.m__vpy-this.m__vph;
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2595>";
			this.m__scy=this.m__theight-this.m__scy-this.m__sch;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2598>";
		gl.viewport(this.m__vpx,this.m__vpy,this.m__vpw,this.m__vph);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2600>";
		if(this.m__scx!=this.m__vpx || this.m__scy!=this.m__vpy || this.m__scw!=this.m__vpw || this.m__sch!=this.m__vph){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2601>";
			gl.enable(3089);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2602>";
			gl.scissor(this.m__scx,this.m__scy,this.m__scw,this.m__sch);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2603>";
			this.m__clsScissor=false;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2605>";
			gl.disable(3089);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2606>";
			this.m__clsScissor=this.m__scx!=0 || this.m__scy!=0 || this.m__vpw!=this.m__twidth || this.m__vph!=this.m__theight;
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2611>";
	if((this.m__dirty&4)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2613>";
		bb_graphics2_rs_program=null;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2615>";
		if((this.m__texture)!=null){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2616>";
			dbg_array(bb_graphics2_rs_clipPosScale,1)[dbg_index]=1.0;
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2617>";
			bb_math3d_Mat4Copy(this.m__projMatrix,bb_graphics2_rs_projMatrix);
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2619>";
			dbg_array(bb_graphics2_rs_clipPosScale,1)[dbg_index]=-1.0;
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2620>";
			bb_math3d_Mat4Multiply(bb_graphics2_flipYMatrix,this.m__projMatrix,bb_graphics2_rs_projMatrix);
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2623>";
		bb_math3d_Mat4Multiply(this.m__viewMatrix,this.m__modelMatrix,bb_graphics2_rs_modelViewMatrix);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2624>";
		bb_math3d_Mat4Multiply(bb_graphics2_rs_projMatrix,bb_graphics2_rs_modelViewMatrix,bb_graphics2_rs_modelViewProjMatrix);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2625>";
		bb_math3d_Vec4Copy(this.m__ambientLight,bb_graphics2_rs_ambientLight);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2626>";
		bb_math3d_Vec4Copy(this.m__fogColor,bb_graphics2_rs_fogColor);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2628>";
		bb_graphics2_rs_numLights=0;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2629>";
		for(var t_i=0;t_i<4;t_i=t_i+1){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2631>";
			var t_light=dbg_array(this.m__lights,t_i)[dbg_index];
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2632>";
			if(!((dbg_object(t_light).m_type)!=0)){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2632>";
				continue;
			}
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2634>";
			bb_math3d_Mat4Transform(this.m__viewMatrix,dbg_object(t_light).m_vector,dbg_object(t_light).m_tvector);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2636>";
			dbg_array(bb_graphics2_rs_lightColors,bb_graphics2_rs_numLights*4+0)[dbg_index]=dbg_array(dbg_object(t_light).m_color,0)[dbg_index];
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2637>";
			dbg_array(bb_graphics2_rs_lightColors,bb_graphics2_rs_numLights*4+1)[dbg_index]=dbg_array(dbg_object(t_light).m_color,1)[dbg_index];
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2638>";
			dbg_array(bb_graphics2_rs_lightColors,bb_graphics2_rs_numLights*4+2)[dbg_index]=dbg_array(dbg_object(t_light).m_color,2)[dbg_index];
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2639>";
			dbg_array(bb_graphics2_rs_lightColors,bb_graphics2_rs_numLights*4+3)[dbg_index]=dbg_array(dbg_object(t_light).m_color,3)[dbg_index];
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2641>";
			dbg_array(bb_graphics2_rs_lightVectors,bb_graphics2_rs_numLights*4+0)[dbg_index]=dbg_array(dbg_object(t_light).m_tvector,0)[dbg_index];
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2642>";
			dbg_array(bb_graphics2_rs_lightVectors,bb_graphics2_rs_numLights*4+1)[dbg_index]=dbg_array(dbg_object(t_light).m_tvector,1)[dbg_index];
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2643>";
			dbg_array(bb_graphics2_rs_lightVectors,bb_graphics2_rs_numLights*4+2)[dbg_index]=dbg_array(dbg_object(t_light).m_tvector,2)[dbg_index];
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2644>";
			dbg_array(bb_graphics2_rs_lightVectors,bb_graphics2_rs_numLights*4+3)[dbg_index]=dbg_object(t_light).m_range;
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2646>";
			bb_graphics2_rs_numLights+=1;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2649>";
		if((this.m__shadowMap)!=null){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2650>";
			bb_graphics2_rs_shadowTexture=dbg_object(dbg_object(this.m__shadowMap).m__material).m__colorTexture;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2652>";
			bb_graphics2_rs_shadowTexture=null;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2655>";
		bb_graphics2_rs_blend=-1;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2659>";
	if((this.m__dirty&8)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2660>";
		gl.lineWidth(this.m__lineWidth);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2663>";
	if((this.m__dirty&16)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2664>";
		gl.colorMask(dbg_array(this.m__colorMask,0)[dbg_index],dbg_array(this.m__colorMask,1)[dbg_index],dbg_array(this.m__colorMask,2)[dbg_index],dbg_array(this.m__colorMask,3)[dbg_index]);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2667>";
	this.m__dirty=0;
	pop_err();
}
c_Canvas.prototype.p_FlushPrims=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2531>";
	if(c_DrawList.prototype.p_IsEmpty.call(this)){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2532>";
	this.p_Validate();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2533>";
	c_DrawList.prototype.p_Flush.call(this);
	pop_err();
}
c_Canvas.prototype.p_SetRenderTarget=function(t_target){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2094>";
	this.p_FlushPrims();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2096>";
	if(!((t_target)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2098>";
		this.m__image=null;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2099>";
		this.m__texture=null;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2100>";
		this.m__width=bb_app_DeviceWidth();
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2101>";
		this.m__height=bb_app_DeviceHeight();
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2102>";
		this.m__twidth=this.m__width;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2103>";
		this.m__theight=this.m__height;
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2105>";
		if((object_downcast((t_target),c_Image2))!=null){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2107>";
			this.m__image=object_downcast((t_target),c_Image2);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2108>";
			this.m__texture=this.m__image.p_Material().p_ColorTexture();
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2109>";
			if(!((this.m__texture.p_Flags()&16)!=0)){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2109>";
				error("Texture is not a render target texture");
			}
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2110>";
			this.m__width=this.m__image.p_Width();
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2111>";
			this.m__height=this.m__image.p_Height();
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2112>";
			this.m__twidth=this.m__texture.p_Width();
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2113>";
			this.m__theight=this.m__texture.p_Height();
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2115>";
			if((object_downcast((t_target),c_Texture))!=null){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2117>";
				this.m__image=null;
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2118>";
				this.m__texture=object_downcast((t_target),c_Texture);
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2119>";
				if(!((this.m__texture.p_Flags()&16)!=0)){
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2119>";
					error("Texture is not a render target texture");
				}
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2120>";
				this.m__width=this.m__texture.p_Width();
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2121>";
				this.m__height=this.m__texture.p_Height();
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2122>";
				this.m__twidth=this.m__texture.p_Width();
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2123>";
				this.m__theight=this.m__texture.p_Height();
			}else{
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2127>";
				error("RenderTarget object must an Image, a Texture or Null");
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2131>";
	this.m__dirty=-1;
	pop_err();
}
c_Canvas.prototype.p_SetViewport=function(t_x,t_y,t_w,t_h){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2161>";
	this.p_FlushPrims();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2162>";
	dbg_array(this.m__viewport,0)[dbg_index]=t_x;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2163>";
	dbg_array(this.m__viewport,1)[dbg_index]=t_y;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2164>";
	dbg_array(this.m__viewport,2)[dbg_index]=t_w;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2165>";
	dbg_array(this.m__viewport,3)[dbg_index]=t_h;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2166>";
	this.m__dirty|=2;
	pop_err();
}
c_Canvas.prototype.p_SetProjection2d=function(t_left,t_right,t_top,t_bottom,t_znear,t_zfar){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2197>";
	this.p_FlushPrims();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2198>";
	bb_math3d_Mat4Ortho(t_left,t_right,t_top,t_bottom,t_znear,t_zfar,this.m__projMatrix);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2199>";
	this.m__dirty|=4;
	pop_err();
}
c_Canvas.m_new=function(t_target){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2082>";
	c_DrawList.m_new.call(this);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2083>";
	this.p_Init3();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2084>";
	this.p_SetRenderTarget(t_target);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2085>";
	this.p_SetViewport(0,0,this.m__width,this.m__height);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2086>";
	this.p_SetProjection2d(0.0,(this.m__width),0.0,(this.m__height),-1.0,1.0);
	pop_err();
	return this;
}
c_Canvas.prototype.p_Clear=function(t_r,t_g,t_b,t_a){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2333>";
	this.p_FlushPrims();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2334>";
	this.p_Validate();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2335>";
	if(this.m__clsScissor){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2336>";
		gl.enable(3089);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2337>";
		gl.scissor(this.m__vpx,this.m__vpy,this.m__vpw,this.m__vph);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2339>";
	gl.clearColor(t_r,t_g,t_b,t_a);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2340>";
	gl.clear(16384);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2341>";
	if(this.m__clsScissor){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<2341>";
		gl.disable(3089);
	}
	pop_err();
}
var bb_graphics2_inited=false;
var bb_graphics2_vbosSeq=0;
var bb_graphics2_rs_vbo=0;
function c_DataBuffer(){
	BBDataBuffer.call(this);
}
c_DataBuffer.prototype=extend_class(BBDataBuffer);
c_DataBuffer.m_new=function(t_length,t_direct){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/brl/databuffer.monkey<102>";
	if(!this._New(t_length)){
		err_info="F:/progs/gamedev/monkey/modules/brl/databuffer.monkey<102>";
		error("Allocate DataBuffer failed");
	}
	pop_err();
	return this;
}
c_DataBuffer.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/brl/databuffer.monkey<96>";
	pop_err();
	return this;
}
c_DataBuffer.prototype.p_CopyBytes=function(t_address,t_dst,t_dstaddress,t_count){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/brl/databuffer.monkey<123>";
	if(t_address+t_count>this.Length()){
		err_info="F:/progs/gamedev/monkey/modules/brl/databuffer.monkey<123>";
		t_count=this.Length()-t_address;
	}
	err_info="F:/progs/gamedev/monkey/modules/brl/databuffer.monkey<124>";
	if(t_dstaddress+t_count>t_dst.Length()){
		err_info="F:/progs/gamedev/monkey/modules/brl/databuffer.monkey<124>";
		t_count=t_dst.Length()-t_dstaddress;
	}
	err_info="F:/progs/gamedev/monkey/modules/brl/databuffer.monkey<126>";
	if(t_dstaddress<=t_address){
		err_info="F:/progs/gamedev/monkey/modules/brl/databuffer.monkey<127>";
		for(var t_i=0;t_i<t_count;t_i=t_i+1){
			err_info="F:/progs/gamedev/monkey/modules/brl/databuffer.monkey<128>";
			t_dst.PokeByte(t_dstaddress+t_i,this.PeekByte(t_address+t_i));
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/brl/databuffer.monkey<131>";
		for(var t_i2=t_count-1;t_i2>=0;t_i2=t_i2+-1){
			err_info="F:/progs/gamedev/monkey/modules/brl/databuffer.monkey<132>";
			t_dst.PokeByte(t_dstaddress+t_i2,this.PeekByte(t_address+t_i2));
		}
	}
	pop_err();
}
var bb_graphics2_rs_ibo=0;
function bb_graphics2_InitVbos(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<116>";
	if(bb_graphics2_vbosSeq==webglGraphicsSeq){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<117>";
	bb_graphics2_vbosSeq=webglGraphicsSeq;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<121>";
	bb_graphics2_rs_vbo=gl.createBuffer();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<122>";
	_glBindBuffer(34962,bb_graphics2_rs_vbo);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<123>";
	_glBufferData(34962,65520,null,35040);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<124>";
	gl.enableVertexAttribArray(0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<124>";
	gl.vertexAttribPointer(0,2,5126,false,28,0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<125>";
	gl.enableVertexAttribArray(1);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<125>";
	gl.vertexAttribPointer(1,2,5126,false,28,8);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<126>";
	gl.enableVertexAttribArray(2);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<126>";
	gl.vertexAttribPointer(2,2,5126,false,28,16);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<127>";
	gl.enableVertexAttribArray(3);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<127>";
	gl.vertexAttribPointer(3,4,5121,true,28,24);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<129>";
	bb_graphics2_rs_ibo=gl.createBuffer();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<130>";
	_glBindBuffer(34963,bb_graphics2_rs_ibo);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<131>";
	var t_idxs=c_DataBuffer.m_new.call(new c_DataBuffer,28080,true);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<132>";
	for(var t_j=0;t_j<4;t_j=t_j+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<133>";
		var t_k=t_j*3510*2;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<134>";
		for(var t_i=0;t_i<585;t_i=t_i+1){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<135>";
			t_idxs.PokeShort(t_i*12+t_k+0,t_i*4+t_j+0);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<136>";
			t_idxs.PokeShort(t_i*12+t_k+2,t_i*4+t_j+1);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<137>";
			t_idxs.PokeShort(t_i*12+t_k+4,t_i*4+t_j+2);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<138>";
			t_idxs.PokeShort(t_i*12+t_k+6,t_i*4+t_j+0);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<139>";
			t_idxs.PokeShort(t_i*12+t_k+8,t_i*4+t_j+2);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<140>";
			t_idxs.PokeShort(t_i*12+t_k+10,t_i*4+t_j+3);
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<143>";
	_glBufferData(34963,t_idxs.Length(),t_idxs,35044);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<144>";
	t_idxs.Discard();
	pop_err();
}
var bb_graphics2_tmpi=[];
var bb_graphics2_defaultFbo=0;
function bb_app_LoadString(t_path){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/app.monkey<220>";
	var t_=bb_app__game.LoadString(bb_data_FixDataPath(t_path));
	pop_err();
	return t_;
}
var bb_graphics2_mainShader="";
function c_Shader(){
	Object.call(this);
	this.m__source="";
	this.m__vsource="";
	this.m__fsource="";
	this.m__uniforms=c_StringSet.m_new.call(new c_StringSet);
	this.m__glPrograms=new_object_array(5);
	this.m__defaultMaterial=null;
	this.m__seq=0;
}
c_Shader.prototype.p_Build=function(t_numLights){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<685>";
	var t_defs="";
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<686>";
	t_defs=t_defs+("#define NUM_LIGHTS "+String(t_numLights)+"\n");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<688>";
	var t_vshader=bb_glutil_glCompile(35633,t_defs+this.m__vsource);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<689>";
	var t_fshader=bb_glutil_glCompile(35632,t_defs+this.m__fsource);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<691>";
	var t_program=gl.createProgram();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<692>";
	gl.attachShader(t_program,t_vshader);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<693>";
	gl.attachShader(t_program,t_fshader);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<694>";
	gl.deleteShader(t_vshader);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<695>";
	gl.deleteShader(t_fshader);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<697>";
	gl.bindAttribLocation(t_program,0,"Position");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<698>";
	gl.bindAttribLocation(t_program,1,"Texcoord0");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<699>";
	gl.bindAttribLocation(t_program,2,"Tangent");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<700>";
	gl.bindAttribLocation(t_program,3,"Color");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<702>";
	bb_glutil_glLink(t_program);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<705>";
	var t_matuniforms=c_Stack2.m_new.call(new c_Stack2);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<706>";
	var t_size=new_number_array(1);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<706>";
	var t_type=new_number_array(1);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<706>";
	var t_name=new_string_array(1);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<707>";
	_glGetProgramiv(t_program,35718,bb_graphics2_tmpi);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<708>";
	for(var t_i=0;t_i<dbg_array(bb_graphics2_tmpi,0)[dbg_index];t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<709>";
		_glGetActiveUniform(t_program,t_i,t_size,t_type,t_name);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<710>";
		if(this.m__uniforms.p_Contains2(dbg_array(t_name,0)[dbg_index])){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<711>";
			var t_location=_glGetUniformLocation(t_program,dbg_array(t_name,0)[dbg_index]);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<712>";
			if(t_location==-1){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<712>";
				continue;
			}
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<713>";
			t_matuniforms.p_Push4(c_GLUniform.m_new.call(new c_GLUniform,dbg_array(t_name,0)[dbg_index],t_location,dbg_array(t_size,0)[dbg_index],dbg_array(t_type,0)[dbg_index]));
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<718>";
	var t_=c_GLProgram.m_new.call(new c_GLProgram,t_program,t_matuniforms.p_ToArray());
	pop_err();
	return t_;
}
c_Shader.prototype.p_Build2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<723>";
	bb_graphics2_InitMojo2();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<725>";
	var t_p=c_GlslParser.m_new.call(new c_GlslParser,this.m__source);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<727>";
	var t_vars=c_StringSet.m_new.call(new c_StringSet);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<729>";
	while((t_p.p_Toke()).length!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<731>";
		if(t_p.p_CParse("uniform")){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<733>";
			var t_ty=t_p.p_ParseType();
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<734>";
			var t_id=t_p.p_ParseIdent();
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<735>";
			t_p.p_Parse2(";");
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<736>";
			this.m__uniforms.p_Insert2(t_id);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<738>";
			continue;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<741>";
		var t_id2=t_p.p_CParseIdent();
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<742>";
		if((t_id2).length!=0){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<743>";
			if(string_startswith(t_id2,"gl_")){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<744>";
				t_vars.p_Insert2("B3D_"+t_id2.toUpperCase());
			}else{
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<745>";
				if(string_startswith(t_id2,"b3d_")){
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<746>";
					t_vars.p_Insert2(t_id2.toUpperCase());
				}
			}
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<748>";
			continue;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<751>";
		t_p.p_Bump();
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<754>";
	var t_vardefs="";
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<755>";
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<755>";
	var t_=t_vars.p_ObjectEnumerator();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<755>";
	while(t_.p_HasNext()){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<755>";
		var t_var=t_.p_NextObject();
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<756>";
		t_vardefs=t_vardefs+("#define "+t_var+" 1\n");
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<761>";
	var t_source=bb_graphics2_mainShader;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<762>";
	var t_i0=t_source.indexOf("//@vertex",0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<763>";
	if(t_i0==-1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<763>";
		error("Can't find //@vertex chunk");
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<764>";
	var t_i1=t_source.indexOf("//@fragment",0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<765>";
	if(t_i1==-1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<765>";
		error("Can't find //@fragment chunk");
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<767>";
	var t_header=t_vardefs+t_source.slice(0,t_i0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<768>";
	this.m__vsource=t_header+t_source.slice(t_i0,t_i1);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<769>";
	this.m__fsource=t_header+string_replace(t_source.slice(t_i1),"${SHADER}",this.m__source);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<771>";
	for(var t_numLights=0;t_numLights<=4;t_numLights=t_numLights+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<773>";
		dbg_array(this.m__glPrograms,t_numLights)[dbg_index]=this.p_Build(t_numLights);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<775>";
		if(((t_numLights)!=0) || t_vars.p_Contains2("B3D_DIFFUSE") || t_vars.p_Contains2("B3D_SPECULAR")){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<775>";
			continue;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<777>";
		for(var t_i=1;t_i<=4;t_i=t_i+1){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<778>";
			dbg_array(this.m__glPrograms,t_i)[dbg_index]=dbg_array(this.m__glPrograms,0)[dbg_index];
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<781>";
		break;
	}
	pop_err();
}
c_Shader.prototype.p_Build3=function(t_source){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<630>";
	this.m__source=t_source;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<631>";
	this.p_Build2();
	pop_err();
}
c_Shader.m_new=function(t_source){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<590>";
	this.p_Build3(t_source);
	pop_err();
	return this;
}
c_Shader.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<587>";
	pop_err();
	return this;
}
c_Shader.prototype.p_OnInitMaterial=function(t_material){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<635>";
	t_material.p_SetTexture("ColorTexture",c_Texture.m_White());
	pop_err();
}
c_Shader.prototype.p_OnLoadMaterial=function(t_material,t_path,t_texFlags){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<639>";
	var t_texture=c_Texture.m_Load(t_path,4,t_texFlags);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<640>";
	if(!((t_texture)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<640>";
		pop_err();
		return null;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<641>";
	t_material.p_SetTexture("ColorTexture",t_texture);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<642>";
	if((t_texture)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<642>";
		t_texture.p_Release();
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<643>";
	pop_err();
	return t_material;
}
c_Shader.prototype.p_DefaultMaterial=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<594>";
	if(!((this.m__defaultMaterial)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<594>";
		this.m__defaultMaterial=c_Material.m_new.call(new c_Material,this);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<595>";
	pop_err();
	return this.m__defaultMaterial;
}
c_Shader.prototype.p_GLProgram=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<674>";
	if(this.m__seq!=webglGraphicsSeq){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<675>";
		this.m__seq=webglGraphicsSeq;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<676>";
		bb_graphics2_rs_program=null;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<677>";
		this.p_Build2();
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<680>";
	pop_err();
	return dbg_array(this.m__glPrograms,bb_graphics2_rs_numLights)[dbg_index];
}
c_Shader.prototype.p_Bind=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<662>";
	var t_program=this.p_GLProgram();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<664>";
	if(t_program==bb_graphics2_rs_program){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<666>";
	bb_graphics2_rs_program=t_program;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<667>";
	bb_graphics2_rs_material=null;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<669>";
	t_program.p_Bind();
	pop_err();
}
function c_GLProgram(){
	Object.call(this);
	this.m_program=0;
	this.m_matuniforms=[];
	this.m_mvpMatrix=0;
	this.m_mvMatrix=0;
	this.m_clipPosScale=0;
	this.m_globalColor=0;
	this.m_fogColor=0;
	this.m_ambientLight=0;
	this.m_lightColors=0;
	this.m_lightVectors=0;
	this.m_shadowTexture=0;
}
c_GLProgram.m_new=function(t_program,t_matuniforms){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<547>";
	dbg_object(this).m_program=t_program;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<548>";
	dbg_object(this).m_matuniforms=t_matuniforms;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<549>";
	this.m_mvpMatrix=_glGetUniformLocation(t_program,"ModelViewProjectionMatrix");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<550>";
	this.m_mvMatrix=_glGetUniformLocation(t_program,"ModelViewMatrix");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<551>";
	this.m_clipPosScale=_glGetUniformLocation(t_program,"ClipPosScale");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<552>";
	this.m_globalColor=_glGetUniformLocation(t_program,"GlobalColor");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<553>";
	this.m_fogColor=_glGetUniformLocation(t_program,"FogColor");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<554>";
	this.m_ambientLight=_glGetUniformLocation(t_program,"AmbientLight");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<555>";
	this.m_lightColors=_glGetUniformLocation(t_program,"LightColors");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<556>";
	this.m_lightVectors=_glGetUniformLocation(t_program,"LightVectors");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<557>";
	this.m_shadowTexture=_glGetUniformLocation(t_program,"ShadowTexture");
	pop_err();
	return this;
}
c_GLProgram.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<531>";
	pop_err();
	return this;
}
c_GLProgram.prototype.p_Bind=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<563>";
	gl.useProgram(this.m_program);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<565>";
	if(this.m_mvpMatrix!=-1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<565>";
		_glUniformMatrix4fv(this.m_mvpMatrix,1,false,bb_graphics2_rs_modelViewProjMatrix);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<566>";
	if(this.m_mvMatrix!=-1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<566>";
		_glUniformMatrix4fv(this.m_mvMatrix,1,false,bb_graphics2_rs_modelViewMatrix);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<567>";
	if(this.m_clipPosScale!=-1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<567>";
		_glUniform4fv(this.m_clipPosScale,1,bb_graphics2_rs_clipPosScale);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<568>";
	if(this.m_globalColor!=-1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<568>";
		_glUniform4fv(this.m_globalColor,1,bb_graphics2_rs_globalColor);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<569>";
	if(this.m_fogColor!=-1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<569>";
		_glUniform4fv(this.m_fogColor,1,bb_graphics2_rs_fogColor);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<570>";
	if(this.m_ambientLight!=-1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<570>";
		_glUniform4fv(this.m_ambientLight,1,bb_graphics2_rs_ambientLight);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<571>";
	if(this.m_lightColors!=-1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<571>";
		_glUniform4fv(this.m_lightColors,bb_graphics2_rs_numLights,bb_graphics2_rs_lightColors);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<572>";
	if(this.m_lightVectors!=-1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<572>";
		_glUniform4fv(this.m_lightVectors,bb_graphics2_rs_numLights,bb_graphics2_rs_lightVectors);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<573>";
	if(this.m_shadowTexture!=-1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<574>";
		var t_tex=bb_graphics2_rs_shadowTexture;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<575>";
		if(!((t_tex)!=null)){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<575>";
			t_tex=c_Texture.m_White();
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<576>";
		gl.activeTexture(33991);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<577>";
		_glBindTexture(3553,t_tex.p_GLTexture());
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<578>";
		gl.activeTexture(33984);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<579>";
		gl.uniform1i(this.m_shadowTexture,7);
	}
	pop_err();
}
var bb_glutil_tmpi=[];
function bb_glutil_glCompile(t_type,t_source){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<37>";
	t_source="precision mediump float;\n"+t_source;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<40>";
	var t_shader=gl.createShader(t_type);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<41>";
	gl.shaderSource(t_shader,t_source);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<42>";
	gl.compileShader(t_shader);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<43>";
	_glGetShaderiv(t_shader,35713,bb_glutil_tmpi);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<44>";
	if(!((dbg_array(bb_glutil_tmpi,0)[dbg_index])!=0)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<45>";
		print("Failed to compile fragment shader:"+gl.getShaderInfoLog(t_shader));
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<46>";
		var t_lines=t_source.split("\n");
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<47>";
		for(var t_i=0;t_i<t_lines.length;t_i=t_i+1){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<48>";
			print(String(t_i+1)+":\t"+dbg_array(t_lines,t_i)[dbg_index]);
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<50>";
		error("Compile fragment shader failed");
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<52>";
	pop_err();
	return t_shader;
}
function bb_glutil_glLink(t_program){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<57>";
	gl.linkProgram(t_program);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<58>";
	_glGetProgramiv(t_program,35714,bb_glutil_tmpi);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<59>";
	if(!((dbg_array(bb_glutil_tmpi,0)[dbg_index])!=0)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<59>";
		error("Failed to link program:"+gl.getProgramInfoLog(t_program));
	}
	pop_err();
}
function c_GLUniform(){
	Object.call(this);
	this.m_name="";
	this.m_location=0;
	this.m_size=0;
	this.m_type=0;
}
c_GLUniform.m_new=function(t_name,t_location,t_size,t_type){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<523>";
	dbg_object(this).m_name=t_name;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<524>";
	dbg_object(this).m_location=t_location;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<525>";
	dbg_object(this).m_size=t_size;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<526>";
	dbg_object(this).m_type=t_type;
	pop_err();
	return this;
}
c_GLUniform.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<516>";
	pop_err();
	return this;
}
function c_Stack2(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack2.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack2.m_new2=function(t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack2.prototype.p_Push4=function(t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<71>";
	if(this.m_length==this.m_data.length){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<72>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<74>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<75>";
	this.m_length+=1;
	pop_err();
}
c_Stack2.prototype.p_Push5=function(t_values,t_offset,t_count){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<83>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<84>";
		this.p_Push4(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack2.prototype.p_Push6=function(t_values,t_offset){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<79>";
	this.p_Push5(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack2.prototype.p_ToArray=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<18>";
	var t_t=new_object_array(this.m_length);
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<19>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<20>";
		dbg_array(t_t,t_i)[dbg_index]=dbg_array(this.m_data,t_i)[dbg_index];
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<22>";
	pop_err();
	return t_t;
}
function c_Set(){
	Object.call(this);
	this.m_map=null;
}
c_Set.m_new=function(t_map){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/set.monkey<16>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_Set.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/set.monkey<13>";
	pop_err();
	return this;
}
c_Set.prototype.p_Contains2=function(t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/set.monkey<32>";
	var t_=this.m_map.p_Contains2(t_value);
	pop_err();
	return t_;
}
c_Set.prototype.p_Insert2=function(t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/set.monkey<36>";
	this.m_map.p_Insert3(t_value,null);
	pop_err();
	return 0;
}
c_Set.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/set.monkey<44>";
	var t_=this.m_map.p_Keys().p_ObjectEnumerator();
	pop_err();
	return t_;
}
function c_StringSet(){
	c_Set.call(this);
}
c_StringSet.prototype=extend_class(c_Set);
c_StringSet.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/set.monkey<69>";
	c_Set.m_new.call(this,(c_StringMap.m_new.call(new c_StringMap)));
	pop_err();
	return this;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map2.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map2.prototype.p_Contains2=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<25>";
	var t_=this.p_FindNode2(t_key)!=null;
	pop_err();
	return t_;
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<223>";
					this.p_RotateLeft2(t_node);
				}
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<227>";
				this.p_RotateRight2(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<239>";
					this.p_RotateRight2(t_node);
				}
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<243>";
				this.p_RotateLeft2(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map2.prototype.p_Set2=function(t_key,t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<45>";
	t_node=c_Node2.m_new.call(new c_Node2,t_key,t_value,-1,t_parent);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<53>";
		this.p_InsertFixup2(t_node);
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map2.prototype.p_Insert3=function(t_key,t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<146>";
	var t_=this.p_Set2(t_key,t_value);
	pop_err();
	return t_;
}
c_Map2.prototype.p_Keys=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<113>";
	var t_=c_MapKeys.m_new.call(new c_MapKeys,this);
	pop_err();
	return t_;
}
c_Map2.prototype.p_FirstNode=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<125>";
	if(!((this.m_root)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<125>";
		pop_err();
		return null;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<127>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<128>";
	while((dbg_object(t_node).m_left)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<129>";
		t_node=dbg_object(t_node).m_left;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<131>";
	pop_err();
	return t_node;
}
function c_StringMap(){
	c_Map2.call(this);
}
c_StringMap.prototype=extend_class(c_Map2);
c_StringMap.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<551>";
	c_Map2.m_new.call(this);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node2(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node2.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node2.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
c_Node2.prototype.p_NextNode=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<385>";
	var t_node=null;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<386>";
	if((this.m_right)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<387>";
		t_node=this.m_right;
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<388>";
		while((dbg_object(t_node).m_left)!=null){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<389>";
			t_node=dbg_object(t_node).m_left;
		}
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<391>";
		pop_err();
		return t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<393>";
	t_node=this;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<394>";
	var t_parent=dbg_object(this).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).m_right){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<396>";
		t_node=t_parent;
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<397>";
		t_parent=dbg_object(t_parent).m_parent;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<399>";
	pop_err();
	return t_parent;
}
function c_Parser(){
	Object.call(this);
	this.m__text="";
	this.m__pos=0;
	this.m__len=0;
	this.m__toke="";
	this.m__tokeType=0;
}
c_Parser.prototype.p_Bump=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<43>";
	while(this.m__pos<this.m__len){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<44>";
		var t_ch=dbg_charCodeAt(this.m__text,this.m__pos);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<45>";
		if(t_ch<=32){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<46>";
			this.m__pos+=1;
			err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<47>";
			continue;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<49>";
		if(t_ch!=39){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<49>";
			break;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<50>";
		this.m__pos+=1;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<51>";
		while(this.m__pos<this.m__len && dbg_charCodeAt(this.m__text,this.m__pos)!=10){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<52>";
			this.m__pos+=1;
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<56>";
	if(this.m__pos==this.m__len){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<57>";
		this.m__toke="";
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<58>";
		this.m__tokeType=0;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<59>";
		pop_err();
		return this.m__toke;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<62>";
	var t_pos=this.m__pos;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<63>";
	var t_ch2=dbg_charCodeAt(this.m__text,this.m__pos);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<64>";
	this.m__pos+=1;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<66>";
	if(bb_glslparser_IsAlpha(t_ch2) || t_ch2==95){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<68>";
		while(this.m__pos<this.m__len){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<69>";
			var t_ch3=dbg_charCodeAt(this.m__text,this.m__pos);
			err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<70>";
			if(!bb_glslparser_IsIdent(t_ch3)){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<70>";
				break;
			}
			err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<71>";
			this.m__pos+=1;
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<73>";
		this.m__tokeType=1;
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<75>";
		if(bb_glslparser_IsDigit(t_ch2)){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<77>";
			while(this.m__pos<this.m__len){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<78>";
				if(!bb_glslparser_IsDigit(dbg_charCodeAt(this.m__text,this.m__pos))){
					err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<78>";
					break;
				}
				err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<79>";
				this.m__pos+=1;
			}
			err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<81>";
			this.m__tokeType=2;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<83>";
			if(t_ch2==34){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<85>";
				while(this.m__pos<this.m__len){
					err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<86>";
					var t_ch4=dbg_charCodeAt(this.m__text,this.m__pos);
					err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<87>";
					if(t_ch4==34){
						err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<87>";
						break;
					}
					err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<88>";
					this.m__pos+=1;
				}
				err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<90>";
				if(this.m__pos==this.m__len){
					err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<90>";
					error("String literal missing closing quote");
				}
				err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<91>";
				this.m__tokeType=4;
				err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<92>";
				this.m__pos+=1;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<95>";
				var t_digraphs=[":="];
				err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<96>";
				if(this.m__pos<this.m__len){
					err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<97>";
					var t_ch5=dbg_charCodeAt(this.m__text,this.m__pos);
					err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<98>";
					err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<98>";
					var t_=t_digraphs;
					err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<98>";
					var t_2=0;
					err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<98>";
					while(t_2<t_.length){
						err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<98>";
						var t_t=dbg_array(t_,t_2)[dbg_index];
						err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<98>";
						t_2=t_2+1;
						err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<99>";
						if(t_ch5==dbg_charCodeAt(t_t,1)){
							err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<100>";
							this.m__pos+=1;
							err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<101>";
							break;
						}
					}
				}
				err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<105>";
				this.m__tokeType=5;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<108>";
	this.m__toke=this.m__text.slice(t_pos,this.m__pos);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<110>";
	pop_err();
	return this.m__toke;
}
c_Parser.prototype.p_SetText=function(t_text){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<35>";
	this.m__text=t_text;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<36>";
	this.m__pos=0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<37>";
	this.m__len=this.m__text.length;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<38>";
	this.p_Bump();
	pop_err();
}
c_Parser.m_new=function(t_text){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<31>";
	this.p_SetText(t_text);
	pop_err();
	return this;
}
c_Parser.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<28>";
	pop_err();
	return this;
}
c_Parser.prototype.p_Toke=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<114>";
	pop_err();
	return this.m__toke;
}
c_Parser.prototype.p_CParse=function(t_toke){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<122>";
	if(this.m__toke!=t_toke){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<122>";
		pop_err();
		return false;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<123>";
	this.p_Bump();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<124>";
	pop_err();
	return true;
}
c_Parser.prototype.p_CParseIdent=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<128>";
	if(this.m__tokeType!=1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<128>";
		pop_err();
		return "";
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<129>";
	var t_id=this.m__toke;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<130>";
	this.p_Bump();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<131>";
	pop_err();
	return t_id;
}
c_Parser.prototype.p_ParseIdent=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<152>";
	var t_id=this.p_CParseIdent();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<153>";
	if(!((t_id).length!=0)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<153>";
		error("Expecting identifier");
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<154>";
	pop_err();
	return t_id;
}
c_Parser.prototype.p_Parse=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<142>";
	var t_toke=this.m__toke;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<143>";
	this.p_Bump();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<144>";
	pop_err();
	return t_toke;
}
c_Parser.prototype.p_Parse2=function(t_toke){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<148>";
	if(!this.p_CParse(t_toke)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<148>";
		error("Expecting '"+t_toke+"'");
	}
	pop_err();
}
function c_GlslParser(){
	c_Parser.call(this);
}
c_GlslParser.prototype=extend_class(c_Parser);
c_GlslParser.m_new=function(t_text){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<176>";
	c_Parser.m_new.call(this,t_text);
	pop_err();
	return this;
}
c_GlslParser.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<173>";
	c_Parser.m_new2.call(this);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<173>";
	pop_err();
	return this;
}
c_GlslParser.prototype.p_ParseType=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<180>";
	var t_id=this.p_ParseIdent();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<181>";
	pop_err();
	return t_id;
}
function bb_glslparser_IsAlpha(t_ch){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<21>";
	var t_=t_ch>=65 && t_ch<91 || t_ch>=97 && t_ch<123;
	pop_err();
	return t_;
}
function bb_glslparser_IsIdent(t_ch){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<25>";
	var t_=t_ch>=65 && t_ch<91 || t_ch>=97 && t_ch<123 || t_ch>=48 && t_ch<58 || t_ch==95;
	pop_err();
	return t_;
}
function bb_glslparser_IsDigit(t_ch){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glslparser.monkey<17>";
	var t_=t_ch>=48 && t_ch<58;
	pop_err();
	return t_;
}
function c_KeyEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator.m_new=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<459>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_KeyEnumerator.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<456>";
	pop_err();
	return this;
}
c_KeyEnumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<463>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_KeyEnumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<467>";
	var t_t=this.m_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<468>";
	this.m_node=this.m_node.p_NextNode();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<469>";
	pop_err();
	return dbg_object(t_t).m_key;
}
function c_MapKeys(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys.m_new=function(t_map){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<503>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_MapKeys.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<500>";
	pop_err();
	return this;
}
c_MapKeys.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<507>";
	var t_=c_KeyEnumerator.m_new.call(new c_KeyEnumerator,this.m_map.p_FirstNode());
	pop_err();
	return t_;
}
var bb_graphics2_fastShader=null;
function c_BumpShader(){
	c_Shader.call(this);
}
c_BumpShader.prototype=extend_class(c_Shader);
c_BumpShader.m_new=function(t_source){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<793>";
	c_Shader.m_new.call(this,t_source);
	pop_err();
	return this;
}
c_BumpShader.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<790>";
	c_Shader.m_new2.call(this);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<790>";
	pop_err();
	return this;
}
c_BumpShader.prototype.p_OnInitMaterial=function(t_material){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<799>";
	t_material.p_SetTexture("ColorTexture",c_Texture.m_White());
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<800>";
	t_material.p_SetTexture("SpecularTexture",c_Texture.m_Black());
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<801>";
	t_material.p_SetTexture("NormalTexture",c_Texture.m_Flat());
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<802>";
	t_material.p_SetVector("AmbientColor",[1.0,1.0,1.0,1.0]);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<803>";
	t_material.p_SetScalar("Roughness",1.0);
	pop_err();
}
c_BumpShader.prototype.p_OnLoadMaterial=function(t_material,t_path,t_texFlags){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<808>";
	var t_format=4;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<810>";
	var t_ext=bb_filepath_ExtractExt(t_path);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<811>";
	if((t_ext).length!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<811>";
		t_path=bb_filepath_StripExt(t_path);
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<811>";
		t_ext="png";
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<813>";
	var t_colorTex=c_Texture.m_Load(t_path+"."+t_ext,t_format,t_texFlags);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<814>";
	if(!((t_colorTex)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<814>";
		t_colorTex=c_Texture.m_Load(t_path+"_d."+t_ext,t_format,t_texFlags);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<815>";
	if(!((t_colorTex)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<815>";
		t_colorTex=c_Texture.m_Load(t_path+"_diff."+t_ext,t_format,t_texFlags);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<816>";
	if(!((t_colorTex)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<816>";
		t_colorTex=c_Texture.m_Load(t_path+"_diffuse."+t_ext,t_format,t_texFlags);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<818>";
	var t_specularTex=c_Texture.m_Load(t_path+"_s."+t_ext,t_format,t_texFlags);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<819>";
	if(!((t_specularTex)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<819>";
		t_specularTex=c_Texture.m_Load(t_path+"_spec."+t_ext,t_format,t_texFlags);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<820>";
	if(!((t_specularTex)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<820>";
		t_specularTex=c_Texture.m_Load(t_path+"_specular."+t_ext,t_format,t_texFlags);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<821>";
	if(!((t_specularTex)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<821>";
		t_specularTex=c_Texture.m_Load(t_path+"_SPECULAR."+t_ext,t_format,t_texFlags);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<823>";
	var t_normalTex=c_Texture.m_Load(t_path+"_n."+t_ext,t_format,t_texFlags);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<824>";
	if(!((t_normalTex)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<824>";
		t_normalTex=c_Texture.m_Load(t_path+"_norm."+t_ext,t_format,t_texFlags);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<825>";
	if(!((t_normalTex)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<825>";
		t_normalTex=c_Texture.m_Load(t_path+"_normal."+t_ext,t_format,t_texFlags);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<826>";
	if(!((t_normalTex)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<826>";
		t_normalTex=c_Texture.m_Load(t_path+"_NORMALS."+t_ext,t_format,t_texFlags);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<828>";
	if(!((t_colorTex)!=null) && !((t_specularTex)!=null) && !((t_normalTex)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<828>";
		pop_err();
		return null;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<830>";
	t_material.p_SetTexture("ColorTexture",t_colorTex);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<831>";
	t_material.p_SetTexture("SpecularTexture",t_specularTex);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<832>";
	t_material.p_SetTexture("NormalTexture",t_normalTex);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<834>";
	if(((t_specularTex)!=null) || ((t_normalTex)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<835>";
		t_material.p_SetVector("AmbientColor",[0.0,0.0,0.0,1.0]);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<836>";
		t_material.p_SetScalar("Roughness",.5);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<839>";
	if((t_colorTex)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<839>";
		t_colorTex.p_Release();
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<840>";
	if((t_specularTex)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<840>";
		t_specularTex.p_Release();
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<841>";
	if((t_normalTex)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<841>";
		t_normalTex.p_Release();
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<843>";
	pop_err();
	return t_material;
}
var bb_graphics2_bumpShader=null;
function c_MatteShader(){
	c_Shader.call(this);
}
c_MatteShader.prototype=extend_class(c_Shader);
c_MatteShader.m_new=function(t_source){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<851>";
	c_Shader.m_new.call(this,t_source);
	pop_err();
	return this;
}
c_MatteShader.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<848>";
	c_Shader.m_new2.call(this);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<848>";
	pop_err();
	return this;
}
c_MatteShader.prototype.p_OnInitMaterial=function(t_material){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<857>";
	t_material.p_SetTexture("ColorTexture",c_Texture.m_White());
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<858>";
	t_material.p_SetVector("AmbientColor",[0.0,0.0,0.0,1.0]);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<859>";
	t_material.p_SetScalar("Roughness",1.0);
	pop_err();
}
var bb_graphics2_matteShader=null;
var bb_graphics2_shadowShader=null;
var bb_graphics2_lightMapShader=null;
var bb_graphics2_defaultShader=null;
function c_Font(){
	Object.call(this);
	this.m__glyphs=[];
	this.m__firstChar=0;
	this.m__height=.0;
}
c_Font.m_new=function(t_glyphs,t_firstChar,t_height){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1241>";
	this.m__glyphs=t_glyphs;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1242>";
	this.m__firstChar=t_firstChar;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1243>";
	this.m__height=t_height;
	pop_err();
	return this;
}
c_Font.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1238>";
	pop_err();
	return this;
}
c_Font.m_Load=function(t_path,t_firstChar,t_numChars,t_padded){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1268>";
	var t_image=c_Image2.m_Load(t_path,.5,.5,3,null);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1269>";
	if(!((t_image)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1269>";
		pop_err();
		return null;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1271>";
	var t_cellWidth=((t_image.p_Width()/t_numChars)|0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1272>";
	var t_cellHeight=t_image.p_Height();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1273>";
	var t_glyphX=0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1273>";
	var t_glyphY=0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1273>";
	var t_glyphWidth=t_cellWidth;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1273>";
	var t_glyphHeight=t_cellHeight;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1274>";
	if(t_padded){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1274>";
		t_glyphX+=1;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1274>";
		t_glyphY+=1;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1274>";
		t_glyphWidth-=2;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1274>";
		t_glyphHeight-=2;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1276>";
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1277>";
	var t_h=((t_image.p_Height()/t_cellHeight)|0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1279>";
	var t_glyphs=new_object_array(t_numChars);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1281>";
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1282>";
		var t_y=((t_i/t_w)|0);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1283>";
		var t_x=t_i % t_w;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1284>";
		var t_glyph=c_Glyph.m_new.call(new c_Glyph,t_image,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,(t_glyphWidth));
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1285>";
		dbg_array(t_glyphs,t_i)[dbg_index]=t_glyph;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1288>";
	var t_=c_Font.m_new.call(new c_Font,t_glyphs,t_firstChar,(t_glyphHeight));
	pop_err();
	return t_;
}
c_Font.m_Load2=function(t_path,t_cellWidth,t_cellHeight,t_glyphX,t_glyphY,t_glyphWidth,t_glyphHeight,t_firstChar,t_numChars){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1294>";
	var t_image=c_Image2.m_Load(t_path,.5,.5,3,null);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1295>";
	if(!((t_image)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1295>";
		pop_err();
		return null;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1297>";
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1298>";
	var t_h=((t_image.p_Height()/t_cellHeight)|0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1300>";
	var t_glyphs=new_object_array(t_numChars);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1302>";
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1303>";
		var t_y=((t_i/t_w)|0);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1304>";
		var t_x=t_i % t_w;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1305>";
		var t_glyph=c_Glyph.m_new.call(new c_Glyph,t_image,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,(t_glyphWidth));
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1306>";
		dbg_array(t_glyphs,t_i)[dbg_index]=t_glyph;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1309>";
	var t_=c_Font.m_new.call(new c_Font,t_glyphs,t_firstChar,(t_glyphHeight));
	pop_err();
	return t_;
}
function c_Image2(){
	Object.call(this);
	this.m__material=null;
	this.m__width=0;
	this.m__height=0;
	this.m__x0=-1.0;
	this.m__x1=1.0;
	this.m__y0=-1.0;
	this.m__y1=1.0;
	this.m__x=0;
	this.m__s0=0.0;
	this.m__y=0;
	this.m__t0=0.0;
	this.m__s1=1.0;
	this.m__t1=1.0;
	this.m__caster=null;
}
c_Image2.m__flagsMask=0;
c_Image2.prototype.p_SetHandle=function(t_xhandle,t_yhandle){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1135>";
	this.m__x0=(this.m__width)*-t_xhandle;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1136>";
	this.m__x1=(this.m__width)*(1.0-t_xhandle);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1137>";
	this.m__y0=(this.m__height)*-t_yhandle;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1138>";
	this.m__y1=(this.m__height)*(1.0-t_yhandle);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1139>";
	this.m__s0=(this.m__x)/(this.m__material.p_Width());
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1140>";
	this.m__t0=(this.m__y)/(this.m__material.p_Height());
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1141>";
	this.m__s1=(this.m__x+this.m__width)/(this.m__material.p_Width());
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1142>";
	this.m__t1=(this.m__y+this.m__height)/(this.m__material.p_Height());
	pop_err();
}
c_Image2.m_new=function(t_width,t_height,t_xhandle,t_yhandle,t_flags){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1048>";
	t_flags&=c_Image2.m__flagsMask;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1049>";
	var t_texture=c_Texture.m_new.call(new c_Texture,t_width,t_height,4,t_flags|12|16);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1050>";
	this.m__material=c_Material.m_new.call(new c_Material,bb_graphics2_fastShader);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1051>";
	this.m__material.p_SetTexture("ColorTexture",t_texture);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1052>";
	this.m__width=t_width;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1053>";
	this.m__height=t_height;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1054>";
	this.p_SetHandle(t_xhandle,t_yhandle);
	pop_err();
	return this;
}
c_Image2.m_new2=function(t_image,t_x,t_y,t_width,t_height,t_xhandle,t_yhandle){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1058>";
	this.m__material=dbg_object(t_image).m__material;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1059>";
	this.m__material.p_Retain();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1060>";
	this.m__x=dbg_object(t_image).m__x+t_x;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1061>";
	this.m__y=dbg_object(t_image).m__y+t_y;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1062>";
	this.m__width=t_width;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1063>";
	this.m__height=t_height;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1064>";
	this.p_SetHandle(t_xhandle,t_yhandle);
	pop_err();
	return this;
}
c_Image2.m_new3=function(t_material,t_xhandle,t_yhandle){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1068>";
	var t_texture=t_material.p_ColorTexture();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1069>";
	if(!((t_texture)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1069>";
		error("Material has no ColorTexture");
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1070>";
	this.m__material=t_material;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1071>";
	this.m__material.p_Retain();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1072>";
	this.m__width=this.m__material.p_Width();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1073>";
	this.m__height=this.m__material.p_Height();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1074>";
	this.p_SetHandle(t_xhandle,t_yhandle);
	pop_err();
	return this;
}
c_Image2.m_new4=function(t_material,t_x,t_y,t_width,t_height,t_xhandle,t_yhandle){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1078>";
	var t_texture=t_material.p_ColorTexture();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1079>";
	if(!((t_texture)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1079>";
		error("Material has no ColorTexture");
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1080>";
	this.m__material=t_material;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1081>";
	this.m__material.p_Retain();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1082>";
	this.m__x=t_x;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1083>";
	this.m__y=t_y;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1084>";
	this.m__width=t_width;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1085>";
	this.m__height=t_height;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1086>";
	this.p_SetHandle(t_xhandle,t_yhandle);
	pop_err();
	return this;
}
c_Image2.m_new5=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1041>";
	pop_err();
	return this;
}
c_Image2.m_Load=function(t_path,t_xhandle,t_yhandle,t_flags,t_shader){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1170>";
	t_flags&=c_Image2.m__flagsMask;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1172>";
	var t_material=c_Material.m_Load(t_path,t_flags|12,t_shader);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1173>";
	if(!((t_material)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1173>";
		pop_err();
		return null;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1175>";
	var t_=c_Image2.m_new3.call(new c_Image2,t_material,t_xhandle,t_yhandle);
	pop_err();
	return t_;
}
c_Image2.prototype.p_Width=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1115>";
	pop_err();
	return this.m__width;
}
c_Image2.prototype.p_Height=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1119>";
	pop_err();
	return this.m__height;
}
c_Image2.prototype.p_Material=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1095>";
	pop_err();
	return this.m__material;
}
c_Image2.m_LoadFrames=function(t_path,t_numFrames,t_padded,t_xhandle,t_yhandle,t_flags,t_shader){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1179>";
	t_flags&=c_Image2.m__flagsMask;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1181>";
	var t_material=c_Material.m_Load(t_path,t_flags|12,t_shader);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1182>";
	if(!((t_material)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1182>";
		pop_err();
		return [];
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1184>";
	var t_cellWidth=((t_material.p_Width()/t_numFrames)|0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1184>";
	var t_cellHeight=t_material.p_Height();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1186>";
	var t_x=0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1186>";
	var t_width=t_cellWidth;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1187>";
	if(t_padded){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1187>";
		t_x+=1;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1187>";
		t_width-=2;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1189>";
	var t_frames=new_object_array(t_numFrames);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1191>";
	for(var t_i=0;t_i<t_numFrames;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1192>";
		dbg_array(t_frames,t_i)[dbg_index]=c_Image2.m_new4.call(new c_Image2,t_material,t_i*t_cellWidth+t_x,0,t_width,t_cellHeight,t_xhandle,t_yhandle);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1195>";
	pop_err();
	return t_frames;
}
function c_RefCounted(){
	Object.call(this);
	this.m__refs=1;
}
c_RefCounted.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<173>";
	pop_err();
	return this;
}
c_RefCounted.prototype.p_Retain=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<176>";
	if(this.m__refs<=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<176>";
		error("Internal error");
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<177>";
	this.m__refs+=1;
	pop_err();
}
c_RefCounted.prototype.p_Destroy=function(){
}
c_RefCounted.prototype.p_Release=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<181>";
	if(this.m__refs<=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<181>";
		error("Internal error");
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<182>";
	this.m__refs-=1;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<183>";
	if((this.m__refs)!=0){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<184>";
	this.m__refs=-1;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<185>";
	this.p_Destroy();
	pop_err();
}
function c_Texture(){
	c_RefCounted.call(this);
	this.m__flags=0;
	this.m__width=0;
	this.m__height=0;
	this.m__format=0;
	this.m__seq=0;
	this.m__glTexture=0;
	this.m__glFramebuffer=0;
	this.m__data=null;
}
c_Texture.prototype=extend_class(c_RefCounted);
c_Texture.m__white=null;
c_Texture.m__colors=null;
c_Texture.prototype.p_Init3=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<449>";
	this.m__seq=webglGraphicsSeq;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<451>";
	this.m__glTexture=gl.createTexture();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<453>";
	bb_glutil_glPushTexture2d(this.m__glTexture);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<455>";
	if((this.m__flags&1)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<456>";
		gl.texParameteri(3553,10240,9729);
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<458>";
		gl.texParameteri(3553,10240,9728);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<460>";
	if(((this.m__flags&2)!=0) && ((this.m__flags&1)!=0)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<461>";
		gl.texParameteri(3553,10241,9987);
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<462>";
		if((this.m__flags&2)!=0){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<463>";
			gl.texParameteri(3553,10241,9984);
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<464>";
			if((this.m__flags&1)!=0){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<465>";
				gl.texParameteri(3553,10241,9729);
			}else{
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<467>";
				gl.texParameteri(3553,10241,9728);
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<470>";
	if((this.m__flags&4)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<470>";
		gl.texParameteri(3553,10242,33071);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<471>";
	if((this.m__flags&8)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<471>";
		gl.texParameteri(3553,10243,33071);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<473>";
	_glTexImage2D(3553,0,6408,this.m__width,this.m__height,0,6408,5121,null);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<475>";
	bb_glutil_glPopTexture2d();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<477>";
	if((this.m__flags&16)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<479>";
		this.m__glFramebuffer=gl.createFramebuffer();
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<481>";
		bb_glutil_glPushFramebuffer(this.m__glFramebuffer);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<483>";
		_glBindFramebuffer(36160,this.m__glFramebuffer);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<484>";
		gl.framebufferTexture2D(36160,36064,3553,this.m__glTexture,0);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<486>";
		if(gl.checkFramebufferStatus(36160)!=36053){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<486>";
			error("Incomplete framebuffer");
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<488>";
		bb_glutil_glPopFramebuffer();
	}
	pop_err();
}
c_Texture.prototype.p_Init4=function(t_width,t_height,t_format,t_flags){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<425>";
	bb_graphics2_InitMojo2();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<428>";
	if(t_format!=4){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<428>";
		error("Invalid texture format: "+String(t_format));
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<432>";
	if(!bb_graphics2_IsPow2(t_width) || !bb_graphics2_IsPow2(t_height)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<432>";
		t_flags&=-3;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<435>";
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<439>";
	this.m__width=t_width;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<440>";
	this.m__height=t_height;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<441>";
	this.m__format=t_format;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<442>";
	this.m__flags=t_flags;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<444>";
	this.p_Init3();
	pop_err();
}
c_Texture.m_new=function(t_width,t_height,t_format,t_flags){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<221>";
	c_RefCounted.m_new.call(this);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<222>";
	this.p_Init4(t_width,t_height,t_format,t_flags);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<224>";
	if((this.m__flags&256)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<225>";
		var t_data=c_DataBuffer.m_new.call(new c_DataBuffer,t_width*t_height*4,false);
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<226>";
		for(var t_i=0;t_i<t_width*t_height*4;t_i=t_i+4){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<227>";
			t_data.PokeInt(t_i,-65281);
		}
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<229>";
		this.m__data=(t_data);
	}
	pop_err();
	return this;
}
c_Texture.prototype.p_Validate=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<240>";
	if(this.m__seq==webglGraphicsSeq){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<241>";
	this.p_Init3();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<242>";
	if((this.m__data)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<242>";
		this.p_LoadData(this.m__data);
	}
	pop_err();
}
c_Texture.prototype.p_GLTexture=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<311>";
	this.p_Validate();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<312>";
	pop_err();
	return this.m__glTexture;
}
c_Texture.prototype.p_UpdateMipmaps=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<291>";
	if(!((this.m__flags&2)!=0)){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<293>";
	if(this.m__seq!=webglGraphicsSeq){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<295>";
	bb_glutil_glPushTexture2d(this.p_GLTexture());
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<297>";
	_glGenerateMipmap(3553);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<299>";
	bb_glutil_glPopTexture2d();
	pop_err();
}
c_Texture.prototype.p_LoadData=function(t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<494>";
	bb_glutil_glPushTexture2d(this.p_GLTexture());
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<499>";
	if((object_downcast((t_data),c_DataBuffer))!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<500>";
		_glTexImage2D(3553,0,6408,this.m__width,this.m__height,0,6408,5121,object_downcast((t_data),c_DataBuffer));
	}else{
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<502>";
		_glTexImage2D2(3553,0,6408,6408,5121,t_data);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<505>";
	bb_glutil_glPopTexture2d();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<507>";
	this.p_UpdateMipmaps();
	pop_err();
}
c_Texture.m_new2=function(t_width,t_height,t_format,t_flags,t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<414>";
	c_RefCounted.m_new.call(this);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<415>";
	this.p_Init4(t_width,t_height,t_format,t_flags);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<417>";
	this.p_LoadData(t_data);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<419>";
	if(true){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<420>";
		this.m__data=t_data;
	}
	pop_err();
	return this;
}
c_Texture.m_new3=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<210>";
	c_RefCounted.m_new.call(this);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<210>";
	pop_err();
	return this;
}
c_Texture.m_Color=function(t_color){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<365>";
	var t_tex=c_Texture.m__colors.p_Get(t_color);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<366>";
	if((t_tex)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<366>";
		pop_err();
		return t_tex;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<367>";
	var t_data=c_DataBuffer.m_new.call(new c_DataBuffer,4,false);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<368>";
	t_data.PokeInt(0,t_color);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<369>";
	t_tex=c_Texture.m_new2.call(new c_Texture,1,1,4,12,(t_data));
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<373>";
	c_Texture.m__colors.p_Set3(t_color,t_tex);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<374>";
	pop_err();
	return t_tex;
}
c_Texture.m_White=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<383>";
	if(!((c_Texture.m__white)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<383>";
		c_Texture.m__white=c_Texture.m_Color(-1);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<384>";
	pop_err();
	return c_Texture.m__white;
}
c_Texture.m_Load=function(t_path,t_format,t_flags){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<330>";
	var t_info=new_number_array(2);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<347>";
	var t_data=bb_gles20_LoadStaticTexImage(bb_graphics2_KludgePath(t_path),t_info);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<350>";
	if(!((t_data)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<352>";
		pop_err();
		return null;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<355>";
	var t_tex=c_Texture.m_new2.call(new c_Texture,dbg_array(t_info,0)[dbg_index],dbg_array(t_info,1)[dbg_index],t_format,t_flags,t_data);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<361>";
	pop_err();
	return t_tex;
}
c_Texture.prototype.p_Loading=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<304>";
	var t_=BBTextureLoading(this.m__glTexture);
	pop_err();
	return t_;
}
c_Texture.prototype.p_GLFramebuffer=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<316>";
	this.p_Validate();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<317>";
	pop_err();
	return this.m__glFramebuffer;
}
c_Texture.prototype.p_Flags=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<258>";
	pop_err();
	return this.m__flags;
}
c_Texture.prototype.p_Width=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<246>";
	pop_err();
	return this.m__width;
}
c_Texture.prototype.p_Height=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<250>";
	pop_err();
	return this.m__height;
}
c_Texture.m__black=null;
c_Texture.m_Black=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<378>";
	if(!((c_Texture.m__black)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<378>";
		c_Texture.m__black=c_Texture.m_Color(-16777216);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<379>";
	pop_err();
	return c_Texture.m__black;
}
c_Texture.m__flat=null;
c_Texture.m_Flat=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<393>";
	if(!((c_Texture.m__flat)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<393>";
		c_Texture.m__flat=c_Texture.m_Color(-7829368);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<394>";
	pop_err();
	return c_Texture.m__flat;
}
c_Texture.prototype.p_Destroy=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<234>";
	if(this.m__seq==webglGraphicsSeq){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<234>";
		gl.deleteTexture(this.m__glTexture);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<235>";
	this.m__glTexture=0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<236>";
	this.m__glFramebuffer=0;
	pop_err();
}
function c_Material(){
	c_RefCounted.call(this);
	this.m__shader=null;
	this.m__inited=false;
	this.m__textures=c_StringMap2.m_new.call(new c_StringMap2);
	this.m__colorTexture=null;
	this.m__scalars=c_StringMap3.m_new.call(new c_StringMap3);
	this.m__vectors=c_StringMap4.m_new.call(new c_StringMap4);
}
c_Material.prototype=extend_class(c_RefCounted);
c_Material.prototype.p_SetTexture=function(t_param,t_texture){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<922>";
	if(!((t_texture)!=null)){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<923>";
	if(this.m__inited && !this.m__textures.p_Contains2(t_param)){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<925>";
	var t_old=this.m__textures.p_Get2(t_param);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<926>";
	t_texture.p_Retain();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<927>";
	this.m__textures.p_Set4(t_param,t_texture);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<928>";
	if((t_old)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<928>";
		t_old.p_Release();
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<930>";
	if(t_param=="ColorTexture"){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<930>";
		this.m__colorTexture=t_texture;
	}
	pop_err();
}
c_Material.m_new=function(t_shader){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<868>";
	c_RefCounted.m_new.call(this);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<869>";
	bb_graphics2_InitMojo2();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<871>";
	if(!((t_shader)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<871>";
		t_shader=bb_graphics2_defaultShader;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<872>";
	this.m__shader=t_shader;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<873>";
	this.m__shader.p_OnInitMaterial(this);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<874>";
	this.m__inited=true;
	pop_err();
	return this;
}
c_Material.prototype.p_Shader=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<884>";
	pop_err();
	return this.m__shader;
}
c_Material.m_Load=function(t_path,t_texFlags,t_shader){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<950>";
	var t_material=c_Material.m_new.call(new c_Material,t_shader);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<952>";
	t_material=t_material.p_Shader().p_OnLoadMaterial(t_material,t_path,t_texFlags);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<954>";
	pop_err();
	return t_material;
}
c_Material.prototype.p_Width=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<892>";
	if((this.m__colorTexture)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<892>";
		pop_err();
		return dbg_object(this.m__colorTexture).m__width;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<893>";
	pop_err();
	return 0;
}
c_Material.prototype.p_Height=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<897>";
	if((this.m__colorTexture)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<897>";
		pop_err();
		return dbg_object(this.m__colorTexture).m__height;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<898>";
	pop_err();
	return 0;
}
c_Material.prototype.p_ColorTexture=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<888>";
	pop_err();
	return this.m__colorTexture;
}
c_Material.prototype.p_GetScalar=function(t_param,t_defValue){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<907>";
	if(!this.m__scalars.p_Contains2(t_param)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<907>";
		pop_err();
		return t_defValue;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<908>";
	var t_=this.m__scalars.p_Get2(t_param);
	pop_err();
	return t_;
}
c_Material.prototype.p_GetVector=function(t_param,t_defValue){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<917>";
	if(!this.m__vectors.p_Contains2(t_param)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<917>";
		pop_err();
		return t_defValue;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<918>";
	var t_=this.m__vectors.p_Get2(t_param);
	pop_err();
	return t_;
}
c_Material.prototype.p_GetTexture=function(t_param,t_defValue){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<935>";
	if(!this.m__textures.p_Contains2(t_param)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<935>";
		pop_err();
		return t_defValue;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<936>";
	var t_=this.m__textures.p_Get2(t_param);
	pop_err();
	return t_;
}
c_Material.prototype.p_Bind=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<968>";
	this.m__shader.p_Bind();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<970>";
	if(bb_graphics2_rs_material==this){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<970>";
		pop_err();
		return true;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<972>";
	bb_graphics2_rs_material=this;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<974>";
	var t_texid=0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<976>";
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<976>";
	var t_=dbg_object(bb_graphics2_rs_program).m_matuniforms;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<976>";
	var t_2=0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<976>";
	while(t_2<t_.length){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<976>";
		var t_u=dbg_array(t_,t_2)[dbg_index];
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<976>";
		t_2=t_2+1;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<977>";
		var t_1=dbg_object(t_u).m_type;
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<978>";
		if(t_1==5126){
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<979>";
			gl.uniform1f(dbg_object(t_u).m_location,this.p_GetScalar(dbg_object(t_u).m_name,1.0));
		}else{
			err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<980>";
			if(t_1==35666){
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<981>";
				_glUniform4fv(dbg_object(t_u).m_location,1,this.p_GetVector(dbg_object(t_u).m_name,[1.0,1.0,1.0,1.0]));
			}else{
				err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<982>";
				if(t_1==35678){
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<983>";
					var t_tex=this.p_GetTexture(dbg_object(t_u).m_name,null);
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<984>";
					if(t_tex.p_Loading()){
						err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<985>";
						bb_graphics2_rs_material=null;
						err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<986>";
						break;
					}
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<988>";
					gl.activeTexture(33984+t_texid);
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<989>";
					_glBindTexture(3553,t_tex.p_GLTexture());
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<990>";
					gl.uniform1i(dbg_object(t_u).m_location,t_texid);
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<991>";
					t_texid+=1;
				}else{
					err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<993>";
					error("Unsupported uniform type:"+String(dbg_object(t_u).m_type));
				}
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<997>";
	if((t_texid)!=0){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<997>";
		gl.activeTexture(33984);
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<999>";
	var t_3=bb_graphics2_rs_material==this;
	pop_err();
	return t_3;
}
c_Material.prototype.p_SetVector=function(t_param,t_vector){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<912>";
	if(this.m__inited && !this.m__vectors.p_Contains2(t_param)){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<913>";
	this.m__vectors.p_Set6(t_param,t_vector);
	pop_err();
}
c_Material.prototype.p_SetScalar=function(t_param,t_scalar){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<902>";
	if(this.m__inited && !this.m__scalars.p_Contains2(t_param)){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<903>";
	this.m__scalars.p_Set5(t_param,t_scalar);
	pop_err();
}
c_Material.prototype.p_Destroy=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<878>";
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<878>";
	var t_=this.m__textures.p_ObjectEnumerator();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<878>";
	while(t_.p_HasNext()){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<878>";
		var t_tex=t_.p_NextObject();
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<879>";
		t_tex.p_Value().p_Release();
	}
	pop_err();
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map3.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map3.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map3.prototype.p_Get=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode(t_key);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
c_Map3.prototype.p_RotateLeft3=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map3.prototype.p_RotateRight3=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map3.prototype.p_InsertFixup3=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<223>";
					this.p_RotateLeft3(t_node);
				}
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<227>";
				this.p_RotateRight3(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<239>";
					this.p_RotateRight3(t_node);
				}
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<243>";
				this.p_RotateLeft3(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map3.prototype.p_Set3=function(t_key,t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<45>";
	t_node=c_Node3.m_new.call(new c_Node3,t_key,t_value,-1,t_parent);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<53>";
		this.p_InsertFixup3(t_node);
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
function c_IntMap2(){
	c_Map3.call(this);
}
c_IntMap2.prototype=extend_class(c_Map3);
c_IntMap2.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<534>";
	c_Map3.m_new.call(this);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<534>";
	pop_err();
	return this;
}
c_IntMap2.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Node3(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node3.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node3.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
function bb_graphics2_IsPow2(t_sz){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<98>";
	var t_=(t_sz&t_sz-1)==0;
	pop_err();
	return t_;
}
function bb_glutil_glPushTexture2d(t_tex){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<17>";
	_glGetIntegerv(32873,bb_glutil_tmpi);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<18>";
	_glBindTexture(3553,t_tex);
	pop_err();
}
function bb_glutil_glPopTexture2d(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<22>";
	_glBindTexture(3553,dbg_array(bb_glutil_tmpi,0)[dbg_index]);
	pop_err();
}
function bb_glutil_glPushFramebuffer(t_framebuf){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<26>";
	_glGetIntegerv(36006,bb_glutil_tmpi);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<27>";
	_glBindFramebuffer(36160,t_framebuf);
	pop_err();
}
function bb_glutil_glPopFramebuffer(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/glutil.monkey<31>";
	_glBindFramebuffer(36160,dbg_array(bb_glutil_tmpi,0)[dbg_index]);
	pop_err();
}
function c_Map4(){
	Object.call(this);
	this.m_root=null;
}
c_Map4.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map4.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map4.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map4.prototype.p_Contains2=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<25>";
	var t_=this.p_FindNode2(t_key)!=null;
	pop_err();
	return t_;
}
c_Map4.prototype.p_Get2=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
c_Map4.prototype.p_RotateLeft4=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map4.prototype.p_RotateRight4=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map4.prototype.p_InsertFixup4=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<223>";
					this.p_RotateLeft4(t_node);
				}
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<227>";
				this.p_RotateRight4(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<239>";
					this.p_RotateRight4(t_node);
				}
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<243>";
				this.p_RotateLeft4(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map4.prototype.p_Set4=function(t_key,t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<45>";
	t_node=c_Node4.m_new.call(new c_Node4,t_key,t_value,-1,t_parent);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<53>";
		this.p_InsertFixup4(t_node);
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map4.prototype.p_FirstNode=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<125>";
	if(!((this.m_root)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<125>";
		pop_err();
		return null;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<127>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<128>";
	while((dbg_object(t_node).m_left)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<129>";
		t_node=dbg_object(t_node).m_left;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<131>";
	pop_err();
	return t_node;
}
c_Map4.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<121>";
	var t_=c_NodeEnumerator.m_new.call(new c_NodeEnumerator,this.p_FirstNode());
	pop_err();
	return t_;
}
function c_StringMap2(){
	c_Map4.call(this);
}
c_StringMap2.prototype=extend_class(c_Map4);
c_StringMap2.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<551>";
	c_Map4.m_new.call(this);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap2.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node4(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node4.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node4.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
c_Node4.prototype.p_NextNode=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<385>";
	var t_node=null;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<386>";
	if((this.m_right)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<387>";
		t_node=this.m_right;
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<388>";
		while((dbg_object(t_node).m_left)!=null){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<389>";
			t_node=dbg_object(t_node).m_left;
		}
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<391>";
		pop_err();
		return t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<393>";
	t_node=this;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<394>";
	var t_parent=dbg_object(this).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).m_right){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<396>";
		t_node=t_parent;
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<397>";
		t_parent=dbg_object(t_parent).m_parent;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<399>";
	pop_err();
	return t_parent;
}
c_Node4.prototype.p_Value=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<381>";
	pop_err();
	return this.m_value;
}
function bb_graphics2_KludgePath(t_path){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<196>";
	if(string_startswith(t_path,".") || string_startswith(t_path,"/")){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<196>";
		pop_err();
		return t_path;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<197>";
	var t_i=t_path.indexOf(":/",0);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<198>";
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<198>";
		pop_err();
		return t_path;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<199>";
	var t_="monkey://data/"+t_path;
	pop_err();
	return t_;
}
function bb_gles20_LoadStaticTexImage(t_path,t_info){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/opengl/gles20.monkey<957>";
	var t_=BBLoadStaticTexImage(t_path,t_info);
	pop_err();
	return t_;
}
function c_Glyph(){
	Object.call(this);
	this.m_image=null;
	this.m_char=0;
	this.m_x=0;
	this.m_y=0;
	this.m_width=0;
	this.m_height=0;
	this.m_advance=.0;
}
c_Glyph.m_new=function(t_image,t_char,t_x,t_y,t_width,t_height,t_advance){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1228>";
	dbg_object(this).m_image=t_image;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1229>";
	dbg_object(this).m_char=t_char;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1230>";
	dbg_object(this).m_x=t_x;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1231>";
	dbg_object(this).m_y=t_y;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1232>";
	dbg_object(this).m_width=t_width;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1233>";
	dbg_object(this).m_height=t_height;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1234>";
	dbg_object(this).m_advance=t_advance;
	pop_err();
	return this;
}
c_Glyph.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1218>";
	pop_err();
	return this;
}
var bb_graphics2_defaultFont=null;
function bb_math3d_Mat4New(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<17>";
	var t_=[1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
	pop_err();
	return t_;
}
var bb_graphics2_flipYMatrix=[];
function bb_graphics2_InitMojo2(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<150>";
	if(bb_graphics2_inited){
		pop_err();
		return;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<151>";
	bb_graphics2_inited=true;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<153>";
	bb_graphics2_InitVbos();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<155>";
	_glGetIntegerv(36006,bb_graphics2_tmpi);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<156>";
	bb_graphics2_defaultFbo=dbg_array(bb_graphics2_tmpi,0)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<158>";
	bb_graphics2_mainShader=bb_app_LoadString("monkey://data/mojo2_program.glsl");
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<160>";
	bb_graphics2_fastShader=c_Shader.m_new.call(new c_Shader,bb_app_LoadString("monkey://data/mojo2_fastshader.glsl"));
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<161>";
	bb_graphics2_bumpShader=(c_BumpShader.m_new.call(new c_BumpShader,bb_app_LoadString("monkey://data/mojo2_bumpshader.glsl")));
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<162>";
	bb_graphics2_matteShader=(c_MatteShader.m_new.call(new c_MatteShader,bb_app_LoadString("monkey://data/mojo2_matteshader.glsl")));
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<163>";
	bb_graphics2_shadowShader=c_Shader.m_new.call(new c_Shader,bb_app_LoadString("monkey://data/mojo2_shadowshader.glsl"));
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<164>";
	bb_graphics2_lightMapShader=c_Shader.m_new.call(new c_Shader,bb_app_LoadString("monkey://data/mojo2_lightmapshader.glsl"));
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<165>";
	bb_graphics2_defaultShader=bb_graphics2_bumpShader;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<167>";
	bb_graphics2_defaultFont=c_Font.m_Load("monkey://data/mojo2_font.png",32,96,true);
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<168>";
	if(!((bb_graphics2_defaultFont)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<168>";
		error("Can't load default font");
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<170>";
	dbg_array(bb_graphics2_flipYMatrix,5)[dbg_index]=-1.0;
	pop_err();
}
function c_LightData(){
	Object.call(this);
	this.m_type=0;
	this.m_vector=[0.0,0.0,-10.0,1.0];
	this.m_tvector=new_number_array(4);
	this.m_color=[1.0,1.0,1.0,1.0];
	this.m_range=10.0;
}
c_LightData.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<101>";
	pop_err();
	return this;
}
function c_DrawOp(){
	Object.call(this);
	this.m_material=null;
	this.m_blend=0;
	this.m_order=0;
	this.m_count=0;
}
c_DrawOp.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/graphics.monkey<1322>";
	pop_err();
	return this;
}
var bb_graphics2_rs_program=null;
var bb_graphics2_rs_numLights=0;
var bb_graphics2_rs_material=null;
var bb_graphics2_rs_modelViewProjMatrix=[];
var bb_graphics2_rs_modelViewMatrix=[];
var bb_graphics2_rs_clipPosScale=[];
var bb_graphics2_rs_globalColor=[];
var bb_graphics2_rs_fogColor=[];
var bb_graphics2_rs_ambientLight=[];
var bb_graphics2_rs_lightColors=[];
var bb_graphics2_rs_lightVectors=[];
var bb_graphics2_rs_shadowTexture=null;
function c_Map5(){
	Object.call(this);
	this.m_root=null;
}
c_Map5.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map5.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map5.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map5.prototype.p_Contains2=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<25>";
	var t_=this.p_FindNode2(t_key)!=null;
	pop_err();
	return t_;
}
c_Map5.prototype.p_Get2=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return 0;
}
c_Map5.prototype.p_RotateLeft5=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map5.prototype.p_RotateRight5=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map5.prototype.p_InsertFixup5=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<223>";
					this.p_RotateLeft5(t_node);
				}
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<227>";
				this.p_RotateRight5(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<239>";
					this.p_RotateRight5(t_node);
				}
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<243>";
				this.p_RotateLeft5(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map5.prototype.p_Set5=function(t_key,t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<45>";
	t_node=c_Node5.m_new.call(new c_Node5,t_key,t_value,-1,t_parent);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<53>";
		this.p_InsertFixup5(t_node);
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
function c_StringMap3(){
	c_Map5.call(this);
}
c_StringMap3.prototype=extend_class(c_Map5);
c_StringMap3.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<551>";
	c_Map5.m_new.call(this);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap3.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node5(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=0;
	this.m_color=0;
	this.m_parent=null;
}
c_Node5.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node5.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
function c_Map6(){
	Object.call(this);
	this.m_root=null;
}
c_Map6.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map6.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map6.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map6.prototype.p_Contains2=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<25>";
	var t_=this.p_FindNode2(t_key)!=null;
	pop_err();
	return t_;
}
c_Map6.prototype.p_Get2=function(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return [];
}
c_Map6.prototype.p_RotateLeft6=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map6.prototype.p_RotateRight6=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map6.prototype.p_InsertFixup6=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<223>";
					this.p_RotateLeft6(t_node);
				}
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<227>";
				this.p_RotateRight6(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<239>";
					this.p_RotateRight6(t_node);
				}
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<243>";
				this.p_RotateLeft6(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map6.prototype.p_Set6=function(t_key,t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<45>";
	t_node=c_Node6.m_new.call(new c_Node6,t_key,t_value,-1,t_parent);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<53>";
		this.p_InsertFixup6(t_node);
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
function c_StringMap4(){
	c_Map6.call(this);
}
c_StringMap4.prototype=extend_class(c_Map6);
c_StringMap4.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<551>";
	c_Map6.m_new.call(this);
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap4.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node6(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=[];
	this.m_color=0;
	this.m_parent=null;
}
c_Node6.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node6.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
var bb_graphics2_rs_blend=0;
function c_BlendMode(){
	Object.call(this);
}
function c_Stack3(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack3.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack3.m_new2=function(t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack3.prototype.p_Data=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<41>";
	pop_err();
	return dbg_object(this).m_data;
}
c_Stack3.m_NIL=null;
c_Stack3.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<45>";
	if(t_newlength<this.m_length){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<46>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<47>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack3.m_NIL;
		}
	}else{
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<49>";
		if(t_newlength>this.m_data.length){
			err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<50>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<52>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack3.prototype.p_Length2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<56>";
	pop_err();
	return this.m_length;
}
c_Stack3.prototype.p_Push7=function(t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<71>";
	if(this.m_length==this.m_data.length){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<72>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<74>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<75>";
	this.m_length+=1;
	pop_err();
}
c_Stack3.prototype.p_Push8=function(t_values,t_offset,t_count){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<83>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<84>";
		this.p_Push7(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack3.prototype.p_Push9=function(t_values,t_offset){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<79>";
	this.p_Push8(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack3.prototype.p_Clear2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<34>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<35>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack3.m_NIL;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<37>";
	this.m_length=0;
	pop_err();
}
c_Stack3.prototype.p_Pop=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<89>";
	this.m_length-=1;
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<90>";
	var t_v=dbg_array(this.m_data,this.m_length)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<91>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=c_Stack3.m_NIL;
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<92>";
	pop_err();
	return t_v;
}
function bb_math_Max(t_x,t_y){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<56>";
	if(t_x>t_y){
		err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<56>";
		pop_err();
		return t_x;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<57>";
	pop_err();
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<83>";
	if(t_x>t_y){
		err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<83>";
		pop_err();
		return t_x;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<84>";
	pop_err();
	return t_y;
}
var bb_graphics2_freeOps=null;
var bb_graphics2_nullOp=null;
function c_ShadowCaster(){
	Object.call(this);
	this.m__verts=[];
}
function c_Stack4(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack4.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack4.m_new2=function(t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack4.m_NIL=null;
c_Stack4.prototype.p_Clear2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<34>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<35>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack4.m_NIL;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<37>";
	this.m_length=0;
	pop_err();
}
c_Stack4.prototype.p_Push10=function(t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<71>";
	if(this.m_length==this.m_data.length){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<72>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<74>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<75>";
	this.m_length+=1;
	pop_err();
}
c_Stack4.prototype.p_Push11=function(t_values,t_offset,t_count){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<83>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<84>";
		this.p_Push10(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack4.prototype.p_Push12=function(t_values,t_offset){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<79>";
	this.p_Push11(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
function c_Stack5(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack5.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack5.m_new2=function(t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack5.m_NIL=0;
c_Stack5.prototype.p_Clear2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<34>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<35>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack5.m_NIL;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<37>";
	this.m_length=0;
	pop_err();
}
c_Stack5.prototype.p_Push13=function(t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<71>";
	if(this.m_length==this.m_data.length){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<72>";
		this.m_data=resize_number_array(this.m_data,this.m_length*2+10);
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<74>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<75>";
	this.m_length+=1;
	pop_err();
}
c_Stack5.prototype.p_Push14=function(t_values,t_offset,t_count){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<83>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<84>";
		this.p_Push13(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack5.prototype.p_Push15=function(t_values,t_offset){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<79>";
	this.p_Push14(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
function c_FloatStack(){
	c_Stack5.call(this);
}
c_FloatStack.prototype=extend_class(c_Stack5);
c_FloatStack.m_new=function(t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<338>";
	c_Stack5.m_new2.call(this,t_data);
	pop_err();
	return this;
}
c_FloatStack.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<335>";
	c_Stack5.m_new.call(this);
	err_info="F:/progs/gamedev/monkey/modules/monkey/stack.monkey<335>";
	pop_err();
	return this;
}
var bb_graphics2_rs_projMatrix=[];
function bb_math3d_Mat4Copy(t_m,t_r){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<39>";
	dbg_array(t_r,0)[dbg_index]=dbg_array(t_m,0)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<39>";
	dbg_array(t_r,1)[dbg_index]=dbg_array(t_m,1)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<39>";
	dbg_array(t_r,2)[dbg_index]=dbg_array(t_m,2)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<39>";
	dbg_array(t_r,3)[dbg_index]=dbg_array(t_m,3)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<40>";
	dbg_array(t_r,4)[dbg_index]=dbg_array(t_m,4)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<40>";
	dbg_array(t_r,5)[dbg_index]=dbg_array(t_m,5)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<40>";
	dbg_array(t_r,6)[dbg_index]=dbg_array(t_m,6)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<40>";
	dbg_array(t_r,7)[dbg_index]=dbg_array(t_m,7)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<41>";
	dbg_array(t_r,8)[dbg_index]=dbg_array(t_m,8)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<41>";
	dbg_array(t_r,9)[dbg_index]=dbg_array(t_m,9)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<41>";
	dbg_array(t_r,10)[dbg_index]=dbg_array(t_m,10)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<41>";
	dbg_array(t_r,11)[dbg_index]=dbg_array(t_m,11)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<42>";
	dbg_array(t_r,12)[dbg_index]=dbg_array(t_m,12)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<42>";
	dbg_array(t_r,13)[dbg_index]=dbg_array(t_m,13)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<42>";
	dbg_array(t_r,14)[dbg_index]=dbg_array(t_m,14)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<42>";
	dbg_array(t_r,15)[dbg_index]=dbg_array(t_m,15)[dbg_index];
	pop_err();
}
function bb_math3d_Mat4Init(t_ix,t_jy,t_kz,t_tw,t_r){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<21>";
	dbg_array(t_r,0)[dbg_index]=t_ix;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<21>";
	dbg_array(t_r,1)[dbg_index]=0.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<21>";
	dbg_array(t_r,2)[dbg_index]=0.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<21>";
	dbg_array(t_r,3)[dbg_index]=0.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<22>";
	dbg_array(t_r,4)[dbg_index]=0.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<22>";
	dbg_array(t_r,5)[dbg_index]=t_jy;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<22>";
	dbg_array(t_r,6)[dbg_index]=0.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<22>";
	dbg_array(t_r,7)[dbg_index]=0.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<23>";
	dbg_array(t_r,8)[dbg_index]=0.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<23>";
	dbg_array(t_r,9)[dbg_index]=0.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<23>";
	dbg_array(t_r,10)[dbg_index]=t_kz;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<23>";
	dbg_array(t_r,11)[dbg_index]=0.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<24>";
	dbg_array(t_r,12)[dbg_index]=0.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<24>";
	dbg_array(t_r,13)[dbg_index]=0.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<24>";
	dbg_array(t_r,14)[dbg_index]=0.0;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<24>";
	dbg_array(t_r,15)[dbg_index]=t_tw;
	pop_err();
}
function bb_math3d_Mat4Init2(t_ix,t_iy,t_iz,t_iw,t_jx,t_jy,t_jz,t_jw,t_kx,t_ky,t_kz,t_kw,t_tx,t_ty,t_tz,t_tw,t_r){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<28>";
	dbg_array(t_r,0)[dbg_index]=t_ix;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<28>";
	dbg_array(t_r,1)[dbg_index]=t_iy;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<28>";
	dbg_array(t_r,2)[dbg_index]=t_iz;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<28>";
	dbg_array(t_r,3)[dbg_index]=t_iw;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<29>";
	dbg_array(t_r,4)[dbg_index]=t_jx;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<29>";
	dbg_array(t_r,5)[dbg_index]=t_jy;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<29>";
	dbg_array(t_r,6)[dbg_index]=t_jz;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<29>";
	dbg_array(t_r,7)[dbg_index]=t_jw;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<30>";
	dbg_array(t_r,8)[dbg_index]=t_kx;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<30>";
	dbg_array(t_r,9)[dbg_index]=t_ky;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<30>";
	dbg_array(t_r,10)[dbg_index]=t_kz;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<30>";
	dbg_array(t_r,11)[dbg_index]=t_kw;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<31>";
	dbg_array(t_r,12)[dbg_index]=t_tx;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<31>";
	dbg_array(t_r,13)[dbg_index]=t_ty;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<31>";
	dbg_array(t_r,14)[dbg_index]=t_tz;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<31>";
	dbg_array(t_r,15)[dbg_index]=t_tw;
	pop_err();
}
function bb_math3d_Mat4Init3(t_r){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<35>";
	bb_math3d_Mat4Init(1.0,1.0,1.0,1.0,t_r);
	pop_err();
}
function bb_math3d_Mat4Multiply(t_m,t_n,t_r){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<87>";
	bb_math3d_Mat4Init2(dbg_array(t_m,0)[dbg_index]*dbg_array(t_n,0)[dbg_index]+dbg_array(t_m,4)[dbg_index]*dbg_array(t_n,1)[dbg_index]+dbg_array(t_m,8)[dbg_index]*dbg_array(t_n,2)[dbg_index]+dbg_array(t_m,12)[dbg_index]*dbg_array(t_n,3)[dbg_index],dbg_array(t_m,1)[dbg_index]*dbg_array(t_n,0)[dbg_index]+dbg_array(t_m,5)[dbg_index]*dbg_array(t_n,1)[dbg_index]+dbg_array(t_m,9)[dbg_index]*dbg_array(t_n,2)[dbg_index]+dbg_array(t_m,13)[dbg_index]*dbg_array(t_n,3)[dbg_index],dbg_array(t_m,2)[dbg_index]*dbg_array(t_n,0)[dbg_index]+dbg_array(t_m,6)[dbg_index]*dbg_array(t_n,1)[dbg_index]+dbg_array(t_m,10)[dbg_index]*dbg_array(t_n,2)[dbg_index]+dbg_array(t_m,14)[dbg_index]*dbg_array(t_n,3)[dbg_index],dbg_array(t_m,3)[dbg_index]*dbg_array(t_n,0)[dbg_index]+dbg_array(t_m,7)[dbg_index]*dbg_array(t_n,1)[dbg_index]+dbg_array(t_m,11)[dbg_index]*dbg_array(t_n,2)[dbg_index]+dbg_array(t_m,15)[dbg_index]*dbg_array(t_n,3)[dbg_index],dbg_array(t_m,0)[dbg_index]*dbg_array(t_n,4)[dbg_index]+dbg_array(t_m,4)[dbg_index]*dbg_array(t_n,5)[dbg_index]+dbg_array(t_m,8)[dbg_index]*dbg_array(t_n,6)[dbg_index]+dbg_array(t_m,12)[dbg_index]*dbg_array(t_n,7)[dbg_index],dbg_array(t_m,1)[dbg_index]*dbg_array(t_n,4)[dbg_index]+dbg_array(t_m,5)[dbg_index]*dbg_array(t_n,5)[dbg_index]+dbg_array(t_m,9)[dbg_index]*dbg_array(t_n,6)[dbg_index]+dbg_array(t_m,13)[dbg_index]*dbg_array(t_n,7)[dbg_index],dbg_array(t_m,2)[dbg_index]*dbg_array(t_n,4)[dbg_index]+dbg_array(t_m,6)[dbg_index]*dbg_array(t_n,5)[dbg_index]+dbg_array(t_m,10)[dbg_index]*dbg_array(t_n,6)[dbg_index]+dbg_array(t_m,14)[dbg_index]*dbg_array(t_n,7)[dbg_index],dbg_array(t_m,3)[dbg_index]*dbg_array(t_n,4)[dbg_index]+dbg_array(t_m,7)[dbg_index]*dbg_array(t_n,5)[dbg_index]+dbg_array(t_m,11)[dbg_index]*dbg_array(t_n,6)[dbg_index]+dbg_array(t_m,15)[dbg_index]*dbg_array(t_n,7)[dbg_index],dbg_array(t_m,0)[dbg_index]*dbg_array(t_n,8)[dbg_index]+dbg_array(t_m,4)[dbg_index]*dbg_array(t_n,9)[dbg_index]+dbg_array(t_m,8)[dbg_index]*dbg_array(t_n,10)[dbg_index]+dbg_array(t_m,12)[dbg_index]*dbg_array(t_n,11)[dbg_index],dbg_array(t_m,1)[dbg_index]*dbg_array(t_n,8)[dbg_index]+dbg_array(t_m,5)[dbg_index]*dbg_array(t_n,9)[dbg_index]+dbg_array(t_m,9)[dbg_index]*dbg_array(t_n,10)[dbg_index]+dbg_array(t_m,13)[dbg_index]*dbg_array(t_n,11)[dbg_index],dbg_array(t_m,2)[dbg_index]*dbg_array(t_n,8)[dbg_index]+dbg_array(t_m,6)[dbg_index]*dbg_array(t_n,9)[dbg_index]+dbg_array(t_m,10)[dbg_index]*dbg_array(t_n,10)[dbg_index]+dbg_array(t_m,14)[dbg_index]*dbg_array(t_n,11)[dbg_index],dbg_array(t_m,3)[dbg_index]*dbg_array(t_n,8)[dbg_index]+dbg_array(t_m,7)[dbg_index]*dbg_array(t_n,9)[dbg_index]+dbg_array(t_m,11)[dbg_index]*dbg_array(t_n,10)[dbg_index]+dbg_array(t_m,15)[dbg_index]*dbg_array(t_n,11)[dbg_index],dbg_array(t_m,0)[dbg_index]*dbg_array(t_n,12)[dbg_index]+dbg_array(t_m,4)[dbg_index]*dbg_array(t_n,13)[dbg_index]+dbg_array(t_m,8)[dbg_index]*dbg_array(t_n,14)[dbg_index]+dbg_array(t_m,12)[dbg_index]*dbg_array(t_n,15)[dbg_index],dbg_array(t_m,1)[dbg_index]*dbg_array(t_n,12)[dbg_index]+dbg_array(t_m,5)[dbg_index]*dbg_array(t_n,13)[dbg_index]+dbg_array(t_m,9)[dbg_index]*dbg_array(t_n,14)[dbg_index]+dbg_array(t_m,13)[dbg_index]*dbg_array(t_n,15)[dbg_index],dbg_array(t_m,2)[dbg_index]*dbg_array(t_n,12)[dbg_index]+dbg_array(t_m,6)[dbg_index]*dbg_array(t_n,13)[dbg_index]+dbg_array(t_m,10)[dbg_index]*dbg_array(t_n,14)[dbg_index]+dbg_array(t_m,14)[dbg_index]*dbg_array(t_n,15)[dbg_index],dbg_array(t_m,3)[dbg_index]*dbg_array(t_n,12)[dbg_index]+dbg_array(t_m,7)[dbg_index]*dbg_array(t_n,13)[dbg_index]+dbg_array(t_m,11)[dbg_index]*dbg_array(t_n,14)[dbg_index]+dbg_array(t_m,15)[dbg_index]*dbg_array(t_n,15)[dbg_index],t_r);
	pop_err();
}
function bb_math3d_Vec4Copy(t_v,t_r){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<9>";
	dbg_array(t_r,0)[dbg_index]=dbg_array(t_v,0)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<9>";
	dbg_array(t_r,1)[dbg_index]=dbg_array(t_v,1)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<9>";
	dbg_array(t_r,2)[dbg_index]=dbg_array(t_v,2)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<9>";
	dbg_array(t_r,3)[dbg_index]=dbg_array(t_v,3)[dbg_index];
	pop_err();
}
function bb_math3d_Vec4Copy2(t_v,t_r,t_src,t_dst){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<13>";
	dbg_array(t_r,0+t_dst)[dbg_index]=dbg_array(t_v,0+t_src)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<13>";
	dbg_array(t_r,1+t_dst)[dbg_index]=dbg_array(t_v,1+t_src)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<13>";
	dbg_array(t_r,2+t_dst)[dbg_index]=dbg_array(t_v,2+t_src)[dbg_index];
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<13>";
	dbg_array(t_r,3+t_dst)[dbg_index]=dbg_array(t_v,3+t_src)[dbg_index];
	pop_err();
}
function bb_math3d_Vec4Init(t_x,t_y,t_z,t_w,t_r){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<5>";
	dbg_array(t_r,0)[dbg_index]=t_x;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<5>";
	dbg_array(t_r,1)[dbg_index]=t_y;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<5>";
	dbg_array(t_r,2)[dbg_index]=t_z;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<5>";
	dbg_array(t_r,3)[dbg_index]=t_w;
	pop_err();
}
function bb_math3d_Mat4Transform(t_m,t_v,t_r){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<95>";
	bb_math3d_Vec4Init(dbg_array(t_m,0)[dbg_index]*dbg_array(t_v,0)[dbg_index]+dbg_array(t_m,4)[dbg_index]*dbg_array(t_v,1)[dbg_index]+dbg_array(t_m,8)[dbg_index]*dbg_array(t_v,2)[dbg_index]+dbg_array(t_m,12)[dbg_index]*dbg_array(t_v,3)[dbg_index],dbg_array(t_m,1)[dbg_index]*dbg_array(t_v,0)[dbg_index]+dbg_array(t_m,5)[dbg_index]*dbg_array(t_v,1)[dbg_index]+dbg_array(t_m,9)[dbg_index]*dbg_array(t_v,2)[dbg_index]+dbg_array(t_m,13)[dbg_index]*dbg_array(t_v,3)[dbg_index],dbg_array(t_m,2)[dbg_index]*dbg_array(t_v,0)[dbg_index]+dbg_array(t_m,6)[dbg_index]*dbg_array(t_v,1)[dbg_index]+dbg_array(t_m,10)[dbg_index]*dbg_array(t_v,2)[dbg_index]+dbg_array(t_m,14)[dbg_index]*dbg_array(t_v,3)[dbg_index],dbg_array(t_m,3)[dbg_index]*dbg_array(t_v,0)[dbg_index]+dbg_array(t_m,7)[dbg_index]*dbg_array(t_v,1)[dbg_index]+dbg_array(t_m,11)[dbg_index]*dbg_array(t_v,2)[dbg_index]+dbg_array(t_m,15)[dbg_index]*dbg_array(t_v,3)[dbg_index],t_r);
	pop_err();
}
function bb_math3d_Mat4Ortho(t_left,t_right,t_bottom,t_top,t_znear,t_zfar,t_r){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<46>";
	var t_w=t_right-t_left;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<46>";
	var t_h=t_top-t_bottom;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<46>";
	var t_d=t_zfar-t_znear;
	err_info="F:/progs/gamedev/monkey/modules/mojo2/math3d.monkey<47>";
	bb_math3d_Mat4Init2(2.0/t_w,0.0,0.0,0.0,0.0,2.0/t_h,0.0,0.0,0.0,0.0,2.0/t_d,0.0,-(t_right+t_left)/t_w,-(t_top+t_bottom)/t_h,-(t_zfar+t_znear)/t_d,1.0,t_r);
	pop_err();
}
function c_Menu(){
	Object.call(this);
	this.m_title=null;
	this.m_pressSpace=null;
	this.m_alpha=-1.0;
	this.implments={c_Scene:1};
}
c_Menu.m_new=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<21>";
	this.m_title=c_Image2.m_Load("monkey://data/title.png",.0,.0,0,null);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<22>";
	this.m_pressSpace=c_Image2.m_Load("monkey://data/press_space.png",.5,.5,0,null);
	pop_err();
	return this;
}
c_Menu.prototype.p_Start=function(){
	push_err();
	pop_err();
}
c_Menu.prototype.p_Update=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<29>";
	if((bb_input2_KeyDown(32))!=0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<29>";
		pop_err();
		return 2;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<31>";
	this.m_alpha+=dbg_object(c_Time.m_instance).m_lastFrame*1.5/1000.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<32>";
	if(this.m_alpha>1.0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<32>";
		this.m_alpha=-1.0;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<33>";
	pop_err();
	return 0;
}
c_Menu.prototype.p_Draw=function(t_canvas){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<37>";
	t_canvas.p_SetBlendMode(1);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<38>";
	t_canvas.p_SetColor2(1.0,1.0,1.0,1.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<39>";
	t_canvas.p_DrawImage4(this.m_title,0.0,0.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<40>";
	t_canvas.p_SetAlpha(bb_math_Abs2(this.m_alpha));
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<41>";
	t_canvas.p_DrawImage4(this.m_pressSpace,32.0,48.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/menu.monkey<42>";
	t_canvas.p_Flush();
	pop_err();
}
function c_Game(){
	Object.call(this);
	this.m_levels=[];
	this.m_currentLevel=0;
	this.implments={c_Scene:1};
}
c_Game.m_new=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<19>";
	c_AssetBox.m_Initialize();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<20>";
	c_Tileset.m_Initialize();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<21>";
	c_Animator.m_Initialize();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<22>";
	this.m_levels=new_object_array(1);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<23>";
	dbg_array(this.m_levels,0)[dbg_index]=(c_Level.m_new.call(new c_Level,(c_TestMap.m_new.call(new c_TestMap))));
	pop_err();
	return this;
}
c_Game.prototype.p_Start=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<27>";
	this.m_currentLevel=0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<28>";
	dbg_array(this.m_levels,this.m_currentLevel)[dbg_index].p_Start();
	pop_err();
}
c_Game.prototype.p_Update=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<32>";
	var t_status=dbg_array(this.m_levels,this.m_currentLevel)[dbg_index].p_Update();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<33>";
	if(t_status==2){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<34>";
		this.m_currentLevel+=1;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<35>";
		dbg_array(this.m_levels,this.m_currentLevel)[dbg_index].p_Start();
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<36>";
		if(t_status==1){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<37>";
			pop_err();
			return 1;
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<39>";
	pop_err();
	return 0;
}
c_Game.prototype.p_Draw=function(t_canvas){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/game.monkey<43>";
	dbg_array(this.m_levels,this.m_currentLevel)[dbg_index].p_Draw(t_canvas);
	pop_err();
}
function c_AssetBox(){
	Object.call(this);
}
c_AssetBox.m_GfxCharacter=[];
c_AssetBox.m_GfxMisc=[];
c_AssetBox.m_SfxExplo1=null;
c_AssetBox.m_SfxExplo2=null;
c_AssetBox.m_SfxExplo3=null;
c_AssetBox.m_SfxShoot=null;
c_AssetBox.m_SfxTrip=null;
c_AssetBox.m_SfxDie1=null;
c_AssetBox.m_SfxDie2=null;
c_AssetBox.m_SfxDie3=null;
c_AssetBox.m_Initialize=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/assetbox.monkey<23>";
	c_AssetBox.m_GfxCharacter=c_Image2.m_LoadFrames("monkey://data/character.png",64,false,.5,1.0,0,null);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/assetbox.monkey<24>";
	c_AssetBox.m_GfxMisc=c_Image2.m_LoadFrames("monkey://data/misc.png",64,false,.5,.5,0,null);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/assetbox.monkey<26>";
	c_AssetBox.m_SfxExplo1=bb_audio_LoadSound("monkey://data/explo1.wav");
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/assetbox.monkey<27>";
	c_AssetBox.m_SfxExplo2=bb_audio_LoadSound("monkey://data/explo2.wav");
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/assetbox.monkey<28>";
	c_AssetBox.m_SfxExplo3=bb_audio_LoadSound("monkey://data/explo3.wav");
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/assetbox.monkey<29>";
	c_AssetBox.m_SfxShoot=bb_audio_LoadSound("monkey://data/shoot.wav");
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/assetbox.monkey<30>";
	c_AssetBox.m_SfxTrip=bb_audio_LoadSound("monkey://data/trip.wav");
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/assetbox.monkey<31>";
	c_AssetBox.m_SfxDie1=bb_audio_LoadSound("monkey://data/die1.wav");
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/assetbox.monkey<32>";
	c_AssetBox.m_SfxDie2=bb_audio_LoadSound("monkey://data/die2.wav");
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/assetbox.monkey<33>";
	c_AssetBox.m_SfxDie3=bb_audio_LoadSound("monkey://data/die3.wav");
	pop_err();
}
function c_Sound(){
	Object.call(this);
	this.m_sample=null;
}
c_Sound.m_new=function(t_sample){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/audio.monkey<32>";
	dbg_object(this).m_sample=t_sample;
	pop_err();
	return this;
}
c_Sound.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/audio.monkey<29>";
	pop_err();
	return this;
}
function bb_audio_LoadSound(t_path){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/audio.monkey<47>";
	var t_sample=bb_audio_device.LoadSample(bb_data_FixDataPath(t_path));
	err_info="F:/progs/gamedev/monkey/modules/mojo/audio.monkey<48>";
	if((t_sample)!=null){
		err_info="F:/progs/gamedev/monkey/modules/mojo/audio.monkey<48>";
		var t_=c_Sound.m_new.call(new c_Sound,t_sample);
		pop_err();
		return t_;
	}
	err_info="F:/progs/gamedev/monkey/modules/mojo/audio.monkey<49>";
	pop_err();
	return null;
}
function c_Tileset(){
	Object.call(this);
}
c_Tileset.m_Tiles=[];
c_Tileset.m_Initialize=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/tileset.monkey<27>";
	c_Tileset.m_Tiles=c_Image2.m_LoadFrames("monkey://data/tileset.png",64,false,.0,.0,0,null);
	pop_err();
}
c_Tileset.m_TileType=[];
function c_Animator(){
	Object.call(this);
	this.m_status=0;
	this.m_currentStep=0;
	this.m_stepEnd=.0;
}
c_Animator.m_anims=[];
c_Animator.m_Initialize=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<33>";
	dbg_array(c_Animator.m_anims,0)[dbg_index]=[c_AnimStep.m_new.call(new c_AnimStep,0,500)];
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<34>";
	dbg_array(c_Animator.m_anims,1)[dbg_index]=[c_AnimStep.m_new.call(new c_AnimStep,1,120),c_AnimStep.m_new.call(new c_AnimStep,2,90),c_AnimStep.m_new.call(new c_AnimStep,3,120),c_AnimStep.m_new.call(new c_AnimStep,2,90)];
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<35>";
	dbg_array(c_Animator.m_anims,2)[dbg_index]=[c_AnimStep.m_new.call(new c_AnimStep,4,500)];
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<36>";
	dbg_array(c_Animator.m_anims,3)[dbg_index]=[c_AnimStep.m_new.call(new c_AnimStep,5,500)];
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<37>";
	dbg_array(c_Animator.m_anims,4)[dbg_index]=[c_AnimStep.m_new.call(new c_AnimStep,6,300)];
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<38>";
	dbg_array(c_Animator.m_anims,5)[dbg_index]=[c_AnimStep.m_new.call(new c_AnimStep,7,80),c_AnimStep.m_new.call(new c_AnimStep,8,80),c_AnimStep.m_new.call(new c_AnimStep,9,80),c_AnimStep.m_new.call(new c_AnimStep,10,80)];
	pop_err();
}
c_Animator.m_new=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<28>";
	pop_err();
	return this;
}
c_Animator.prototype.p_Animate=function(t_currentStatus,t_directionX,t_directionY){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<46>";
	var t_time=dbg_object(c_Time.m_instance).m_actTime;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<47>";
	var t_ended=false;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<48>";
	if(this.m_status!=t_currentStatus){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<49>";
		this.m_currentStep=0;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<50>";
		this.m_status=t_currentStatus;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<51>";
		this.m_stepEnd=t_time+(dbg_object(dbg_array(dbg_array(c_Animator.m_anims,this.m_status)[dbg_index],this.m_currentStep)[dbg_index]).m_timeMs)*bb_random_Rnd2(70.0,130.0)/100.0;
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<52>";
		if(t_time>=this.m_stepEnd){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<53>";
			if(this.m_currentStep==dbg_array(c_Animator.m_anims,this.m_status)[dbg_index].length-1){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<54>";
				this.m_currentStep=0;
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<55>";
				t_ended=true;
			}else{
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<57>";
				this.m_currentStep+=1;
			}
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<59>";
			this.m_stepEnd=t_time+(dbg_object(dbg_array(dbg_array(c_Animator.m_anims,this.m_status)[dbg_index],this.m_currentStep)[dbg_index]).m_timeMs)*bb_random_Rnd2(70.0,130.0)/100.0;
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<62>";
	var t_graph=dbg_object(dbg_array(dbg_array(c_Animator.m_anims,this.m_status)[dbg_index],this.m_currentStep)[dbg_index]).m_graph;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<63>";
	if(t_directionX<0.0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<64>";
		t_graph+=32;
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<65>";
		if(t_directionX>0.0){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<66>";
			t_graph+=48;
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<67>";
			if(t_directionY<0.0){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<68>";
				t_graph+=16;
			}
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<71>";
	var t_=c_AnimResult.m_new.call(new c_AnimResult,t_graph,t_ended);
	pop_err();
	return t_;
}
function c_AnimStep(){
	Object.call(this);
	this.m_graph=0;
	this.m_timeMs=0;
}
c_AnimStep.m_new=function(t_graph,t_timeMs){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<13>";
	dbg_object(this).m_graph=t_graph;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<14>";
	dbg_object(this).m_timeMs=t_timeMs;
	pop_err();
	return this;
}
c_AnimStep.m_new2=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<8>";
	pop_err();
	return this;
}
function c_Actor(){
	Object.call(this);
	this.m_directionY=.0;
	this.m_x=.0;
	this.m_y=.0;
	this.m_directionX=.0;
	this.m_z=.0;
}
c_Actor.m_new=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/actor.monkey<8>";
	pop_err();
	return this;
}
c_Actor.prototype.p_Update=function(){
	push_err();
	pop_err();
}
c_Actor.prototype.p_Draw2=function(t_canvas,t_camera){
	push_err();
	pop_err();
}
function c_Character(){
	c_Actor.call(this);
	this.m_level=null;
	this.m_atlas=[];
	this.m_animator=c_Animator.m_new.call(new c_Animator);
	this.m_map=null;
	this.m_status=0;
	this.m_inputMoveDown=false;
	this.m_inputMoveLeft=false;
	this.m_inputMoveRight=false;
	this.m_inputMoveUp=false;
	this.m_inputSlide=false;
	this.m_inputShoot=false;
	this.m_inputJump=false;
	this.m_timeToShoot=-1;
	this.m_velx=.0;
	this.m_vely=.0;
	this.m_collisionX=0;
	this.m_collisionY=0;
	this.m_jumpDistanceAcum=.0;
	this.m_timeToRecover=-1;
	this.m_img=0;
}
c_Character.prototype=extend_class(c_Actor);
c_Character.m_new=function(t_level){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<59>";
	c_Actor.m_new.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<60>";
	dbg_object(this).m_level=t_level;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<61>";
	this.m_atlas=c_AssetBox.m_GfxCharacter;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<62>";
	this.m_animator.p_Animate(0,0.0,1.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<63>";
	this.m_map=dbg_object(t_level).m_map;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<64>";
	this.m_directionY=1.0;
	pop_err();
	return this;
}
c_Character.m_new2=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<15>";
	c_Actor.m_new.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<15>";
	pop_err();
	return this;
}
c_Character.prototype.p_IA=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<158>";
	this.m_inputMoveDown=false;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<159>";
	this.m_inputMoveLeft=false;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<160>";
	this.m_inputMoveRight=false;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<161>";
	this.m_inputMoveUp=false;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<162>";
	this.m_inputSlide=false;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<163>";
	this.m_inputShoot=false;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<164>";
	this.m_inputJump=false;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<165>";
	if(((bb_input2_KeyDown(32))!=0) && (this.m_status==0 || this.m_status==1) && this.m_timeToShoot==-1){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<166>";
		this.m_timeToShoot=dbg_object(c_Time.m_instance).m_realActTime+400;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<167>";
		this.m_inputSlide=true;
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<168>";
		if(((bb_input2_KeyDown(32))!=0) && this.m_status==2){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<169>";
			if(dbg_object(c_Time.m_instance).m_realActTime>=this.m_timeToShoot){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<170>";
				this.m_inputShoot=true;
			}else{
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<172>";
				this.m_inputSlide=true;
			}
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<175>";
			if(this.m_timeToShoot!=-1 && this.m_status==2 && (this.m_velx!=0.0 || this.m_vely!=0.0)){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<176>";
				this.m_inputJump=true;
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<177>";
				this.m_timeToShoot=-1;
			}else{
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<179>";
				if(!((bb_input2_KeyDown(32))!=0)){
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<179>";
					this.m_timeToShoot=-1;
				}
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<180>";
				if((bb_input2_KeyDown(38))!=0){
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<181>";
					this.m_inputMoveUp=true;
				}else{
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<182>";
					if((bb_input2_KeyDown(40))!=0){
						err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<183>";
						this.m_inputMoveDown=true;
					}
				}
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<185>";
				if((bb_input2_KeyDown(37))!=0){
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<186>";
					this.m_inputMoveLeft=true;
				}else{
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<187>";
					if((bb_input2_KeyDown(39))!=0){
						err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<188>";
						this.m_inputMoveRight=true;
					}
				}
			}
		}
	}
	pop_err();
}
c_Character.prototype.p_DoDrift=function(t_delta){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<248>";
	var t_decel=t_delta*0.002;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<249>";
	var t_tile=0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<250>";
	var t_increase=.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<251>";
	if(bb_math_Abs2(this.m_velx)<t_decel){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<252>";
		this.m_velx=0.0;
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<254>";
		this.m_velx-=t_decel*bb_math_Sgn2(this.m_velx);
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<256>";
	if(bb_math_Abs2(this.m_vely)<t_decel){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<257>";
		this.m_vely=0.0;
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<259>";
		this.m_vely-=t_decel*bb_math_Sgn2(this.m_vely);
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<263>";
	this.m_x+=this.m_velx*t_delta/1000.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<264>";
	t_increase=bb_math_Sgn2(this.m_velx);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<265>";
	t_tile=this.m_map.p_GetTileTypeAt(this.m_x+t_increase*2.0,this.m_y);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<266>";
	while(t_tile==2 || t_tile==4){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<267>";
		this.m_x-=t_increase;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<268>";
		t_tile=this.m_map.p_GetTileTypeAt(this.m_x+t_increase*2.0,this.m_y);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<269>";
		this.m_collisionX=((t_increase)|0);
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<271>";
	this.m_y+=this.m_vely*t_delta/1000.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<272>";
	t_increase=bb_math_Sgn2(this.m_vely);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<273>";
	t_tile=this.m_map.p_GetTileTypeAt(this.m_x,this.m_y+t_increase*2.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<274>";
	while(t_tile==2 || t_tile==4){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<275>";
		this.m_y-=t_increase;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<276>";
		t_tile=this.m_map.p_GetTileTypeAt(this.m_x,this.m_y+t_increase*2.0);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<277>";
		this.m_collisionY=((t_increase)|0);
	}
	pop_err();
}
c_Character.prototype.p_DoRun=function(t_delta){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<195>";
	var t_tile=0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<196>";
	var t_increase=.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<197>";
	var t_vel=.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<198>";
	this.m_status=1;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<199>";
	this.m_directionX=0.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<200>";
	this.m_directionY=0.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<201>";
	this.m_velx=0.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<202>";
	this.m_vely=0.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<203>";
	if(this.m_inputMoveUp){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<204>";
		t_vel=45.0;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<205>";
		this.m_vely=-1.0;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<206>";
		this.m_directionY=-1.0;
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<207>";
		if(this.m_inputMoveDown){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<208>";
			t_vel=45.0;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<209>";
			this.m_vely=1.0;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<210>";
			this.m_directionY=1.0;
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<212>";
	if(this.m_inputMoveLeft){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<213>";
		if(t_vel>0.0){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<213>";
			t_vel=31.82;
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<213>";
			t_vel=45.0;
		}
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<214>";
		this.m_velx=-1.0;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<215>";
		this.m_directionX=-1.0;
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<216>";
		if(this.m_inputMoveRight){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<217>";
			if(t_vel>0.0){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<217>";
				t_vel=31.82;
			}else{
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<217>";
				t_vel=45.0;
			}
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<218>";
			this.m_velx=1.0;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<219>";
			this.m_directionX=1.0;
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<221>";
	this.m_velx*=t_vel;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<222>";
	this.m_vely*=t_vel;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<224>";
	this.m_x+=this.m_velx*t_delta/1000.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<225>";
	t_increase=bb_math_Sgn2(this.m_velx);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<226>";
	t_tile=this.m_map.p_GetTileTypeAt(this.m_x+t_increase*2.0,this.m_y);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<227>";
	while(t_tile==2 || t_tile==4){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<228>";
		this.m_x-=t_increase;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<229>";
		t_tile=this.m_map.p_GetTileTypeAt(this.m_x+t_increase*2.0,this.m_y);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<230>";
		this.m_collisionX=((t_increase)|0);
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<232>";
	this.m_y+=this.m_vely*t_delta/1000.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<233>";
	t_increase=bb_math_Sgn2(this.m_vely);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<234>";
	t_tile=this.m_map.p_GetTileTypeAt(this.m_x,this.m_y+t_increase*2.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<235>";
	while(t_tile==2 || t_tile==4){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<236>";
		this.m_y-=t_increase;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<237>";
		t_tile=this.m_map.p_GetTileTypeAt(this.m_x,this.m_y+t_increase*2.0);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<238>";
		this.m_collisionY=((t_increase)|0);
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<242>";
	if(this.m_velx!=0.0 && this.m_vely!=0.0 && ((this.m_collisionX)!=0) && ((this.m_collisionY)!=0) || this.m_velx!=0.0 && this.m_vely==0.0 && ((this.m_collisionX)!=0) || this.m_velx==0.0 && this.m_vely!=0.0 && ((this.m_collisionY)!=0)){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<243>";
		this.m_status=0;
	}
	pop_err();
}
c_Character.prototype.p_StopJump=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<312>";
	if(this.m_map.p_GetTileTypeAt(this.m_x,this.m_y)==4){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<313>";
		if(this.m_velx!=0.0 && this.m_vely!=0.0){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<314>";
			this.m_velx=bb_math_Sgn2(this.m_velx)*15.0;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<315>";
			this.m_vely=bb_math_Sgn2(this.m_vely)*15.0;
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<317>";
			this.m_velx=bb_math_Sgn2(this.m_velx)*15.0;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<318>";
			this.m_vely=bb_math_Sgn2(this.m_vely)*15.0;
		}
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<320>";
		bb_audio_PlaySound(c_AssetBox.m_SfxTrip,0,0);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<321>";
		this.m_status=5;
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<323>";
		this.m_status=0;
	}
	pop_err();
}
c_Character.prototype.p_DoJump=function(t_delta){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<282>";
	var t_tile=0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<283>";
	var t_increase=.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<286>";
	this.m_x+=this.m_velx*t_delta/1000.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<287>";
	t_increase=bb_math_Sgn2(this.m_velx);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<288>";
	t_tile=this.m_map.p_GetTileTypeAt(this.m_x+t_increase*2.0,this.m_y);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<289>";
	while(t_tile==2){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<290>";
		this.m_x-=t_increase;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<291>";
		t_tile=this.m_map.p_GetTileTypeAt(this.m_x+t_increase*2.0,this.m_y);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<292>";
		this.m_collisionX=((t_increase)|0);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<293>";
		this.m_status=0;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<295>";
	this.m_y+=this.m_vely*t_delta/1000.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<296>";
	t_increase=bb_math_Sgn2(this.m_vely);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<297>";
	t_tile=this.m_map.p_GetTileTypeAt(this.m_x,this.m_y+t_increase*2.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<298>";
	while(t_tile==2){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<299>";
		this.m_y-=t_increase;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<300>";
		t_tile=this.m_map.p_GetTileTypeAt(this.m_x,this.m_y+t_increase*2.0);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<301>";
		this.m_collisionY=((t_increase)|0);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<302>";
		this.m_status=0;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<305>";
	var t_xi=((Math.floor(this.m_velx*t_delta/1000.0+0.5))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<306>";
	var t_yi=((Math.floor(this.m_vely*t_delta/1000.0+0.5))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<307>";
	this.m_jumpDistanceAcum=this.m_jumpDistanceAcum+((Math.floor(Math.sqrt(t_xi*t_xi+t_yi*t_yi)+0.5))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<308>";
	if(((this.m_collisionX)!=0) || ((this.m_collisionY)!=0) || this.m_jumpDistanceAcum>=21.0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<308>";
		this.p_StopJump();
	}
	pop_err();
}
c_Character.prototype.p_DoFall=function(t_delta){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<328>";
	var t_tile=0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<329>";
	var t_increase=.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<331>";
	print(String(this.m_velx)+" "+String(this.m_vely));
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<333>";
	this.m_x+=this.m_velx*t_delta/1000.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<334>";
	t_increase=bb_math_Sgn2(this.m_velx);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<335>";
	t_tile=this.m_map.p_GetTileTypeAt(this.m_x+t_increase*2.0,this.m_y);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<336>";
	while(t_tile==2){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<337>";
		this.m_x-=t_increase;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<338>";
		t_tile=this.m_map.p_GetTileTypeAt(this.m_x+t_increase*2.0,this.m_y);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<339>";
		this.m_collisionX=((t_increase)|0);
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<341>";
	this.m_y+=this.m_vely*t_delta/1000.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<342>";
	t_increase=bb_math_Sgn2(this.m_vely);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<343>";
	t_tile=this.m_map.p_GetTileTypeAt(this.m_x,this.m_y+t_increase*2.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<344>";
	while(t_tile==2){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<345>";
		this.m_y-=t_increase;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<346>";
		t_tile=this.m_map.p_GetTileTypeAt(this.m_x,this.m_y+t_increase*2.0);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<347>";
		this.m_collisionY=((t_increase)|0);
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<350>";
	if(this.m_collisionX!=0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<350>";
		this.m_velx=-this.m_velx;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<351>";
	if(this.m_collisionY!=0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<351>";
		this.m_vely=-this.m_vely;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<353>";
	t_tile=this.m_map.p_GetTileTypeAt(this.m_x,this.m_y);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<354>";
	if(t_tile!=2 && t_tile!=4){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<355>";
		this.m_velx=0.0;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<356>";
		this.m_vely=0.0;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<357>";
		if(this.m_timeToRecover==-1){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<358>";
			this.m_timeToRecover=((dbg_object(c_Time.m_instance).m_actTime+700.0)|0);
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<359>";
			if(dbg_object(c_Time.m_instance).m_actTime>(this.m_timeToRecover)){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<360>";
				this.m_timeToRecover=-1;
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<361>";
				this.m_status=0;
			}
		}
	}
	pop_err();
}
c_Character.prototype.p_Update=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<68>";
	var t_delta=dbg_object(c_Time.m_instance).m_lastFrame;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<69>";
	var t_animResult=null;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<72>";
	if((bb_input2_KeyDown(82))!=0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<73>";
		this.m_status=0;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<74>";
		this.m_x=(dbg_object(this.m_map).m_width)*8.0/2.0;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<75>";
		this.m_y=(dbg_object(this.m_map).m_height)*8.0/2.0;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<79>";
	this.p_IA();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<80>";
	this.m_collisionX=0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<81>";
	this.m_collisionY=0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<82>";
	var t_1=this.m_status;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<83>";
	if(t_1==0 || t_1==1){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<84>";
		if(this.m_inputSlide){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<85>";
			this.m_status=2;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<86>";
			this.p_DoDrift(t_delta);
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<87>";
			if(this.m_inputMoveDown || this.m_inputMoveLeft || this.m_inputMoveRight || this.m_inputMoveUp){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<88>";
				this.p_DoRun(t_delta);
			}else{
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<90>";
				this.m_velx=0.0;
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<91>";
				this.m_vely=0.0;
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<92>";
				this.m_status=0;
			}
		}
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<94>";
		if(t_1==2){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<95>";
			if(this.m_inputJump){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<96>";
				this.m_jumpDistanceAcum=0.0;
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<97>";
				this.m_status=3;
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<98>";
				if(this.m_velx!=0.0 && this.m_vely!=0.0){
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<99>";
					this.m_velx=bb_math_Sgn2(this.m_velx)*16.0;
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<100>";
					this.m_vely=bb_math_Sgn2(this.m_vely)*16.0;
				}else{
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<102>";
					this.m_velx=bb_math_Sgn2(this.m_velx)*20.0;
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<103>";
					this.m_vely=bb_math_Sgn2(this.m_vely)*20.0;
				}
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<105>";
				this.p_DoJump(t_delta);
			}else{
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<106>";
				if(this.m_inputShoot){
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<107>";
					this.m_status=4;
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<108>";
					var t_shine=c_Shine.m_new.call(new c_Shine,this.m_level,45);
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<109>";
					dbg_object(t_shine).m_x=this.m_x+(this.m_directionX*6.0+this.m_directionY*2.0);
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<110>";
					dbg_object(t_shine).m_y=this.m_y-5.0+this.m_directionY*6.0;
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<111>";
					var t_shot=c_Shot.m_new.call(new c_Shot,this.m_level,this.m_directionX,this.m_directionY);
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<112>";
					dbg_object(t_shot).m_x=dbg_object(t_shine).m_x;
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<113>";
					dbg_object(t_shot).m_y=dbg_object(t_shine).m_y;
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<114>";
					this.m_level.p_AddActor(t_shine);
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<115>";
					this.m_level.p_AddActor(t_shot);
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<116>";
					dbg_object(this.m_level).m_camera.p_Shake(4.0);
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<117>";
					bb_audio_PlaySound(c_AssetBox.m_SfxShoot,0,0);
				}else{
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<118>";
					if(this.m_inputSlide){
						err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<119>";
						this.p_DoDrift(t_delta);
					}else{
						err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<121>";
						this.m_status=0;
					}
				}
			}
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<123>";
			if(t_1==3){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<124>";
				this.p_DoJump(t_delta);
			}else{
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<125>";
				if(t_1==5){
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<126>";
					this.p_DoFall(t_delta);
				}
			}
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<129>";
	this.m_x=((Math.floor(this.m_x+0.5))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<130>";
	this.m_y=((Math.floor(this.m_y+0.5))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<132>";
	t_animResult=this.m_animator.p_Animate(this.m_status,this.m_directionX,this.m_directionY);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<133>";
	if(dbg_object(t_animResult).m_ended){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<134>";
		var t_2=this.m_status;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<135>";
		if(t_2==4){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<136>";
			this.m_status=0;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<137>";
			t_animResult=this.m_animator.p_Animate(this.m_status,this.m_directionX,this.m_directionY);
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<140>";
	this.m_img=dbg_object(t_animResult).m_graph;
	pop_err();
}
c_Character.prototype.p_Draw2=function(t_canvas,t_camera){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<144>";
	t_canvas.p_SetColor2(1.0,1.0,1.0,1.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<146>";
	var t_i=((Math.floor((this.m_y+0.5)/8.0))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<147>";
	var t_j=((Math.floor((this.m_x+0.5)/8.0))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<148>";
	t_canvas.p_SetBlendMode(3);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<149>";
	var t_tile=dbg_array(dbg_object(this.m_map).m_tiles,t_i*dbg_object(this.m_map).m_width+t_j)[dbg_index];
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<150>";
	t_canvas.p_DrawImage4(dbg_array(c_Tileset.m_Tiles,t_tile)[dbg_index],(t_j)*8.0-(dbg_object(t_camera).m_x0),(t_i)*8.0-(dbg_object(t_camera).m_y0));
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<153>";
	t_canvas.p_SetBlendMode(1);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/character.monkey<154>";
	t_canvas.p_DrawImage4(dbg_array(this.m_atlas,this.m_img)[dbg_index],this.m_x-(dbg_object(t_camera).m_x0),this.m_y-(dbg_object(t_camera).m_y0));
	pop_err();
}
function c_Level(){
	Object.call(this);
	this.m_map=null;
	this.m_camera=null;
	this.m_chr=null;
	this.m_world=c_ActorList.m_new.call(new c_ActorList);
	this.implments={c_Scene:1};
}
c_Level.m_new=function(t_map){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<25>";
	dbg_object(this).m_map=t_map;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<27>";
	if(true){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<31>";
		this.m_chr=c_Character.m_new.call(new c_Character,this);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<32>";
		this.m_camera=c_Camera.m_new.call(new c_Camera,(this.m_chr));
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<34>";
	this.m_world.p_AddFirst(this.m_chr);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<35>";
	dbg_object(this.m_chr).m_x=(((dbg_object(t_map).m_width)*8.0/2.0+0.5)|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<36>";
	dbg_object(this.m_chr).m_y=(((dbg_object(t_map).m_height)*8.0/2.0+0.5)|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<37>";
	dbg_object(this.m_camera).m_x=dbg_object(this.m_chr).m_x;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<38>";
	dbg_object(this.m_camera).m_y=dbg_object(this.m_chr).m_y;
	pop_err();
	return this;
}
c_Level.m_new2=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<17>";
	pop_err();
	return this;
}
c_Level.prototype.p_Start=function(){
	push_err();
	pop_err();
}
c_Level.prototype.p_Update=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<45>";
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<45>";
	var t_=this.m_world.p_ObjectEnumerator();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<45>";
	while(t_.p_HasNext()){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<45>";
		var t_actor=t_.p_NextObject();
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<46>";
		t_actor.p_Update();
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<48>";
	this.m_camera.p_Update();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<49>";
	pop_err();
	return 0;
}
c_Level.prototype.p_Draw=function(t_canvas){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<53>";
	t_canvas.p_SetBlendMode(1);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<54>";
	t_canvas.p_SetColor2(1.0,1.0,1.0,1.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<56>";
	this.m_map.p_Draw2(t_canvas,this.m_camera);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<57>";
	this.m_world.p_Sort(0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<58>";
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<58>";
	var t_=this.m_world.p_ObjectEnumerator();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<58>";
	while(t_.p_HasNext()){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<58>";
		var t_actor=t_.p_NextObject();
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<59>";
		t_actor.p_Draw2(t_canvas,this.m_camera);
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<61>";
	this.m_camera.p_Draw2(t_canvas,this.m_camera);
	pop_err();
}
c_Level.prototype.p_AddActor=function(t_actor){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<65>";
	this.m_world.p_AddLast(t_actor);
	pop_err();
}
c_Level.prototype.p_RemoveActor=function(t_actor){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/scenes/level.monkey<69>";
	this.m_world.p_Remove(t_actor);
	pop_err();
}
function c_GameMap(){
	Object.call(this);
	this.m_width=0;
	this.m_height=0;
	this.m_tiles=[];
}
c_GameMap.m_new=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<11>";
	pop_err();
	return this;
}
c_GameMap.prototype.p_Draw2=function(t_canvas,t_camera){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<19>";
	var t_x0=((-((dbg_object(t_camera).m_x0) % 8.0))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<20>";
	var t_y=((-((dbg_object(t_camera).m_y0) % 8.0))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<22>";
	var t_tileI0=(((dbg_object(t_camera).m_y0)/8.0)|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<23>";
	var t_tileI1=(((t_tileI0)+8.0)|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<24>";
	var t_tileJ0=(((dbg_object(t_camera).m_x0)/8.0)|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<25>";
	var t_tileJ1=(((t_tileJ0)+8.0)|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<27>";
	for(var t_i=t_tileI0;t_i<=t_tileI1;t_i=t_i+1){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<28>";
		if(t_i>=0 && t_i<this.m_height){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<29>";
			var t_x=t_x0;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<30>";
			for(var t_j=t_tileJ0;t_j<=t_tileJ1;t_j=t_j+1){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<31>";
				if(t_j>=0 && t_j<this.m_width){
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<32>";
					var t_imgN=dbg_array(this.m_tiles,t_i*this.m_width+t_j)[dbg_index];
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<33>";
					var t_img=dbg_array(c_Tileset.m_Tiles,t_imgN)[dbg_index];
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<34>";
					t_canvas.p_DrawImage4(t_img,(t_x),(t_y));
				}
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<36>";
				t_x=(((t_x)+8.0)|0);
			}
		}
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<39>";
		t_y=(((t_y)+8.0)|0);
	}
	pop_err();
}
c_GameMap.prototype.p_GetTileTypeAt=function(t_x,t_y){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<45>";
	var t_i=((Math.floor((t_y-0.5)/8.0))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<46>";
	var t_j=((Math.floor((t_x+0.5)/8.0))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<47>";
	if(t_i<0 || t_i>=this.m_height){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<47>";
		pop_err();
		return 2;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<48>";
	if(t_j<0 || t_j>=this.m_width){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<48>";
		pop_err();
		return 2;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/gamemap.monkey<49>";
	var t_=dbg_array(c_Tileset.m_TileType,dbg_array(this.m_tiles,t_i*this.m_width+t_j)[dbg_index])[dbg_index];
	pop_err();
	return t_;
}
function c_TestMap(){
	c_GameMap.call(this);
}
c_TestMap.prototype=extend_class(c_GameMap);
c_TestMap.m_new=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/testmap.monkey<10>";
	c_GameMap.m_new.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/testmap.monkey<11>";
	this.m_width=48;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/testmap.monkey<12>";
	this.m_height=48;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/maps/testmap.monkey<61>";
	this.m_tiles=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,20,16,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,20,19,16,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,20,17,18,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,19,19,20,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,19,16,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,16,18,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,17,20,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,16,20,19,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,19,17,19,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,17,18,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,19,17,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,1,4,0,0,0,3,0,4,0,0,0,18,19,19,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,2,2,1,0,3,2,0,1,0,4,4,2,3,0,0,0,4,19,17,20,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,2,4,3,1,0,0,1,0,4,51,50,50,50,0,0,2,4,4,0,3,16,16,18,0,0,0,0,0,0,0,0,3,3,54,54,55,0,0,0,0,0,0,0,0,1,3,0,0,4,4,1,2,2,3,2,3,3,50,50,50,50,1,3,3,1,3,4,3,16,20,18,4,0,0,0,0,0,0,0,11,1,34,34,34,0,0,0,0,0,0,0,0,1,1,3,4,0,0,1,2,2,4,2,0,0,46,46,46,46,2,3,0,1,1,0,3,17,16,16,0,0,0,0,0,0,0,0,0,2,34,34,34,0,0,1,3,1,3,0,0,0,2,3,3,0,2,2,0,3,2,3,1,4,44,47,47,44,1,4,52,52,52,52,3,19,18,17,4,0,0,0,0,0,0,0,3,14,34,34,34,2,3,0,1,4,2,4,1,0,2,4,3,1,3,52,52,52,0,3,2,4,44,45,45,44,4,0,42,38,34,46,4,17,18,19,4,0,0,0,0,0,0,0,2,0,32,33,32,3,16,18,20,20,17,54,54,54,54,54,54,3,3,46,47,46,2,2,11,10,1,2,0,14,0,3,43,39,35,46,0,20,16,18,3,0,0,0,0,0,0,0,1,1,0,3,1,2,0,9,17,15,15,54,54,54,54,54,54,3,2,44,45,44,0,4,3,1,2,4,0,4,3,0,40,36,32,44,4,20,19,18,3,3,0,0,0,0,0,0,0,10,4,0,1,4,18,23,19,23,16,42,42,43,42,42,43,3,0,15,16,10,2,4,9,1,48,48,48,49,1,2,4,13,13,3,4,20,18,16,2,2,0,0,0,0,0,0,48,48,49,48,49,48,0,3,19,2,15,42,42,40,42,42,43,2,1,2,16,4,13,13,2,3,48,48,48,49,4,3,3,3,2,4,2,22,22,22,0,1,0,0,0,0,0,0,48,48,49,48,49,48,16,23,20,23,16,42,42,43,42,42,40,1,3,2,16,2,2,0,0,1,34,35,34,34,4,1,50,51,50,50,2,19,16,17,2,3,0,0,0,0,0,0,46,46,47,47,47,44,4,2,18,3,0,40,40,40,40,40,40,3,3,0,20,3,2,1,3,1,34,35,34,34,0,2,38,39,38,36,2,16,16,16,3,0,0,0,0,0,0,0,46,46,45,44,45,46,10,4,16,3,14,40,41,40,40,41,40,12,10,2,19,2,12,12,2,1,32,32,33,32,1,3,36,36,37,36,15,19,19,19,0,0,0,0,0,0,0,0,14,3,19,12,4,12,3,8,20,7,0,2,1,4,2,2,4,0,3,8,18,7,1,0,3,3,0,14,4,3,1,4,2,1,4,1,8,24,24,24,2,0,0,0,0,0,0,0,2,9,18,18,18,19,19,16,20,17,19,19,19,18,18,18,18,16,17,20,18,16,19,21,21,19,16,17,16,16,18,17,16,16,21,17,23,20,20,17,3,0,0,0,0,0,0,0,0,0,1,1,1,0,1,0,0,4,0,1,2,6,18,19,16,19,16,18,19,17,16,21,21,20,18,16,18,19,20,18,20,20,21,20,23,17,18,17,4,0,0,0,0,0,0,0,0,3,3,1,1,0,0,0,0,0,0,3,3,3,19,16,5,48,48,55,54,54,4,3,2,3,3,4,4,2,4,3,0,1,3,3,6,24,24,24,4,0,0,0,0,0,0,0,0,4,1,0,2,0,0,0,0,0,0,1,1,3,16,18,2,46,47,42,42,42,1,2,3,12,12,12,1,4,12,12,12,12,0,9,0,19,17,17,0,0,0,0,0,0,0,0,4,3,3,1,0,0,0,0,0,0,1,4,4,3,16,16,14,46,45,40,41,40,3,1,4,2,1,10,0,2,3,0,0,0,0,0,0,22,22,22,3,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,2,2,0,1,0,17,19,1,1,0,0,0,3,3,13,13,3,2,4,3,0,3,0,0,4,3,4,0,22,22,22,0,0,0,0,0,0,0,0,0,4,0,2,0,4,0,1,0,3,3,0,1,2,22,22,0,0,3,3,0,4,0,2,0,0,9,2,13,13,3,4,11,13,13,1,0,19,16,18,0,0,0,0,0,0,0,0,3,0,4,0,0,2,1,0,2,3,0,3,0,1,16,18,0,50,50,50,51,1,3,2,1,4,3,0,3,3,4,2,3,10,4,0,0,16,16,19,0,0,0,0,0,0,0,0,1,0,3,0,1,0,4,1,2,2,1,0,0,1,18,17,14,34,33,35,34,10,1,0,15,1,1,1,2,4,0,4,3,1,3,3,12,17,18,16,0,0,0,0,0,0,0,0,3,3,0,1,3,3,1,1,0,3,1,2,4,8,24,24,7,4,3,0,1,2,0,4,2,1,4,12,12,12,12,1,4,12,12,12,12,24,24,24,4,0,3,0,2,0,0,0,16,17,18,18,18,17,16,17,17,16,21,21,21,23,16,19,16,16,17,17,16,18,20,18,20,19,19,18,16,20,16,21,21,18,19,19,23,18,16,16,23,20,21,19,19,19,19,16,18,19,18,17,16,19,19,19,16,19,21,21,21,23,16,19,20,16,19,17,19,18,18,17,20,20,16,16,17,17,19,21,21,16,18,16,23,20,18,20,23,20,21,19,18,20,20,16,16,18,16,20,19,16,18,20,17,20,21,21,21,23,18,17,18,19,16,20,18,16,20,16,16,20,17,17,19,20,16,21,21,18,19,20,23,20,19,17,0,0,0,0,0,4,0,0,17,16,19,18,19,16,19,16,17,20,21,21,21,23,20,17,17,16,19,19,16,19,17,18,18,18,17,18,16,17,18,21,21,16,19,16,23,17,20,16,0,0,0,0,0,3,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,1,0,0,0,2,4,0,4,2,2,0,0,0,0,3,3,0,0,0,24,24,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,3,0,0,0,22,22,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,20,16,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,16,18,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,16,17,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,16,20,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,16,20,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,16,16,16,0,0,0,0,0,0,0,0];
	pop_err();
	return this;
}
function c_Camera(){
	c_Actor.call(this);
	this.m_owner=null;
	this.m_destX=0;
	this.m_destY=0;
	this.m_shaking=.0;
	this.m_x0=0;
	this.m_y0=0;
}
c_Camera.prototype=extend_class(c_Actor);
c_Camera.m_new=function(t_cameraOwner){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<26>";
	c_Actor.m_new.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<27>";
	this.m_owner=t_cameraOwner;
	pop_err();
	return this;
}
c_Camera.m_new2=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<9>";
	c_Actor.m_new.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<9>";
	pop_err();
	return this;
}
c_Camera.prototype.p_Update=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<31>";
	this.m_destX=((Math.floor(dbg_object(this.m_owner).m_x+18.285714285714285*dbg_object(this.m_owner).m_directionX+0.5))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<32>";
	this.m_destY=((Math.floor(dbg_object(this.m_owner).m_y+18.285714285714285*dbg_object(this.m_owner).m_directionY+0.5))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<34>";
	if(this.m_x!=(this.m_destX) || this.m_y!=(this.m_destY)){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<35>";
		var t_vel=80.0*dbg_object(c_Time.m_instance).m_lastFrame/1000.0;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<36>";
		var t_dist=Math.sqrt(Math.pow((this.m_destX)-this.m_x,2.0)+Math.pow((this.m_destY)-this.m_y,2.0));
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<37>";
		var t_angle=(Math.atan2((this.m_destY)-this.m_y,(this.m_destX)-this.m_x)*R2D);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<38>";
		if(t_dist<t_vel){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<39>";
			this.m_x=(this.m_destX);
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<40>";
			this.m_y=(this.m_destY);
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<42>";
			var t_velX=t_vel*Math.cos((t_angle)*D2R);
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<43>";
			var t_velY=t_vel*Math.sin((t_angle)*D2R);
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<44>";
			this.m_x=this.m_x+t_velX;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<45>";
			this.m_y=this.m_y+t_velY;
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<48>";
	var t_shiftX=.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<49>";
	var t_shiftY=.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<50>";
	if(this.m_shaking>0.0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<51>";
		t_shiftX=bb_random_Rnd2(-this.m_shaking,this.m_shaking);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<52>";
		t_shiftY=bb_random_Rnd2(-this.m_shaking,this.m_shaking);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<53>";
		this.m_shaking-=1.0;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<55>";
	this.m_x=((Math.floor(this.m_x+t_shiftX+0.5))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<56>";
	this.m_y=((Math.floor(this.m_y+t_shiftY+0.5))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<57>";
	this.m_x0=((Math.floor(this.m_x-32.0+0.5))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<58>";
	this.m_y0=((Math.floor(this.m_y-32.0+0.5))|0);
	pop_err();
}
c_Camera.prototype.p_Shake=function(t_magnitude){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/camera.monkey<62>";
	this.m_shaking=t_magnitude;
	pop_err();
}
function c_CameraEditor(){
	c_Camera.call(this);
	this.m_map=null;
	this.m_currentTile=0;
}
c_CameraEditor.prototype=extend_class(c_Camera);
c_CameraEditor.m_new=function(t_map){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<21>";
	c_Camera.m_new2.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<22>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_CameraEditor.m_new2=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<9>";
	c_Camera.m_new2.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<9>";
	pop_err();
	return this;
}
c_CameraEditor.prototype.p_Update=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<26>";
	var t_vel=32.0*dbg_object(c_Time.m_instance).m_realLastFrame/1000.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<27>";
	if((bb_input2_KeyDown(32))!=0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<28>";
		this.m_x=(((dbg_object(this.m_map).m_width)*8.0/2.0+0.5)|0);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<29>";
		this.m_y=(((dbg_object(this.m_map).m_height)*8.0/2.0+0.5)|0);
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<31>";
		if((bb_input2_KeyDown(16))!=0){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<31>";
			t_vel*=2.0;
		}
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<32>";
		if((bb_input2_KeyDown(17))!=0){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<32>";
			t_vel*=4.0;
		}
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<33>";
		if((bb_input2_KeyDown(38))!=0){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<34>";
			this.m_y-=t_vel;
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<35>";
			if((bb_input2_KeyDown(40))!=0){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<36>";
				this.m_y+=t_vel;
			}
		}
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<38>";
		if((bb_input2_KeyDown(37))!=0){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<39>";
			this.m_x-=t_vel;
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<40>";
			if((bb_input2_KeyDown(39))!=0){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<41>";
				this.m_x+=t_vel;
			}
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<45>";
	var t_mx=bb_input_TMouseX();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<46>";
	var t_my=bb_input_TMouseY();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<48>";
	if(t_my>=54.0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<49>";
		if(((bb_input_MouseHitLeft)!=0) || ((bb_input_MouseHitRight)!=0)){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<50>";
			var t_offset=((Math.floor((t_mx-28.0)/9.0))|0);
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<51>";
			this.m_currentTile+=t_offset;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<52>";
			if(this.m_currentTile<0){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<52>";
				this.m_currentTile=0;
			}
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<53>";
			if(this.m_currentTile>c_Tileset.m_Tiles.length){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<53>";
				this.m_currentTile=c_Tileset.m_Tiles.length-1;
			}
		}
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<56>";
		var t_screenX0=this.m_x-32.0;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<57>";
		var t_screenY0=this.m_y-32.0;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<58>";
		var t_i=((Math.floor((t_my+t_screenY0)/8.0))|0);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<59>";
		var t_j=((Math.floor((t_mx+t_screenX0)/8.0))|0);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<60>";
		if(t_i>=0 && t_j>=0 && t_i<dbg_object(this.m_map).m_height && t_j<dbg_object(this.m_map).m_width){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<61>";
			if((bb_input_MouseDownLeft)!=0){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<62>";
				dbg_array(dbg_object(this.m_map).m_tiles,t_i*dbg_object(this.m_map).m_width+t_j)[dbg_index]=this.m_currentTile;
			}else{
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<63>";
				if((bb_input_MouseDownRight)!=0){
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<64>";
					this.m_currentTile=dbg_array(dbg_object(this.m_map).m_tiles,t_i*dbg_object(this.m_map).m_width+t_j)[dbg_index];
				}
			}
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<66>";
			if((bb_input2_KeyDown(96))!=0){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<67>";
				var t_tile=dbg_array(dbg_object(this.m_map).m_tiles,t_i*dbg_object(this.m_map).m_width+t_j)[dbg_index];
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<68>";
				if(t_tile>=0 && t_tile<=4){
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<69>";
					t_tile=((bb_random_Rnd2(0.0,5.0))|0);
				}else{
					err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<70>";
					if(t_tile>=16 && t_tile<=20){
						err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<71>";
						t_tile=((bb_random_Rnd2(16.0,21.0))|0);
					}
				}
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<73>";
				dbg_array(dbg_object(this.m_map).m_tiles,t_i*dbg_object(this.m_map).m_width+t_j)[dbg_index]=t_tile;
			}
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<78>";
	if((bb_input2_KeyHit(80))!=0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<79>";
		for(var t_i2=1;t_i2<=100;t_i2=t_i2+1){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<80>";
			print("");
		}
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<82>";
		for(var t_i3=0;t_i3<=dbg_object(this.m_map).m_height-1;t_i3=t_i3+1){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<83>";
			var t_line="";
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<84>";
			var t_offset2=t_i3*dbg_object(this.m_map).m_width;
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<85>";
			for(var t_j2=0;t_j2<=dbg_object(this.m_map).m_width-1;t_j2=t_j2+1){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<86>";
				t_line=t_line+(String(dbg_array(dbg_object(this.m_map).m_tiles,t_offset2)[dbg_index])+",");
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<87>";
				t_offset2+=1;
			}
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<89>";
			print(t_line);
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<93>";
	this.m_x0=((this.m_x-32.0+0.5)|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<94>";
	this.m_y0=((this.m_y-32.0+0.5)|0);
	pop_err();
}
c_CameraEditor.prototype.p_Draw2=function(t_canvas,t_camera){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<98>";
	t_canvas.p_SetColor2(0.1,0.1,0.1,1.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<99>";
	t_canvas.p_DrawRect(0.0,54.0,64.0,10.0,null,0.0,0.0,1.0,1.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<100>";
	t_canvas.p_SetColor2(1.0,0.1,0.1,1.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<101>";
	t_canvas.p_DrawRect(27.0,54.0,10.0,10.0,null,0.0,0.0,1.0,1.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<103>";
	t_canvas.p_SetColor2(1.0,1.0,1.0,1.0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<105>";
	var t_y=55;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<106>";
	var t_tile=this.m_currentTile-4;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<108>";
	var t_x=-8;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<109>";
	while((t_x)<64.0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<110>";
		if(t_tile>=0 && t_tile<c_Tileset.m_Tiles.length){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<111>";
			t_canvas.p_DrawImage4(dbg_array(c_Tileset.m_Tiles,t_tile)[dbg_index],(t_x),(t_y));
		}
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<113>";
		t_tile+=1;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/cameraeditor.monkey<114>";
		t_x=(((t_x)+9.0)|0);
	}
	pop_err();
}
function c_DummyCharacter(){
	c_Character.call(this);
}
c_DummyCharacter.prototype=extend_class(c_Character);
c_DummyCharacter.m_new=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/dummycharacter.monkey<7>";
	c_Character.m_new2.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/dummycharacter.monkey<7>";
	pop_err();
	return this;
}
c_DummyCharacter.prototype.p_Update=function(){
	push_err();
	pop_err();
}
function c_AnimResult(){
	Object.call(this);
	this.m_graph=0;
	this.m_ended=false;
}
c_AnimResult.m_new=function(t_graph,t_ended){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<23>";
	dbg_object(this).m_graph=t_graph;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<24>";
	dbg_object(this).m_ended=t_ended;
	pop_err();
	return this;
}
c_AnimResult.m_new2=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/animator.monkey<18>";
	pop_err();
	return this;
}
var bb_random_Seed=0;
function bb_random_Rnd(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/random.monkey<21>";
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	err_info="F:/progs/gamedev/monkey/modules/monkey/random.monkey<22>";
	var t_=(bb_random_Seed>>8&16777215)/16777216.0;
	pop_err();
	return t_;
}
function bb_random_Rnd2(t_low,t_high){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/random.monkey<30>";
	var t_=bb_random_Rnd3(t_high-t_low)+t_low;
	pop_err();
	return t_;
}
function bb_random_Rnd3(t_range){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/random.monkey<26>";
	var t_=bb_random_Rnd()*t_range;
	pop_err();
	return t_;
}
function c_List(){
	Object.call(this);
	this.m__head=(c_HeadNode.m_new.call(new c_HeadNode));
}
c_List.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_List.prototype.p_AddLast=function(t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<108>";
	var t_=c_Node7.m_new.call(new c_Node7,this.m__head,dbg_object(this.m__head).m__pred,t_data);
	pop_err();
	return t_;
}
c_List.m_new2=function(t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<13>";
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[dbg_index];
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<14>";
		this.p_AddLast(t_t);
	}
	pop_err();
	return this;
}
c_List.prototype.p_AddFirst=function(t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<104>";
	var t_=c_Node7.m_new.call(new c_Node7,dbg_object(this.m__head).m__succ,this.m__head,t_data);
	pop_err();
	return t_;
}
c_List.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<186>";
	var t_=c_Enumerator.m_new.call(new c_Enumerator,this);
	pop_err();
	return t_;
}
c_List.prototype.p_Compare3=function(t_lhs,t_rhs){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<32>";
	error("Unable to compare items");
	pop_err();
	return 0;
}
c_List.prototype.p_Sort=function(t_ascending){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<194>";
	var t_ccsgn=-1;
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<195>";
	if((t_ascending)!=0){
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<195>";
		t_ccsgn=1;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<196>";
	var t_insize=1;
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<198>";
	do{
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<199>";
		var t_merges=0;
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<200>";
		var t_tail=this.m__head;
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<201>";
		var t_p=dbg_object(this.m__head).m__succ;
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<203>";
		while(t_p!=this.m__head){
			err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<204>";
			t_merges+=1;
			err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<205>";
			var t_q=dbg_object(t_p).m__succ;
			err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<205>";
			var t_qsize=t_insize;
			err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<205>";
			var t_psize=1;
			err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<207>";
			while(t_psize<t_insize && t_q!=this.m__head){
				err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<208>";
				t_psize+=1;
				err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<209>";
				t_q=dbg_object(t_q).m__succ;
			}
			err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<212>";
			do{
				err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<213>";
				var t_t=null;
				err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<214>";
				if(((t_psize)!=0) && ((t_qsize)!=0) && t_q!=this.m__head){
					err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<215>";
					var t_cc=this.p_Compare3(dbg_object(t_p).m__data,dbg_object(t_q).m__data)*t_ccsgn;
					err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<216>";
					if(t_cc<=0){
						err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<217>";
						t_t=t_p;
						err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<218>";
						t_p=dbg_object(t_p).m__succ;
						err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<219>";
						t_psize-=1;
					}else{
						err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<221>";
						t_t=t_q;
						err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<222>";
						t_q=dbg_object(t_q).m__succ;
						err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<223>";
						t_qsize-=1;
					}
				}else{
					err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<225>";
					if((t_psize)!=0){
						err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<226>";
						t_t=t_p;
						err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<227>";
						t_p=dbg_object(t_p).m__succ;
						err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<228>";
						t_psize-=1;
					}else{
						err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<229>";
						if(((t_qsize)!=0) && t_q!=this.m__head){
							err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<230>";
							t_t=t_q;
							err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<231>";
							t_q=dbg_object(t_q).m__succ;
							err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<232>";
							t_qsize-=1;
						}else{
							err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<234>";
							break;
						}
					}
				}
				err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<236>";
				dbg_object(t_t).m__pred=t_tail;
				err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<237>";
				dbg_object(t_tail).m__succ=t_t;
				err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<238>";
				t_tail=t_t;
			}while(!(false));
			err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<240>";
			t_p=t_q;
		}
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<242>";
		dbg_object(t_tail).m__succ=this.m__head;
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<243>";
		dbg_object(this.m__head).m__pred=t_tail;
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<245>";
		if(t_merges<=1){
			err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<245>";
			pop_err();
			return 0;
		}
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<247>";
		t_insize*=2;
	}while(!(false));
}
c_List.prototype.p_Equals=function(t_lhs,t_rhs){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<28>";
	var t_=t_lhs==t_rhs;
	pop_err();
	return t_;
}
c_List.prototype.p_RemoveEach=function(t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<151>";
	var t_node=dbg_object(this.m__head).m__succ;
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<152>";
	while(t_node!=this.m__head){
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<153>";
		var t_succ=dbg_object(t_node).m__succ;
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<154>";
		if(this.p_Equals(dbg_object(t_node).m__data,t_value)){
			err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<154>";
			t_node.p_Remove2();
		}
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<155>";
		t_node=t_succ;
	}
	pop_err();
	return 0;
}
c_List.prototype.p_Remove=function(t_value){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<137>";
	this.p_RemoveEach(t_value);
	pop_err();
}
function c_ActorList(){
	c_List.call(this);
}
c_ActorList.prototype=extend_class(c_List);
c_ActorList.m_new=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/actorlist.monkey<7>";
	c_List.m_new.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/actorlist.monkey<7>";
	pop_err();
	return this;
}
c_ActorList.prototype.p_Compare3=function(t_a,t_b){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/actorlist.monkey<10>";
	if(dbg_object(t_a).m_z<dbg_object(t_b).m_z){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/actorlist.monkey<10>";
		pop_err();
		return -1;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/actorlist.monkey<11>";
	if(dbg_object(t_a).m_z>dbg_object(t_b).m_z){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/actorlist.monkey<11>";
		pop_err();
		return 1;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/actorlist.monkey<12>";
	if(dbg_object(t_a).m_y<dbg_object(t_b).m_y){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/actorlist.monkey<12>";
		pop_err();
		return -1;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/actorlist.monkey<13>";
	if(dbg_object(t_a).m_y>dbg_object(t_b).m_y){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/actorlist.monkey<13>";
		pop_err();
		return 1;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/actorlist.monkey<14>";
	pop_err();
	return 0;
}
function c_Node7(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node7.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<261>";
	this.m__succ=t_succ;
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<262>";
	this.m__pred=t_pred;
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<263>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<264>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<265>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node7.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<258>";
	pop_err();
	return this;
}
c_Node7.prototype.p_Remove2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<274>";
	if(dbg_object(this.m__succ).m__pred!=this){
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<274>";
		error("Illegal operation on removed node");
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<276>";
	dbg_object(this.m__succ).m__pred=this.m__pred;
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<277>";
	dbg_object(this.m__pred).m__succ=this.m__succ;
	pop_err();
	return 0;
}
function c_HeadNode(){
	c_Node7.call(this);
}
c_HeadNode.prototype=extend_class(c_Node7);
c_HeadNode.m_new=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<310>";
	c_Node7.m_new2.call(this);
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<311>";
	this.m__succ=(this);
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<312>";
	this.m__pred=(this);
	pop_err();
	return this;
}
function bb_input2_KeyDown(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/input.monkey<40>";
	var t_=((bb_input2_device.p_KeyDown(t_key))?1:0);
	pop_err();
	return t_;
}
function bb_input2_MouseDown(t_button){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/input.monkey<66>";
	var t_=((bb_input2_device.p_KeyDown(1+t_button))?1:0);
	pop_err();
	return t_;
}
var bb_input_MouseDownLeft=0;
var bb_input_MouseDownRight=0;
var bb_input_MouseHitLeft=0;
var bb_input_MouseHitLeftUp=0;
var bb_input_MouseHitRight=0;
var bb_input_MouseHitRightUp=0;
function bb_input_UpdateMouse(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<18>";
	bb_input_MouseDownLeft=bb_input2_MouseDown(0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<19>";
	bb_input_MouseDownRight=bb_input2_MouseDown(1);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<20>";
	if((bb_input_MouseHitLeft)!=0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<21>";
		bb_input_MouseHitLeft=0;
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<22>";
		if(!((bb_input_MouseHitLeftUp)!=0)){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<23>";
			if(!((bb_input_MouseDownLeft)!=0)){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<23>";
				bb_input_MouseHitLeftUp=1;
			}
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<24>";
			if((bb_input_MouseDownLeft)!=0){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<25>";
				bb_input_MouseHitLeft=1;
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<26>";
				bb_input_MouseHitLeftUp=0;
			}
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<28>";
	if((bb_input_MouseHitRight)!=0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<29>";
		bb_input_MouseHitRight=0;
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<30>";
		if(!((bb_input_MouseHitRightUp)!=0)){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<31>";
			if(!((bb_input_MouseDownRight)!=0)){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<31>";
				bb_input_MouseHitRightUp=1;
			}
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<32>";
			if((bb_input_MouseDownRight)!=0){
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<33>";
				bb_input_MouseHitRight=1;
				err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<34>";
				bb_input_MouseHitRightUp=0;
			}
		}
	}
	pop_err();
}
function bb_filepath_ExtractExt(t_path){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/brl/filepath.monkey<22>";
	var t_i=t_path.lastIndexOf(".");
	err_info="F:/progs/gamedev/monkey/modules/brl/filepath.monkey<23>";
	if(t_i!=-1 && t_path.indexOf("/",t_i+1)==-1 && t_path.indexOf("\\",t_i+1)==-1){
		err_info="F:/progs/gamedev/monkey/modules/brl/filepath.monkey<23>";
		var t_=t_path.slice(t_i+1);
		pop_err();
		return t_;
	}
	err_info="F:/progs/gamedev/monkey/modules/brl/filepath.monkey<24>";
	pop_err();
	return "";
}
function bb_filepath_StripExt(t_path){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/brl/filepath.monkey<16>";
	var t_i=t_path.lastIndexOf(".");
	err_info="F:/progs/gamedev/monkey/modules/brl/filepath.monkey<17>";
	if(t_i!=-1 && t_path.indexOf("/",t_i+1)==-1 && t_path.indexOf("\\",t_i+1)==-1){
		err_info="F:/progs/gamedev/monkey/modules/brl/filepath.monkey<17>";
		var t_=t_path.slice(0,t_i);
		pop_err();
		return t_;
	}
	err_info="F:/progs/gamedev/monkey/modules/brl/filepath.monkey<18>";
	pop_err();
	return t_path;
}
function c_NodeEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_NodeEnumerator.m_new=function(t_node){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<437>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_NodeEnumerator.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<434>";
	pop_err();
	return this;
}
c_NodeEnumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<441>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_NodeEnumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<445>";
	var t_t=this.m_node;
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<446>";
	this.m_node=this.m_node.p_NextNode();
	err_info="F:/progs/gamedev/monkey/modules/monkey/map.monkey<447>";
	pop_err();
	return t_t;
}
function bb_math_Abs(t_x){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<46>";
	if(t_x>=0){
		err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<46>";
		pop_err();
		return t_x;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<47>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function bb_math_Abs2(t_x){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<73>";
	if(t_x>=0.0){
		err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<73>";
		pop_err();
		return t_x;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<74>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function c_Enumerator(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator.m_new=function(t_list){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<326>";
	this.m__list=t_list;
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<327>";
	this.m__curr=dbg_object(dbg_object(t_list).m__head).m__succ;
	pop_err();
	return this;
}
c_Enumerator.m_new2=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<323>";
	pop_err();
	return this;
}
c_Enumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<331>";
	while(dbg_object(dbg_object(this.m__curr).m__succ).m__pred!=this.m__curr){
		err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<332>";
		this.m__curr=dbg_object(this.m__curr).m__succ;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<334>";
	var t_=this.m__curr!=dbg_object(this.m__list).m__head;
	pop_err();
	return t_;
}
c_Enumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<338>";
	var t_data=dbg_object(this.m__curr).m__data;
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<339>";
	this.m__curr=dbg_object(this.m__curr).m__succ;
	err_info="F:/progs/gamedev/monkey/modules/monkey/list.monkey<340>";
	pop_err();
	return t_data;
}
function bb_input2_MouseX(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/input.monkey<58>";
	var t_=bb_input2_device.p_MouseX();
	pop_err();
	return t_;
}
function bb_input_TMouseX(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<39>";
	var t_=bb_input2_MouseX()*64.0/640.0;
	pop_err();
	return t_;
}
function bb_input2_MouseY(){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/input.monkey<62>";
	var t_=bb_input2_device.p_MouseY();
	pop_err();
	return t_;
}
function bb_input_TMouseY(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/input.monkey<43>";
	var t_=bb_input2_MouseY()*64.0/640.0;
	pop_err();
	return t_;
}
function bb_input2_KeyHit(t_key){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/input.monkey<44>";
	var t_=bb_input2_device.p_KeyHit(t_key);
	pop_err();
	return t_;
}
function bb_math_Sgn(t_x){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<41>";
	if(t_x<0){
		err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<41>";
		pop_err();
		return -1;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<42>";
	var t_=((t_x>0)?1:0);
	pop_err();
	return t_;
}
function bb_math_Sgn2(t_x){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<67>";
	if(t_x<0.0){
		err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<67>";
		pop_err();
		return -1.0;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<68>";
	if(t_x>0.0){
		err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<68>";
		pop_err();
		return 1.0;
	}
	err_info="F:/progs/gamedev/monkey/modules/monkey/math.monkey<69>";
	pop_err();
	return 0.0;
}
function bb_audio_PlaySound(t_sound,t_channel,t_flags){
	push_err();
	err_info="F:/progs/gamedev/monkey/modules/mojo/audio.monkey<53>";
	if(((t_sound)!=null) && ((dbg_object(t_sound).m_sample)!=null)){
		err_info="F:/progs/gamedev/monkey/modules/mojo/audio.monkey<53>";
		bb_audio_device.PlaySample(dbg_object(t_sound).m_sample,t_channel,t_flags);
	}
	pop_err();
	return 0;
}
function c_Shine(){
	c_Actor.call(this);
	this.m_atlas=[];
	this.m_nextTime=0;
	this.m_frameTime=0;
	this.m_level=null;
	this.m_img=0;
}
c_Shine.prototype=extend_class(c_Actor);
c_Shine.m_new=function(t_level,t_frameTime){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<21>";
	c_Actor.m_new.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<22>";
	this.m_atlas=c_AssetBox.m_GfxMisc;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<23>";
	this.m_nextTime=((dbg_object(c_Time.m_instance).m_actTime+(t_frameTime))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<24>";
	dbg_object(this).m_frameTime=t_frameTime;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<25>";
	dbg_object(this).m_level=t_level;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<26>";
	this.m_z=-5.0;
	pop_err();
	return this;
}
c_Shine.m_new2=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<10>";
	c_Actor.m_new.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<10>";
	pop_err();
	return this;
}
c_Shine.prototype.p_Update=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<30>";
	if(dbg_object(c_Time.m_instance).m_actTime>=(this.m_nextTime)){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<31>";
		this.m_img+=1;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<32>";
		if(this.m_img>3){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<33>";
			this.m_level.p_RemoveActor(this);
		}else{
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<35>";
			this.m_nextTime=((dbg_object(c_Time.m_instance).m_actTime+(this.m_frameTime))|0);
		}
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<38>";
	this.m_x=Math.floor(this.m_x+0.5);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<39>";
	this.m_y=Math.floor(this.m_y+0.5);
	pop_err();
}
c_Shine.prototype.p_Draw2=function(t_canvas,t_camera){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<43>";
	t_canvas.p_SetColor2(1.0,1.0,1.0,0.75);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<44>";
	t_canvas.p_SetBlendMode(2);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shine.monkey<45>";
	t_canvas.p_DrawImage4(dbg_array(this.m_atlas,this.m_img)[dbg_index],this.m_x-(dbg_object(t_camera).m_x0),this.m_y-(dbg_object(t_camera).m_y0));
	pop_err();
}
function c_Shot(){
	c_Actor.call(this);
	this.m_atlas=[];
	this.m_nextTime=0;
	this.m_level=null;
	this.m_vx=.0;
	this.m_vy=.0;
	this.m_targetDistance=0;
	this.m_img=2;
	this.m_distanceAcum=0;
}
c_Shot.prototype=extend_class(c_Actor);
c_Shot.m_new=function(t_level,t_directionX,t_directionY){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<28>";
	c_Actor.m_new.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<29>";
	this.m_atlas=c_AssetBox.m_GfxMisc;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<30>";
	this.m_nextTime=((dbg_object(c_Time.m_instance).m_actTime+25.0)|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<31>";
	dbg_object(this).m_level=t_level;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<32>";
	if(t_directionX!=0.0 && t_directionY!=0.0){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<33>";
		this.m_vx=t_directionX*70.71;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<34>";
		this.m_vy=t_directionY*70.71;
	}else{
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<36>";
		this.m_vx=t_directionX*90.0;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<37>";
		this.m_vy=t_directionY*90.0;
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<39>";
	this.m_z=-10.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<40>";
	this.m_targetDistance=((50.0*bb_random_Rnd2(80.0,120.0)/100.0)|0);
	pop_err();
	return this;
}
c_Shot.m_new2=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<10>";
	c_Actor.m_new.call(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<10>";
	pop_err();
	return this;
}
c_Shot.prototype.p_Explode=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<74>";
	bb_audio_PlaySound(c_AssetBox.m_SfxExplo1,1,0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<75>";
	bb_audio_PlaySound(c_AssetBox.m_SfxExplo2,2,0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<76>";
	bb_audio_PlaySound(c_AssetBox.m_SfxExplo3,3,0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<77>";
	this.m_level.p_RemoveActor(this);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<78>";
	var t_explosions=((bb_random_Rnd2(5.0,8.0))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<79>";
	for(var t_i=1;t_i<=t_explosions;t_i=t_i+1){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<81>";
		var t_explo=c_Shine.m_new.call(new c_Shine,this.m_level,((45.0*bb_random_Rnd2(80.0,120.0)/100.0)|0));
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<82>";
		dbg_object(t_explo).m_x=this.m_x+bb_random_Rnd2(-5.0,5.0);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<83>";
		dbg_object(t_explo).m_y=this.m_y+bb_random_Rnd2(-5.0,5.0);
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<84>";
		this.m_level.p_AddActor(t_explo);
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<86>";
	dbg_object(this.m_level).m_camera.p_Shake(7.0);
	pop_err();
}
c_Shot.prototype.p_Update=function(){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<44>";
	var t_delta=dbg_object(c_Time.m_instance).m_lastFrame;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<45>";
	if(dbg_object(c_Time.m_instance).m_actTime>=(this.m_nextTime)){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<46>";
		this.m_img+=1;
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<47>";
		if(this.m_img>3){
			err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<48>";
			this.m_img=2;
		}
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<50>";
		this.m_nextTime=((dbg_object(c_Time.m_instance).m_actTime+25.0)|0);
	}
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<52>";
	this.m_x+=this.m_vx*t_delta/1000.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<53>";
	this.m_y+=this.m_vy*t_delta/1000.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<54>";
	this.m_x+=bb_random_Rnd2(-20.0,20.0)*10.0/100.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<55>";
	this.m_x=Math.floor(this.m_x+0.5);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<56>";
	this.m_y=Math.floor(this.m_y+0.5);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<57>";
	this.m_y+=bb_random_Rnd2(-20.0,20.0)*10.0/100.0;
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<59>";
	var t_xi=((Math.floor(this.m_vx*t_delta/1000.0+0.5))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<60>";
	var t_yi=((Math.floor(this.m_vy*t_delta/1000.0+0.5))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<61>";
	this.m_distanceAcum+=((Math.floor(Math.sqrt(t_xi*t_xi+t_yi*t_yi)+0.5))|0);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<62>";
	if(dbg_object(this.m_level).m_map.p_GetTileTypeAt(this.m_x,this.m_y)==2 || this.m_distanceAcum>=this.m_targetDistance){
		err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<63>";
		this.p_Explode();
	}
	pop_err();
}
c_Shot.prototype.p_Draw2=function(t_canvas,t_camera){
	push_err();
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<68>";
	t_canvas.p_SetColor2(1.0,1.0,1.0,0.75);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<69>";
	t_canvas.p_SetBlendMode(2);
	err_info="F:/F/Dropbox/UNIF/Monkey/ludumdare35/src/main/actors/shot.monkey<70>";
	t_canvas.p_DrawImage4(dbg_array(this.m_atlas,this.m_img)[dbg_index],this.m_x-(dbg_object(t_camera).m_x0),this.m_y-(dbg_object(t_camera).m_y0));
	pop_err();
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input2_device=null;
	bb_app__devWidth=0;
	bb_app__devHeight=0;
	bb_app__displayModes=[];
	bb_app__desktopMode=null;
	bb_graphics_renderDevice=null;
	c_Time.m_instance=c_Time.m_new.call(new c_Time);
	bb_graphics2_inited=false;
	bb_graphics2_vbosSeq=0;
	bb_graphics2_rs_vbo=0;
	bb_graphics2_rs_ibo=0;
	bb_graphics2_tmpi=new_number_array(16);
	bb_graphics2_defaultFbo=0;
	bb_graphics2_mainShader="";
	bb_glutil_tmpi=new_number_array(16);
	bb_graphics2_fastShader=null;
	bb_graphics2_bumpShader=null;
	bb_graphics2_matteShader=null;
	bb_graphics2_shadowShader=null;
	bb_graphics2_lightMapShader=null;
	bb_graphics2_defaultShader=null;
	c_Image2.m__flagsMask=259;
	c_Texture.m__white=null;
	c_Texture.m__colors=c_IntMap2.m_new.call(new c_IntMap2);
	bb_graphics2_defaultFont=null;
	bb_graphics2_flipYMatrix=bb_math3d_Mat4New();
	c_Canvas.m__active=null;
	bb_graphics2_rs_program=null;
	bb_graphics2_rs_numLights=0;
	bb_graphics2_rs_material=null;
	bb_graphics2_rs_modelViewProjMatrix=bb_math3d_Mat4New();
	bb_graphics2_rs_modelViewMatrix=bb_math3d_Mat4New();
	bb_graphics2_rs_clipPosScale=[1.0,1.0,1.0,1.0];
	bb_graphics2_rs_globalColor=[1.0,1.0,1.0,1.0];
	bb_graphics2_rs_fogColor=[0.0,0.0,0.0,0.0];
	bb_graphics2_rs_ambientLight=[0.0,0.0,0.0,1.0];
	bb_graphics2_rs_lightColors=new_number_array(16);
	bb_graphics2_rs_lightVectors=new_number_array(16);
	bb_graphics2_rs_shadowTexture=null;
	bb_graphics2_rs_blend=-1;
	c_Stack3.m_NIL=null;
	bb_graphics2_freeOps=c_Stack3.m_new.call(new c_Stack3);
	bb_graphics2_nullOp=c_DrawOp.m_new.call(new c_DrawOp);
	c_Stack4.m_NIL=null;
	c_Stack5.m_NIL=0;
	bb_graphics2_rs_projMatrix=bb_math3d_Mat4New();
	c_AssetBox.m_GfxCharacter=[];
	c_AssetBox.m_GfxMisc=[];
	c_AssetBox.m_SfxExplo1=null;
	c_AssetBox.m_SfxExplo2=null;
	c_AssetBox.m_SfxExplo3=null;
	c_AssetBox.m_SfxShoot=null;
	c_AssetBox.m_SfxTrip=null;
	c_AssetBox.m_SfxDie1=null;
	c_AssetBox.m_SfxDie2=null;
	c_AssetBox.m_SfxDie3=null;
	c_Tileset.m_Tiles=[];
	c_Animator.m_anims=new_array_array(6);
	bb_random_Seed=1234;
	bb_input_MouseDownLeft=0;
	bb_input_MouseDownRight=0;
	bb_input_MouseHitLeft=0;
	bb_input_MouseHitLeftUp=0;
	bb_input_MouseHitRight=0;
	bb_input_MouseHitRightUp=0;
	c_Texture.m__black=null;
	c_Texture.m__flat=null;
	c_Tileset.m_TileType=[1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
}
//${TRANSCODE_END}
