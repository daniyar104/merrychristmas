document.addEventListener('DOMContentLoaded', () => {
    initSnow();
    initScrollAnimations();
    initScratchCard();
    setRandomWish();
});

const WISHES = [
    "В новом году тебя ждет<br>неожиданное путешествие!",
    "Тебя ждет головокружительный<br>успех в карьере!",
    "Встретишь человека,<br>который изменит твою жизнь!",
    "Твоя заветная мечта<br>скоро сбудется!",
    "Финансовый поток накроет<br>тебя с головой!",
    "Жди приятных сюрпризов<br>каждый день!",
    "Удача будет следовать<br>за тобой по пятам!",
    "Откроешь в себе<br>новый талант!"
];

function setRandomWish() {
    const messageElement = document.getElementById('scratch-message');
    if (messageElement) {
        const randomIndex = Math.floor(Math.random() * WISHES.length);
        messageElement.innerHTML = WISHES[randomIndex];
    }
}

function initScratchCard() {
    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    let isDrawing = false;

    // Set canvas size to match container
    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        // Fill with silver color
        ctx.fillStyle = '#C0C0C0'; // Silver
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add text "Сотри меня!"
        ctx.font = '24px "Montserrat", sans-serif';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText('Потри меня! 🪙', canvas.width / 2, canvas.height / 2);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Scratch logic
    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function scratch(e) {
        if (!isDrawing) return;
        e.preventDefault(); // Prevent scrolling on touch

        const { x, y } = getMousePos(e);

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
    }

    // Event Listeners
    canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', () => { isDrawing = false; });
    canvas.addEventListener('mouseleave', () => { isDrawing = false; });

    canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    canvas.addEventListener('touchend', () => { isDrawing = false; });
}

function initSnow() {
    const container = document.getElementById('snow-container');
    const snowflakeCount = 50;

    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake(container);
    }
}

function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄';
    snowflake.style.position = 'absolute';
    snowflake.style.color = 'white';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = (Math.random() * 20 + 10) + 'px';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
    snowflake.style.animationName = 'fall';
    snowflake.style.animationTimingFunction = 'linear';
    snowflake.style.animationIterationCount = 'infinite';

    // Add custom keyframe for falling if needed, or use JS for positions
    // Let's use CSS transition for simplicity in valid css, but here we can inject style
    // Actually, let's create a style element for the keyframes if it doesn't exist
    // Or just append it to styles.css.
    // Better to use JS to animate or simple CSS.
    // Let's rely on CSS defined in style or inject it here.

    // We'll add the keyframe to the style element on the fly
    if (!document.getElementById('snow-style')) {
        const style = document.createElement('style');
        style.id = 'snow-style';
        style.textContent = `
            @keyframes fall {
                0% { transform: translateY(-10vh) rotate(0deg); }
                100% { transform: translateY(110vh) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Random delay
    snowflake.style.animationDelay = Math.random() * 5 + 's';

    container.appendChild(snowflake);
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}
