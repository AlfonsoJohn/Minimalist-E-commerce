import "./Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <div className="footer-links">
          <a href="https://example.com">About</a>
          <a href="https://example.com">Store locator</a>
          <a href="https://example.com">FAQs</a>
          <a href="https://example.com">News</a>
          <a href="https://example.com">Careers</a>
          <a href="https://example.com">Contact Us</a>
        </div>
        <p className="love">
          Design &nbsp; by{" "}
          <a
            target="_blank"
            rel="noreferrer"
            style={{ color: "white" }}
            href="https://github.com/Abderraouf-Rahmani"
          >
            &nbsp; Abderraouf
          </a>
        </p>
      </footer>
    </>
  );
}

export default Footer;
