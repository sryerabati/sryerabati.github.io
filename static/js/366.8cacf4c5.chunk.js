"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[366],{985:(e,t,n)=>{n.r(t),n.d(t,{default:()=>c});var r=n(43),o=n(519),a=n(749),i=n(408),s=n(93),l=n(579);function c(){const{scene:e}=(0,o.p)("/hawk.glb"),t=(0,r.useRef)(),{colorMode:n}=(0,s.G6)(),c=(0,s.dU)("#1992d4","#81defd");return(0,r.useEffect)((()=>{const t={uniforms:{dotColor:{value:new i.Color(c)}},vertexShader:"\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",fragmentShader:"\n        uniform vec3 dotColor;\n        varying vec2 vUv;\n        void main() {\n          float radius = 0.15;\n          vec2 grid = fract(vUv * 130.0);\n          float dist = length(grid - 0.5);\n          float alpha = 1.0 - smoothstep(radius, radius + 0.01, dist);\n          gl_FragColor = vec4(dotColor, alpha);\n        }\n      ",transparent:!0};e.traverse((e=>{e.isMesh&&(e.material=new i.ShaderMaterial(t))})),e.position.set(0,0,0);const n=(new i.Box3).setFromObject(e).getSize(new i.Vector3),r=Math.max(n.x,n.y,n.z);e.scale.multiplyScalar(4/r)}),[e,c]),(0,a.F)(((e,n)=>{t.current&&(t.current.rotation.y+=.5*n)})),(0,l.jsx)("primitive",{ref:t,object:e})}}}]);
//# sourceMappingURL=366.8cacf4c5.chunk.js.map