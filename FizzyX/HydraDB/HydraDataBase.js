// XXX Source Data Base XXX

// Some examples come from Website Hydra examples or libraries licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/

// loadScript('/Users/xon/Desktop/Live_Coding/Hydra/HydraDatabaseF.js')
// loadScript('/Users/xon/Desktop/Live_Coding/Hydra/HydraDatabaseGLSL.js')
// loadScript('/Users/xon/Desktop/Live_Coding/Hydra/HydraDatabaseH.js')
// loadScript('/Users/xon/Desktop/Live_Coding/Hydra/HydraDatabaseU.js')

// XXXXXX
window.s000a = () => shape(4).color(1,0,0); // red
window.s000b = () => shape(4).color(0,0,1).rotate(0.5); // rotating blue

// XXXXXX
window.s001 = () =>
  shape(4).scrollX(() => rms1)
    .add(
      shape(4).scale(1, 3).mult(noise(() => 0.5+100*rms2, 2)).scrollY(0.5).scrollX(() => rms2*2))
    .add(solid(() => 3*rms3)) // adds red
    .add(shape(4).scrollX(1).mult(solid(0,0,1)).scale(() => 1+rms4*10)); // adds blue

window.s002 = () =>
  shape(4).scrollY(() => rms1*(1)).scale(() => rms1*(-20))
    .add(
      shape(4).scale(() => rms2*6, () => rms2*12).mult(noise(() => 0.5+100*rms2, 2)).scrollY(0.5).scrollX(() => rms2*2))
    .add(solid(() => 3*rms3)) // adds red
    .add(shape(4).scrollX(1).mult(solid(0,0,1)).scale(() => rms4*10)); // adds blue
    // .add(shape(4).scrollX(1).mult(solid(0,0,1)).scale(() => rms(3))) // removes + 1 to have weird results

window.s003 = () =>
  shape(2,() => rms1,() => rms1).scrollY(() => rms1*(1)).scale(() => rms1*(-1))
    .add(
      shape(4).scale(() => rms2*6, () => rms2*12).mult(noise(() => 10*rms2, 2)).scrollY(0.5).scrollX(() => rms2*2))
    .add(solid(() => 3*rms3)) // adds red
    // .add(shape(4).scrollX(1).mult(solid(0,0,1)).scale(() => rms(3)*10)) // adds blue
    .add(voronoi(() => rms4*6,() => rms4,() => rms4).scrollX(1).mult(solid(0,0,1)).scale(() => rms4)); // removes + 1 to have weird results

window.s004 = () =>
  shape(4,() => rms1,() => rms1).scrollY(() => rms1*(1)).scale(() => rms1*(-1))
    .add(
      shape(4).scale(() => rms2*6, () => rms2*12).mult(noise(() => 10*rms2, 2)).scrollY(0.5).scrollX(() => rms2*2))
    .add(solid(() => 3*rms3)) // adds red
    // .add(shape(4).scrollX(1).mult(solid(0,0,1)).scale(() => rms(3)*10)) // adds blue
    .add(osc(() => rms4*66,() => rms4,() => rms4).scrollX(1).mult(solid(0,0,1)).scale(() => rms4*10)); // removes + 1 to have weird results

// XXXXXX
window.r001 = () =>
  ring(0.9,0.18,() => rms1*0.5,0.2).scrollX(() => rms1*(1))
    .add(
      shape(4).scale(1, 3).mult(noise(() => 0.5+100*rms2, 2)).scrollY(0.5).scrollX(() => rms2*2))
    .add(solid(() => 3*rms3)) // adds red
    .add(shape(4).scrollX(1).mult(solid(0,0,1)).scale(() => 1+rms4*10)); // adds blue

window.r002 = () =>
  ring(() => rms1,0.48,() => rms1*0.5,0.2).scrollX(() => rms1*(1))
    .layer(
      shape(4).scale(1, 3).mult(noise(() => 0.5+100*rms2, 2)).scrollY(0.5).scrollX(() => rms2*2).luma())
    .add(solid(() => 3*rms3)) // adds red
    .add(shape(4,() => rms4,() => rms4).scrollX(1).mult(solid(0,0,1)).scale(() => 1+rms4*10)); // adds blue

