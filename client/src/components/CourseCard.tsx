
import { Link } from 'react-router-dom'
import type { Course } from '../types'


interface Props {
    course: Course
}


export default function CourseCard({ course }: Props) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-44 object-cover" />
            <div className="p-4">
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.instructor}</p>
                <div className="mt-3 flex items-center justify-between">
                    <div className="text-lg font-bold">₹{course.price}</div>
                    <Link to={`/course/${course.id}`} className="px-3 py-1 text-sm bg-brand-500 text-white rounded">View</Link>
                </div>
            </div>
        </div>
    )
}