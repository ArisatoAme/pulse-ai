
export interface Feature {
    icon: React.ElementType;
    title: string;
    desc: string;
}

export interface Testimonial {
    name: string;
    role: string;
    text: string;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
