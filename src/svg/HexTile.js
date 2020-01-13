import {svg, variable} from './Svg';

const top = variable("Top", {defaultValue: "A B C"});
const topRight = variable("Top-Right", {defaultValue: "D E F"});
const bottomRight = variable("Bottom-Right", {defaultValue: "G H I"});
const bottom = variable("Bottom", {defaultValue: "J K L"});
const bottomLeft = variable("Bottom-Left", {defaultValue: "M N O"});
const topLeft = variable("Top-Left", {defaultValue: "P Q R"});

const HexTile = svg({width: 174, height: 200, viewBox: "0 0 173.20508075688772 200", fill:"none"})`
<style>
  @import url('https://fonts.googleapis.com/css?family=Patrick+Hand');
  text { font: 20px 'Patrick Hand'; }
</style>
<!-- The outer hexagon -->
<path id="hexagon" fill="none" stroke="red" d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" />

<defs>
  <!-- Top arc-->
  <path id="a1" d="M103.92304845413264 9.999999999999998 A20 20 0 0 1 69.28203230275508 9.999999999999998" />
  <!-- UR arc-->
  <path id="a2" d="M173.20508075688772 70 A20 20 0 0 1 155.88457268119896 40" />
  <!-- LR arc-->
  <path id="a3" d="M155.88457268119896 160 A20 20 0 0 1 173.20508075688772 130" />
  <!-- Bottom arc-->
  <path id="a4" d="M69.28203230275508 190A20 20 0 0 1 103.92304845413264 190 " />
  <!-- LL arc-->
  <path id="a5" d="M0 130 A20 20 0 0 1 17.320508075688775 160" />
  <!-- UL arc-->
  <path id="a6" d="M17.320508075688775 40 A20 20 0 0 1 0 70" />

  <path id="AB" d="M43.301270189221924 25 Q86.60254037844386 100 129.9038105676658 25"></path>
  <path id="AC" d="M43.301270189221924 25 Q86.60254037844386 100 173.20508075688772 100"></path>
  <path id="AD" d="M43.301270189221924 25 Q86.60254037844386 100 129.9038105676658 175"></path>
  <path id="AE" d="M43.301270189221924 25 Q86.60254037844386 100 43.301270189221924 175"></path>
  <path id="AF" d="M43.301270189221924 25 Q86.60254037844386 100 0 100"></path>

  <path id="BC" d="M129.9038105676658 25 Q86.60254037844386 100 173.20508075688772 100"></path>
  <path id="BD" d="M129.9038105676658 25 Q86.60254037844386 100 129.9038105676658 175"></path>
  <path id="BE" d="M129.9038105676658 25 Q86.60254037844386 100 43.301270189221924 175"></path>
  <path id="BF" d="M129.9038105676658 25 Q86.60254037844386 100 0 100"></path>

  <path id="CD" d="M173.20508075688772 100 Q86.60254037844386 100 129.9038105676658 175"></path>
  <path id="CE" d="M173.20508075688772 100 Q86.60254037844386 100 43.301270189221924 175"></path>
  <path id="CF" d="M173.20508075688772 100 Q86.60254037844386 100 0 100"></path>

  <path id="DE" d="M129.9038105676658 175 Q86.60254037844386 100 43.301270189221924 175"></path>
  <path id="DF" d="M129.9038105676658 175 Q86.60254037844386 100 0 100"></path>

  <path id="EF" d="M43.301270189221924 175 Q86.60254037844386 100 0 100"></path>
</defs>

<g id="arcs" fill="none" stroke="blue">
  <use xlink:href="#a1" />
  <use xlink:href="#a2" />
  <use xlink:href="#a3" />
  <use xlink:href="#a4" />
  <use xlink:href="#a5" />
  <use xlink:href="#a6" />
</g>

<g id="routes" stroke-width="10" fill="none" stroke="green">
  <use xlink:href="#AE" />
  <use xlink:href="#CD" />
  <use xlink:href="#BF" />
</g>

<g id="text" stroke="black">
  <text id="text1"><textPath id="textPath1" xlink:href="#a1" text-anchor="middle" startOffset="50%">
    <tspan dy="-2">${top}</tspan>
  </textPath></text>
  <text id="text2"><textPath id="textPath2" xlink:href="#a2" text-anchor="middle" startOffset="50%">
    <tspan dy="-2">${topRight}</tspan>
  </textPath></text>
  <text id="text3"><textPath id="textPath3" xlink:href="#a3" text-anchor="middle" startOffset="50%">
    <tspan dy="-2">${bottomRight}</tspan>
  </textPath></text>
  <text id="text4"><textPath id="textPath4" xlink:href="#a4" text-anchor="middle" startOffset="50%">
    <tspan dy="-2">${bottom}</tspan>
  </textPath></text>
  <text id="text5"><textPath id="textPath5" xlink:href="#a5" text-anchor="middle" startOffset="50%">
    <tspan dy="-2">${bottomLeft}</tspan>
  </textPath></text>
  <text id="text6"><textPath id="textPath6" xlink:href="#a6" text-anchor="middle" startOffset="50%">
    <tspan dy="-2">${topLeft}</tspan>
  </textPath></text>
</g>`;

export default HexTile;