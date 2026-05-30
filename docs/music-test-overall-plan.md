# Yimusic Music Personality Test Overall Plan

> Status: detailed product, design, backend, scoring, and content-generation blueprint
> Repository: `YiRanLi333/Yimusic`
> Primary goal: build a music-preference personality test with a rigorous four-axis E/I, S/N, T/F, J/P foundation.
> Product note: this is an entertainment and self-reflection experience, not a clinical psychology or official MBTI instrument.

## 1. Product Vision

Yimusic is a music-personality test website. It asks users how they listen, what artists and songs attract them, how they build playlists, how they discover music, how they use music socially or emotionally, and how much structure they prefer in their listening life. The site then maps those answers to a four-letter music type and a shareable result page.

The product should feel like a polished personality test built around music culture: serious enough that the result feels reasoned, warm enough that users want to share it, and transparent enough that future developers can debug the score from the answer trace.

## 2. Strategic Positioning

### 2.1 What This Product Is

- A public interactive test for music-based self-reflection.
- A shareable result experience with a stable result URL.
- A structured scoring engine based on four paired axes.
- A content system where questions, scoring weights, result copy, and result visuals can evolve.
- A NAS-deployable web app that follows the operational style of `yiranli-platform`.

### 2.2 What This Product Is Not

- Not official MBTI, Myers-Briggs, or a clinical personality model.
- Not a mental-health, hiring, school, medical, or diagnostic tool.
- Not a Spotify/Apple Music importer in version 1.
- Not an AI chat test where results are non-deterministic.
- Not a clone of ACGTI, SBTI, or MBTI public sites.

### 2.3 Success Criteria

Version 1 is successful if:

- Users can complete the test in 4 to 7 minutes.
- The result feels specific to music behavior rather than generic personality copy.
- Each result can be explained from the raw scores and answer weights.
- Result URLs can be reopened and shared.
- Admin can inspect submissions and diagnose scoring outcomes.
- The system can run on the NAS with Docker Compose.
- Every scoring change is covered by automated fixtures.

## 3. Reference Strategy

References named by the user:

- `tianxingleo/ACGTI`
- `UnluckyNinja/SBTI-test`
- `https://acgti.tianxingleo.top/`
- `https://sbti.unun.dev/`
- `https://mbti.mobi/`
- `YiRanLi333/yiranli-platform`

How to use references:

- Use ACGTI/SBTI/MBTI-like sites for flow inspiration: start page, question pages, results, sharing, type language.
- Use `yiranli-platform` for backend/admin/deployment patterns: Go API, Nuxt app, PostgreSQL, visitor/access logging, ID lookup, Docker Compose, NAS verification.
- Do not copy question text, result names, scoring formulas, UI composition, brand language, or assets.

## 4. Recommended Product Name

Working product name: `Yimusic Type`.

Reasoning:

- It keeps the repo identity visible.
- It is clear enough for users.
- It avoids claiming to be an official psychological instrument.
- It can later support Chinese or English copy without changing the architecture.

Alternative names:

- `Yimusic Persona`: warmer, less test-like.
- `Music Type Lab`: more methodological.
- `SongSelf`: more playful, less directly tied to repo.

## 5. Version 1 Scope

### 5.1 Must Have

- Public start page.
- 40 scored questions, 10 per axis.
- Optional unscored flavor questions for favorite artist/song/genre.
- Deterministic scoring engine.
- 16 result types.
- Stable result ID and result page.
- Backend APIs for active question set, submission, result lookup, and admin inspection.
- PostgreSQL persistence.
- Visitor/access logging inspired by `yiranli-platform`.
- Admin dashboard with submissions, result distribution, and scoring trace.
- Docker Compose deployment on NAS.
- Automated scoring tests and representative fixtures.

### 5.2 Should Have

- Draft answer persistence in browser local storage.
- Completion duration tracking.
- Basic rate limiting.
- Result share-card preview.
- Admin question/result preview.
- Low-confidence result messaging when scores are close.

### 5.3 Later

- Music platform import.
- Account system.
- Multi-language content editor.
- AI-generated commentary.
- A/B test framework for question quality.
- Public aggregate type stats.

## 6. Recommended Stack

The recommended stack mirrors the proven shape of `yiranli-platform`.

### 6.1 Frontend

- Framework: Nuxt 4 + Vue 3.
- Styling: CSS variables and scoped CSS first; Tailwind/Uno only if adopted deliberately.
- Fonts: Geist Sans or equivalent clean sans, with system Chinese fallback.
- State: Vue composables for question flow and draft persistence.
- Rendering: SSR for result pages and SEO-friendly public pages.
- Assets: real/generated bitmap result-card backgrounds later, not decorative SVG-only UI.

### 6.2 Backend

- Language: Go.
- Router: `chi`.
- Database: PostgreSQL.
- DB driver: `pgx`.
- Typed queries: `sqlc`.
- Migrations: `goose`.
- Logging: `zerolog`.
- Runtime: Docker containers on NAS.

### 6.3 Deployment

