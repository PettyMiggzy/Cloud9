export const clinic = {
  name: "Cloud 9 Physical Therapy",
  phone: "(317) 734-3430",
  phoneHref: "tel:+13177343430",
  fax: "(317) 734-3376",
  email: "contact@cloud9pt.com",
  addressLines: ["5370 E. Thompson Rd, Ste. G", "Indianapolis, IN 46237"],
  address: "5370 E. Thompson Rd, Ste. G, Indianapolis, IN 46237",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=5370+E.+Thompson+Rd,+Ste.+G,+Indianapolis,+IN+46237",
  mapEmbed:
    "https://maps.google.com/maps?q=5370+E+Thompson+Rd+Ste+G+Indianapolis+IN+46237&z=15&output=embed",
  hours: [
    { days: "Monday – Friday", time: "7:00 am – 7:00 pm" },
    { days: "Saturday", time: "8:00 am – 2:00 pm" },
    { days: "Sunday", time: "Closed" },
  ],
}

export const nav = [
  { href: "/services", label: "Care" },
  { href: "/about", label: "Team" },
  { href: "/gallery", label: "Clinic" },
  { href: "/visit", label: "Visit" },
]

export const patientTools = [
  {
    href: "/start",
    label: "Where to start",
    detail: "Two questions that point to a service. Not a diagnosis.",
  },
  {
    href: "/first-visit",
    label: "First visit",
    detail: "What to wear, how the hour goes, and what it costs.",
  },
  {
    href: "/insurance",
    label: "Insurance check",
    detail: "Ask the clinic to look at Medicare or a private plan.",
  },
  {
    href: "/refer",
    label: "Refer a patient",
    detail: "A note for a physician’s office. Patients can come without one.",
  },
  {
    href: "/southside",
    label: "South side",
    detail: "The Thompson Road clinic: hours, map, and services.",
  },
] as const

export const fees = {
  evaluation: { label: "60-minute one-to-one evaluation", amount: "$160" },
  treatment: { label: "55-minute one-to-one treatment", amount: "$120" },
  packages: [
    { label: "6 sessions", amount: "$660" },
    { label: "12 sessions", amount: "$1,220" },
    { label: "18 sessions", amount: "$1,680" },
  ],
  medicareNote: "Those self-pay fees do not apply to Medicare beneficiaries.",
  cancellationNote: "There is no cancellation fee. A day’s notice is appreciated.",
}

export const values = [
  "Trust",
  "Excellence",
  "Accountability",
  "Collaboration",
  "Service",
  "Innovation",
  "Gratitude",
]

export type TeamMember = {
  name: string
  role: string
  image: string
  bio: string
}

export const team: TeamMember[] = [
  {
    name: "Dr. Sakshi Nandal",
    role: "Clinical Director & Lead Physical Therapist · DPT, PT, CIDN",
    image: "/images/team/sakshi.jpg",
    bio: "Patients know her as Dr. Skye. With more than 12 years of experience, she brings a hands-on approach to manual therapy and dry needling, and she is serious about helping people move better without rushing toward medication, injections, or surgery. Her career has taken her from India to New York City and now to the south side of Indianapolis. Outside the clinic she likes weekend adventures, functional fitness, and clay shooting.",
  },
  {
    name: "Aidan Ewers",
    role: "Rehabilitation & Performance Specialist (PTA)",
    image: "/images/team/aidan.jpg",
    bio: "Aidan is an energetic clinician who likes helping people build strength, improve how they move, and notice their own progress. He coaches and watches football, spends time with friends, and golfs when he is off the floor.",
  },
  {
    name: "Riley G.",
    role: "Movement, Rehabilitation & Wellness Specialist",
    image: "/images/team/riley.jpg",
    bio: "Riley comes from kinesiology and personal training, and pairs that with a genuine interest in how people feel day to day. Alongside exercise and mobility work, Riley is helping lead a wellness and weight-management effort so patients can build habits that last. Off hours go to reading and learning new sports, including golf, tennis, and pickleball.",
  },
  {
    name: "Zaniyah M.",
    role: "Patient Care & Experience Coordinator",
    image: "/images/team/zaniyah.jpg",
    bio: "Zaniyah is often the first person you meet. She keeps visits running smoothly — scheduling, insurance, and the questions that come up between appointments — and she treats that front-desk work as part of the care. She likes shopping and traveling.",
  },
  {
    name: "Devon D.",
    role: "Patient Experience & Care Coordinator",
    image: "/images/team/devon.jpg",
    bio: "Devon handles scheduling, insurance coordination, and the small conversations that make a clinic feel steady. Outside of work, line dancing and cards with friends.",
  },
]