window.r003 = () =>
  ring(() => rms1,0.48,() => rms1*0.5,() => 0.2+rms1*0.1).scrollX(() => rms1*(1))
    .layer(
      shape(4).scale(1, 3).mult(noise(() => 0.5+100*rms2, 2)).scrollY(0.5).scrollX(() => rms2*2).luma())
    .add(solid(() => 3*rms3)) // adds red
    .add(shape(4,() => rms4,() => rms4).scrollX(1).mult(solid(0,0,1)).scale(() => 1+rms4*10)); // adds blue

window.r004 = () =>
  ring(() => rms1,0.48,() => rms1*0.5,0.2).scrollX(() => rms1*(1)).scale(() => 0.01+rms1*3)
    .layer(
      shape(4).scale(1, 3).mult(noise(() => 0.5+100*rms2, 2)).scrollY(0.5).scrollX(() => rms2*2).luma())
    .add(solid(() => 3*rms3)) // adds red
    .add(shape(4,() => rms4,() => rms4).scrollX(1).mult(solid(0,0,1)).scale(() => 1+rms4*10)); // adds blue

// XXXXXX
window.b001 = () =>
  osc(30)
  	.screen(noise(3,1).pm())
    .linearBurn(gradient(1).hue(.3));


// XXXXXX
window.o001 = () =>
  osc(20, 0.1, 0.8)
    .rotate(0.2)
    .mult(osc(100), 10);
window.o002 = () =>
  osc(20, 0.1, 10.8)
    .rotate(() => rms1)
    .mult(osc(10), () => rms2);
window.o003 = () =>
  osc(20, 0.1, 10.8)
    .rotate(() => rms2*60)
    .mult(osc(10), () => rms1);
window.o004 = () =>
  osc(30, 0.01, 10.8)
    .rotate(() => rms1*6)
    .mult(osc(100), () => rms2);
window.o005 = () =>
  osc(100, 0.1, 0.8)
    .rotate(() => rms1*6)
    .mult(osc(100), () => rms2);

// Disc licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// by Zach Krall
// http://zachkrall.online/
window.o006 = () =>
  osc( 215, 0.1, 2 )
  .modulate(
    osc( 2, -0.3, 100 )
    .rotate(15)
  )
  .mult(
    osc( 215, -0.1, 2)
    .pixelate( 50, 50 )
  )
  .color( 0.9, 0.0, 0.9 )
  .modulate(
    osc( 6, -0.1 )
    .rotate( 9 )
  )
  .add(
    osc( 10, -0.9, 900 )
    .color(1,0,1)
  )
  .mult(
    shape(900, 0.2, 1)
    .luma()
    .repeatX(2)
    .repeatY(2)
    .colorama(10)
  )
  .modulate(
    osc( 9, -0.3, 900 )
    .rotate( 6 )
  )
  .add(
    osc(4, 1, 90)
    .color(0.2,0,1)
  );

window.o007 = () =>
  osc( 215, 0.1, 2 )
  .modulate(
    osc( 2, -0.3, 100 )
    .rotate(() => rms1*150)
  )
  .mult(
    osc(() =>  rms1*215, -0.1, 2)
    .pixelate( 50, 50 )
  )
  .color( 0.9, 0.0, 0.9 )
  .modulate(
    osc( 6, -0.1 )
    .rotate( 9 )
  )
  .add(
    osc(() => rms2*10, -0.9, 900 )
    .color(1,0,1)
  )
  .mult(
    shape(() => rms3*900, 0.2, 1)
    .luma()
    .repeatX(2)
    .repeatY(2)
    .colorama(10)
  )
  .modulate(
    osc(() => rms1*9, -0.3, 900 )
    .rotate( 6 )
  )
  .add(
    osc(4, 1, 90)
    .color(0.2,0,1)
  );