- Docker Compose services: `yimusic-web`, `yimusic-api`, `yimusic-postgres`.
- Reverse proxy can route public domain to web/API later.
- Verification should include container status, API health, web HTTP check, and logs.

### 6.4 Repository Structure

```text
Yimusic/
  AGENTS.md
  docs/
    music-test-overall-plan.md
    scoring-model.md
    api-contract.md
    deployment-nas.md
  apps/
    web/
      app.vue
      nuxt.config.ts
      package.json
      assets/
      components/
        AppShell.vue
        StartPanel.vue
        QuestionCard.vue
        LikertScale.vue
        ProgressRail.vue
        ResultHero.vue
        AxisBreakdown.vue
        ShareCard.vue
        AdminTable.vue
      composables/
        useTestSession.ts
        useDraftAnswers.ts
        useApi.ts
      pages/
        index.vue
        test.vue
        result/[resultId].vue
        about.vue
        admin/index.vue
        admin/submissions/index.vue
        admin/submissions/[id].vue
        admin/questions.vue
        admin/results.vue
      types/
        test.ts
        result.ts
  services/
    api/
      cmd/
        api/main.go
        migrate/main.go
      internal/
        admin/
        config/
        db/
        logger/
        questions/
        results/
        scoring/
        server/
        submissions/
        visitors/
      migrations/
      queries/
      sqlc.yaml
      go.mod
      Dockerfile
  deploy/
    docker-compose.yml
    .env.example
```

## 7. Frontend UI Design

Design read: interactive personality-test app for music listeners, with a polished musical product language, leaning toward Nuxt/Vue, restrained motion, tactile answer controls, and transparent result explanation.

### 7.1 Design Dials

- Design variance: 7/10. The product should feel memorable and music-native.
- Motion intensity: 5/10. Motion should clarify progress and selection, not dominate.
- Visual density: 5/10. Test screens stay calm; result/admin screens carry more detail.

### 7.2 Visual System

Recommended palette:

- Background dark: `#0d0f12`.
- Surface: `#171a1f`.
- Raised surface: `#20242b`.
- Text primary: `#f4f1ea`.
- Text secondary: `#a9adb6`.
- Accent: `#2fd6a3`.
- Low-confidence/warning: `#f2b84b`.
- Error: `#f06666`.

Rules:

- Use one accent color consistently.
- Avoid generic purple/blue AI gradients.
- Avoid fake music-player screenshots unless a real integration exists.
- Use cards only where they frame an actual object: question, result block, admin row, modal.
- Do not put cards inside cards.
- Keep radii consistent: 16px shell, 14px controls, 8px admin fields.

Typography:

- Display: Geist Sans or equivalent sans.
- Body: system sans with Chinese fallback.
- Mono: result codes, IDs, admin traces.
- Avoid serif as default.

### 7.3 Public Routes

- `/`: start page and immediate test entry.
- `/test`: active 40-question flow.
- `/result/[resultId]`: result page.
- `/about`: method, disclaimer, privacy basics.

### 7.4 Admin Routes

- `/admin/login`: admin authentication.
- `/admin`: overview.
- `/admin/submissions`: searchable submission table.
- `/admin/submissions/[id]`: answer and score trace.
- `/admin/questions`: question set management.
- `/admin/results`: result content management.
- `/admin/analytics`: type distribution and question statistics.

### 7.5 Start Page

The first viewport should be the test experience, not a marketing landing page.

Layout:

- Left: product title, one-sentence promise, primary start button.
- Right: interactive four-axis equalizer visual.
- Bottom edge: preview strip of result codes and tags so the next section is visible.

English placeholder copy:

- Title: `What does your listening style reveal?`
- Subtitle: `Answer 40 questions about songs, artists, scenes, and emotions to generate your Yimusic Type.`
- Primary CTA: `Start the test`
- Secondary CTA: `See the method`

Chinese production copy should be authored later in UTF-8-safe files or through the admin content system.

### 7.6 Question Flow

Question screen anatomy:

- Header: logo, progress `12 / 40`, subtle save state.
- Main: question text, optional context line, answer control.
- Footer: previous button, next button, skip only for optional questions.

Controls:

- Most scored questions: 5-point Likert.
- Calibration questions: forced A/B only if needed.
- Flavor questions: text input, single select, or multi-select.

Likert labels:

- 1: Strongly unlike me.
- 2: Somewhat unlike me.
- 3: Not sure.
- 4: Somewhat like me.
- 5: Strongly like me.

Behavior:

- Answers save to local storage immediately.
- User can go backward without losing answers.
- Submit button appears only after required questions are complete.
- If submission fails, answers remain available and retry is possible.
- Progress should not reveal which dimension is being scored, to reduce gaming.

### 7.7 Result Page

The result page should feel like a personalized album sleeve plus an explainable score report.

Top area:

- Four-letter result code, e.g. `M-ENFP`.
- Type name, e.g. `The Festival Curator`.
- One-line identity summary.
- Confidence: high, medium, or low.
- Share and retake controls.

Score area:

- Four axis rows with side labels.
- Show percentage split and winning letter.
- Use a center marker or dial, not heavy filled progress bars.
- Include short explanation of what each axis means in music terms.

