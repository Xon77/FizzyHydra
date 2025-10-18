// Exemples from Hirotoshi Uchida
// https://github.com/Uchida16104/LiveCodingPortfolio
// https://github.com/Uchida16104/NodeGL

// https://github.com/Uchida16104/LiveCodingPortfolio/blob/master/LCH_VJ-04.js
/*
osc(6.0,5.0,4.0).diff(o0).scale(0.3).kaleid(0.2).rotate(0.1).out();
noise(1.0,0.2).add(osc(3.0,4.0,5.0)).pixelate(60,70).color(0.8,0.9,1.0).blend(o0).modulate(osc(20,0.3)).out();
osc(-6.0,-5.0,-4.0).diff(o0).scale(-0.3).kaleid(-0.2).rotate(-0.1).out();
noise(-1.0,-0.2).add(osc(-3.0,-4.0,-5.0)).pixelate(-60,-70).color(-0.8,-0.9,-1.0).blend(o0).modulate(osc(-20,-0.3)).out();
noise(2.0,0.3).add(osc(4.0,5.0,6.0)).pixelate(70,80).color(0.9,0.1,2.0).blend(o0).modulate(osc(30,0.4)).out();
osc(7.0,6.0,5.0).diff(o0).scale(0.4).kaleid(0.3).rotate(0.2).out();
noise(-2.0,-0.3).add(osc(-4.0,-5.0,-6.0)).pixelate(-70,-80).color(-0.9,-0.1,-2.0).blend(o0).modulate(osc(-30,-0.4)).out();
osc(-7.0,-6.0,-5.0).diff(o0).scale(-0.4).kaleid(-0.3).rotate(-0.2).out();
osc(8.0,7.0,6.0).diff(o0).scale(0.5).kaleid(0.4).rotate(0.3).out();
osc(-8.0,-7.0,-6.0).diff(o0).scale(-0.5).kaleid(-0.4).rotate(-0.3).out();
noise(3.0,0.4).add(osc(5.0,6.0,7.0)).pixelate(80,90).color(0.1,0.2,3.0).blend(o0).modulate(osc(40,0.5)).out();
noise(-3.0,-0.4).add(osc(-5.0,-6.0,-7.0)).pixelate(-80,-90).color(-0.1,-0.2,-3.0).blend(o0).modulate(osc(-40,-0.5)).out();
noise(4.0,0.5).add(osc(6.0,7.0,8.0)).pixelate(90,10).color(0.2,0.3,4.0).blend(o0).modulate(osc(50,0.6)).out();
noise(-4.0,-0.5).add(osc(-6.0,-7.0,-8.0)).pixelate(-90,-10).color(-0.2,-0.3,-4.0).blend(o0).modulate(osc(-50,-0.6)).out();
osc(9.0,8.0,7.0).diff(o0).scale(0.6).kaleid(0.5).rotate(0.4).out();
osc(-9.0,-8.0,-7.0).diff(o0).scale(-0.6).kaleid(-0.5).rotate(-0.4).out();
osc(1.0,9.0,8.0).diff(o0).scale(0.7).kaleid(0.6).rotate(0.5).out();
noise(5.0,0.6).add(osc(7.0,8.0,9.0)).pixelate(10,20).color(0.3,0.4,5.0).blend(o0).modulate(osc(60,0.7)).out();
noise(-5.0,-0.6).add(osc(-7.0,-8.0,-9.0)).pixelate(-10,-20).color(-0.3,-0.4,-5.0).blend(o0).modulate(osc(-60,-0.7)).out();
osc(-1.0,-9.0,-8.0).diff(o0).scale(-0.7).kaleid(-0.6).rotate(-0.5).out();
noise(6.0,0.7).add(osc(8.0,9.0,1.0)).pixelate(20,30).color(0.4,0.5,6.0).blend(o0).modulate(osc(70,0.8)).out();
osc(2.0,1.0,9.0).diff(o0).scale(0.8).kaleid(0.7).rotate(0.6).out();
osc(-2.0,-1.0,-9.0).diff(o0).scale(-0.8).kaleid(-0.7).rotate(-0.6).out();
noise(-6.0,-0.7).add(osc(-8.0,-9.0,-1.0)).pixelate(-20,-30).color(-0.4,-0.5,-6.0).blend(o0).modulate(osc(-70,-0.8)).out();
osc(3.0,2.0,1.0).diff(o0).scale(0.9).kaleid(0.8).rotate(0.7).out();
noise(7.0,0.8).add(osc(9.0,1.0,2.0)).pixelate(30,40).color(0.5,0.6,7.0).blend(o0).modulate(osc(80,0.9)).out();
osc(-3.0,-2.0,-1.0).diff(o0).scale(-0.9).kaleid(-0.8).rotate(-0.7).out();
noise(-7.0,-0.8).add(osc(-9.0,-1.0,-2.0)).pixelate(-30,-40).color(-0.5,-0.6,-7.0).blend(o0).modulate(osc(-80,-0.9)).out();
noise(8.0,0.9).add(osc(1.0,2.0,3.0)).pixelate(40,50).color(0.6,0.7,8.0).blend(o0).modulate(osc(90,0.1)).out();
osc(4.0,3.0,2.0).diff(o0).scale(0.1).kaleid(0.9).rotate(0.8).out();
noise(-8.0,-0.9).add(osc(-1.0,-2.0,-3.0)).pixelate(-40,-50).color(-0.6,-0.7,-8.0).blend(o0).modulate(osc(-90,-0.1)).out();
osc(-4.0,-3.0,-2.0).diff(o0).scale(-0.1).kaleid(-0.9).rotate(-0.8).out();
osc(5.0,4.0,3.0).diff(o0).scale(0.2).kaleid(0.1).rotate(0.9).out();
osc(-5.0,-4.0,-3.0).diff(o0).scale(-0.2).kaleid(-0.1).rotate(-0.9).out();
noise(9.0,0.1).add(osc(2.0,3.0,4.0)).pixelate(50,60).color(0.7,0.8,9.0).blend(o0).modulate(osc(10,0.2)).out();
noise(-9.0,-0.1).add(osc(-2.0,-3.0,-4.0)).pixelate(-50,-60).color(-0.7,-0.8,-9.0).blend(o0).modulate(osc(-10,-0.2)).out();
noise(9.0,0.8).add(osc(7.0,6.0,5.0)).pixelate(40,30).color(0.2,0.1,0.9).blend(o0).modulate(osc(80,0.7)).out();
noise(-9.0,-0.8).add(osc(-7.0,-6.0,-5.0)).pixelate(-40,-30).color(-0.2,-0.1,-0.9).blend(o0).modulate(osc(-80,-0.7)).out();
osc(1.0,2.0,3.0).diff(o0).scale(0.4).kaleid(0.5).rotate(0.6).out();
osc(-1.0,-2.0,-3.0).diff(o0).scale(-0.4).kaleid(-0.5).rotate(-0.6).out();
osc(2.0,3.0,4.0).diff(o0).scale(0.5).kaleid(0.6).rotate(0.7).out();
noise(8.0,0.7).add(osc(6.0,5.0,4.0)).pixelate(30,20).color(0.1,0.9,0.8).blend(o0).modulate(osc(70,0.6)).out();
noise(-8.0,-0.7).add(osc(-6.0,-5.0,-4.0)).pixelate(-30,-20).color(-0.1,-0.9,-0.8).blend(o0).modulate(osc(-70,-0.6)).out();
osc(-2.0,-3.0,-4.0).diff(o0).scale(-0.5).kaleid(-0.6).rotate(-0.7).out();
noise(7.0,0.6).add(osc(5.0,4.0,3.0)).pixelate(20,10).color(0.9,0.8,0.7).blend(o0).modulate(osc(60,0.5)).out();
osc(3.0,4.0,5.0).diff(o0).scale(0.6).kaleid(0.7).rotate(0.8).out();
osc(-3.0,-4.0,-5.0).diff(o0).scale(-0.6).kaleid(-0.7).rotate(-0.8).out();
noise(-7.0,-0.6).add(osc(-5.0,-4.0,-3.0)).pixelate(-20,-10).color(-0.9,-0.8,-0.7).blend(o0).modulate(osc(-60,-0.5)).out();
osc(4.0,5.0,6.0).diff(o0).scale(0.7).kaleid(0.8).rotate(0.9).out();
noise(6.0,0.5).add(osc(4.0,3.0,2.0)).pixelate(10,90).color(0.8,0.7,0.6).blend(o0).modulate(osc(50,0.4)).out();
osc(-4.0,-5.0,-6.0).diff(o0).scale(-0.7).kaleid(-0.8).rotate(-0.9).out();
noise(-6.0,-0.5).add(osc(-4.0,-3.0,-2.0)).pixelate(-10,-90).color(-0.8,-0.7,-0.6).blend(o0).modulate(osc(-50,-0.4)).out();
noise(5.0,0.4).add(osc(3.0,2.0,1.0)).pixelate(90,80).color(0.7,0.6,0.5).blend(o0).modulate(osc(40,0.3)).out();
osc(5.0,6.0,7.0).diff(o0).scale(0.8).kaleid(0.9).rotate(0.1).out();
noise(-5.0,-0.4).add(osc(-3.0,-2.0,-1.0)).pixelate(-90,-80).color(-0.7,-0.6,-0.5).blend(o0).modulate(osc(-40,-0.3)).out();
osc(-5.0,-6.0,-7.0).diff(o0).scale(-0.8).kaleid(-0.9).rotate(-0.1).out();
osc(6.0,7.0,8.0).diff(o0).scale(0.9).kaleid(0.1).rotate(0.2).out();
osc(-6.0,-7.0,-8.0).diff(o0).scale(-0.9).kaleid(-0.1).rotate(-0.2).out();
noise(4.0,0.3).add(osc(2.0,1.0,9.0)).pixelate(80,70).color(0.6,0.5,0.4).blend(o0).modulate(osc(30,0.2)).out();
noise(-4.0,-0.3).add(osc(-2.0,-1.0,-9.0)).pixelate(-80,-70).color(-0.6,-0.5,-0.4).blend(o0).modulate(osc(-30,-0.2)).out();
noise(3.0,0.2).add(osc(1.0,9.0,8.0)).pixelate(70,60).color(0.5,0.4,0.3).blend(o0).modulate(osc(20,0.1)).out();
noise(-3.0,-0.2).add(osc(-1.0,-9.0,-8.0)).pixelate(-70,-60).color(-0.5,-0.4,-0.3).blend(o0).modulate(osc(-20,-0.1)).out();
osc(7.0,8.0,9.0).diff(o0).scale(0.1).kaleid(0.2).rotate(0.3).out();
osc(-7.0,-8.0,-9.0).diff(o0).scale(-0.1).kaleid(-0.2).rotate(-0.3).out();
osc(8.0,9.0,1.0).diff(o0).scale(0.2).kaleid(0.3).rotate(0.4).out();
noise(2.0,0.1).add(osc(9.0,8.0,7.0)).pixelate(60,50).color(0.4,0.3,0.2).blend(o0).modulate(osc(10,0.9)).out();
noise(-2.0,-0.1).add(osc(-9.0,-8.0,-7.0)).pixelate(-60,-50).color(-0.4,-0.3,-0.2).blend(o0).modulate(osc(-10,-0.9)).out();
osc(-8.0,-9.0,-1.0).diff(o0).scale(-0.2).kaleid(-0.3).rotate(-0.4).out();
noise(1.0,0.9).add(osc(8.0,7.0,6.0)).pixelate(50,40).color(0.3,0.2,0.1).blend(o0).modulate(osc(90,0.8)).out();
osc(9.0,1.0,2.0).diff(o0).scale(0.3).kaleid(0.4).rotate(0.5).out();
osc(-9.0,-1.0,-2.0).diff(o0).scale(-0.3).kaleid(-0.4).rotate(-0.5).out();
noise(-1.0,-0.9).add(osc(-8.0,-7.0,-6.0)).pixelate(-50,-40).color(-0.3,-0.2,-0.1).blend(o0).modulate(osc(-90,-0.8)).out();
*/

