// Permutron
// (c) Jim Cowart http://www.ifandelse.com
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function(window,undefined){
var Permutron=function(a,b,c){var d=c||"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",e=a,f=b||!1,g=[],h=0,i=function(a,b){var c=b||1,e=1,f=a||0;this.advanceParent=!1,this.childGenerator=undefined,this.depletedAvailableIds=!1,this.currentIndex=0,this.maxIdsPossible=function(a){var b=a||1,c=d.length*b;this.childGenerator&&(c=this.childGenerator.maxIdsPossible(c));return c},this.next=function(){if(!this.depletedAvailableIds){var a=d.charAt(this.currentIndex);this.childGenerator?(a+=this.childGenerator.next(),this.childGenerator.advanceParent&&(this.currentIndex++,this.childGenerator.advanceParent=!1),this.childGenerator.depletedAvailableIds&&(this.depletedAvailableIds=!0)):this.currentIndex++,this.currentIndex>=d.length&&(e===c?this.depletedAvailableIds=!0:(this.currentIndex=0,e++,this.advanceParent=!0));return a}},f--,f>0&&(this.childGenerator=new i(f,d.length*c))};if(!f){var j=1;for(j;j<=e;j++)g.push(new i(j))}else g.push(new i(e));this.next=function(){if(!this.depletedAvailableIds){var a=g[h].next();g[h].depletedAvailableIds&&h++,h>=g.length&&(this.depletedAvailableIds=!0);return a}},this.maxIdsPossible=function(){if(!this.maxIdsPossible.cache){var a=0,b=0;for(a;a<g.length;a++)b+=g[a].maxIdsPossible();this.maxIdsPossible.cache=b}return this.maxIdsPossible.cache},this.depletedAvailableIds=!1};
window.Permutron = Permutron;
})(window);
