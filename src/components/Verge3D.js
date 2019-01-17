var app = null;

export const initVerge3D = () => {
  var params = window.v3d.AppUtils.getPageParams();

  var PUZZLES_DIR = '../../puzzles/';
  var logicURL = params.logic ? params.logic : '__LOGIC__'.replace('__LOGIC__', '');
  var sceneURL = params.load ? params.load : './scenes/main.gltf'.replace('__URL__', '');
  if (!sceneURL) {
  console.log('No scene URL specified');
  return;
  }

  // some puzzles can benefit from cache
  window.v3d.Cache.enabled = true;

  loadScene(sceneURL, { useFullscreen: true });
}

function loadScene(sceneURL, initOptions) {

    initOptions = initOptions || {};

    var ctxSettings = {};
    if (initOptions.useBkgTransp) ctxSettings.alpha = true;
    if (initOptions.preserveDrawBuf) ctxSettings.preserveDrawingBuffer = true;

    var preloader = initOptions.useCustomPreloader 
            ? createCustomPreloader(initOptions.preloaderProgressCb, 
            initOptions.preloaderEndCb) 
            : new window.v3d.SimplePreloader({ container: 'verge3d-container' });
    
    app = new window.v3d.App('verge3d-container', ctxSettings, preloader);
    if (initOptions.useBkgTransp) {
        app.clearBkgOnLoad = true;
        app.renderer.setClearColor(0x000000, 0);
    }
    
    if (initOptions.preloaderStartCb) initOptions.preloaderStartCb();
    if (initOptions.useFullscreen) {
        initFullScreen();
    } else {
        var fsButton = document.getElementById('fullscreen_button');
        if (fsButton) fsButton.style.display = 'none';
    }

    sceneURL = initOptions.useCompAssets ? sceneURL + '.xz' : sceneURL;
    app.load(sceneURL, function() {
        app.enableControls();
        app.run();

        if (window.v3d.PE) window.v3d.PE.updateAppInstance(app);
        if (window.v3d.PL) window.v3d.PL.init(app, initOptions);

        runCode(app);
    }, function() {
        console.log('Can\'t load the scene ' + sceneURL);
    }, false);

    return app;
}

function createCustomPreloader(updateCb, finishCb) {
    function CustomPreloader() { 
        window.v3d.Preloader.call(this); 
    }

    CustomPreloader.prototype = Object.assign(Object.create(window.v3d.Preloader.prototype), {
        onUpdate: function(percentage) { 
            window.v3d.Preloader.prototype.onUpdate.call(this, percentage);
            if (updateCb) updateCb(percentage);
        },
        onFinish: function() {
            window.v3d.Preloader.prototype.onFinish.call(this);
            if (finishCb) finishCb();
        }
    });
        
    return new CustomPreloader();
}

function initFullScreen() {

    var fsButton = document.getElementById('fullscreen_button');
    if (!fsButton) return;

    if (document.fullscreenEnabled || 
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled)
        window.fullscreen_button.style.display = 'inline';

    window.fullscreen_button.addEventListener('click', function(event) {
        event.stopPropagation();
        if (document.fullscreenElement || 
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement) {
            exitFullscreen();
        } else
            requestFullscreen(document.body);
    });

    function changeFullscreen() {
        if (document.fullscreenElement || 
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement)
            window.fullscreen_button.className = 'fullscreen-close';
        else
            window.fullscreen_button.className = 'fullscreen-open';
    }

    document.addEventListener('webkitfullscreenchange', changeFullscreen);
    document.addEventListener('mozfullscreenchange', changeFullscreen);
    document.addEventListener('msfullscreenchange', changeFullscreen);
    document.addEventListener('fullscreenchange', changeFullscreen);

    function requestFullscreen(elem) {
        if (elem.requestFullscreen)
            elem.requestFullscreen();
        else if (elem.mozRequestFullScreen)
            elem.mozRequestFullScreen();
        else if (elem.webkitRequestFullscreen) 
            elem.webkitRequestFullscreen();
        else if (elem.msRequestFullscreen)
            elem.msRequestFullscreen();
    }
    
    function exitFullscreen() {
        if (document.exitFullscreen)
            document.exitFullscreen();
        else if (document.mozCancelFullScreen)
            document.mozCancelFullScreen();
        else if (document.webkitExitFullscreen)
            document.webkitExitFullscreen();
        else if (document.msExitFullscreen)
            document.msExitFullscreen();
    }
}

function prepareExternalInterface(app) {
    // register functions in the app.ExternalInterface to call them from Puzzles, e.g:
    // app.ExternalInterface.myJSFunction = function() {
    //     console.log('Hello, World!');
    // }

}

function runCode(app) {
    // add your code here, e.g. console.log('Hello, World!');
}

export const loadRing = () => {
  var loader = new window.v3d.GLTFLoader();
 
      // Load a glTF resource
  loader.load('./scenes/ring1.gltf', function ( gltf ) {
      //Here I had to add v3dapp. before scene, otherwise scene was undefined
      app.scene.add( gltf.scene );
  } );
}
