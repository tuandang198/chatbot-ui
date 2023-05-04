export const scrollToBottom = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollDuration = 500; // Duration of the scroll animation in milliseconds
    const scrollStep = Math.PI / (scrollDuration / 15);
    let scrollCount = 0;
    let scrollPosition = 0;

    const scrollStepFunc = () => {
        if (document.documentElement.scrollTop < (scrollHeight - windowHeight)) {

            scrollCount += 1;
            scrollPosition = Math.round(
                scrollHeight - windowHeight - (scrollHeight - windowHeight) * Math.cos(scrollCount * scrollStep)
            );

            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });

            requestAnimationFrame(scrollStepFunc);
        }
    };

    requestAnimationFrame(scrollStepFunc);
};
