import SurfacesColor from './surfacesColor';

const {surface1, surface5} = SurfacesColor.dark;

const ShadowPresets = {
  normal: {
    offset: [-1, -1],
    distance: '1',
    paintInside: false,
    startColor: surface1,
    endColor: surface5,
  },
};

export default ShadowPresets;
