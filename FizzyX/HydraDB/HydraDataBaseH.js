// XXXXXX
// Functional Curves and Surfaces (FCS) is an extension to Hydra for composing patterns inspired by algebraic geometry
// https://github.com/ymaltsman/Hydra-FCS

window.h001 = () => iCircle(1);
window.h002 = () => iCircle().pSpiral(iCardioid());
window.h003 = () => iCissoid().eCircle(2, 5).eStrophoid(1,10);
window.h004 = () => pSphere().iTorus();
window.h005 = () => pTorus().pCardioid(iCardioid().pAstroid(pSphere())).kaleid().iSphere();
window.h006 = () => iDevil().ipCylinder(pCrossCap().repeat());
window.h007 = () => iSpiral(1, .5).hpCone(pMobiusStrip(1, 7).pSpiral(iCircle()), .6);

window.h008 = () => iCardioid(1,1); // Implicit curves
window.h009 = () => iBicorn(1,1,1);
window.h010 = () => iAstroid(1,1,1);
// window.h011 = () => iCircle(1);
window.h011 = () => iCassOval(1,1,1,1);
window.h012 = () => iSextic(1,1,1);
window.h013 = () => iCochleoid(1,1,1);
window.h014 = () => iCissoid(1,1,10);
window.h015 = () => iSluzeConchoid(1,3,1);
window.h016 = () => iDevil(1,4,1,3);
window.h017 = () => iDFolium(1,3);
window.h018 = () => iSpiral(1,3,1);
window.h019 = () => iFermatSpiral(1,1,1);
window.h020 = () => iFreethNephroid(1,1,2);
window.h021 = () => iInvoluteCircle(1,10);

window.h022 = () => pTorus(1, .2, .1);
window.h023 = () => pTorus(1,1,.5);
window.h024 = () => pSphere(1,1); // Parametric Surfaces ok - Parametric and explicit curves and others do not work
window.h025 = () => pMobiusStrip(1,1);
window.h026 = () => pCylinder(1,1);
window.h027 = () => pKleinBottle(1,1);
window.h028 = () => pCrossCap(1,1);
window.h029 = () => pSteiner(1,1);

