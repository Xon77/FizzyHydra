// F for fractals

window.f001 = () =>
  src(o0)
  	.scale(.75)
  	.add(noise(2,1),.4)
  	.invert()
  	.inversion()
  	.mirrorX2()
    .blend(o0,.3);

window.f002 = () => src(o0)
    .scale(.75)
    .add(noise(10, 1), .4)
    .invert()
    .mirrorWrap()
    .blend(o0,.3);

window.f002b = () => src(o0)
    .scale(.75)
    .add(noise(10, 1), .4)
    .invert()
    .mirrorX()
    .mirrorWrap()
    .inversion()
    .blend(o0,.3);

window.f003 = () => src(o0)
    .scale(.75)
    .add(noise(2, 1), .4)
    .invert()
    .mirrorY2()
    .inversion()
    .blend(o0,.8);

window.f003b = () => src(o0)
    .scale(.75)
    .add(noise(2, 1), .4)
    .inversion()
    .invert()
    .mirrorY2()
    .inversion()
    .blend(o0,.8);

window.f004 = () => src(o0)
    .scale(.75)
    .add(noise(2, 1), .4)
    .invert()
    .mirrorY2()
    .mirrorX()
    .blend(o0,.8);

window.f004b = () => src(o0)
    .scale(.75)
    .add(noise(2, 1), .4)
    .invert()
    .inversion()
    .mirrorY2()
    .mirrorX()
    .blend(o0,.8);

window.f005 = () => src(o0)
    .scale(.8)
    .add(noise(0.2, 2), .7)
    .invert()
    .mirrorY2()
    .mirrorX()
    .mirrorY(0.5, 2)
    .blend(o0,.8);

window.f005b = () => src(o0)
    .scale(.8)
    .add(noise(0.2, 2), .7)
    .invert()
    .mirrorY2()
    .mirrorX().inversion()
    .mirrorY(0.5, 2)
    .blend(o0,.8);

window.f005c = () => src(o0)
    .scale(.8)
    .add(noise(0.2, 2), .7)
    .invert()
    .mirrorY2()
    .mirrorX(0.1, 100)
    .inversion()
    .mirrorY(0.5, 2)
    .blend(o0,.8);


// === SÉRIE FB001-FB020 : ÉVOLUTIONS DIRECTES DES MODÈLES F ===

// fb001 - f001 avec rotation fractale
window.fb001 = () =>
  src(o0)
    .scale(.75)
    .add(noise(2,1),.4)
    .invert()
    .inversion()
    .mirrorX2()
    .rotate(() => time * 0.1)
    .blend(o0,.3);

// fb002 - f001 avec double inversion
window.fb002 = () =>
  src(o0)
    .scale(.75)
    .add(noise(2,1),.4)
    .invert()
    .inversion()
    .mirrorX2()
    .inversion()
    .blend(o0,.4);

// fb003 - f002 avec miroir Y ajouté
window.fb003 = () => src(o0)
    .scale(.75)
    .add(noise(10, 1), .4)
    .invert()
    .mirrorWrap()
    .mirrorY()
    .blend(o0,.3);

// fb004 - f002b avec scale dynamique
window.fb004 = () => src(o0)
    .scale(() => 0.6 + Math.sin(time) * 0.2)
    .add(noise(10, 1), .4)
    .invert()
    .mirrorX()
    .mirrorWrap()
    .inversion()
    .blend(o0,.3);

// fb005 - f003 avec rotation spirale
window.fb005 = () => src(o0)
    .scale(.75)
    .add(noise(2, 1), .4)
    .invert()
    .rotate(() => time * 0.05)
    .mirrorY2()
    .inversion()
    .blend(o0,.8);

// fb006 - f003b avec modulation
window.fb006 = () => src(o0)
    .scale(.75)
    .add(noise(2, 1), .4)
    .inversion()
    .invert()
    .modulate(noise(1, 0.5), 0.1)
    .mirrorY2()
    .inversion()
    .blend(o0,.8);

// fb007 - f004 avec double miroir X
window.fb007 = () => src(o0)
    .scale(.75)
    .add(noise(2, 1), .4)
    .invert()
    .mirrorY2()
    .mirrorX()
    .mirrorX2()
    .blend(o0,.8);

// fb008 - f004b avec kaleidoscope
window.fb008 = () => src(o0)
    .scale(.75)
    .add(noise(2, 1), .4)
    .invert()
    .inversion()
    .mirrorY2()
    .mirrorX()
    .kaleid(4)
    .blend(o0,.8);

// fb009 - f005 avec bruit haute fréquence
window.fb009 = () => src(o0)
    .scale(.8)
    .add(noise(20, 1), .3)
    .add(noise(0.2, 2), .7)
    .invert()
    .mirrorY2()
    .mirrorX()
    .mirrorY(0.5, 2)
    .blend(o0,.8);

// fb010 - f005b avec colorama
window.fb010 = () => src(o0)
    .scale(.8)
    .add(noise(0.2, 2), .7)
    .invert()
    .mirrorY2()
    .mirrorX().inversion()
    .mirrorY(0.5, 2)
    .colorama(0.5)
    .blend(o0,.8);

// === SÉRIE FB011-FB030 : FRACTALES ORGANIQUES COMPLEXES ===

// fb011 - Mandelbrot organique
window.fb011 = () => src(o0)
    .scale(() => 0.9 + Math.sin(time * 0.3) * 0.1)
    .add(noise(5, () => 1 + Math.cos(time) * 0.5), .5)
    .invert()
    .inversion()
    .mirrorX2()
    .mirrorY()
    .rotate(() => time * 0.02)
    .blend(o0, () => 0.2 + Math.sin(time * 0.7) * 0.1);

