export const createImage = async (imageSrc) => {
  const image = new Image();
  image.src = imageSrc;
  await image.decode();
  return image;
};
