interface FooterProps {
  s: (index: number) => string;
}

export default function Footer({ s }: FooterProps) {
  return (
    <footer className={`footer ${s(6)}`} data-index={6}>
      <span className="footer__copy">
        © {new Date().getFullYear()} Syed Firas Peerzada.
      </span>
      <span className="footer__tagline">Designed and built with care.</span>
      <span className="footer__location">
        Karnataka, India
      </span>
    </footer>
  );
}