// fb012 - Julia set variation
window.fb012 = () => src(o0)
    .scale(.85)
    .add(noise(3, 2), .6)
    .add(noise(15, 0.5), .2)
    .invert()
    .mirrorWrap()
    .inversion()
    .mirrorX()
    .pixelate(64, 64)
    .blend(o0,.4);

// fb013 - Sierpinski triangle
window.fb013 = () => src(o0)
    .scale(.9)
    .add(noise(1, 3), .3)
    .invert()
    .mirrorY2()
    .mirrorX2()
    .mirrorY()
    .inversion()
    .kaleid(3)
    .blend(o0,.7);

// fb014 - Dragon curve organique
window.fb014 = () => src(o0)
    .scale(() => 0.8 + Math.sin(time * 0.5) * 0.15)
    .add(noise(8, 1), .4)
    .add(noise(0.5, 4), .3)
    .invert()
    .rotate(() => time * 0.03)
    .mirrorX()
    .inversion()
    .mirrorY2()
    .modulate(noise(2, 0.5), 0.05)
    .blend(o0,.6);

// fb015 - Koch snowflake
window.fb015 = () => src(o0)
    .scale(.95)
    .add(noise(4, 2), .5)
    .invert()
    .kaleid(6)
    .inversion()
    .mirrorX2()
    .mirrorY()
    .rotate(() => time * 0.01)
    .blend(o0,.8);

// fb016 - Barnsley fern
window.fb016 = () => src(o0)
    .scale(.85)
    .add(noise(12, 0.8), .4)
    .add(noise(0.3, 5), .2)
    .invert()
    .mirrorY()
    .inversion()
    .mirrorX2()
    .modulate(noise(1, 1), () => 0.05 + Math.sin(time) * 0.02)
    .blend(o0,.5);

// fb017 - Cantor dust
window.fb017 = () => src(o0)
    .scale(.9)
    .add(noise(20, 0.5), .3)
    .add(noise(1, 2), .4)
    .invert()
    .mirrorX()
    .mirrorY()
    .inversion()
    .pixelate(() => 32 + Math.sin(time * 2) * 16, () => 32 + Math.cos(time * 2) * 16)
    .blend(o0,.6);

// fb018 - Menger sponge 2D
window.fb018 = () => src(o0)
    .scale(.88)
    .add(noise(6, 1.5), .45)
    .invert()
    .mirrorX2()
    .mirrorY2()
    .inversion()
    .kaleid(8)
    .rotate(() => time * 0.02)
    .blend(o0,.7);

// fb019 - Apollonian gasket
window.fb019 = () => src(o0)
    .scale(() => 0.75 + Math.sin(time * 0.8) * 0.2)
    .add(noise(15, 0.7), .3)
    .add(noise(2, 3), .4)
    .invert()
    .inversion()
    .mirrorWrap()
    .mirrorX()
    .mirrorY()
    .modulate(noise(3, 0.3), 0.08)
    .blend(o0,.4);

// fb020 - Lorenz attractor projection
window.fb020 = () => src(o0)
    .scale(.82)
    .add(noise(() => 5 + Math.sin(time) * 3, 1), .5)
    .invert()
    .rotate(() => time * 0.05)
    .mirrorX2()
    .inversion()
    .mirrorY()
    .colorama(() => Math.sin(time * 0.3))
        .blend(o0,.6);

// === SÉRIE FB021-FB040 : PATTERNS BIOLOGIQUES FRACTALS ===

// fb021 - Mycelium network
window.fb021 = () => src(o0)
    .scale(.9)
    .add(noise(0.5, 8), .2)
    .add(noise(25, 0.3), .3)
    .add(noise(3, 2), .4)
    .invert()
    .mirrorY2()
    .inversion()
    .modulate(noise(1, 2), () => 0.1 + Math.sin(time * 0.5) * 0.05)
    .blend(o0,.7);

// fb022 - Neural dendrites
window.fb022 = () => src(o0)
    .scale(() => 0.85 + Math.cos(time * 0.4) * 0.1)
    .add(noise(18, 0.6), .25)
    .add(noise(1.5, 4), .35)
    .invert()
    .mirrorX()
    .inversion()
    .mirrorWrap()
    .rotate(() => time * 0.01)
    .blend(o0,.5);

// fb023 - Coral growth
window.fb023 = () => src(o0)
    .scale(.87)
    .add(noise(8, 1.2), .4)
    .add(noise(0.8, 6), .3)
    .invert()
    .kaleid(() => 4 + Math.sin(time * 0.6) * 2)
    .inversion()
    .mirrorY()
    .modulate(noise(2, 1), 0.06)
    .blend(o0,.6);

// fb024 - Tree branching
window.fb024 = () => src(o0)
    .scale(.92)
    .add(noise(12, 0.8), .35)
    .add(noise(0.4, 10), .25)
    .invert()
    .mirrorY2()
    .mirrorX2()
    .inversion()
    .rotate(() => time * 0.008)
    .blend(o0,.8);

// fb025 - Lung alveoli
window.fb025 = () => src(o0)
    .scale(() => 0.8 + Math.sin(time * 1.2) * 0.15)
    .add(noise(30, 0.4), .2)
    .add(noise(2, 5), .4)
    .invert()
    .inversion()
    .mirrorWrap()
    .kaleid(12)
    .modulate(noise(0.5, 3), 0.04)
    .blend(o0,.4);

// fb026 - Blood vessels
window.fb026 = () => src(o0)
    .scale(.86)
    .add(noise(15, 0.9), .3)
    .add(noise(0.7, 8), .35)
    .invert()
    .mirrorX()
    .mirrorY()
    .inversion()
    .rotate(() => time * 0.03)
    .colorama(0.8)
    .blend(o0,.55);

