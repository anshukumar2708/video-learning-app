import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Course {
    id: string;
    title: string;
    instructor: string;
    price: number;
    image: string;
}

const Cart: React.FC = () => {
    const navigate = useNavigate();

    // ✅ Dummy cart data
    const [cartItems, setCartItems] = useState<Course[]>([
        {
            id: "1",
            title: "React for Beginners",
            instructor: "Anshu Singh",
            price: 499,
            image: "https://placehold.co/600x400?text=React+Course",
        },
        {
            id: "2",
            title: "Mastering Node.js",
            instructor: "John Doe",
            price: 699,
            image: "https://placehold.co/600x400?text=Node.js+Course",
        },
        {
            id: "3",
            title: "Next.js Advanced",
            instructor: "Sarah Lee",
            price: 899,
            image: "https://placehold.co/600x400?text=Next.js+Course",
        },
    ]);

    // ✅ Calculate total
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    // ✅ Remove from cart
    const handleRemove = (id: string): void => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
    };

    // ✅ Proceed to checkout
    const handleCheckout = (): void => {
        alert("✅ Order placed successfully!");
        setCartItems([]);
        navigate("/my-courses");
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
                    🛒 My Cart
                </h2>

                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">
                            Your cart is empty. Start adding some courses!
                        </p>
                        <button
                            onClick={() => navigate("/courses")}
                            className="bg-brand-500 text-white px-5 py-2 rounded-lg hover:bg-brand-600 transition"
                        >
                            Browse Courses
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {cartItems.map((course) => (
                                <div
                                    key={course.id}
                                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                                >
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4 flex flex-col justify-between h-full">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                                {course.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                By {course.instructor}
                                            </p>
                                            <p className="text-brand-600 font-bold mt-2">
                                                ₹{course.price}
                                            </p>
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            <button
                                                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
                                                onClick={() => handleRemove(course.id)}
                                            >
                                                Remove
                                            </button>
                                            <button
                                                className="flex-1 bg-brand-500 text-white py-2 rounded-lg hover:bg-brand-600 transition"
                                                onClick={handleCheckout}
                                            >
                                                Buy Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Section */}
                        <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-6">
                            <p className="text-xl font-semibold text-gray-800">
                                Total:{" "}
                                <span className="text-brand-600 font-bold">₹{totalPrice}</span>
                            </p>
                            <button
                                className="mt-4 sm:mt-0 bg-brand-500 text-white px-8 py-3 rounded-lg hover:bg-brand-600 transition"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
