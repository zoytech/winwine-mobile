import Surfaces from './surfacesColor/surfaces';

const {surface1, surface5} = Surfaces.light;

const shadowPresets = {
  button: {
    offset: [0, 1],
    distance: 1,
    startColor: surface1.first,
    endColor: surface5.first,
  },
};

export default shadowPresets;
