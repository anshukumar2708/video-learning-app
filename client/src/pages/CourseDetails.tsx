import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { COURSES } from "../data/courses";
import type { Course, Lesson } from "../types";

interface Progress {
    [lessonId: string]: boolean;
}

export default function CourseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [progress, setProgress] = useState<Progress>({});

    // Load course details
    useEffect(() => {
        const c = COURSES.find((c) => c.id === id);
        if (c) {
            setCourse(c);
            const saved = localStorage.getItem(`progress_${c.id}`);
            if (saved) setProgress(JSON.parse(saved));
        }
    }, [id]);

    // Save progress
    useEffect(() => {
        if (course) localStorage.setItem(`progress_${course.id}`, JSON.stringify(progress));
    }, [progress]);

    const handleComplete = (lessonId: string) => {
        setProgress((prev) => ({ ...prev, [lessonId]: true }));
    };

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const exists = cart.find((item: Course) => item.id === course?.id);
        if (!exists && course) {
            cart.push(course);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Added to cart!");
        } else {
            alert("Already in cart");
        }
    };

    const handleBuy = () => {
        const myCourses = JSON.parse(localStorage.getItem("myCourses") || "[]");
        if (!myCourses.find((c: Course) => c.id === course?.id) && course) {
            myCourses.push(course);
            localStorage.setItem("myCourses", JSON.stringify(myCourses));
            alert("Course purchased successfully!");
            navigate("/my-courses");
        } else {
            alert("Already purchased!");
        }
    };

    if (!course) return <p className="text-center mt-10">Course not found</p>;

    const total = course.lessons.length;
    const completed = Object.keys(progress).length;
    const progressPercent = Math.round((completed / total) * 100);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="bg-white rounded shadow p-4 mb-6">
                <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded" />
                <h1 className="text-2xl font-bold mt-4">{course.title}</h1>
                <p className="text-gray-600">By {course.instructor}</p>
                <p className="my-3 text-gray-700">{course.description}</p>
                <div className="flex gap-3">
                    <button onClick={handleAddToCart} className="bg-brand-500 text-white px-4 py-2 rounded">
                        Add to Cart
                    </button>
                    <button onClick={handleBuy} className="bg-green-500 text-white px-4 py-2 rounded">
                        Buy Now
                    </button>
                </div>

                <div className="mt-4 bg-gray-100 p-3 rounded">
                    <p className="font-medium">
                        Progress: {completed}/{total} lessons ({progressPercent}%)
                    </p>
                    <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                        <div
                            className="bg-brand-500 h-2 rounded-full"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Lesson List */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-lg font-semibold mb-3">Lessons</h2>
                    <ul className="space-y-2">
                        {course.lessons.map((lesson) => (
                            <li
                                key={lesson.id}
                                onClick={() => setSelectedLesson(lesson)}
                                className={`p-3 rounded cursor-pointer border ${progress[lesson.id] ? "bg-green-100 border-green-400" : "hover:bg-gray-100"
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span>{lesson.title}</span>
                                    {progress[lesson.id] && <span className="text-green-600 text-sm">✓ Done</span>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Video Player */}
                <div>
                    {selectedLesson ? (
                        <div className="bg-white p-3 rounded shadow">
                            <h3 className="font-semibold mb-2">{selectedLesson.title}</h3>
                            <video
                                src={selectedLesson.videoUrl}
                                controls
                                onEnded={() => handleComplete(selectedLesson.id)}
                                className="w-full rounded"
                            />
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">Select a lesson to start watching</p>
                    )}
                </div>
            </div>
        </div>
    );
}
