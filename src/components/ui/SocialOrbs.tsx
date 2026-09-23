import { SocialGlyph } from "@/components/brand/SocialGlyph"
import { socialLinks } from "@/data/social"

type SocialOrbsProps = {
  size?: "md" | "lg"
  labeled?: boolean
}

export function SocialOrbs({ size = "md", labeled = false }: SocialOrbsProps) {
  return (
    <ul className={`social-orbs${size === "lg" ? " social-orbs-lg" : ""}`}>
      {socialLinks.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            rel="noreferrer noopener"
            target="_blank"
            className="social-orb-hit"
            aria-label={link.label}
          >
            <span className="social-orb" data-network={link.id}>
              <span className="social-orb-icon">
                <SocialGlyph network={link.id} />
              </span>
            </span>
            {labeled ? (
              <span aria-hidden="true" className="social-orb-caption">
                {link.label}
              </span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  )
}