// fb027 - Bacterial colonies
window.fb027 = () => src(o0)
    .scale(.9)
    .add(noise(50, 0.2), .15)
    .add(noise(5, 2), .45)
    .invert()
    .pixelate(() => 16 + Math.sin(time * 3) * 8, () => 16 + Math.cos(time * 3) * 8)
    .inversion()
    .mirrorX2()
    .mirrorY2()
    .blend(o0,.65);

// fb028 - Leaf venation
window.fb028 = () => src(o0)
    .scale(.88)
    .add(noise(0.3, 12), .25)
    .add(noise(20, 0.6), .3)
    .invert()
    .mirrorY()
    .inversion()
    .modulate(noise(3, 0.8), () => 0.08 + Math.sin(time * 0.7) * 0.03)
    .rotate(() => time * 0.005)
    .blend(o0,.7);

// fb029 - Cell division
window.fb029 = () => src(o0)
    .scale(() => 0.75 + Math.sin(time * 2) * 0.2)
    .add(noise(7, 1.5), .4)
    .invert()
    .mirrorX2()
    .inversion()
    .mirrorY2()
    .kaleid(2)
    .modulate(noise(1, 4), 0.12)
    .blend(o0,.45);

// fb030 - DNA helix projection
window.fb030 = () => src(o0)
    .scale(.83)
    .add(noise(4, 3), .4)
    .add(noise(25, 0.4), .2)
    .invert()
    .rotate(() => time * 0.1)
    .mirrorWrap()
    .inversion()
    .mirrorX()
    .colorama(() => Math.cos(time * 0.4))
    .blend(o0,.6);

// === SÉRIE FB031-FB050 : GÉOMÉTRIES SACRÉES FRACTALES ===

// fb031 - Flower of life
window.fb031 = () => src(o0)
    .scale(.9)
    .add(noise(3, 2), .4)
    .invert()
    .kaleid(6)
    .inversion()
    .mirrorX()
    .mirrorY()
    .rotate(() => time * 0.02)
    .modulate(noise(1, 1), 0.05)
    .blend(o0,.75);

// fb032 - Metatron's cube
window.fb032 = () => src(o0)
    .scale(.85)
    .add(noise(8, 1), .35)
    .add(noise(0.5, 6), .25)
    .invert()
    .kaleid(13)
    .inversion()
    .mirrorX2()
    .mirrorY2()
    .rotate(() => time * 0.008)
    .blend(o0,.8);

// fb033 - Sri Yantra
window.fb033 = () => src(o0)
    .scale(() => 0.88 + Math.sin(time * 0.6) * 0.1)
    .add(noise(12, 0.8), .3)
    .invert()
    .kaleid(9)
    .inversion()
    .mirrorWrap()
    .rotate(() => time * 0.015)
    .colorama(0.3)
    .blend(o0,.7);

// fb034 - Torus knot
window.fb034 = () => src(o0)
    .scale(.87)
    .add(noise(6, 1.5), .4)
    .add(noise(20, 0.5), .2)
    .invert()
    .rotate(() => time * 0.05)
    .inversion()
    .mirrorX()
    .mirrorY()
    .modulate(noise(2, 2), () => 0.1 + Math.cos(time) * 0.04)
    .blend(o0,.6);

// fb035 - Platonic solids shadow
window.fb035 = () => src(o0)
    .scale(.9)
    .add(noise(4, 2.5), .45)
    .invert()
    .kaleid(5)
    .inversion()
    .mirrorX2()
    .rotate(() => time * 0.03)
    .pixelate(128, 128)
    .blend(o0,.65);

// fb036 - Golden spiral
window.fb036 = () => src(o0)
    .scale(() => 0.82 + Math.sin(time * 0.618) * 0.15)
    .add(noise(10, 1), .35)
    .invert()
    .rotate(() => time * 0.1)
    .inversion()
    .mirrorY2()
    .modulate(noise(1.618, 1), 0.08)
    .blend(o0,.55);

// fb037 - Vesica piscis
window.fb037 = () => src(o0)
    .scale(.86)
    .add(noise(7, 1.2), .4)
    .invert()
    .mirrorX()
    .mirrorY()
    .inversion()
    .kaleid(2)
    .rotate(() => time * 0.02)
    .colorama(() => Math.sin(time * 0.2))
    .blend(o0,.7);

// fb038 - Seed of life
window.fb038 = () => src(o0)
    .scale(.9)
    .add(noise(5, 2), .4)
    .add(noise(15, 0.7), .2)
    .invert()
    .kaleid(7)
    .inversion()
    .mirrorWrap()
    .modulate(noise(0.7, 3), 0.06)
    .blend(o0,.8);

// fb039 - Tree of life
window.fb039 = () => src(o0)
    .scale(.88)
    .add(noise(0.8, 5), .3)
    .add(noise(18, 0.6), .25)
    .invert()
    .mirrorY2()
    .inversion()
    .mirrorX()
    .rotate(() => time * 0.01)
    .modulate(noise(3, 1), 0.07)
    .blend(o0,.6);

// fb040 - Chakra mandala
window.fb040 = () => src(o0)
    .scale(() => 0.85 + Math.cos(time * 0.5) * 0.12)
    .add(noise(9, 1.3), .35)
    .invert()
    .kaleid(8)
    .inversion()
    .mirrorX2()
    .mirrorY2()
    .colorama(() => Math.sin(time * 0.7) * 0.5)
    .blend(o0,.75);

// === SÉRIE FB041-FB060 : COSMOS ET GALAXIES FRACTALES ===

