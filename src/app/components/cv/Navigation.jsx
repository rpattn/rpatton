"use client"
import Link from "next/link";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ACTIVE_BORDER = "border-lime-500 dark:border-blue-600";
const INACTIVE_BORDER = "border-gray-300";
const PROJECT_INACTIVE_BORDER = "border-blue-300";

const NAV_GROUPS = [
    {
        title: "Overview",
        items: [
            { id: "statement", label: "Statement", href: "#statement" },
            { id: "skills", label: "Skills", href: "#skills" },
        ],
    },
    {
        title: "Experience",
        items: [{ id: "experience", label: "Experience", href: "#experience" }],
    },
    {
        title: "Projects",
        items: [{ id: "projects", label: "Projects", href: "#projects" }],
    },
    {
        title: "Education",
        items: [{ id: "education", label: "Education", href: "#education" }],
    },
    {
        title: "Hobbies & Interests",
        items: [{ id: "interests", label: "Hobbies & Interests", href: "#interests" }],
    },
];

const PORTFOLIO_LINKS = [
    { href: "https://next-cmms.vercel.app/", label: "NextCMMS" },
    { href: "https://ddm-iota.vercel.app/", label: "Digital_Design_Manager" },
    { href: "https://searchmap.web.app/", label: "Search Map" },
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
            <li className="mt-6">
                <strong>Featured Links</strong>
            </li>
            <ul className="ml-4 mb-2">
                {PORTFOLIO_LINKS.map(({ href, label }) => (
                    <div key={label} className={`border-2 w-0 mt-0 ${PROJECT_INACTIVE_BORDER}`}>
                        <li className="ml-3 w-48">
                            <Link href={href} className="flex" target="_blank" rel="noopener noreferrer">
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