window.uchidaV4_001 = () => osc(9.0,8.0,7.0).diff(o0).scale(0.6).kaleid(0.5).rotate(0.4);
window.uchidaV4_002 = () => osc(-9.0,-8.0,-7.0).diff(o0).scale(-0.6).kaleid(-0.5).rotate(-0.4);
window.uchidaV4_003 = () => osc(-1.0,-9.0,-8.0).diff(o0).scale(-0.7).kaleid(-0.6).rotate(-0.5);
window.uchidaV4_004 = () => osc(2.0,1.0,9.0).diff(o0).scale(0.8).kaleid(0.7).rotate(0.6);
window.uchidaV4_005 = () => osc(-2.0,-1.0,-9.0).diff(o0).scale(-0.8).kaleid(-0.7).rotate(-0.6);
window.uchidaV4_006 = () => osc(-3.0,-2.0,-1.0).diff(o0).scale(-0.9).kaleid(-0.8).rotate(-0.7);
window.uchidaV4_007 = () => osc(1.0,2.0,3.0).diff(o0).scale(0.4).kaleid(0.5).rotate(0.6);
window.uchidaV4_008 = () => osc(-1.0,-2.0,-3.0).diff(o0).scale(-0.4).kaleid(-0.5).rotate(-0.6);
window.uchidaV4_009 = () => osc(2.0,3.0,4.0).diff(o0).scale(0.5).kaleid(0.6).rotate(0.7);
window.uchidaV4_010 = () => osc(-2.0,-3.0,-4.0).diff(o0).scale(-0.5).kaleid(-0.6).rotate(-0.7);
window.uchidaV4_011 = () => osc(3.0,4.0,5.0).diff(o0).scale(0.6).kaleid(0.7).rotate(0.8);
window.uchidaV4_012 = () => osc(-3.0,-4.0,-5.0).diff(o0).scale(-0.6).kaleid(-0.7).rotate(-0.8);
window.uchidaV4_013 = () => osc(4.0,5.0,6.0).diff(o0).scale(0.7).kaleid(0.8).rotate(0.9);
window.uchidaV4_014 = () => osc(-4.0,-5.0,-6.0).diff(o0).scale(-0.7).kaleid(-0.8).rotate(-0.9);
window.uchidaV4_015 = () => osc(5.0,6.0,7.0).diff(o0).scale(0.8).kaleid(0.9).rotate(0.1);
window.uchidaV4_016 = () => osc(-5.0,-6.0,-7.0).diff(o0).scale(-0.8).kaleid(-0.9).rotate(-0.1);
window.uchidaV4_017 = () => osc(6.0,7.0,8.0).diff(o0).scale(0.9).kaleid(0.1).rotate(0.2);
window.uchidaV4_018 = () => osc(-6.0,-7.0,-8.0).diff(o0).scale(-0.9).kaleid(-0.1).rotate(-0.2);