// Exemples from Thomas Jourdan
window.tJ001 = () => smoothsun(0.3, 0.2, 0.6, 0.6).grarose(0.3).hsvshift(0.17, 1.5, 0.9);
window.tJ002 = () => concentric(30);
window.tJ003 = () => concentric(5,2,0.5).modulate(concentric(20,2,0.5));
window.tJ004 = () => concentric(30,2,0.5,1.31).colorama(0.5).modulateRepeat(concentric(30,2,0.5,0.51),0.1,0.1,0,0.5);
window.tJ005 = () => blinking(5, 5, 0.5, 0);
window.tJ006 = () => blinking(5).mult(shape(3).scale(-1.5).modulate(blinking(5))).contrast();
window.tJ007 = () => blinking(5).add(blinking(10).add(blinking(30)));
window.tJ008 = () => blinking().scale(0.2).rotate(() => 0.2*time);
window.tJ009 = () => phasenoise(0, 0.15, 5, 0.5, 0.07);
window.tJ010 = () => phasenoise(0.45, 0.3, 25, 1.7, 0.1).diff(o0);
window.tJ011 = () => phasenoise(0, 0.1, 10).mult(shape(3).scale(1.5).modulate(phasenoise(0, 0.1, 12, 1)));
window.tJ012 = () => phasenoise(0, 0.1, 10).mult(shape(5).rotate(() => time).scale(2.5).diff(osc()));
window.tJ013 = () => sdfmove();
window.tJ014 = () => sdfmove(0.1, 0.2, 0.3).colorama(0.8).blend(sdfmove(-0.1, -0.2, -0.3).rotate());
window.tJ015 = () => sdfmove().modulateRepeat(sdfmove(0.13, 0.11, -0.23).rotate(1.57));
window.tJ016 = () => sdfmove().rotate(1.57).modulate(noise(1.6, 0.5)).grarose(0.7);


// XXXXXX
// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// Velvet Pool
// by Mahalia H-R
// IG: mm_hr_
window.seq001o2 = () => (
  noise()
  .color(() => a.fft[2]*2,0,.6)
  .modulate(noise(() => a.fft[0]*10))
  .scale(()=> a.fft[2]*5)
  .layer(
    src(o0)
    .mask(osc(10).modulateRotate(osc(),90,0))
    .scale(() => a.fft[0]*2)
    .luma(0.2,0.3)
  )
  .blend(o0)
  .out(o0),
  osc()
  .modulate(noise(() => a.fft[1]+5))
  .color(1,0,0)
  .out(o1),
  src(o0)
  .modulate(o1)
  .layer(
    src(o1)
    .mask(o1)
    .saturate(7)
  )
  .modulateRotate(o1)
  .rotate(({time}) => time%360*0.05)
  .out(o2),
  render(o2)
);

window.seq002o2 = () => (
  // ChatGPT creation of a dynamic base with circular shapes and noise texture
  ring(() => rms1, 0.5, () => rms2 * 0.8, () => 0.2 + rms1 * 0.1)
    .scale(() => 0.5 + rms3 * 2)
    .rotate(() => rms4 * Math.PI)
    .add(
      shape(4).scale(() => 1 + rms2 * 5, () => 1 + rms3 * 3)
        .mult(noise(() => 0.1 + rms4 * 10, 3))
        .scrollY(() => rms1 * 0.5)
        .scrollX(() => rms2 * 0.3)
        .luma(() => rms3 * 0.8)
    )
    .mult(
      osc(() => rms4 * 20, 0.2, () => rms2 * 2)
        .colorama(() => rms3 * 0.5)
    )
    .layer(
      voronoi(() => rms1 * 20, () => rms2 * 0.1, () => rms3)
        .scrollX(() => rms4 * 0.5)
        .scale(() => 1 + rms1 * 0.2)
    )
    .add(
      solid(() => rms3, () => rms2, () => rms4 * 2)
        .mult(gradient(0.5).luma(() => rms2 * 0.7))
    )
    .out(o0),
  // Adding background patterns with vibrant textures
  shape(4)
    .rotate(() => rms3 * Math.PI * 0.5)
    .scale(() => 1 + rms1 * 0.5)
    .add(
      voronoi(() => rms4 * 10, 0.2, 1)
        .color(() => rms1, () => rms2 * 0.5, () => rms3 * 0.3)
        .mult(noise(() => rms3 * 5, 2))
    )
    .mult(osc(10, 0.5, () => rms4 * 2).kaleid(4))
    .out(o1),
  // Layer fusion for unified composition
  src(o0)
    .layer(src(o3).mask(shape(99).scale(() => rms4 * 0.4 + 0.5)))
    .blend(src(o0), 0.5)
    .scale(() => 1 + rms1 * 0.3)
    .out(o2),
  render(o2)
);

