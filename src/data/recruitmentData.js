export const GENERAL_QUESTIONS = [
  {
    id: "gen_why_join_tds",
    label: "Why do you want to join TDS?",
    type: "textarea",
    placeholder: "Tell us what motivates you to be part of The Debugging Society...",
    required: true
  },
  {
    id: "gen_why_select_you",
    label: "Why should we select you?",
    type: "textarea",
    placeholder: "Highlight your key strengths, dedication, skills, or uniqueness...",
    required: true
  },
  {
    id: "gen_teamwork_experience",
    label: "Tell us about a time when you worked in a team? What was your role and what did you learn from it? (Otherwise mention N/A)",
    type: "textarea",
    placeholder: "Describe the team project/event, your contribution, and key learnings...",
    required: true
  },
  {
    id: "gen_previous_projects",
    label: "Did you work on any projects previously? If yes, briefly describe them, otherwise mention N/A.",
    type: "textarea",
    placeholder: "Brief description of past technical or non-technical projects...",
    required: true
  },
  {
    id: "gen_society_expectations",
    label: "What do you expect from the society?",
    type: "textarea",
    placeholder: "Mentorship, peer learning, hackathons, workshops, community...",
    required: true
  }
];

export const DEPARTMENTS = [
  {
    id: "Web Dev",
    slug: "web-dev",
    name: "Web Dev",
    fullName: "Web Development Department",
    icon: "Code",
    badge: "Core Engineering",
    shortDesc: "Build modern web applications, interactive portals, and scalable UI systems for TDS.",
    expectations: "Hands-on experience with frontend frameworks (React, Next.js, Vue), modern CSS/Tailwind, REST/GraphQL APIs, or backend development with Node/Express/Supabase.",
    questions: [
      {
        id: "web_familiarity_rating",
        label: "How would you rate your familiarity with Web Development on a scale of 1 to 5? (1 = Beginner, 5 = Highly Experienced)",
        type: "scale-rating",
        required: true,
        helperText: "Click a number from 1 (Beginner) to 5 (Highly Experienced)."
      },
      {
        id: "web_technologies_worked",
        label: "What technologies have you worked with? (e.g. HTML, CSS, JavaScript, React, Node.js, Django etc.)",
        type: "textarea",
        placeholder: "e.g., HTML5, CSS3, JavaScript, React, Next.js, Node.js, Express, Tailwind...",
        required: true
      },
      {
        id: "web_developed_websites",
        label: "Have you developed any websites? If yes, provide the links if possible.",
        type: "textarea",
        placeholder: "List links to deployed sites or GitHub repositories...",
        required: true
      },
      {
        id: "web_why_chose_domain",
        label: "Why did you choose web development over other domains?",
        type: "textarea",
        placeholder: "Share what draws you to building for the web...",
        required: true
      },
      {
        id: "web_society_website_features",
        label: "If you had to create a website for our society, what features would you add?",
        type: "textarea",
        placeholder: "Suggest innovative features, interactive sections, event portals, dashboards...",
        required: false
      },
      {
        id: "web_deep_learning_goal",
        label: "What is one thing about Web Development you'd genuinely like to understand better?",
        type: "textarea",
        placeholder: "e.g. Web Performance, SSR/RSC, WebSockets, Security, System Architecture...",
        required: true
      },
      {
        id: "web_links_portfolio",
        label: "Share your GitHub/LinkedIn/Portfolio (if any), otherwise mention N/A.",
        type: "textarea",
        placeholder: "GitHub: https://github.com/..., LinkedIn: ..., Portfolio: ..., or N/A",
        required: true
      }
    ]
  },
  {
    id: "AIML",
    slug: "aiml",
    name: "AIML",
    fullName: "Artificial Intelligence & Machine Learning",
    icon: "Cpu",
    badge: "AI & Data Science",
    shortDesc: "Explore AI models, deep learning architectures, LLMs, Computer Vision, and NLP.",
    expectations: "Proficiency in Python, familiarity with PyTorch/TensorFlow, scikit-learn, OpenCV, HuggingFace transformers, or ML model deployment.",
    questions: [
      {
        id: "aiml_familiarity",
        label: "1. How familiar are you with Machine Learning?",
        type: "radio-group",
        options: [
          "Completely new to ML",
          "I know the basic concepts",
          "I have learned ML and implemented a few models",
          "I have worked on ML projects/competitions"
        ],
        required: true
      },
      {
        id: "aiml_why_join_dept",
        label: "2. Why do you want to join the ML Department of our society?",
        type: "textarea",
        placeholder: "Share your interest and goals in AI/ML...",
        required: true
      },
      {
        id: "aiml_tools_worked",
        label: "3. Which of the following have you worked with?",
        type: "checkbox-group",
        options: [
          "Python",
          "NumPy",
          "Pandas",
          "Matplotlib/Seaborn",
          "Scikit-learn",
          "Jupyter/Google Colab",
          "None of the above"
        ],
        required: true
      },
      {
        id: "aiml_marks_prediction_approach",
        label: "4. Suppose you are given a dataset containing students' attendance, study hours, previous marks, and final marks. How would you approach predicting a student's final marks?",
        type: "textarea",
        placeholder: "Explain feature selection, preprocessing, algorithm choice...",
        required: true
      },
      {
        id: "aiml_missing_values_preprocessing",
        label: "5. You are given a dataset with many missing values. What would you do before training an ML model?",
        type: "textarea",
        placeholder: "Imputation strategies, dropping columns/rows, handling NaN...",
        required: true
      },
      {
        id: "aiml_overfitting_diagnosis",
        label: "6. Imagine your model gives 95% accuracy during training but only 65% accuracy on unseen test data. What do you think could be happening, and what would you try to do about it?",
        type: "textarea",
        placeholder: "Identify overfitting/generalization gap and solutions...",
        required: true
      },
      {
        id: "aiml_built_learned_explored",
        label: "7. Tell us about one thing you have built, learned, or explored",
        type: "textarea",
        placeholder: "Share a project, concept, paper, or tool you experimented with...",
        required: true
      },
      {
        id: "aiml_bonus_house_price",
        label: "8. (BONUS QUESTION) You are given a dataset of houses containing area, number of bedrooms, location, and price. Your task is to predict the price of a new house. What type of ML problem is this, and which basic ML algorithm would you initially consider? Why?",
        type: "textarea",
        placeholder: "Regression vs Classification, Linear Regression / Decision Trees...",
        required: false
      }
    ]
  },
  {
    id: "DSA",
    slug: "dsa",
    name: "DSA",
    fullName: "Data Structures & Algorithms",
    icon: "Binary",
    badge: "Problem Solving",
    shortDesc: "Master algorithmic efficiency, competitive programming, and problem-solving contests.",
    expectations: "Strong grasp of arrays, graphs, trees, DP, recursion, space & time complexity, and regular practice on coding platforms.",
    questions: [
      {
        id: "dsa_familiarity_rating",
        label: "1. Rate your familiarity with DSA/CP on a scale of 1 to 5",
        type: "scale-rating",
        required: true,
        helperText: "Click 1 (Beginner) to 5 (Advanced / Pro)."
      },
      {
        id: "dsa_languages",
        label: "2. Which programming language(s) are you familiar with?",
        type: "text",
        placeholder: "e.g. C++, Java, Python, C...",
        required: true
      },
      {
        id: "dsa_profile_links",
        label: "3. Share a link of your LeetCode / Codeforces / CodeChef profile (if available else NA)",
        type: "text",
        placeholder: "https://leetcode.com/u/yourusername or NA",
        required: true
      },
      {
        id: "dsa_mcq_avg",
        label: "4. [Code Logic 1]\nnum1 = 10\nnum2 = 30\naverage = ___\nPRINT average\n\nWhich expression correctly fills the blank to store the mathematical average, and what is the resulting output?",
        type: "radio-group",
        options: [
          "A) num1 + num2 / 2  |  Output: 25",
          "B) (num1 + num2) / 2  |  Output: 20",
          "C) num1 + num2 / 2  |  Output: Runtime Error",
          "D) num1 + num2  |  Output: 40"
        ],
        required: true
      },
      {
        id: "dsa_mcq_loop_bounds",
        label: "5. [Code Logic 2]\ncolors[] = {\"Red\", \"Green\", \"Blue\"}\nfor(int x = 0; x <= ___; x++)\n    PRINT colors[x];\n\nWhich value fills the blank to print all colors without triggering an Index Out of Bounds Error?",
        type: "radio-group",
        options: [
          "A) 3  (Triggers Index Out of Bounds Error on index 3)",
          "B) 2  (Output: \"Red\", \"Green\", \"Blue\")",
          "C) 1  (Output: \"Red\", \"Green\" - stops early)",
          "D) LENGTH(colors)  (Triggers Index Out of Bounds Error because length is 3)"
        ],
        required: true
      },
      {
        id: "dsa_mcq_div_zero",
        label: "6. [Code Logic 3]\ntotal = 100\ncount = 0\naverage\nIF (count ___ 0) THEN\n    average = total / count\n    PRINT average\nELSE\n    PRINT \"Error: Division by zero\"\n\nWhich comparison operator should fill the blank to avoid a Runtime Error?",
        type: "radio-group",
        options: [
          "A) ==  (Triggers Runtime Error: Division by Zero)",
          "B) !=  (Output: \"Error: Division by zero\")",
          "C) =  (Triggers Syntax Error: Assignment operator used in condition)",
          "D) <  (Triggers Runtime Error: Division by Zero)"
        ],
        required: true
      },
      {
        id: "dsa_tell_about_yourself",
        label: "7. Tell us about yourself.",
        type: "textarea",
        placeholder: "Share your background, interests, and coding journey...",
        required: true
      },
      {
        id: "dsa_group_work_experience",
        label: "8. Describe a situation where you worked in a group to achieve a specific goal. What role did you play, what actions did you take, and what did you learn from the outcome?",
        type: "textarea",
        placeholder: "Describe the situation, your role, actions, and learnings...",
        required: true
      },
      {
        id: "dsa_contributing_factor",
        label: "9. What do you think would be a contributing factor from your side? If you join TDS.",
        type: "textarea",
        placeholder: "How will you contribute to the community, peer learning, contests...",
        required: true
      }
    ]
  },
  {
    id: "PR & Sponsi",
    slug: "pr-sponsi",
    name: "PR & Sponsi",
    fullName: "Public Relations & Sponsorships",
    icon: "Briefcase",
    badge: "Outreach & Growth",
    shortDesc: "Drive corporate partnerships, sponsor outreach, speaker onboarding, and community relations.",
    expectations: "Strong communication, negotiation skills, cold emailing/LinkedIn outreach experience, pitch creation, and event sponsorship execution.",
    questions: [
      {
        id: "pr_comm_rating",
        label: "1. How would you rate your communication skills? (1 - Need significant improvement, 5 - Very confident)",
        type: "scale-rating",
        required: true,
        helperText: "Click 1 (Need significant improvement) to 5 (Very confident)."
      },
      {
        id: "pr_time_commitment",
        label: "2. How much time can you realistically contribute to TDS every week?",
        type: "radio-group",
        options: ["Less than 2 hours", "2-4 hours", "4-6 hours", "6+ hours", "Depends on the event/requirement"],
        required: true
      },
      {
        id: "pr_git_workshop_promo",
        label: "3. Imagine TDS is conducting a Git & GitHub workshop for 1st-year students. Write a 2-3 line Instagram story/post that would make students want to attend.",
        type: "textarea",
        placeholder: "Write 2-3 lines of engaging story/post copy...",
        required: true
      },
      {
        id: "pr_low_reg_strategy",
        label: "4. TDS is organizing an event tomorrow, but registrations are much lower than expected. What would you do to increase registrations?",
        type: "textarea",
        placeholder: "Detail your emergency promotion and outreach strategy...",
        required: true
      },
      {
        id: "pr_whatsapp_pitch",
        label: "5. Write a short WhatsApp message (3-4 lines) convincing a 1st-year student to register for a TDS event.",
        type: "textarea",
        placeholder: "Write a friendly, convincing WhatsApp broadcast message...",
        required: true
      },
      {
        id: "pr_hackathon_sponsi_pitch",
        label: "6. Write a short sponsorship pitch to a company for a 24-hour hackathon at NSUT.",
        type: "textarea",
        placeholder: "Subject, company value proposition, reach, and CTA...",
        required: true
      },
      {
        id: "pr_turnout_15min_crisis",
        label: "7. An event starts in 15 minutes, but the turnout is very low. What would you do RIGHT NOW to increase the audience?",
        type: "textarea",
        placeholder: "Immediate, on-the-ground tactics to pull crowd...",
        required: true
      },
      {
        id: "pr_zero_budget_promo",
        label: "8. Imagine TDS gives you ₹0 budget and asks you to promote an upcoming event to as many NSUT students as possible.",
        type: "textarea",
        placeholder: "Organic growth tactics, college networks, word-of-mouth...",
        required: true
      },
      {
        id: "pr_why_select_for_pr",
        label: "9. Why should we select you for PR/Sponsorship?",
        type: "textarea",
        placeholder: "Your passion, networking skills, experience, or drive...",
        required: true
      }
    ]
  },
  {
    id: "Social media",
    slug: "social-media",
    name: "Social media",
    fullName: "Social Media & Creative Design",
    icon: "Share2",
    badge: "Content & Branding",
    shortDesc: "Craft high-engagement visual assets, reels, promotional graphics, and brand strategy.",
    expectations: "Creativity with Figma, Canva, Adobe Photoshop, Premiere Pro, After Effects, copy-writing, reel editing, and social analytics.",
    subDepartments: [
      {
        id: "Social Media - VE",
        name: "VE (Video Editing)",
        badge: "Video Production",
        shortDesc: "Reels, promotional teasers, event aftermovies, and kinetic typography edits.",
        expectations: "Proficiency in Premiere Pro, After Effects, CapCut, DaVinci Resolve, or Final Cut Pro.",
        questions: [
          {
            id: "sm_ve_previous_exp",
            label: "Do you have any previous experience for video editing?",
            type: "radio-group",
            options: ["Yes", "No"],
            required: true
          },
          {
            id: "sm_ve_software",
            label: "Which Video Editing software(s) are you familiar with?",
            type: "text",
            placeholder: "e.g., Premiere Pro, After Effects, CapCut, DaVinci Resolve...",
            required: true
          },
          {
            id: "sm_ve_drive_links",
            label: "Provide the drive link of your best video editing works",
            type: "textarea",
            placeholder: "Google Drive folder link or unlisted video portfolio links...",
            required: true
          }
        ]
      },
      {
        id: "Social Media - GD",
        name: "GD (Graphic Design)",
        badge: "Visual Design",
        shortDesc: "Posters, carousels, branding banners, UI graphics, and story templates.",
        expectations: "Creativity with Figma, Canva, Adobe Photoshop, or Illustrator.",
        questions: [
          {
            id: "sm_gd_software",
            label: "Which design software and tools are you proficient in?",
            type: "textarea",
            placeholder: "e.g., Figma, Canva, Photoshop, Illustrator...",
            required: true
          },
          {
            id: "sm_gd_portfolio",
            label: "Link to your Graphic Design Portfolio / Behance / Drive Folder",
            type: "textarea",
            placeholder: "Provide links to your posters, carousel designs, or brand assets...",
            required: true
          },
          {
            id: "sm_gd_poster_idea",
            label: "How would you design a high-impact Instagram carousel for a hackathon announcement?",
            type: "textarea",
            placeholder: "Color scheme, typography, grid layout, visual hierarchy...",
            required: true
          }
        ]
      },
      {
        id: "Social Media - Content Writing",
        name: "Content Writing",
        badge: "Copywriting & Hooks",
        shortDesc: "Caption hooks, campaign scripts, newsletter copy, and social media text.",
        expectations: "Strong copywriting skills, audience engagement hooks, storytelling, and content strategy.",
        questions: [
          {
            id: "sm_cw_written_before",
            label: "1. Have you written content before?",
            type: "radio-group",
            options: ["Yes", "No"],
            required: true
          },
          {
            id: "sm_cw_where_written",
            label: "2. Where have you written?",
            type: "checkbox-group",
            options: ["Instagram captions", "Blogs", "College fest", "Personal page", "N/A"],
            required: true
          },
          {
            id: "sm_cw_hours_per_week",
            label: "3. How many hours can you give per week for content work?",
            type: "radio-group",
            options: ["2-3 hrs", "4-6 hrs", "6+ hrs"],
            required: true
          },
          {
            id: "sm_cw_git_hook",
            label: "4. Write a 2-line Instagram hook for: \"TDS is conducting a Git & GitHub workshop for freshers\"",
            type: "textarea",
            placeholder: "Write 2 catchy hook lines...",
            required: true
          },
          {
            id: "sm_cw_coding_comp_style",
            label: "5. Convert this into catchy style: \"The Debugging Society will be conducting a coding competition on 20th August\"",
            type: "text",
            placeholder: "Catchy rewording...",
            required: true
          },
          {
            id: "sm_cw_hackathon_caption",
            label: "6. Write an Instagram caption + 3 hashtags for TDS 24 hour hackathon",
            type: "textarea",
            placeholder: "Caption copy + 3 hashtags...",
            required: true
          },
          {
            id: "sm_cw_crunch_handling",
            label: "7. A fest is in 2 days and we need 5 posts in 24hrs. How will you handle it?",
            type: "text",
            placeholder: "Briefly explain your speed and workflow strategy...",
            required: true
          },
          {
            id: "sm_cw_links",
            label: "8. Share links to any content you’ve written. Blog, Instagram page, Docs, Canva. (N/A if none)",
            type: "text",
            placeholder: "Links to past work or N/A",
            required: true
          }
        ]
      }
    ]
  }
];

export const BRANCHES = [
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Design (B.Des)",
  "Bachelor of Fashion Technology (B.FTech)",
  "Bio-Technology (BT)",
  "Civil Engineering (CE)",
  "Computer Science and Engineering (Artificial Intelligence) (CSAI)",
  "Computer Science and Engineering (Big Data Analytics) (CSDA)",
  "Computer Science and Engineering (CSE)",
  "Computer Science and Engineering (Data Science) (CSDS)",
  "Computer Science and Engineering (Internet of Things) (CIOT)",
  "Electrical Engineering (EE)",
  "Electronics and Communication Engineering (Artificial Intelligence and Machine Learning) (ECAM)",
  "Electronics and Communication Engineering (ECE)",
  "Electronics Engineering (VLSI Design and Technology) (EVDT)",
  "Geoinformatics (GI)",
  "Information Technology (IT)",
  "Information Technology (Network and Information Security) (ITNS)",
  "Instrumentation and Control Engineering (ICE)",
  "Mathematics and Computing (MAC)",
  "Mechanical Engineering (Electric Vehicles) (MEEV)",
  "Mechanical Engineering (ME)"
];