// fb041 - Spiral galaxy
window.fb041 = () => src(o0)
    .scale(.9)
    .add(noise(0.2, 10), .2)
    .add(noise(15, 0.8), .3)
    .invert()
    .rotate(() => time * 0.02)
    .inversion()
    .mirrorWrap()
    .modulate(noise(1, 3), () => 0.15 + Math.sin(time * 0.3) * 0.05)
    .blend(o0,.4);

// fb042 - Nebula formation
window.fb042 = () => src(o0)
    .scale(() => 0.8 + Math.sin(time * 0.8) * 0.18)
    .add(noise(25, 0.4), .15)
    .add(noise(3, 4), .4)
    .invert()
    .inversion()
    .mirrorX()
    .mirrorY()
    .colorama(0.6)
    .modulate(noise(0.5, 8), 0.1)
    .blend(o0,.5);

// fb043 - Black hole accretion
window.fb043 = () => src(o0)
    .scale(.85)
    .add(noise(40, 0.3), .1)
    .add(noise(2, 6), .45)
    .invert()
    .rotate(() => time * 0.08)
    .inversion()
    .mirrorX2()
    .kaleid(12)
    .modulate(noise(4, 0.5), 0.12)
    .blend(o0,.35);

// fb044 - Solar flares
window.fb044 = () => src(o0)
    .scale(.87)
    .add(noise(12, 1), .35)
    .add(noise(0.6, 12), .25)
    .invert()
    .mirrorY2()
    .inversion()
    .rotate(() => time * 0.04)
    .modulate(noise(8, 0.8), () => 0.08 + Math.cos(time * 2) * 0.04)
    .blend(o0,.6);

// fb045 - Cosmic web
window.fb045 = () => src(o0)
    .scale(.92)
    .add(noise(0.1, 20), .15)
    .add(noise(30, 0.2), .2)
    .add(noise(5, 2), .35)
    .invert()
    .inversion()
    .mirrorWrap()
    .mirrorX()
    .mirrorY()
    .modulate(noise(1.5, 4), 0.06)
    .blend(o0,.7);

// fb046 - Pulsar radiation
window.fb046 = () => src(o0)
    .scale(() => 0.75 + Math.sin(time * 5) * 0.2)
    .add(noise(20, 0.6), .25)
    .add(noise(1, 8), .35)
    .invert()
    .kaleid(() => 6 + Math.sin(time) * 3)
    .inversion()
    .rotate(() => time * 0.15)
    .blend(o0,.45);

// fb047 - Galaxy collision
window.fb047 = () => src(o0)
    .scale(.88)
    .add(noise(6, 1.5), .4)
    .add(noise(0.3, 15), .2)
    .invert()
    .mirrorX()
    .mirrorY()
    .inversion()
    .rotate(() => time * 0.025)
    .modulate(noise(2.5, 1.5), () => 0.2 + Math.sin(time * 0.6) * 0.1)
    .blend(o0,.55);

// fb048 - Stellar nursery
window.fb048 = () => src(o0)
    .scale(.9)
    .add(noise(18, 0.7), .3)
    .add(noise(0.8, 10), .25)
    .invert()
    .inversion()
    .mirrorX2()
    .mirrorY2()
    .colorama(() => Math.cos(time * 0.4))
    .modulate(noise(3.5, 2), 0.09)
    .blend(o0,.65);

// fb049 - Wormhole
window.fb049 = () => src(o0)
    .scale(() => 0.7 + Math.sin(time * 1.5) * 0.25)
    .add(noise(50, 0.2), .1)
    .add(noise(4, 3), .4)
    .invert()
    .rotate(() => time * 0.1)
    .inversion()
    .kaleid(16)
    .modulate(noise(1, 6), 0.15)
    .blend(o0,.3);

// fb050 - Quantum foam
window.fb050 = () => src(o0)
    .scale(.85)
    .add(noise(100, 0.1), .05)
    .add(noise(8, 1.5), .4)
    .add(noise(0.4, 12), .2)
    .invert()
    .pixelate(() => 64 + Math.sin(time * 4) * 32, () => 64 + Math.cos(time * 4) * 32)
    .inversion()
    .mirrorWrap()
    .blend(o0,.6);

// === SÉRIE FB051-FB070 : CRISTAUX ET MINÉRAUX FRACTALS ===

// fb051 - Quartz crystal
window.fb051 = () => src(o0)
    .scale(.9)
    .add(noise(6, 2), .4)
    .invert()
    .kaleid(6)
    .inversion()
    .mirrorX()
    .mirrorY()
    .rotate(() => time * 0.01)
    .modulate(noise(2, 1), 0.05)
    .colorama(0.2)
    .blend(o0,.8);

// fb052 - Amethyst geode
window.fb052 = () => src(o0)
    .scale(() => 0.85 + Math.sin(time * 0.7) * 0.12)
    .add(noise(15, 0.8), .3)
    .add(noise(1.5, 5), .25)
    .invert()
    .inversion()
    .kaleid(8)
    .mirrorX2()
    .colorama(() => 0.7 + Math.cos(time * 0.3) * 0.2)
    .blend(o0,.7);

// fb053 - Salt crystal
window.fb053 = () => src(o0)
    .scale(.88)
    .add(noise(30, 0.5), .2)
    .add(noise(3, 3), .35)
    .invert()
    .mirrorX()
    .mirrorY()
    .inversion()
    .pixelate(32, 32)
    .kaleid(4)
    .blend(o0,.75);

// fb054 - Diamond lattice
window.fb054 = () => src(o0)
    .scale(.92)
    .add(noise(12, 1), .35)
    .add(noise(0.7, 8), .25)
    .invert()
    .kaleid(12)
    .inversion()
    .mirrorWrap()
    .rotate(() => time * 0.03)
    .modulate(noise(4, 0.6), 0.08)
    .blend(o0,.8);