// https://uchida16104.github.io/NodeGL/
window.uchida001 = () => osc().scale(glslAxis("y"));
window.uchida002 = () => voronoi(20,1,5).scale(glslAxis("2y"));
// speed=1/4;flash(1,2,1).diff(osc(30,1/8,300).diff(osc(30,1/8,300).rotate(Math.PI/2))).scale([1/4,1/2].smooth()).out()

/*
shape(randAry(100, 0.1)).out();
shape(genAry(100, 0.1, 10).smooth()).out();
visual().out();
lightning(randAry(100, 0.1)).out();
*/

window.uchida003 = () =>
  src(o0)
  	.oil()
  	.watercolor()
  	.ink()
  	.painting(6.0, 0.2, 0.8, 0.4, 0.6, 2.0, 0.4, 0.4, 1.0, 1.5, 0.3, 0.2, 0.6, 0.3)
  	.over(2, 0, 50, 0)
  	.sketch(1, 1 / 100, 1 / 4, 1 / 4)
  	.modulateGlitch(o0, 0.05)
  	.modulateWarp(o0, 0.3)
  	.modulateSpiral(o0, 5)
  	.modulateShear(o0, 0.2)
  	.modulateRandomNoise(o0, 1)
  	.modulateRainbow(o0)
  	.modulateRingModulator(o0)
  	.layer(osc(40, 0.1, 1.2) // was visual() - fixed TypeError
  		.swirl(10)
  		.sub(huecircle()
  			.mask(sphere()
  				.mult(chaos(64)
  					.luma()
  					.invert()
  					.echo()
  					.chorus()
  					.vibrato()
  					.ringModulate()
            .blend(lissajouslaser(), 19 / 20)))));