// https://github.com/Uchida16104/LiveCodingPortfolio/blob/master/LCH-VJ_Beams.js
window.seq003o2 = () => (
  solid()
  	.add(voronoi("atan(sin(st.x),cos(st.y))", randAry(100, 0.1), randAry(100, 0.1))
  		.rotate(randAry(100, 0.1), randAry(100, 0.1))
  		.pixelate(randAry(100, 0.1))
  		.color(randAry(100, 0.1), randAry(100, 0.1), randAry(100, 0.1)), [1, 0, 0].smooth(1 / 3))
  	.add(gradient("sin(cos(tan(st.x*st.y)-asin(st.y)*acos(st.x)))")
  		.colorama(randAry(100, 0.1))
  		.rotate(randAry(100, 0.1), randAry(100, 0.1))
  		.saturate(randAry(100, 0.1))
  		.color(randAry(100, 0.1), randAry(100, 0.1), randAry(100, 0.1)), [0, 1, 0].smooth(1 / 3))
  	.add(o1, [1, 0, 0].reverse()
  		.smooth(1 / 3))
  	.blend(o0, 2 / 5)
    .out(),
  solid()
  	.add(zebra(src(o2), randAry(100, 0.1), randAry(100, 0.1), Math.sin, 0.1))
  	.sub(gradient(randAry(100, 0.1))
  		.colorama("atan(sin(st.y),cos(st.x))*2.0")
  		.blend(rainbow(3)))
  	.contrast(randAry(100, 0.1))
  	.invert(randAry(100, 0.1))
    .out(o1),
  form(4, 2, 0, 1, 15, 1 / 8, 0)
  	.repeat(randAry(100, 0.1), randAry(100, 0.1))
  	.diff(pad(10, o2, 4, 0, 1, .99))
    .out(o2),
    render(o2)
);

// https://github.com/Uchida16104/LiveCodingPortfolio/blob/master/LCH-VJ_Beams.js
window.seq003o0 = () => (
  s0.initCam(),
  window.timbre=(reversal)=>src(s0).invert(reversal),
  window.synth=(reversal,mix)=>solid().add(timbre(reversal),mix),
  window.modulator=(moderate)=>osc(1,2,300).diff(gradient(1).diff(solid([0,1].smooth().fast(1/8),[0,1].smooth().fast(1/4),[0,1].smooth().fast(1/2),[0,1].smooth()).colorama([0,1].smooth().fast(1/moderate/10)))).invert().scale(.1).hue(()=>Math.sin(time/10),()=>Math.cos(time/10),()=>Math.tan(time/10)),
  window.beam=(reversal,mix,moderate,amount,strength)=>solid().add(synth(reversal,mix)).invert().luma(.7).posterize(2,2).mult(modulator(moderate)).blend(src(o0).pixelate(amount,amount).scale(strength),.9),
  beam(0,1,.1,750,1.1).out(o0),
  render(o0)
);

window.seq003o0b = () => (
  // s0.initCam(),
  window.timbre=(reversal)=>src(s0).invert(reversal),
  window.synth=(reversal,mix)=>solid().add(timbre(reversal),mix),
  window.modulator=(moderate)=>osc(1,2,300).diff(gradient(1).diff(solid([0,1].smooth().fast(1/8),[0,1].smooth().fast(1/4),[0,1].smooth().fast(1/2),[0,1].smooth()).colorama([0,1].smooth().fast(1/moderate/10)))).invert().scale(.1).hue(()=>Math.sin(time/10),()=>Math.cos(time/10),()=>Math.tan(time/10)),
  window.beam=(reversal,mix,moderate,amount,strength)=>solid().add(synth(reversal,mix)).invert().luma(.7).posterize(2,2).mult(modulator(moderate)).blend(src(o0).pixelate(amount,amount).scale(strength),.9),
  beam(0,1,.1,750,1.1).out(o0),
  render(o0)
);

window.seq004o1 = () => (
  // seq Tj
  rharmonic(2.3).modulate(rsaw(5)).colorama(0.5).modulateRepeat(o0).out(o0),
  tri(1.1).colorama(0.5).colorama(0.5).modulateRotate(o0).out(o1),
  render(o1)
);

// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")
window.seq004o3 = () => (
  window.frame = 0,
  osc(30, 0.1, 2).kaleid(3).out(o2),
  src(o3)
      .pxsort(0.1, () => {return frame++;})
      .blend(o2, () => {return ((frame % 3000) == 0) ? 1 : 0.01;})
      .contrast(1.01)
      .out(o3),
  render(o3)
);

window.pattern = () => osc(30.593, 0.008)
	.kaleid(250.61)
	.scale(1, 0.687);
window.seq001o0 = () => (
  window.pattern()
  	.scrollX(0.061, 0.015)
    .mult(pattern())
    .modulate(pattern())
    .out(o0),
  render(o0)
);

window.seq009 = () => (
  osc(40).out(o0),
  noise().out(o1),
  src(o0).add(src(o1)).out(o2),
  render(o2)
);


// flameEngine.start();
/*flameEngine.setConfig(
	flame()
	.colorful(.7)
	.mapExposure(2)
	.addTransform(
		transform()
		.hyperbolic()
		.rotateX()
		.build()
	)
	.addTransform(
		transform()
		.fisheye()
		.rotateY()
		.build()
	)
	.addTransform(
		transform()
		.fisheye()
		.rotateO()
		.build()
	)
);
flameEngine.start();*/

window.seqFl001 = () => ( // src(o0)
  flameEngine.stop?.(), // Stop render loop
  flameEngine.renderer?.dispose?.(), // Libère mémoire GPU (si exposé)
  // s0.init(), // Reset s0 sans texture
  flameEngine.canvas.width = flameEngine.canvas.width, // Force canvas reset
  // clear(),
  // flameEngine.init(),
  flameEngine.setConfig(
    flame()
    .screenInitScale(.2)
    .screenInitVal(.8)
    .colorful(0.4)
    .mapExposure(1.6)
    .addTransform(
      transform()
      .linear()
      .weight(.8)
      .o(({time}) => [Math.sin(time/5), Math.sin(time/3)])
      .build()
    )
    .addTransform(
      transform()
      .weight(.1)
      .fisheye()
      .x([.1,8])
      .y([4,.1])
      .y([7,.1])
      .build()
    )
    .iterations(4)
    .firstLevel(7)
    .lastLevel(12)
  ),
  flameEngine.start(),
  s0.init({
  	src: flameEngine.canvas
  }),
  src(o0)
  	.layer(
  		src(s0)
  		.luma())
  	.scale(1.002)
    .modulateRotate(noise(1), .01)
    .out(o0),
  render(o0)
);

// flameEngine.start();

window.seqFl002 = () => ( // src(o0)
  flameEngine.stop?.(), // Stop render loop
  flameEngine.renderer?.dispose?.(), // Libère mémoire GPU (si exposé)
  // s0.init(), // Reset s0 sans texture
  flameEngine.canvas.width = flameEngine.canvas.width, // Force canvas reset
  // clear(),
  // flameEngine.init(),
  flameEngine.setConfig(
    flame()
        .colorful(.4)
        .exposure(3)
  ),
  flameEngine.start(),
  s0.init({
  	src: flameEngine.canvas
  }),
  src(o0)
  	.layer(
  		src(s0)
  		.luma())
  	.scale(1.002)
    .modulateRotate(noise(1), .01)
    .out(o0),
  render(o0)
);

window.seqFl003 = () => ( // src(o0)
  flameEngine.stop?.(), // Stop render loop
  flameEngine.renderer?.dispose?.(), // Libère mémoire GPU (si exposé)
  // s0.init(), // Reset s0 sans texture
  flameEngine.canvas.width = flameEngine.canvas.width, // Force canvas reset
  // clear(),
  // flameEngine.init(),
  flameEngine.setConfig(
  	flame()
  	.colorful(.7)
  	.mapExposure(2)
  	.addTransform(
  		transform()
  		.hyperbolic()
  		.rotateX()
  		.build()
  	)
  	.addTransform(
  		transform()
  		.fisheye()
  		.rotateY()
  		.build()
  	)
  	.addTransform(
  		transform()
  		.fisheye()
  		.rotateO()
  		.build()
  	)
  ),
  flameEngine.start(),
  s0.init({
  	src: flameEngine.canvas
  }),
  src(o0)
  	.layer(
  		src(s0)
  		.luma())
  	.scale(1.002)
    .modulateRotate(noise(1), .01)
    .out(o0),
  render(o0)
);

