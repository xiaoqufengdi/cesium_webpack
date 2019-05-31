import Cesium from "cesium/Cesium";
require('./css/main.css');
require('cesium/Widgets/widgets.css');


Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMmMzYTEzNC0zODBiLTRiYjktODFiMy02NDkyMjIwMWZjNzYiLCJpZCI6OTg5NSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1NTIxMTA0OX0.0hbPuQiM3Esjd3cVGy0Aisz6jwbtiHuzis26RABTvlY';
let viewer = new Cesium.Viewer("cesiumContainer");

console.log('Hello World!');