// XXXXXX - Creative FCS Variations by Xon
// Combinaisons complexes de courbes implicites et surfaces paramétriques
// Série hb001-hb010 : Mélanges de courbes implicites avec effets visuels
window.hb001 = () => iCardioid(2, 1).blend(iSpiral(1, 0.5)).kaleid(5).colorama(0.01);
window.hb002 = () => iAstroid(1.5, 1, 2).layer(iBicorn(1, 0.8, 1)).rotate(() => time * 0.1).hue(0.5);
window.hb003 = () => iCissoid(1, 2, 5).modulate(iSextic(0.5, 1, 2), 0.3).pixelate(100, 100);
window.hb004 = () => iDevil(2, 3, 1, 2).diff(iCochleoid(1, 0.5, 1)).invert().colorama(0.005);
window.hb005 = () => iFermatSpiral(2, 1.5, 1).mask(iFreethNephroid(1, 0.8, 3)).scale(1.2).rotate(0.3);
window.hb006 = () => iInvoluteCircle(1.5, 15).add(iSluzeConchoid(0.8, 2, 1)).modulateScale(noise(3), 0.2);
window.hb007 = () => iDFolium(2, 4).blend(iCassOval(1, 1.2, 0.8, 1), 0.5).kaleid(8).saturate(2);
window.hb008 = () => iSpiral(3, 2, 0.5).layer(iCircle(0.8)).modulateRotate(osc(10), 0.1).contrast(1.5);
window.hb009 = () => iCardioid(1, 2).diff(iAstroid(0.8, 1, 1.5)).repeat(3, 3).blend(o0, 0.95);
window.hb010 = () => iBicorn(2, 1.5, 1).mask(iSextic(1, 1, 2)).modulateHue(src(o0).scale(1.01), 1);
// Série hb011-hb020 : Surfaces paramétriques avec transformations
window.hb011 = () => pTorus(1.5, 0.3, 0.2).blend(pSphere(0.8, 1)).kaleid(6).colorama(0.02);
window.hb012 = () => pMobiusStrip(2, 5).modulate(pCylinder(0.5, 1), 0.4).rotate(() => time * 0.05);
window.hb013 = () => pKleinBottle(1.2, 1.5).diff(pCrossCap(0.8, 1)).pixelate(80, 80).saturate(3);
window.hb014 = () => pSteiner(1.5, 2).layer(pTorus(0.5, 0.2, 0.1)).modulateScale(osc(5), 0.3);
window.hb015 = () => pSphere(2, 1.5).mask(pMobiusStrip(1, 3)).blend(gradient(1), 0.3).hue(0.3);
window.hb016 = () => pCylinder(1, 2).add(pKleinBottle(0.5, 0.8)).modulateRotate(noise(2), 0.2);
window.hb017 = () => pCrossCap(1.8, 1.2).blend(pSteiner(1, 1.5), 0.6).kaleid(4).invert();
window.hb018 = () => pTorus(2, 0.5, 0.3).modulate(src(o0).scale(0.98), 0.1).colorama(0.01);
window.hb019 = () => pMobiusStrip(1.5, 8).diff(pSphere(0.7, 1)).repeat(2, 2).blend(o0, 0.9);
window.hb020 = () => pKleinBottle(1, 1).layer(pCylinder(0.5, 1.5)).modulateHue(osc(3), 2);
// Série hb021-hb030 : Hybrides complexes implicites/paramétriques
window.hb021 = () => iCardioid(2, 1).blend(pTorus(1, 0.3, 0.2)).modulateScale(noise(4), 0.2).kaleid(7);
window.hb022 = () => pSphere(1.5, 1).layer(iSpiral(2, 1, 0.5)).diff(iBicorn(0.8, 1, 1)).colorama(0.008);
window.hb023 = () => iAstroid(1, 1.5, 2).mask(pMobiusStrip(1.2, 6)).modulateRotate(osc(8), 0.15);
window.hb024 = () => pKleinBottle(1.3, 1).blend(iCissoid(1, 1.5, 8), 0.4).pixelate(120, 120).hue(0.6);
window.hb025 = () => iDevil(1.5, 5, 1, 4).add(pCrossCap(0.8, 1.2)).kaleid(6).saturate(2.5);
window.hb026 = () => pCylinder(1.2, 1.5).modulate(iSextic(0.8, 1, 1.5), 0.3).repeat(3, 3).contrast(1.8);
window.hb027 = () => iFermatSpiral(3, 2, 1).layer(pSteiner(1, 1.2)).blend(gradient(2), 0.25);
window.hb028 = () => pTorus(2, 0.4, 0.15).diff(iCochleoid(1.2, 1, 1.5)).modulateScale(src(o0), 0.05);
window.hb029 = () => iFreethNephroid(1.5, 1, 3).mask(pSphere(1, 1.2)).kaleid(9).blend(o0, 0.93);
window.hb030 = () => pMobiusStrip(2, 10).blend(iInvoluteCircle(1, 20), 0.5).colorama(0.015).rotate(0.2);
// Série hb031-hb040 : Compositions avec modulations audio-réactives
// DBDRAFT3.JS - HB031-HB100 FCS EXTENSIONS
// Variations complexes organiques avec librairie FCS
// Basé sur modèles f avec courbes implicites et surfaces paramétriques
// ========================================

// Série hb031-hb040 : Compositions avec modulations audio-réactives
window.hb031 = () => iCardioid(() => 1 + rms1, 2).blend(pTorus(() => 0.5 + rms2 * 0.5, 0.3, 0.2)).kaleid(() => 3 + rms1 * 4).colorama(() => rms2 * 0.02);

window.hb032 = () => pSphere(() => 1.2 + rms1 * 0.8, 1.5).layer(iSpiral(() => 2 + rms2, 1.5, 0.3)).modulateScale(noise(() => 2 + rms1 * 3), () => 0.1 + rms2 * 0.2);

window.hb033 = () => iDevil(() => 1.5 + rms1 * 0.5, () => 3 + rms2 * 2, 1, 3).mask(pMobiusStrip(1.8, () => 6 + rms1 * 4)).rotate(() => time * (0.02 + rms2 * 0.05));

window.hb034 = () => pKleinBottle(() => 1 + rms1 * 0.5, () => 1.2 + rms2 * 0.8).diff(iAstroid(1.2, 1, () => 1.5 + rms1)).pixelate(() => 60 + rms2 * 60, () => 60 + rms1 * 60);

window.hb035 = () => iFermatSpiral(() => 2.5 + rms1, () => 1.8 + rms2 * 0.7, 1).add(pCrossCap(() => 0.9 + rms1 * 0.4, 1.3)).kaleid(() => 5 + rms2 * 3).saturate(() => 1.5 + rms1);

window.hb036 = () => pCylinder(() => 1.1 + rms1 * 0.6, () => 1.3 + rms2 * 0.7).modulate(iSextic(0.7, 1.2, () => 1.8 + rms1 * 0.5), () => 0.2 + rms2 * 0.2);

window.hb037 = () => iCissoid(1.3, () => 1.8 + rms1 * 0.8, () => 6 + rms2 * 2).layer(pSteiner(() => 1.2 + rms1 * 0.5, 1.4)).blend(gradient(() => 1.5 + rms2), 0.3);

