const AXES = {
  EI: ['E', 'I'],
  SN: ['S', 'N'],
  TF: ['T', 'F'],
  JP: ['J', 'P'],
};

const TIE_DEFAULTS = {
  EI: 'I',
  SN: 'S',
  TF: 'F',
  JP: 'P',
};

export const QUESTIONS = [
  { id: 'EI01', axis: 'EI', pole: 'E', reverse: false, weight: 1.0, facet: 'sharing', text: 'When a song excites me, I usually want to send it to someone right away.' },
  { id: 'EI02', axis: 'EI', pole: 'I', reverse: false, weight: 1.0, facet: 'private_space', text: 'My favorite listening moments usually happen when I am alone.' },
  { id: 'EI03', axis: 'EI', pole: 'E', reverse: false, weight: 1.0, facet: 'social_discovery', text: 'I discover a lot of music through friends, events, communities, or social platforms.' },
  { id: 'EI04', axis: 'EI', pole: 'I', reverse: false, weight: 1.0, facet: 'headphones', text: 'Headphones feel like the most natural way for me to enter a song fully.' },
  { id: 'EI05', axis: 'EI', pole: 'E', reverse: false, weight: 1.2, facet: 'live_energy', text: 'Live shows, parties, or shared listening make songs feel more alive to me.' },
  { id: 'EI06', axis: 'EI', pole: 'I', reverse: false, weight: 1.2, facet: 'inner_meaning', text: 'I often keep my most meaningful songs private because explaining them would reduce them.' },
  { id: 'EI07', axis: 'EI', pole: 'E', reverse: true, weight: 1.0, facet: 'sharing_reverse', text: 'I rarely feel the urge to talk about what I am listening to.' },
  { id: 'EI08', axis: 'EI', pole: 'I', reverse: true, weight: 1.0, facet: 'private_reverse', text: 'Music feels incomplete to me if no one else is reacting with me.' },
  { id: 'EI09', axis: 'EI', pole: 'E', reverse: false, weight: 0.8, facet: 'playlist_for_others', text: 'I enjoy making playlists for other people or shared situations.' },
  { id: 'EI10', axis: 'EI', pole: 'I', reverse: false, weight: 0.8, facet: 'solo_replay', text: 'I can replay one song many times privately before telling anyone about it.' },

  { id: 'SN01', axis: 'SN', pole: 'S', reverse: false, weight: 1.0, facet: 'sound_detail', text: 'I notice concrete details first: drums, bass, vocal texture, mix, or rhythm.' },
  { id: 'SN02', axis: 'SN', pole: 'N', reverse: false, weight: 1.0, facet: 'concept', text: 'I am drawn to songs that feel like they belong to a larger idea, world, or story.' },
  { id: 'SN03', axis: 'SN', pole: 'S', reverse: false, weight: 1.0, facet: 'familiarity', text: 'A familiar groove or voice can matter more to me than a surprising concept.' },
  { id: 'SN04', axis: 'SN', pole: 'N', reverse: false, weight: 1.0, facet: 'genre_fusion', text: 'I like music that bends genre rules or hints at a future sound.' },
  { id: 'SN05', axis: 'SN', pole: 'S', reverse: false, weight: 1.2, facet: 'bodily_rhythm', text: 'If a song does not physically land in rhythm or texture, I struggle to love it.' },
  { id: 'SN06', axis: 'SN', pole: 'N', reverse: false, weight: 1.2, facet: 'hidden_pattern', text: 'I enjoy finding hidden patterns, symbolism, or long arcs across albums.' },
  { id: 'SN07', axis: 'SN', pole: 'S', reverse: true, weight: 1.0, facet: 'abstraction_reverse', text: "I care more about a song's abstract meaning than how it actually sounds." },
  { id: 'SN08', axis: 'SN', pole: 'N', reverse: true, weight: 1.0, facet: 'literal_reverse', text: 'I usually prefer songs to stay direct, concrete, and easy to place.' },
  { id: 'SN09', axis: 'SN', pole: 'S', reverse: false, weight: 0.8, facet: 'craft', text: 'I respect songs that are simple but perfectly executed.' },
  { id: 'SN10', axis: 'SN', pole: 'N', reverse: false, weight: 0.8, facet: 'imagination', text: 'I like songs that make me imagine scenes, characters, or alternate versions of myself.' },

  { id: 'TF01', axis: 'TF', pole: 'T', reverse: false, weight: 1.0, facet: 'critique', text: 'I naturally analyze whether a song is well-written, well-produced, or original.' },
  { id: 'TF02', axis: 'TF', pole: 'F', reverse: false, weight: 1.0, facet: 'emotional_truth', text: 'A technically imperfect song can become my favorite if it feels emotionally true.' },
  { id: 'TF03', axis: 'TF', pole: 'T', reverse: false, weight: 1.0, facet: 'ranking', text: 'I often compare songs, albums, or artists by quality and consistency.' },
  { id: 'TF04', axis: 'TF', pole: 'F', reverse: false, weight: 1.0, facet: 'empathy', text: 'I connect most with songs that seem to understand a feeling I cannot easily say.' },
  { id: 'TF05', axis: 'TF', pole: 'T', reverse: false, weight: 1.2, facet: 'structure', text: 'Strong structure, production decisions, or lyrical craft can make me trust a song.' },
  { id: 'TF06', axis: 'TF', pole: 'F', reverse: false, weight: 1.2, facet: 'memory', text: 'A song tied to a person or memory can outweigh any objective judgment.' },
  { id: 'TF07', axis: 'TF', pole: 'T', reverse: true, weight: 1.0, facet: 'critique_reverse', text: 'I almost never think about whether music is objectively good or badly made.' },
  { id: 'TF08', axis: 'TF', pole: 'F', reverse: true, weight: 1.0, facet: 'feeling_reverse', text: 'If a song is technically weak, emotional attachment usually cannot save it for me.' },
  { id: 'TF09', axis: 'TF', pole: 'T', reverse: false, weight: 0.8, facet: 'discussion', text: 'I enjoy explaining why a song works or does not work.' },
  { id: 'TF10', axis: 'TF', pole: 'F', reverse: false, weight: 0.8, facet: 'mood_care', text: 'I often choose music based on what my mood needs rather than what is impressive.' },

  { id: 'JP01', axis: 'JP', pole: 'J', reverse: false, weight: 1.0, facet: 'organization', text: 'I like my playlists or library to have a clear structure.' },
  { id: 'JP02', axis: 'JP', pole: 'P', reverse: false, weight: 1.0, facet: 'shuffle', text: 'I enjoy letting shuffle, recommendations, or accidents decide what comes next.' },
  { id: 'JP03', axis: 'JP', pole: 'J', reverse: false, weight: 1.0, facet: 'planned_context', text: 'I often choose music to fit a planned scene, task, or time of day.' },
  { id: 'JP04', axis: 'JP', pole: 'P', reverse: false, weight: 1.0, facet: 'open_discovery', text: 'I can fall into a long discovery trail without knowing what I am looking for.' },
  { id: 'JP05', axis: 'JP', pole: 'J', reverse: false, weight: 1.2, facet: 'curation', text: 'I feel satisfied when a playlist order flows exactly right.' },
  { id: 'JP06', axis: 'JP', pole: 'P', reverse: false, weight: 1.2, facet: 'mood_shift', text: 'My listening changes quickly with mood, weather, conversation, or random impulse.' },
  { id: 'JP07', axis: 'JP', pole: 'J', reverse: true, weight: 1.0, facet: 'disorder_reverse', text: 'My music library can be messy and unfinished, and I prefer it that way.' },
  { id: 'JP08', axis: 'JP', pole: 'P', reverse: true, weight: 1.0, facet: 'plan_reverse', text: 'I usually decide what to listen to before pressing play and dislike changing course.' },
  { id: 'JP09', axis: 'JP', pole: 'J', reverse: false, weight: 0.8, facet: 'repeatable_sets', text: 'I keep reliable playlists for specific activities or emotional states.' },
  { id: 'JP10', axis: 'JP', pole: 'P', reverse: false, weight: 0.8, facet: 'novelty', text: 'I would rather risk a strange new track than repeat the safest familiar choice.' },
];

