import { FooterLink } from "@/components/ui/footer-link";
import { FooterSectionHeader } from "@/components/ui/footer-section-header";
import { siteLinks } from "@/config/site";

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer
      className="dark-section"
      style={{
        background: "black",
        color: "var(--color-primary)",
        marginTop: "4rem",
        overflow: "hidden",
      }}
    >
      {/* Top info bar */}
      <div
        className="footer-info-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "2rem",
          borderBottom: "1px solid rgba(255, 78, 2, 0.2)",
        }}
      >
        {/* Social links */}
        <div className="footer-social">
          <FooterSectionHeader>social</FooterSectionHeader>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
            }}
          >
            <FooterLink href={siteLinks.socials.linkedin} external>
              linkedin
            </FooterLink>
            <FooterLink href={siteLinks.socials.twitter} external>
              twitter/x
            </FooterLink>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-contact" style={{ textAlign: "center" }}>
          <FooterSectionHeader>inquiries</FooterSectionHeader>
          <FooterLink href={`mailto:${siteLinks.email}`}>
            {siteLinks.email}
          </FooterLink>
        </div>

        {/* Copyright & Location */}
        <div className="footer-meta" style={{ textAlign: "right" }}>
          <span className="footer-meta-text" style={{ display: "block", marginBottom: "0.25rem" }}>
            © {CURRENT_YEAR} AGNI LABS
          </span>
          <span className="footer-meta-text">
            NEW YORK CITY
          </span>
        </div>
      </div>

      {/* Large gradient AGNI text */}
      <div
        className="footer-hero-text"
        style={{
          position: "relative",
          overflow: "hidden",
          height: "clamp(12rem, 30vw, 22rem)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "1rem",
        }}
      >
        <span
          className="agni-large-text"
          style={{
            fontSize: "clamp(6rem, 20vw, 16rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            textTransform: "uppercase",
            background: "linear-gradient(to bottom, #FF4E02 0%, #FF4E02 40%, rgba(255, 78, 2, 0.3) 80%, transparent 100%)",
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
