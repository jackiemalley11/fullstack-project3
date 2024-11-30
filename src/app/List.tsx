import Link from 'next/link';
import { Technology, ComponentProps, Courses } from "@/tools/data.model";

export function List({ technologies, courses }: ComponentProps) {
    return (
        <div className="flex flex-wrap">
            {/* Technologies Section */}
            <div className="flex flex-col flex-nowrap pr-5">
                <div className="py-4">Technologies:</div>
                {technologies.map((technology: Technology, n: number) => (
                    <div
                        key={n}
                        className="ml-8 pl-2.5 py-0.5 border-l-4 border-solid border-accent"
                    >
                        <Link
                            href={`/tech/${technology._id}`}
                            className="text-accent font-bold hover:underline"
                        >
                            {technology.name}
                        </Link>
                    </div>
                ))}
            </div>

            {/* Courses Section */}
            <div className="flex flex-col flex-nowrap pr-5">
                <div className="py-4">Courses:</div>
                {courses.map((course: Courses, n: number) => (
                    <div
                        key={n}
                        className="ml-8 pl-2.5 py-0.5 border-l-4 border-solid border-accent"
                    >
                        <Link
                            href={`/tech/${course._id}`}
                            className="text-accent font-bold hover:underline"
                        >
                            {course.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}