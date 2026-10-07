import { SocialWorkDossier, SocialWorkRecord } from "@/components/labor-social/SocialWorkList"
import { socialWorkItems, socialWorkLead } from "@/data/social-work"
import { SITE_LOCATION } from "@/data/site"

export function SocialWorkArchive() {
  return (
    <section
      aria-labelledby="labor-social-page-heading"
      className="pb-[var(--space-3xl)] pt-[calc(var(--header-offset)+var(--space-xl))]"
    >
      <div className="editorial-shell">
        <header className="col-span-4 lg:col-span-8">
          <h1 id="labor-social-page-heading" className="home-section-display">
            Labor social
          </h1>
          <p className="social-work-lead">{socialWorkLead}</p>
          <p className="social-work-dateline">
            {SITE_LOCATION}
            <span aria-hidden="true"> · </span>
            {socialWorkItems.length} actividades
          </p>
        </header>
        <div className="col-span-4 mt-[var(--space-2xl)] lg:col-span-12">
          <SocialWorkDossier items={socialWorkItems} />
          <SocialWorkRecord items={socialWorkItems} />
        </div>
      </div>
    </section>
  )
}