window.hb038 = () => pTorus(() => 1.8 + rms1 * 0.7, () => 0.35 + rms2 * 0.2, 0.18).blend(iCochleoid(() => 1.1 + rms1 * 0.4, 0.8, 1.2), () => 0.6 + rms2 * 0.3);

window.hb039 = () => iFreethNephroid(() => 1.4 + rms1 * 0.6, () => 0.9 + rms2 * 0.5, () => 2.5 + rms1 * 1.5).mask(pSphere(1.2, () => 1.1 + rms2 * 0.4)).colorama(() => rms1 * 0.01);

window.hb040 = () => pMobiusStrip(() => 1.6 + rms1 * 0.9, () => 8 + rms2 * 4).diff(iInvoluteCircle(1.2, () => 15 + rms1 * 10)).modulateHue(osc(() => 2 + rms2 * 3), () => 1.5 + rms1 * 0.5);

// Série hb041-hb050 : Morphogénèse organique évolutive
window.hb041 = () => iCardioid(() => 1.5 + Math.sin(time * 0.3) * 0.5, () => 1.8 + Math.cos(time * 0.2) * 0.7).blend(pTorus(() => 0.8 + Math.sin(time * 0.1) * 0.3, 0.25, 0.15)).kaleid(() => 4 + Math.sin(time * 0.5) * 2).add(noise(0.5, () => 2 + Math.cos(time * 0.4)), 0.3);

window.hb042 = () => iSpiral(() => 2.2 + Math.cos(time * 0.4) * 0.8, () => 1.6 + Math.sin(time * 0.25) * 0.6, 0.4).layer(pKleinBottle(() => 1.1 + Math.sin(time * 0.15) * 0.4, 1.3)).modulate(noise(() => 1.5 + Math.cos(time * 0.3) * 0.8, 1.2), () => 0.15 + Math.sin(time * 0.6) * 0.08);

window.hb043 = () => iDevil(() => 1.3 + Math.sin(time * 0.2) * 0.4, () => 4 + Math.cos(time * 0.35) * 1.5, 1.2, () => 2.5 + Math.sin(time * 0.18) * 1).mask(pCrossCap(() => 0.9 + Math.cos(time * 0.12) * 0.3, 1.1)).rotate(() => time * (0.03 + Math.sin(time * 0.8) * 0.02));

window.hb044 = () => pSphere(() => 1.4 + Math.cos(time * 0.28) * 0.6, () => 1.2 + Math.sin(time * 0.16) * 0.5).diff(iAstroid(() => 1 + Math.sin(time * 0.22) * 0.3, 1.1, () => 1.7 + Math.cos(time * 0.19) * 0.8)).pixelate(() => 70 + Math.sin(time * 1.2) * 25, () => 70 + Math.cos(time * 1.5) * 25);

window.hb045 = () => iFermatSpiral(() => 2.8 + Math.sin(time * 0.24) * 0.9, () => 1.9 + Math.cos(time * 0.31) * 0.7, 0.8).add(pMobiusStrip(() => 1.5 + Math.sin(time * 0.17) * 0.5, () => 7 + Math.cos(time * 0.41) * 2.5)).kaleid(() => 6 + Math.sin(time * 0.45) * 2).saturate(() => 1.3 + Math.cos(time * 0.33) * 0.5);

window.hb046 = () => pCylinder(() => 1.2 + Math.cos(time * 0.26) * 0.5, () => 1.5 + Math.sin(time * 0.39) * 0.6).modulate(iSextic(() => 0.6 + Math.sin(time * 0.21) * 0.2, 1.3, () => 1.9 + Math.cos(time * 0.29) * 0.4), () => 0.25 + Math.sin(time * 0.52) * 0.12).add(noise(() => 3 + Math.cos(time * 0.18) * 1.5, 0.8), 0.25);

window.hb047 = () => iCissoid(() => 1.1 + Math.sin(time * 0.32) * 0.4, () => 2 + Math.cos(time * 0.23) * 0.7, () => 7 + Math.sin(time * 0.47) * 2).layer(pSteiner(() => 1.3 + Math.cos(time * 0.14) * 0.4, () => 1.6 + Math.sin(time * 0.37) * 0.6)).blend(gradient(() => 1.8 + Math.sin(time * 0.25) * 0.5), () => 0.2 + Math.cos(time * 0.43) * 0.15);

window.hb048 = () => pTorus(() => 1.9 + Math.cos(time * 0.19) * 0.6, () => 0.4 + Math.sin(time * 0.34) * 0.15, () => 0.2 + Math.cos(time * 0.51) * 0.08).blend(iCochleoid(() => 1.3 + Math.sin(time * 0.27) * 0.5, () => 0.9 + Math.cos(time * 0.38) * 0.3, 1.4), () => 0.7 + Math.sin(time * 0.42) * 0.2).modulate(noise(2.5, () => 1.3 + Math.cos(time * 0.29) * 0.6), 0.1);

