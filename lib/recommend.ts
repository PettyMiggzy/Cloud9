export const areas = [
  {
    id: "back",
    label: "Low back",
    detail: "Ache, stiffness, or pain that travels from the back.",
  },
  {
    id: "neck",
    label: "Neck or headaches",
    detail: "Neck pain, or headaches that show up with it.",
  },
  {
    id: "jaw",
    label: "Jaw",
    detail: "Pain, clicking, or trouble opening.",
  },
  {
    id: "joint",
    label: "A joint, muscle, or limb",
    detail: "Shoulder, hip, knee, ankle, or another spot that is not the back, neck, or jaw.",
  },
  {
    id: "balance",
    label: "Dizziness or balance",
    detail: "Spinning, unsteadiness, or balance that no longer feels trustworthy.",
  },
  {
    id: "concussion",
    label: "After a hit to the head",
    detail: "A concussion, a fall, a crash, or symptoms that stayed after one.",
  },
  {
    id: "unsure",
    label: "Not one clear place",
    detail: "More than one area, or you are not sure how to name it.",
  },
] as const

export const stories = [
  {
    id: "recent",
    label: "It started recently",
    detail: "A strain, a fall, a weekend, or something in the last few weeks.",
  },
  {
    id: "lasting",
    label: "It has been going on",
    detail: "Months, or long enough that it is part of the week.",
  },
  {
    id: "surgery",
    label: "Surgery is part of the story",
    detail: "One is scheduled, or you are recovering from one.",
  },
  {
    id: "sport",
    label: "I want to get back to a sport",
    detail: "It happened around training, a season, or a race.",
  },
  {
    id: "older",
    label: "Staying independent",
    detail: "Strength, balance, or confidence that has slipped with age.",
  },
  {
    id: "needling",
    label: "Tight muscle, and dry needling",
    detail: "You are asking about the needling this clinic offers.",
  },
  {
    id: "unsure",
    label: "None of these fit cleanly",
    detail: "You still want a place to start.",
  },
] as const

export type AreaId = (typeof areas)[number]["id"]
export type StoryId = (typeof stories)[number]["id"]

const areaService: Record<AreaId, string | null> = {
  back: "back-pain",
  neck: "headache-neck",
  jaw: "tmj-therapy",
  joint: "acute-chronic",
  balance: "balance-vestibular",
  concussion: "concussion-care",
  unsure: null,
}

const storyService: Record<StoryId, string | null> = {
  recent: null,
  lasting: null,
  surgery: "operative-rehab",
  sport: "sports-medicine",
  older: "geriatric",
  needling: "dry-needling",
  unsure: null,
}

// Specific answers win over a general body region: a hit to the head, then surgery,
// then jaw, balance, independence, needling, and sport. Otherwise the body region,
// or the broad acute-and-chronic service.
export function recommend(area: AreaId, story: StoryId) {
  const fromArea = areaService[area]
  const fromStory = storyService[story]

  let service = "acute-chronic"
  if (area === "concussion") service = "concussion-care"
  else if (story === "surgery") service = "operative-rehab"
  else if (area === "jaw") service = "tmj-therapy"
  else if (area === "balance") service = "balance-vestibular"
  else if (story === "older") service = "geriatric"
  else if (story === "needling") service = "dry-needling"
  else if (story === "sport") service = "sports-medicine"
  else if (fromArea) service = fromArea

  const alternate = [fromArea, fromStory].find((slug) => slug && slug !== service)

  const reasons: Record<string, string> = {
    "concussion-care":
      "You said a hit to the head is the main concern. Concussion care is the service that starts there.",
    "operative-rehab":
      "You said surgery is part of the story. Before-and-after surgery care is the closest service.",
    "tmj-therapy": "You said the jaw is where it bothers you. TMJ therapy is the service built around that.",
    "balance-vestibular":
      "You said dizziness or balance is the problem. Balance and vestibular therapy is the place to start.",
    geriatric: "You said staying independent is the point. Care for older adults is the service aimed at that.",
    "dry-needling":
      "You asked about dry needling. That is a service here, often used in the same visit as other care.",
    "sports-medicine":
      "You said getting back to a sport is the goal. Sports medicine is the service shaped around that.",
    "back-pain": "You said the low back is the main problem. Back pain is the service that starts there.",
    "headache-neck":
      "You said the neck, or headaches with it. Headaches and neck pain is the matching service.",
    "acute-chronic":
      area === "joint"
        ? "You named a joint, muscle, or limb. Acute and chronic injuries is the service for that, whether it is new or has been around."
        : "The answers did not point at one specialty. Acute and chronic injuries is the broad starting point for muscle, joint, and bone problems. The evaluation narrows it.",
  }
  const because = reasons[service] ?? "This is the closest service the clinic already lists."

  return { service, alternate, because }
}
