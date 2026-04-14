/**
 * resumeInsights.ts
 * ─────────────────
 * Pure functions that take backend analysis data and return
 * human-readable paragraph strings + structured tips.
 * Works with BOTH old and new backend — derives missing metrics
 * from available data when new modules are absent.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

// ── helpers ──────────────────────────────────────────────────
const pct = (n: number, t: number) => t > 0 ? Math.round((n / t) * 100) : 0;
const grade = (s: number) => s >= 85 ? "excellent" : s >= 70 ? "good" : s >= 55 ? "moderate" : s >= 40 ? "below average" : "poor";
const gradeStrong = (s: number) => s >= 85 ? "strong" : s >= 70 ? "solid" : s >= 55 ? "average" : "weak";

// ── OVERALL PERFORMANCE ──────────────────────────────────────
export function generateOverallInsight(d: any): string {
  const rs  = d?.resume_score?.score       ?? 0;
  const ats = d?.ats_compatibility?.score  ?? 0;
  const ts  = d?.technical_skills_compatibility?.overall_score ?? 0;
  const es  = d?.experience_analysis?.score ?? 0;
  const avg = Math.round((rs + ats + ts + es) / 4);
  const domain = d?.technical_skills_compatibility?.target_domain ?? "Software Engineer";
  const level  = d?.candidate_level?.level ?? "Entry-Level";
  const skills = d?.technical_skills_compatibility?.total_skills_identified ?? 0;

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (ats >= 70) strengths.push(`your ATS score of ${ats}/100 means recruiters' screening software can parse your resume cleanly`);
  else weaknesses.push(`your ATS score is only ${ats}/100 — many automated screeners may reject the resume before a human sees it`);

  if (ts >= 65) strengths.push(`your technical breadth (${skills} skills) aligns well with a ${domain} role`);
  else weaknesses.push(`your technical skills coverage of ${ts}/100 for ${domain} roles has notable gaps`);

  if (es >= 50) strengths.push(`your experience depth score of ${es}/100 reflects real project exposure`);
  else weaknesses.push(`your experience depth score of ${es}/100 suggests limited hands-on or professional work`);

  if (rs >= 65) strengths.push(`your overall resume score of ${rs}/100 is above average`);

  const open = `Your resume currently scores ${avg}/100 on average across all four dimensions, placing you at the ${level} level.`;
  const pos  = strengths.length > 0 ? ` On the positive side, ${strengths.join("; ")}. ` : " ";
  const neg  = weaknesses.length > 0 ? `However, ${weaknesses.join("; and ")}. ` : "";
  const close = avg >= 70
    ? "With a few targeted improvements — especially in writing quality and keyword optimisation — you can push into the top 20% of candidates for your target role."
    : avg >= 50
    ? "The profile has a solid foundation but needs meaningful improvements in presentation and technical coverage to become competitive for shortlisting."
    : "This resume needs structured work across multiple dimensions before it can compete effectively in shortlisting. Focus on the Roadmap tab for a prioritised action plan.";

  return open + pos + neg + close;
}

// ── ROADMAP SUMMARY (replaces "Looking Strong") ───────────────
export function generateRoadmapSummary(d: any): string {
  const rs  = d?.resume_score?.score       ?? 0;
  const ats = d?.ats_compatibility?.score  ?? 0;
  const ts  = d?.technical_skills_compatibility?.overall_score ?? 0;
  const es  = d?.experience_analysis?.score ?? 0;
  const bq  = d?.bullet_quality;
  const dp  = d?.digital_presence;
  const cert = d?.certifications;
  const roadmap = d?.improvement_roadmap;

  // If roadmap is empty/locked, generate our own summary
  const hasRoadmap = Array.isArray(roadmap) && roadmap.length > 0;

  const positives: string[] = [];
  const concerns: string[] = [];

  // Score signals
  if (rs >= 75)  positives.push(`a strong resume quality score of ${rs}/100`);
  if (ats >= 75) positives.push(`clean ATS formatting (${ats}/100) that passes automated screening`);
  if (ts >= 70)  positives.push(`solid technical coverage for your detected domain`);
  if (es >= 60)  positives.push(`credible experience depth at ${es}/100`);

  // Bullet signals
  if (bq) {
    const strongRatio = pct(bq.strong_count ?? 0, bq.total_bullets ?? 1);
    if (strongRatio >= 55) positives.push(`${bq.strong_count} of ${bq.total_bullets} bullets are well-structured with action verbs and impact`);
    else concerns.push(`only ${bq.strong_count} of ${bq.total_bullets} bullets meet quality standards — the rest lack action verbs, metrics, or technology`);
  }

  // Digital presence signals
  if (dp?.has_github && dp?.has_linkedin) positives.push("both GitHub and LinkedIn URLs are present");
  else if (!dp?.has_github) concerns.push("no GitHub URL detected — this is expected for tech roles and costs +7 pts");
  else if (!dp?.has_linkedin) concerns.push("no LinkedIn URL found — add it for +4 pts and recruiter accessibility");

  // Certifications
  const certCount = cert?.count ?? 0;
  if (certCount >= 2) positives.push(`${certCount} certifications detected, which boost ATS keyword matching`);
  else if (certCount === 0) concerns.push("no certifications found — even one cloud or platform certificate significantly boosts ATS ranking");

  if (!hasRoadmap && positives.length >= 3 && concerns.length === 0) {
    return `Your resume is in genuinely good shape. ${positives.slice(0, 3).map((p, i) => i === 0 ? p.charAt(0).toUpperCase() + p.slice(1) : p).join(", ")}. No critical structural or content issues were detected. At this stage, the best use of your time is to tailor the resume to each specific job description using the JD Match feature, and focus on deepening your project descriptions with concrete metrics.`;
  }

  const posText  = positives.length > 0 ? `Your resume's strengths include ${positives.slice(0, 3).join(", ")}. ` : "";
  const negText  = concerns.length > 0  ? `The areas that need attention are: ${concerns.join("; ")}. ` : "";
  const closeText = hasRoadmap
    ? `The ${roadmap.length} actions in the roadmap below are ordered by impact. Work through High-priority items first — they typically account for 80% of the potential score improvement.`
    : "Tackle the highest-impact improvements first: bullet quality rewrites typically yield the fastest score gains.";

  return posText + negText + closeText;
}

// ── QUANTIFICATION (derived from bullet_quality if new module absent) ─────
export function generateQuantificationInsight(d: any): { ratio: number; quantified: number; total: number; text: string; tip: string } {
  // Try new module first
  if (d?.quantification) {
    const q = d.quantification;
    return {
      ratio: q.ratio_percent,
      quantified: q.quantified,
      total: q.total_bullets,
      text: q.verdict ?? buildQuantText(q.ratio_percent, q.quantified, q.total_bullets),
      tip: buildQuantTip(q.ratio_percent),
    };
  }

  // Derive from bullet_quality (always available)
  const bq = d?.bullet_quality;
  if (!bq) return { ratio: 0, quantified: 0, total: 0, text: "Upload a resume to see quantification analysis.", tip: "" };

  // Strong bullets have action verb + metric + tech → use strong_count as proxy for quantified
  const strongCount = bq.strong_count ?? 0;
  const total       = bq.total_bullets ?? 1;
  const ratio       = pct(strongCount, total);

  return {
    ratio,
    quantified: strongCount,
    total,
    text: buildQuantText(ratio, strongCount, total),
    tip: buildQuantTip(ratio),
  };
}

function buildQuantText(ratio: number, quantified: number, total: number): string {
  if (ratio === 0)
    return `None of your ${total} bullets contain a measurable number or metric. This is the single biggest signal recruiters use to distinguish achievers from task-doers. A bullet that reads "Developed a web app" tells a recruiter nothing — "Developed a web app serving 2,000+ daily users with 99.8% uptime" tells everything.`;
  if (ratio < 30)
    return `Only ${quantified} of your ${total} bullets (${ratio}%) contain a measurable outcome. Recruiter benchmark is 60%+. The remaining ${total - quantified} bullets describe tasks without showing impact. Every project bullet should answer: how many users, what % improvement, what time was saved, what scale was achieved.`;
  if (ratio < 55)
    return `${quantified} of ${total} bullets (${ratio}%) contain metrics — you're getting there, but still below the 60% recruiter benchmark. Look at your internship and project bullets specifically: these have the most room to add numbers like response times, dataset sizes, accuracy scores, or user counts.`;
  if (ratio < 75)
    return `${quantified} of ${total} bullets (${ratio}%) are quantified, which is above average. To reach top-tier, push toward 75%+ by adding at least one number to every remaining bullet — even approximate figures ("~300 students", "50% faster") are far better than none.`;
  return `${quantified} of ${total} bullets (${ratio}%) contain measurable impact — this is strong. Recruiters at product companies specifically filter for metric-driven resumes. Keep this up when updating or tailoring the resume for new roles.`;
}

function buildQuantTip(ratio: number): string {
  if (ratio < 40) return "Quick fix: go through each bullet and ask 'how many?', 'by what %?', 'for how many users?'. Even rough estimates add credibility.";
  if (ratio < 60) return "Target: add metrics to your internship bullets first — they're most impactful because they represent real-world work.";
  return "Tip: when tailoring for a specific JD, make sure your numbers align with the scale the company operates at (startup vs enterprise).";
}

// ── ACHIEVEMENT VS DUTY ──────────────────────────────────────
export function generateAchievementInsight(d: any): { ratio: number; achievements: number; duties: number; text: string } {
  if (d?.achievement_ratio && !isLockedCheck(d.achievement_ratio)) {
    const ar = d.achievement_ratio as any;
    return {
      ratio: ar.achievement_ratio,
      achievements: ar.achievement_count,
      duties: ar.responsibility_count,
      text: ar.verdict ?? buildAchievementText(ar.achievement_ratio, ar.achievement_count, ar.responsibility_count),
    };
  }

  // Derive: strong bullets = achievement-focused; weak = duty-focused
  const bq = d?.bullet_quality;
  if (!bq) return { ratio: 0, achievements: 0, duties: 0, text: "Upload a resume to see achievement analysis." };

  const strong = bq.strong_count ?? 0;
  const total  = bq.total_bullets ?? 1;
  const ratio  = pct(strong, total);
  const duties = total - strong;

  return { ratio, achievements: strong, duties, text: buildAchievementText(ratio, strong, duties) };
}

function buildAchievementText(ratio: number, achievements: number, duties: number): string {
  if (ratio < 25)
    return `Most of your ${achievements + duties} bullets read like a job description — they describe what you were supposed to do, not what you actually accomplished. Recruiters at top companies are trained to immediately flag "responsible for", "helped with", "assisted in", and "worked on" as weak signals. Rewrite each duty bullet as: [Action verb] + [what you built/changed] + [measured result]. Example: instead of "Responsible for backend API development", write "Built 12 RESTful API endpoints in FastAPI serving 4,000+ daily requests with <200ms latency."`;
  if (ratio < 50)
    return `${achievements} of your bullets show real impact, but ${duties} still read as duties. This is a common pattern for students and interns — you had responsibilities, but your resume doesn't prove what you delivered. For every bullet that starts with "Responsible for", "Helped", or "Worked on", ask yourself what actually changed because of your work. Did load time improve? Did a feature ship? Was a bug fixed that affected X users?`;
  if (ratio < 70)
    return `You have more achievement bullets (${achievements}) than duty bullets (${duties}), which is above average for student profiles. To hit the 70%+ target that product company recruiters look for, focus on converting your remaining task-description bullets — particularly from internships — into impact statements with numbers.`;
  return `${achievements} of your ${achievements + duties} bullets (${ratio}%) are achievement-focused — this is strong. Top resumes at FAANG-tier companies run at 80%+, so you're close. One thing to double-check: make sure your most impressive achievements are near the top of each experience block, since recruiters read only the first 1-2 bullets per role.`;
}

// ── SUMMARY QUALITY ───────────────────────────────────────────
export function generateSummaryInsight(d: any): { present: boolean; score: number; text: string } {
  const sq = d?.summary_quality;
  if (!sq) {
    return {
      present: false, score: 0,
      text: "No summary section was detected. A professional summary at the top of your resume is not optional — it's the first thing a recruiter reads in under 10 seconds. A strong summary should be 2–3 lines, mention your target role, 3–4 key technologies, and one differentiator (your best project, your CP rating, your CGPA, or a company name). Example: 'Final-year CSE student at NIT with strong Python and machine learning background (TensorFlow, PyTorch). Built a production-deployed sentiment analysis API serving 2,000+ requests/day. LeetCode Knight · GPA 8.7/10.'"
    };
  }
  if (!sq.present)
    return { present: false, score: 0, text: "No summary section detected. See tip above." };

  const score = sq.score ?? 0;
  let text = "";
  if (score >= 75) text = `Your summary scores ${score}/100 and reads well. It mentions your role, tech stack, and a value signal. To push it to 90+, add one concrete proof point — a number, a company name, a platform, or a competitive programming rating. Recruiters spend 7 seconds on a resume; your summary is the only part guaranteed to be read in full.`;
  else if (score >= 50) text = `Your summary scores ${score}/100 — it exists but lacks specificity. ${sq.feedback?.slice(0, 2).join(" ") ?? ""} A generic "passionate developer with good communication skills" is actively harmful — it signals you wrote the summary once and never updated it. Make it role-specific: if applying to an SDE role, lead with your strongest SDE credential.`;
  else text = `Your summary scores only ${score}/100. ${sq.feedback?.join(" ") ?? "It is either too vague, too short, or loaded with clichés."} Rewrite it from scratch in this format: [Role target] + [Top 3 technologies] + [One proof point with a number] + [One differentiator]. Keep it under 70 words. Avoid: "hardworking", "passionate", "team player", "seeking an opportunity".`;

  return { present: true, score, text };
}

// ── CONTACT COMPLETENESS ─────────────────────────────────────
export function generateContactInsight(d: any): string {
  const cc = d?.contact_completeness;
  const dp = d?.digital_presence;
  if (!cc) {
    // Derive from digital_presence
    const lines: string[] = [];
    if (dp?.has_github)   lines.push("GitHub URL detected ✓");
    else lines.push("GitHub is missing — add your profile URL. For tech roles, GitHub is the first thing engineers on the interview panel check. +7 pts.");
    if (dp?.has_linkedin) lines.push("LinkedIn URL detected ✓");
    else lines.push("LinkedIn URL is missing. Many companies' ATS systems auto-pull LinkedIn to pre-fill candidate profiles. Add it to the header. +4 pts.");
    return lines.join(" ") || "Contact information analysis unavailable.";
  }

  const missing  = cc.missing  ?? [];
  const score    = cc.score    ?? 0;
  const present  = Object.entries(cc.fields ?? {}).filter(([, v]) => v).map(([k]) => k);

  if (missing.length === 0)
    return `All key contact fields are present (${present.join(", ")}). Your contact section is complete and recruiter-ready. One tip: make sure your email looks professional — first.last@gmail.com is ideal; nicknames or numbers look informal.`;

  const reasons: Record<string, string> = {
    full_name:  "Your name wasn't detected at the top of the resume — this is the first thing ATS reads to create a candidate record.",
    email:      "No email found. This is a critical omission — a recruiter literally cannot contact you.",
    phone:      "No phone number detected. Many Indian companies call shortlisted candidates directly before sending a formal email.",
    location:   "No city/location found. Recruiters filter by location for on-site roles. Add 'Bangalore, India' or 'Open to relocation' in your header.",
    linkedin:   "LinkedIn URL is absent. HRs always cross-check LinkedIn. It adds credibility and +4 pts to your presence score.",
    github:     "GitHub URL not found. For any tech role, GitHub is a portfolio. Engineers on the panel will check it. +7 pts to your presence score.",
  };

  const missingLines = missing.map(m => reasons[m] ?? `${m} is missing`);
  return `Your contact section is ${score}% complete. ${missingLines.join(" ")} Fix these before submitting anywhere — incomplete contact info is an automatic disqualifier at many companies.`;
}

// ── SECTION ORDER ─────────────────────────────────────────────
export function generateSectionOrderInsight(d: any): string {
  const so = d?.section_order;
  if (!so) return "Section order data is unavailable. General rule: for freshers and students, use Summary → Education → Skills → Projects → Experience → Certifications. This ordering ensures your strongest academic and technical signals appear before a recruiter loses interest.";

  const detected = so.detected_order ?? [];
  const ideal    = so.ideal_order    ?? [];
  const missing  = so.missing_sections ?? [];
  const layout   = so.recommended_layout ?? "Fresher";

  const outOfOrder: string[] = [];
  ideal.forEach((section: string, idealIdx: number) => {
    const actualIdx = detected.indexOf(section);
    if (actualIdx !== -1 && Math.abs(actualIdx - idealIdx) > 1) {
      outOfOrder.push(section);
    }
  });

  let text = `Your resume follows a ${layout} layout. `;

  if (outOfOrder.length === 0 && missing.length === 0) {
    text += `The section order (${detected.join(" → ")}) is correctly structured. Recruiters read top-to-bottom, so having your strongest section early is important — and your layout achieves this.`;
  } else {
    if (outOfOrder.length > 0) {
      text += `Sections like ${outOfOrder.join(", ")} are positioned out of the ideal order. `;
    }
    if (layout === "Fresher") {
      text += `For a student profile, Education and Skills should appear early — before Experience — because your academic credentials and technical breadth are stronger signals than limited work experience. Recommended order: ${ideal.slice(0, 5).join(" → ")}.`;
    } else {
      text += `For an experienced candidate, Experience should come right after the Summary — recruiters want to see where you worked before anything else. Recommended order: ${ideal.slice(0, 5).join(" → ")}.`;
    }
    if (missing.length > 0) {
      text += ` These sections are missing entirely: ${missing.join(", ")}. ${missing.includes("summary") ? "Adding a Summary is the single highest-impact structural change you can make." : "Consider adding them to give recruiters a complete picture."}`;
    }
  }

  return text;
}

// ── ATS FORMATTING ────────────────────────────────────────────
export function generateFormattingInsight(d: any): string {
  const fmt = d?.formatting;
  if (!fmt) return "Formatting analysis unavailable. General ATS rules: avoid tables, multi-column layouts, decorative symbols, and graphics. Use standard section headers. Keep fonts readable. Ensure email and phone are in plain text.";

  const flags    = fmt.flags    ?? [];
  const risk     = fmt.ats_risk ?? "Unknown";
  const flagCount = fmt.flag_count ?? 0;

  if (flagCount === 0)
    return `Your resume has no ATS-breaking formatting patterns (${risk} risk). It uses clean text structure with standard section headers, which means automated screening software can read every word correctly. This is more important than most candidates realise — even a well-written resume fails if ATS can't parse it. Keep formatting simple if you update the resume.`;

  const flagExplanations: Record<string, string> = {
    "Tables detected — ATS cannot parse table content. Use plain text lists.":
      "You appear to be using a table-based layout (common in Word templates). ATS systems read tables left-to-right across cells, mixing up content. Replace with single-column bullet lists.",
    "Decorative symbols detected — may cause ATS parsing failure.":
      "Special characters like ■, ▶, ★ can cause ATS parsers to skip entire lines or produce garbled text. Use standard hyphens (-) or bullets (•) only.",
    "Many ALL-CAPS lines — some ATS ignore all-caps text.":
      "Multiple all-caps section headers detected. Some ATS versions ignore capitalised text or misclassify it. Use Title Case (Education, Experience, Skills) instead.",
    "Possible multi-column layout — ATS reads columns left-to-right, mixing content.":
      "A two-column layout is detected. ATS reads column-by-column, which can merge your name with your job title, or your skills with your dates. Switch to a single-column format.",
  };

  const explanations = flags.map((flag: string) => flagExplanations[flag] ?? flag);

  return `Your resume has ${flagCount} formatting issue(s) that put it at ${risk} ATS risk. ${explanations.join(" ")} Fix these before submitting — formatting errors can cause ATS to reject or misparse an otherwise strong resume without any human ever reviewing it.`;
}

// ── SKILLS SECTION ────────────────────────────────────────────
export function generateSkillsInsight(d: any): string {
  const tsc     = d?.technical_skills_compatibility;
  const domain  = tsc?.target_domain ?? "Software Engineer";
  const total   = tsc?.total_skills_identified ?? 0;
  const score   = tsc?.overall_score ?? 0;
  const cats    = tsc?.category_breakdown ?? {};

  // Find gaps (critical categories with low coverage)
  const critical = Object.entries(cats)
    .filter(([, v]: any) => v.priority === "critical" && v.found < v.required)
    .map(([k, v]: any) => `${k.replace(/_/g, " ")} (have ${v.found}, need ${v.required})`);

  const overfilled = Object.entries(cats)
    .filter(([, v]: any) => v.found >= v.required * 1.5 && v.found >= 3)
    .map(([k]: any) => k.replace(/_/g, " "));

  if (total >= 20 && critical.length === 0) {
    return `With ${total} skills detected and a ${score}/100 match for ${domain} roles, your technical breadth is strong. At this point, adding more skills to your resume is counterproductive — it dilutes focus and makes you look like you're listing keywords rather than demonstrating depth. Instead, pick your top 3–4 skills and make sure your project bullets show real depth in those areas. Recruiters at product companies care far more about what you built with React than that you know React exists.`;
  }

  if (total >= 15 && critical.length > 0) {
    return `You have ${total} skills across multiple categories, which shows good breadth. However, for the ${domain} role your profile maps to, there are critical gaps: ${critical.join(", ")}. The good news is you don't need to learn everything — focus only on what your target JDs list in the first 3 required qualifications. Learn exactly those tools through a hands-on project, then add the project to your resume with the technology prominently featured.`;
  }

  if (total < 8) {
    return `Only ${total} skills were detected in your resume — this is significantly below what most ${domain} job postings require. ATS systems scan for keyword density, so a thin skills section reduces your match rate. Expand it by: (1) listing every technology you've actually used in projects, even briefly; (2) adding tool names inline in project bullets ("built using React, Node.js, PostgreSQL"); (3) separating skills into categories (Languages, Frameworks, Tools, Cloud) for better ATS parsing.`;
  }

  let base = `Your skills map to a ${domain} profile with a ${score}/100 compatibility score. `;
  if (critical.length > 0) base += `Critical gaps for this role: ${critical.slice(0, 3).join("; ")}. Bridge these with small focused projects before your next application cycle. `;
  if (overfilled.length > 0) base += `You're well-covered in ${overfilled.join(", ")} — no need to expand further there. `;
  base += `Overall, the skill distribution looks ${gradeStrong(score)} for entry-level positions in this domain.`;
  return base;
}

// ── CLICHÉS ───────────────────────────────────────────────────
export function generateClicheInsight(d: any): string {
  const c = d?.cliches;
  if (!c || isLockedCheck(c)) {
    // Derive a partial insight from bullet weak_bullets hints
    const bq = d?.bullet_quality;
    const weakBullets = !isLockedCheck(bq?.weak_bullets) && Array.isArray(bq?.weak_bullets) ? bq.weak_bullets : [];
    if (weakBullets.length === 0) return "Cliché analysis available with Pro. Common ones to manually check: 'team player', 'hardworking', 'passionate about technology', 'responsible for', 'helped with'.";
    return `Cliché detection is a Pro feature, but your bullet analysis shows ${weakBullets.length} weak bullets — many weak bullets contain filler language. Common offenders: 'responsible for', 'helped with', 'worked on', 'involved in'. Replace every one of these with a specific action verb + outcome.`;
  }
  const count = (c as any).count ?? 0;
  if (count === 0) return "No clichés or overused phrases detected — your language is specific and direct. This is harder to achieve than it sounds: most student resumes contain at least 3–5 filler phrases. Keep this standard when updating the resume.";
  const found = (c as any).cliches_found ?? [];
  const phrases = found.slice(0, 3).map((f: any) => `"${f.phrase}"`).join(", ");
  return `${count} cliché phrase(s) detected in your resume: ${phrases}${found.length > 3 ? ` and ${found.length - 3} more` : ""}. These phrases are red flags for experienced recruiters because they appear on thousands of resumes and communicate nothing specific. Every cliché takes up space that could show a real achievement. Replace each one with the specific thing you actually did: not "team player" but "co-built X with a 3-person team"; not "hardworking" but "delivered feature Y two weeks ahead of sprint deadline."`;
}

// ── PERSONAL PRONOUNS ─────────────────────────────────────────
export function generatePronounInsight(d: any): string {
  const pp = d?.personal_pronouns;
  if (!pp || isLockedCheck(pp)) return "Personal pronoun analysis is a Pro feature. Quick check: search your resume for 'I ', 'my ', 'we ', 'our '. Resumes should never use first person — instead of 'I developed a system', write 'Developed a system'.";
  const count = (pp as any).count ?? 0;
  if (count === 0) return "No personal pronouns (I, my, we, our) detected — your resume correctly uses implied first person throughout. This is a mark of a well-edited resume and ensures compatibility with all ATS systems.";
  const hits = (pp as any).hits ?? [];
  return `${count} line(s) contain personal pronouns (I, my, we, our). Resumes are written in 'implied first person' — the reader understands that every bullet refers to you, so the pronoun is omitted. Line example: ${hits[0]?.line ? `"${hits[0].line.slice(0, 80)}..."` : "see flagged lines above"}. Rewrite: remove the pronoun and start with the action verb. "I developed a REST API" → "Developed a REST API."`;
}

// ── CONSISTENCY ───────────────────────────────────────────────
export function generateConsistencyInsight(d: any): string {
  const c = d?.consistency;
  if (!c || isLockedCheck(c)) return "Consistency analysis is a Pro feature. Things to manually check: (1) Are all dates in the same format? (2) Are you using past tense for all roles? (3) Is JavaScript always 'JavaScript' — not 'JS' in one place and 'JavaScript' in another?";
  const issues = (c as any).issues ?? [];
  if (issues.length === 0) return "Your resume is internally consistent — date formats, verb tenses, and abbreviations are uniform throughout. This is a polish signal that matters more than most people think: inconsistency makes a resume look like it was assembled in a hurry. Maintain this standard.";
  return `${issues.length} consistency issue(s) found. ${issues.map((i: any) => `${i.type}: ${i.detail}`).join(" ")} Inconsistency is one of the easiest red flags for a meticulous recruiter to spot. Fix these before your next submission — it takes under 5 minutes.`;
}

// ── SKILL RECENCY ─────────────────────────────────────────────
export function generateSkillRecencyInsight(d: any): string {
  const sr = d?.skill_recency;
  if (!sr || isLockedCheck(sr)) return "Skill recency analysis is a Pro feature. General rule: de-emphasise or remove technologies that have been industry-deprecated (jQuery, AngularJS, JSP, Struts). Emphasise modern tools (FastAPI, Next.js, Kubernetes, LangChain, dbt).";
  const modern = (sr as any).modern_tech_found ?? [];
  const dated  = (sr as any).dated_tech_found  ?? [];
  const verdict = (sr as any).verdict ?? "";
  if (dated.length === 0 && modern.length > 0) return `Your tech stack signals strong market relevance. You have ${modern.length} modern/in-demand technologies (${modern.slice(0, 4).join(", ")}${modern.length > 4 ? "..." : ""}) and no legacy tech. ${verdict} Recruiters at product companies specifically look for candidates who keep their skills current — this is a positive signal.`;
  if (dated.length > 0 && modern.length === 0) return `Your resume lists some dated technologies (${dated.join(", ")}) but no modern stack equivalents. This can signal to recruiters that you're not keeping up with the industry. You don't need to remove these entirely — they show breadth — but pair them with modern equivalents: if you know jQuery, mention React; if you know AngularJS, mention Angular 16+.`;
  return `${verdict} You have ${modern.length} modern skills and ${dated.length} dated ones. Consider moving dated technologies (${dated.join(", ")}) to a 'familiar with' or 'legacy experience' subsection so they don't dominate your skills section.`;
}

// ── COMPETITIVE PROGRAMMING ───────────────────────────────────
export function generateCPInsight(d: any): string {
  const cp = d?.competitive_programming;
  if (!cp) return "";
  const count = cp.platform_count ?? 0;
  if (count === 0) return "No competitive programming profiles detected. For product company roles (Flipkart, Amazon, Google, etc.), a LeetCode profile with 200+ problems solved is a meaningful signal. Even a 3-star CodeChef rating shows systematic problem-solving ability. Consider adding CP achievements if you have them.";

  const platforms = !isLockedCheck(cp.platforms) ? cp.platforms : {};
  const lines: string[] = [];
  Object.entries(platforms as Record<string, any>).forEach(([name, data]) => {
    const parts: string[] = [];
    if (data.rating)        parts.push(`rating ${data.rating}`);
    if (data.rank_title)    parts.push(data.rank_title);
    if (data.problem_count) parts.push(`${data.problem_count} problems solved`);
    if (parts.length > 0)   lines.push(`${name.charAt(0).toUpperCase() + name.slice(1)}: ${parts.join(", ")}`);
  });

  const summary = lines.length > 0 ? lines.join("; ") : `${count} platform(s) detected`;
  const boost   = cp.score_contribution ?? 0;

  if (boost >= 15) return `Strong CP profile: ${summary}. These ratings are a significant differentiator for product company roles — many companies specifically filter for Codeforces Expert+ or LeetCode Knight+ in their initial screens. Make sure these are prominently listed in your resume, ideally in a dedicated Competitive Programming section.`;
  if (boost >= 8)  return `Moderate CP presence: ${summary}. This is a positive signal, especially for MAANG-tier applications. If you're targeting product companies, continue building your profile — reaching LeetCode Knight (~1850 rating) or Codeforces Expert (1600+) significantly improves shortlisting odds.`;
  return `CP profile detected (${summary}), contributing +${boost} pts to your score. If you're targeting service companies (TCS, Infosys, Wipro), this is sufficient. For product companies, aim higher: 300+ LeetCode problems or a recognisable rank makes the profile competitive.`;
}

// ── CERTIFICATIONS ────────────────────────────────────────────
export function generateCertInsight(d: any): string {
  const cert = d?.certifications;
  if (!cert) return "";
  const count = cert.count ?? 0;
  const found = cert.found ?? [];
  const boost = cert.score_contribution ?? 0;

  if (count === 0) return "No certifications detected on your resume. While certifications alone don't land jobs, they serve two purposes: (1) they add ATS keywords that match JD requirements, and (2) they signal to recruiters that you've invested structured time in a domain. Recommended for students: AWS Cloud Practitioner (2–4 weeks prep, ~₹10K exam), Google Data Analytics (free on Coursera), or any NPTEL/Swayam certificate in your core domain. Even one certification can boost your ATS score by 8–12 points.";
  if (count === 1) return `1 certification detected: ${found[0] ?? ""}. This contributes +${boost} pts. Consider adding 1–2 more relevant certifications. For tech roles, cloud certifications (AWS, Azure, GCP) have the highest ATS keyword impact. For ML/data roles, TensorFlow Developer Certificate or Google Data Analytics are strong choices.`;
  return `${count} certification(s) detected: ${found.slice(0, 4).join(", ")}${found.length > 4 ? "..." : ""}. These contribute +${boost} pts to your resume score and add keyword coverage for ATS. Good standing. Avoid listing certifications from very short courses (1–2 hours) — they dilute the credibility of your stronger certifications. Prioritise those from recognised issuers (Google, AWS, Microsoft, NPTEL).`;
}

// ── EDUCATION ─────────────────────────────────────────────────
export function generateEduInsight(d: any): string {
  const edu = d?.education_profile;
  if (!edu) return "";
  const tier  = edu.institution_tier  ?? "Other";
  const cgpa  = edu.cgpa_normalised   ?? null;
  const year  = edu.graduation_year   ?? null;
  const branch = edu.branch           ?? "Unknown";
  const boost  = edu.score_contribution ?? 0;

  let text = "";

  if (tier === "Tier 1") text += `Your institution is classified as Tier 1 (IIT/NIT/IIIT/BITS tier) — this is a strong signal for many recruiters and contributes +${boost} pts. `;
  else if (tier === "Tier 2") text += `Your institution is classified as Tier 2. While tier matters less than your projects and skills, it does influence early-stage screening at some companies. Make sure your projects and GitHub profile compensate with strong technical work. `;
  else text += `Your institution is classified as Other/unrecognised. This makes your projects, GitHub, and CP ratings more important — they are your primary differentiators since institution brand is a lesser signal here. `;

  if (cgpa !== null) {
    if (cgpa >= 9.0)    text += `CGPA of ${cgpa}/10 is excellent — list it prominently. Many companies have cutoffs at 7.5 or 8.0; you clear all of them. `;
    else if (cgpa >= 8.0) text += `CGPA of ${cgpa}/10 is strong and above most company cutoffs (7.5–8.0 range). `;
    else if (cgpa >= 7.5) text += `CGPA of ${cgpa}/10 clears the standard 7.5 cutoff at most companies, but some top firms set it at 8.0. Compensate with strong projects. `;
    else text += `CGPA of ${cgpa}/10 may fall below cutoffs at some companies (many set 7.5–8.0 as the threshold). Focus extra energy on your project portfolio and GitHub to compensate. `;
  }

  if (year) {
    const now = new Date().getFullYear();
    const diff = year - now;
    if (diff <= 0)     text += "You appear to be a recent graduate — target both fresher roles and 0–1 year experience positions. ";
    else if (diff <= 1) text += `Graduating in ${year} — you're in the prime campus placement window. Start applying 3–4 months before graduation. `;
    else text += `Graduating in ${year} — this is internship season territory. Focus on summer internships now to strengthen your resume before final placements. `;
  }

  return text.trim();
}

// ── DIGITAL PRESENCE ─────────────────────────────────────────
export function generateDigitalInsight(d: any): string {
  const dp = d?.digital_presence;
  if (!dp) return "";
  const github    = dp.github_url;
  const linkedin  = dp.linkedin_url;
  const portfolio = dp.portfolio_url;
  const boost     = dp.score_contribution ?? 0;

  const parts: string[] = [];

  if (github) parts.push(`GitHub detected (${github.replace(/^https?:\/\//,"").slice(0, 40)}). Make sure your pinned repos include your best 3–6 projects with README files, live demos where possible, and clean commit history.`);
  else        parts.push("GitHub URL is absent — this is the most impactful thing to add for any tech role. +7 pts, and engineers on interview panels will check it. Push at least 3 projects before applying.");

  if (linkedin) parts.push(`LinkedIn detected. Keep it synced with your resume — discrepancies between resume and LinkedIn are a red flag. Add your projects and certifications there too.`);
  else          parts.push("LinkedIn URL missing. Add it to your resume header — HRs and recruiters use LinkedIn to verify candidate information, and many companies' ATS pre-fill from LinkedIn profiles. +4 pts.");

  if (portfolio) parts.push("A portfolio/personal site is detected — this is a strong differentiator for UI/fullstack roles.");

  if (boost === 0) parts.push("Your digital presence score is 0 — this is one of the fastest fixes: simply add your GitHub and LinkedIn URLs to your resume header.");

  return parts.join(" ");
}

// ── INTERNAL HELPER ───────────────────────────────────────────
function isLockedCheck(val: unknown): boolean {
  return typeof val === "object" && val !== null && "locked" in val;
}