window.hb049 = () => iFreethNephroid(() => 1.6 + Math.sin(time * 0.21) * 0.7, () => 1.1 + Math.cos(time * 0.36) * 0.4, () => 2.8 + Math.sin(time * 0.44) * 1.2).mask(pSphere(() => 1.3 + Math.cos(time * 0.15) * 0.5, () => 1.2 + Math.sin(time * 0.28) * 0.4)).colorama(() => Math.sin(time * 0.67) * 0.012).rotate(() => time * (0.01 + Math.cos(time * 0.23) * 0.008));

window.hb050 = () => pMobiusStrip(() => 1.8 + Math.cos(time * 0.33) * 0.8, () => 9 + Math.sin(time * 0.48) * 3).diff(iInvoluteCircle(() => 1.4 + Math.sin(time * 0.24) * 0.6, () => 18 + Math.cos(time * 0.35) * 7)).modulateHue(osc(() => 2.5 + Math.sin(time * 0.41) * 1), () => 1.8 + Math.cos(time * 0.56) * 0.7).add(noise(() => 4 + Math.sin(time * 0.31) * 2, 0.6), 0.2);

// Série hb051-hb060 : Géométries fluides mystérieuses
window.hb051 = () => iCardioid(1.2, 1.5).blend(pTorus(0.8, 0.3, 0.2)).modulate(osc(3, 0.1), 0.2).modulateScale(noise(1, 2), 0.15).scale(1.1).rotate(() => time * 0.02).colorama(0.3);

window.hb052 = () => iSpiral(1.8, 1.2, 0.5).layer(pKleinBottle(1.0, 1.2)).modulate(osc(5, 0.05), 0.15).modulateRotate(noise(2, 1), 0.1).blend(gradient(2), 0.3).hue(() => Math.sin(time * 0.2) * 0.3);

window.hb053 = () => iDevil(1.3, 3.0, 1.0, 2.0).mask(pCrossCap(0.9, 1.1)).modulate(osc(2, 0.08), 0.18).modulateScale(noise(0.5, 3), 0.12).rotate(() => time * 0.01).saturate(1.2).brightness(0.8);

window.hb054 = () => pSphere(1.2, 1.0).diff(iAstroid(0.9, 1.0, 1.3)).modulateRotate(osc(4, 0.06), 0.12).modulate(noise(1.5, 1.5), 0.1).scale(0.9).colorama(() => Math.cos(time * 0.15) * 0.2).contrast(0.9);

window.hb055 = () => iFermatSpiral(2.2, 1.5, 0.7).add(pMobiusStrip(1.2, 6.0)).modulate(osc(6, 0.04), 0.14).modulateHue(noise(2.5, 1), 1.5).kaleid(4).rotate(0.1).saturate(1.1);

window.hb056 = () => pCylinder(1.1, 1.3).modulate(iSextic(0.7, 1.1, 1.5), 0.2).modulateScale(osc(3, 0.07), 0.08).blend(noise(3, 1), 0.2).hue(0.2).brightness(0.9).contrast(1.1);

window.hb057 = () => iCissoid(1.1, 1.8, 6.0).layer(pSteiner(1.0, 1.3)).modulate(osc(1.5, 0.12), 0.16).modulateRotate(noise(1.8, 2), 0.08).colorama(() => Math.sin(time * 0.18) * 0.25).rotate(0.08);

window.hb058 = () => pTorus(1.5, 0.35, 0.22).blend(iCochleoid(1.2, 0.9, 1.3), 0.5).modulateHue(osc(2.5, 0.1), 1.2).modulate(noise(2, 2.5), 0.12).scale(1.05).hue(0.25).saturate(0.9);

window.hb059 = () => iFreethNephroid(1.4, 1.0, 2.5).mask(pSphere(1.1, 0.9)).modulate(osc(4, 0.08), 0.14).modulateScale(noise(1.2, 2.8), 0.1).kaleid(5).colorama(0.15).rotate(() => time * 0.005);

window.hb060 = () => pMobiusStrip(1.6, 8.0).diff(iInvoluteCircle(1.3, 16)).modulateRotate(osc(3.5, 0.06), 0.1).modulate(noise(3, 1.8), 0.15).saturate(1.0).hue(() => Math.cos(time * 0.12) * 0.4).brightness(0.85);

// Série hb061-hb070 : Transmutations alchimiques
window.hb061 = () => iCardioid(1.3, 1.8).blend(pTorus(1.0, 0.3, 0.18)).add(iSpiral(1.4, 1.0, 0.5), 0.3).modulate(osc(1.5, 0.15), 0.2).modulateScale(noise(0.8, 3), 0.12).colorama(() => Math.sin(time * 0.2) * 0.3).rotate(() => time * 0.008);