window.seqFl004 = () => ( // src(o0)
  flameEngine.stop?.(), // Stop render loop
  flameEngine.renderer?.dispose?.(), // Libère mémoire GPU (si exposé)
  // s0.init(), // Reset s0 sans texture
  flameEngine.canvas.width = flameEngine.canvas.width, // Force canvas reset
  // clear(),
  // flameEngine.init(),
  flameEngine.setConfig(
    flame()
      .colorful(.4)
      .exposure(3)
      .addTransform(
        transform()
        .linear()
        .x([1,0])
        .y([0,1])
        .o([0.1, 0.1])
      )
      .addTransform(
        transform()
        .linear()
        .x(({time}) => [0, Math.sin(time)])
        .y(({time}) => [Math.cos(time), 0])
        .o([0, 0])
      )
  ),
  flameEngine.start(),
  s0.init({
  	src: flameEngine.canvas
  }),
  src(o0)
  	.layer(
  		src(s0)
  		.luma())
  	.scale(1.002)
    .modulateRotate(noise(1), .01)
    .out(o0),
  render(o0)
);

// https://emptyfla.sh/bl4st/?c=%0A%2F%2F+More+info+at+https%3A%2F%2Fgithub.com%2Femptyflash%2Fbl4st%0Aflame%28%29%0A++.initScale%28.2%29%0A++.initVal%28.8%29%0A++.colorful%280.4%29%0A++.exposure%281.6%29%0A++.addTransform%28%0A++++transform%28%29%0A++++.fisheye%28%29%0A++++.x%28%28%7Btime%7D%29+%3D%3E+%5B.2%2C1.5*Math.sin%28time%2F5%29%5D%29%0A++%29%0A++.addTransform%28%0A++++transform%28%29%0A++++.fisheye%28%29%0A++++.y%28%28%7Btime%7D%29+%3D%3E+%5B.2%2C1.5*Math.cos%28time%2F3%29%5D%29%0A++%29
// More info at https://github.com/emptyflash/bl4st
window.seqFl005 = () => ( // src(o0)
  flameEngine.stop?.(), // Stop render loop
  flameEngine.renderer?.dispose?.(), // Libère mémoire GPU (si exposé)
  // s0.init(), // Reset s0 sans texture
  flameEngine.canvas.width = flameEngine.canvas.width, // Force canvas reset
  // clear(),
  // flameEngine.init(),
  flameEngine.setConfig(
    flame()
      .initScale(.2)
      .initVal(.8)
      .colorful(0.4)
      .exposure(1.6)
      .addTransform(
        transform()
        .fisheye()
        .x(({time}) => [.2,1.5*Math.sin(time/5)])
      )
      .addTransform(
        transform()
        .fisheye()
        .y(({time}) => [.2,1.5*Math.cos(time/3)])
      )
  ),
  flameEngine.start(),
  s0.init({
  	src: flameEngine.canvas
  }),
  src(o0)
  	.layer(
  		src(s0)
  		.luma())
  	.scale(1.002)
    .modulateRotate(noise(1), .01)
    .out(o0),
  render(o0)
);

// flameEngine.start();

// XXXXXX
// window.sources = [o001(),o002(),o003(),o004(),o005(),o006(),o007(),s000a(),s000b(),s001(),s002(),s003(),s004(),r001(),r002(),r003(),r004()];

// window.sources = [b001(),f001(),o001(),o002(),o003(),o004(),o005(),o006(),o007(),s000a(),s000b(),s001(),s002(),s003(),s004(),r001(),r002(),r003(),r004()];