export type Service = {
  slug: string
  name: string
  short: string
  image: string
  imageAlt: string
  lead: string
  forWhom: string[]
  visit: string
  timeline: string
}

export const services: Service[] = [
  {
    slug: "acute-chronic",
    name: "Acute and chronic injuries",
    short: "Muscle, joint, and bone problems, whether they started last weekend or years ago.",
    image: "/images/clinic/treatment-bay.jpg",
    imageAlt: "Treatment tables inside Cloud 9 Physical Therapy",
    lead: "Sprains, strains, tendinitis, arthritis, and the pain that never quite left. Care starts by finding what is actually driving it, then builds a plan around that — not a generic set of exercises.",
    forWhom: [
      "A recent sprain, strain, or fall",
      "Pain that has lingered for months",
      "Tendinitis, arthritis, or repetitive strain",
      "Trouble getting back to work, sport, or daily tasks",
    ],
    visit: "The first visit is a full look at the injury, how you move, and what you need to get back to. Follow-ups usually run 45–60 minutes and mix hands-on treatment, exercise, and clear instruction for home.",
    timeline:
      "A newer injury often turns a corner in 4–8 weeks. Longer-standing problems may take 8–12 weeks or more. The plan changes as you do.",
  },
  {
    slug: "dry-needling",
    name: "Functional dry needling",
    short: "Thin, sterile needles used to release tight muscle and ease pain.",
    image: "/images/services/dry-needling.jpg",
    imageAlt: "Dry needling at Cloud 9, with no faces shown",
    lead: "Dry needling places a thin needle into a trigger point — a tight band of muscle that refers pain and limits motion. It is based on anatomy and how nerves and muscle behave, not on acupuncture meridians. Dr. Skye is certified in the technique (CIDN).",
    forWhom: [
      "Muscle pain that has not responded to other care",
      "Stiffness that blocks range of motion",
      "Sports injuries you want to settle faster",
      "Repetitive strain from work or training",
    ],
    visit: "Your therapist finds the points by hand, then inserts the needle. A brief twitch is common and means the muscle is letting go. Needling often takes 20–30 minutes and is paired with other treatment in the same visit.",
    timeline:
      "Many people feel a change right away or within a day or two. Mild soreness can follow and usually fades quickly. Chronic problems often need more than one session.",
  },
  {
    slug: "balance-vestibular",
    name: "Balance and vestibular therapy",
    short: "Care for dizziness, vertigo, and a balance system that no longer feels trustworthy.",
    image: "/images/services/vestibular.jpg",
    imageAlt: "Anatomical model of the ear used to explain balance",
    lead: "The vestibular system is how the inner ear tells you where you are in space. When it is off — from injury, illness, or age — the room can spin, walking feels risky, and confidence goes with it.",
    forWhom: [
      "BPPV, the spinning that comes with certain head positions",
      "Dizziness after a head injury or illness",
      "Unsteadiness and fear of falling",
      "Inner-ear or neurologic balance problems",
    ],
    visit: "The evaluation checks balance, eye movement, and vestibular function. Treatment can include canalith repositioning, such as the Epley maneuver, plus exercises you practice here and at home. Sessions are typically 45–60 minutes.",
    timeline:
      "BPPV often improves in one to three visits. Other causes may need about 6–8 weeks, with balance measured along the way.",
  },
  {
    slug: "headache-neck",
    name: "Headaches and neck pain",
    short: "Neck-driven headaches, migraines, and cervical pain that desk work keeps feeding.",
    image: "/images/clinic/treatment-bay.jpg",
    imageAlt: "Treatment tables at Cloud 9, where neck and headache care happens",
    lead: "A lot of headaches start in the neck: tight muscle, a joint that is not moving, or a posture held too long. They get labeled migraine or tension headache and the neck never gets treated. Neck pain from strain, a disc, arthritis, or a pinched nerve can do the same.",
    forWhom: [
      "Headaches that show up with neck movement or long hours at a desk",
      "Neck stiffness that spreads into the shoulders or arms",
      "Headaches that keep returning",
      "Cervical pain after an injury or years of posture",
    ],
    visit: "The exam covers the cervical spine, posture, muscle tone, and the pattern of the headaches. Treatment is hands-on work plus exercise, often two or three times a week at the start.",
    timeline:
      "Many people have fewer headaches within 4–6 weeks. Longer cases may take 8–12 weeks, with a plan for keeping them from coming back.",
  },
  {
    slug: "operative-rehab",
    name: "Before and after surgery",
    short: "Preparation and recovery programs matched to the procedure and the surgeon’s protocol.",
    image: "/images/clinic/gym.jpg",
    imageAlt: "The Cloud 9 gym, used for strength work before and after surgery",
    lead: "Physical therapy on both sides of an operation changes the result. Building strength and motion beforehand, then following a phased plan afterward, is associated with faster recovery, less pain, and a better long-term outcome.",
    forWhom: [
      "Joint replacement of the hip, knee, or shoulder",
      "Any surgery where the surgeon wants pre-hab or a set protocol",
      "People who want a clear picture of the first weeks after the operation",
    ],
    visit: "Before surgery, the work is strength, motion, and fitness, plus teaching the exercises you will need afterward. After surgery, care follows the surgeon’s phases: protect the repair, restore motion, rebuild strength, and return to what you do.",
    timeline:
      "Pre-op care is often 2–6 weeks. Afterward, smaller procedures may take 6–12 weeks. Major joint replacements or reconstructions can take 6–12 months.",
  },
  {
    slug: "geriatric",
    name: "Care for older adults",
    short: "Strength, balance, and independence, paced to the person in the room.",
    image: "/images/clinic/about-room.jpg",
    imageAlt: "The front of the Cloud 9 clinic on Thompson Road",
    lead: "Aging is not a reason to give up the day. Geriatric physical therapy works with arthritis, bone density, balance, and the slow loss of strength, with the aim of staying independent and involved.",
    forWhom: [
      "Adults who want to keep or regain independence",
      "Recovery after an illness or a fall",
      "People worried about falling",
      "Strength and mobility that have slipped with age",
    ],
    visit: "The evaluation looks at strength, balance, walking, and the tasks that matter at home. Sessions are paced to comfort, usually 45–60 minutes, one to three times a week.",
    timeline:
      "Confidence and mobility often shift within 4–8 weeks. A lighter maintenance plan helps hold onto the gains.",
  },
  {
    slug: "sports-medicine",
    name: "Sports medicine",
    short: "Injury care and return-to-sport work for every level, from weekend races to a full season.",
    image: "/images/clinic/about.jpg",
    imageAlt: "Cardio equipment and the gym floor at Cloud 9",
    lead: "The goal is not only to calm the injury. It is to get you back to the sport without handing you the next one. That means looking at how you move, then rebuilding strength, power, and the specific demands of what you play.",
    forWhom: [
      "Weekend athletes, club players, and competitive athletes",
      "Runners, cyclists, swimmers, and field-sport athletes",
      "Strains you want cleared properly before you return",
      "Bigger injuries, including reconstructions, that need a staged plan",
    ],
    visit: "The first visit includes a movement screen, strength testing, and a look at the sport itself. Rehab moves from healing into strength, power, and sport-specific work, usually two or three times a week.",
    timeline:
      "A minor strain may settle in 2–6 weeks. Something like an ACL reconstruction is often 6–9 months. Clearance waits until you are actually ready.",
  },
  {
    slug: "tmj-therapy",
    name: "TMJ therapy",
    short: "Jaw pain, clicking, and limited opening, treated with the neck and posture in mind.",
    image: "/images/services/tmj.jpg",
    imageAlt: "Anatomical drawing of the jaw, not a photograph of a person",
    lead: "The temporomandibular joint is where the jaw meets the skull. When it is unhappy, people get pain, clicking or popping, a jaw that will not open fully, and headaches that seem to start there.",
    forWhom: [
      "Jaw pain, clicking, or locking",
      "Headaches tied to the jaw",
      "A diagnosis of TMD from a dentist or physician",
      "Trouble chewing or opening wide",
    ],
    visit: "The exam covers jaw motion, muscle tension, posture, and whatever else is feeding the problem. Treatment is gentle work inside and outside the mouth, about 45 minutes, once or twice a week. Care is often coordinated with your dentist.",
    timeline:
      "Many people feel a difference in 4–6 weeks. Stubborn cases may take 8–12.",
  },
  {
    slug: "concussion-care",
    name: "Concussion care",
    short: "A plan for the symptoms that linger after a hit, a fall, or a crash.",
    image: "/images/clinic/gym.jpg",
    imageAlt: "The Cloud 9 gym, where concussion rehab includes balance and movement work",
    lead: "A concussion is a mild traumatic brain injury. Most settle in days or weeks. When symptoms hang on — dizziness, headache, trouble with school or screens, mood changes — recovery needs a plan aimed at the systems that are still irritated, including the neck and the balance system.",
    forWhom: [
      "Athletes, students, and anyone after a sports hit, fall, or car crash",
      "Symptoms that are still here after the expected window",
      "People who need a return-to-learn or return-to-sport progression",
    ],
    visit: "The evaluation covers symptoms, balance, vestibular screening, the cervical spine, and cognition. Treatment is individual, usually two or three times a week, and only advances when symptoms allow it.",
    timeline:
      "Many concussions resolve in 7–14 days. Post-concussion symptoms can take 6–12 weeks or longer. Progress is tracked and shared with your physician.",
  },
  {
    slug: "back-pain",
    name: "Back pain",
    short: "Lower back pain, sciatica, and the kind of ache that makes work and sleep harder.",
    image: "/images/clinic/treatment-bay.jpg",
    imageAlt: "Treatment tables at Cloud 9 used for back pain care",
    lead: "Back pain is one of the most common reasons people walk in. It can come from a strain, a disc, arthritis, posture, or a mix. Most of it responds to conservative care, without surgery or a long run of medication.",
    forWhom: [
      "New or long-standing low back pain",
      "Sciatica or pain that travels",
      "Desk work that leaves the back angry",
      "Athletes with a sports-related back injury",
    ],
    visit: "The exam looks at the spine, how you move, strength, flexibility, and the tasks you cannot do. Treatment combines manual therapy and spinal mobilization with exercise, usually two or three times a week at first, then more of the work moves home.",
    timeline:
      "A newer episode often eases in 2–6 weeks. Chronic pain may take 8–12 weeks or more. The aim is a back you can manage, not a temporary quiet spell.",
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}

export const weekdayTimes = [
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
]

export const saturdayTimes = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
]