// fb055 - Snowflake formation
window.fb055 = () => src(o0)
    .scale(() => 0.8 + Math.sin(time * 0.5) * 0.15)
    .add(noise(8, 1.5), .4)
    .invert()
    .kaleid(6)
    .inversion()
    .mirrorX2()
    .mirrorY2()
    .rotate(() => time * 0.005)
    .blend(o0,.85);

// fb056 - Bismuth crystal
window.fb056 = () => src(o0)
    .scale(.87)
    .add(noise(20, 0.7), .25)
    .add(noise(2, 4), .35)
    .invert()
    .mirrorX()
    .inversion()
    .kaleid(4)
    .colorama(() => Math.sin(time * 1.2) * 0.8)
    .modulate(noise(1, 2), 0.1)
    .blend(o0,.6);

// fb057 - Fluorite octahedron
window.fb057 = () => src(o0)
    .scale(.9)
    .add(noise(9, 1.2), .35)
    .invert()
    .kaleid(8)
    .inversion()
    .mirrorY2()
    .rotate(() => time * 0.02)
    .colorama(0.4)
    .modulate(noise(3, 1.5), 0.06)
    .blend(o0,.75);

// fb058 - Pyrite cube
window.fb058 = () => src(o0)
    .scale(.85)
    .add(noise(25, 0.6), .2)
    .add(noise(1.2, 6), .3)
    .invert()
    .mirrorX()
    .mirrorY()
    .inversion()
    .pixelate(16, 16)
    .kaleid(4)
    .colorama(0.1)
    .blend(o0,.8);

// fb059 - Opal fire
window.fb059 = () => src(o0)
    .scale(() => 0.8 + Math.cos(time * 1.3) * 0.18)
    .add(noise(40, 0.4), .15)
    .add(noise(4, 2.5), .4)
    .invert()
    .inversion()
    .mirrorWrap()
    .rotate(() => time * 0.08)
    .colorama(() => Math.sin(time * 2) * 0.9)
    .modulate(noise(0.5, 10), 0.12)
    .blend(o0,.5);

// fb060 - Tourmaline rod
window.fb060 = () => src(o0)
    .scale(.9)
    .add(noise(0.5, 12), .25)
    .add(noise(16, 0.8), .3)
    .invert()
    .mirrorY2()
    .inversion()
    .mirrorX()
    .rotate(() => time * 0.015)
    .colorama(0.6)
    .blend(o0,.75);

// === SÉRIE FB061-FB080 : OCÉANS ET VAGUES FRACTALES ===

// fb061 - Tsunami fractal
window.fb061 = () => src(o0)
    .scale(() => 0.7 + Math.sin(time * 2) * 0.25)
    .add(noise(0.2, 15), .2)
    .add(noise(8, 1.5), .35)
    .invert()
    .mirrorY()
    .inversion()
    .rotate(() => time * 0.1)
    .modulate(noise(1.5, 4), () => 0.15 + Math.cos(time) * 0.08)
    .blend(o0,.4);

// fb062 - Whirlpool vortex
window.fb062 = () => src(o0)
    .scale(.85)
    .add(noise(12, 1), .35)
    .add(noise(0.3, 20), .15)
    .invert()
    .rotate(() => time * 0.15)
    .inversion()
    .kaleid(() => 8 + Math.sin(time * 0.8) * 4)
    .modulate(noise(3, 2), 0.2)
    .blend(o0,.3);

// fb063 - Coral reef ecosystem
window.fb063 = () => src(o0)
    .scale(.9)
    .add(noise(18, 0.7), .3)
    .add(noise(1.8, 8), .25)
    .add(noise(45, 0.3), .1)
    .invert()
    .inversion()
    .mirrorX()
    .mirrorY()
    .colorama(0.5)
    .modulate(noise(2.5, 3), 0.08)
    .blend(o0,.65);

// fb064 - Deep sea trench
window.fb064 = () => src(o0)
    .scale(.88)
    .add(noise(0.1, 30), .1)
    .add(noise(6, 2), .4)
    .invert()
    .mirrorY2()
    .inversion()
    .rotate(() => time * 0.02)
    .colorama(() => 0.8 + Math.sin(time * 0.4) * 0.15)
    .modulate(noise(1, 6), 0.12)
    .blend(o0,.6);

// fb065 - Tidal pools
window.fb065 = () => src(o0)
    .scale(() => 0.82 + Math.sin(time * 1.5) * 0.15)
    .add(noise(24, 0.6), .25)
    .add(noise(2.5, 5), .35)
    .invert()
    .pixelate(() => 24 + Math.cos(time * 3) * 12, () => 24 + Math.sin(time * 3) * 12)
    .inversion()
    .mirrorWrap()
    .blend(o0,.7);

// fb066 - Kelp forest
window.fb066 = () => src(o0)
    .scale(.9)
    .add(noise(0.8, 10), .25)
    .add(noise(15, 0.8), .3)
    .invert()
    .mirrorY()
    .inversion()
    .modulate(noise(4, 1), () => 0.1 + Math.sin(time * 0.7) * 0.05)
    .rotate(() => time * 0.005)
    .colorama(0.3)
    .blend(o0,.75);

// fb067 - Bioluminescent plankton
window.fb067 = () => src(o0)
    .scale(.85)
    .add(noise(60, 0.2), .1)
    .add(noise(5, 3), .4)
    .invert()
    .pixelate(() => 8 + Math.sin(time * 6) * 4, () => 8 + Math.cos(time * 6) * 4)
    .inversion()
    .mirrorX()
    .mirrorY()
    .colorama(() => 0.6 + Math.cos(time * 2) * 0.3)
    .blend(o0,.5);