window.hb062 = () => iDevil(1.2, 2.8, 0.9, 1.8).layer(pKleinBottle(0.9, 1.2)).diff(iAstroid(0.7, 0.9, 1.2)).modulate(osc(2.2, 0.12), 0.18).modulateHue(noise(2.5, 2), 1.2).hue(() => Math.cos(time * 0.15) * 0.4).scale(0.95);

window.hb063 = () => pSphere(1.2, 1.1).mask(iFermatSpiral(2.0, 1.4, 0.6)).add(pCrossCap(0.8, 1.0), 0.35).modulateRotate(osc(3, 0.08), 0.1).modulate(noise(1.8, 2.2), 0.14).saturate(1.2).contrast(0.9).brightness(0.8);

window.hb064 = () => iCissoid(1.1, 1.6, 5.5).blend(pMobiusStrip(1.2, 7.0), 0.5).layer(iSextic(0.6, 1.0, 1.4)).modulate(osc(2.8, 0.1), 0.15).modulateScale(noise(2.2, 1.5), 0.1).colorama(0.2).rotate(0.05);

window.hb065 = () => pCylinder(1.0, 1.3).diff(iCochleoid(1.0, 0.7, 1.1)).add(pSteiner(0.9, 1.1), 0.28).modulateHue(osc(4, 0.06), 1.5).modulate(noise(3.2, 1.8), 0.12).kaleid(4).saturate(0.9).hue(0.15);

window.hb066 = () => iFreethNephroid(1.3, 0.9, 2.2).mask(pTorus(1.4, 0.32, 0.18)).blend(iInvoluteCircle(1.1, 14), 0.45).modulateRotate(osc(1.8, 0.14), 0.08).modulate(noise(1.5, 4), 0.16).saturate(0.7).hue(0.35);

window.hb067 = () => pSphere(1.1, 1.3).layer(iCardioid(1.2, 1.5)).diff(pKleinBottle(0.9, 1.0), 0.25).modulate(osc(3.5, 0.09), 0.13).modulateScale(noise(2, 2.5), 0.09).colorama(() => Math.sin(time * 0.18) * 0.25).rotate(() => time * 0.01);

window.hb068 = () => iSpiral(1.8, 1.3, 0.4).add(pCrossCap(1.0, 1.2)).mask(iDevil(1.1, 2.5, 0.8, 1.6)).modulateHue(osc(2.5, 0.11), 1.8).modulate(noise(1.2, 6), 0.18).contrast(1.0).brightness(0.8).scale(0.9);

window.hb069 = () => pMobiusStrip(1.4, 8.2).blend(iAstroid(1.0, 1.1, 1.3), 0.55).layer(pCylinder(0.8, 1.0)).modulate(osc(4.2, 0.07), 0.12).modulateRotate(noise(2.8, 1.2), 0.08).hue(0.45).saturate(1.1).rotate(0.08);

window.hb070 = () => iFermatSpiral(2.2, 1.6, 0.7).mask(pTorus(1.2, 0.28, 0.16)).add(iCissoid(1.0, 1.4, 5.2), 0.32).modulateScale(osc(1.2, 0.16), 0.1).modulate(noise(2.8, 3), 0.14).colorama(0.3).saturate(1.0).brightness(0.85);

// Série hb071-hb080 : Symbioses biotechnologiques
window.hb071 = () => iCardioid(1.4, 1.6).blend(pTorus(1.0, 0.3, 0.18)).modulate(iSpiral(1.6, 1.0, 0.5), 0.12).modulateScale(osc(2, 0.1), 0.08).add(noise(8, 1), 0.15).scale(1.1).colorama(0.2).rotate(() => time * 0.01);

window.hb072 = () => iDevil(1.2, 2.8, 1.0, 2.0).layer(pKleinBottle(0.9, 1.1)).mask(iAstroid(0.8, 1.0, 1.2)).modulate(osc(3, 0.08), 0.14).modulateHue(noise(2, 2.5), 1.5).blend(gradient(1.5), 0.2).hue(() => Math.sin(time * 0.2) * 0.3);

window.hb073 = () => pSphere(1.2, 1.0).diff(iFermatSpiral(2.0, 1.4, 0.6)).blend(pCrossCap(0.8, 1.0), 0.4).modulateRotate(osc(2.5, 0.1), 0.09).modulate(noise(1.5, 3), 0.12).saturate(1.1).contrast(0.9).brightness(0.8);

window.hb074 = () => iCissoid(1.1, 1.5, 5.8).add(pMobiusStrip(1.1, 6.5)).modulate(iSextic(0.5, 0.9, 1.3), 0.18).modulateScale(osc(1.8, 0.12), 0.1).blend(noise(4, 1.5), 0.18).rotate(0.06).brightness(0.85);

