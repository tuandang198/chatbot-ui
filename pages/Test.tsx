import React, { useEffect, useRef } from 'react';

const AutoScrollDown: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            const scrollHeight = scrollContainer.scrollHeight;
            const height = scrollContainer.clientHeight;
            const maxScrollTop = scrollHeight - height;
            let animationFrameId: number;

            const scroll = () => {
                if (scrollContainer.scrollTop < maxScrollTop) {
                    scrollContainer.scrollTop += 1; // Adjust the scrolling speed as needed
                    animationFrameId = requestAnimationFrame(scroll);
                }
            };

            scroll();

            return () => {
                cancelAnimationFrame(animationFrameId);
            };
        }
    }, []);

    return (
        <div
            ref={scrollContainerRef}
            style={{ height: '300px', overflow: 'auto' }}
        >
            {/* Add your content here */}
        </div>
    );
};

export default AutoScrollDown;
