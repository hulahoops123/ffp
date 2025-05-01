// This composable looks strange because the wildcard causes a linter error where the code is greyed out
export const useCarouselImages = () => {
const images = import.meta.glob("/assets/carousel_images/*.{jpg,jpeg,png,gif}",{eager: true});
    
    // Convert the glob result into an array of image URLs
    const imageUrls = Object.values(images).map((img) => img.default);
    
    return imageUrls;
  };