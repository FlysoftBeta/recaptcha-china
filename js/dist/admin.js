module.exports=function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}({1:function(e,t){e.exports=flarum.core.compat.app},7:function(e,t,r){"use strict";r.r(t);var a=r(1),n=r.n(a);n.a.initializers.add("fof/recaptcha",(function(){n.a.extensionData.for("fof-recaptcha").registerSetting({label:n.a.translator.trans("fof-recaptcha.admin.settings.help_text",{a:m("a",{href:"http://www.google.com/recaptcha/admin",target:"_blank"})}),type:"hidden"}).registerSetting({setting:"fof-recaptcha.type",label:n.a.translator.trans("fof-recaptcha.admin.settings.type_label"),options:{checkbox:"Checkbox",invisible:"Invisible"},required:!0,default:"checkbox",type:"select"}).registerSetting({setting:"fof-recaptcha.credentials.site",label:n.a.translator.trans("fof-recaptcha.admin.settings.site_key_label"),type:"text",required:!0}).registerSetting({setting:"fof-recaptcha.credentials.secret",label:n.a.translator.trans("fof-recaptcha.admin.settings.secret_key_label"),type:"password",required:!0}).registerPermission({permission:"fof-recaptcha.postWithoutCaptcha",label:n.a.translator.trans("fof-recaptcha.admin.permissions.post_without_captcha"),icon:"fas fa-robot"},"reply")}))}});
//# sourceMappingURL=admin.js.map