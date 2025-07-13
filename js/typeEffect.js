// TypeEffectManager: Modular typing effect for hero section
class TypeEffectManager {
    constructor({
        elementId = 'typed-text',
        phrases = [],
        typingSpeed = 80,
        pause = 1200
    } = {}) {
        this.el = document.getElementById(elementId);
        this.phrases = phrases.length ? phrases : [
            'go viral.',
            'stand out.',
            'get noticed.',
            'make an impact.',
            'drive results.',
            'capture attention.',
            'spark conversations.',
            'build connections.',
            'create buzz.',
        ];
        this.typingSpeed = typingSpeed;
        this.pause = pause;
        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isRunning = false;
        this.timeoutId = null;
    }

    start() {
        if (!this.el || this.isRunning) return;
        this.isRunning = true;
        this.type();
    }

    stop() {
        this.isRunning = false;
        if (this.timeoutId) clearTimeout(this.timeoutId);
    }

    reset() {
        this.stop();
        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        if (this.el) this.el.textContent = '';
    }

    setPhrases(phrases) {
        this.phrases = phrases;
        this.reset();
        this.start();
    }

    type() {
        if (!this.isRunning || !this.el) return;
        const currentPhrase = this.phrases[this.phraseIndex];
        if (this.isDeleting) {
            this.el.textContent = currentPhrase.substring(0, this.charIndex - 1);
            this.charIndex--;
            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
                this.timeoutId = setTimeout(() => this.type(), 400);
            } else {
                this.timeoutId = setTimeout(() => this.type(), this.typingSpeed / 2);
            }
        } else {
            this.el.textContent = currentPhrase.substring(0, this.charIndex + 1);
            this.charIndex++;
            if (this.charIndex === currentPhrase.length) {
                this.isDeleting = true;
                this.timeoutId = setTimeout(() => this.type(), this.pause);
            } else {
                this.timeoutId = setTimeout(() => this.type(), this.typingSpeed);
            }
        }
    }
}

// Initialize TypeEffectManager on DOMContentLoaded
// and expose for global use

document.addEventListener('DOMContentLoaded', () => {
    window.typeEffectManager = new TypeEffectManager();
    window.typeEffectManager.start();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TypeEffectManager;
}