export const reviews = [
  {
    name: "im a vloger",
    text: "A great place and she works had to help you!",
    url: "https://share.google/mdN4tNuklSpwZ9FO6",
  },
  {
    name: "Troy Duncan",
    text: "Sky was very helpful and informative. The dry needling is amazing. They also offer red light therapy which i am excited to try!",
    url: "https://share.google/2gcghygYg42HhTNTR",
  },
  {
    name: "Y S",
    text: "That is a professional office to treat your body. Nice work nice location and great service!",
    url: "https://share.google/UhteXTGMpGQuVsHPN",
  },
  {
    name: "Sunny C",
    text: "This is my first visit cloud 9 i got lower back pain and shoulder pain for a long time they give me a great treatment. I’m feeling better now.can’t wait see them again 😊",
    url: "https://share.google/dAPTzhlSPdMQZ3SLp",
  },
  {
    name: "jamar killebrew",
    text: "I can't believe it , I have had neck pain for about 2 months. Once I seen Dr. Sky my pain was relieved she is the best",
    url: "https://share.google/5beQWfykrmw5mpsf4",
  },
]

export const partners = [
  { name: "Helping Heroes of America", image: "/images/partners/helping-heroes.png" },
  { name: "Keep Indianapolis Beautiful", image: "/images/partners/keep-indy.png" },
  { name: "Indiana Center for Recovery", image: "/images/partners/indiana-recovery.png" },
  { name: "Pack Away Hunger", image: "/images/partners/packaway.png" },
  { name: "Autism Community Connection", image: "/images/partners/autism.png" },
  { name: "Southeast Community Services", image: "/images/partners/southeast.png" },
  { name: "Hope for Tomorrow", image: "/images/partners/hope.png" },
]

