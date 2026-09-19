const MODULE_2 = {
  "title": "Social Media & Digital Well-being",
  "short": "Social Media & Well-being",
  "time": "~12 min",
  "topics": [
    "Digital footprints",
    "Privacy settings",
    "Algorithmic rabbit holes",
    "Grooming patterns"
  ],
  steps: [
    // ── INTRO LESSON ──
    {
      type: 'lesson',
      title: 'Your Digital Footprint',
      icon: '👣',
      body: `Everything you do online leaves a trace - posts, comments, likes, location check-ins, even things you've deleted. Together, these form your <strong>digital footprint</strong>: a permanent record that employers, universities, and bad actors can all access.<br><br>
      Studies show that <strong>70% of employers screen candidates' social media</strong> before hiring, and over half have decided not to hire someone based on what they found. Your online presence is already part of your professional identity - whether you've thought about it that way or not.`,
      cards: [
        {
          icon: '🌐',
          title: 'Active vs. Passive Footprints',
          body: `Your footprint has two layers:<br><br>
          <strong>Active footprint</strong> - things you deliberately share: posts, profile info, photos, comments, reviews.<br>
          <strong>Passive footprint</strong> - data collected without you actively sharing: your location, browsing history, what you click on, how long you linger on a page, device info.<br><br>
          The passive footprint is often the bigger one. Every platform is tracking far more than you post. A good rule of thumb: before posting, ask yourself <em>"Would I be okay if a future employer, professor, or family member saw this?"</em> If the answer is no - it doesn't belong online.`
        }
      ]
    },

    // ── FOOTPRINT SELF-AUDIT ──
    {
      type: 'interactive',
      subtype: 'footprint-audit',
      items: [
  // ── Active (things you deliberately put out) ──
  { id:'a1', category:'active', weight:2, label:'Posted publicly on Instagram, TikTok, or Twitter/X in the past month',
    tooltip:'Public posts are permanently indexable by search engines and visible to anyone — including future employers and bad actors.' },

  { id:'a2', category:'active', weight:1, label:'Left a public review on Google, Yelp, or Amazon',
    tooltip:'Reviews are tied to your account and often appear in search results for your name.' },

  { id:'a3', category:'active', weight:2, label:'Commented under your real name on a public post, article, or forum',
    tooltip:'Named comments are searchable and often cached by Google even after you delete them.' },

  { id:'a4', category:'active', weight:3, label:'Posted photos or stories that reveal your location, neighborhood, or daily routine',
    tooltip:'Repeated location signals in posts let anyone — including people you don\'t know — map out where you live, work, or spend time regularly.' },

  { id:'a5', category:'active', weight:2, label:'Shared personal opinions on politics, religion, or controversial topics publicly',
    tooltip:'These posts are discoverable and can affect hiring decisions, relationships, or make you a target for harassment campaigns.' },

  { id:'a6', category:'active', weight:1, label:'Have a public LinkedIn profile with your education and work history',
    tooltip:'LinkedIn is intentionally public, but it gives anyone your employer history, school, graduation year, and professional network at a glance.' },

  { id:'a7', category:'active', weight:2, label:'Tagged or been tagged in photos where your face is clearly visible',
    tooltip:'Public photos with your face can be used in reverse image searches to find your other accounts, and are increasingly used in facial recognition tools.' },

  { id:'a8', category:'active', weight:1, label:'Signed up for newsletters, contests, or free trials using your real email',
    tooltip:'Your email is now in commercial databases that are regularly bought, sold, and leaked in breaches.' },

  { id:'a9', category:'active', weight:2, label:'Used your real name or photo on a dating app',
    tooltip:'Dating profiles expose your face, location, age, and personal details to a wide audience with few identity checks — a common starting point for romance scams and stalking.' },

  { id:'a10', category:'active', weight:2, label:'Shared your phone number publicly or used it to sign up for non-essential services',
    tooltip:'Your phone number is a key identity anchor — it can be used to look up your name and address, target you for SIM swapping, or add you to spam and scam call lists.' },

  // ── Passive (collected without you actively sharing) ──
  { id:'p1', category:'passive', weight:2, label:'Used Google Search while logged into a Google account',
    tooltip:'Google logs every search query tied to your account, building a detailed profile of your interests, health concerns, and intentions over time.' },

  { id:'p2', category:'passive', weight:2, label:'Used a loyalty or rewards card at a store (grocery, pharmacy, coffee shop)',
    tooltip:'Purchase histories reveal diet, health patterns, finances, and daily routines — and are regularly sold to data brokers.' },

  { id:'p3', category:'passive', weight:2, label:'Allowed a mobile app to access your location, contacts, or camera',
    tooltip:'Many apps harvest far more than the permission sounds like — location "while using" can still log patterns; contact access uploads your entire address book.' },

  { id:'p4', category:'passive', weight:2, label:'Browsed websites while logged into Chrome, Safari, or Firefox with sync enabled',
    tooltip:'Synced browsing history is stored on company servers and used to build ad targeting profiles tied to your identity.' },

  { id:'p5', category:'passive', weight:1, label:'Used a smart speaker (Alexa, Google Home, Siri) regularly',
    tooltip:'Always-on devices log audio clips and build a voice profile. Conversations near them — including sensitive ones — can be captured and stored.' },

  { id:'p6', category:'passive', weight:2, label:'Had your data exposed in a known breach (check haveibeenpwned.com if unsure)',
    tooltip:'Most people\'s emails, passwords, and personal details have been in at least one breach. Check <a href="https://haveibeenpwned.com" target="_blank" rel="noopener" style="color:var(--teal);font-weight:600">haveibeenpwned.com</a> — free and safe — to see exactly which breaches included your email.' },

  { id:'p7', category:'passive', weight:2, label:'Used public Wi-Fi without a VPN in the past month',
    tooltip:'On unencrypted public networks, anyone on the same network can observe your traffic and metadata — including which sites you visit and when.' },

  { id:'p8', category:'passive', weight:1, label:'Clicked "Accept All" on cookie banners without reading them',
    tooltip:'This grants third-party ad networks permission to track you across every website that uses their code — often hundreds of sites sharing the same tracker.' },

  { id:'p9', category:'passive', weight:1, label:'Auto-synced your photos to iCloud or Google Photos',
    tooltip:'Cloud photo libraries give these companies access to facial recognition data, GPS metadata embedded in photos, and a timestamped visual record of your life.' },
]
    },

    // ── SCENARIO 1: The Tagged Photo ──
    {
      type: 'scenario',
      badge: 'Scenario 1 of 3',
      title: 'The Tagged Photo',
      persona: 'first',
      text: `It's the night before you have a big internship interview. A friend tags you in a photo from a party last weekend - you're in the background, clearly visible, in a situation that looks bad out of context. You didn't post it. You didn't choose to share it.<br><br>
      You find out because a mutual friend texted you: <em>"Hey, did you see what Marcus posted? Might want to take care of that before tomorrow."</em><br><br>
      Your account is set to public. The post has 47 likes. You don't know if the recruiter has already seen it.`,
      // ── IMAGE SLOT ──────────────────────────────────────────────────────────
      // To add a mock Instagram/social media screenshot here:
      //   image: { src: 'images/tagged-photo-scenario.png', alt: 'Screenshot of a tagged post notification', caption: 'The notification that came through' }
      // ────────────────────────────────────────────────────────────────────────
      highlight: `"Might want to take care of that before tomorrow."`
    },
    {
      type: 'question',
      format: 'branching',
      question: `What's the most effective thing you can do right now?`,
      options: [
        { text: 'Untag yourself and ask Marcus to delete the post - then review your privacy settings so you approve tags before they appear on your profile.', correct: true },
        { text: 'Do nothing - the recruiter has probably already seen it and reacting now will only draw more attention.', correct: false },
        { text: 'Delete your entire Instagram account before the interview.', correct: false },
        { text: 'Post something professional right now to push the tagged photo down in your feed.', correct: false }
      ],
      hint: `The goal is to limit who can see it and prevent it from happening again. What combination of immediate action + prevention covers both?`,
      explanation: `Untagging removes it from your profile. Asking Marcus to delete removes it entirely. The real fix is adjusting your privacy settings to require approval before tagged photos appear on your profile — so you're always in control of what's associated with your name. Deleting your account is disproportionate, and posting something "good" doesn't remove the tagged photo.`
    },
    {
      type: 'lesson',
      icon: '⚙️',
      title: 'Taking Control of Your Privacy Settings',
      body: `Most platforms default to <em>public</em> - meaning anyone can see your posts, profile, and tagged content. You don't have to accept those defaults. Here's what to lock down on the platforms you actually use:`,
      cards: [
        {
          icon: '📸',
          title: 'Key Settings Across Major Platforms',
          body: `<strong>Instagram:</strong> Settings → Privacy → Account Privacy → switch to Private. Also: Privacy → Posts → Tags - set to "Manually Approve Tags" so nothing appears on your profile without your consent.<br><br>
          <strong>TikTok:</strong> Settings → Privacy → Private Account (on). Also turn off "Suggest your account to others" and disable "Allow your videos to be downloaded."<br><br>
          <strong>Snapchat:</strong> Settings → Privacy Controls → Contact Me: "My Friends" only. Enable Ghost Mode to hide your location. Turn off Quick Add.<br><br>
          <strong>All platforms:</strong> Enable two-factor authentication. Audit which third-party apps have access to your account - remove any you don't recognize or no longer use. Check your settings every few months; platforms update their privacy options without warning.`
        }
      ]
    },

    // ── SCENARIO 2: The Rabbit Hole ──
    {
      type: 'scenario',
      badge: 'Scenario 2 of 3',
      title: 'The Algorithm Knows You Better Than You Think',
      persona: 'third',
      text: `Alex has been feeling stressed about the economy lately. They watched one YouTube video about "why the economy is rigged," mostly out of curiosity. The autoplay kicked in.<br><br>
      Two hours later, Alex has watched seventeen videos. The content has gradually shifted - each one a little more extreme than the last, a little more certain that the system is broken and most people are too blind to see it. Alex didn't choose any of them. The algorithm did.<br><br>
      Alex didn't notice when the framing shifted from "here's an interesting perspective" to "here's the only truth." They just kept watching.`,
      highlight: `"The algorithm's goal isn't to inform you. It's to keep you watching."`
    },
    {
      type: 'question',
      format: 'multiple',
      question: `Why does the recommendation algorithm keep pushing Alex toward more extreme content?`,
      options: [
        { text: 'The algorithm is politically biased against Alex specifically.', correct: false },
        { text: 'Emotionally charged and sensational content generates more watch time and engagement, which is exactly what the algorithm is optimizing for.', correct: true },
        { text: 'Alex\'s internet provider is filtering their content.', correct: false },
        { text: 'The algorithm detected Alex was stressed and is trying to help by showing relevant content.', correct: false }
      ],
      hint: `Think about what the platform actually wants from you - it's not your education or well-being. What metric drives every recommendation decision?`,
      explanation: `Recommendation algorithms optimize for <strong>engagement and watch time</strong>, not accuracy or balance. Emotionally charged, outrage-inducing content keeps people watching longer than calm, nuanced content. The algorithm doesn't know if something is true — it just knows extreme content gets more clicks and shares. That's why rabbit holes form.`
    },
    {
  format: 'multiselect',
  type: 'question',
  question: `Alex wants to take back some control over what the algorithm shows her. Which of these would actually help?`,
  options: [
    { text: 'Follow a wider range of accounts and creators — including ones she might not fully agree with.', correct: true },
    { text: 'Use TikTok\'s "Refresh For You Page" or YouTube\'s "Don\'t recommend this channel" features to reset recommendations.', correct: true },
    { text: 'Set a daily screen time limit to reduce how much data the algorithm has to work with.', correct: true },
    { text: 'Only use one platform instead of multiple — that way the algorithm has less competition.', correct: false },
    { text: 'When content provokes a strong reaction — anger, fear, outrage — pause before engaging or sharing it.', correct: true }
  ],
  hint: `Think about what the algorithm is actually optimising for. Which of these disrupts that, and which one doesn't really change anything?`,
  explanation: `Four moves that actually work: diversifying who you follow breaks the echo chamber, using platform reset tools clears the slate, limiting screen time reduces the data you're feeding it, and pausing before engaging with emotionally charged content stops you from rewarding exactly what the algorithm is trying to serve you more of. Consolidating to one platform doesn't help — each platform has its own algorithm doing the same thing.`
},
    {
      type: 'question',
      format: 'multiselect',
      question: `Which of these are good strategies for protecting yourself from algorithmic manipulation? Select all that apply.`,
      options: [
        { text: 'Consciously follow accounts with a variety of perspectives, not just ones you already agree with.', correct: true },
        { text: 'Use your platform\'s built-in tools to reset or refresh your recommendations when they feel one-sided.', correct: true },
        { text: 'Set screen time limits or scheduled breaks to avoid hours of passive autoplay.', correct: true },
        { text: 'Stop using social media entirely - it\'s the only safe option.', correct: false },
        { text: 'When content makes you feel strong outrage or fear, pause and ask if it\'s designed to provoke that reaction.', correct: true }
      ],
      hint: `Think about what gives you agency over the algorithm - awareness, diversification, and deliberate use. One option here is an overreaction.`,
      explanation: `You can protect yourself without quitting social media. The four effective moves: diversify who you follow (breaks echo chambers), use platform reset tools (TikTok's "Refresh For You" page, for example), set intentional limits on passive scrolling, and question content that provokes strong outrage or fear. The algorithm counts on you staying passive — conscious engagement disrupts it.`
    },
    {
      type: 'lesson',
      icon: '🧠',
      title: 'How Algorithms Shape What You Believe',
      body: `Algorithms are not neutral. Every platform uses one to decide what you see - and they all share the same goal: keep you engaged as long as possible.`,
      cards: [
        {
          icon: '🔄',
          title: 'Echo Chambers & Rabbit Holes',
          body: `An <strong>echo chamber</strong> forms when you only see viewpoints that reinforce your existing beliefs - making fringe ideas feel like mainstream consensus because that's all your feed shows you.<br><br>
          A <strong>rabbit hole</strong> is the gradual escalation: you start somewhere reasonable and end somewhere extreme because each recommendation was slightly more sensational than the last.<br><br>
          Neither happens because you're gullible. They happen because the system is specifically engineered to exploit how human attention works. Knowing this is your first defense. The second is deliberate, active engagement rather than passive scrolling.`
        }
      ]
    },

    // ── SCENARIO 3: The New Friend ──
    {
      type: 'scenario',
      badge: 'Scenario 3 of 3',
      title: 'The New Friend',
      persona: 'third',
      text: `Priya is 19 and goes to college in a new city. She's been a little lonely and has been spending more time on Instagram. A few weeks ago, someone named "Jake" followed her - they had 3 mutual followers and his profile looked normal: gym photos, college campus posts, a dog.<br><br>
      Jake started commenting on her posts, then DMing her. He's funny, attentive, and seems to really get her. He compliments her constantly and says things like "I've never connected with someone this fast." He's mentioned he goes to a college two hours away, which is why they haven't met yet.<br><br>
      This week, Jake asked if they could move their conversations to WhatsApp because "Instagram is so glitchy." He also mentioned that his family situation is rough right now and said he feels like Priya is the only person he can really talk to.`,
      // ── IMAGE SLOT ──────────────────────────────────────────────────────────
      // To add a mock DM conversation screenshot here:
      //   image: { src: 'images/grooming-dm-scenario.png', alt: 'Screenshot of Instagram DM conversation', caption: 'Jake\'s messages over the past three weeks' }
      // ────────────────────────────────────────────────────────────────────────
      highlight: `"I've never connected with someone this fast. You're the only person I can really talk to."`
    },
    {
      type: 'question',
      format: 'multiselect',
      question: `Which behaviors in this scenario are warning signs of online grooming? Select all that apply.`,
      options: [
        { text: 'Moving the conversation off the main platform to a more private channel (WhatsApp).', correct: true },
        { text: 'Excessive flattery and claiming an unusually deep connection very quickly.', correct: true },
        { text: 'Having mutual followers on Instagram.', correct: false },
        { text: 'Positioning himself as emotionally dependent on Priya - "you\'re the only one I can talk to."', correct: true },
        { text: 'Posting photos of a dog and a campus on his profile.', correct: false },
        { text: 'Never meeting in person despite being relatively close geographically.', correct: true }
      ],
      hint: `Think about the grooming stages: gaining trust, isolating, creating emotional dependency, moving off public platforms. Which of Jake's behaviors match those patterns?`,
      explanation: `Four behaviors are red flags: pushing to move to a private platform (cuts off any platform moderation and oversight), rapid intense emotional connection (manufactured to build dependency quickly), positioning himself as someone Priya is responsible for emotionally (creates obligation and isolation from others), and consistently avoiding in-person contact despite a plausible reason to meet. Mutual followers and a normal-looking profile are not red flags on their own - groomers deliberately construct convincing profiles.`
    },
    {
  format: 'multiselect',
  type: 'question',
  question: `Jordan is 19 and has been talking to someone they met in a gaming community for three weeks. Which of these should raise a red flag?`,
  options: [
    { text: 'They\'ve never video called despite Jordan asking twice — they always have an excuse.', correct: true },
    { text: 'They message frequently and remember small details Jordan has mentioned.', correct: false },
    { text: 'They suggested moving the conversation from the game\'s chat to a private messaging app.', correct: true },
    { text: 'They told Jordan not to mention them to their roommates because "people always misunderstand online friendships".', correct: true },
    { text: 'They\'ve started sending Jordan small gifts and said they feel a strong connection despite never meeting.', correct: true }
  ],
  hint: `Some of these might feel like signs someone really likes Jordan. Think about which ones serve the other person's interests more than Jordan's.`,
  explanation: `Four red flags: avoiding video calls removes the risk of being identified, pushing to a private platform reduces oversight, encouraging secrecy cuts Jordan off from people who might notice warning signs, and gift-giving combined with rapid emotional bonding is a deliberate trust-building tactic. Frequent messaging and remembering details alone aren't suspicious — groomers are often attentive precisely because building that bond is the strategy.`
},
    {
      type: 'question',
      format: 'branching',
      question: `Priya is uncomfortable but feels guilty, like she'd be overreacting if she said something. What's the right move?`,
      options: [
        { text: 'Keep talking to Jake - she\'s probably overthinking it and doesn\'t want to hurt his feelings.', correct: false },
        { text: 'Trust her instincts. Stop responding, block Jake on all platforms, and talk to someone she trusts about what\'s been happening.', correct: true },
        { text: 'Tell Jake she needs space but stay connected in case she\'s wrong about him.', correct: false },
        { text: 'Move to WhatsApp first to see if he seems more trustworthy in a different context.', correct: false }
      ],
      hint: `Feeling guilty about protecting yourself is part of how grooming works - it's designed to make you feel responsible for the other person. What matters is Priya's safety, not Jake's feelings.`,
      explanation: `Grooming works partly by making the target feel responsible for the groomer's emotional state - "you're the only one I can talk to" is a pressure tactic. Priya's discomfort is a legitimate signal worth listening to. The right move is to stop contact, block across all platforms, and bring a trusted person in. Moving to a less monitored platform (WhatsApp) would give a potential predator more control and less accountability. "Staying connected to be safe" is not safer - it's more exposure.`
    },
    {
      type: 'lesson',
      icon: '🚨',
      title: 'Harassment, Grooming & What To Do',
      body: `Online grooming is a process, not a single event. By the time most people recognize it, several stages have already happened. Knowing the pattern helps you spot it earlier.`,
      cards: [
        {
          icon: '📋',
          title: 'The Grooming Pattern & How to Respond',
          body: `The stages typically look like: <strong>Targeting</strong> (finding someone who seems lonely or vulnerable) → <strong>Gaining trust</strong> (flattery, gifts, constant attention) → <strong>Filling a role</strong> (becoming their confidant, creating emotional dependency) → <strong>Isolation</strong> (moving off public platforms, encouraging secrecy) → <strong>Sexualization</strong> (gradually introducing sexual content or requests) → <strong>Coercion</strong> (using leverage to maintain control).<br><br>
          <strong>Red flags to watch for:</strong> someone who moves too fast emotionally, pushes to leave public platforms, makes you feel responsible for their wellbeing, encourages secrecy, or always has a reason not to meet in person.<br><br>
          <strong>If this is happening to you:</strong> Stop engaging. Block on all platforms. Screenshot evidence before blocking. Tell someone you trust - a friend, family member, campus CARE office, or counselor. You are not overreacting. You are not responsible for the other person's feelings.`
        }
      ]
    },

    // ── MINI TEST ──
    {
      type: 'minitest',
      title: `Let's see what stuck`,
      subtitle: `Module 2 · 8 questions · Need 80% to pass`,
      questions: [
        {
          format: 'truefalse',
          question: `Deleting a post guarantees it's permanently removed from the internet.`,
          options: [
            { text: 'True', correct: false },
            { text: 'False', correct: true }
          ],
          explanation: `Once something is posted, it can be screenshotted, cached by search engines, saved by other users, or archived before you delete it. Deletion removes it from the platform but cannot guarantee it no longer exists anywhere. This is why "think before you post" matters more than the ability to delete.`
        },
        {
          format: 'multiple',
          question: `What does a recommendation algorithm actually optimize for?`,
          options: [
            { text: 'Accuracy and balance of information shown to users.', correct: false },
            { text: 'User safety and mental well-being.', correct: false },
            { text: 'Engagement and watch time - keeping you on the platform as long as possible.', correct: true },
            { text: 'Matching content to your stated preferences and interests.', correct: false }
          ],
          explanation: `Algorithms optimize for engagement — clicks, watch time, shares — because that drives ad revenue. Accuracy, balance, and well-being aren't in the equation. Content that provokes strong emotions scores highest, which is why extreme content gets amplified.`
        },
        {
          format: 'multiple',
          question: `Which of the following best describes an "active" digital footprint?`,
          options: [
            { text: 'Data collected passively by platforms, like your browsing history and location.', correct: false },
            { text: 'Content you deliberately publish - posts, comments, photos, reviews.', correct: true },
            { text: 'Data your internet provider logs about your activity.', correct: false },
            { text: 'Information other people post about you without your knowledge.', correct: false }
          ],
          explanation: `Your active footprint is what you consciously put out — posts, comments, tagged content you approve. Your passive footprint is everything platforms collect in the background. Both matter, but the active footprint is most directly under your control.`
        },
        {
          format: 'multiselect',
          question: `Which of these are established warning signs of online grooming? Select all that apply.`,
          options: [
            { text: 'Pushing to move the conversation off a public platform to a private app.', correct: true },
            { text: 'Declaring an unusually intense emotional connection very quickly.', correct: true },
            { text: 'Having a well-maintained profile with photos and posts.', correct: false },
            { text: 'Making you feel emotionally responsible for their wellbeing.', correct: true },
            { text: 'Encouraging secrecy - "don\'t tell your friends/parents about us."', correct: true },
            { text: 'Messaging you frequently throughout the day.', correct: false }
          ],
          hint: `A well-maintained profile and frequent messages aren't red flags on their own - groomers deliberately appear normal. Think about the behaviors that involve control, secrecy, and isolation.`,
          explanation: `The four red flags: moving to a private platform (reduces oversight), rapid intense emotional bonding (manufactured dependency), making the target feel responsible for their wellbeing (isolation tactic), and encouraging secrecy (cuts off people who might notice warning signs). Frequent messages and a normal-looking profile aren't suspicious on their own — groomers deliberately cultivate normal-seeming personas.`
        },
        {
          format: 'truefalse',
          question: `Most social media platforms default to private account settings when you first sign up.`,
          options: [
            { text: 'True', correct: false },
            { text: 'False', correct: true }
          ],
          explanation: `Most platforms default to public — your posts and profile visible to anyone. Platforms benefit from maximum reach, so they default to the most open settings. You have to actively change them; they won't be set conservatively for you.`
        },
        {
          format: 'multiple',
          question: `You've been feeling overwhelmed and start watching videos about anxiety online. Two hours later your feed has shifted to content claiming medication is a conspiracy and doctors can't be trusted. What happened?`,
          options: [
            { text: 'The platform detected your mental health data and flagged your account.', correct: false },
            { text: 'You fell into a recommendation rabbit hole - each video was chosen for engagement, gradually escalating in extremity.', correct: true },
            { text: 'Your search history was sold to a third-party trying to influence your beliefs.', correct: false },
            { text: 'This is normal and reflects a balanced range of perspectives the algorithm is showing you.', correct: false }
          ],
          explanation: `This is a classic algorithmic rabbit hole. You started with a legitimate topic; the algorithm kept serving increasingly extreme content because outrage and fear-based content generates more engagement than balanced content. It wasn't targeted at you specifically - it's a structural feature of how recommendation systems work.`
        },
        {
          format: 'multiple',
          question: `Someone is sending you repeated unwanted messages that feel threatening. What's the right first step?`,
          options: [
            { text: 'Reply once to firmly tell them to stop, then block if they continue.', correct: false },
            { text: 'Do not engage. Block and report them through the platform\'s reporting tools, and screenshot evidence before doing so.', correct: true },
            { text: 'Wait to see if they stop on their own before taking action.', correct: false },
            { text: 'Delete your account so they can\'t contact you anymore.', correct: false }
          ],
          explanation: `Do not engage. Responding — even once — signals you're reachable and can escalate things. Block and report through the platform's tools so there's an official record. Screenshot first, because once you block, access to messages may be limited. Deleting your account destroys evidence and reporting options.`
        },
        {
          format: 'multiple',
          question: `A friend keeps tagging you in photos that show up on your public profile before you even see them. Which setting most directly puts you back in control of what's associated with your name?`,
          options: [
            { text: 'Posting more of your own content so the tagged photos get pushed further down your feed.', correct: false },
            { text: 'Turning on manual tag approval so tagged content only appears on your profile after you review and accept it.', correct: true },
            { text: 'Deleting the friend from your contacts so they can no longer tag you.', correct: false },
            { text: 'Switching off your location services whenever you\'re out with friends.', correct: false }
          ],
          explanation: `Manual <strong>tag approval</strong> (Instagram: Privacy → Posts → Tags → "Manually Approve Tags") means nothing shows up on your profile without your say-so — you stay in control of what's tied to your name, which matters when employers screen social media. Posting more doesn't remove the photo, and turning off location or removing a contact doesn't stop tagged content from appearing. Pair tag approval with a private account for the strongest control.`
        }
      ]
    }
  ]
};
