<template>
    <div ref="mainContainerElement"
        class=" flex flex-col w-full mx-auto h-screen bg-neutral-200 overflow-scroll gap-8 p-2 text-amber-950 max-w-6xl">
        <div name="topMainDiv" class=" w-full justify-evenly gap-4 pt-2 flex-col flex bg-yellow-100/5 rounded-sm">
            <div name="nameandlogo" class="flex justify-center gap-2 md:gap-4 lg:gap-6 align-middle  py-2 bg-yellow-100/10">
                <img src="~/assets/logo_amber900.png" class="h-10 w-10 rounded-full md:h-14 md:w-14 lg:w-20 lg:h-20" alt="">
                <p
                    class="font-clickerscript text-center text-4xl font-semibold underline underline-offset-4 md:text-5xl lg:text-7xl lg:underline-offset-8">
                    Faithful
                    Friend Portraits</p>
            </div>

            

            <div class="relative mx-0 flex flex-col">
                <img src="~/assets/main_image_cropped.jpeg" class="rounded-md self-center px-8" alt="">
            <img name="ctaButton" src="~/assets/whatsappbutton.png" @click="ctaClicked"
                :class="[arrivedState.bottom | arrivedState.top && 'animate-subtle-celebrate']"
                class="w-10 h-10 rounded-full bg-white/50 fixed right-4 top-1/2 md:right-8 md:h-16 md:w-16 lg:right-16 lg:w-20 lg:h-20" alt="">
            </div>


            <div name="subandcopy" class=" flex flex-col md:gap-4 lg:gap-6 mt-4">
                <p class=" font-moondance text-3xl md:text-4xl lg:text-5xl font-semibold">Authentic Pet Portraits</p>
                <p class=" font-moondance text-2xl md:text-3xl lg:text-4xl">For hand painted oil portraits that bring your pet's unique
                    personality to life. Perfect for a cherished keepsake, a heartfelt memorial, or a meaningful gift
                    for
                    someone special.</p>
            </div>

        </div>

        <div class="" name="gallery">
            <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
                <Slide v-for="image in caroimages" :key="image">
                    <img :src="image" alt="Gallery Image" class="gallery-image" />
                </Slide>
            </Carousel>

            <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
                <Slide v-for="image in caroimages" :key="image">
                    <template #default="{ currentIndex, isActive }">
                        <div :class="['thumbnail', { 'is-active': isActive }]" @click="slideTo(currentIndex)">
                            <img :src="image" alt="Thumbnail Image" class="thumbnail-image" />
                        </div>
                    </template>
                </Slide>

                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
        </div>

        <div class="" name="faq">
            <p class="mb-4 font-moondance text-3xl font-bold underline underline-offset-2 md:text-4xl lg:text-5xl">
                Frequently Asked Questions
            </p>
            <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-300">
                <button @click="toggle(index)"
                    class="w-full text-left py-2 font-moondance text-2xl font-semibold focus:outline-none md:text-3xl lg:text-4xl">
                    {{ faq.question }}
                </button>
                <transition name="fade">
                    <p v-if="openIndex === index" class="py-2 font-moondance text-2xl md:text-3xl lg:text-4xl mb-4">
                        {{ faq.answer }}
                    </p>
                </transition>
            </div>
        </div>
        
        <p class="font-moondance text-xs font-extralight mt-40 text-slate-500 text-center"><span class="text-[6px]">©️
            </span>
            Faithful Friend Portraits - 2025 all rights reserved</p>
    </div>
</template>

<script setup>

import pic1 from "../assets/carousel_images/1.jpg";
import pic2 from "../assets/carousel_images/2.jpg";
import pic3 from "../assets/carousel_images/3.jpg";
import pic4 from "../assets/carousel_images/4.jpg";

const caroimages = [pic1, pic2, pic3, pic4];
const caroPick = ref();

const mainContainerElement = ref(null);
const { x, y, isScrolling, arrivedState, directions } = useScroll(mainContainerElement);

const carouselConfig = {
    itemsToShow: 2.5,
    gap: 5,
    wrapAround: true,
    // height: 800,
    // dir:'ttb',
    // autoplay: 4000,
    //   pauseAutoplayOnHover: true,
};


const currentSlide = ref(0);

const slideTo = (nextSlide) => (currentSlide.value = nextSlide);

const galleryConfig = {
    itemsToShow: 1,
    wrapAround: true,
    slideEffect: 'fade',
    mouseDrag: false,
    touchDrag: false,
    // height: 320,
};

const thumbnailsConfig = {
    // height: 80,
    itemsToShow: 6,
    wrapAround: true,
    touchDrag: true,
    gap: 10,
};



const openIndex = ref(null);

const faqs = [
    {
        question: 'How do I commission a portrait?',
        answer: 'Simply reach out to me to discuss your portrait. Once we’ve chosen the right size and details, I’ll guide you through the process of providing reference photos and finalizing your booking.'
    },
    {
        question: 'What reference photos do you need?',
        answer: 'Clear, high-quality photos with good lighting work best. The more detail, the better! If you\'re unsure, I’m happy to help you choose the perfect reference.'
    },
    {
        question: 'How long does it take?',
        answer: 'Each portrait is hand-painted with care and typically takes 2–3 weeks to complete.'
    },
    {
        question: 'How much does a portrait cost?',
        answer: 'An A3 canvas portrait is R5000 (framing and delivery not included). Custom sizes are also available—contact me for details.'
    },
    {
        question: 'Can I request a custom size?',
        answer: 'Yes! I offer a range of sizes to suit your space. Let me know what you\'re looking for, and I’ll be happy to accommodate.'
    },
    {
        question: 'Do you paint other subjects? Do you sell paintings or prints?',
        answer: 'Yes! I also create artwork beyond pet portraits. Feel free to reach out for access to my private gallery or to discuss something special.'
    },
    {
        question: 'Do you ship internationally?',
        answer: 'Yes, I can arrange international shipping. Costs and delivery times vary based on location—contact me for a quote.'
    }
];

const toggle = (index) => {
    openIndex.value = openIndex.value === index ? null : index;
};

const ctaClicked = () => {
    if (navigator.maxTouchPoints > 0) {
        window.open('https://api.whatsapp.com/send?phone=27739858738&text=FFPortraits+web+query:')
    } else {
        window.open('https://web.whatsapp.com/send/?phone=27739858738&text=FFPortraits+web+query:')
    }
};


</script>

<style>
:root {
    --carousel-transition: 300ms;
    --carousel-opacity-inactive: 0.7;
    --carousel-opacity-active: 1;
    --carousel-opacity-near: 0.9;
}

.carousel__viewport {
    perspective: 1000px;
}

.carousel__track {
    transform-style: preserve-3d;
}

.carousel__slide--sliding {
    transition: opacity var(--carousel-transition),
        transform var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
    transition: opacity var(--carousel-transition),
        transform var(--carousel-transition);
}

.carousel__slide {
    opacity: var(--carousel-opacity-inactive);
    transform: translateX(10px) rotateY(-12deg) scale(0.9);
}

.carousel__slide--prev {
    opacity: var(--carousel-opacity-near);
    transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--active {
    opacity: var(--carousel-opacity-active);
    transform: rotateY(0) scale(1);
}

.carousel__slide--next {
    opacity: var(--carousel-opacity-near);
    transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--next~.carousel__slide {
    opacity: var(--carousel-opacity-inactive);
    transform: translateX(-10px) rotateY(12deg) scale(0.9);
}
</style>