const fs = require('fs');
const code = fs.readFileSync('src/App.jsx', 'utf8');
const match = code.match(/const css = `([\s\S]*?)`;/);
if (match) {
  let css = match[1];
  // Add new styles for hero photo
  css = css.replace('.hero__right {\n  display: flex;\n  flex-direction: column;\n}', `.hero__right {\n  display: flex;\n  flex-direction: column;\n  border-left: var(--border-heavy);\n}`);
  
  const heroPhotoCss = `
.hero__photo-container {
  border-bottom: var(--border-heavy);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--ink);
  overflow: hidden;
}

.hero__photo {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.2);
  mix-blend-mode: luminosity;
  opacity: 0.9;
}

.hero__stats-row {
  display: flex;
  flex: 1;
}

.hero__stats-row .hero__stat {
  flex: 1;
}

.hero__stats-row .hero__stat:first-child {
  border-right: var(--border-heavy);
}

@media (max-width: 900px) {
  .hero__stats-row {
    flex-direction: column;
  }
  .hero__stats-row .hero__stat:first-child {
    border-right: none;
    border-bottom: var(--border-heavy);
  }
}
`;
  css = css.replace('.hero__stat {\n  flex: 1;', heroPhotoCss + '\n.hero__stat {\n  flex: 1;');
  
  fs.writeFileSync('src/index.css', css.trim());
}