export const RESULT_TYPES = {
  'M-ENTJ': { name: 'The Stage Architect', tagline: 'You turn taste into direction.', summary: 'You listen like someone building a room around a sound. Strong tracks become structure, momentum, and intention in your hands.' },
  'M-ENTP': { name: 'The Genre Hacker', tagline: 'You test the edges of what a song can be.', summary: 'You like music that opens doors: odd hybrids, sharp turns, arguments about taste, and sounds that refuse to sit still.' },
  'M-ENFJ': { name: 'The Chorus Leader', tagline: 'You gather people through feeling.', summary: 'You hear the emotional weather in a room and know which song can make it clearer, warmer, or louder.' },
  'M-ENFP': { name: 'The Festival Curator', tagline: 'You turn music into shared discovery.', summary: 'You follow sparks quickly: a new chorus, a strange artist, a friend who needs the right track, a moment that wants a soundtrack.' },
  'M-ESTJ': { name: 'The Setlist Captain', tagline: 'You know what works and when to play it.', summary: 'You value music that lands with clarity. Your strongest playlists have purpose, order, and dependable impact.' },
  'M-ESTP': { name: 'The Beat Chaser', tagline: 'You trust the track that moves first.', summary: 'You listen through motion, pulse, and immediate charge. A song wins when it changes the temperature around you.' },
  'M-ESFJ': { name: 'The Memory DJ', tagline: 'You keep people attached to songs.', summary: 'You build emotional bridges with familiar hooks, shared memories, and tracks that make a moment feel held.' },
  'M-ESFP': { name: 'The Vibe Sprinter', tagline: 'You live inside the next good moment.', summary: 'You follow energy as it appears: bright moods, sudden favorites, social scenes, and songs that make the body answer first.' },
  'M-INTJ': { name: 'The Concept Producer', tagline: 'You hear the system behind the sound.', summary: 'You enjoy music as architecture: albums with thesis, production choices with logic, and taste that evolves with intent.' },
  'M-INTP': { name: 'The Sound Theorist', tagline: 'You take songs apart to find their engine.', summary: 'You are pulled toward patterns, structures, experiments, and the small production decisions that change everything.' },
  'M-INFJ': { name: 'The Hidden Scorekeeper', tagline: 'You search for the private myth inside a song.', summary: 'You hear songs as symbols, memories, and inner weather. Your strongest favorites feel almost too personal to explain.' },
  'M-INFP': { name: 'The Bedroom Mythmaker', tagline: 'You build inner worlds out of songs.', summary: 'You collect atmosphere, lyrics, ache, nostalgia, and small emotional truths until they become a private soundtrack.' },
  'M-ISTJ': { name: 'The Archive Keeper', tagline: 'You preserve the songs that have earned trust.', summary: 'You value music with staying power: organized libraries, repeatable rituals, clean craft, and songs that still hold up.' },
  'M-ISTP': { name: 'The Texture Mechanic', tagline: 'You notice how sound is built.', summary: 'You listen with your hands as much as your ears: tone, timing, mix, technique, and the satisfying fit of each part.' },
  'M-ISFJ': { name: 'The Comfort Collector', tagline: 'You keep songs as emotional shelter.', summary: 'You return to music that protects memory, steadies the day, and makes familiar feelings easier to carry.' },
  'M-ISFP': { name: 'The Mood Painter', tagline: 'You follow color, texture, and atmosphere.', summary: 'You choose music by feel: visual moods, soft signals, private taste, and tracks that make a moment glow differently.' },
};