Narrative blocks:

- How you listen.
- What sounds attract you.
- What your playlists feel like.
- Best listening scenes.
- Possible blind spot.
- Recommended play style.

Share card:

- Square and 4:5 variants.
- Contains result code, result name, tagline, axis mini-marks.
- Does not expose private answers.

### 7.8 Admin UI

Admin should be calm, dense, and operational.

Dashboard metrics:

- Total submissions.
- Submissions today.
- Completion rate.
- Average completion time.
- Average confidence.
- Top result types.

Submission list columns:

- Created time.
- Result type.
- Confidence.
- Duration.
- Question-set version.
- Visitor ID.
- IP region if available.

Submission detail sections:

- Raw answers.
- Axis score totals.
- Normalized percentages.
- Winner letters.
- Confidence margins.
- Top contributing questions.
- Result copy version.

## 8. Backend Architecture

### 8.1 Backend Modules

Recommended Go package boundaries:

- `internal/server`: route registration, middleware, request/response helpers.
- `internal/questions`: active question-set loading, question validation, public serialization.
- `internal/scoring`: deterministic scoring engine, confidence calculation, fixture tests.
- `internal/results`: result-type content lookup and result page DTO building.
- `internal/submissions`: submission creation, result persistence, lookup by public ID.
- `internal/visitors`: visitor ID, IP extraction, request logging, basic rate limiting.
- `internal/admin`: admin-only queries and mutation endpoints.
- `internal/db`: pgx pool, sqlc generated queries, migrations.
- `internal/config`: env config.
- `internal/logger`: zerolog setup.

### 8.2 Public API Endpoints

All public endpoints should return structured JSON.

```text
GET  /api/health
GET  /api/test/active
POST /api/test/submissions
GET  /api/results/{resultId}
GET  /api/results/{resultId}/share
```

`GET /api/test/active` returns:

```json
{
  "questionSetId": "qset_2026_01",
  "version": 1,
  "title": "Yimusic Type Core Test",
  "questionCount": 40,
  "questions": [
    {
      "id": "EI01",
      "order": 1,
      "text": "When a song excites me, I usually want to send it to someone right away.",
      "answerType": "likert5",
      "required": true
    }
  ]
}
```

The public response must not expose weights or scoring direction.

`POST /api/test/submissions` accepts:

```json
{
  "questionSetId": "qset_2026_01",
  "answers": [
    { "questionId": "EI01", "value": 5 },
    { "questionId": "SN01", "value": 2 }
  ],
  "flavor": {
    "favoriteArtist": "optional",
    "favoriteSong": "optional",
    "favoriteGenres": ["optional"]
  },
  "clientMeta": {
    "startedAt": "2026-05-31T12:00:00Z",
    "completedAt": "2026-05-31T12:06:20Z",
    "draftRestored": false
  }
}
```

Response:

```json
{
  "resultId": "ymr_8m4JxQ2p",
  "resultType": "M-ENFP",
  "confidence": "high",
  "resultUrl": "/result/ymr_8m4JxQ2p"
}
```

`GET /api/results/{resultId}` returns:

```json
{
  "resultId": "ymr_8m4JxQ2p",
  "resultType": "M-ENFP",
  "typeName": "The Festival Curator",
  "tagline": "You turn music into shared momentum.",
  "confidence": "high",
  "scores": {
    "EI": { "left": "E", "right": "I", "winner": "E", "leftPercent": 68, "rightPercent": 32, "margin": 36 },
    "SN": { "left": "S", "right": "N", "winner": "N", "leftPercent": 41, "rightPercent": 59, "margin": 18 },
    "TF": { "left": "T", "right": "F", "winner": "F", "leftPercent": 38, "rightPercent": 62, "margin": 24 },
    "JP": { "left": "J", "right": "P", "winner": "P", "leftPercent": 44, "rightPercent": 56, "margin": 12 }
  },
  "sections": {
    "listeningStyle": "...",
    "soundAttraction": "...",
    "playlistShape": "...",
    "bestScenes": ["..."],
    "blindSpot": "...",
    "recommendation": "..."
  }
}
```

### 8.3 Admin API Endpoints

```text
POST /api/admin/login
GET  /api/admin/submissions
GET  /api/admin/submissions/{id}
GET  /api/admin/analytics/summary
GET  /api/admin/questions
POST /api/admin/questions/draft
POST /api/admin/questions/{questionSetId}/activate
GET  /api/admin/result-types
PUT  /api/admin/result-types/{typeCode}
```

V1 can make question/result editing read-only in UI if full editing is too much, but the data model should be ready for versions.

### 8.4 Database Tables

Core tables:

