function t(t){var n=function(t,n){if("object"!=typeof t||!t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var r=i.call(t,n);if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t,"string");return"symbol"==typeof n?n:n+""}function n(n,i,r){return i&&function(n,i){for(var r=0;r<i.length;r++){var e=i[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,t(e.key),e)}}(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),n}function i(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||r(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,n){if(t){if("string"==typeof t)return e(t,n);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?e(t,n):void 0}}function e(t,n){(null==n||n>t.length)&&(n=t.length);for(var i=0,r=new Array(n);i<n;i++)r[i]=t[i];return r}var o=function(){return n((function t(n,i){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.columnCount=1,this.t=0,this.i=[],this.columnCount=i.columnCount,this.containerId=n,this.columnGap=i.columnGap,this.rowGap=i.rowGap,this.o=i.o,this.u=i.u,this.items=i.items,this.h(),this.l()}),[{key:"initContainer",value:function(){var t=this,n=document.getElementById(this.containerId);n&&(this.container=n,this.v(),this.o&&(this.m=new ResizeObserver((function(n){var i,e=function(t,n){var i="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!i){if(Array.isArray(t)||(i=r(t))||n){i&&(t=i);var e=0,o=function(){};return{s:o,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,s=!1;return{s:function(){i=i.call(t)},n:function(){var t=i.next();return u=t.done,t},e:function(t){s=!0,a=t},f:function(){try{u||null==i.p||i.p()}finally{if(s)throw a}}}}(n);try{for(e.s();!(i=e.n()).done;){var o=i.value;t.l(),t.u&&t.u({A:t.v(),I:o.contentRect.width,t:t.t,i:t.i})}}catch(t){e.e(t)}finally{e.f()}})),this.m.observe(n)))}},{key:"genNewItems",value:function(){for(var t=new Array(this.columnCount).fill(0).map((function(){return[]})),n=new Array(this.columnCount).fill(0),r=0;r<this.items.length&&this.A;){var e=this.items[r].height*this.A/this.items[r].width,o=Math.min.apply(Math,i(n)),a=n.indexOf(o),u={width:this.A,height:e,x:this.A*a+this.columnGap*a,y:o,id:this.items[r].id};t[a].push(u),n[a]+=u.height+this.rowGap,r++}this.i=t,this.t=Math.max.apply(Math,i(n))}},{key:"getItemWidth",value:function(){return this.container&&(this.A=(this.container.clientWidth-(this.columnCount-1)*this.columnGap)/this.columnCount),this.A||0}},{key:"getNewItems",value:function(){return this.i}},{key:"getContainerHeight",value:function(){return this.t}},{key:"unobserve",value:function(){this.m&&this.container&&this.m.unobserve(this.container)}}])}();export{o as default};
