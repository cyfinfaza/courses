export default '<!DOCTYPE html>\r\n<html lang="en">\r\n\r\n<head>\r\n\t<meta charset="UTF-8">\r\n\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\r\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n\t<title>cube</title>\r\n\t<style>\r\n\t\tbody {\r\n\t\t\tperspective: 400px;\r\n\t\t\tdisplay: flex;\r\n\t\t\theight: 100vh;\r\n\t\t\twidth: 100vw;\r\n\t\t\talign-items: center;\r\n\t\t\tjustify-content: center;\r\n\t\t\tmargin: 0;\r\n\t\t\tbackground-color: black;\r\n\t\t\t--cube-size: 300px;\r\n\t\t\t--plane-distance: -200px;\r\n\t\t\t--size-transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);\r\n\t\t\toverflow: hidden;\r\n\t\t\tfont-family: \'DM Sans\';\r\n\t\t}\r\n\r\n\t\t.env {\r\n\t\t\tdisplay: flex;\r\n\t\t\talign-items: center;\r\n\t\t\tjustify-content: center;\r\n\t\t\ttransform-style: preserve-3d;\r\n\t\t\ttransform: translateZ(-100px) scale(0.5);\r\n\t\t}\r\n\r\n\t\t.plane {\r\n\t\t\ttransition: var(--size-transition);\r\n\t\t\twidth: 2000px;\r\n\t\t\theight: 2000px;\r\n\t\t\tposition: absolute;\r\n\t\t\tbackground-image:\r\n\t\t\t\trepeating-conic-gradient(#0008 0% 25%, transparent 0% 50%),\r\n\t\t\t\tradial-gradient(#0F08, transparent 500px);\r\n\t\t\tbackground-size:\r\n\t\t\t\t50px 50px,\r\n\t\t\t\t100%;\r\n\t\t\ttransform: rotateX(90deg) translateZ(var(--plane-distance));\r\n\t\t}\r\n\r\n\t\t.cube {\r\n\t\t\twidth: var(--cube-size);\r\n\t\t\theight: var(--cube-size);\r\n\t\t\ttransition: var(--size-transition);\r\n\t\t\tposition: absolute;\r\n\t\t\ttransform-style: preserve-3d;\r\n\t\t}\r\n\r\n\t\t.cube>* {\r\n\t\t\ttransition: var(--size-transition);\r\n\t\t\twidth: var(--cube-size);\r\n\t\t\theight: var(--cube-size);\r\n\t\t\tbackground-color: #0d04;\r\n\t\t\tbox-shadow: 0 0 calc(var(--cube-size) / 4) inset #0F0d;\r\n\t\t\tposition: absolute;\r\n\t\t}\r\n\r\n\t\t.top {\r\n\t\t\ttransform: rotateX(90deg) translateZ(calc(var(--cube-size) / 2));\r\n\t\t}\r\n\r\n\t\t.bottom {\r\n\t\t\ttransform: rotateX(-90deg) translateZ(calc(var(--cube-size) / 2));\r\n\t\t}\r\n\r\n\t\t.left {\r\n\t\t\ttransform: rotateY(-90deg) translateZ(calc(var(--cube-size) / 2));\r\n\t\t}\r\n\r\n\t\t.right {\r\n\t\t\ttransform: rotateY(90deg) translateZ(calc(var(--cube-size) / 2));\r\n\t\t}\r\n\r\n\t\t.front {\r\n\t\t\ttransform: translateZ(calc(var(--cube-size) / 2));\r\n\t\t\tbox-sizing: border-box;\r\n\t\t}\r\n\r\n\t\t.front>* {\r\n\t\t\tz-index: 100;\r\n\t\t\topacity: 0.75;\r\n\t\t}\r\n\r\n\t\t.back {\r\n\t\t\ttransform: rotateY(180deg) translateZ(calc(var(--cube-size) / 2));\r\n\t\t}\r\n\t</style>\r\n</head>\r\n\r\n<body>\r\n\t<div class="env">\r\n\t\t<div class="cube">\r\n\t\t\t<div class="top"></div>\r\n\t\t\t<div class="bottom"></div>\r\n\t\t\t<div class="left"></div>\r\n\t\t\t<div class="right"></div>\r\n\t\t\t<div class="front" style="padding: 16px;">\r\n\t\t\t\t<h1>Welcome to Web Development!</h1>\r\n\t\t\t\t<p>Don\'t get intimidated by this pure-CSS 3D cube. We\'ll be going over simpler things...</p>\r\n\t\t\t</div>\r\n\t\t\t<div class="back"></div>\r\n\t\t</div>\r\n\t\t<div class="plane"></div>\r\n\t</div>\r\n</body>\r\n\r\n<script>\r\n\tlet mouseX = 0;\r\n\tlet mouseY = 0;\r\n\tconst motionRangeY = 500\r\n\tconst motionRangeX = 120\r\n\twindow.onmousemove = e => {\r\n\t\tmouseX = e.clientX\r\n\t\tmouseY = e.clientY\r\n\t}\r\n\tlet lastX = 0;\r\n\tlet lastY = 0;\r\n\tlet startScale = 0\r\n\tsetInterval(() => {\r\n\t\tlastX = lastX + (mouseX - lastX) / 15\r\n\t\tlastY = lastY + (mouseY - lastY) / 15\r\n\t\tstartScale = startScale + (1 - startScale) / 50\r\n\t\tstartScale\r\n\t\tlet x = 1 - lastX / window.innerWidth\r\n\t\tlet y = lastY / window.innerHeight\r\n\t\t// console.log(x, y)\r\n\t\tdocument.querySelector(\'.env\').style.transform = `translateZ(-100px) scale(${startScale}) rotateX(${y * motionRangeX - (motionRangeX / 2)}deg) rotateY(${x * motionRangeY - (motionRangeY / 2)}deg)`\r\n\t}, 15);\r\n</script>\r\n\r\n</html>';
