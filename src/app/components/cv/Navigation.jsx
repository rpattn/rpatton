"use client"
import Link from "next/link";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ACTIVE_BORDER = "border-lime-500 dark:border-blue-600";
const INACTIVE_BORDER = "border-gray-300";
const PROJECT_INACTIVE_BORDER = "border-blue-300";

const NAV_GROUPS = [
    {
        title: "Education",
        items: [
            { id: "uol", label: "University of Leeds", href: "#uol" },
            { id: "alevels", label: "A-Levels", href: "#alevels" },
        ],
    },
    {
        title: "Industry Experience",
        items: [{ id: "cummins", label: "Cummins", href: "#cummins" }],
    },
    {
        title: "Leadership Activities",
        items: [
            { id: "projectman", label: "Project Management | Cummins", href: "#projectman" },
            { id: "daringdash", label: "Daring Dash Competition", href: "#daringdash" },
            { id: "volunteering", label: "Volunteering", href: "#volunteering" },
        ],
    },
    {
        title: "Employment History",
        items: [
            { id: "bfb", label: "British Food Box", href: "#bfb" },
            { id: "edge", label: "The Edge", href: "#edge" },
        ],
    },
    {
        title: "Skills",
        items: [
            { id: "technical", label: "Technical", href: "#technical" },
            { id: "projectman2", label: "Project Management", href: "#projectman2" },
        ],
    },
];

const PROJECT_LINKS = [
    { href: "/projects#searchmap", label: "Search Map" },
    { href: "/projects#viseng", label: "VisEng" },
];

const Navigation = ({ activeSection, isPinned }) => {
    const containerClass = `mt-4 hidden xl:block${isPinned ? " lg:fixed" : ""}`;
    const transformStyle = isPinned ? { transform: "translate(0px,-60px)" } : {};
    return (
        <ul className={containerClass} style={transformStyle}>
            {NAV_GROUPS.map((group) => (
                <React.Fragment key={group.title}>
                    <li className="mt-2 mb-1">
                        <strong>{group.title}</strong>
                    </li>
                    <ul className="ml-4 mb-2">
                        {group.items.map((item) => {
                            const borderClass = activeSection === item.id ? ACTIVE_BORDER : INACTIVE_BORDER;
                            return (
                                <div key={item.id} className={`border-2 w-0 mt-0 ${borderClass}`}>
                                    <li className="ml-3 w-48">
                                        <Link href={item.href}>{item.label}</Link>
                                    </li>
                                </div>
                            );
                        })}
                    </ul>
                </React.Fragment>
            ))}
            <li className="mt-2">
                <strong>Hobbies & Interests</strong>
            </li>
            <li className="mt-6">
                <strong>Projects</strong>
            </li>
            <ul className="ml-4 mb-2">
                {PROJECT_LINKS.map(({ href, label }) => (
                    <div key={label} className={`border-2 w-0 mt-0 ${PROJECT_INACTIVE_BORDER}`}>
                        <li className="ml-3 w-48">
                            <Link href={href} className="flex">
                                {label} <AiOutlineInfoCircle className=" fill-blue-900 m-1 w-4 h-4" />
                            </Link>
                        </li>
                    </div>
                ))}
            </ul>
        </ul>
    );
};

export default Navigation;