window.hb075 = () => pCylinder(1.0, 1.2).blend(iCochleoid(0.9, 0.6, 1.0), 0.5).layer(pSteiner(0.8, 1.0)).modulateHue(osc(3.5, 0.08), 1.4).modulate(noise(2.8, 2), 0.14).scale(0.95).colorama(0.25).saturate(0.8);

window.hb076 = () => iFreethNephroid(1.2, 0.8, 2.0).mask(pTorus(1.3, 0.28, 0.16)).diff(iInvoluteCircle(1.0, 12)).modulateRotate(osc(2.2, 0.11), 0.08).modulate(noise(1.8, 4), 0.15).hue(0.3).saturate(0.85).contrast(1.0);

window.hb077 = () => pSphere(1.1, 1.2).layer(iCardioid(1.3, 1.4)).mask(pKleinBottle(0.8, 1.0)).modulate(osc(4, 0.07), 0.12).modulateScale(noise(2.2, 2.8), 0.09).colorama(() => Math.sin(time * 0.15) * 0.3).rotate(() => time * 0.008);

window.hb078 = () => iSpiral(1.7, 1.1, 0.4).add(pCrossCap(0.9, 1.1)).blend(iDevil(1.0, 2.3, 0.7, 1.5), 0.45).modulateHue(osc(2.8, 0.09), 1.6).modulate(noise(1.2, 5), 0.16).contrast(0.95).brightness(0.8).scale(0.9);

window.hb079 = () => pMobiusStrip(1.3, 7.5).diff(iAstroid(0.9, 0.9, 1.2)).layer(pCylinder(0.7, 0.9)).modulate(osc(3.2, 0.1), 0.13).modulateRotate(noise(2.5, 1.8), 0.08).colorama(() => Math.cos(time * 0.12) * 0.25).rotate(0.04);

window.hb080 = () => iFermatSpiral(2.1, 1.5, 0.6).blend(pTorus(1.1, 0.26, 0.15), 0.55).mask(iCissoid(0.9, 1.3, 4.8)).modulateScale(osc(1.5, 0.14), 0.1).modulate(noise(2.5, 2.8), 0.16).hue(0.4).saturate(1.0).brightness(0.82);

// Série hb081-hb090 : Portails dimensionnels
window.hb081 = () => iCardioid(1.3, 1.5).blend(pTorus(0.9, 0.3, 0.18)).kaleid(() => 5 + Math.sin(time * 0.4) * 2).modulate(osc(1.5, () => 0.1 + Math.cos(time * 0.6) * 0.05), 0.15).rotate(() => time * 0.01).colorama(() => Math.sin(time * 0.25) * 0.3);

window.hb082 = () => iDevil(1.1, 2.5, 0.9, 1.8).layer(pKleinBottle(0.8, 1.0)).kaleid(() => 4 + Math.cos(time * 0.5) * 1.5).diff(iSpiral(1.5, 1.0, 0.5)).modulateScale(osc(2.5, 0.08), () => 0.1 + Math.sin(time * 0.8) * 0.05).hue(() => Math.cos(time * 0.2) * 0.4);

window.hb083 = () => pSphere(1.1, 1.0).mask(iFermatSpiral(1.9, 1.3, 0.5)).kaleid(() => 4 + Math.sin(time * 0.3) * 1.5).add(pCrossCap(0.7, 0.9), 0.35).modulateRotate(osc(3, 0.06), () => 0.08 + Math.cos(time * 0.6) * 0.04).saturate(() => 0.9 + Math.sin(time * 0.25) * 0.2);

window.hb084 = () => iCissoid(1.0, 1.4, 5.2).blend(pMobiusStrip(1.1, 6.5), 0.5).kaleid(() => 3 + Math.cos(time * 0.6) * 1.5).layer(iAstroid(0.6, 0.8, 1.1)).modulate(osc(2.2, 0.1), () => 0.12 + Math.sin(time * 0.7) * 0.08).brightness(() => 0.8 + Math.cos(time * 0.4) * 0.1);

window.hb085 = () => pCylinder(0.9, 1.2).diff(iSextic(0.5, 0.9, 1.3)).kaleid(() => 6 + Math.sin(time * 0.2) * 2.5).add(pSteiner(0.8, 1.0), 0.3).modulateHue(osc(3.5, 0.08), () => 1.5 + Math.cos(time * 0.5) * 0.3).contrast(() => 0.9 + Math.sin(time * 0.35) * 0.1);

window.hb086 = () => iFreethNephroid(1.2, 0.8, 2.0).mask(pTorus(1.2, 0.28, 0.16)).kaleid(() => 3 + Math.cos(time * 0.4) * 1).blend(iCochleoid(0.9, 0.6, 1.0), 0.45).modulate(osc(1.8, 0.12), () => 0.15 + Math.sin(time * 0.6) * 0.1).colorama(() => Math.cos(time * 0.18) * 0.25);

