import React, { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    name: string;
    email: string;
    userType: "Admin" | "Student";
    courses: number;
    completed: number;
    inProgress: number;
}

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        name: "Anshu Singh",
        email: "anshu@example.com",
        userType: "Student",
        courses: 12,
        completed: 5,
        inProgress: 7,
    });
    const [profileImg, setProfileImg] = useState<string>(
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    );

    // Load stored image if available
    useEffect(() => {
        const savedImg = localStorage.getItem("profileImg");
        if (savedImg) setProfileImg(savedImg);
    }, []);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setProfileImg(result);
                localStorage.setItem("profileImg", result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = (): void => {
        localStorage.removeItem("isAuth");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col items-center text-center">
                    {/* Profile Image */}
                    <div className="relative">
                        <img
                            src={profileImg}
                            alt="Profile"
                            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-brand-500 shadow-md"
                        />
                        <label
                            htmlFor="file-upload"
                            className="absolute bottom-0 right-1 bg-brand-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-brand-600 transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    {/* User Info */}
                    <div className="mt-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                            {user.name}
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>
                        <span
                            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${user.userType === "Admin"
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                                }`}
                        >
                            {user.userType}
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-gray-200 my-6"></div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-4 w-full">
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-800 text-lg">
                                {user.courses}
                            </span>
                            <span className="text-gray-500 text-xs">Courses</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-800 text-lg">
                                {user.completed}
                            </span>
                            <span className="text-gray-500 text-xs">Completed</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-800 text-lg">
                                {user.inProgress}
                            </span>
                            <span className="text-gray-500 text-xs">In Progress</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
                        <button
                            className="flex-1 bg-brand-500 text-white py-2 rounded-lg hover:bg-brand-600 transition"
                            onClick={() => navigate("/my-courses")}
                        >
                            My Courses
                        </button>
                        <button
                            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