export const faqs = [
  {
    question: "Do you accept Medicare?",
    answer: "Yes. We accept Medicare. The self-pay fees below do not apply to Medicare beneficiaries.",
  },
  {
    question: "Do you accept private insurance?",
    answer:
      "Cloud 9 accepts most major insurance plans. The clinic will contact your insurance company and explain the benefits before you are guessing at a bill. If a deductible has to be met first, services are paid at the time of the session.",
  },
  {
    question: "What does a visit cost if I am paying myself?",
    answer:
      "A 60-minute one-to-one evaluation is $160. A 55-minute one-to-one treatment is $120. Those fees do not apply to Medicare beneficiaries.",
  },
  {
    question: "Do you offer packages?",
    answer:
      "Yes. A 6-session pack is $660, a 12-session pack is $1,220, and an 18-session pack is $1,680.",
  },
  {
    question: "Is there a cancellation fee?",
    answer:
      "No. A day’s notice is appreciated if you cannot make it or need to move the time.",
  },
  {
    question: "Do I need a referral?",
    answer:
      'Not in Indiana. Indiana is a direct-access state, so you can see a physical therapist without a referral or a prescription.',
  },
  {
    question: "How soon will I feel a difference?",
    answer:
      "The vast majority of patients notice a change within two weeks of starting care. How long it takes to settle depends on how severe the problem is, how long it has been there, and the demands of work and daily life.",
  },
  {
    question: "What should I wear?",
    answer:
      "Something the therapist can move out of the way. Knee or hip pain: shorts, or loose pants that roll to mid-thigh — not tight leggings. Shoulder pain: a T-shirt. Back pain: clothes that can be adjusted so the area can be examined.",
  },
]

