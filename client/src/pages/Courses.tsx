import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { COURSES } from "../data/courses";
import { isAuth } from "../utils/auth";
import type { Course } from "../types";

const Courses: React.FC = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 6;

    // 🔹 Extract categories dynamically
    const categories = ["All", ...new Set(COURSES.map((c) => c.category))];

    // 🔹 Filter courses based on search + category
    const filteredCourses = COURSES.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // 🔹 Pagination logic
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    const startIndex = (currentPage - 1) * coursesPerPage;
    const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

    // 🔹 Add to Cart
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
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* 🔍 Search & Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                    {categories.map((cat) => (
                        <option key={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* 🧠 Courses Grid */}
            {paginatedCourses.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {paginatedCourses.map((course) => (
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
                                <p className="text-gray-600 mt-3 flex-grow text-sm">{course.description}</p>

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
            ) : (
                <p className="text-gray-500 text-center mt-10">No courses found.</p>
            )}

            {/* 📄 Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-lg border ${currentPage === i + 1
                                ? "bg-brand-500 text-white border-brand-500"
                                : "bg-white text-brand-600 border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Courses;
