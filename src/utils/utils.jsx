export const utils = {
  // Just truncate a numner
  truncate(number, digits) {
    const multiplier = Math.pow(10, digits);
    const adjustedNum = number * multiplier;
    const truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
    return truncatedNum / multiplier;
  },

  // Twitter API give us a "place" value, that contains 4 arrays.
  // Each of those arrays are: [lng, lat], so, those are 4 points.
  // This function return the middle point of that rectangule.
  // More info: https://dev.twitter.com/overview/api/places
  getMapPoint(coors) {
    let dataPoint = {
      lng: {
        max: -180,
        min: 180
      },
      lat: {
        max: -180,
        min: 180
      }
    }

    coors.forEach((coor) => {
      // coor[0] = lng
      // coor[1] = lat

      // Search Lngs
      if (coor[0] > dataPoint.lng.max) {
        dataPoint.lng.max = coor[0];
      }

      if (coor[0] < dataPoint.lng.min) {
        dataPoint.lng.min = coor[0];
      }

      // Search Lats
      if (coor[1] > dataPoint.lat.max) {
        dataPoint.lat.max = coor[1];
      }

      if (coor[1] < dataPoint.lat.min) {
        dataPoint.lat.min = coor[1];
      }
    });

    return {
      lat: dataPoint.lat.min + ((dataPoint.lat.max - dataPoint.lat.min) / 2),
      lng: dataPoint.lng.min + ((dataPoint.lng.max - dataPoint.lng.min) / 2)
    };
  }
};