window.hb087 = () => pSphere(1.0, 1.1).layer(iInvoluteCircle(1.0, 14)).kaleid(() => 4 + Math.sin(time * 0.5) * 1.5).diff(pKleinBottle(0.7, 0.9)).modulateScale(osc(2.8, 0.09), () => 0.1 + Math.cos(time * 0.7) * 0.06).rotate(() => time * 0.006);

window.hb088 = () => iSpiral(1.6, 1.0, 0.4).add(pCrossCap(0.8, 1.0)).kaleid(() => 5 + Math.cos(time * 0.3) * 2).mask(iCardioid(1.1, 1.3)).modulate(osc(1.2, 0.15), () => 0.18 + Math.sin(time * 0.9) * 0.12).hue(() => Math.sin(time * 0.22) * 0.35).saturate(1.0);

window.hb089 = () => pMobiusStrip(1.3, 7.2).blend(iDevil(0.9, 2.2, 0.6, 1.4), 0.55).kaleid(() => 4 + Math.sin(time * 0.6) * 2).layer(pCylinder(0.6, 0.8)).modulateRotate(osc(3.2, 0.07), () => 0.1 + Math.cos(time * 0.5) * 0.06).scale(0.9).rotate(0.05);

window.hb090 = () => iFermatSpiral(2.0, 1.4, 0.6).mask(pTorus(1.0, 0.26, 0.14)).kaleid(() => 3 + Math.cos(time * 0.25) * 1.5).add(iCissoid(0.8, 1.2, 4.5), 0.32).modulate(osc(2, 0.11), () => 0.14 + Math.sin(time * 0.6) * 0.09).colorama(() => Math.sin(time * 0.15) * 0.3).brightness(0.8);

// Série hb091-hb100 : Métamorphoses fractales ultimes
window.hb091 = () => iCardioid(() => 1.2 + Math.sin(time * 0.15) * 0.3, () => 1.4 + Math.cos(time * 0.18) * 0.4).blend(pTorus(() => 0.8 + Math.sin(time * 0.12) * 0.2, () => 0.28 + Math.cos(time * 0.32) * 0.06, 0.16)).kaleid(() => 4 + Math.sin(time * 0.4) * 2).modulate(osc(() => 1.5 + Math.cos(time * 0.16) * 0.5, 0.1), () => 0.12 + Math.cos(time * 0.5) * 0.08).add(iSpiral(() => 1.4 + Math.sin(time * 0.22) * 0.4, () => 0.9 + Math.cos(time * 0.28) * 0.3, 0.4), 0.25);

window.hb092 = () => iDevil(() => 1.0 + Math.cos(time * 0.17) * 0.2, () => 2.3 + Math.sin(time * 0.31) * 0.6, () => 0.8 + Math.cos(time * 0.38) * 0.15, () => 1.6 + Math.sin(time * 0.25) * 0.4).layer(pKleinBottle(() => 0.7 + Math.sin(time * 0.13) * 0.15, () => 0.9 + Math.cos(time * 0.35) * 0.2)).diff(iAstroid(() => 0.7 + Math.cos(time * 0.21) * 0.15, 0.9, () => 1.0 + Math.sin(time * 0.28) * 0.3)).modulate(osc(2.5, 0.08), 0.14).colorama(() => Math.sin(time * 0.2) * 0.3);

window.hb093 = () => pSphere(() => 1.0 + Math.sin(time * 0.19) * 0.3, () => 0.9 + Math.cos(time * 0.26) * 0.2).mask(iFermatSpiral(() => 1.8 + Math.sin(time * 0.14) * 0.5, () => 1.2 + Math.cos(time * 0.34) * 0.4, 0.6)).add(pCrossCap(() => 0.6 + Math.cos(time * 0.23) * 0.15, () => 0.8 + Math.sin(time * 0.41) * 0.2), 0.35).modulateScale(osc(1.8, 0.1), 0.08).colorama(() => Math.sin(time * 0.11) * Math.cos(time * 0.06) * 0.25);

window.hb094 = () => iCissoid(() => 0.9 + Math.cos(time * 0.18) * 0.2, () => 1.3 + Math.sin(time * 0.29) * 0.4, () => 5.2 + Math.cos(time * 0.39) * 0.8).blend(pMobiusStrip(() => 1.0 + Math.sin(time * 0.15) * 0.3, () => 6.2 + Math.cos(time * 0.43) * 1.2), () => 0.45 + Math.sin(time * 0.54) * 0.1).modulateScale(iSextic(0.4, 0.8, 1.2), () => 0.1 + Math.cos(time * 0.73) * 0.06).modulate(osc(2.2, 0.09), 0.12).rotate(0.04);

