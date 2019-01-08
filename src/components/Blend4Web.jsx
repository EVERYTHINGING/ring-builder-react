import b4w from "blend4web";

// import modules used by the app
const m_app = b4w.app;
const m_cfg = b4w.config;
const m_data = b4w.data;
const m_preloader = b4w.preloader;
const m_ver = b4w.version;
const m_util = b4w.util;
const m_scene = b4w.scenes;
const m_trans = b4w.transform;

const DEBUG = m_ver.type() == "DEBUG";

const APP_ASSETS_PATH = "assets/";

/**
 * export the method to initialize the app (called at the bottom of this file)
 */
export const init_b4w = () => {
  m_app.init({
    canvas_container_id: "blend4web-container",
    callback: init_cb,
    show_fps: DEBUG,
    console_verbose: DEBUG,
    autoresize: true
  });
};

/**
 * callback executed when the app is initialized
 */
const init_cb = (canvas_elem, success) => {
  if (!success) {
    console.log("b4w init failure");
    return;
  }

  m_preloader.create_preloader();

  // ignore right-click on the canvas element
  canvas_elem.oncontextmenu = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  load_main();
};

/**
 * load the scene data
 */
const load_main = () => {
  m_data.load(APP_ASSETS_PATH + "main.json", load_cb, preloader_cb);
};

/**
 * update the app's preloader
 */
const preloader_cb = percentage => {
  m_preloader.update_preloader(percentage);
};

/**
 * callback executed when the scene data is loaded
 */

let current = {};

const load_cb = (data_id, success) => {
  if (!success) {
    console.log("b4w load failure");
    return;
  }

  if (current.diamond) {
    const diamond = m_scene.get_object_by_name("Diamond", current.diamond.id);
    const diamondLocation = m_scene.get_object_by_name(
      "DiamondLocation",
      current.band.id
    );
    let pos = new Float32Array(3);
    m_trans.get_translation(diamondLocation, pos);
    m_trans.set_translation_v(diamond, pos);
  }

  m_app.enable_camera_controls();

  console.log(m_scene.get_all_objects());
};

export const load = obj => {
  let type = Object.keys(obj)[0];
  let name = obj[type];
  
  let isSame = false;
  if (current[type] !== undefined && name == current[type].name) {
    isSame = true;
  }

  if(!isSame){
    if(current[type] !== undefined){ 
        m_data.unload(current[type].id);
    }else{
        current[type] = {};
        current[type].name = name;
    }

    m_data.load(APP_ASSETS_PATH + type+"_"+name + ".json", load_cb, null, true);
  }
};