// fb068 - Hydrothermal vents
window.fb068 = () => src(o0)
    .scale(() => 0.8 + Math.cos(time * 3) * 0.18)
    .add(noise(35, 0.4), .15)
    .add(noise(3, 4), .4)
    .invert()
    .mirrorY2()
    .inversion()
    .rotate(() => time * 0.08)
    .modulate(noise(1.5, 8), 0.15)
    .colorama(0.1)
    .blend(o0,.45);

// fb069 - Abyssal plains
window.fb069 = () => src(o0)
    .scale(.92)
    .add(noise(0.05, 50), .05)
    .add(noise(10, 1.2), .35)
    .add(noise(80, 0.1), .05)
    .invert()
    .inversion()
    .mirrorWrap()
    .modulate(noise(0.3, 15), 0.08)
    .colorama(0.9)
    .blend(o0,.8);

// fb070 - Rogue waves
window.fb070 = () => src(o0)
    .scale(() => 0.6 + Math.sin(time * 4) * 0.35)
    .add(noise(7, 1.8), .4)
    .add(noise(0.4, 12), .2)
    .invert()
    .mirrorY()
    .inversion()
    .rotate(() => time * 0.12)
    .modulate(noise(2, 6), () => 0.25 + Math.cos(time * 1.5) * 0.15)
    .blend(o0,.35);

// === SÉRIE FB071-FB090 : FEUX ET EXPLOSIONS FRACTALES ===

// fb071 - Supernova explosion
window.fb071 = () => src(o0)
    .scale(() => 0.5 + Math.sin(time * 2.5) * 0.4)
    .add(noise(25, 0.6), .2)
    .add(noise(2, 8), .4)
    .invert()
    .kaleid(() => 16 + Math.sin(time) * 8)
    .inversion()
    .rotate(() => time * 0.2)
    .modulate(noise(4, 3), 0.3)
    .colorama(() => Math.sin(time * 3) * 0.5)
    .blend(o0,.2);

// fb072 - Dragon's breath
window.fb072 = () => src(o0)
    .scale(.8)
    .add(noise(15, 1), .35)
    .add(noise(0.7, 15), .2)
    .invert()
    .mirrorY2()
    .inversion()
    .rotate(() => time * 0.05)
    .modulate(noise(8, 1), () => 0.2 + Math.sin(time * 1.8) * 0.1)
    .colorama(0.1)
    .blend(o0,.5);

// fb073 - Forest fire spread
window.fb073 = () => src(o0)
    .scale(.87)
    .add(noise(12, 1.2), .35)
    .add(noise(0.5, 18), .15)
    .add(noise(40, 0.3), .1)
    .invert()
    .inversion()
    .mirrorX()
    .modulate(noise(3, 4), () => 0.15 + Math.cos(time * 2.2) * 0.08)
    .rotate(() => time * 0.03)
    .blend(o0,.6);

// fb074 - Lightning storm
window.fb074 = () => src(o0)
    .scale(() => 0.9 + Math.sin(time * 8) * 0.08)
    .add(noise(50, 0.3), .1)
    .add(noise(4, 4), .4)
    .invert()
    .pixelate(() => 128 + Math.sin(time * 12) * 64, () => 128 + Math.cos(time * 12) * 64)
    .inversion()
    .mirrorY()
    .colorama(() => 0.3 + Math.sin(time * 5) * 0.4)
    .blend(o0,.4);

// fb075 - Volcanic lava flow
window.fb075 = () => src(o0)
    .scale(.85)
    .add(noise(8, 1.5), .35)
    .add(noise(0.3, 25), .15)
    .invert()
    .mirrorY()
    .inversion()
    .rotate(() => time * 0.02)
    .modulate(noise(2, 8), () => 0.12 + Math.sin(time * 1.3) * 0.06)
    .colorama(0.05)
    .blend(o0,.65);

// fb076 - Phoenix rebirth
window.fb076 = () => src(o0)
    .scale(() => 0.7 + Math.cos(time * 1.8) * 0.25)
    .add(noise(18, 0.8), .3)
    .add(noise(1.2, 12), .25)
    .invert()
    .kaleid(5)
    .inversion()
    .mirrorX2()
    .mirrorY2()
    .rotate(() => time * 0.08)
    .colorama(() => 0.2 + Math.cos(time * 0.9) * 0.3)
    .blend(o0,.5);

// fb077 - Solar prominence
window.fb077 = () => src(o0)
    .scale(.88)
    .add(noise(22, 0.7), .25)
    .add(noise(1.5, 10), .25)
    .invert()
    .mirrorY2()
    .inversion()
    .modulate(noise(6, 1.5), () => 0.18 + Math.sin(time * 2.5) * 0.1)
    .rotate(() => time * 0.04)
    .colorama(0.15)
    .blend(o0,.6);

// fb078 - Plasma discharge
window.fb078 = () => src(o0)
    .scale(() => 0.75 + Math.sin(time * 6) * 0.2)
    .add(noise(35, 0.5), .2)
    .add(noise(3, 6), .4)
    .invert()
    .pixelate(() => 32 + Math.cos(time * 10) * 16, () => 32 + Math.sin(time * 10) * 16)
    .inversion()
    .kaleid(8)
    .colorama(() => 0.7 + Math.sin(time * 4) * 0.2)
    .blend(o0,.4);

// fb079 - Meteor shower
window.fb079 = () => src(o0)
    .scale(.9)
    .add(noise(60, 0.2), .1)
    .add(noise(5, 3), .35)
    .add(noise(0.8, 20), .15)
    .invert()
    .inversion()
    .mirrorWrap()
    .rotate(() => time * 0.15)
    .modulate(noise(1, 12), 0.2)
    .colorama(0.4)
    .blend(o0,.45);