window.uchida004 = () =>
  src(o0)
  .shift("cos(st.x/time)", "sin(st.y/time)", "sin(st.y/time)/cos(st.x/time)")
  .hue("sin(st.x/time)+cos(st.y/time)")
  .saturate("sin(st.y/time)-cos(st.x/time)")
  .brightness("cos(st.y/time)*sin(st.x/time)")
  .contrast("sin(st.y/time)+cos(st.x/time)")
  .layer(repeatoperator("modulateKaleid", () => osc(1).rotate(Math.PI / 2).scale(1.01), 2, osc(1))
  .sub(repeatoperator("modulateRotate", () => osc(1).rotate(Math.PI / 2).scale(1.01), 3, osc(1))
  .mult(repeatoperator("modulatePixelate", () => osc(1).rotate(Math.PI / 2).scale(1.01), 5, osc(1))
  .mask(repeatoperator("modulateScale", () =>osc(1).rotate(Math.PI / 2).scale(1.01), 8, osc(1))))));

// https://github.com/Uchida16104/LiveCodingPortfolio/blob/master/LCH_VJ-Ufo_Is_Coming.js
window.uchida005 = () =>
  shape(99, 0, 1)
  	.colorama(2)
  	.hue("cos(st.x)+sin(st.y)")
  	.diff(osc(10, 0)
  		.kaleid(99)
  		.r(3))
  	.diff(chaos())
  	.diff(osc()
  		.swirl(Math.PI * 4))
  	.invert()
  	.add(shape(99, 1 / 2, 1 / 40))
  	.scale(4 / 5)
  .blend(o0,.925);

