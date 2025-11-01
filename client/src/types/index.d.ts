export interface Lesson {
  id: string;
  title: string;
  duration: number;
  videoUrl: string;
}


export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  image: string;
  description: string;
  lessons: Lesson[];
}


export interface User {
id: string;
name: string;
email: string;
password?: string;
}