function oppositePole(axis, pole) {
  const [left, right] = AXES[axis];
  return pole === left ? right : left;
}

function assertValidAnswers(answers) {
  for (const question of QUESTIONS) {
    if (!(question.id in answers)) {
      throw new Error(`Missing answer for ${question.id}`);
    }
    const value = Number(answers[question.id]);
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      throw new Error(`Invalid answer for ${question.id}`);
    }
  }
}

export function scoreAnswers(answers) {
  assertValidAnswers(answers);

  const raw = Object.fromEntries(Object.entries(AXES).flatMap(([axis, poles]) => poles.map((pole) => [`${axis}:${pole}`, 0])));
  const trace = [];

  for (const question of QUESTIONS) {
    let centered = Number(answers[question.id]) - 3;
    if (question.reverse) centered *= -1;

    if (centered === 0) {
      trace.push({ questionId: question.id, axis: question.axis, contribution: 0 });
      continue;
    }

    const targetPole = centered > 0 ? question.pole : oppositePole(question.axis, question.pole);
    const points = Math.abs(centered) * question.weight;
    raw[`${question.axis}:${targetPole}`] += points;
    trace.push({ questionId: question.id, axis: question.axis, pole: targetPole, contribution: points });
  }

  const axes = {};
  const letters = [];

  for (const [axis, [leftPole, rightPole]] of Object.entries(AXES)) {
    const leftScore = raw[`${axis}:${leftPole}`];
    const rightScore = raw[`${axis}:${rightPole}`];
    const total = leftScore + rightScore;

    let leftPercent = 50;
    let rightPercent = 50;
    let winner = TIE_DEFAULTS[axis];
    let tieBreakReason = null;

    if (total > 0) {
      leftPercent = Math.round((leftScore / total) * 100);
      rightPercent = 100 - leftPercent;
      if (leftScore > rightScore) winner = leftPole;
      if (rightScore > leftScore) winner = rightPole;
      if (leftScore === rightScore) tieBreakReason = 'raw-score-tie-default';
    } else {
      tieBreakReason = 'neutral-default';
    }

    const margin = Math.abs(leftPercent - rightPercent);
    const confidence = margin >= 20 ? 'high' : margin >= 10 ? 'medium' : 'low';
    axes[axis] = { leftPole, rightPole, leftScore, rightScore, leftPercent, rightPercent, winner, margin, confidence, tieBreakReason };
    letters.push(winner);
  }

  const typeCode = `M-${letters.join('')}`;
  const lowAxes = Object.values(axes).filter((axis) => axis.confidence === 'low').length;
  const highAxes = Object.values(axes).filter((axis) => axis.confidence === 'high').length;
  const exactTie = Object.values(axes).some((axis) => axis.tieBreakReason);
  const confidence = exactTie || lowAxes >= 2 ? 'low' : highAxes >= 3 && lowAxes === 0 ? 'high' : 'medium';

  return { typeCode, result: RESULT_TYPES[typeCode], confidence, axes, raw, trace };
}

export function buildBiasedAnswers(preferredPoles) {
  const answers = {};
  for (const question of QUESTIONS) {
    const preferredPole = preferredPoles[question.axis];
    const agreementSupportsPreferred = question.pole === preferredPole;
    const value = agreementSupportsPreferred ? 5 : 1;
    answers[question.id] = question.reverse ? 6 - value : value;
  }
  return answers;
}
