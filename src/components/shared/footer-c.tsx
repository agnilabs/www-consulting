import { FooterLink } from "@/components/ui/footer-link";
import { siteLinks } from "@/config/site";

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Variation C: "Inverted Layers"
 * Black top zone (CTA + links in orange) → orange bottom zone (black wordmark).
 * Dual-tone drama with reorganized hierarchy.
 */
export const FooterC = () => {
  return (
    <footer
      style={{
        marginTop: "4rem",
        overflow: "hidden",
      }}
    >
      {/* Black Zone — CTA & Links */}
      <div
        className="dark-section"
        style={{
          background: "#000",
          color: "#FF4E02",
          padding: "clamp(3rem, 6vw, 5rem) 2rem",
        }}
      >
        <div
          className="footer-c-top"
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(2rem, 4vw, 4rem)",
            alignItems: "end",
          }}
        >
          {/* Left: CTA */}
          <div>
            <a
              href={`mailto:${siteLinks.email}`}
              style={{
                display: "block",
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#FF4E02",
                textDecoration: "none",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                transition: "opacity 0.2s ease",
              }}
            >
              {siteLinks.email}
            </a>
          </div>

          {/* Right: Links stacked */}
          <div
            className="footer-c-links"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1.25rem",
              }}
            >
              <FooterLink href={siteLinks.socials.linkedin} external>
                linkedin
              </FooterLink>
              <FooterLink href={siteLinks.socials.twitter} external>
                twitter/x
              </FooterLink>
              <FooterLink href="/blog">blog</FooterLink>
              <FooterLink href="/rss.xml">rss</FooterLink>
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                opacity: 0.4,
                display: "flex",
                gap: "1rem",
              }}
            >
              <span>© {CURRENT_YEAR} AGNI LABS</span>
              <span>NEW YORK CITY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Orange Zone — Wordmark */}
      <div
        style={{
          background: "#FF4E02",
          position: "relative",
          overflow: "hidden",
          height: "clamp(8rem, 18vw, 16rem)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "1rem",
        }}
      >
        <span
          style={{
            fontSize: "clamp(4rem, 13vw, 13rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 0.85,
            textTransform: "uppercase",
            background:
              "linear-gradient(to bottom, #000 0%, #000 40%, rgba(0, 0, 0, 0.3) 80%, transparent 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          AGNI LABS
        </span>
      </div>
    </footer>
  );
};