```sql
CREATE TABLE question_sets (
  id TEXT PRIMARY KEY,
  version INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'active', 'archived')),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  activated_at TIMESTAMPTZ
);

CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  question_set_id TEXT NOT NULL REFERENCES question_sets(id),
  sort_order INTEGER NOT NULL,
  text TEXT NOT NULL,
  answer_type TEXT NOT NULL CHECK (answer_type IN ('likert5', 'choice', 'multi_select', 'text')),
  required BOOLEAN NOT NULL DEFAULT true,
  scoring_axis TEXT CHECK (scoring_axis IN ('EI', 'SN', 'TF', 'JP')),
  scoring_pole TEXT CHECK (scoring_pole IN ('E', 'I', 'S', 'N', 'T', 'F', 'J', 'P')),
  reverse_scored BOOLEAN NOT NULL DEFAULT false,
  weight NUMERIC(5,2) NOT NULL DEFAULT 1.00,
  facet TEXT NOT NULL DEFAULT '',
  public_meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  private_meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE(question_set_id, sort_order)
);

CREATE TABLE result_types (
  type_code TEXT PRIMARY KEY,
  type_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  summary TEXT NOT NULL,
  listening_style TEXT NOT NULL,
  sound_attraction TEXT NOT NULL,
  playlist_shape TEXT NOT NULL,
  best_scenes JSONB NOT NULL DEFAULT '[]'::jsonb,
  blind_spot TEXT NOT NULL,
  recommendation TEXT NOT NULL,
  visual_tokens JSONB NOT NULL DEFAULT '{}'::jsonb,
  content_version INTEGER NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_key TEXT UNIQUE NOT NULL,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_agent TEXT NOT NULL DEFAULT '',
  ip_hash TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT '',
  region TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT ''
);

CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id TEXT UNIQUE NOT NULL,
  question_set_id TEXT NOT NULL REFERENCES question_sets(id),
  visitor_id UUID REFERENCES visitors(id),
  result_type TEXT NOT NULL REFERENCES result_types(type_code),
  confidence TEXT NOT NULL CHECK (confidence IN ('low', 'medium', 'high')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  duration_seconds INTEGER,
  answers JSONB NOT NULL,
  flavor JSONB NOT NULL DEFAULT '{}'::jsonb,
  raw_scores JSONB NOT NULL,
  normalized_scores JSONB NOT NULL,
  scoring_trace JSONB NOT NULL,
  client_meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE access_logs (
  id BIGSERIAL PRIMARY KEY,
  visitor_id UUID REFERENCES visitors(id),
  path TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  ip_hash TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Indexes:

```sql
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX idx_submissions_result_type ON submissions(result_type);
CREATE INDEX idx_submissions_question_set ON submissions(question_set_id);
CREATE INDEX idx_access_logs_created_at ON access_logs(created_at DESC);
CREATE INDEX idx_questions_question_set_order ON questions(question_set_id, sort_order);
```

### 8.5 Privacy Rules

- Do not store raw IP addresses unless there is a clear operational need.
- Store hashed IP or coarse location only.
- Do not store favorite song/artist as sensitive identity data beyond the result personalization use.
- Public result page must not show raw answers by default.
- Admin-only pages can show raw answers for debugging.
- Provide simple privacy copy on `/about`.

## 9. Scoring Model

### 9.1 Four Axes In Music Terms

The model borrows the familiar four-axis contrast but translates each axis into music behavior.

#### E/I: Social Energy In Music

- `E` means music energy tends to move outward: sharing songs, concerts, social playlists, communal listening, music as connection.
- `I` means music energy tends to move inward: private listening, headphones, solitary interpretation, music as internal space.

This is not general extroversion. It only measures how music behavior relates to social energy.

#### S/N: Concrete Sound vs Conceptual Pattern

- `S` means the listener focuses on concrete sonic details: groove, vocal texture, production, familiar craft, real sound and bodily rhythm.
- `N` means the listener focuses on abstract meaning: symbolism, concept albums, genre fusion, story, future sound, hidden patterns.

This is not intelligence or creativity. It measures what kind of musical information the user privileges.

#### T/F: Analytical Evaluation vs Emotional Resonance

- `T` means the listener evaluates music through structure, technique, production, lyrics-as-writing, originality, ranking, and critique.
- `F` means the listener evaluates music through mood, empathy, memory, healing, identity, and emotional truth.

This does not mean T users lack emotion or F users lack taste. It measures first-pass judgment style.

#### J/P: Curated Structure vs Open Discovery

- `J` means the listener likes organized playlists, planned listening, clean libraries, known contexts, and deliberate curation.
- `P` means the listener likes shuffle, exploration, unfinished playlists, surprise discoveries, and mood-led listening.

This is not responsibility or chaos. It measures structure preference in music life.

### 9.2 Question Count

Version 1 uses 40 scored questions:

- 10 questions for E/I.
- 10 questions for S/N.
- 10 questions for T/F.
- 10 questions for J/P.

Each axis should include:

- 5 questions leaning toward the left pole.
- 5 questions leaning toward the right pole.
- At least 3 reverse-scored items.
- At least 3 behavioral items.
- At least 2 preference items.
- At least 1 tension item that forces nuance.

### 9.3 Answer Scale

Use 5-point Likert values:

- 1 = strongly unlike me.
- 2 = somewhat unlike me.
- 3 = not sure / neutral.
- 4 = somewhat like me.
- 5 = strongly like me.

### 9.4 Per-Question Scoring

Each scored question has:

- `axis`: one of `EI`, `SN`, `TF`, `JP`.
- `pole`: one pole the statement directly supports.
- `reverse_scored`: whether high agreement supports the opposite pole.
- `weight`: default `1.0`, heavier calibration item can be `1.2`, weaker flavor item can be `0.8`.
- `facet`: behavior subcategory.

Convert answer value to centered score:

```text
centered = answer_value - 3
```

So:

- 1 => -2
- 2 => -1
- 3 => 0
- 4 => +1
- 5 => +2

If `reverse_scored = true`, multiply centered by `-1`.

If centered is positive, add `abs(centered) * weight` to the question's pole.

If centered is negative, add `abs(centered) * weight` to the opposite pole.

Neutral answer contributes 0.

### 9.5 Axis Normalization

For an axis:

```text
left_score = raw score for left pole
right_score = raw score for right pole
total = left_score + right_score
left_percent = round(left_score / total * 100)
right_percent = 100 - left_percent
margin = abs(left_percent - right_percent)
winner = pole with larger percent
```

If `total = 0`, treat axis as 50/50 and choose `low confidence tie` rules.

### 9.6 Tie Rules

If an axis margin is less than 6 points:

- Keep the winning letter based on raw score.
- Mark the axis as `borderline`.
- Lower global confidence.
- Result page should say this axis is flexible.

If raw score is exactly tied:

- Use the answer to the strongest calibration question for that axis.
- If still tied, choose the more conservative public result order: `I`, `S`, `F`, `P`.
- Store the tie-break reason in scoring trace.

### 9.7 Confidence

Axis confidence:

- `high`: margin >= 20.
- `medium`: margin 10 to 19.
- `low`: margin 0 to 9.

Overall confidence:

- `high`: at least 3 axes high and no low axes.
- `medium`: no more than 1 low axis.
- `low`: 2 or more low axes, or any exact tie.

The result page must not apologize for low confidence. It should frame it as flexibility: `Your music type is close on two axes, so this result describes your current pattern rather than a fixed label.`

### 9.8 Result Code

Use a prefix to avoid claiming official MBTI:

```text
M-ENFP
M-ISTJ
M-INFJ
```

The four letters still come from E/I, S/N, T/F, J/P.

## 10. Sixteen Music Result Types

These names are original working labels. They should be edited for final brand voice, but the type logic is ready for V1.

| Code | Working name | Core idea | Music behavior |
|---|---|---|---|
| M-ENTJ | The Stage Architect | Turns taste into direction | Builds bold playlists, notices structure, likes high-impact music moments |
| M-ENTP | The Genre Hacker | Experiments with sound possibilities | Loves unusual crossovers, debates taste, follows weird recommendations |
| M-ENFJ | The Chorus Leader | Uses music to gather emotion | Shares songs as care, curates group mood, remembers everyone's anthems |
| M-ENFP | The Festival Curator | Turns music into shared discovery | Sends songs quickly, loves new sounds, follows emotional sparks |
| M-ESTJ | The Setlist Captain | Likes reliable structure and strong execution | Builds practical playlists, respects craft, knows what works in a room |
| M-ESTP | The Beat Chaser | Follows movement, energy, and immediacy | Likes physical rhythm, live energy, spontaneous discoveries |
| M-ESFJ | The Memory DJ | Connects people through familiar emotional songs | Makes playlists for events, memories, friends, seasons |
| M-ESFP | The Vibe Sprinter | Lives through immediate musical mood | Follows vibe, danceability, scenes, and social momentum |
| M-INTJ | The Concept Producer | Sees music as a system of ideas | Likes concept albums, production logic, long-term taste evolution |
| M-INTP | The Sound Theorist | Dissects patterns and possibilities | Compares structures, obscure genres, production choices, sonic experiments |
| M-INFJ | The Hidden Scorekeeper | Searches for private symbolic meaning | Connects songs to inner narrative, memory, and deep interpretation |
| M-INFP | The Bedroom Mythmaker | Uses music as emotional world-building | Builds private soundtracks, loves lyrics, atmosphere, nostalgia |
| M-ISTJ | The Archive Keeper | Preserves trusted sounds with care | Organized library, repeat listening, clear standards, dependable playlists |
| M-ISTP | The Texture Mechanic | Notices how sound is built | Loves production details, instrumental craft, gear-like precision |
| M-ISFJ | The Comfort Collector | Keeps songs as emotional shelter | Replays meaningful songs, values warmth, memory, and safe rituals |
| M-ISFP | The Mood Painter | Follows color, feeling, and sensory atmosphere | Likes immersive tracks, visual moods, private emotional aesthetics |

Each result type should have these content fields:

- `type_name`: short, memorable label.
- `tagline`: one sentence.
- `summary`: 100 to 160 words.
- `listening_style`: how the user listens.
- `sound_attraction`: what they notice in songs.
- `playlist_shape`: how their playlists tend to feel.
- `best_scenes`: 3 to 5 scenes.
- `blind_spot`: one gentle caveat.
- `recommendation`: one concrete music habit to try.
- `visual_tokens`: accent, motif, share-card background seed.

## 11. Version 1 Question Bank

The V1 scored test contains 40 questions. Public UI should show only `text`, answer scale, and order. Scoring metadata stays private.

Fields:

- `id`: stable question ID.
- `axis`: scored axis.
- `pole`: pole supported by agreement after reverse scoring.
- `reverse`: whether answer is reverse-scored.
- `weight`: scoring weight.
- `facet`: behavioral subtopic.
- `text`: question text.

### 11.1 E/I Axis Questions

| ID | Axis | Pole | Reverse | Weight | Facet | Question text |
|---|---|---|---|---:|---|---|
| EI01 | EI | E | false | 1.0 | sharing | When a song excites me, I usually want to send it to someone right away. |
| EI02 | EI | I | false | 1.0 | private_space | My favorite listening moments usually happen when I am alone. |
| EI03 | EI | E | false | 1.0 | social_discovery | I discover a lot of music through friends, events, communities, or social platforms. |
| EI04 | EI | I | false | 1.0 | headphones | Headphones feel like the most natural way for me to enter a song fully. |
| EI05 | EI | E | false | 1.2 | live_energy | Live shows, parties, or shared listening make songs feel more alive to me. |
| EI06 | EI | I | false | 1.2 | inner_meaning | I often keep my most meaningful songs private because explaining them would reduce them. |
| EI07 | EI | E | true | 1.0 | sharing_reverse | I rarely feel the urge to talk about what I am listening to. |
| EI08 | EI | I | true | 1.0 | private_reverse | Music feels incomplete to me if no one else is reacting with me. |
| EI09 | EI | E | false | 0.8 | playlist_for_others | I enjoy making playlists for other people or shared situations. |
| EI10 | EI | I | false | 0.8 | solo_replay | I can replay one song many times privately before telling anyone about it. |

### 11.2 S/N Axis Questions

| ID | Axis | Pole | Reverse | Weight | Facet | Question text |
|---|---|---|---|---:|---|---|
| SN01 | SN | S | false | 1.0 | sound_detail | I notice concrete details first: drums, bass, vocal texture, mix, or rhythm. |
| SN02 | SN | N | false | 1.0 | concept | I am drawn to songs that feel like they belong to a larger idea, world, or story. |
| SN03 | SN | S | false | 1.0 | familiarity | A familiar groove or voice can matter more to me than a surprising concept. |
| SN04 | SN | N | false | 1.0 | genre_fusion | I like music that bends genre rules or hints at a future sound. |
| SN05 | SN | S | false | 1.2 | bodily_rhythm | If a song does not physically land in rhythm or texture, I struggle to love it. |
| SN06 | SN | N | false | 1.2 | hidden_pattern | I enjoy finding hidden patterns, symbolism, or long arcs across albums. |
| SN07 | SN | S | true | 1.0 | abstraction_reverse | I care more about a song's abstract meaning than how it actually sounds. |
| SN08 | SN | N | true | 1.0 | literal_reverse | I usually prefer songs to stay direct, concrete, and easy to place. |
| SN09 | SN | S | false | 0.8 | craft | I respect songs that are simple but perfectly executed. |
| SN10 | SN | N | false | 0.8 | imagination | I like songs that make me imagine scenes, characters, or alternate versions of myself. |

### 11.3 T/F Axis Questions

| ID | Axis | Pole | Reverse | Weight | Facet | Question text |
|---|---|---|---|---:|---|---|
| TF01 | TF | T | false | 1.0 | critique | I naturally analyze whether a song is well-written, well-produced, or original. |
| TF02 | TF | F | false | 1.0 | emotional_truth | A technically imperfect song can become my favorite if it feels emotionally true. |
| TF03 | TF | T | false | 1.0 | ranking | I often compare songs, albums, or artists by quality and consistency. |
| TF04 | TF | F | false | 1.0 | empathy | I connect most with songs that seem to understand a feeling I cannot easily say. |
| TF05 | TF | T | false | 1.2 | structure | Strong structure, production decisions, or lyrical craft can make me trust a song. |
| TF06 | TF | F | false | 1.2 | memory | A song tied to a person or memory can outweigh any objective judgment. |
| TF07 | TF | T | true | 1.0 | critique_reverse | I almost never think about whether music is objectively good or badly made. |
| TF08 | TF | F | true | 1.0 | feeling_reverse | If a song is technically weak, emotional attachment usually cannot save it for me. |
| TF09 | TF | T | false | 0.8 | discussion | I enjoy explaining why a song works or does not work. |
| TF10 | TF | F | false | 0.8 | mood_care | I often choose music based on what my mood needs rather than what is impressive. |

### 11.4 J/P Axis Questions

| ID | Axis | Pole | Reverse | Weight | Facet | Question text |
|---|---|---|---|---:|---|---|
| JP01 | JP | J | false | 1.0 | organization | I like my playlists or library to have a clear structure. |
| JP02 | JP | P | false | 1.0 | shuffle | I enjoy letting shuffle, recommendations, or accidents decide what comes next. |
| JP03 | JP | J | false | 1.0 | planned_context | I often choose music to fit a planned scene, task, or time of day. |
| JP04 | JP | P | false | 1.0 | open_discovery | I can fall into a long discovery trail without knowing what I am looking for. |
| JP05 | JP | J | false | 1.2 | curation | I feel satisfied when a playlist order flows exactly right. |
| JP06 | JP | P | false | 1.2 | mood_shift | My listening changes quickly with mood, weather, conversation, or random impulse. |
| JP07 | JP | J | true | 1.0 | disorder_reverse | My music library can be messy and unfinished, and I prefer it that way. |
| JP08 | JP | P | true | 1.0 | plan_reverse | I usually decide what to listen to before pressing play and dislike changing course. |
| JP09 | JP | J | false | 0.8 | repeatable_sets | I keep reliable playlists for specific activities or emotional states. |
| JP10 | JP | P | false | 0.8 | novelty | I would rather risk a strange new track than repeat the safest familiar choice. |

## 12. Optional Flavor Questions

Flavor questions do not affect the four-letter result in V1. They personalize copy and share cards.

Recommended optional items:

1. Favorite artist right now.
2. Favorite song right now.
3. Genres you return to most often.
4. A song you play when you need comfort.
5. A song you play when you want energy.
6. Do you prefer lyrics, production, rhythm, voice, or atmosphere?
7. Which listening scene fits you best: commute, bedroom, party, work/study, night walk, live show?

Use flavor answers sparingly:

- Do not let them change the type result.
- Do use them for a result-page line such as `Your answer about night-walk listening fits the I/N/F pattern.`
- Do not show them publicly unless the user chooses a share option that includes them.

## 13. Question Generation Framework

Future question generation should follow this process.

### 13.1 Generate By Axis, Not By Vibe

For every generated question, first decide:

- Axis.
- Pole.
- Facet.
- Behavioral evidence.
- Whether reverse scoring is needed.
- Whether the item is likely to be socially desirable.

Bad question:

```text
Do you have good music taste?
```

Reason: judgmental, socially desirable, no axis clarity.

Good question:

```text
I enjoy explaining why a song works or does not work.
```

Reason: behavior-based, maps to T, not inherently better or worse.

### 13.2 Facet Coverage

Each axis should cover several facets.

E/I facets:

- sharing.
- group listening.
- live energy.
- private immersion.
- internal meaning.
- playlist for others.

S/N facets:

- sonic detail.
- bodily rhythm.
- familiar craft.
- conceptual world.
- hidden pattern.
- genre future.

T/F facets:

- critique.
- ranking.
- production logic.
- emotional truth.
- memory.
- mood care.

J/P facets:

- library organization.
- playlist order.
- planned context.
- shuffle.
- discovery trail.
- mood shifts.

### 13.3 Item Quality Rules

- Avoid moralized wording.
- Avoid absolute words like always/never unless intentionally measuring strong preference.
- Avoid two ideas in one question.
- Avoid questions that obviously reveal the pole.
- Include reverse-scored items to reduce acquiescence bias.
- Include concrete music behavior, not broad identity claims.
- Keep statements short enough for mobile.
- Do not ask for private demographic information in core scoring.

### 13.4 Calibration Review

Before activating a new question set:

- Each axis has equal total maximum weight.
- Each axis has at least 3 reverse-scored items.
- No pole has more than 60 percent of axis weight.
- No question contains value judgment like better, smarter, deeper, basic.
- At least one fixture strongly maps to every result family.

## 14. Automated Test Strategy

### 14.1 Scoring Unit Tests

Scoring tests are the most important tests in this project.

Required test cases:

- All high E answers and low I answers produce E.
- All high I answers and low E answers produce I.
- Same for S/N, T/F, J/P.
- Neutral answers produce low confidence.
- Reverse-scored items contribute to the correct opposite pole.
- Exact tie uses the documented tie-breaker.
- Result code is deterministic for the same answers.
- Question set with missing required answer is rejected.
- Unknown question ID is rejected.
- Duplicate answer for the same question is rejected.
- Weight changes affect raw score but not hidden public question payload.

Example Go table test structure:

```go
func TestScoreSubmissionFixtures(t *testing.T) {
    fixtures := []struct {
        name string
        answers map[string]int
        wantType string
        wantConfidence string
    }{
        {name: "festival curator", answers: fixtureENFP(), wantType: "M-ENFP", wantConfidence: "high"},
        {name: "archive keeper", answers: fixtureISTJ(), wantType: "M-ISTJ", wantConfidence: "high"},
        {name: "borderline neutral", answers: fixtureNeutral(), wantType: "M-ISFP", wantConfidence: "low"},
    }

    for _, tt := range fixtures {
        t.Run(tt.name, func(t *testing.T) {
            got, err := scoring.Score(coreQuestionSet, tt.answers)
            if err != nil {
                t.Fatal(err)
            }
            if got.TypeCode != tt.wantType {
                t.Fatalf("type = %s, want %s", got.TypeCode, tt.wantType)
            }
            if got.Confidence != tt.wantConfidence {
                t.Fatalf("confidence = %s, want %s", got.Confidence, tt.wantConfidence)
            }
        })
    }
}
```

### 14.2 API Tests

Required API tests:

- `GET /api/health` returns OK.
- `GET /api/test/active` returns active question set and hides scoring fields.
- `POST /api/test/submissions` accepts valid 40-answer payload.
- `POST /api/test/submissions` rejects missing required answers.
- `POST /api/test/submissions` rejects answer values outside 1 to 5.
- `GET /api/results/{resultId}` returns persisted result.
- Unknown result ID returns 404 without leaking internals.
- Admin endpoints require auth.
- Submission detail includes scoring trace only for admin.

### 14.3 Frontend Tests

Recommended frontend checks:

- Start page CTA navigates to test.
- Question progress starts at 1/40 and ends at 40/40.
- Next button disabled until required question is answered.
- Draft answers persist after reload.
- User can go back and change an answer.
- Submit shows loading state and handles API error without losing answers.
- Result page renders type code, title, score axes, confidence, share button.
- Mobile viewport has no text overlap.

### 14.4 Content QA

Content QA checklist:

- Every question maps to one axis only.
- No question suggests one answer is morally superior.
- Every result type has all required content fields.
- Result descriptions do not repeat the same generic sentence.
- Low-confidence copy is reassuring and transparent.
- Public copy includes disclaimer that this is entertainment/self-reflection.

## 15. Analytics And Admin Metrics

Track only what helps improve the product.

Core metrics:

- Starts.
- Completed submissions.
- Completion rate.
- Median completion time.
- Drop-off question number.
- Result type distribution.
- Axis margin distribution.
- Low-confidence rate.
- Question neutral rate.
- Question skip rate for optional flavor questions.

Question quality signals:

- A scored question has too many neutral answers.
- A scored question correlates poorly with its axis fixtures.
- One result type appears far too often.
- One axis has many low-confidence results.

Admin should show these as review signals, not automatically change scoring.

## 16. Security, Abuse, And Reliability

Minimum V1 protections:

- Rate limit submission endpoint by visitor/IP hash.
- Limit answer payload size.
- Validate question IDs against active question set.
- Reject unknown fields where useful.
- Use secure admin session cookie.
- Do not log raw request bodies for submissions.
- Store only hashed IP or coarse location.
- Use structured logs with request ID.

Reliability:

- If DB is down, public test can still show a friendly error.
- If result submission fails, frontend retains draft answers.
- If active question set is missing, API fails health/deployment checks.
- Migrations must run before API starts serving traffic.

## 17. NAS Deployment Plan

Expected services:

```text
yimusic-web        Nuxt public/admin frontend
yimusic-api        Go API
yimusic-postgres   PostgreSQL database
```

Docker Compose should include:

- Internal network.
- API depends on Postgres health.
- Web points to API internal URL.
- Postgres volume.
- Environment variables from `.env`.
- Health checks for API and web.

Verification after deployment:

```bash
docker ps --format '{{.Names}} {{.Status}} {{.Ports}}'
docker logs --tail 80 yimusic-api
docker logs --tail 80 yimusic-web
curl -fsS http://localhost:<web-port>/
curl -fsS http://localhost:<api-port>/api/health
```

Do not deploy from unverified source. For NAS edits, follow the safe editing rules in `AGENTS.md` and avoid raw non-ASCII through PowerShell SSH commands.

## 18. Implementation Roadmap

### Phase 0: Documentation And Seed Data

- Commit this overall plan.
- Split scoring model into `docs/scoring-model.md` if needed.
- Create seed question-set JSON from the 40 questions.
- Create seed result-type JSON for 16 types.

### Phase 1: Backend Scoring Core

- Build Go scoring package first.
- Add question-set structs and validation.
- Add fixture tests for all axes.
- Add result code/confidence calculation.

### Phase 2: Database And API

- Add migrations.
- Add sqlc queries.
- Add active question-set endpoint.
- Add submission endpoint.
- Add result lookup endpoint.
- Add admin auth and submission list/detail.

### Phase 3: Frontend Test Flow

- Scaffold Nuxt app.
- Build start page.
- Build question flow.
- Add draft persistence.
- Add result page.
- Add error/loading/empty states.

### Phase 4: Admin And Analytics

- Add admin dashboard.
- Add submission table and detail.
- Add question/result read-only management screens.
- Add aggregate analytics.

### Phase 5: NAS Deployment

- Add Dockerfiles.
- Add Compose file.
- Configure environment.
- Deploy to NAS.
- Verify public URL and logs.

## 19. Definition Of Done For The Overall Scheme

This plan is complete when it contains:

- Product purpose and scope.
- Frontend UI direction and route structure.
- Backend architecture and API shape.
- Database model.
- Four-axis scoring framework.
- Tie/confidence logic.
- 16 result type definitions.
- 40 initial scored questions.
- Question generation rules.
- Test strategy.
- NAS deployment approach.
- Implementation roadmap.

## 20. Immediate Next Step After Approval

After this plan is approved, create a separate implementation plan at:

```text
docs/superpowers/plans/2026-05-31-yimusic-v1-implementation.md
```

That implementation plan should break development into small TDD tasks, starting with the scoring package and fixtures before any UI work.