export const gallery = [
  {
    src: "/images/clinic/about-room.jpg",
    title: "Front of the clinic",
    caption: "Suite G, with the door on Thompson Road.",
    alt: "Front of Cloud 9 Physical Therapy, with bikes, a treadmill, and the glass door marked 5370-G",
  },
  {
    src: "/images/clinic/gym.jpg",
    title: "The gym",
    caption: "Parallel bars, balance tools, and the values on the wall.",
    alt: "Clinic gym with exercise balls, parallel bars, and a values list painted on the wall",
  },
  {
    src: "/images/clinic/treatment-bay.jpg",
    title: "Treatment tables",
    caption: "Where the one-to-one work happens.",
    alt: "A row of treatment tables in the Cloud 9 clinic",
  },
  {
    src: "/images/clinic/about.jpg",
    title: "Movement is medicine",
    caption: "The line painted on the blue wall at the front of the gym.",
    alt: "Gym floor with cardio equipment and the words Movement is medicine on the wall",
  },
  {
    src: "/images/services/dry-needling.jpg",
    title: "Dry needling",
    caption: "Dry needling during a visit. Faces are not in the frame.",
    alt: "Dry needling at Cloud 9, showing a shoulder and gloved hands, with no faces",
  },
  {
    src: "/images/clinic/services.jpg",
    title: "Dr. Skye with a patient",
    caption: "The clinic’s own photograph of Dr. Sakshi Nandal during a visit.",
    alt: "Dr. Sakshi Nandal treating a patient at Cloud 9 Physical Therapy",
  },
  {
    src: "/images/team/sakshi.jpg",
    title: "Dr. Skye",
    caption: "Dr. Sakshi Nandal, clinical director.",
    alt: "Dr. Sakshi Nandal standing in front of the Cloud 9 sign",
  },
]
