"use client"
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const defaultImageStyle = {
    width: "100%",
    height: "auto",
};

const ProjectImageCard = ({
    images = [],
    link,
    index,
    previousVisible = false,
    onVisibilityChange = () => {},
    showExtraImage = false,
    threshold = 0.3,
    imageStyle = defaultImageStyle,
}) => {
    const { ref, inView } = useInView({ threshold });

    useEffect(() => {
        onVisibilityChange(index, inView);
        return () => onVisibilityChange(index, false);
    }, [index, inView, onVisibilityChange]);

    if (!images || images.length === 0) {
        return null;
    }

    const secondaryImages = images.slice(1, Math.min(images.length, 3));
    const gridColumnClass = secondaryImages.length > 1 ? "grid-cols-2" : "grid-cols-1";
    const extraImage = showExtraImage && images.length > 3 ? images[3] : null;

    const highlightClass = inView
        ? index > 0
            ? previousVisible
                ? ""
                : "md:shadow-xl md:scale-105 md:-translate-x-3 lg:translate-x-0"
            : "md:shadow-xl"
        : "";

    return (
        <div ref={ref} id={link} className={`p-4 pt-8 transition-all mb-20 ${highlightClass}`}>
            <Image
                unoptimized
                src={images[0].src}
                style={imageStyle}
                width={images[0].w}
                height={images[0].h}
                alt="todo"
            />
            {secondaryImages.length ? (
                <div className={`grid ${gridColumnClass}`}>
                    {secondaryImages.map((image, secondaryIdx) => (
                        <div
                            key={`${link ?? index}-secondary-${secondaryIdx}`}
                            className="col-span-1"
                        >
                            <Image
                                src={image.src}
                                style={imageStyle}
                                width={image.w}
                                height={image.h}
                                alt="todo"
                            />
                        </div>
                    ))}
                </div>
            ) : null}
            {extraImage ? (
                <Image
                    unoptimized
                    src={extraImage.src}
                    style={imageStyle}
                    width={extraImage.w}
                    height={extraImage.h}
                    alt="todo"
                />
            ) : null}
        </div>
    );
};

export default ProjectImageCard;
