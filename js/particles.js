/**
 * Golden Stardust & Ambient Light Particles Canvas Engine
 * Creates floating golden sparks, glowing fireflies, and ambient light motes.
 */

class IslamicParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 55;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouseX = this.width / 2;
    this.mouseY = this.height / 2;
    this.isHovering = false;
    this.animationFrameId = null;

    this.colors = [
      'rgba(243, 227, 172, ', // Pale gold
      'rgba(201, 162, 39, ',  // Royal gold
      'rgba(223, 186, 75, ',  // Bright gold
      'rgba(255, 248, 220, '  // Ivory white shimmer
    ];

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.start();
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    // Dynamic particle count based on screen size
    if (this.width < 768) {
      this.numParticles = 30;
    } else {
      this.numParticles = 60;
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(this.getNewParticle());
    }
  }

  getNewParticle(resetToBottom = false) {
    const colorBase = this.colors[Math.floor(Math.random() * this.colors.length)];
    const size = Math.random() * 2.8 + 0.8;
    return {
      x: Math.random() * this.width,
      y: resetToBottom ? this.height + 10 : Math.random() * this.height,
      size: size,
      baseAlpha: Math.random() * 0.6 + 0.25,
      alpha: 0,
      colorBase: colorBase,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -(Math.random() * 0.65 + 0.25),
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseOffset: Math.random() * Math.PI * 2,
      glowMultiplier: Math.random() > 0.8 ? 2.5 : 1
    };
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.isHovering = true;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });
  }

  update() {
    const time = Date.now() * 0.0015;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx + Math.sin(time + p.pulseOffset) * 0.3;
      p.y += p.vy;

      // Pulse opacity
      p.alpha = Math.max(0, p.baseAlpha * (0.6 + 0.4 * Math.sin(time * 3 + p.pulseOffset)));

      // Subtle mouse interaction (soft repulsion)
      if (this.isHovering) {
        const dx = p.x - this.mouseX;
        const dy = p.y - this.mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100 * 0.8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }

      // Reset when particle goes off top or sides
      if (p.y < -20 || p.x < -20 || p.x > this.width + 20) {
        this.particles[i] = this.getNewParticle(true);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const radius = p.size;

      // Glow gradient for select particles
      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3.5 * p.glowMultiplier);
      gradient.addColorStop(0, `${p.colorBase}${p.alpha})`);
      gradient.addColorStop(0.4, `${p.colorBase}${p.alpha * 0.45})`);
      gradient.addColorStop(1, 'transparent');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius * 3.5 * p.glowMultiplier, 0, Math.PI * 2);
      this.ctx.fill();

      // Sharp center core
      this.ctx.fillStyle = `${p.colorBase}${Math.min(1, p.alpha * 1.5)})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius * 0.8, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  render() {
    this.update();
    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.render());
  }

  start() {
    if (!this.animationFrameId) {
      this.render();
    }
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new IslamicParticleSystem('particles-canvas');
});