window.hb095 = () => pCylinder(() => 0.8 + Math.sin(time * 0.2) * 0.2, () => 1.1 + Math.cos(time * 0.31) * 0.3).diff(iCochleoid(() => 0.8 + Math.sin(time * 0.27) * 0.2, () => 0.5 + Math.cos(time * 0.37) * 0.15, 0.9)).kaleid(() => 4 + Math.sin(time * 0.47) * 1.5).layer(pSteiner(() => 0.7 + Math.cos(time * 0.22) * 0.15, () => 0.9 + Math.sin(time * 0.33) * 0.2)).modulate(osc(3, 0.08), () => 0.13 + Math.sin(time * 0.69) * 0.08);

window.hb096 = () => iFreethNephroid(() => 1.1 + Math.cos(time * 0.16) * 0.3, () => 0.7 + Math.sin(time * 0.36) * 0.2, () => 1.9 + Math.cos(time * 0.51) * 0.6).mask(pTorus(() => 1.2 + Math.sin(time * 0.11) * 0.3, () => 0.26 + Math.cos(time * 0.46) * 0.04, 0.15)).blend(iInvoluteCircle(() => 0.8 + Math.sin(time * 0.24) * 0.3, () => 13 + Math.cos(time * 0.39) * 4), () => 0.4 + Math.sin(time * 0.55) * 0.15).modulateHue(osc(2.8, 0.1), 1.4).rotate(0.06);

window.hb097 = () => pSphere(() => 0.9 + Math.sin(time * 0.18) * 0.2, () => 1.0 + Math.cos(time * 0.30) * 0.3).layer(iCardioid(() => 1.1 + Math.sin(time * 0.13) * 0.3, () => 1.3 + Math.cos(time * 0.35) * 0.4)).mask(pKleinBottle(() => 0.6 + Math.cos(time * 0.22) * 0.15, () => 0.8 + Math.sin(time * 0.42) * 0.2)).modulateRotate(osc(2.5, 0.12), () => 0.1 + Math.cos(time * 0.53) * 0.06).colorama(() => Math.sin(time * 0.08) * 0.25);

window.hb098 = () => iSpiral(() => 1.5 + Math.cos(time * 0.21) * 0.4, () => 0.9 + Math.sin(time * 0.32) * 0.3, 0.4).add(pCrossCap(() => 0.7 + Math.sin(time * 0.17) * 0.15, () => 0.9 + Math.cos(time * 0.39) * 0.2)).mask(iDevil(() => 0.8 + Math.cos(time * 0.27) * 0.2, () => 2.0 + Math.sin(time * 0.45) * 0.5, 0.6, () => 1.3 + Math.cos(time * 0.33) * 0.3)).modulate(osc(1.8, 0.14), () => 0.18 + Math.cos(time * 0.71) * 0.12).scale(0.9);

window.hb099 = () => pMobiusStrip(() => 1.2 + Math.sin(time * 0.14) * 0.4, () => 6.8 + Math.cos(time * 0.49) * 1.6).diff(iAstroid(() => 0.8 + Math.sin(time * 0.19) * 0.2, () => 0.8 + Math.cos(time * 0.31) * 0.2, () => 1.1 + Math.sin(time * 0.38) * 0.3)).kaleid(() => 4 + Math.cos(time * 0.42) * 2).layer(pCylinder(() => 0.6 + Math.sin(time * 0.25) * 0.15, () => 0.7 + Math.cos(time * 0.35) * 0.2)).modulateScale(osc(3.2, 0.09), () => 0.08 + Math.sin(time * 0.70) * 0.06).rotate(0.03);

window.hb100 = () => iFermatSpiral(() => 1.9 + Math.cos(time * 0.12) * 0.6, () => 1.3 + Math.sin(time * 0.23) * 0.4, () => 0.5 + Math.cos(time * 0.52) * 0.15).blend(pTorus(() => 1.0 + Math.sin(time * 0.18) * 0.3, () => 0.24 + Math.cos(time * 0.44) * 0.06, () => 0.14 + Math.sin(time * 0.58) * 0.03), () => 0.5 + Math.cos(time * 0.61) * 0.15).add(iCissoid(() => 0.7 + Math.sin(time * 0.28) * 0.2, () => 1.1 + Math.cos(time * 0.34) * 0.3, () => 4.5 + Math.sin(time * 0.47) * 1.2), 0.28).kaleid(() => 6 + Math.sin(time * 0.54) * 3).modulate(osc(() => 1.4 + Math.cos(time * 0.10) * 0.5, () => 5 + Math.sin(time * 0.67) * 2), () => 0.2 + Math.cos(time * 0.74) * 0.12).colorama(() => Math.sin(time * 0.04) * Math.cos(time * 0.06) * 0.3).rotate(() => time * 0.005);