// XXXXXX
// window.sources = [h001(),h002(),h003(),h004(),h005(),h006(),h007(),h008(),h009(),h010(),h011(),h012(),h013(),h014(),h015(),h016(),h017(),h018(),h019(),h020(),h021(),h022(),h023(),h024(),h025(),h026(),h027(),h028(),h029(),b001(),f001(),f002(),f003(),f004(),f005(),f002b(),f003b(),f004b(),f005b(),f005c(),glsl001(),glsl002(),glsl003(),glsl003b(),glsl003c(),o001(),o002(),o003(),o004(),o005(),o006(),o007(),s000a(),s000b(),s001(),s002(),s003(),s004(),r001(),r002(),r003(),r004(),tJ001(),tJ002(),tJ003(),tJ004(),tJ005(),tJ006(),tJ007(),tJ008(),tJ009(),tJ010(),tJ011(),tJ012(),tJ013(),tJ014(),tJ015(),tJ016(),uchida001(),uchida002(),uchida003(),uchida004(),uchida005(),uchida006(),uchida008(),uchida010(),uchida011(),uchida012(),uchida013(),uchida014(),uchida015(),uchida016(),uchida017(),uchida018(),uchidaV4_001(),uchidaV4_002(),uchidaV4_003(),uchidaV4_004(),uchidaV4_005(),uchidaV4_006(),uchidaV4_007(),uchidaV4_008(),uchidaV4_009(),uchidaV4_010(),uchidaV4_011(),uchidaV4_012(),uchidaV4_013(),uchidaV4_014(),uchidaV4_015(),uchidaV4_016(),uchidaV4_017(),uchidaV4_018()];
// ,uchida009() // withdrawn but interesting
// ,uchida007() // Arrêt sur image XXX

window.sources = [
  // H series - FCS library models
  h001(),h002(),h003(),h004(),h005(),h006(),h007(),h008(),h009(),h010(),
  h011(),h012(),h013(),h014(),h015(),h016(),h017(),h018(),h019(),h020(),
  h021(),h022(),h023(),h024(),h025(),h026(),h027(),h028(),h029(),

  // B series
  b001(),

  // F series - Fractal base models
  f001(),f002(),f003(),f004(),f005(),f002b(),f003b(),f004b(),f005b(),f005c(),

  // FB series - Extended fractals
  fb001(),fb002(),fb003(),fb004(),fb005(),fb006(),fb007(),fb008(),fb009(),fb010(),
  fb011(),fb012(),fb013(),fb014(),fb015(),fb016(),fb017(),fb018(),fb019(),fb020(),
  fb021(),fb022(),fb023(),fb024(),fb025(),fb026(),fb027(),fb028(),fb029(),fb030(),
  fb031(),fb032(),fb033(),fb034(),fb035(),fb036(),fb037(),fb038(),fb039(),fb040(),
  fb041(),fb042(),fb043(),fb044(),fb045(),fb046(),fb047(),fb048(),fb049(),fb050(),
  fb051(),fb052(),fb053(),fb054(),fb055(),fb056(),fb057(),fb058(),fb059(),fb060(),
  fb061(),fb062(),fb063(),fb064(),fb065(),fb066(),fb067(),fb068(),fb069(),fb070(),
  fb071(),fb072(),fb073(),fb074(),fb075(),fb076(),fb077(),fb078(),fb079(),fb080(),
  fb081(),fb082(),fb083(),fb084(),fb085(),fb086(),fb087(),fb088(),fb089(),fb090(),
  fb091(),fb092(),fb093(),fb094(),fb095(),fb096(),fb097(),fb098(),fb099(),fb100(),

  // HB series - FCS Complex Organic (HB001-HB100)
  hb001(),hb002(),hb003(),hb004(),hb005(),hb006(),hb007(),hb008(),hb009(),hb010(),
  hb011(),hb012(),hb013(),hb014(),hb015(),hb016(),hb017(),hb018(),hb019(),hb020(),
  hb021(),hb022(),hb023(),hb024(),hb025(),hb026(),hb027(),hb028(),hb029(),hb030(),
  hb031(),hb032(),hb033(),hb034(),hb035(),hb036(),hb037(),hb038(),hb039(),hb040(),
  hb041(),hb042(),hb043(),hb044(),hb045(),hb046(),hb047(),hb048(),hb049(),hb050(),
  hb051(),hb052(),hb053(),hb054(),hb055(),hb056(),hb057(),hb058(),hb059(),hb060(),
  hb061(),hb062(),hb063(),hb064(),hb065(),hb066(),hb067(),hb068(),hb069(),hb070(),
  hb071(),hb072(),hb073(),hb074(),hb075(),hb076(),hb077(),hb078(),hb079(),hb080(),
  hb081(),hb082(),hb083(),hb084(),hb085(),hb086(),hb087(),hb088(),hb089(),hb090(),
  hb091(),hb092(),hb093(),hb094(),hb095(),hb096(),hb097(),hb098(),hb099(),hb100(),

  // GL series - GLSL shaders
  gl001(),gl002(),gl002b(),gl003(),gl003b(),gl004(),gl005(),gl005b(),gl006(),gl007(),gl008(),gl009(),gl009b(),gl010(),gl011(),gl012(),gl013(),gl013b(),gl014(),gl015(),gl016(),gl017(),gl017b(),gl018(),gl019(),gl019b(),gl020(),gl021(),gl022(),gl023(),gl024(),gl025(),gl025b(),gl025c(),gl025d(),gl025e(),gl025f(),gl025g(),gl025h(),gl025i(),gl025j(),gl025k(),gl025l(),gl026(),gl027(),gl028(),gl029(),gl030(),gl031(),gl031b(),gl031b(),gl031c(),gl031d(),gl031e(),gl031f(),gl031g(),gl032(),gl032b(),gl032c(),gl032d(),gl032e(),gl032f(),gl032g(),gl032h(),gl032i(),gl032j(),gl032k(),gl032l(),gl032m(),gl032n(),gl032o(),gl033(),gl033b(),gl033c(),gl033d(),gl033e(),gl033f(),gl033g(),gl033h(),gl033i(),gl033j(),gl033k(),gl033l(),gl033m(),gl033n(),gl033o(),gl033p(),gl033q(),gl033r(),gl033s(),gl033t(),gl033u(),gl033v(),gl033w(),

  // GLSL series
  glsl001(),glsl002(),glsl003(),glsl003b(),glsl003c(),

  // O series
  o001(),o002(),o003(),o004(),o005(),o006(),o007(),

  // S series
  s000a(),s000b(),s001(),s002(),s003(),s004(),

  // R series
  r001(),r002(),r003(),r004(),

  // TJ series
  tJ001(),tJ002(),tJ003(),tJ004(),tJ005(),tJ006(),tJ007(),tJ008(),tJ009(),tJ010(),
  tJ011(),tJ012(),tJ013(),tJ014(),tJ015(),tJ016(),

  // Uchida series
  uchida001(),uchida002(),uchida003(),uchida004(),uchida005(),uchida006(),uchida008(),
  uchida010(),uchida011(),uchida012(),uchida013(),uchida014(),uchida015(),uchida016(),
  uchida017(),uchida018(),

  // Uchida V4 series
  uchidaV4_001(),uchidaV4_002(),uchidaV4_003(),uchidaV4_004(),uchidaV4_005(),
  uchidaV4_006(),uchidaV4_007(),uchidaV4_008(),uchidaV4_009(),uchidaV4_010(),
  uchidaV4_011(),uchidaV4_012(),uchidaV4_013(),uchidaV4_014(),uchidaV4_015(),
  uchidaV4_016(),uchidaV4_017(),uchidaV4_018()
];

