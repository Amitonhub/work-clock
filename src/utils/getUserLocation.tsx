export const getUserLocation = () => {
  return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported'));
    }
  });
};
