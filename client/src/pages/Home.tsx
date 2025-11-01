import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { COURSES } from "../data/courses";
import { isAuth } from "../utils/auth";
import type { Course } from "../types";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleAddToCart = (course: Course) => {
        if (!isAuth()) {
            navigate("/login");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const exists = cart.find((item: Course) => item.id === course.id);
        if (exists) {
            alert("Already in cart!");
        } else {
            cart.push(course);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Added to cart!");
        }
    };

    return (
        <div className="min-h-screen">
            {/* ✅ Hero Section */}
            <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Learn Anytime, Anywhere with <span className="text-yellow-300">LearnHub</span>
                    </h1>
                    <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-100">
                        Upgrade your skills with hundreds of expert-led online courses. Start your learning journey today!
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/courses"
                            className="bg-white text-brand-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                        >
                            Explore Courses
                        </Link>
                        {!isAuth() && (
                            <Link
                                to="/register"
                                className="bg-yellow-400 text-brand-800 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
                            >
                                Join for Free
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* ✅ Featured Courses */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Featured Courses</h2>
                    <Link to="/courses" className="text-brand-600 hover:underline text-sm font-medium">
                        View all
                    </Link>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {COURSES.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
                        >
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-44 object-cover"
                            />
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                                <p className="text-gray-500 text-sm mt-1">{course.instructor}</p>
                                <p className="text-gray-600 mt-3 flex-grow">{course.description}</p>

                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-brand-600 font-bold text-lg">
                                        ₹{course.price}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAddToCart(course)}
                                            className="bg-brand-500 text-white px-3 py-1 rounded hover:bg-brand-600 text-sm"
                                        >
                                            Add to Cart
                                        </button>
                                        <Link
                                            to={`/course/${course.id}`}
                                            className="border border-brand-500 text-brand-500 px-3 py-1 rounded hover:bg-brand-50 text-sm"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ✅ Why Choose Us */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                        Why Choose <span className="text-brand-600">LearnHub?</span>
                    </h2>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="text-brand-600 text-4xl mb-3">🎓</div>
                            <h3 className="font-semibold text-lg">Expert Instructors</h3>
                            <p className="text-gray-600 text-sm mt-2">
                                Learn from industry professionals who are passionate about teaching.
                            </p>
                        </div>

                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="text-brand-600 text-4xl mb-3">📱</div>
                            <h3 className="font-semibold text-lg">Flexible Learning</h3>
                            <p className="text-gray-600 text-sm mt-2">
                                Study at your own pace, anytime and anywhere with mobile access.
                            </p>
                        </div>

                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="text-brand-600 text-4xl mb-3">💼</div>
                            <h3 className="font-semibold text-lg">Career Growth</h3>
                            <p className="text-gray-600 text-sm mt-2">
                                Boost your skills and take your career to the next level.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ Call to Action */}
            <section className="bg-brand-600 text-white text-center py-16">
                <h2 className="text-3xl font-bold mb-4">Start Learning Today!</h2>
                <p className="text-gray-100 mb-6">
                    Join thousands of learners and unlock your potential with LearnHub.
                </p>
                <Link
                    to="/register"
                    className="bg-yellow-400 text-brand-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
                >
                    Get Started for Free
                </Link>
            </section>
        </div>
    );
};

export default Home;