// https://github.com/Uchida16104/LiveCodingPortfolio/blob/master/LCH_VJ-Void_I.js
window.uchida006 = () =>
	solid()
	.add(
		parametriclaser("cos(2.0*time)*cos(time)", "cos(2.0*time)*sin(time)", 100, 0.5, "sin(time)", "sin(time)-cos(time)", "cos(time)"))
	.add(
		parametriclaser("cos(4.0*time)*cos(time)", "cos(4.0*time)*sin(time)", 100, 0.5, "sin(time)*sin(time)", "cos(time)-sin(time)", "cos(time)*cos(time)"))
	.add(
		parametriclaser("cos(6.0*time)*cos(time)", "cos(6.0*time)*sin(time)", 100, 0.5, "sin(time)*cos(time)", "cos(time)*sin(time)", "cos(time)*sin(time)"))
	.add(
		parametriclaser("cos(8.0*time)*cos(time)", "cos(8.0*time)*sin(time)", 100, 0.5, "cos(time)*cos(time)", "cos(time)/sin(time)", "sin(time)*sin(time)"))
	.add(
		parametriclaser("cos(10.0*time)*cos(time)", "cos(10.0*time)*sin(time)", 100, 0.5, "cos(time)", "sin(time)/cos(time)", "sin(time)"))
	.scale(1)
	.hue()
	.saturate()
  .add(o0);