// fb080 - Stellar fusion
window.fb080 = () => src(o0)
    .scale(() => 0.8 + Math.cos(time * 3.2) * 0.15)
    .add(noise(28, 0.6), .2)
    .add(noise(2.2, 8), .35)
    .invert()
    .kaleid(() => 12 + Math.sin(time * 1.5) * 6)
    .inversion()
    .rotate(() => time * 0.1)
    .modulate(noise(4.5, 2), () => 0.2 + Math.cos(time * 2.8) * 0.12)
    .blend(o0,.5);

// === SÉRIE FB081-FB100 : DIMENSIONS PARALLÈLES ET MULTIVERS ===

// fb081 - Parallel universe bleed
window.fb081 = () => src(o0)
    .scale(() => 0.85 + Math.sin(time * 0.8) * 0.12)
    .add(noise(16, 0.9), .3)
    .add(noise(0.9, 14), .25)
    .invert()
    .inversion()
    .mirrorWrap()
    .modulate(noise(3.5, 3), () => 0.15 + Math.sin(time * 0.6) * 0.08)
    .colorama(() => 0.5 + Math.cos(time * 0.4) * 0.4)
    .blend(o0,.6);

// fb082 - Quantum entanglement
window.fb082 = () => src(o0)
    .scale(.9)
    .add(noise(45, 0.4), .15)
    .add(noise(4, 4), .4)
    .invert()
    .pixelate(() => 64 + Math.sin(time * 7) * 32, () => 64 + Math.cos(time * 7) * 32)
    .inversion()
    .kaleid(2)
    .mirrorX()
    .mirrorY()
    .modulate(noise(1.5, 8), 0.18)
    .blend(o0,.5);

// fb083 - Time dilation field
window.fb083 = () => src(o0)
    .scale(() => 0.7 + Math.sin(time * 0.3) * 0.25)
    .add(noise(11, 1.3), .35)
    .add(noise(0.4, 18), .2)
    .invert()
    .rotate(() => time * 0.002)
    .inversion()
    .mirrorX2()
    .mirrorY2()
    .modulate(noise(2.8, 4), () => 0.1 + Math.cos(time * 0.2) * 0.05)
    .colorama(0.8)
    .blend(o0,.75);

// fb084 - Tesseract shadow
window.fb084 = () => src(o0)
    .scale(.88)
    .add(noise(7, 2), .4)
    .add(noise(30, 0.5), .15)
    .invert()
    .kaleid(4)
    .inversion()
    .mirrorX()
    .mirrorY()
    .rotate(() => time * 0.05)
    .modulate(noise(5, 1.5), 0.12)
    .blend(o0,.7);

// fb085 - Hyperdimensional gate
window.fb085 = () => src(o0)
    .scale(() => 0.6 + Math.sin(time * 2.3) * 0.35)
    .add(noise(20, 0.8), .25)
    .add(noise(1.3, 15), .2)
    .invert()
    .kaleid(() => 16 + Math.cos(time * 1.2) * 8)
    .inversion()
    .rotate(() => time * 0.12)
    .modulate(noise(0.8, 12), 0.25)
    .colorama(() => Math.sin(time * 1.8) * 0.6)
    .blend(o0,.3);

// fb086 - Multiverse membrane
window.fb086 = () => src(o0)
    .scale(.92)
    .add(noise(0.6, 25), .15)
    .add(noise(38, 0.4), .15)
    .add(noise(6, 2.5), .35)
    .invert()
    .inversion()
    .mirrorWrap()
    .modulate(noise(2.3, 6), () => 0.08 + Math.sin(time * 0.9) * 0.04)
    .colorama(0.6)
    .blend(o0,.8);

// fb087 - Reality fracture
window.fb087 = () => src(o0)
    .scale(() => 0.8 + Math.cos(time * 4.5) * 0.18)
    .add(noise(14, 1.1), .3)
    .add(noise(0.7, 20), .15)
    .invert()
    .pixelate(() => 16 + Math.sin(time * 8) * 8, () => 16 + Math.cos(time * 8) * 8)
    .inversion()
    .mirrorX2()
    .mirrorY()
    .rotate(() => time * 0.18)
    .modulate(noise(4.2, 3), 0.22)
    .blend(o0,.4);

// fb088 - Dimensional fold
window.fb088 = () => src(o0)
    .scale(.86)
    .add(noise(9, 1.6), .35)
    .add(noise(42, 0.3), .12)
    .invert()
    .mirrorY2()
    .inversion()
    .kaleid(7)
    .modulate(noise(1.8, 10), () => 0.14 + Math.cos(time * 1.6) * 0.08)
    .rotate(() => time * 0.025)
    .colorama(0.4)
    .blend(o0,.65);

// fb089 - Void between worlds
window.fb089 = () => src(o0)
    .scale(() => 0.75 + Math.sin(time * 0.5) * 0.2)
    .add(noise(0.08, 40), .08)
    .add(noise(25, 0.6), .2)
    .add(noise(3.5, 5), .35)
    .invert()
    .inversion()
    .mirrorX()
    .mirrorY()
    .modulate(noise(0.4, 20), 0.12)
    .colorama(0.9)
    .rotate(() => time * 0.008)
    .blend(o0,.85);

// fb090 - Infinite recursion
window.fb090 = () => src(o0)
    .scale(() => 0.9 + Math.sin(time * 1.4) * 0.08)
    .add(noise(17, 0.9), .3)
    .add(noise(1.1, 16), .22)
    .invert()
    .kaleid(() => 9 + Math.cos(time * 0.7) * 4)
    .inversion()
    .mirrorWrap()
    .rotate(() => time * 0.03)
    .modulate(noise(2.7, 7), () => 0.1 + Math.sin(time * 1.1) * 0.06)
    .blend(o0,.7);

