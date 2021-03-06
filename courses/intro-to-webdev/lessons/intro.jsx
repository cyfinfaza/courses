import React from "react";
import ThreePartLayout from "layouts/threePartLayout";

const id = "647320ad-037f-4bd4-b144-89370474ccf9";

const cubeCode =
	'<!DOCTYPE html>\n<html lang="en">\n\n<head>\n\t<meta charset="UTF-8">\n\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>cube</title>\n\t<style>\n\t\tbody {\n\t\t\tperspective: 400px;\n\t\t\tdisplay: flex;\n\t\t\theight: 100vh;\n\t\t\twidth: 100vw;\n\t\t\talign-items: center;\n\t\t\tjustify-content: center;\n\t\t\tmargin: 0;\n\t\t\tbackground-color: black;\n\t\t\t--cube-size: 300px;\n\t\t\t--plane-distance: -200px;\n\t\t\t--size-transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n\t\t\toverflow: hidden;\n\t\t\tfont-family: \'DM Sans\', sans-serif;\n\t\t\tanimation: fadein 1s;\n\t\t}\n\n\t\t@keyframes fadein {\n\t\t\tfrom {\n\t\t\t\topacity: 0;\n\t\t\t}\n\t\t}\n\n\t\t.env {\n\t\t\tdisplay: flex;\n\t\t\talign-items: center;\n\t\t\tjustify-content: center;\n\t\t\ttransform-style: preserve-3d;\n\t\t\ttransform: translateZ(-100px) scale(0.5);\n\t\t}\n\n\t\t.plane {\n\t\t\ttransition: var(--size-transition);\n\t\t\twidth: 2000px;\n\t\t\theight: 2000px;\n\t\t\tposition: absolute;\n\t\t\tbackground-image:\n\t\t\t\trepeating-conic-gradient(#0008 0% 25%, transparent 0% 50%),\n\t\t\t\tradial-gradient(#0F08, transparent 500px);\n\t\t\tbackground-size:\n\t\t\t\t50px 50px,\n\t\t\t\t100%;\n\t\t\ttransform: rotateX(90deg) translateZ(var(--plane-distance));\n\t\t}\n\n\t\t.cube {\n\t\t\twidth: var(--cube-size);\n\t\t\theight: var(--cube-size);\n\t\t\ttransition: var(--size-transition);\n\t\t\tposition: absolute;\n\t\t\ttransform-style: preserve-3d;\n\t\t}\n\n\t\t.cube>* {\n\t\t\ttransition: var(--size-transition);\n\t\t\twidth: var(--cube-size);\n\t\t\theight: var(--cube-size);\n\t\t\tbackground-color: #0d04;\n\t\t\tbox-shadow: 0 0 calc(var(--cube-size) / 4) inset #0F0d;\n\t\t\tposition: absolute;\n\t\t}\n\n\t\t.top {\n\t\t\ttransform: rotateX(90deg) translateZ(calc(var(--cube-size) / 2));\n\t\t}\n\n\t\t.bottom {\n\t\t\ttransform: rotateX(-90deg) translateZ(calc(var(--cube-size) / 2));\n\t\t}\n\n\t\t.left {\n\t\t\ttransform: rotateY(-90deg) translateZ(calc(var(--cube-size) / 2));\n\t\t}\n\n\t\t.right {\n\t\t\ttransform: rotateY(90deg) translateZ(calc(var(--cube-size) / 2));\n\t\t}\n\n\t\t.front {\n\t\t\ttransform: translateZ(calc(var(--cube-size) / 2));\n\t\t\tbox-sizing: border-box;\n\t\t}\n\n\t\t.front>* {\n\t\t\tz-index: 100;\n\t\t\topacity: 0.75;\n\t\t}\n\n\t\t.back {\n\t\t\ttransform: rotateY(180deg) translateZ(calc(var(--cube-size) / 2));\n\t\t}\n\t</style>\n</head>\n\n<body>\n\t<div class="env">\n\t\t<div class="cube">\n\t\t\t<div class="top"></div>\n\t\t\t<div class="bottom"></div>\n\t\t\t<div class="left"></div>\n\t\t\t<div class="right"></div>\n\t\t\t<div class="front" style="padding: 16px;">\n\t\t\t\t<h1>Welcome to Web Development!</h1>\n\t\t\t\t<p>Don\'t get intimidated by this pure-CSS 3D cube. We\'ll be going over simpler things...</p>\n\t\t\t</div>\n\t\t\t<div class="back"></div>\n\t\t</div>\n\t\t<div class="plane"></div>\n\t</div>\n</body>\n\n<script>\n\tlet mouseX = 0;\n\tlet mouseY = 0;\n\tconst motionRangeY = 500\n\tconst motionRangeX = 120\n\twindow.onmousemove = e => {\n\t\tmouseX = e.clientX\n\t\tmouseY = e.clientY\n\t}\n\tlet lastX = 0;\n\tlet lastY = 0;\n\tlet startScale = 0\n\tsetInterval(() => {\n\t\tlastX = lastX + (mouseX - lastX) / 15\n\t\tlastY = lastY + (mouseY - lastY) / 15\n\t\tstartScale = startScale + (1 - startScale) / 50\n\t\tstartScale\n\t\tlet x = 1 - lastX / window.innerWidth\n\t\tlet y = lastY / window.innerHeight\n\t\t// console.log(x, y)\n\t\tdocument.querySelector(\'.env\').style.transform = `translateZ(-100px) scale(${startScale}) rotateX(${y * motionRangeX - (motionRangeX / 2)}deg) rotateY(${x * motionRangeY - (motionRangeY / 2)}deg)`\n\t}, 15);\n</script>\n\n</html>';

export default function Lesson() {
	return (
		<ThreePartLayout
			lessonId={id}
			directions={
				<>
					<h1>Welcome!</h1>
					<p>This is a course on web development.</p>
					<h2>What is Web Development?</h2>
					<p>
						That's a good question. Web developers create the sites you use
						every day. There are two main types of web development, frontend and
						backend. Frontend developers create the user interfaces and the code
						that you "touch", so to speak. Backend developers create the code
						that runs on servers that web browsers talk to.
					</p>
					<h2>What this course covers</h2>
					<p>
						This course focuses purely on frontend. You will learn the basics of
						writing HTML, CSS, and JavaScript, which are enough to get you
						started creating little projects and games. You will also learn how
						to interact with backend APIs from your frontend application, using{" "}
						<code>fetch</code>.
					</p>
					<h2>An Important Note</h2>
					<p>
						The secret behind most professional web developers is that they're
						actually just professional "Googlers". You will not succeed at this
						course (or at web development in general) if you are afraid to look
						something up online. Get used to it. This is the only course in
						which cheating is encouraged.
					</p>
				</>
			}
			starterCode={cubeCode}
		/>
	);
}
