/* Firebase web setup for VedPuranSar.
 * Include this file before the main application script in index.html:
 * <script src="./firebase-config.js"></script>
 */
(function () {
  "use strict";

  var config = {
    apiKey: "AIzaSyAOwrOC_X_TXTO467vzjDbSyQEgVi8dxiQ",
    authDomain: "vedpuransar.firebaseapp.com",
    projectId: "vedpuransar",
    storageBucket: "vedpuransar.firebasestorage.app",
    messagingSenderId: "77800003409",
    appId: "1:77800003409:web:4be027e1a39a88e5bae570",
    measurementId: "G-9FT3SVVHHY"
  };

  function loadSdk(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = function () {
        reject(new Error("Firebase SDK load failed: " + src));
      };
      document.head.appendChild(script);
    });
  }

  window.vpsFirebaseReady = Promise.all([
    loadSdk("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"),
    loadSdk("https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics-compat.js")
  ]).then(function () {
    var app = firebase.apps.length ? firebase.app() : firebase.initializeApp(config);
    window.vpsFirebase = { app: app, analytics: null };

    if (firebase.analytics && firebase.analytics.isSupported) {
      return firebase.analytics.isSupported().then(function (supported) {
        if (supported) window.vpsFirebase.analytics = firebase.analytics(app);
        return window.vpsFirebase;
      });
    }

    return window.vpsFirebase;
  }).catch(function (error) {
    console.error("Firebase initialization failed:", error);
    return null;
  });
})();