// fb091 - Consciousness stream
window.fb091 = () => src(o0)
    .scale(.87)
    .add(noise(33, 0.5), .18)
    .add(noise(2.4, 8), .32)
    .add(noise(0.15, 35), .1)
    .invert()
    .inversion()
    .mirrorY()
    .modulate(noise(3.8, 4), () => 0.16 + Math.cos(time * 0.8) * 0.1)
    .colorama(() => 0.3 + Math.sin(time * 0.6) * 0.4)
    .blend(o0,.6);

// fb092 - Dream logic cascade
window.fb092 = () => src(o0)
    .scale(() => 0.82 + Math.cos(time * 2.7) * 0.15)
    .add(noise(19, 0.8), .28)
    .add(noise(0.8, 22), .18)
    .invert()
    .mirrorX2()
    .inversion()
    .kaleid(6)
    .rotate(() => time * 0.07)
    .modulate(noise(1.6, 12), 0.19)
    .colorama(0.5)
    .blend(o0,.55);

// fb093 - Psychic emanation
window.fb093 = () => src(o0)
    .scale(.9)
    .add(noise(8, 1.8), .35)
    .add(noise(48, 0.25), .12)
    .add(noise(1.7, 11), .23)
    .invert()
    .pixelate(() => 48 + Math.sin(time * 5.5) * 24, () => 48 + Math.cos(time * 5.5) * 24)
    .inversion()
    .mirrorWrap()
    .modulate(noise(4.7, 2.5), 0.15)
    .blend(o0,.65);

// fb094 - Akashic records
window.fb094 = () => src(o0)
    .scale(() => 0.85 + Math.sin(time * 0.4) * 0.12)
    .add(noise(0.05, 80), .05)
    .add(noise(26, 0.7), .25)
    .add(noise(4.3, 4), .35)
    .invert()
    .inversion()
    .mirrorX()
    .mirrorY()
    .rotate(() => time * 0.01)
    .modulate(noise(2.1, 8), () => 0.08 + Math.cos(time * 0.5) * 0.04)
    .colorama(0.7)
    .blend(o0,.8);

// fb095 - Morphic resonance
window.fb095 = () => src(o0)
    .scale(.88)
    .add(noise(13, 1.2), .32)
    .add(noise(0.6, 28), .16)
    .invert()
    .kaleid(() => 11 + Math.sin(time * 1.3) * 5)
    .inversion()
    .mirrorY2()
    .modulate(noise(3.4, 6), () => 0.13 + Math.sin(time * 0.9) * 0.08)
    .rotate(() => time * 0.04)
    .blend(o0,.7);

// fb096 - Collective unconscious
window.fb096 = () => src(o0)
    .scale(() => 0.8 + Math.cos(time * 1.9) * 0.17)
    .add(noise(37, 0.45), .15)
    .add(noise(5.1, 3.2), .34)
    .add(noise(0.3, 45), .08)
    .invert()
    .inversion()
    .mirrorWrap()
    .modulate(noise(1.3, 14), 0.17)
    .colorama(() => 0.6 + Math.sin(time * 0.3) * 0.3)
    .blend(o0,.75);

// fb097 - Archetypal forms
window.fb097 = () => src(o0)
    .scale(.91)
    .add(noise(10, 1.5), .33)
    .add(noise(52, 0.3), .13)
    .invert()
    .mirrorX()
    .mirrorY()
    .inversion()
    .kaleid(13)
    .rotate(() => time * 0.02)
    .modulate(noise(2.9, 9), () => 0.11 + Math.cos(time * 1.4) * 0.07)
    .colorama(0.2)
    .blend(o0,.8);

// fb098 - Primordial chaos
window.fb098 = () => src(o0)
    .scale(() => 0.7 + Math.sin(time * 3.8) * 0.28)
    .add(noise(55, 0.2), .1)
    .add(noise(7.2, 2.1), .36)
    .add(noise(0.12, 60), .06)
    .invert()
    .pixelate(() => 24 + Math.sin(time * 11) * 16, () => 24 + Math.cos(time * 11) * 16)
    .inversion()
    .mirrorX2()
    .mirrorY2()
    .rotate(() => time * 0.2)
    .modulate(noise(4.9, 4), 0.28)
    .blend(o0,.3);

// fb099 - Universal consciousness
window.fb099 = () => src(o0)
    .scale(.89)
    .add(noise(0.02, 120), .03)
    .add(noise(29, 0.65), .24)
    .add(noise(6, 2.8), .35)
    .add(noise(85, 0.15), .08)
    .invert()
    .inversion()
    .kaleid(() => 21 + Math.cos(time * 0.8) * 10)
    .mirrorWrap()
    .modulate(noise(1.9, 11), () => 0.09 + Math.sin(time * 0.4) * 0.05)
    .colorama(() => 0.8 + Math.cos(time * 0.2) * 0.15)
    .blend(o0,.85);

// fb100 - Omega point convergence
window.fb100 = () => src(o0)
    .scale(() => 0.5 + Math.sin(time * 0.618) * 0.45)
    .add(noise(100, 0.1), .05)
    .add(noise(15, 1.1), .3)
    .add(noise(1.8, 13), .25)
    .add(noise(0.07, 100), .04)
    .invert()
    .kaleid(() => 33 + Math.sin(time * 0.5) * 15)
    .inversion()
    .mirrorX()
    .mirrorY()
    .rotate(() => time * 0.008)
    .modulate(noise(3.14, 7), () => 0.05 + Math.cos(time * 0.1) * 0.03)
    .colorama(() => Math.sin(time * 0.1) * 0.9)
    .blend(o0,.9);
