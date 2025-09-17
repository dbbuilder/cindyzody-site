# Images Directory

This directory should contain the following images for the Cindy Zody Communications Practitioner website:

## Required Images

### Profile Photos
- `cindy-profile.jpg` - Professional headshot of Cindy Zody for the hero section
  - Recommended size: 400x400px (square)
  - Format: JPG or PNG
  - Should be high quality and professional

### Background Images
- `nature-background.jpg` - Calming nature background for hero section
  - Recommended size: 1920x1080px or larger
  - Format: JPG
  - Should be calming, nature-themed (trees, leaves, peaceful landscapes)
  - Will be used with opacity overlay, so contrast is important

## How to Add Images

1. **For Cindy's Profile Photo:**
   - Save the image as `public/images/cindy-profile.jpg`
   - Uncomment the line in `src/pages/Home.vue` around line 94:
     ```html
     <!-- <img src="/images/cindy-profile.jpg" alt="Cindy Zody" class="w-full h-full object-cover" /> -->
     ```
   - Change it to:
     ```html
     <img src="/images/cindy-profile.jpg" alt="Cindy Zody" class="w-full h-full object-cover" />
     ```

2. **For Nature Background:**
   - Save the image as `public/images/nature-background.jpg`
   - Uncomment the line in `src/pages/Home.vue` around line 9:
     ```html
     <!-- <img src="/images/nature-background.jpg" alt="" class="w-full h-full object-cover opacity-20" /> -->
     ```
   - Change it to:
     ```html
     <img src="/images/nature-background.jpg" alt="" class="w-full h-full object-cover opacity-20" />
     ```

## Color Palette Reference

The site uses a calming nature color palette:
- **Primary Green**: #22c55e (brand-500)
- **Sage Green**: #5a8a5a (sage-500)
- **Earth Tones**: #f59e0b (earth-500)
- **Light Backgrounds**: Various 50-100 tones of the above

Choose images that complement these colors for the best visual harmony.