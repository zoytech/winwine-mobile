import SurfacesColor from './surfacesColor';

const {surface1, surface2, surface3, surface4, surface5} = SurfacesColor.light;

const Elevations = {
  light: {
    elevation1: {
      shadowColor: surface1,
      elevation: 2,
    },
    elevation2: {
      shadowColor: surface2,
      elevation: 4,
    },
    elevation3: {
      shadowColor: surface3,
      elevation: 6,
    },
    elevation4: {
      shadowColor: surface4,
      elevation: 8,
    },
    elevation5: {
      shadowColor: surface5,
      elevation: 10,
    },
  },
};
export default Elevations;