// XXXXXX
window.sourceRenderActions = [
  () => seq001o0(),
  () => seq001o2(),
  () => seq002o2(),
  // () => seq003o0(), // Trop gourmand avec la webcam
  () => seq003o0b(),
  // () => seq003o2(), // Trop gourmand aussi
  () => seq004o1(),
  () => seq004o3(), // Trop gourmand aussi - ca va vs précédents
  () => seq009(),
  () => src(o0).modulate(noise(4)).out(o1),
  () => src(o0).modulate(src(o2), () => Math.sin(time*Math.PI) * 0.5 + 0.5).out(o3),
  () => src(o0).modulate(src(o1), () => rms3 * 0.5 + 0.5).out(o3),
  () => src(o0).diff(src(o2), () => rms1 * 0.5 + 0.5).out(o3),
  () => src(o0).mult(src(o2), () => rms1 * 0.5 + 0.5).out(o3),
  () => src(o1).modulate(noise(4)).out(o1),
  /*() => seqFl001(),
  () => seqFl002(),
  () => seqFl003(),
  () => seqFl004(),
  () => seqFl005()*/
];

// XXXXXX
window.renderActions = [
  () => render(o0),
  () => render(o1),
  () => render(o2),
  () => render(o3),
  () => render(),
  // () => render(solid(0, 0, 0, 0)) -- blocks the image
];

// XXXXXX
window.outputs = [o0, o1, o2, o3];

console.log("HydraDataBase loaded - " + sources.length + " sources available");
