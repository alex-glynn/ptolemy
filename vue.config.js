module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Ptolemy',
    themeColor: '#000000',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
	iconPaths: {
		faviconSVG: 'img/icons/favicon.svg',
		favicon32: 'img/icons/favicon-32x32.png',
		favicon16: 'img/icons/favicon-16x16.png',
		appleTouchIcon: 'img/icons/apple-touch-icon.png'
	},
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'dev/sw.js',
      // ...other Workbox options...
    }
  }
}
