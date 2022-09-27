const ElevationVariant = {
  elevation1: 'elevation1',
  elevation2: 'elevation2',
  elevation3: 'elevation3',
  elevation4: 'elevation4',
  elevation5: 'elevation5',
};

const Elevation = {
  light: {
    [ElevationVariant.elevation1]: {
      elevation: 1,
    },
    [ElevationVariant.elevation2]: {
      elevation: 2,
    },
    [ElevationVariant.elevation3]: {
      elevation: 3,
    },
    [ElevationVariant.elevation4]: {
      elevation1: 4,
    },
    [ElevationVariant.elevation5]: {
      elevation1: 5,
    },
  },
};

export {ElevationVariant};
export default Elevation;