window.uchida007 = () =>
  // https://github.com/Uchida16104/LiveCodingPortfolio/blob/master/LCH_VJ-Clear_sky.js
  // Does not seem to work but stops the image // so cool
	visual()
	.diff(huecircle())
	.blend(solid(0, 1, 1))
	.shake()
	.echo()
	.vibrato()
	.chorus()
	.ringModulate()
	.modulateRingModulator(o0)
	.modulateGlitch(o0)
	.modulateShear(o0)
	.layer(src(o0)
		.painting(6.0, 0.2, 0.8, 0.4, 0.6, 2.0, 0.4, 0.4, 1.0, 1.5, 0.3, 0.2, 0.6, 0.3)
		.scale(Math.random())
		.repeat(2, 2)
		.posterize(10, 2)
		.sub(src(o0)
			.over(2, 0, 50, 0)
			.mask(src(o0)
				.sketch(1, 1 / 100, 1 / 4, 1 / 4))))
	.hue(1 / 10)
	.color(0, 1, 1)
	.contrast(15 / 10)
	.brightness(7 / 10)
  .blend(o0, 1);

// https://github.com/Uchida16104/LiveCodingPortfolio/blob/master/LCH_VJ-Void_II.js
window.uchida008 = () =>
  solid()
  .add(
  	parametriclaser("cos(time)*cos(2.0*time)+cos(3.0*time)","sin(time)*sin(2.0*time)+sin(3.0*time)", 100, 0.5, "sin(time)", "sin(time)*cos(time)", "cos(time)"))
  .scale(1)
  .hue()
  .saturate()
  .scale(.5)
  .add(o0);

window.uchida009 = () =>
  fractal([1 / 8, 1 / 4].smooth(), [0, 1].reverse()
  .ease('easeInOutHalf')
  .smooth(1 / 3)
  .fit(1 / 4)
  .offset(1 / 5)
  .fast(1 / 6), [0, 1].reverse()
  .ease('easeInOutCubic')
  .smooth(1 / 4)
  .fit(1 / 5)
  .offset(1 / 6)
  .fast(1 / 7), () => Math.tan(time / 10), Math.PI * 200, 10000)
  .mult(osc(1, 2, 300)
  .diff(gradient(1))
  .diff(solid([0, 1].smooth(), [0, 1].smooth()
  .fast(1 / 2), [0, 1].smooth()
  .fast(1 / 4), [0, 1].smooth()
  .fast(1 / 8)))
  .hue())
  .add(o0, [0, 1].smooth()
  .fast(1 / 16));

// https://github.com/Uchida16104/LiveCodingPortfolio/blob/master/LCH_VJ-Jellyfish.js
window.uchida010 = () =>
  shape(99, 0, 1)
  	.colorama(2)
  	.hue("cos(st.x)+sin(st.y)")
  	.diff(osc(10, 0)
  		.kaleid(99)
  		.r(3))
  	.invert()
    .scale(4 / 5);

window.uchida011 = () => beam();
window.uchida012 = () => osc().fisheye();
window.uchida013 = () => ringModulator().ringModulate().modulateRingModulator(o0);
window.uchida014 = () => chaos(8);
window.uchida015 = () => lissajous().laser().blend(lissajouslaser());
window.uchida016 = () => sphere();
window.uchida017 = () => flower();
window.uchida018 = () => parametriclaser("cos(time)-0.5*cos(2.0*time)", "sin(time)-0.5*sin(2.0*time)", 100, 0.5, "sin(time)", "cos(time)*sin(time)", "cos(time)").scale(0.5).add(o0);
